'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Search stores, styles, or categories...',
  className = '',
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const [value, setValue] = useState(params.get('search') || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    startTransition(() => {
      const next = new URLSearchParams(params.toString());
      if (v) {
        next.set('search', v);
      } else {
        next.delete('search');
      }
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  const handleClear = () => {
    setValue('');
    const next = new URLSearchParams(params.toString());
    next.delete('search');
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="store-search" className="sr-only">
        Search stores
      </label>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          className="text-text-secondary"
        >
          <path
            d="M16.5 16.5l-3.5-3.5m0 0A7 7 0 1 0 13 13z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <input
        id="store-search"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 rounded-xl border border-cream-dark bg-white font-ui text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-periwinkle/40 focus:border-periwinkle shadow-sm"
        autoComplete="off"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Clear search"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
