import type { MetadataRoute } from 'next';
import { readAllServices } from '@/lib/data/services';
import { getAllBlogPosts } from '@/lib/data/blog';

const siteUrl = 'https://www.easy-move-florida.com';

// Real content-change dates, not build time. `new Date()` on every route made
// every lastmod identical to the build timestamp, which Google learns to ignore.
// Update the entry when you materially change that page's content.
const LASTMOD: Record<string, string> = {
  '/': '2026-07-30',
  '/pricing': '2026-07-30',
  '/services': '2026-07-30',
  '/about': '2026-07-30',
  '/reviews': '2026-07-30',
  '/contact': '2026-07-30',
  '/quote': '2026-07-30',
  '/packing-services': '2026-07-30',
  '/moving-cost-miami': '2026-07-30',
  '/coi-miami-condo-movers': '2026-08-24',
  '/blog': '2026-07-30',
  // City pages — all rewritten in the 2026-07-30 commercial-facts pass
  '/miami-movers': '2026-07-30',
  '/fort-lauderdale-movers': '2026-07-30',
  '/boca-raton-movers': '2026-07-30',
  '/aventura-movers': '2026-07-30',
  '/coral-gables-movers': '2026-07-30',
  '/sunny-isles-movers': '2026-07-30',
  '/hollywood-movers': '2026-07-30',
  '/coconut-grove-movers': '2026-07-30',
  '/doral-movers': '2026-07-30',
  '/hallandale-beach-movers': '2026-07-30',
  '/miami-beach-movers': '2026-08-24',
  '/bal-harbour-movers': '2026-08-24',
  '/north-miami-beach-movers': '2026-08-24',
  '/pembroke-pines-movers': '2026-08-24',
  '/weston-movers': '2026-08-24',
  '/coral-springs-movers': '2026-08-24',
  '/sunrise-movers': '2026-08-24',
  '/delray-beach-movers': '2026-08-24',
  '/boynton-beach-movers': '2026-08-24',
  '/ru': '2026-07-30',
  '/ru/about': '2026-07-30',
  '/ru/services': '2026-07-30',
  '/ru/pricing': '2026-07-30',
  '/ru/contact': '2026-07-30',
  '/ru/miami-movers': '2026-07-30',
  '/ru/fort-lauderdale-movers': '2026-07-30',
  '/ru/sunny-isles-movers': '2026-07-30',
  '/ru/aventura-movers': '2026-07-30',
  '/ru/hollywood-movers': '2026-07-30',
  '/ru/hallandale-beach-movers': '2026-07-30',
  '/ru/miami-beach-movers': '2026-08-24',
  '/ru/bal-harbour-movers': '2026-08-24',
  '/ru/north-miami-beach-movers': '2026-08-24',
  '/ru/boca-raton-movers': '2026-08-24',
  '/ru/delray-beach-movers': '2026-08-24',
  '/ru/pembroke-pines-movers': '2026-08-24',
  '/ru/weston-movers': '2026-08-24',
  '/ru/coral-springs-movers': '2026-08-24',
  '/ru/sunrise-movers': '2026-08-24',
  '/ru/boynton-beach-movers': '2026-08-24',
};

function lastmod(path: string): Date {
  return new Date(LASTMOD[path] ?? '2026-07-30');
}

// Pages that have a Russian translation today. Used to emit xhtml:link
// alternates inside the sitemap so Google understands the EN ↔ RU mapping
// without depending on per-page <link rel="alternate"> tags.
const RU_PAIRED: Record<string, string> = {
  '/': '/ru',
  '/about': '/ru/about',
  '/services': '/ru/services',
  '/contact': '/ru/contact',
  '/pricing': '/ru/pricing',
  '/miami-movers': '/ru/miami-movers',
  '/fort-lauderdale-movers': '/ru/fort-lauderdale-movers',
  '/sunny-isles-movers': '/ru/sunny-isles-movers',
  '/aventura-movers': '/ru/aventura-movers',
  '/hollywood-movers': '/ru/hollywood-movers',
  '/hallandale-beach-movers': '/ru/hallandale-beach-movers',
  '/boca-raton-movers': '/ru/boca-raton-movers',
  '/miami-beach-movers': '/ru/miami-beach-movers',
  '/bal-harbour-movers': '/ru/bal-harbour-movers',
  '/north-miami-beach-movers': '/ru/north-miami-beach-movers',
  '/pembroke-pines-movers': '/ru/pembroke-pines-movers',
  '/weston-movers': '/ru/weston-movers',
  '/coral-springs-movers': '/ru/coral-springs-movers',
  '/sunrise-movers': '/ru/sunrise-movers',
  '/delray-beach-movers': '/ru/delray-beach-movers',
  '/boynton-beach-movers': '/ru/boynton-beach-movers',
};

function withAlternates(path: string): MetadataRoute.Sitemap[number]['alternates'] | undefined {
  const ruPath = RU_PAIRED[path];
  if (!ruPath) return undefined;
  return {
    languages: {
      en: `${siteUrl}${path === '/' ? '' : path}`,
      ru: `${siteUrl}${ruPath}`,
      'x-default': `${siteUrl}${path === '/' ? '' : path}`,
    },
  };
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
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/miami-movers`,            lastModified: lastmod('/miami-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/miami-movers') },
    { url: `${siteUrl}/fort-lauderdale-movers`,  lastModified: lastmod('/fort-lauderdale-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/fort-lauderdale-movers') },
    { url: `${siteUrl}/boca-raton-movers`,       lastModified: lastmod('/boca-raton-movers'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/aventura-movers`,         lastModified: lastmod('/aventura-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/aventura-movers') },
    { url: `${siteUrl}/coral-gables-movers`,     lastModified: lastmod('/coral-gables-movers'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/sunny-isles-movers`,      lastModified: lastmod('/sunny-isles-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/sunny-isles-movers') },
    { url: `${siteUrl}/hollywood-movers`,        lastModified: lastmod('/hollywood-movers'), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hollywood-movers') },
    { url: `${siteUrl}/coconut-grove-movers`,    lastModified: lastmod('/coconut-grove-movers'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/doral-movers`,            lastModified: lastmod('/doral-movers'), changeFrequency: 'monthly', priority: 0.9 },
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
    { url: `${siteUrl}/packing-services`,        lastModified: lastmod('/packing-services'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/moving-cost-miami`,       lastModified: lastmod('/moving-cost-miami'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/coi-miami-condo-movers`,  lastModified: lastmod('/coi-miami-condo-movers'), changeFrequency: 'monthly', priority: 0.9 },
  ];

  const ruRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/ru`,          lastModified: lastmod('/ru'), changeFrequency: 'weekly',  priority: 0.9, alternates: withAlternates('/') },
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

  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/blog`, lastModified: lastmod('/blog'), changeFrequency: 'weekly', priority: 0.7 },
    ...getAllBlogPosts().map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...cityRoutes, ...serviceRoutes, ...blogRoutes, ...ruRoutes];
}
