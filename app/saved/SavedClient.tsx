'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSaved } from '@/lib/useSaved';
import type { Store } from '@/lib/stores';
import StorePlaceholder from '@/components/ui/StorePlaceholder';

export default function SavedClient({ stores }: { stores: Store[] }) {
  const { saved, toggle, isSaved } = useSaved();

  const savedStores = stores.filter((s) => isSaved(s.id));

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-periwinkle">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="font-ui text-4xl md:text-5xl text-cream font-semibold mb-3">
            Saved Stores
          </h1>
          <p className="font-ui text-cream/80 text-base">
            Your personal collection of modest fashion shops.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {savedStores.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-4 flex justify-center">
              <svg className="w-16 h-16 text-periwinkle" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h2 className="font-ui text-2xl text-text-primary mb-3">No saved stores yet</h2>
            <p className="font-ui text-text-secondary text-sm mb-6 max-w-xs mx-auto">
              Tap the heart on any store to save it here for later.
            </p>
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cream text-cream font-ui font-medium text-sm hover:bg-cream hover:text-periwinkle transition-colors"
            >
              Browse Stores
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedStores.map((store) => (
              <article key={store.id} className="bg-white rounded-card shadow-card overflow-hidden flex flex-col">
                {/* Store image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark flex-shrink-0">
                  {store.featuredImageUrl || store.logoUrl ? (
                    <Image
                      src={store.featuredImageUrl || store.logoUrl}
                      alt={store.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <StorePlaceholder name={store.name} className="w-full h-full" />
                  )}
                  {/* Heart button overlay */}
                  <button
                    onClick={() => toggle(store.id)}
                    aria-label="Remove from saved"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-periwinkle" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-2">
                    <h2 className="font-ui text-xl text-text-primary leading-tight">{store.name}</h2>
                  </div>
                  <p className="font-ui text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2 flex-1">
                    {store.shortDescription}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/stores/${store.slug}`}
                      className="flex-1 text-center px-3 py-2 rounded-lg border border-cream-dark text-text-primary text-sm font-medium font-ui hover:bg-cream transition-colors"
                    >
                      View Details
                    </Link>
                    {store.website && (
                      <a
                        href={store.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 rounded-lg bg-periwinkle text-white text-sm font-medium font-ui hover:bg-periwinkle-dark transition-colors"
                      >
                        Visit Store ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
