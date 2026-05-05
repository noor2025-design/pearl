'use client';

import { useState } from 'react';

const sections = [
  {
    number: '01',
    title: 'Shop Verification',
    content: [
      'All stores featured on Pearl are reviewed before being published.',
      'We verify each shop by reviewing their online presence, including their website or social platforms, product offerings, and overall consistency. We also look for signs of active engagement and recent activity to ensure the store is current and operating.',
      'Some shops may be submitted by our community and are reviewed using the same process before being added.',
      'Verified shops are selected based on quality, relevance, and alignment with the Pearl community.',
      'Pearl is a curated directory. While we aim to highlight trusted shops, inclusion does not serve as an endorsement or guarantee, but as a thoughtful recommendation.',
    ],
  },
  {
    number: '02',
    title: 'Community Reviews',
    content: [
      'Pearl is built on shared experiences, offered thoughtfully and respectfully.',
      'Reviews are based on personal experiences and are reviewed before being published. We look for feedback that is specific, helpful, and kind, focusing on products, service, and overall experience.',
      'Constructive feedback is welcome, but all content must remain respectful. Harmful or misleading reviews will not be published.',
      'Pearl is a curated space shaped by both community contributions and careful review.',
    ],
  },
  {
    number: '03',
    title: 'Proof & Verification',
    content: [
      'To help maintain trust within our community, reviewers may optionally provide supporting details such as photos or proof of purchase when submitting a review.',
      'This information is used for internal review only and is never shared publicly.',
      'Reviews that include supporting details may be noted as a verified experience. In some cases, we may request additional context before publishing, especially for constructive or critical feedback.',
      'All reviews are reviewed by Pearl to ensure they are honest, respectful, and helpful to others.',
    ],
  },
  {
    number: '04',
    title: 'Community Submissions',
    content: [
      'We welcome the community to share stores we may not yet know about.',
      'All submissions are reviewed within 3–5 business days to ensure they meet our standards before being added to Pearl.',
    ],
  },
];

export default function StandardsPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <section className="bg-periwinkle border-b border-periwinkle-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-cream/30 bg-cream/10 text-cream font-ui text-xs font-semibold tracking-wide mb-6">
            ✦ How Pearl Works
          </span>
          <h1
            className="font-ui text-cream font-semibold mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Our Standards
          </h1>
          <p className="font-ui text-cream/80 text-lg leading-relaxed max-w-xl mx-auto">
            Pearl grows through both careful curation and community contribution.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className="bg-white rounded-2xl overflow-hidden shadow-card border border-periwinkle/20 hover:border-periwinkle/50 hover:shadow-card-hover transition-all duration-300 cursor-pointer"
            >
              <div className="h-1.5 bg-periwinkle" />
              <div className="px-8 py-8">
                <div className="flex items-center gap-5">
                  <span className="w-10 h-10 rounded-full bg-periwinkle text-white font-ui text-sm font-bold flex items-center justify-center shrink-0">
                    {section.number}
                  </span>
                  <h2 className="font-ui text-periwinkle text-2xl font-bold flex-1">
                    {section.title}
                  </h2>
                  <svg
                    className={`w-5 h-5 text-periwinkle/50 transition-transform duration-300 ${active === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Expanded content */}
                {active === i && (
                  <div className="mt-6 space-y-4 pl-[60px] border-t border-periwinkle/10 pt-6">
                    {section.content.map((para, j) => (
                      <p key={j} className="font-ui text-text-primary text-base leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-12 text-center">
          <p className="font-ui text-black text-sm tracking-widest uppercase font-bold">
            Pearl grows through both careful curation and community contribution.
          </p>
        </div>
      </section>

    </div>
  );
}
