import { type Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
import DirectoryClient from './DirectoryClient';
import { getAllStores } from '@/lib/stores';
import { fetchOGData } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Browse All Stores',
  description:
    'Browse our full directory of modest fashion boutiques — online US stores, international brands, and local NYC & NJ boutiques.',
};

export default async function DirectoryPage() {
  const stores = getAllStores();

  const ogImages: Record<string, string | null> = {};
  await Promise.allSettled(
    stores
      .filter((s) => s.website)
      .map(async (store) => {
        try {
          const data = await fetchOGData(store.website!);
          ogImages[store.id] = data.image;
        } catch {
          ogImages[store.id] = null;
        }
      })
  );

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center font-ui text-text-secondary text-lg">
          Loading directory…
        </div>
      }
    >
      <DirectoryClient stores={stores} ogImages={ogImages} />
    </Suspense>
  );
}
