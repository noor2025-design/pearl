import type { RawPlace } from './types';

const BASE = 'https://api.yelp.com/v3';

interface YelpBusiness {
  id: string;
  name: string;
  location: {
    display_address: string[];
    city?: string;
    state?: string;
    zip_code?: string;
  };
  coordinates?: { latitude: number; longitude: number };
  phone?: string;
  url?: string;
  hours?: Array<{ open: Array<{ start: string; end: string; day: number }> }>;
  price?: '$' | '$$' | '$$$' | '$$$$';
  rating?: number;
  review_count?: number;
  image_url?: string;
  is_closed?: boolean;
}

function mapYelpPrice(price: string | undefined): '$' | '$$' | '$$$' | null {
  if (!price) return null;
  if (price === '$') return '$';
  if (price === '$$') return '$$';
  return '$$$'; // $$$ and $$$$ → $$$
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function formatYelpHours(hours: YelpBusiness['hours']): string | null {
  if (!hours?.length) return null;
  const open = hours[0].open;
  if (!open?.length) return null;
  // Group consecutive days with same hours
  const formatted = open.map((h) => {
    const start = h.start.replace(/(\d{2})(\d{2})/, (_, hh, mm) => {
      const hour = parseInt(hh, 10);
      return `${hour > 12 ? hour - 12 : hour || 12}${mm !== '00' ? `:${mm}` : ''}${hour >= 12 ? 'pm' : 'am'}`;
    });
    const end = h.end.replace(/(\d{2})(\d{2})/, (_, hh, mm) => {
      const hour = parseInt(hh, 10);
      return `${hour > 12 ? hour - 12 : hour || 12}${mm !== '00' ? `:${mm}` : ''}${hour >= 12 ? 'pm' : 'am'}`;
    });
    return `${DAY_NAMES[h.day]}: ${start}–${end}`;
  });
  return formatted.join(', ');
}

export async function searchYelp(
  term: string,
  location: string,
  apiKey: string
): Promise<RawPlace[]> {
  const params = new URLSearchParams({
    term,
    location,
    categories: 'womenscloth,fashion,abayas',
    limit: '50',
    sort_by: 'best_match',
  });

  const res = await fetch(`${BASE}/businesses/search?${params}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Yelp HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json() as { businesses?: YelpBusiness[] };

  return (data.businesses ?? [])
    .filter((b) => !b.is_closed)
    .map((b): RawPlace => ({
      externalId: b.id,
      source: 'yelp',
      name: b.name,
      address: b.location.display_address.join(', '),
      neighborhood: b.location.city ?? null,
      lat: b.coordinates?.latitude ?? null,
      lng: b.coordinates?.longitude ?? null,
      phone: b.phone ? b.phone.replace(/^\+1/, '').trim() : null,
      website: b.url ?? null, // Yelp URL, not business website
      hours: formatYelpHours(b.hours),
      priceLevel: mapYelpPrice(b.price),
      rating: b.rating ?? null,
      reviewCount: b.review_count ?? null,
      photoUrl: b.image_url ?? null,
    }));
}
