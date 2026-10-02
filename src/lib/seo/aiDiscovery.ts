/**
 * The /ai/*.json discovery files (geo-checklist.dev). Built only from data the
 * pages already render: no field here may state a fact that is not on the site.
 */
import { AI_SUMMARY } from '@/lib/data/summary';
import { HOME_FAQS } from '@/lib/data/faq';
import { PHONE, EMAIL, addressLine } from '@/lib/data/contact';
import { hoursLine } from '@/lib/data/hours';
import { readAllServices } from '@/lib/data/services';
import { lastModified } from '@/lib/seo/lastmod';
import { absUrl } from '@/lib/site';

const NAME = 'Easy Move Florida';

export function aiSummary() {
  return {
    name: NAME,
    description: AI_SUMMARY,
    url: absUrl('/'),
    lastModified: lastModified('/'),
    telephone: PHONE.e164,
    email: EMAIL,
    address: addressLine(),
    hours: hoursLine('en'),
    siteLanguages: ['en', 'ru', 'uk'],
    links: {
      llms: absUrl('/llms.txt'),
      llmsFull: absUrl('/llms-full.txt'),
      sitemap: absUrl('/sitemap.xml'),
      faq: absUrl('/ai/faq.json'),
      service: absUrl('/ai/service.json'),
    },
  };
}

export function aiFaq() {
  return {
    url: absUrl('/'),
    lastModified: lastModified('/'),
    faqs: HOME_FAQS.map((f) => ({ question: f.q, answer: f.a })),
  };
}

export function aiService() {
  const services = readAllServices();
  return {
    name: NAME,
    description: AI_SUMMARY,
    capabilities: services.map((s) => s.name),
    services: services.map((s) => ({
      name: s.name,
      description: s.tagline,
      url: absUrl(`/services/${s.slug}`),
    })),
    pricing: absUrl('/pricing'),
    quote: absUrl('/quote'),
  };
}

export const jsonResponse = (body: unknown): Response =>
  new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
