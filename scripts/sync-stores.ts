#!/usr/bin/env tsx
/**
 * CLI wrapper around lib/apis/sync.ts
 *
 * Usage:
 *   npm run sync:stores              — sync all areas, write stores.json
 *   npm run sync:stores:dry          — preview only, no writes
 *   npm run sync:stores:nyc          — only NYC areas
 *   npm run sync:stores:nj           — only NJ areas
 *
 * Required env vars (copy .env.local.example → .env.local and fill in):
 *   GOOGLE_PLACES_API_KEY
 *   YELP_API_KEY
 *   FOURSQUARE_API_KEY
 */

import fs from 'node:fs';
import path from 'node:path';
import { runSync } from '../lib/apis/sync';
import type { Store } from '../lib/stores';

// Load .env.local when running outside Next.js
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=\s]+)\s*=\s*(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const areaIdx = args.indexOf('--area');
  const areaArg = areaIdx !== -1 ? (args[areaIdx + 1] as 'nyc' | 'nj') : undefined;

  const storesPath = path.resolve(__dirname, '../data/stores.json');
  const existingStores: Store[] = JSON.parse(fs.readFileSync(storesPath, 'utf8'));

  console.log('\n🏪 Pearl Stores Sync');
  console.log(`   Existing stores : ${existingStores.length}`);
  if (dryRun)  console.log('   Mode            : DRY RUN (no writes)');
  if (areaArg) console.log(`   Area filter     : ${areaArg}`);

  const missing = (
    ['GOOGLE_PLACES_API_KEY', 'YELP_API_KEY', 'FOURSQUARE_API_KEY'] as const
  ).filter((k) => !process.env[k]);
  if (missing.length) console.warn(`\n⚠️  Missing env vars (skipping those APIs): ${missing.join(', ')}`);

  const { stats, stores } = await runSync({
    areas: areaArg ? [areaArg] : undefined,
    dryRun,
    fetchDetails: !dryRun,
    existingStores,
    onProgress: (msg) => console.log(msg),
  });

  console.log('\n📊 Results:');
  console.log(`   Added   : ${stats.added}`);
  console.log(`   Updated : ${stats.updated}`);
  console.log(`   Skipped : ${stats.skipped}`);
  console.log(`   Errors  : ${stats.errors.length}`);
  if (stats.errors.length) stats.errors.forEach((e) => console.error('  ', e));

  if (!dryRun && (stats.added > 0 || stats.updated > 0)) {
    fs.writeFileSync(storesPath, JSON.stringify(stores, null, 2) + '\n');
    console.log(`\n✅ Wrote ${stores.length} stores to data/stores.json`);
  } else if (dryRun) {
    console.log('\n🔍 Dry run — no changes written.');
  } else {
    console.log('\n✅ Nothing to update.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
