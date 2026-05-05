import { type Metadata } from 'next';
import LookbookGrid from './LookbookGrid';
import { looks } from './looks-data';

export const metadata: Metadata = {
  title: 'Lookbook | Pearl',
  description: 'Curated modest fashion looks and style inspiration from Pearl.',
};

export default function LookbookPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section className="bg-periwinkle py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cream text-periwinkle font-ui text-xs font-semibold tracking-wide mb-6">
            ✦ Style Edit
          </span>
          <h1
            className="font-ui text-cream font-semibold mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            The Pearl Lookbook
          </h1>
          <p className="font-ui text-cream/80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            Curated looks celebrating the beauty of modest fashion. Hover to shop each look.
          </p>
        </div>
      </section>

      {/* Full-bleed grid */}
      <LookbookGrid looks={looks} />

      {/* Attribution note */}
      <div className="bg-periwinkle py-8 px-6 text-center">
        <p className="font-ui text-cream text-xs leading-relaxed max-w-2xl mx-auto">
          All images in this lookbook are sourced from the respective brands and are used for inspiration and discovery. Pearl does not own these images. Full credit goes to the original creators.
        </p>
      </div>
    </div>
  );
}
