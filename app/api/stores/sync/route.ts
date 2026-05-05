import { NextRequest, NextResponse } from 'next/server';
import { runSync } from '@/lib/apis/sync';
import { getAllStores } from '@/lib/stores';

/**
 * POST /api/stores/sync
 *
 * Triggers a live sync from Google Places, Yelp, and Foursquare.
 * Returns the merged store list as JSON — does NOT write to disk in production
 * (filesystem is read-only on Vercel). Pipe the response body to your data store.
 *
 * Auth: requires `x-sync-secret` header equal to SYNC_SECRET_KEY env var.
 *
 * Body (optional JSON):
 *   { "areas": ["nyc"] | ["nj"] | ["nyc","nj"], "fetchDetails": true }
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SYNC_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: 'SYNC_SECRET_KEY not configured' }, { status: 500 });
  }
  if (req.headers.get('x-sync-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { areas?: ('nyc' | 'nj')[]; fetchDetails?: boolean } = {};
  try { body = await req.json(); } catch { /* no body is fine */ }

  const logs: string[] = [];

  try {
    const { stats, stores } = await runSync({
      areas: body.areas,
      fetchDetails: body.fetchDetails ?? false,
      dryRun: false,
      existingStores: getAllStores(),
      onProgress: (msg) => logs.push(msg),
    });

    return NextResponse.json({ stats, total: stores.length, stores, logs });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message, logs }, { status: 500 });
  }
}

/**
 * GET /api/stores/sync
 * Health-check: confirms API keys are configured.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.SYNC_SECRET_KEY;
  if (!secret || req.headers.get('x-sync-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    status: 'ok',
    apis: {
      google:     !!process.env.GOOGLE_PLACES_API_KEY,
      yelp:       !!process.env.YELP_API_KEY,
      foursquare: !!process.env.FOURSQUARE_API_KEY,
    },
    existingStores: getAllStores().length,
  });
}
