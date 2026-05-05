'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Store } from '@/lib/stores';
import StorePlaceholder from '@/components/ui/StorePlaceholder';
import FoundersPickBadge from '@/components/ui/FoundersPickBadge';
import { useSaved } from '@/lib/useSaved';

interface FeaturedStoresProps {
  stores: Store[];
  ogImages?: Record<string, string | null>;
}

function HomeStoreCard({ store, image }: { store: Store; image: string | null }) {
  const imgSrc = store.featuredImageUrl || image || store.logoUrl;
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(store.id);
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/stores/${store.slug}`)}
      className="bg-white rounded-[15px] overflow-hidden flex flex-col shadow-card card-hover cursor-pointer h-full"
      aria-label={store.name}
    >
      {/* Image */}
      <div className="relative h-[220px] md:h-[260px] overflow-hidden shrink-0">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={`${store.name}`}
            fill
            className="object-cover"
            style={{ objectPosition: store.imagePosition ?? 'center' }}
            sizes="(max-width: 768px) 50vw, 25vw"
            quality={90}
            loading="lazy"
          />
        ) : (
          <StorePlaceholder name={store.name} className="w-full h-full" />
        )}

        {/* Heart button — top left */}
        <div className="absolute top-4 left-4">
          <button
            onClick={(e) => { e.stopPropagation(); toggle(store.id); }}
            aria-label={saved ? `Remove ${store.name} from saved` : `Save ${store.name}`}
            className="bg-white rounded-2xl p-2 shadow hover:bg-cream transition-colors"
          >
            <svg
              className="w-5 h-5 text-periwinkle"
              fill={saved ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Verified badge — bottom left */}
        {store.verified && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-periwinkle text-white font-ui text-xs font-semibold px-3 py-1.5 rounded-2xl flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Verified
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Name + price */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-ui text-black text-lg font-normal leading-tight">
            {store.name}
          </h3>
          <span className="font-ui text-black text-lg shrink-0">{store.priceRange}</span>
        </div>

        {/* Location */}
        <p className="font-ui text-black text-sm">
          {store.locationType === 'online'
            ? store.neighborhood ?? 'U.S. Based'
            : store.locationType === 'international'
            ? store.neighborhood ?? 'International'
            : store.neighborhood ?? 'Local'}
        </p>

        {/* Description */}
        <p className="font-ui text-black text-sm leading-relaxed line-clamp-3">
          {store.description}
        </p>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5 min-h-[72px] content-start">
          {store.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="bg-periwinkle text-white font-ui text-xs font-normal px-3 py-1.5 rounded-2xl"
            >
              {cat}
            </span>
          ))}
          {store.foundersPickNote && (
            <FoundersPickBadge note={store.foundersPickNote} />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/stores/${store.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center whitespace-nowrap px-2 py-2 rounded-lg border border-periwinkle text-periwinkle font-ui text-xs font-medium hover:bg-periwinkle hover:text-white transition-colors"
          >
            View Details
          </Link>
          {store.website && (
            <a
              href={store.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center whitespace-nowrap px-2 py-2 rounded-lg border border-periwinkle text-periwinkle font-ui text-xs font-medium hover:bg-periwinkle hover:text-white transition-colors"
            >
              Visit Store ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedStores({ stores, ogImages = {} }: FeaturedStoresProps) {
  const featured = stores.filter((s) => s.featured).slice(0, 4);

  return (
    <section className="bg-periwinkle py-16 md:py-24" aria-labelledby="featured-heading">

      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-6">
          <h2
            id="featured-heading"
            className="font-ui text-cream font-semibold"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Featured Shops
          </h2>
        </div>
        <div className="text-center mb-14">
          <p className="font-ui text-cream/90 text-xl md:text-2xl">
            Handpicked shops offering exceptional modest fashion
          </p>
        </div>

        {/* Store grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {featured.map((store) => (
            <HomeStoreCard
              key={store.id}
              store={store}
              image={ogImages[store.id] ?? null}
            />
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 px-10 py-4 border border-cream text-cream font-ui font-bold text-lg rounded-2xl hover:bg-cream hover:text-periwinkle transition-colors"
          >
            View All Stores
          </Link>
        </div>
      </div>
    </section>
  );
}
