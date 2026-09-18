/**
 * Which paths exist in which languages — one table, consumed by everything.
 *
 * Before this there were four hand-kept copies of the same mapping: every
 * page's own `alternates` block, RU_PAIRED/UA_PAIRED inside src/app/sitemap.ts,
 * src/lib/data/localePairs.ts for the header switch, and the breadcrumbs. Only
 * one of the four had a drift test, and the other three had already drifted:
 *
 *   - Nine /ru/*-movers pages set a canonical and no `languages` map at all.
 *     A page's `alternates` object replaces the layout's wholesale in Next.js,
 *     so those pages shipped a canonical and nothing else while their English
 *     twins pointed `ru:` straight at them. Google drops a pair with no return
 *     link, and that was the entire cluster for those nine.
 *   - /boca-raton-movers was the mirror case, and the sitemap omitted its
 *     alternates too, so that pair was broken on both surfaces at once.
 *   - The five /ua/moving-cost-* routes were in the sitemap's table and in no
 *     page's metadata.
 *
 * The cure is not a better hand-kept list. It is alternatesFor(), which returns
 * the canonical and the full language cluster from the same call, so there is
 * no code path that yields one without the other.
 *
 * Kept slug-only and free of page content on purpose: the header is a client
 * component and imports PAIRED_PATHS from here.
 */
import { absUrl } from '@/lib/site';

export type Locale = 'en' | 'ru' | 'uk';

/** The URL segment differs from the language tag: /ua is served, uk is declared. */
export const LOCALE_SEGMENT: Record<Locale, string> = { en: '', ru: 'ru', uk: 'ua' };

/** Non-city, non-cost paths and the locales they exist in. '' is the homepage. */
const STATIC_PAGES: Record<string, Locale[]> = {
  '':         ['en', 'ru', 'uk'],
  'about':    ['en', 'ru'],
  'services': ['en', 'ru'],
  'pricing':  ['en', 'ru'],
  'contact':  ['en', 'ru'],
};

/** City slugs, without their locale segment. */
const CITY_LOCALES: Record<string, Locale[]> = {
  'miami-movers':             ['en', 'ru', 'uk'],
  'sunny-isles-movers':       ['en', 'ru', 'uk'],
  'hallandale-beach-movers':  ['en', 'ru', 'uk'],
  'hollywood-movers':         ['en', 'ru', 'uk'],
  'aventura-movers':          ['en', 'ru', 'uk'],
  'fort-lauderdale-movers':   ['en', 'ru', 'uk'],
  'miami-beach-movers':       ['en', 'ru'],
  'north-miami-beach-movers': ['en', 'ru'],
  'bal-harbour-movers':       ['en', 'ru'],
  'pembroke-pines-movers':    ['en', 'ru'],
  'weston-movers':            ['en', 'ru'],
  'coral-springs-movers':     ['en', 'ru'],
  'sunrise-movers':           ['en', 'ru'],
  'boca-raton-movers':        ['en', 'ru'],
  'delray-beach-movers':      ['en', 'ru'],
  'boynton-beach-movers':     ['en', 'ru'],
  'coconut-grove-movers':     ['en'],
  'coral-gables-movers':      ['en'],
  'doral-movers':             ['en'],
};

/** Cost-page slugs, without their locale segment. */
const COST_LOCALES: Record<string, Locale[]> = {
  'moving-cost-miami':            ['en', 'ru', 'uk'],
  'moving-cost-sunny-isles':      ['en', 'ru', 'uk'],
  'moving-cost-hallandale-beach': ['en', 'ru', 'uk'],
  'moving-cost-hollywood':        ['en', 'ru', 'uk'],
  'moving-cost-aventura':         ['en', 'ru', 'uk'],
  'moving-cost-fort-lauderdale':  ['en', 'ru'],
  'moving-cost-miami-beach':      ['en', 'ru'],
  'moving-cost-boca-raton':       ['en'],
  'moving-cost-pembroke-pines':   ['en'],
};

/**
 * Paths whose slug differs between locales. The Russian counterpart of
 * /russian-speaking-movers-miami is /ru/russkie-gruzchiki-miami, deliberately:
 * the Russian slug is what Russian speakers actually search for.
 */
const CUSTOM: Record<string, Partial<Record<Locale, string>>> = {
  'russian-speaking-movers-miami': {
    en: 'russian-speaking-movers-miami',
    ru: 'russkie-gruzchiki-miami',
  },
};

/** English-only paths that carry a canonical but never a language cluster. */
const EN_ONLY = [
  'quote', 'reviews', 'blog', 'packing-services', 'coi-miami-condo-movers',
  'services/residential-moving', 'services/long-distance-moving',
  'services/office-commercial', 'services/specialty-items', 'services/storage-solutions',
];

const ALL: Record<string, Locale[]> = {
  ...STATIC_PAGES,
  ...CITY_LOCALES,
  ...COST_LOCALES,
  'russian-speaking-movers-miami': ['en', 'ru'],
  ...Object.fromEntries(EN_ONLY.map((k) => [k, ['en'] as Locale[]])),
};

const normaliseKey = (key: string) => key.replace(/^[/]+|[/]+$/g, '');

/** Every key this table knows. scripts/links.test.ts reconciles it with the content arrays. */
export const ROUTE_KEYS = Object.keys(ALL);

/** The locales a path exists in. An unknown key is English only. */
export function localesOf(key: string): Locale[] {
  return ALL[normaliseKey(key)] ?? ['en'];
}

/** '/ru/miami-movers' for ('miami-movers', 'ru'); null when that locale has no such page. */
export function pathFor(key: string, locale: Locale): string | null {
  const k = normaliseKey(key);
  if (!localesOf(k).includes(locale)) return null;
  const slug = CUSTOM[k]?.[locale] ?? k;
  const seg = LOCALE_SEGMENT[locale];
  if (!slug) return seg ? `/${seg}` : '/';
  return seg ? `/${seg}/${slug}` : `/${slug}`;
}

/**
 * The canonical **and** the language cluster, from one call. That is the whole
 * point of the module: a page cannot emit one without the other.
 *
 * A single-language path gets a canonical and no `languages` map, because a
 * cluster of one is a no-op and emitting it only invites someone to half-fill
 * it later — which is exactly how the nine broken Russian pages happened.
 */
export function alternatesFor(
  key: string,
  locale: Locale = 'en',
): { canonical: string; languages?: Record<string, string> } {
  const k = normaliseKey(key);
  const self = pathFor(k, locale);
  if (self === null) {
    throw new Error(
      `alternatesFor("${k}", "${locale}"): that locale has no such page. ` +
      'Add it to src/lib/seo/routes.ts, or the page is declaring the wrong locale.',
    );
  }
  const canonical = absUrl(self);
  const locales = localesOf(k);
  if (locales.length < 2) return { canonical };

  const languages: Record<string, string> = {};
  for (const l of locales) {
    const p = pathFor(k, l);
    if (p !== null) languages[l] = absUrl(p);
  }
  // x-default points at English, the version served to an unmatched language.
  const en = pathFor(k, 'en');
  if (en !== null) languages['x-default'] = absUrl(en);
  return { canonical, languages };
}

/**
 * A canonical with no language cluster, for paths the table cannot key.
 *
 * Only two things need this: dynamic routes (/blog/[slug], /services/[slug]),
 * whose slugs are data rather than table entries, and the two noindex pages.
 * All three are English-only, so there is no cluster to get wrong — which is
 * why this is a separate, narrower function rather than a looser alternatesFor.
 */
export function canonicalFor(path: string): { canonical: string } {
  return { canonical: absUrl(path) };
}

/**
 * Slug lists for the header's language switch, replacing
 * src/lib/data/localePairs.ts — the third copy of this data.
 */
export const PAIRED_PATHS: Record<'ru' | 'uk', string[]> = {
  ru: ROUTE_KEYS.filter((k) => k && localesOf(k).includes('ru')).map((k) => CUSTOM[k]?.ru ?? k),
  uk: ROUTE_KEYS.filter((k) => k && localesOf(k).includes('uk')).map((k) => CUSTOM[k]?.uk ?? k),
};

/** The English key a localised slug belongs to — the switch has to work backwards too. */
export function keyForSlug(slug: string, locale: Locale): string | null {
  const s = normaliseKey(slug);
  for (const k of ROUTE_KEYS) {
    if ((CUSTOM[k]?.[locale] ?? k) === s && localesOf(k).includes(locale)) return k;
  }
  return null;
}
