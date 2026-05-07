import Link from 'next/link';
import Image from 'next/image';
import { getAllStories } from '@/lib/stories';

export const metadata = {
  title: 'Founder Stories | Pearl',
  description: 'Interviews with the founders behind the modest fashion brands you love.',
};

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="bg-periwinkle border-b border-periwinkle-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-cream/30 bg-cream/10 text-cream font-ui text-xs font-semibold tracking-wide mb-6">
            ✦ Founder Stories
          </span>
          <h1 className="font-ui text-5xl md:text-6xl text-cream font-semibold mb-5">
            Behind the Brand
          </h1>
          <p className="font-ui text-lg text-cream/80 leading-relaxed max-w-xl mx-auto">
            These brand stories are based on publicly available information from brand websites, social media, and other online platforms. As Pearl grows, we hope to connect directly with founders and feature original interviews here, giving you a deeper and more personal look into the brands in our directory.
          </p>
        </div>
      </section>

      {/* Stories grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="group bg-white rounded-2xl shadow-card overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              {/* Image / placeholder */}
              <div className="h-56 bg-periwinkle/10 flex items-center justify-center relative overflow-hidden">
                {story.cardImageUrl ? (
                  <>
                    <Image
                      src={story.cardImageUrl}
                      alt={`${story.founderName} — ${story.brandName}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* dark overlay so text is readable */}
                    <div className="absolute inset-0 bg-periwinkle/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                      <p className="font-ui text-cream text-sm font-bold uppercase tracking-widest mb-1">
                        Founder Story
                      </p>
                      <p className="font-ui text-cream text-2xl font-semibold drop-shadow">
                        {story.founderName}
                      </p>
                    </div>
                    {/* photo credit */}
                    {story.photoCredit && (
                      <span className="absolute bottom-2 right-3 font-ui text-[10px] text-cream/60">
                        Photo: {story.photoCredit}
                      </span>
                    )}
                  </>
                ) : (
                  <div className="text-center px-6">
                    <p className="font-ui text-periwinkle/50 text-sm font-medium uppercase tracking-widest mb-1">
                      Founder Story
                    </p>
                    <p className="font-ui text-periwinkle text-2xl font-semibold">
                      {story.brandName}
                    </p>
                  </div>
                )}
                {story.featured && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-periwinkle text-cream font-ui text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <p className="font-ui text-xs text-periwinkle uppercase tracking-widest mb-2">
                  {story.founderName} · {story.brandName}
                </p>
                <h2 className="font-ui text-xl text-text-primary font-semibold leading-snug mb-3 group-hover:text-periwinkle transition-colors">
                  {story.title}
                </h2>
                <p className="font-ui text-sm text-text-secondary leading-relaxed italic flex-1">
                  {story.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-2 text-periwinkle font-ui text-sm font-semibold">
                  Read Story
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
