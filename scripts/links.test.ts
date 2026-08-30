/**
 * Orphan and locale-pair guard.
 *
 * Written after twenty-five new pages shipped reachable only from sitemap.xml.
 * A page with no internal link is crawled late, passes no internal authority,
 * and is invisible to a visitor already on the site — the same fault an earlier
 * audit found in the Russian pages and fixed by hand, which is exactly why it
 * needed a check rather than another round of remembering.
 *
 * Run: npx tsx scripts/links.test.ts
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { CITIES } from '../src/lib/data/cities';
import { CITIES_RU } from '../src/lib/data/citiesRu';
import { CITIES_UA } from '../src/lib/data/citiesUa';
import { COST_PAGES } from '../src/lib/data/costPages';
import { ROUTE_PAGES } from '../src/lib/data/routePages';
import { PAIRED_SLUGS } from '../src/lib/data/localePairs';

let failed = 0;
function check(name: string, cond: boolean, actual: unknown) {
  if (cond) {
    console.log(`  PASS  ${name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${name} — got: ${JSON.stringify(actual)}`);
  }
}

const SEP = String.fromCharCode(92); // backslash, for Windows paths
const posix = (f: string) => f.split(SEP).join('/');

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) walk(f, out);
    else if (/\.(ts|tsx)$/.test(f)) out.push(f);
  }
  return out;
}
const files = walk('src');

/** The page's own route folder and the sitemap do not count as inbound links. */
function isSelfOrSitemap(file: string, slug: string): boolean {
  const f = posix(file);
  return f.includes(`src/app/${slug}/`) || f.endsWith('src/app/sitemap.ts');
}

function inboundLinks(slug: string): string[] {
  const hits: string[] = [];
  for (const f of files) {
    if (isSelfOrSitemap(f, slug)) continue;
    const body = readFileSync(f, 'utf8');
    if (
      body.includes(`"/${slug}"`) ||
      body.includes(`'/${slug}'`) ||
      body.includes('`/' + slug + '`')
    ) {
      hits.push(posix(f));
    }
  }
  return hits;
}

/**
 * A slug reached through a data-driven map, e.g. COST_PAGES.map(c => `/${c.slug}`).
 * Counts only when a file both imports that array and builds an href from it.
 */
function dataDrivenLinkExists(importName: string): boolean {
  return files.some((f) => {
    if (posix(f).endsWith('src/app/sitemap.ts')) return false;
    const body = readFileSync(f, 'utf8');
    return body.includes(importName) && /href=\{`\/\$\{/.test(body);
  });
}

console.log('\n[1] No page family is orphaned');

const costLinked =
  COST_PAGES.some((c) => inboundLinks(c.slug).length > 0) || dataDrivenLinkExists('COST_PAGES');
check('cost pages have an inbound internal link', costLinked, costLinked);

const routeLinked =
  ROUTE_PAGES.some((r) => inboundLinks(r.slug).length > 0) || dataDrivenLinkExists('DISTANCE_ROUTES');
check('route pages have an inbound internal link', routeLinked, routeLinked);

// A link from inside /ua does not make /ua reachable — the visitor is already
// there. The inbound link has to come from outside the locale section.
const uaInbound = inboundLinks('ua').filter((f) => !f.includes('src/app/ua/'));
check('Ukrainian section is reachable from outside /ua', uaInbound.length > 0, uaInbound);

const rsInbound = inboundLinks('russian-speaking-movers-miami');
check('russian-speaking page has an inbound internal link', rsInbound.length > 0, rsInbound);

console.log('\n[2] Locale switch pairs match the data');
const ruSlugs = Array.from(new Set(CITIES_RU.map((c) => c.slug.replace(/^ru\//, ''))));
const uaSlugs = Array.from(new Set(CITIES_UA.map((c) => c.slug.replace(/^ua\//, ''))));
const enSlugs = new Set(CITIES.map((c) => c.slug));
const ruPairs: readonly string[] = PAIRED_SLUGS.ru;
const uaPairs: readonly string[] = PAIRED_SLUGS.ua;

const missingRu = ruSlugs.filter((s) => !ruPairs.includes(s));
check('every RU city page is in PAIRED_SLUGS.ru', missingRu.length === 0, missingRu);

const missingUa = uaSlugs.filter((s) => !uaPairs.includes(s));
check('every UA city page is in PAIRED_SLUGS.ua', missingUa.length === 0, missingUa);

const ruWithoutEn = ruPairs.filter((s) => !enSlugs.has(s));
check('no RU pair points at a missing English page', ruWithoutEn.length === 0, ruWithoutEn);

const uaWithoutEn = uaPairs.filter((s) => !enSlugs.has(s));
check('no UA pair points at a missing English page', uaWithoutEn.length === 0, uaWithoutEn);

console.log('\n[3] Cost pages reference real city pages');
const badCitySlug = COST_PAGES.filter((c) => !enSlugs.has(c.citySlug)).map((c) => c.slug);
check('every cost page citySlug resolves', badCitySlug.length === 0, badCitySlug);

console.log(failed ? `\n${failed} FAILURE(S)` : '\nALL PASS');
process.exit(failed ? 1 : 0);
