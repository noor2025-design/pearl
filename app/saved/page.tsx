import { getAllStores } from '@/lib/stores';
import SavedClient from './SavedClient';

export default function SavedPage() {
  const stores = getAllStores();
  return <SavedClient stores={stores} />;
}
