import type { MetadataRoute } from 'next';
import { readAllServices } from '@/lib/data/services';
import { getAllBlogPosts } from '@/lib/data/blog';

const siteUrl = 'https://www.easy-move-florida.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const services = readAllServices();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/miami-movers`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/fort-lauderdale-movers`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/boca-raton-movers`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/aventura-movers`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/coral-gables-movers`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/sunny-isles-movers`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/hollywood-movers`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/coconut-grove-movers`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/packing-services`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  const ruRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/ru`,         lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/ru/about`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/ru/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/ru/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
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
