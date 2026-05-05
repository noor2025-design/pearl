'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/directory', label: 'BROWSE STORES' },
    { href: '/community', label: 'COMMUNITY' },
    { href: '/lookbook', label: 'LOOKBOOK' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    const [path, query] = href.split('?');
    if (!pathname.startsWith(path)) return false;
    if (!query) {
      // Bare /directory is only active when no locationType param is present
      if (path === '/directory') return !searchParams.get('locationType');
      return true;
    }
    // Has query params — all must match
    const hrefParams = new URLSearchParams(query);
    let match = true;
    hrefParams.forEach((val, key) => { if (searchParams.get(key) !== val) match = false; });
    if (!match) return false;
    return true;
  };

  // Blue background on certain pages or when scrolled past hero
  const isBlue = pathname.startsWith('/community') || pathname.startsWith('/stores') || (pathname.startsWith('/stories/')) || (scrolled && !pathname.startsWith('/directory'));

  const bg = isBlue
    ? 'bg-periwinkle shadow-sm'
    : 'bg-cream shadow-sm';

  const onDark = isBlue;

  const logoColor = onDark ? 'text-cream' : 'text-periwinkle';
  const linkActive = onDark ? 'text-cream border-b-2 border-cream pb-0.5' : 'text-periwinkle border-b-2 border-periwinkle pb-0.5';
  const linkInactive = onDark ? 'text-cream/80 hover:text-cream' : 'text-periwinkle/80 hover:text-periwinkle';
  const iconColor = onDark ? 'text-cream hover:text-cream/70' : 'text-periwinkle hover:text-periwinkle/70';
  const hamburgerColor = onDark ? 'text-cream hover:bg-cream/10' : 'text-periwinkle hover:bg-periwinkle/10';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
        <nav
          className="w-full px-6 lg:px-10 h-[72px] flex items-center justify-between gap-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className={`font-display text-3xl tracking-widest font-semibold shrink-0 ${logoColor}`}
            aria-label="Pearl — Home"
          >
            PEARL
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-ui text-[15px] font-bold tracking-wide transition-colors duration-150 ${
                    isActive(link.href) ? linkActive : linkInactive
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side icons + Sign In */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search icon */}
            <Link href="/directory" aria-label="Search stores">
              <svg
                className={`w-6 h-6 transition-colors ${iconColor}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Heart / Saved icon */}
            <Link href="/saved" aria-label="Saved stores">
              <svg
                className={`w-6 h-6 transition-colors ${iconColor}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${hamburgerColor}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className="block w-5 h-0.5 bg-current mb-1.5 transition-all"
              style={{ transform: mobileOpen ? 'rotate(45deg) translate(1.5px, 6px)' : 'none' }}
            />
            <span
              className="block w-5 h-0.5 bg-current mb-1.5 transition-all"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-0.5 bg-current transition-all"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translate(1.5px, -6px)' : 'none' }}
            />
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`md:hidden border-t overflow-hidden transition-all duration-300 ${
            isBlue ? 'bg-periwinkle-dark border-periwinkle-dark' : 'bg-white border-cream-dark'
          } ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <ul className="px-6 py-4 space-y-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium font-ui tracking-wide transition-colors ${
                    isActive(link.href)
                      ? isBlue ? 'bg-cream/20 text-cream' : 'bg-periwinkle/10 text-periwinkle'
                      : isBlue ? 'text-cream/80 hover:bg-cream/10 hover:text-cream' : 'text-periwinkle hover:bg-cream-dark'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
