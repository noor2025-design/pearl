'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { type Store, ALL_CATEGORIES } from '@/lib/stores';
import StoreGrid from '@/components/directory/StoreGrid';

interface DirectoryClientProps {
  stores: Store[];
  ogImages: Record<string, string | null>;
}

const LOCATION_FILTERS = [
  { value: 'online', label: 'U.S. Based Online' },
  { value: 'international', label: 'International Online' },
  { value: 'nyc', label: 'NYC Stores' },
  { value: 'nj', label: 'Northern NJ Stores' },
] as const;

const PRICE_OPTIONS = [
  { value: '$', label: 'Under $50' },
  { value: '$$', label: '$50 – $150' },
  { value: '$$$', label: '$150 and up' },
] as const;

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'az', label: 'A–Z' },
  { value: 'newest', label: 'Newest' },
] as const;

function CheckboxOption({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-left group"
      aria-pressed={checked}
    >
      <span
        className={`w-5 h-5 rounded-[4px] shrink-0 border-2 transition-colors flex items-center justify-center ${
          checked
            ? 'bg-cream border-cream'
            : 'bg-white/20 border-cream/40 group-hover:border-cream'
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-periwinkle" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={`font-ui text-sm leading-snug transition-colors ${checked ? 'text-cream font-semibold' : 'text-cream/80 group-hover:text-cream'}`}>
        {label}
      </span>
    </button>
  );
}

// Parse comma-separated param into an array
function parseMulti(val: string | null): string[] {
  if (!val) return [];
  return val.split(',').filter(Boolean);
}

// Toggle a value in a comma-separated param
function toggleMultiParam(
  params: URLSearchParams,
  key: string,
  value: string
): URLSearchParams {
  const next = new URLSearchParams(params.toString());
  const current = parseMulti(params.get(key));
  const updated = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  if (updated.length === 0) {
    next.delete(key);
  } else {
    next.set(key, updated.join(','));
  }
  return next;
}

export default function DirectoryClient({ stores, ogImages }: DirectoryClientProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const locations = parseMulti(params.get('locationType'));
  const categories = parseMulti(params.get('category'));
  const prices = parseMulti(params.get('priceRange'));
  const search = params.get('search') || '';
  const [sort, setSort] = useState<'featured' | 'az' | 'newest'>('featured');

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const toggleLocation = (value: string) => {
    router.push(`${pathname}?${toggleMultiParam(params, 'locationType', value).toString()}`, { scroll: false });
  };

  const toggleCategory = (value: string) => {
    router.push(`${pathname}?${toggleMultiParam(params, 'category', value).toString()}`, { scroll: false });
  };

  const togglePrice = (value: string) => {
    router.push(`${pathname}?${toggleMultiParam(params, 'priceRange', value).toString()}`, { scroll: false });
  };

  const clearAll = () => router.push(pathname, { scroll: false });

  const filtered = useMemo(() => {
    let result = [...stores];

    if (locations.length > 0) {
      result = result.filter((s) => locations.includes(s.locationType));
    }

    if (categories.length > 0) {
      result = result.filter((s) =>
        s.categories.some((c) => categories.some((fc) => fc.toLowerCase() === c.toLowerCase()))
      );
    }

    if (prices.length > 0) {
      result = result.filter((s) => prices.includes(s.priceRange));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categories.some((c) => c.toLowerCase().includes(q)) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sort === 'az') {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'newest') {
      result = result.sort((a, b) => b.featuredOrder - a.featuredOrder);
    } else {
      result = result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.featuredOrder - b.featuredOrder;
      });
    }

    return result;
  }, [stores, locations, categories, prices, search, sort]);

  const hasFilters = locations.length > 0 || categories.length > 0 || prices.length > 0 || !!search;

  return (
    <div className="min-h-screen bg-periwinkle">
      {/* Page header */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 pt-6 pb-4">
        <h1
          className="font-ui text-cream font-semibold mb-3"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Browse Stores
        </h1>
        <p className="font-ui text-cream/80 text-xl mb-4">
          Discover modest fashion shops organized by location
        </p>
      </div>

      {/* Search + Sort */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 mb-8 flex gap-4 items-center">
        <div className="flex-1 bg-periwinkle-dark rounded-2xl flex items-center gap-4 px-6 py-4">
          <svg className="w-5 h-5 text-white shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setParam('search', e.target.value)}
            placeholder="Search stores, categories or locations..."
            className="bg-transparent text-white placeholder-white/70 font-ui text-base outline-none w-full"
          />
        </div>
        <div className="bg-periwinkle-dark rounded-2xl flex items-center gap-1 px-2 py-2 shrink-0">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value as 'featured' | 'az' | 'newest')}
              className={`px-4 py-2 rounded-xl font-ui text-sm whitespace-nowrap transition-colors flex items-center justify-center ${
                sort === opt.value
                  ? 'bg-white text-periwinkle font-semibold'
                  : 'text-white hover:bg-white/15'
              }`}
              aria-pressed={sort === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content: sidebar + grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 pb-16 flex gap-10 items-start">
        {/* Left sidebar */}
        <aside className="w-56 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-ui text-cream text-2xl font-semibold">Filters</h2>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="font-ui text-xs text-cream underline hover:opacity-70 transition-opacity"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="h-px bg-cream/25 mb-4" />

          {/* Location */}
          <div className="mb-1">
            <p className="font-ui font-bold text-cream text-sm mb-3">Location</p>
            <div className="flex flex-col gap-2">
              {LOCATION_FILTERS.map((opt) => (
                <CheckboxOption
                  key={opt.value}
                  label={opt.label}
                  checked={locations.includes(opt.value)}
                  onClick={() => toggleLocation(opt.value)}
                />
              ))}
            </div>
          </div>

          <div className="h-px bg-cream/25 my-4" />

          {/* Price Range */}
          <div className="mb-1">
            <p className="font-ui font-bold text-cream text-sm mb-3">Price Range</p>
            <div className="flex flex-col gap-2">
              {PRICE_OPTIONS.map((p) => (
                <CheckboxOption
                  key={p.value}
                  label={p.label}
                  checked={prices.includes(p.value)}
                  onClick={() => togglePrice(p.value)}
                />
              ))}
            </div>
          </div>

          <div className="h-px bg-cream/25 my-4" />

          {/* Categories */}
          <div>
            <p className="font-ui font-bold text-cream text-sm mb-3">Categories</p>
            <div className="flex flex-col gap-2">
              {ALL_CATEGORIES.map((cat) => (
                <CheckboxOption
                  key={cat}
                  label={cat}
                  checked={categories.includes(cat)}
                  onClick={() => toggleCategory(cat)}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Store grid */}
        <div className="flex-1 min-w-0">
          <p className="font-ui text-sm text-cream/70 mb-6">
            {filtered.length} {filtered.length === 1 ? 'store' : 'stores'} found
          </p>
          <StoreGrid stores={filtered} ogImages={ogImages} />
        </div>
      </div>
    </div>
  );
}
