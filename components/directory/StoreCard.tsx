'use client';

import Link from 'next/link';
import Image from 'next/image';
import { type Store } from '@/lib/stores';
import { LocationBadge, CategoryTag, FeaturedBadge, PriceBadge, VerifiedBadge } from '@/components/ui/Badge';
import StorePlaceholder from '@/components/ui/StorePlaceholder';
import FoundersPickBadge from '@/components/ui/FoundersPickBadge';
import { useSaved } from '@/lib/useSaved';

interface StoreCardProps {
  store: Store;
  featuredImage?: string | null;
  variant?: 'default' | 'featured' | 'compact';
}

export default function StoreCard({
  store,
  featuredImage,
  variant = 'default',
}: StoreCardProps) {
  const imageUrl = store.featuredImageUrl || featuredImage || store.logoUrl;
  const isFeatured = variant === 'featured';
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(store.id);

  return (
    <article
      className={`rounded-card shadow-card card-hover overflow-hidden flex flex-col group ${
        isFeatured ? 'ring-2 ring-periwinkle/30' : ''
      }`}
      aria-label={`${store.name} — ${store.categories.join(', ')}`}
    >
      {/* Clickable image area */}
      <Link href={`/stores/${store.slug}`} className="relative aspect-[4/3] overflow-hidden bg-cream-dark flex-shrink-0 block">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${store.name} — ${store.categories[0] ?? 'modest fashion'} store`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={90}
            loading="lazy"
          />
        ) : (
          <StorePlaceholder name={store.name} className="w-full h-full" />
        )}

        {/* Badges overlay */}
        {store.verified && (
          <div className="absolute bottom-3 left-3">
            <VerifiedBadge />
          </div>
        )}
        {!store.verified && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 text-xs font-medium font-ui">
              Unverified
            </span>
          </div>
        )}

        {/* Save heart */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(store.id); }}
          aria-label={saved ? 'Remove from saved' : 'Save store'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-colors ${saved ? 'text-periwinkle' : 'text-text-secondary'}`}
            fill={saved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        <Link href={`/stores/${store.slug}`} className="flex items-start justify-between gap-2 mb-1 group/name">
          <h3 className="font-ui text-xl text-text-primary leading-tight group-hover/name:text-periwinkle transition-colors">
            {store.name}
          </h3>
          <PriceBadge price={store.priceRange} className="flex-shrink-0 mt-0.5" />
        </Link>

        <p className="font-ui text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2 flex-1">
          {store.shortDescription}
        </p>

        {/* Tags row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <LocationBadge type={store.locationType} />
          {store.categories.slice(0, 2).map((cat) => (
            <CategoryTag key={cat} label={cat} />
          ))}
          {store.foundersPickNote && (
            <FoundersPickBadge note={store.foundersPickNote} />
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto pt-1">
          <Link
            href={`/stores/${store.slug}`}
            className="flex-1 flex items-center justify-center px-3 py-2.5 rounded-lg border border-periwinkle text-periwinkle text-xs font-medium font-ui hover:bg-periwinkle hover:text-white transition-colors"
          >
            View Details
          </Link>
          {store.website ? (
            <a
              href={store.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-3 py-2.5 rounded-lg border border-periwinkle text-periwinkle text-xs font-medium font-ui hover:bg-periwinkle hover:text-white transition-colors"
            >
              Visit Store ↗
            </a>
          ) : (
            <Link
              href={`/stores/${store.slug}`}
              className="flex-1 flex items-center justify-center px-3 py-2.5 rounded-lg border border-periwinkle text-periwinkle text-xs font-medium font-ui hover:bg-periwinkle hover:text-white transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
