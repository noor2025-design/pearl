import type { Metadata } from 'next';
import './globals.css';
import PageWrapper from '@/components/layout/PageWrapper';

export const metadata: Metadata = {
  title: {
    template: '%s | Pearl — Modest Fashion Directory',
    default: 'Pearl — Curated Modest Fashion Directory for Muslim Women',
  },
  description:
    'Discover the best modest fashion boutiques online and in New York City — abayas, hijabs, modest dresses, and occasion wear for Eid and every day.',
  keywords: [
    'modest fashion',
    'Muslim fashion',
    'hijab',
    'abaya',
    'Eid fashion',
    'modest dresses',
    'Islamic clothing',
    'NYC modest fashion',
    'New Jersey modest fashion',
  ],
  metadataBase: new URL('https://pearl-directory.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Pearl',
    title: 'Pearl — Curated Modest Fashion Directory',
    description:
      'A curated directory of modest fashion boutiques for Muslim women — online and local in NYC & NJ.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pearl — Curated Modest Fashion Directory',
    description:
      'A curated directory of modest fashion boutiques for Muslim women — online and local in NYC & NJ.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://use.typekit.net/lzh3nhc.css" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&display=swap" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-cream text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-periwinkle text-white px-4 py-2 rounded-lg font-ui text-sm"
        >
          Skip to main content
        </a>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
