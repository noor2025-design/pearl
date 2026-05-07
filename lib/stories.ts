import storiesData from '@/data/stories.json';

export interface StoryInterview {
  question: string;
  answer: string;
}

export interface Story {
  id: string;
  slug: string;
  founderName: string;
  brandName: string;
  brandSlug?: string;
  title: string;
  excerpt: string;
  pullQuote: string;
  imageUrl: string;
  cardImageUrl?: string;
  photoCredit?: string;
  featured: boolean;
  publishedAt: string;
  sourcedFromWebsite?: boolean;
  interview: StoryInterview[];
}

const stories = storiesData as Story[];

export function getAllStories(): Story[] {
  return stories.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedStories(): Story[] {
  return stories.filter((s) => s.featured).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
