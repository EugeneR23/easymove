/**
 * Push URLs to IndexNow (Bing, Yandex, Naver, Seznam).
 *
 * Bing feeds Copilot and Yandex feeds Russian-language search, so this is the
 * one indexation channel we can trigger rather than wait for.
 *
 * Usage:
 *   npx tsx scripts/indexnow-ping.ts                    # every URL in the live sitemap
 *   npx tsx scripts/indexnow-ping.ts /pricing /ru       # specific paths
 *   npx tsx scripts/indexnow-ping.ts --dry-run          # show what would be sent
 *
 * Run it after a deploy that changed page content.
 */
import { pingIndexNow } from '../src/lib/indexnow';

const SITE = 'https://www.easy-move-florida.com';
const KEY_FILE = '186c8626cf8c502a9b50e971fb27fbb6d324e5b44bd9956592991349c64013cc.txt';

async function urlsFromSitemap(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned HTTP ${res.status}`);
  const xml = await res.text();
  const urls: string[] = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  if (urls.length === 0) throw new Error('sitemap.xml parsed to zero <loc> entries');
  return urls;
}

/** IndexNow silently ignores a submission whose key file it cannot read. */
async function assertKeyFileReachable(): Promise<void> {
  const res = await fetch(`${SITE}/${KEY_FILE}`);
  if (!res.ok) throw new Error(`key file unreachable: HTTP ${res.status} at ${SITE}/${KEY_FILE}`);
  const body = (await res.text()).trim();
  const expected = KEY_FILE.replace('.txt', '');
  if (body !== expected) throw new Error(`key file content mismatch: got "${body.slice(0, 32)}…"`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const paths = args.filter((a) => !a.startsWith('--'));

  await assertKeyFileReachable();
  console.log(`key file OK at ${SITE}/${KEY_FILE}`);

  const urls = paths.length > 0 ? paths.map((p) => new URL(p, SITE).toString()) : await urlsFromSitemap();
  console.log(`${urls.length} URL(s) to submit${paths.length ? '' : ' (from live sitemap)'}`);

  if (dryRun) {
    urls.forEach((u) => console.log(`  ${u}`));
    console.log('\n--dry-run: nothing submitted.');
    return;
  }

  const result = await pingIndexNow(urls);
  if (result.ok) {
    console.log(`submitted ${result.submitted} URL(s) — HTTP ${result.status}`);
    return;
  }
  console.error(`FAILED (${result.reason}) — submitted ${result.submitted}, dropped ${result.dropped.length}`);
  result.dropped.slice(0, 10).forEach((u) => console.error(`  dropped: ${u}`));
  if (result.status) console.error(`  HTTP ${result.status}`);
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(`FAILED: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
});
