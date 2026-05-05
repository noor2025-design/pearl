import type { RawPlace } from './types';

const BASE = 'https://maps.googleapis.com/maps/api/place';

interface GoogleTextResult {
  place_id: string;
  name: string;
  formatted_address?: string;
  geometry?: { location: { lat: number; lng: number } };
  price_level?: number; // 0–4
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{ photo_reference: string }>;
}

interface GoogleDetailsResult extends GoogleTextResult {
  formatted_phone_number?: string;
  website?: string;
  opening_hours?: { weekday_text?: string[] };
  address_components?: Array<{ long_name: string; types: string[] }>;
}

function mapPriceLevel(level: number | undefined): '$' | '$$' | '$$$' | null {
  if (level === undefined || level === null) return null;
  if (level <= 1) return '$';
  if (level === 2) return '$$';
  return '$$$';
}

function extractNeighborhood(address: string | undefined): string | null {
  if (!address) return null;
  // Try to extract the city/neighborhood from "123 Main St, Paterson, NJ 07501, USA"
  const parts = address.split(',').map((p) => p.trim());
  // Usually parts[1] is the city, parts[2] is state+zip
  return parts.length >= 2 ? parts[1] : null;
}

export async function fetchGooglePlacesDetails(
  placeId: string,
  apiKey: string
): Promise<Partial<RawPlace>> {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'formatted_phone_number,website,opening_hours,address_components',
    key: apiKey,
  });
  const res = await fetch(`${BASE}/details/json?${params}`);
  if (!res.ok) return {};
  const data = await res.json() as { status: string; result?: GoogleDetailsResult };
  if (data.status !== 'OK' || !data.result) return {};
  const r = data.result;
  return {
    phone: r.formatted_phone_number ?? null,
    website: r.website ?? null,
    hours: r.opening_hours?.weekday_text?.join(' | ') ?? null,
  };
}

export async function searchGooglePlaces(
  query: string,
  location: string,
  apiKey: string
): Promise<RawPlace[]> {
  const params = new URLSearchParams({
    query: `${query} ${location}`,
    key: apiKey,
  });

  const res = await fetch(`${BASE}/textsearch/json?${params}`);
  if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);

  const data = await res.json() as {
    status: string;
    error_message?: string;
    results?: GoogleTextResult[];
  };

  if (data.status === 'ZERO_RESULTS') return [];
  if (data.status !== 'OK') {
    throw new Error(`Google Places: ${data.status} — ${data.error_message ?? ''}`);
  }

  return (data.results ?? []).map((r): RawPlace => ({
    externalId: r.place_id,
    source: 'google',
    name: r.name,
    address: r.formatted_address ?? null,
    neighborhood: extractNeighborhood(r.formatted_address),
    lat: r.geometry?.location.lat ?? null,
    lng: r.geometry?.location.lng ?? null,
    phone: null, // populated via getDetails if needed
    website: null,
    hours: null,
    priceLevel: mapPriceLevel(r.price_level),
    rating: r.rating ?? null,
    reviewCount: r.user_ratings_total ?? null,
    photoUrl: r.photos?.[0]
      ? `${BASE}/photo?maxwidth=800&photo_reference=${r.photos[0].photo_reference}&key=${apiKey}`
      : null,
  }));
}
