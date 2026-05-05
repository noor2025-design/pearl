'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Shop {
  name: string;
  slug: string;
  url?: string; // optional direct product/store URL
}

interface Look {
  id: number;
  title: string;
  imageUrl: string;
  imagePosition?: string;
  shops: Shop[];
}

function LookCard({ look }: { look: Look }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative overflow-hidden bg-neutral-900 cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Image */}
      {look.imageUrl ? (
        <Image
          src={look.imageUrl}
          alt={look.title}
          width={900}
          height={1600}
          quality={90}
          className="w-full aspect-[9/16] object-cover block"
          style={{ objectPosition: look.imagePosition ?? '50% 0%' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <div className="w-full aspect-[9/16] flex items-center justify-center bg-neutral-800">
          <p className="font-ui text-neutral-600 text-xs uppercase tracking-widest text-center px-4">
            {look.title}
          </p>
        </div>
      )}

      {/* Slide-up shop panel */}
      <div
        className={`absolute inset-x-0 bottom-0 bg-white transition-transform duration-300 ease-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-neutral-100">
          <h3 className="font-ui text-text-primary text-base font-semibold">
            Shop the look
          </h3>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="text-neutral-400 hover:text-neutral-700 transition-colors text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Store rows */}
        <div className="divide-y divide-neutral-100">
          {look.shops.map((shop) => (
            <Link
              key={shop.slug}
              href={shop.url ?? `/stores/${shop.slug}`}
              target={shop.url ? '_blank' : undefined}
              rel={shop.url ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                {/* Thumbnail placeholder */}
                <div className="w-11 h-11 rounded-md bg-periwinkle/10 flex items-center justify-center shrink-0">
                  <span className="font-ui text-periwinkle text-xs font-bold">
                    {shop.name.charAt(0)}
                  </span>
                </div>
                <span className="font-ui text-text-primary text-sm font-medium">
                  {shop.name}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-neutral-400 group-hover:text-periwinkle group-hover:translate-x-0.5 transition-all"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LookbookGrid({ looks }: { looks: Look[] }) {
  return (
    <div className="grid grid-cols-3 gap-px bg-neutral-700">
      {looks.map((look) => (
        <LookCard key={look.id} look={look} />
      ))}
    </div>
  );
}
