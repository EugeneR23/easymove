/**
 * Where the site lives, and the three node identities in its entity graph.
 *
 * The origin was written out by hand in 59 files (359 occurrences), almost all
 * of it inside per-page `alternates.canonical` strings. That is survivable for a
 * URL, which rarely changes. It was not survivable for the @id values: two
 * different components each typed `.../#organization` and filled the node
 * differently, so on all 41 city pages a consumer merging by @id saw the
 * company's canonical url, service area and languages change per page.
 *
 * This module is plumbing, not a business fact — hence src/lib/ and not
 * src/lib/data/. It must never hold anything a customer reads.
 */
export const SITE_URL = 'https://www.easy-move-florida.com';

/** '/miami-movers' -> 'https://www.easy-move-florida.com/miami-movers'. '/' -> the bare origin. */
export function absUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * The only place these three strings are written. Every page other than the root
 * layout references them; only the root layout defines the nodes behind them.
 */
export const ENTITY_ID = {
  organization: `${SITE_URL}/#organization`,
  website:      `${SITE_URL}/#website`,
  founder:      `${SITE_URL}/#founder`,
} as const;
