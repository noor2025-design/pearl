import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { type Metadata } from 'next';
import { getStoryBySlug, getAllStories } from '@/lib/stories';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = getStoryBySlug(params.slug);
  if (!story) return { title: 'Story Not Found' };
  return {
    title: `${story.title} | Pearl`,
    description: story.excerpt,
  };
}

export default function StoryPage({ params }: Props) {
  const story = getStoryBySlug(params.slug);
  if (!story) notFound();

  const allStories = getAllStories().filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 font-ui text-sm text-text-secondary">
            <li><Link href="/" className="hover:text-text-primary transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/community" className="hover:text-text-primary transition-colors">Community</Link></li>
            <li>/</li>
            <li><Link href="/stories" className="hover:text-text-primary transition-colors">Stories</Link></li>
            <li>/</li>
            <li className="text-text-primary font-medium">{story.brandName}</li>
          </ol>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-periwinkle/30 bg-periwinkle/10 text-periwinkle font-ui text-xs font-semibold tracking-wide mb-6">
            ✦ Brand Story
          </span>
          <p className="font-ui text-sm text-text-secondary uppercase tracking-widest mb-3">
            {story.founderName} · {story.brandName}
          </p>
          <h1 className="font-ui text-4xl md:text-5xl text-text-primary font-semibold leading-tight mb-8">
            {story.title}
          </h1>

          {/* Pull quote */}
          <blockquote className="border-l-4 border-periwinkle pl-6 py-2 mb-8">
            <p className="font-ui text-xl text-periwinkle leading-relaxed italic">
              {story.pullQuote}
            </p>
          </blockquote>

          {/* Story image */}
          <div className="mb-10">
            <div className="w-full relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              {story.imageUrl ? (
                <Image
                  src={story.imageUrl}
                  alt={`${story.brandName} — brand story`}
                  fill
                  className="object-cover object-top"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              ) : (
                <div className="w-full h-full bg-cream-dark" />
              )}
            </div>
            {story.imageUrl && story.photoCredit && (
              <p className="font-ui text-[11px] text-text-secondary mt-2 text-right">
                Photo: {story.photoCredit}
              </p>
            )}
          </div>
        </div>

        {/* Story sections */}
        <div className="space-y-10">
          {story.interview.map((item, i) => (
            <div key={i}>
              <h2 className="font-ui text-periwinkle font-semibold text-lg mb-3">
                {item.question}
              </h2>
              <p className="font-ui text-text-primary text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Source disclaimer */}
        {story.sourcedFromWebsite && (
          <div className="mt-10 pt-8 border-t border-cream-dark">
            <p className="font-ui text-xs text-text-secondary leading-relaxed italic">
              These brand stories are based on publicly available information from brand websites, social media, and other online platforms. As Pearl grows, we hope to connect directly with founders and feature original interviews here, giving you a deeper and more personal look into the brands in our directory.
            </p>
          </div>
        )}

        {/* Brand link */}
        {story.brandSlug && (
          <div className="mt-14 pt-10 border-t border-cream-dark">
            <p className="font-ui text-sm text-text-secondary mb-4">
              Explore {story.brandName} on Pearl
            </p>
            <Link
              href={`/stores/${story.brandSlug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-periwinkle text-periwinkle font-ui font-semibold text-sm hover:bg-periwinkle hover:text-white transition-colors"
            >
              View {story.brandName} Profile →
            </Link>
          </div>
        )}
      </article>

      {/* More stories */}
      {allStories.length > 0 && (
        <section className="bg-white border-t border-cream-dark mt-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="font-ui text-2xl text-text-primary font-semibold mb-8">More Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {allStories.map((s) => (
                <Link
                  key={s.id}
                  href={`/stories/${s.slug}`}
                  className="group bg-cream rounded-2xl p-6 hover:bg-periwinkle/5 transition-colors"
                >
                  <p className="font-ui text-xs text-text-secondary uppercase tracking-widest mb-2">
                    {s.founderName} · {s.brandName}
                  </p>
                  <h3 className="font-ui text-lg text-text-primary font-semibold leading-snug group-hover:text-periwinkle transition-colors mb-2">
                    {s.title}
                  </h3>
                  <p className="font-ui text-sm text-text-secondary italic">{s.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-periwinkle font-ui text-sm font-semibold">
                    Read Story
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
