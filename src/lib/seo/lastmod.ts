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
export const NEWER: Record<string, string> = {
  // 2026-10-11: reply-time and same-day offer on every city page, Brickell page,
  // Russian forms on /ru and /ru/contact, real reviews on /ru, contact form,
  // quote wizard, homepage calculator price.
  '/brickell-movers': '2026-10-11',
  '/': '2026-10-11',
  '/contact': '2026-10-11',
  '/quote': '2026-10-11',
  '/ru/contact': '2026-10-11',
  // 2026-10-01: owner decisions on prices and claims (about, fine art,
  // residential, pricing, ru/services), the city template's building claim
  // rewritten on every city page, and four new city pages.
  '/ru': '2026-10-11',
  '/north-miami-movers': '2026-10-11',
  '/about': '2026-10-01',
  '/ru/about': '2026-10-11',
  '/services/specialty-items': '2026-10-01',
  '/services/residential-moving': '2026-10-01',
  '/pricing': '2026-10-01',
  '/ru/pricing': '2026-10-01',
  '/ru/services': '2026-10-01',
  '/miami-movers': '2026-10-11',
  '/fort-lauderdale-movers': '2026-10-11',
  '/boca-raton-movers': '2026-10-11',
  '/aventura-movers': '2026-10-11',
  '/coral-gables-movers': '2026-10-11',
  '/sunny-isles-movers': '2026-10-11',
  '/hollywood-movers': '2026-10-11',
  '/coconut-grove-movers': '2026-10-11',
  '/doral-movers': '2026-10-11',
  '/hallandale-beach-movers': '2026-10-11',
  '/miami-beach-movers': '2026-10-11',
  '/bal-harbour-movers': '2026-10-11',
  '/north-miami-beach-movers': '2026-10-11',
  '/pembroke-pines-movers': '2026-10-11',
  '/weston-movers': '2026-10-11',
  '/coral-springs-movers': '2026-10-11',
  '/sunrise-movers': '2026-10-11',
  '/delray-beach-movers': '2026-10-11',
  '/boynton-beach-movers': '2026-10-11',
  '/dania-beach-movers': '2026-10-11',
  '/miramar-movers': '2026-10-11',
  '/pembroke-park-movers': '2026-10-11',
  '/lauderdale-lakes-movers': '2026-10-11',
  '/ru/sunny-isles-movers': '2026-10-01',
  '/ru/aventura-movers': '2026-10-01',
  '/ru/hallandale-beach-movers': '2026-10-01',
  '/ru/hollywood-movers': '2026-10-01',
  '/ru/miami-movers': '2026-10-01',
  '/ru/fort-lauderdale-movers': '2026-10-01',
  '/ru/miami-beach-movers': '2026-10-01',
  '/ru/bal-harbour-movers': '2026-10-01',
  '/ru/north-miami-beach-movers': '2026-10-01',
  '/ru/boca-raton-movers': '2026-10-01',
  '/ru/delray-beach-movers': '2026-10-01',
  '/ru/pembroke-pines-movers': '2026-10-01',
  '/ru/weston-movers': '2026-10-01',
  '/ru/coral-springs-movers': '2026-10-01',
  '/ru/sunrise-movers': '2026-10-01',
  '/ru/boynton-beach-movers': '2026-10-01',
  '/ua/sunny-isles-movers': '2026-10-01',
  '/ua/hallandale-beach-movers': '2026-10-01',
  '/ua/hollywood-movers': '2026-10-01',
  '/ua/miami-movers': '2026-10-01',
  '/ua/aventura-movers': '2026-10-01',
  '/ua/fort-lauderdale-movers': '2026-10-01',
};

/** YYYY-MM-DD for a served path ('/', '/ru/miami-movers', '/services/storage-solutions'). */
export function lastModified(path: string): string {
  const p = path === '' ? '/' : path;
  return NEWER[p] ?? CONTENT_FLOOR;
}
