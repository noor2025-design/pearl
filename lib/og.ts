import { unstable_cache } from 'next/cache';

export interface OGData {
  image: string | null;
  title: string | null;
  description: string | null;
}

async function fetchOGDataRaw(url: string): Promise<OGData> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Pearl-Directory-Bot/1.0)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return { image: null, title: null, description: null };

    const html = await res.text();

    const getMetaContent = (property: string): string | null => {
      const patterns = [
        new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
        new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, 'i'),
      ];

      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) return match[1];
      }
      return null;
    };

    const rawImage =
      getMetaContent('og:image') ||
      getMetaContent('twitter:image') ||
      getMetaContent('twitter:image:src');

    let image: string | null = null;
    if (rawImage) {
      try {
        const imageUrl = rawImage.startsWith('http') ? rawImage : new URL(rawImage, url).href;
        image = imageUrl.replace(/^http:\/\//i, 'https://');
      } catch {
        image = null;
      }
    }

    const title =
      getMetaContent('og:title') ||
      getMetaContent('twitter:title') ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ||
      null;

    const description =
      getMetaContent('og:description') ||
      getMetaContent('twitter:description') ||
      getMetaContent('description') ||
      null;

    return { image, title: title?.trim() || null, description: description?.trim() || null };
  } catch (err) {
    console.error(`[OG] Failed to fetch ${url}:`, err);
    return { image: null, title: null, description: null };
  }
}

export const fetchOGData = unstable_cache(fetchOGDataRaw, ['og-data'], {
  revalidate: 86400, // 24 hours
});
