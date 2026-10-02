/**
 * When a page's content last changed. One answer, read by sitemap.xml and by
 * every JSON-LD node that states `dateModified`, so the two cannot disagree.
 *
 * Before this, the date lived only in a hand-kept table inside sitemap.ts, which
 * still said 2026-07-30 for most pages after the 2026-09-18 pass rewrote them,
 * and no page stated a date in its schema at all.
 *
 * How the dates were set (2026-10-01): for each sitemap URL, the newest commit
 * that touched its own route file or its own entry in a data file (cities*.ts,
 * costPages.ts, serviceContent.ts, services.json). The 2026-09-18 pass touched
 * every route file — claims, footer locale, tel format, hreflang — so it is the
 * floor for every page. Blog posts are dated by `updatedAt` in blog.ts instead.
 *
 * When you materially change a page, add or bump its entry in NEWER. A footer or
 * a CSS tweak is not a content change; a price, a claim or a rewritten section is.
 * scripts/links.test.ts fails on an entry that is not a sitemap path or is not
 * newer than the floor.
 */

/** Every page's content is at least this recent. */
export const CONTENT_FLOOR = '2026-09-18';

/** Served path → YYYY-MM-DD, only for pages changed after the floor. */
export const NEWER: Record<string, string> = {};

/** YYYY-MM-DD for a served path ('/', '/ru/miami-movers', '/services/storage-solutions'). */
export function lastModified(path: string): string {
  const p = path === '' ? '/' : path;
  return NEWER[p] ?? CONTENT_FLOOR;
}
