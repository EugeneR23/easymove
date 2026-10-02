import type { MetadataRoute } from 'next';
import { readAllServices } from '@/lib/data/services';
import { getAllBlogPosts } from '@/lib/data/blog';
import { COST_PAGES, COST_PAGES_RU, COST_PAGES_UA } from '@/lib/data/costPages';
import { alternatesFor, keyForSlug, type Locale } from '@/lib/seo/routes';
import { CITIES_UA } from '@/lib/data/citiesUa';
import { lastModified } from '@/lib/seo/lastmod';

const siteUrl = 'https://www.easy-move-florida.com';

// Content dates come from src/lib/seo/lastmod.ts, the same table the pages'
// JSON-LD reads for dateModified. Not build time: `new Date()` on every route
// made every lastmod identical to the build timestamp, which Google learns to ignore.
const lastmod = (path: string): Date => new Date(lastModified(path));

/**
 * hreflang for a sitemap entry, derived from src/lib/seo/routes.ts.
 *
 * This used to be two hand-kept tables, RU_PAIRED and UA_PAIRED, which were the
 * second and third copies of data the pages also declared. They had drifted:
 * /boca-raton-movers was in RU_PAIRED but its sitemap entry never called this
 * function, and the five /ua/moving-cost-* routes were in UA_PAIRED and in no
 * page's metadata. Now every entry calls it and a single-locale path simply
 * gets undefined back, so forgetting is no longer possible.
 *
 * Takes the served path ('/boca-raton-movers', '/ru/miami-movers', '/').
 */
function withAlternates(path: string): MetadataRoute.Sitemap[number]['alternates'] | undefined {
  const trimmed = path.replace(/^[/]+|[/]+$/g, '');
  const locale: Locale = trimmed === 'ru' || trimmed.startsWith('ru/') ? 'ru'
    : trimmed === 'ua' || trimmed.startsWith('ua/') ? 'uk'
    : 'en';
  const slug = trimmed.replace(/^(ru|ua)[/]?/, '');
  const key = keyForSlug(slug, locale);
  if (key === null) return undefined;
  const { languages } = alternatesFor(key, locale);
  return languages ? { languages } : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const services = readAllServices();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: lastmod('/'),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: withAlternates('/'),
    },
    {
      url: `${siteUrl}/services`,
      lastModified: lastmod('/services'),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: withAlternates('/services'),
    },
    {
      url: `${siteUrl}/about`,
      lastModified: lastmod('/about'),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: withAlternates('/about'),
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: lastmod('/contact'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: withAlternates('/contact'),
    },
    {
      url: `${siteUrl}/quote`,
      lastModified: lastmod('/quote'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: lastmod('/pricing'),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: withAlternates('/pricing'),
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: lastmod('/reviews'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: lastmod(`/services/${service.slug}`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/miami-movers`,            lastModified: lastmod('/miami-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/miami-movers') },
    { url: `${siteUrl}/fort-lauderdale-movers`,  lastModified: lastmod('/fort-lauderdale-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/fort-lauderdale-movers') },
    { url: `${siteUrl}/boca-raton-movers`,       lastModified: lastmod('/boca-raton-movers'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/boca-raton-movers') },
    { url: `${siteUrl}/aventura-movers`,         lastModified: lastmod('/aventura-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/aventura-movers') },
    { url: `${siteUrl}/coral-gables-movers`,     lastModified: lastmod('/coral-gables-movers'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/coral-gables-movers') },
    { url: `${siteUrl}/sunny-isles-movers`,      lastModified: lastmod('/sunny-isles-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/sunny-isles-movers') },
    { url: `${siteUrl}/hollywood-movers`,        lastModified: lastmod('/hollywood-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hollywood-movers') },
    { url: `${siteUrl}/coconut-grove-movers`,    lastModified: lastmod('/coconut-grove-movers'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/coconut-grove-movers') },
    { url: `${siteUrl}/doral-movers`,            lastModified: lastmod('/doral-movers'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/doral-movers') },
    { url: `${siteUrl}/hallandale-beach-movers`, lastModified: lastmod('/hallandale-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hallandale-beach-movers') },
    { url: `${siteUrl}/miami-beach-movers`, lastModified: lastmod('/miami-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/miami-beach-movers') },
    { url: `${siteUrl}/bal-harbour-movers`, lastModified: lastmod('/bal-harbour-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/bal-harbour-movers') },
    { url: `${siteUrl}/north-miami-beach-movers`, lastModified: lastmod('/north-miami-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/north-miami-beach-movers') },
    { url: `${siteUrl}/pembroke-pines-movers`, lastModified: lastmod('/pembroke-pines-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/pembroke-pines-movers') },
    { url: `${siteUrl}/weston-movers`, lastModified: lastmod('/weston-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/weston-movers') },
    { url: `${siteUrl}/coral-springs-movers`, lastModified: lastmod('/coral-springs-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/coral-springs-movers') },
    { url: `${siteUrl}/sunrise-movers`, lastModified: lastmod('/sunrise-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/sunrise-movers') },
    { url: `${siteUrl}/delray-beach-movers`, lastModified: lastmod('/delray-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/delray-beach-movers') },
    { url: `${siteUrl}/boynton-beach-movers`, lastModified: lastmod('/boynton-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/boynton-beach-movers') },
    { url: `${siteUrl}/packing-services`,        lastModified: lastmod('/packing-services'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/packing-services') },
    { url: `${siteUrl}/moving-cost-miami`,       lastModified: lastmod('/moving-cost-miami'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/moving-cost-miami') },
    { url: `${siteUrl}/russian-speaking-movers-miami`, lastModified: lastmod('/russian-speaking-movers-miami'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/russian-speaking-movers-miami') },
    { url: `${siteUrl}/coi-miami-condo-movers`,  lastModified: lastmod('/coi-miami-condo-movers'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/coi-miami-condo-movers') },
  ];

  const ruRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/ru`,          lastModified: lastmod('/ru'), changeFrequency: 'weekly',  priority: 0.9, alternates: withAlternates('/') },
    { url: `${siteUrl}/ru/russkie-gruzchiki-miami`, lastModified: lastmod('/ru/russkie-gruzchiki-miami'), changeFrequency: 'monthly', priority: 0.9 , alternates: withAlternates('/ru/russkie-gruzchiki-miami') },
    { url: `${siteUrl}/ru/about`,    lastModified: lastmod('/ru/about'), changeFrequency: 'monthly', priority: 0.7, alternates: withAlternates('/about') },
    { url: `${siteUrl}/ru/services`, lastModified: lastmod('/ru/services'), changeFrequency: 'monthly', priority: 0.8, alternates: withAlternates('/services') },
    { url: `${siteUrl}/ru/pricing`,  lastModified: lastmod('/ru/pricing'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/pricing') },
    { url: `${siteUrl}/ru/contact`,  lastModified: lastmod('/ru/contact'), changeFrequency: 'monthly', priority: 0.8, alternates: withAlternates('/contact') },
    // Русские страницы городов — города с крупной русскоязычной общиной
    { url: `${siteUrl}/ru/miami-movers`,            lastModified: lastmod('/ru/miami-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/miami-movers') },
    { url: `${siteUrl}/ru/fort-lauderdale-movers`,  lastModified: lastmod('/ru/fort-lauderdale-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/fort-lauderdale-movers') },
    { url: `${siteUrl}/ru/sunny-isles-movers`,      lastModified: lastmod('/ru/sunny-isles-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/sunny-isles-movers') },
    { url: `${siteUrl}/ru/aventura-movers`,         lastModified: lastmod('/ru/aventura-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/aventura-movers') },
    { url: `${siteUrl}/ru/hollywood-movers`,        lastModified: lastmod('/ru/hollywood-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hollywood-movers') },
    { url: `${siteUrl}/ru/hallandale-beach-movers`, lastModified: lastmod('/ru/hallandale-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hallandale-beach-movers') },
    { url: `${siteUrl}/ru/miami-beach-movers`, lastModified: lastmod('/ru/miami-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/miami-beach-movers') },
    { url: `${siteUrl}/ru/bal-harbour-movers`, lastModified: lastmod('/ru/bal-harbour-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/bal-harbour-movers') },
    { url: `${siteUrl}/ru/north-miami-beach-movers`, lastModified: lastmod('/ru/north-miami-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/north-miami-beach-movers') },
    { url: `${siteUrl}/ru/boca-raton-movers`, lastModified: lastmod('/ru/boca-raton-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/boca-raton-movers') },
    { url: `${siteUrl}/ru/delray-beach-movers`, lastModified: lastmod('/ru/delray-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/delray-beach-movers') },
    { url: `${siteUrl}/ru/pembroke-pines-movers`, lastModified: lastmod('/ru/pembroke-pines-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/pembroke-pines-movers') },
    { url: `${siteUrl}/ru/weston-movers`, lastModified: lastmod('/ru/weston-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/weston-movers') },
    { url: `${siteUrl}/ru/coral-springs-movers`, lastModified: lastmod('/ru/coral-springs-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/coral-springs-movers') },
    { url: `${siteUrl}/ru/sunrise-movers`, lastModified: lastmod('/ru/sunrise-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/sunrise-movers') },
    { url: `${siteUrl}/ru/boynton-beach-movers`, lastModified: lastmod('/ru/boynton-beach-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/boynton-beach-movers') },
  ];

  // Cost, route and Ukrainian pages are derived from their data files, so a new
  // entry there appears here without a second list to remember.
  const costRoutes: MetadataRoute.Sitemap = COST_PAGES.map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    lastModified: lastmod(`/${c.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    alternates: withAlternates(`/${c.slug}`),
  }));


  // Every Ukrainian city page has an English and a Russian counterpart, so all
  // three languages cross-reference each other.
  const uaRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/ua`,
      lastModified: lastmod('/ua'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: withAlternates('/ua'),
    },
    ...CITIES_UA.map((c) => ({
      url: `${siteUrl}/${c.slug}`,
      lastModified: lastmod(`/${c.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: withAlternates(`/${c.slug}`),
    })),
  ];


  // Localised cost and route pages. Derived like the English ones, so a new
  // entry in the data file is in the sitemap without a second list.
  const localisedRoutes: MetadataRoute.Sitemap = [
    ...COST_PAGES_RU, ...COST_PAGES_UA,
  ].map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    lastModified: lastmod(`/${c.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    alternates: withAlternates(`/${c.slug}`),
  }));

  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/blog`, lastModified: lastmod('/blog'), changeFrequency: 'weekly', priority: 0.7 , alternates: withAlternates('/blog') },
    ...getAllBlogPosts().map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...cityRoutes, ...costRoutes, ...serviceRoutes, ...blogRoutes, ...ruRoutes, ...uaRoutes, ...localisedRoutes];
}
