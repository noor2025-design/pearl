import Link from 'next/link';

export default function StartBrowsing() {
  return (
    <section
      className="bg-white py-10 md:py-14"
      aria-labelledby="start-browsing-heading"
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-5 border border-periwinkle/20 rounded-3xl px-10 py-12 transition-colors duration-300 hover:bg-cream">
          {/* Heading */}
          <h2
            id="start-browsing-heading"
            className="font-ui text-periwinkle font-semibold text-2xl md:text-3xl"
          >
            Submit a Store
          </h2>

          {/* Description */}
          <p className="font-ui text-periwinkle text-base leading-relaxed font-bold">
            Help us build the most comprehensive directory of modest fashion. Share your favorite stores.
          </p>

          {/* CTA button */}
          <Link
            href="/community"
            className="inline-flex items-center justify-center px-8 py-3 border border-periwinkle text-periwinkle font-ui font-semibold text-sm rounded-2xl hover:bg-periwinkle hover:text-white transition-colors"
          >
            Submit a Store
          </Link>
        </div>
      </div>
    </section>
  );
}
