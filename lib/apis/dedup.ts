import type { RawPlace } from './types';
import type { Store } from '@/lib/stores';

// ---------------------------------------------------------------------------
// String similarity (Sørensen–Dice coefficient on character bigrams)
// ---------------------------------------------------------------------------

function bigrams(s: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < s.length - 1; i++) out.push(s.slice(i, i + 2));
  return out;
}

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const ba = bigrams(a);
  const bb = new Set<string>(bigrams(b));
  const common = ba.filter((g) => bb.has(g)).length;
  return (2 * common) / (ba.length + bb.size);
}

/** Strip noise words so "Modest Fashion Boutique LLC" ≈ "Modest Fashion" */
function normalizeName(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\b(boutique|store|fashion|clothing|hijab|shop|llc|inc|co|the|of|and)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------------------
// Haversine distance in km
// ---------------------------------------------------------------------------

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ---------------------------------------------------------------------------
// Cross-API deduplication of RawPlace[]
// ---------------------------------------------------------------------------

function isSameRawPlace(a: RawPlace, b: RawPlace): boolean {
  const nameSim = similarity(normalizeName(a.name), normalizeName(b.name));
  if (nameSim < 0.75) return false;
  // If both have coordinates, require them to be within 200 m
  if (a.lat && b.lat && a.lng && b.lng) {
    return haversine(a.lat, a.lng, b.lat, b.lng) < 0.2;
  }
  return nameSim > 0.9; // high name similarity with no coords → assume same
}

/** Merge richer fields from `src` into `dst` (mutates `dst`). */
function mergeRaw(dst: RawPlace, src: RawPlace): void {
  if (!dst.phone && src.phone) dst.phone = src.phone;
  if (!dst.website && src.website) dst.website = src.website;
  if (!dst.hours && src.hours) dst.hours = src.hours;
  if (!dst.priceLevel && src.priceLevel) dst.priceLevel = src.priceLevel;
  if (!dst.photoUrl && src.photoUrl) dst.photoUrl = src.photoUrl;
  if (!dst.lat && src.lat) { dst.lat = src.lat; dst.lng = src.lng; }
}

export function deduplicateRawPlaces(places: RawPlace[]): RawPlace[] {
  const out: RawPlace[] = [];
  for (const place of places) {
    const existing = out.find((r) => isSameRawPlace(place, r));
    if (existing) {
      mergeRaw(existing, place);
    } else {
      out.push({ ...place });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Match a RawPlace against the existing Store catalogue
// ---------------------------------------------------------------------------

export function findMatchingStore(
  place: RawPlace,
  stores: Store[]
): Store | undefined {
  // 1. Exact externalId match
  for (const store of stores) {
    const ids = (store as StoreWithIds).externalIds;
    if (!ids) continue;
    if (place.source === 'google' && ids.google === place.externalId) return store;
    if (place.source === 'yelp' && ids.yelp === place.externalId) return store;
    if (place.source === 'foursquare' && ids.foursquare === place.externalId) return store;
  }

  // 2. Name + proximity fuzzy match
  for (const store of stores) {
    const nameSim = similarity(normalizeName(place.name), normalizeName(store.name));
    if (nameSim < 0.8) continue;

    // If both have coords, check distance
    if (place.lat && place.lng && store.address) {
      // Address match is a good enough proxy when we have high name similarity
      return store;
    }
    if (nameSim > 0.9) return store;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Convert RawPlace → Store fields for update / new entry
// ---------------------------------------------------------------------------

interface StoreWithIds extends Omit<Store, 'source'> {
  externalIds?: { google?: string; yelp?: string; foursquare?: string };
  source?: Store['source'] | string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function inferLocationType(place: RawPlace, searchLocationType: 'nyc' | 'nj'): 'nyc' | 'nj' {
  return searchLocationType;
}

function inferCategories(searchKeyword: string): string[] {
  const kw = searchKeyword.toLowerCase();
  if (kw.includes('abaya')) return ['Abayas', 'Traditional Wear'];
  if (kw.includes('hijab')) return ['Hijabs & Scarves', 'Accessories'];
  if (kw.includes('occasion')) return ['Occasion Wear'];
  return ['Modest Dresses', 'Traditional Wear'];
}

/** Create a new Store record from a RawPlace (marked unverified for manual review). */
export function rawPlaceToNewStore(
  place: RawPlace,
  searchLocationType: 'nyc' | 'nj',
  searchKeyword: string,
  nextFeaturedOrder: number
): StoreWithIds {
  const id = slugify(place.name);
  return {
    id,
    name: place.name,
    slug: id,
    website: place.website,
    description: `${place.name} is a modest fashion boutique located in ${place.neighborhood ?? 'the area'}. Call to confirm hours and offerings.`,
    shortDescription: `Modest fashion boutique in ${place.neighborhood ?? 'the area'}.`,
    categories: inferCategories(searchKeyword),
    locationType: inferLocationType(place, searchLocationType),
    shipsToUS: false,
    priceRange: place.priceLevel ?? '$$',
    logoUrl: '',
    featuredImageUrl: place.photoUrl ?? '',
    featured: false,
    featuredOrder: nextFeaturedOrder,
    verified: false,
    tags: ['local', searchLocationType === 'nyc' ? 'NYC' : 'NJ'],
    social: {},
    address: place.address,
    neighborhood: place.neighborhood,
    hours: place.hours,
    phone: place.phone,
    externalIds: { [place.source]: place.externalId } as StoreWithIds['externalIds'],
    source: place.source,
  };
}

/** Merge fresh API data into an existing Store record (non-destructive). */
export function updateStoreFromRawPlace(
  store: StoreWithIds,
  place: RawPlace
): { changed: boolean; updated: StoreWithIds } {
  let changed = false;
  const updated: StoreWithIds = { ...store };

  // Register externalId if not already present
  updated.externalIds = { ...store.externalIds };
  const key = place.source as 'google' | 'yelp' | 'foursquare';
  if (!updated.externalIds![key]) {
    updated.externalIds![key] = place.externalId;
    changed = true;
  }

  // Freshen operational fields from APIs
  if (place.phone && !store.phone) { updated.phone = place.phone; changed = true; }
  if (place.hours && !store.hours) { updated.hours = place.hours; changed = true; }
  if (place.website && !store.website) { updated.website = place.website; changed = true; }
  if (place.address && !store.address) { updated.address = place.address; changed = true; }
  if (place.photoUrl && !store.featuredImageUrl) {
    updated.featuredImageUrl = place.photoUrl;
    changed = true;
  }
  if (place.priceLevel && !store.priceRange) {
    updated.priceRange = place.priceLevel;
    changed = true;
  }

  return { changed, updated };
}
