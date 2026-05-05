export interface Look {
  id: number;
  title: string;
  imageUrl: string;
  imagePosition?: string;
  shops: { name: string; slug: string; url?: string }[];
}

export const looks: Look[] = [
  {
    id: 1,
    title: 'Sumayya Abaya — Lavender',
    imageUrl: '/fajr-noor-sumayya-1.jpg',
    shops: [{ name: 'Sumayya Abaya — Lavender · Fajr Noor', slug: 'fajr-noor', url: 'https://fajrnoor.com/products/flower-petal-abaya-lavender' }],
  },
  {
    id: 2,
    title: 'Sumayya Abaya — Sky Blue',
    imageUrl: '/fajr-noor-sumayya-sky-blue.jpg',
    shops: [{ name: 'Sumayya Abaya — Sky Blue · Fajr Noor', slug: 'fajr-noor', url: 'https://fajrnoor.com/products/flower-petal-abaya-sky-blue' }],
  },
  {
    id: 3,
    title: 'Sumayya Abaya — Cream',
    imageUrl: '/fajr-noor-sumayya-cream.jpg',
    shops: [{ name: 'Sumayya Abaya — Cream · Fajr Noor', slug: 'fajr-noor', url: 'https://fajrnoor.com/products/flower-petal-abaya-cream' }],
  },
  {
    id: 4,
    title: 'Lior Dress — Anatomi',
    imageUrl: '/anatomi-lior-dress.jpg',
    shops: [{ name: 'Lior Dress · Anatomi', slug: 'anatomi', url: 'https://www.anatomiofficial.com/collections/dress-ii/products/lior-dress' }],
  },
  {
    id: 5,
    title: 'Aravia Dress — Anatomi',
    imageUrl: '/anatomi-aravia-dress-v3.jpg',
    shops: [{ name: 'Aravia Dress · Anatomi', slug: 'anatomi', url: 'https://www.anatomiofficial.com/collections/dress-ii/products/arava-dress' }],
  },
  {
    id: 6,
    title: 'Solara Dress — Anatomi',
    imageUrl: '/anatomi-solara-dress.jpg',
    shops: [{ name: 'Solara Dress · Anatomi', slug: 'anatomi', url: 'https://www.anatomiofficial.com/collections/dress-ii/products/solara-dress' }],
  },
  {
    id: 22,
    title: 'Asymmetric Cape Maxi Dress — Fern',
    imageUrl: '/veiled-asymmetric-cape-maxi-fern.jpg',
    shops: [{ name: 'Asymmetric Cape Maxi Dress — Fern · Veiled', slug: 'the-veiled-collection', url: 'https://veiled.com/products/asymmetric-cape-maxi-dress-fern' }],
  },
  {
    id: 23,
    title: 'Maria Butterfly Abaya — French Vanilla',
    imageUrl: '/veiled-maria-butterfly-abaya-french-vanilla.jpg',
    shops: [{ name: 'Maria Butterfly Abaya — French Vanilla · Veiled', slug: 'the-veiled-collection', url: 'https://veiled.com/products/maria-butterfly-abaya-french-vanilla' }],
  },
  {
    id: 24,
    title: 'Ombre Pleated Open Abaya — Tea Forest',
    imageUrl: '/veiled-ombre-pleated-open-abaya-tea-forest.jpg',
    shops: [{ name: 'Ombre Pleated Open Abaya — Tea Forest · Veiled', slug: 'the-veiled-collection', url: 'https://veiled.com/products/ombre-pleated-open-abaya-tea-forest' }],
  },
  {
    id: 28,
    title: 'Pastel Green Brocade Caftan',
    imageUrl: '/menatique-pastel-green-brocade-caftan.jpg',
    shops: [{ name: 'Pastel Green Brocade Caftan · Menatique', slug: 'menatique', url: 'https://menatique.com/collections/caftan-takshita-djelaba/products/pastel-green-brocade-caftan-with-golden-detailing' }],
  },
  {
    id: 29,
    title: 'Celestial Rose Sequin Caftan',
    imageUrl: '/menatique-celestial-rose-sequin-caftan.jpg',
    shops: [{ name: 'Celestial Rose Sequin Caftan · Menatique', slug: 'menatique', url: 'https://menatique.com/collections/caftan-takshita-djelaba/products/celestial-rose-sequin-caftan' }],
  },
  {
    id: 30,
    title: 'Mint Silk Embroidered Caftan',
    imageUrl: '/menatique-mint-silk-embroidered-caftan.jpg',
    shops: [{ name: 'Mint Silk Embroidered Caftan · Menatique', slug: 'menatique', url: 'https://menatique.com/collections/caftan-takshita-djelaba/products/mint-silk-embroidered-caftan' }],
  },
];
