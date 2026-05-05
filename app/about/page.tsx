import { type Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Pearl',
  description: 'Pearl is a curated directory of modest fashion for women, connecting local shops in NYC and NJ with international online brands.',
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/about-hero-2.jpg"
          alt=""
          fill
          className="object-cover object-bottom"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 text-center">
          <h1 className="font-ui text-5xl md:text-8xl text-cream font-semibold whitespace-nowrap">
            About Pearl
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-7 font-ui text-text-primary text-lg leading-relaxed">
          <p>
            Pearl was created from a familiar feeling. Every year around Eid and special occasions, finding something modest and stylish feels harder than it should be.
          </p>
          <p>
            As someone based in New York City, the founder experienced this firsthand. What should feel exciting often turns into frustration.
          </p>
          <p>
            It starts with one idea, then turns into endless searching. Too many tabs open. Scattered social media pages across Instagram and TikTok. Recommendations passed through word of mouth. Local stores you come across once and can't easily find again. International online brands that are hard to keep track of. Nothing lives in one place.
          </p>
          <p>
            So Pearl was created to do something about it.
          </p>
          <p className="font-semibold text-periwinkle">
            Pearl brings it all together.
          </p>
          <p>
            It's a curated directory of modest fashion for women, connecting women with local shops in New York City and Northern New Jersey, as well as U.S.-based online and international brands from around the world. Everything is organized so you can browse, search, and discover without the overwhelm.
          </p>
          <p>
            Pearl is starting small and intentional. The focus is on New York City, Northern New Jersey, and trusted online brands. Over time, the goal is to expand to local stores across the United States, and eventually to modest fashion destinations around the world.
          </p>
          <p>
            The goal is simple. To make finding something to wear feel clear, calm, and intentional.
          </p>
          <p>
            We can't do this alone. Pearl is growing with the community, and we welcome contributions to help surface stores and brands we may not yet know about.
          </p>
        </div>

      </section>
    </div>
  );
}
