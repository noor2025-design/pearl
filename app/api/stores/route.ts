import { NextResponse } from 'next/server';
import { getAllStores } from '@/lib/stores';

export async function GET() {
  return NextResponse.json(getAllStores());
}
