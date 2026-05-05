import storesData from '@/data/stores.json';

export type LocationType = 'online' | 'nyc' | 'nj' | 'international';
export type PriceRange = '$' | '$$' | '$$$';

export interface Store {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  description: string;
  shortDescription: string;
  categories: string[];
  locationType: LocationType;
  shipsToUS: boolean;
  priceRange: PriceRange;
  logoUrl: string;
  featuredImageUrl: string;
  imagePosition?: string;
  featured: boolean;
  featuredOrder: number;
  verified: boolean;
  tags: string[];
  social: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
    twitter?: string;
  };
  address: string | null;
  neighborhood: string | null;
  hours: string | null;
  phone: string | null;
  /** External API IDs — used to match & update records on re-sync */
  externalIds?: {
    google?: string;
    yelp?: string;
    foursquare?: string;
  };
  /** Where the record originated */
  source?: 'manual' | 'google' | 'yelp' | 'foursquare' | 'mixed';
  /** Founder's personal note about this store */
  foundersPickNote?: string;
}

export interface OGData {
  image: string | null;
  title: string | null;
  description: string | null;
}

const stores = storesData as Store[];

export function getAllStores(): Store[] {
  return stores.sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getFeaturedStores(): Store[] {
  return stores
    .filter((s) => s.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find((s) => s.slug === slug);
}

export function getLocalStores(): Store[] {
  return stores.filter((s) => s.locationType === 'nyc' || s.locationType === 'nj');
}

export function getOnlineStores(): Store[] {
  return stores.filter((s) => s.locationType === 'online' || s.locationType === 'international');
}

export function filterStores(params: {
  locationType?: LocationType | 'all';
  category?: string;
  priceRange?: PriceRange;
  shipsToUS?: boolean;
  search?: string;
}): Store[] {
  let result = [...stores];

  if (params.locationType && params.locationType !== 'all') {
    result = result.filter((s) => s.locationType === params.locationType);
  }

  if (params.category) {
    result = result.filter((s) =>
      s.categories.some((c) => c.toLowerCase() === params.category!.toLowerCase())
    );
  }

  if (params.priceRange) {
    result = result.filter((s) => s.priceRange === params.priceRange);
  }

  if (params.shipsToUS !== undefined) {
    result = result.filter((s) => s.shipsToUS === params.shipsToUS);
  }

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.categories.some((c) => c.toLowerCase().includes(q)) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return result.sort((a, b) => a.featuredOrder - b.featuredOrder);
}

export const ALL_CATEGORIES = [
  'Abayas',
  'Hijabs & Scarves',
  'Modest Dresses',
  'Traditional Wear',
  'Occasion Wear',
  'Accessories',
];

export const LOCATION_LABELS: Record<LocationType, string> = {
  online: 'Online · US',
  nyc: 'NYC',
  nj: 'Northern NJ',
  international: 'International',
};

export const LOCATION_COLORS: Record<LocationType, string> = {
  online: 'bg-periwinkle/20 text-periwinkle-dark',
  nyc: 'bg-periwinkle/20 text-periwinkle-dark',
  nj: 'bg-periwinkle/10 text-periwinkle-dark',
  international: 'bg-gray-100 text-gray-600',
};
