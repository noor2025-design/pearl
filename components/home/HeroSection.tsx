import Link from 'next/link';
import Image from 'next/image';

const FILTERS = [
  {
    href: '/directory?locationType=online',
    title: 'U.S. Based Local and Online',
    subtitle: 'Shop from American brands',
    icon: (
      <svg className="w-7 h-7 text-cream" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    href: '/directory?locationType=international',
    title: 'International Online',
    subtitle: 'Explore shops from around the world',
    icon: (
      <svg className="w-7 h-7 text-cream" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen" aria-labelledby="hero-headline">
      {/* Background image */}
      <Image
        src="/hero-image.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden="true"
      />

      {/* Dark overlay so text stays legible */}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-8 pt-24 md:pt-36 lg:pt-44 pb-14">
        {/* Headline + CTAs */}
        <div className="max-w-2xl mb-20">
          <h1
            id="hero-headline"
            className="font-display text-hero text-cream leading-tight mb-14 font-semibold"
          >
            Everything you need for Eid, all in one place.
          </h1>

          <p className="font-ui font-bold text-cream/90 text-xl md:text-2xl leading-relaxed mb-10">
            A curated directory of modest fashion brands for traditional and special occasion wear for muslim women. Find abayas, traditional pieces, and elegant special occasion dresses from trusted shops in the U.S. and abroad.
          </p>

          <div className="flex flex-wrap gap-5 mb-8">
            <Link
              href="/directory"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-cream text-cream font-ui font-bold text-lg rounded-2xl hover:bg-cream hover:text-periwinkle transition-colors w-fit"
            >
              Browse All Stores
            </Link>
          </div>
        </div>

        {/* Filter cards — full width row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FILTERS.map((filter) => (
            <Link
              key={filter.href}
              href={filter.href}
              className="flex items-center gap-5 bg-white/15 border border-cream/30 backdrop-blur-sm rounded-2xl px-7 py-5 hover:bg-white/25 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-periwinkle flex items-center justify-center shrink-0">
                {filter.icon}
              </div>
              <div>
                <p className="font-ui text-cream font-semibold text-base leading-tight mb-1">
                  {filter.title}
                </p>
                <p className="font-ui text-cream/70 text-sm">
                  {filter.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
