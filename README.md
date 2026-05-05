# Pearl — Modest Fashion Directory

A curated directory of modest fashion boutiques for Muslim women — online stores, and local brick-and-mortar shops in NYC and Northern New Jersey.

Built with Next.js 14 (App Router), Tailwind CSS, and TypeScript.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional — enables Google Places API for local store details
GOOGLE_PLACES_API_KEY=your_key_here

# Optional — enables Google Maps embed on store detail pages
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here
```

The app works fully without these keys (falls back to static data and a general NYC map embed).

---

## Adding a New Store

Edit `data/stores.json`. Each store entry:

```json
{
  "id": "unique-kebab-id",
  "name": "Store Name",
  "slug": "url-slug",
  "website": "https://storewebsite.com",
  "description": "Full description (2-3 sentences).",
  "shortDescription": "One-line tagline for cards.",
  "categories": ["Abayas", "Hijabs & Scarves"],
  "locationType": "online",
  "shipsToUS": true,
  "priceRange": "$$",
  "logoUrl": "",
  "featuredImageUrl": "",
  "featured": false,
  "featuredOrder": 99,
  "verified": true,
  "tags": ["relevant", "tags"],
  "social": { "instagram": "https://instagram.com/handle" },
  "address": null,
  "neighborhood": null,
  "hours": null,
  "phone": null
}
```

**`locationType` values:** `"online"` | `"nyc"` | `"nj"` | `"international"`

**Image policy:** Only images fetched from the store's own domain are displayed. The OG scraper at `/api/og` handles this server-side. Store images you add manually to `logoUrl` or `featuredImageUrl` must also come from the store's own CDN domain, and that domain must be whitelisted in `next.config.mjs`.

**Unverified stores:** Set `"verified": false` for local stores where details couldn't be confirmed. A warning banner will display on the listing.

---

## Project Structure

```
/app
  /                   → Home page
  /directory          → Filterable directory
  /stores/[slug]      → Store detail page
  /about              → About Pearl
  /api/og             → Server-side OG scraper (24h cache)
/components
  /ui                 → Badge, Button, Modal, Placeholder
  /layout             → Navbar, Footer, PageWrapper
  /home               → Hero, FeaturedStores, CategoryGrid, LocalSpotlight, Newsletter
  /directory          → StoreCard, StoreGrid, FilterBar, SearchBar
/data
  stores.json         → Static store database
/lib
  stores.ts           → Data access layer
  og.ts               → OG scraper utility
  places.ts           → Google Places wrapper
```

---

## Typography Note

The Figma design uses **Gunter** as the display typeface. Gunter is not available on Google Fonts. This implementation uses **Cormorant Garamond** (Google Fonts) as the nearest available alternative — a refined serif with similar editorial weight and elegance. If you obtain a license for Gunter, add it via `@font-face` in `app/globals.css` and update `--font-display` in the CSS variables.

---

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Add the environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

---

## Design System

| Token | Value |
|---|---|
| Olive Gold (primary) | `#B8B13A` |
| Cream (background) | `#F5F4E2` |
| Periwinkle (accent) | `#8EA7E8` |
| Text Primary | `#1A1A1A` |
| Text Secondary | `#5C5C5C` |
| Display font | Cormorant Garamond (Gunter substitute) |
| UI font | Afacad |
