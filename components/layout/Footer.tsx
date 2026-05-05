'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isBlue = true;
  const quickLinks = [
    { href: '/about', label: 'About Pearl' },
    { href: '/directory', label: 'Browse Stores' },
    { href: '/lookbook', label: 'Lookbook' },
    { href: '/saved', label: 'Saved Stores' },
    { href: '/standards', label: 'Standards' },
    { href: '/stories', label: 'Stories' },
    { href: '/community', label: 'Submit a Store' },
  ];

  const categories = ['Abayas', 'Occasion Wear', 'Traditional Wear'];
  const textColor = isBlue ? 'text-cream/80' : 'text-[#9fadf3]';
  const hoverColor = isBlue ? 'hover:text-cream' : 'hover:text-periwinkle';
  const dividerColor = isBlue ? 'bg-cream/20' : 'bg-periwinkle/20';

  return (
    <footer className={isBlue ? 'bg-periwinkle' : 'bg-cream'} role="contentinfo">
      <div className={`h-px ${dividerColor}`} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        {/* Three-column row: description | quick links | categories — all top-aligned */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_200px] gap-12 items-start mb-16">

          {/* Description */}
          <p className={`font-ui text-base leading-relaxed max-w-md ${textColor}`}>
            Your curated directory for discovering elegant modest fashion shops online around the globe and locally in New York City / Northern New Jersey. Find abayas, occasion wear, hijabs, and modest clothing from trusted U.S. and international stores in one place.
          </p>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className={`font-ui text-sm tracking-widest uppercase ${textColor}`}>
              QUICK LINKS
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`font-ui text-base transition-colors ${textColor} ${hoverColor}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-5">
            <h3 className={`font-ui text-sm tracking-widest uppercase ${textColor}`}>
              CATEGORIES
            </h3>
            <ul className="flex flex-col gap-4" role="list">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/directory?category=${encodeURIComponent(cat)}`}
                    className={`font-ui text-base transition-colors ${textColor} ${hoverColor}`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-8 ${dividerColor}`} />

        {/* Copyright */}
        <div className="flex items-center justify-center gap-2">
          <svg className={`w-5 h-5 shrink-0 ${textColor}`} fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9.354A4 4 0 1 0 15 14.646" strokeLinecap="round" />
          </svg>
          <p className={`font-ui text-base ${textColor}`}>
            {new Date().getFullYear()} PEARL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
