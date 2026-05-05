'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ALL_CATEGORIES, type LocationType } from '@/lib/stores';

const LOCATION_OPTIONS: { value: LocationType | 'all' | 'local'; label: string }[] = [
  { value: 'all', label: 'All Locations' },
  { value: 'online', label: 'U.S. Based Online' },
  { value: 'local', label: 'NYC & Northern NJ' },
  { value: 'international', label: 'International Online' },
];

const PRICE_OPTIONS = ['$', '$$', '$$$'] as const;

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured First' },
  { value: 'az', label: 'A–Z' },
  { value: 'newest', label: 'Newest Added' },
];

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const locationType = params.get('locationType') || 'all';
  const category = params.get('category') || '';
  const priceRange = params.get('priceRange') || '';
  const sort = params.get('sort') || 'featured';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === '' || value === 'all') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const clearAll = () => router.push(pathname, { scroll: false });

  const hasFilters = locationType !== 'all' || category || priceRange;

  return (
    <div className="space-y-4">
      {/* Location type chips */}
      <div>
        <p className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
          Location
        </p>
        <div className="filter-scroll">
          {LOCATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam('locationType', opt.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium font-ui border transition-colors ${
                locationType === opt.value
                  ? 'bg-periwinkle border-periwinkle text-white'
                  : 'bg-white border-cream-dark text-text-secondary hover:border-periwinkle hover:text-periwinkle'
              }`}
              aria-pressed={locationType === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div>
        <p className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
          Category
        </p>
        <div className="filter-scroll">
          <button
            onClick={() => updateParam('category', '')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium font-ui border transition-colors ${
              !category
                ? 'bg-periwinkle border-periwinkle text-white'
                : 'bg-white border-cream-dark text-text-secondary hover:border-periwinkle hover:text-periwinkle-dark'
            }`}
            aria-pressed={!category}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => updateParam('category', cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium font-ui border transition-colors ${
                category === cat
                  ? 'bg-periwinkle border-periwinkle text-white'
                  : 'bg-white border-cream-dark text-text-secondary hover:border-periwinkle hover:text-periwinkle-dark'
              }`}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price + Sort row */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-wider">
            Price:
          </span>
          <div className="flex gap-1.5">
            {PRICE_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => updateParam('priceRange', priceRange === p ? '' : p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium font-ui border transition-colors ${
                  priceRange === p
                    ? 'bg-text-primary border-text-primary text-cream'
                    : 'bg-white border-cream-dark text-text-secondary hover:border-text-primary'
                }`}
                aria-pressed={priceRange === p}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-cream-dark bg-white font-ui text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-periwinkle/40 focus:border-periwinkle"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="font-ui text-xs text-text-secondary underline hover:text-text-primary transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
