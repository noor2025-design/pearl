import { type LocationType, LOCATION_LABELS } from '@/lib/stores';

interface LocationBadgeProps {
  type: LocationType;
  className?: string;
}

const locationStyles: Record<LocationType, string> = {
  online: 'bg-white text-periwinkle border border-periwinkle/30',
  nyc: 'bg-white text-periwinkle border border-periwinkle/30',
  nj: 'bg-white text-periwinkle border border-periwinkle/30',
  international: 'bg-white text-periwinkle border border-periwinkle/30',
};

export function LocationBadge({ type, className = '' }: LocationBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium font-ui ${locationStyles[type]} ${className}`}
    >
      {LOCATION_LABELS[type]}
    </span>
  );
}

interface CategoryTagProps {
  label: string;
  className?: string;
}

export function CategoryTag({ label, className = '' }: CategoryTagProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-2xl text-xs font-normal font-ui bg-periwinkle text-white ${className}`}
    >
      {label}
    </span>
  );
}

interface PriceBadgeProps {
  price: '$' | '$$' | '$$$';
  className?: string;
}

export function PriceBadge({ price, className = '' }: PriceBadgeProps) {
  return (
    <span className={`font-ui text-xs text-text-secondary font-medium ${className}`}>{price}</span>
  );
}

interface FeaturedBadgeProps {
  className?: string;
}

export function FeaturedBadge({ className = '' }: FeaturedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold font-ui bg-periwinkle text-white shadow-sm ${className}`}
    >
      ★ Featured
    </span>
  );
}

interface VerifiedBadgeProps {
  className?: string;
}

export function VerifiedBadge({ className = '' }: VerifiedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl text-xs font-semibold font-ui bg-periwinkle text-white shadow-sm ${className}`}
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Verified
    </span>
  );
}
