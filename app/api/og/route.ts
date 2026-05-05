import { NextRequest, NextResponse } from 'next/server';
import { fetchOGData } from '@/lib/og';

export const runtime = 'nodejs';
export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const data = await fetchOGData(url);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch {
    return NextResponse.json({ image: null, title: null, description: null }, { status: 200 });
  }
}
