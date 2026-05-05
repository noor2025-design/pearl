/**
 * Core sync logic — no file I/O, no CLI concerns.
 * Imported by both scripts/sync-stores.ts and app/api/stores/sync/route.ts.
 */

import { searchGooglePlaces, fetchGooglePlacesDetails } from './google-places';
import { searchYelp } from './yelp';
import { searchFoursquare } from './foursquare';
import {
  deduplicateRawPlaces,
  findMatchingStore,
  rawPlaceToNewStore,
  updateStoreFromRawPlace,
} from './dedup';
import type { RawPlace, SyncStats } from './types';
import type { Store } from '@/lib/stores';

export interface SearchArea {
  label: string;
  locationType: 'nyc' | 'nj';
  locationText: string;
  ll: string;
  radius: number;
}

export const SEARCH_AREAS: SearchArea[] = [
  // NYC
  { label: 'Jackson Heights, Queens',     locationType: 'nyc', locationText: 'Jackson Heights Queens NY',     ll: '40.7484,-73.8840', radius: 1500 },
  { label: 'Bay Ridge, Brooklyn',         locationType: 'nyc', locationText: 'Bay Ridge Brooklyn NY',         ll: '40.6350,-74.0270', radius: 2000 },
  { label: 'Astoria, Queens',             locationType: 'nyc', locationText: 'Astoria Queens NY',             ll: '40.7726,-73.9294', radius: 2000 },
  { label: 'Downtown Brooklyn',           locationType: 'nyc', locationText: 'Downtown Brooklyn NY',          ll: '40.6924,-73.9908', radius: 2000 },
  { label: 'East Harlem, Manhattan',      locationType: 'nyc', locationText: 'East Harlem Manhattan NY',      ll: '40.7958,-73.9388', radius: 1500 },
  { label: 'Flatbush, Brooklyn',          locationType: 'nyc', locationText: 'Flatbush Brooklyn NY',          ll: '40.6498,-73.9487', radius: 2000 },
  { label: 'Jamaica, Queens',             locationType: 'nyc', locationText: 'Jamaica Queens NY',             ll: '40.7015,-73.7892', radius: 2000 },
  { label: 'Burnside Ave, Bronx',         locationType: 'nyc', locationText: 'Burnside Ave Bronx NY',         ll: '40.8448,-73.8648', radius: 2500 },
  { label: 'Washington Heights',          locationType: 'nyc', locationText: 'Washington Heights Manhattan NY', ll: '40.8417,-73.9395', radius: 2000 },
  { label: 'Kensington, Brooklyn',        locationType: 'nyc', locationText: 'Kensington Brooklyn NY',        ll: '40.6415,-73.9784', radius: 1500 },
  { label: 'Richmond Hill, Queens',       locationType: 'nyc', locationText: 'Richmond Hill Queens NY',       ll: '40.7000,-73.8349', radius: 2000 },
  { label: 'Flushing, Queens',            locationType: 'nyc', locationText: 'Flushing Queens NY',            ll: '40.7675,-73.8330', radius: 2000 },
  { label: 'East Flatbush, Brooklyn',     locationType: 'nyc', locationText: 'East Flatbush Brooklyn NY',     ll: '40.6450,-73.9490', radius: 2000 },
  // NJ
  { label: 'Paterson, NJ',               locationType: 'nj',  locationText: 'Paterson NJ',                  ll: '40.9168,-74.1719', radius: 3000 },
  { label: 'Jersey City, NJ',            locationType: 'nj',  locationText: 'Jersey City NJ',               ll: '40.7282,-74.0776', radius: 3000 },
  { label: 'Elizabeth, NJ',              locationType: 'nj',  locationText: 'Elizabeth NJ',                 ll: '40.6640,-74.2107', radius: 2000 },
  { label: 'Newark, NJ',                 locationType: 'nj',  locationText: 'Newark NJ',                    ll: '40.7357,-74.1724', radius: 3000 },
  { label: 'Passaic, NJ',                locationType: 'nj',  locationText: 'Passaic NJ',                   ll: '40.8568,-74.1287', radius: 2000 },
  { label: 'Irvington, NJ',              locationType: 'nj',  locationText: 'Irvington NJ',                 ll: '40.7248,-74.2296', radius: 2000 },
  { label: 'Clifton, NJ',                locationType: 'nj',  locationText: 'Clifton NJ',                   ll: '40.8584,-74.1638', radius: 2000 },
  { label: 'Hackensack, NJ',             locationType: 'nj',  locationText: 'Hackensack NJ',                ll: '40.8859,-74.0435', radius: 2000 },
  { label: 'Teaneck, NJ',                locationType: 'nj',  locationText: 'Teaneck NJ',                   ll: '40.8934,-74.0128', radius: 2000 },
  { label: 'Haledon, NJ',                locationType: 'nj',  locationText: 'Haledon NJ',                   ll: '40.9373,-74.1857', radius: 1500 },
];

export const SEARCH_KEYWORDS = [
  'modest fashion boutique',
  'Islamic clothing store',
  'hijab store',
  'abaya boutique',
  'Muslim women clothing',
];

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function enrichGooglePlace(place: RawPlace, apiKey: string): Promise<RawPlace> {
  if (place.source !== 'google') return place;
  await sleep(100);
  try {
    const details = await fetchGooglePlacesDetails(place.externalId, apiKey);
    return { ...place, ...details };
  } catch {
    return place;
  }
}

export interface SyncOptions {
  areas?: ('nyc' | 'nj')[];
  dryRun?: boolean;
  fetchDetails?: boolean;
  existingStores: Store[];
  onProgress?: (msg: string) => void;
}

export async function runSync(options: SyncOptions): Promise<{ stats: SyncStats; stores: Store[] }> {
  const { dryRun = false, fetchDetails = false } = options;
  const log = options.onProgress ?? (() => {});

  const googleKey = process.env.GOOGLE_PLACES_API_KEY ?? '';
  const yelpKey   = process.env.YELP_API_KEY ?? '';
  const fsqKey    = process.env.FOURSQUARE_API_KEY ?? '';

  const stats: SyncStats = { added: 0, updated: 0, skipped: 0, errors: [] };
  const stores: Store[] = [...options.existingStores];
  let nextOrder = Math.max(...stores.map((s) => s.featuredOrder), 0) + 1;

  const targetAreas = options.areas
    ? SEARCH_AREAS.filter((a) => options.areas!.includes(a.locationType))
    : SEARCH_AREAS;

  for (const area of targetAreas) {
    log(`📍 ${area.label}`);
    const allRaw: RawPlace[] = [];

    for (const keyword of SEARCH_KEYWORDS) {
      if (googleKey) {
        try {
          await sleep(200);
          const results = await searchGooglePlaces(keyword, area.locationText, googleKey);
          allRaw.push(...results);
          log(`  Google "${keyword}": ${results.length} results`);
        } catch (e) {
          const msg = `Google error in ${area.label} / "${keyword}": ${(e as Error).message}`;
          stats.errors.push(msg);
        }
      }

      if (yelpKey) {
        try {
          await sleep(200);
          const results = await searchYelp(keyword, area.locationText, yelpKey);
          allRaw.push(...results);
          log(`  Yelp   "${keyword}": ${results.length} results`);
        } catch (e) {
          const msg = `Yelp error in ${area.label} / "${keyword}": ${(e as Error).message}`;
          stats.errors.push(msg);
        }
      }

      if (fsqKey) {
        try {
          await sleep(200);
          const results = await searchFoursquare(keyword, area.ll, area.radius, fsqKey);
          allRaw.push(...results);
          log(`  FSQ    "${keyword}": ${results.length} results`);
        } catch (e) {
          const msg = `Foursquare error in ${area.label} / "${keyword}": ${(e as Error).message}`;
          stats.errors.push(msg);
        }
      }
    }

    const deduped = deduplicateRawPlaces(allRaw);
    log(`  → ${allRaw.length} raw → ${deduped.length} unique`);

    for (const place of deduped) {
      const match = findMatchingStore(place, stores);

      if (match) {
        const { changed, updated } = updateStoreFromRawPlace(match as any, place);
        if (changed && !dryRun) {
          const idx = stores.findIndex((s) => s.id === match.id);
          stores[idx] = updated as Store;
          stats.updated++;
          log(`  ✏️  Updated: ${match.name}`);
        } else {
          stats.skipped++;
        }
      } else {
        let enriched = place;
        if (fetchDetails && googleKey && place.source === 'google') {
          enriched = await enrichGooglePlace(place, googleKey);
        }
        if (!dryRun) {
          const newStore = rawPlaceToNewStore(enriched, area.locationType, SEARCH_KEYWORDS[0], nextOrder++);
          stores.push(newStore as unknown as Store);
        }
        stats.added++;
        log(`  ➕ Added:   ${place.name}`);
      }
    }
  }

  return { stats, stores };
}
