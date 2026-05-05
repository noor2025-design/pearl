import Link from 'next/link';
import { type Store } from '@/lib/stores';
import StorePlaceholder from '@/components/ui/StorePlaceholder';

interface LocalSpotlightProps {
  stores: Store[];
}

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus';

export default function LocalSpotlight({ stores }: LocalSpotlightProps) {
  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="local-heading">
      {/* Divider */}
      <div className="h-px bg-periwinkle/20 mb-16" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2
            id="local-heading"
            className="font-display text-periwinkle font-semibold"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Local Stores
          </h2>
        </div>
        <div className="text-center mb-14">
          <p className="font-ui text-periwinkle text-xl md:text-2xl">
            NYC & Northern NJ — shop in person
          </p>
        </div>

        {/* Map + cards layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map embed */}
          <div className="rounded-[15px] overflow-hidden shadow-card order-2 lg:order-1">
            <iframe
              src={MAP_EMBED_URL}
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of NYC and NJ modest fashion boutiques"
              className="w-full h-64 md:h-96 lg:h-full min-h-[320px]"
            />
          </div>

          {/* Store cards */}
          <div className="space-y-4 order-1 lg:order-2">
            {stores.slice(0, 4).map((store) => (
              <article
                key={store.id}
                className="bg-white rounded-[15px] shadow-card p-5 flex gap-4 card-hover"
                aria-label={store.name}
              >
                {/* Placeholder icon */}
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <StorePlaceholder name={store.name} className="w-full h-full text-xl" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-ui text-[#9fadf3] text-lg font-medium leading-tight">
                      {store.name}
                    </h3>
                    <span className="shrink-0 bg-periwinkle/10 text-periwinkle text-xs font-ui font-medium px-2.5 py-1 rounded-full">
                      {store.locationType === 'nyc' ? 'NYC' : 'NJ'}
                    </span>
                  </div>

                  {store.neighborhood && (
                    <p className="font-ui text-sm text-text-secondary mb-1 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 11s-4-3.5-4-6a4 4 0 0 1 8 0c0 2.5-4 6-4 6z" stroke="currentColor" strokeWidth="1.2" fill="none" />
                        <circle cx="6" cy="5" r="1.2" fill="currentColor" />
                      </svg>
                      {store.neighborhood}
                    </p>
                  )}

                  {store.hours && (
                    <p className="font-ui text-xs text-text-secondary">
                      {store.hours}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {store.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="bg-periwinkle/15 text-periwinkle-dark font-ui text-xs px-2.5 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* CTA */}
            <Link
              href="/directory?locationType=nyc"
              className="block text-center py-4 rounded-[15px] border-2 border-periwinkle text-periwinkle font-ui font-medium text-base hover:bg-periwinkle hover:text-white transition-colors"
            >
              See all local stores →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
