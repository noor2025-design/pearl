import { type Metadata } from 'next';

import HeroSection from '@/components/home/HeroSection';
import FeaturedStores from '@/components/home/FeaturedStores';
import FeaturedStory from '@/components/home/FeaturedStory';
import StartBrowsing from '@/components/home/Newsletter';
import MarqueeBanner from '@/components/home/MarqueeBanner';
import { getAllStores } from '@/lib/stores';

const categoryItems = ['Abayas', 'Occasion Wear', 'Hijabs', 'Modest Dresses', 'Traditional Wear', 'Luxury Modest', 'Heritage Fashion', 'Contemporary Modest'];
const storeItems = ['Merrachi', 'Vela', 'Veiled', 'Niswa Fashion', 'Haute Hijab', 'Aab Collection', 'Modesque', 'Anatomi', 'Zena', 'Menatique', 'Urban Modesty', 'LaMeera Moda', 'Zadina Abayas', 'Kabayare', 'Aaliya Collections', 'By Hasanat', 'Abaya Buth'];

export const metadata: Metadata = {
  title: 'Pearl — Curated Modest Fashion Directory',
};

export default function HomePage() {
  const allStores = getAllStores();

  return (
    <>
      <HeroSection />
      <FeaturedStores stores={allStores} ogImages={{}} />
      <MarqueeBanner items={storeItems} variant="periwinkle" speed={20} />
      <FeaturedStory />
      <StartBrowsing />
    </>
  );
}
