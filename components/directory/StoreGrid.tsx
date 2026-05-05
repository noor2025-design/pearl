import { type Store } from '@/lib/stores';
import StoreCard from './StoreCard';

interface StoreGridProps {
  stores: Store[];
  ogImages?: Record<string, string | null>;
}

export default function StoreGrid({ stores, ogImages = {} }: StoreGridProps) {
  if (stores.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-ui text-3xl text-text-secondary mb-3">No stores found</p>
        <p className="font-ui text-sm text-text-secondary">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <StoreCard
          key={store.id}
          store={store}
          featuredImage={ogImages[store.id] ?? null}
          variant={store.featured ? 'featured' : 'default'}
        />
      ))}
    </div>
  );
}
