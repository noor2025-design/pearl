import Link from 'next/link';

const FILTERS = [
  {
    href: '/directory?locationType=online',
    title: 'U.S. Based Online',
    subtitle: 'Shop from American brands',
    icon: (
      <svg className="w-8 h-8 text-cream" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    href: '/directory?locationType=nyc',
    title: 'NYC & Northern NJ',
    subtitle: 'Visit local shops',
    icon: (
      <svg className="w-8 h-8 text-cream" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3C10.49 3 6 7.49 6 13c0 7.77 9.1 15.47 9.47 15.79a.75.75 0 0 0 1.06 0C16.9 28.47 26 20.77 26 13c0-5.51-4.49-10-10-10zm0 14.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
      </svg>
    ),
  },
  {
    href: '/directory?locationType=international',
    title: 'International Online',
    subtitle: 'Explore shops from around the world',
    icon: (
      <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function FilterCards() {
  return (
    <section className="bg-cream py-16" aria-label="Browse by location type">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-5 justify-center flex-wrap">
          {FILTERS.map((filter) => (
            <Link
              key={filter.href}
              href={filter.href}
              className="flex items-center gap-5 bg-cream border border-periwinkle rounded-2xl px-7 py-6 flex-1 min-w-[260px] max-w-sm hover:bg-cream-dark transition-colors group card-hover"
            >
              {/* Icon badge */}
              <div className="w-16 h-16 rounded-[31px] bg-periwinkle flex items-center justify-center shrink-0">
                {filter.icon}
              </div>

              {/* Text */}
              <div>
                <p className="font-ui text-periwinkle font-semibold text-xl leading-tight mb-1">
                  {filter.title}
                </p>
                <p className="font-ui text-text-secondary text-sm">
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
