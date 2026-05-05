import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { getAllStores, getStoreBySlug, type Store } from '@/lib/stores';
import { fetchOGData } from '@/lib/og';
import { LocationBadge, CategoryTag, FeaturedBadge, PriceBadge, VerifiedBadge } from '@/components/ui/Badge';
import FoundersPickBadge from '@/components/ui/FoundersPickBadge';
import StorePlaceholder from '@/components/ui/StorePlaceholder';
import StoreCard from '@/components/directory/StoreCard';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = getStoreBySlug(params.slug);
  if (!store) return { title: 'Store Not Found' };
  return {
    title: store.name,
    description: store.description,
    openGraph: {
      title: `${store.name} | Pearl Modest Fashion Directory`,
      description: store.description,
    },
  };
}

function getRelatedStores(store: Store, all: Store[]): Store[] {
  return all
    .filter(
      (s) =>
        s.id !== store.id &&
        (s.categories.some((c) => store.categories.includes(c)) ||
          s.locationType === store.locationType)
    )
    .slice(0, 3);
}

export default async function StoreDetailPage({ params }: Props) {
  const store = getStoreBySlug(params.slug);
  if (!store) notFound();

  const allStores = getAllStores();
  const related = getRelatedStores(store, allStores);

  // Fetch OG data for this store
  let ogData = { image: null as string | null, title: null as string | null, description: null as string | null };
  if (store.website) {
    try { ogData = await fetchOGData(store.website); } catch { /* use defaults */ }
  }

  // Fetch OG images for related stores
  const relatedOgImages: Record<string, string | null> = {};
  await Promise.allSettled(
    related.filter((s) => s.website).map(async (s) => {
      try {
        const d = await fetchOGData(s.website!);
        relatedOgImages[s.id] = d.image;
      } catch { relatedOgImages[s.id] = null; }
    })
  );

  const heroImage = store.featuredImageUrl || ogData.image || store.logoUrl;

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-ui text-sm text-text-secondary" role="list">
              <li><Link href="/" className="hover:text-text-primary transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/directory" className="hover:text-text-primary transition-colors">Directory</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-text-primary font-medium" aria-current="page">{store.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero image */}
            <div className="relative aspect-video rounded-card overflow-hidden bg-cream-dark shadow-card">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={`${store.name} — ${store.categories[0] ?? 'modest fashion'}`}
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              ) : (
                <StorePlaceholder name={store.name} className="w-full h-full text-5xl" />
              )}
              {store.verified && (
                <div className="absolute bottom-4 left-4">
                  <VerifiedBadge />
                </div>
              )}
            </div>

            {/* Store info */}
            <div>
              <div className="flex flex-wrap items-start gap-3 mb-4">
                <h1 className="font-ui text-4xl md:text-5xl text-text-primary leading-tight">
                  {store.name}
                </h1>
                <PriceBadge price={store.priceRange} className="text-base mt-1" />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <LocationBadge type={store.locationType} />
                {store.categories.map((cat) => (
                  <CategoryTag key={cat} label={cat} />
                ))}
                {store.foundersPickNote && (
                  <FoundersPickBadge note={store.foundersPickNote} />
                )}
                {!store.verified && (
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium font-ui bg-yellow-100 text-yellow-700 border border-yellow-200">
                    Unverified listing
                  </span>
                )}
              </div>

              <p className="font-ui text-text-primary text-base md:text-lg leading-relaxed mb-4">
                {store.description}
              </p>

              {!store.verified && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                  <p className="font-ui text-sm text-yellow-800">
                    ⚠ This listing has not been fully verified. Store details may be incomplete or outdated. Please confirm directly with the store before visiting.
                  </p>
                </div>
              )}

              {/* Tags */}
              {store.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {store.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-cream-dark text-text-secondary font-ui text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Social links */}
            {(store.social?.instagram || store.social?.tiktok) && (
              <div>
                <h2 className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">
                  Follow on Social
                </h2>
                <div className="flex flex-wrap gap-3">
                  {store.social?.instagram && (
                    <a
                      href={store.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-periwinkle/30 text-periwinkle font-ui text-sm hover:bg-periwinkle hover:text-white transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                      Instagram
                    </a>
                  )}
                  {store.social?.tiktok && (
                    <a
                      href={store.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-periwinkle/30 text-periwinkle font-ui text-sm hover:bg-periwinkle hover:text-white transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                      </svg>
                      TikTok
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Local store info */}
            {(store.address || store.hours || store.phone) && (
              <div className="bg-white rounded-card shadow-card p-6">
                <h2 className="font-ui text-xl text-text-primary mb-4">Visit In Store</h2>
                <dl className="space-y-3">
                  {store.address && (
                    <div>
                      <dt className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Address</dt>
                      <dd className="font-ui text-sm text-text-primary">{store.address}</dd>
                    </div>
                  )}
                  {store.neighborhood && (
                    <div>
                      <dt className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Neighborhood</dt>
                      <dd className="font-ui text-sm text-text-primary">{store.neighborhood}</dd>
                    </div>
                  )}
                  {store.hours && (
                    <div>
                      <dt className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Hours</dt>
                      <dd className="font-ui text-sm text-text-primary">{store.hours}</dd>
                    </div>
                  )}
                  {store.phone && (
                    <div>
                      <dt className="font-ui text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Phone</dt>
                      <dd className="font-ui text-sm text-text-primary">
                        <a href={`tel:${store.phone}`} className="hover:text-periwinkle transition-colors">{store.phone}</a>
                      </dd>
                    </div>
                  )}
                </dl>

                {/* Map embed for local stores */}
                {store.address && (
                  <div className="mt-5">
                    <div className="rounded-xl overflow-hidden">
                      <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(store.address)}&output=embed`}
                        width="600"
                        height="250"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-48 md:h-64"
                        title={`Map showing location of ${store.name}`}
                      />
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex w-full items-center justify-center gap-2 px-5 py-3 rounded-lg bg-periwinkle text-white font-ui font-medium text-sm hover:bg-periwinkle-dark transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                      </svg>
                      Get Directions
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div className="bg-white rounded-card shadow-card p-6 sticky top-24">
              <h2 className="font-ui text-xl text-text-primary mb-2">{store.name}</h2>
              <p className="font-ui text-sm text-text-secondary mb-5">{store.shortDescription}</p>

              {store.website ? (
                <a
                  href={store.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center px-5 py-3 rounded-lg border border-periwinkle text-periwinkle font-medium font-ui text-sm hover:bg-periwinkle hover:text-white transition-colors mb-3"
                >
                  Visit Store ↗
                </a>
              ) : (
                <p className="font-ui text-sm text-text-secondary text-center mb-3 italic">
                  No website available — visit in person
                </p>
              )}

              <Link
                href="/directory"
                className="flex w-full items-center justify-center px-5 py-3 rounded-lg border border-periwinkle text-periwinkle font-medium font-ui text-sm hover:bg-periwinkle hover:text-white transition-colors"
              >
                ← Back to Directory
              </Link>

              {/* Quick info */}
              <div className="mt-5 pt-5 border-t border-cream-dark space-y-3">
                <div className="flex justify-between font-ui text-sm">
                  <span className="text-text-secondary">Location</span>
                  <LocationBadge type={store.locationType} />
                </div>
                <div className="flex justify-between font-ui text-sm">
                  <span className="text-text-secondary">Price Range</span>
                  <PriceBadge price={store.priceRange} />
                </div>
                <div className="flex justify-between font-ui text-sm">
                  <span className="text-text-secondary">Ships to US</span>
                  <span className="font-medium">{store.shipsToUS ? '✓ Yes' : 'Ask Store'}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related stores */}
        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-ui text-2xl md:text-3xl text-text-primary mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((s) => (
                <StoreCard key={s.id} store={s} featuredImage={relatedOgImages[s.id] ?? null} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
