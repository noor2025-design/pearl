/**
 * Normalized intermediate type produced by every API client.
 * Converted into our Store format by dedup.ts.
 */
export interface RawPlace {
  externalId: string;
  source: 'google' | 'yelp' | 'foursquare';
  name: string;
  address: string | null;
  neighborhood: string | null;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  website: string | null;
  /** Human-readable hours string, e.g. "Mon–Sat: 10am–8pm" */
  hours: string | null;
  priceLevel: '$' | '$$' | '$$$' | null;
  rating: number | null;
  reviewCount: number | null;
  /** First photo URL, if available */
  photoUrl: string | null;
}

export interface SyncStats {
  added: number;
  updated: number;
  skipped: number;
  errors: string[];
}
