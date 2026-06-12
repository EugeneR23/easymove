import type { MetadataRoute } from 'next';
import { readAllServices } from '@/lib/data/services';
import { getAllBlogPosts } from '@/lib/data/blog';

const siteUrl = 'https://www.easy-move-florida.com';

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
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: withAlternates('/'),
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: withAlternates('/services'),
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: withAlternates('/about'),
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: withAlternates('/contact'),
    },
    {
      url: `${siteUrl}/quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: withAlternates('/pricing'),
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: new Date(),
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
    { url: `${siteUrl}/miami-movers`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/miami-movers') },
    { url: `${siteUrl}/fort-lauderdale-movers`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/fort-lauderdale-movers') },
    { url: `${siteUrl}/boca-raton-movers`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/aventura-movers`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/aventura-movers') },
    { url: `${siteUrl}/coral-gables-movers`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/sunny-isles-movers`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/sunny-isles-movers') },
    { url: `${siteUrl}/hollywood-movers`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hollywood-movers') },
    { url: `${siteUrl}/coconut-grove-movers`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/doral-movers`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/hallandale-beach-movers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hallandale-beach-movers') },
    { url: `${siteUrl}/packing-services`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  const ruRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/ru`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9, alternates: withAlternates('/') },
    { url: `${siteUrl}/ru/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7, alternates: withAlternates('/about') },
    { url: `${siteUrl}/ru/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8, alternates: withAlternates('/services') },
    { url: `${siteUrl}/ru/pricing`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/pricing') },
    { url: `${siteUrl}/ru/contact`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8, alternates: withAlternates('/contact') },
    // Русские страницы городов — города с крупной русскоязычной общиной
    { url: `${siteUrl}/ru/miami-movers`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/miami-movers') },
    { url: `${siteUrl}/ru/fort-lauderdale-movers`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/fort-lauderdale-movers') },
    { url: `${siteUrl}/ru/sunny-isles-movers`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/sunny-isles-movers') },
    { url: `${siteUrl}/ru/aventura-movers`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/aventura-movers') },
    { url: `${siteUrl}/ru/hollywood-movers`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hollywood-movers') },
    { url: `${siteUrl}/ru/hallandale-beach-movers`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9, alternates: withAlternates('/hallandale-beach-movers') },
  ];

  const blogRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...getAllBlogPosts().map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...cityRoutes, ...serviceRoutes, ...blogRoutes, ...ruRoutes];
}
