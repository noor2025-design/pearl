import Link from 'next/link';
import Image from 'next/image';
import { getStoryBySlug } from '@/lib/stories';

export default function FeaturedStory() {
  const story = getStoryBySlug('merrachi-founder');
  if (!story) return null;

  const firstSection = story.interview[0];

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-periwinkle text-white font-ui text-xs font-semibold tracking-wide">
            ✦ Featured Story
          </span>
          <div className="flex-1 h-px bg-periwinkle/15" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="w-full aspect-[4/5] relative rounded-[25%] overflow-hidden">
              <Image
                src="/merrachi-founder.jpg"
                alt={`${story.founderName} — ${story.brandName}`}
                fill
                className="object-cover object-top"
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-periwinkle/20 -z-10" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-7">
            <div>
              <p className="font-ui text-xs text-periwinkle/60 uppercase tracking-widest mb-2">
                {story.founderName} · {story.brandName}
              </p>
              <h2 className="font-ui text-text-primary font-semibold leading-tight" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
                {story.title}
              </h2>
            </div>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-periwinkle pl-5 py-1">
              <p className="font-ui text-lg text-periwinkle leading-relaxed italic">
                {story.pullQuote}
              </p>
            </blockquote>

            {/* Story excerpt */}
            {firstSection && (
              <p className="font-ui text-text-secondary text-base leading-relaxed line-clamp-4">
                {firstSection.answer}
              </p>
            )}

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/stories/${story.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-periwinkle text-white font-ui font-semibold text-sm rounded-2xl hover:bg-periwinkle-dark transition-colors"
              >
                Read Full Story
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href={`/stores/${story.brandSlug}`}
                className="font-ui text-sm text-periwinkle font-medium hover:underline"
              >
                View Store →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
