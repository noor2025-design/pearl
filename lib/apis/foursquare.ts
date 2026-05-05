import type { RawPlace } from './types';

const BASE = 'https://api.foursquare.com/v3';

interface FoursquarePlace {
  fsq_id: string;
  name: string;
  location?: {
    address?: string;
    locality?: string;
    region?: string;
    postcode?: string;
    formatted_address?: string;
  };
  geocodes?: { main?: { latitude: number; longitude: number } };
  tel?: string;
  website?: string;
  hours?: { display?: string };
  price?: 1 | 2 | 3 | 4; // 1=$ 2=$$ 3=$$$ 4=$$$$
  rating?: number; // 0–10
  stats?: { total_ratings?: number };
  photos?: Array<{ prefix: string; suffix: string }>;
}

function mapFSQPrice(p: number | undefined): '$' | '$$' | '$$$' | null {
  if (!p) return null;
  if (p === 1) return '$';
  if (p === 2) return '$$';
  return '$$$';
}

export async function searchFoursquare(
  query: string,
  ll: string,
  radiusMeters: number,
  apiKey: string
): Promise<RawPlace[]> {
  const params = new URLSearchParams({
    query,
    ll,
    radius: String(radiusMeters),
    limit: '50',
    fields: 'fsq_id,name,location,geocodes,tel,website,hours,price,rating,stats,photos',
  });

  const res = await fetch(`${BASE}/places/search?${params}`, {
    headers: {
      Authorization: apiKey,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Foursquare HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json() as { results?: FoursquarePlace[] };

  return (data.results ?? []).map((p): RawPlace => {
    const photoUrl = p.photos?.[0]
      ? `${p.photos[0].prefix}800${p.photos[0].suffix}`
      : null;

    return {
      externalId: p.fsq_id,
      source: 'foursquare',
      name: p.name,
      address: p.location?.formatted_address ?? p.location?.address ?? null,
      neighborhood: p.location?.locality ?? null,
      lat: p.geocodes?.main?.latitude ?? null,
      lng: p.geocodes?.main?.longitude ?? null,
      phone: p.tel ?? null,
      website: p.website ?? null,
      hours: p.hours?.display ?? null,
      priceLevel: mapFSQPrice(p.price),
      rating: p.rating != null ? p.rating / 2 : null, // normalize 0–10 → 0–5
      reviewCount: p.stats?.total_ratings ?? null,
      photoUrl,
    };
  });
}
