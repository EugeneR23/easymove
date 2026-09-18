/**
 * Shared JSON-LD builders.
 *
 * The rule this module exists to enforce: **a node identity is defined once and
 * referenced everywhere else.** Before it, `src/app/layout.tsx` and
 * `src/components/city/CityMoversPage.tsx` both emitted a full MovingCompany
 * claiming `@id: <site>/#organization`, with different `url`, `areaServed` and
 * `knowsLanguage` — on all 41 city pages. A consumer that merges by @id saw the
 * organization change shape on every page; one that does not saw two businesses
 * at the same address.
 *
 * So: `organizationNode()`, `websiteNode()` and `founderNode()` are imported by
 * the root layout and by nothing else. Every other page calls `orgRef()`.
 *
 * City-specific facts move onto the nodes where they are actually true. A Miami
 * service area is a property of the Miami service, not of the company.
 */
import { SITE_URL, ENTITY_ID, absUrl } from '@/lib/site';

export type SchemaLocale = 'en' | 'ru' | 'uk';

/** BCP-47. The URL segment is /ua; the language tag is uk. They are not the same string. */
export const bcp47 = (locale: string): SchemaLocale =>
  locale === 'ua' || locale === 'uk' ? 'uk' : locale === 'ru' ? 'ru' : 'en';

/** A reference to the organization. This is what every page except the root layout emits. */
export const orgRef = () => ({ '@id': ENTITY_ID.organization });
export const founderRef = () => ({ '@id': ENTITY_ID.founder });

export function breadcrumbNode(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function faqNode(faqs: { q: string; a: string }[], locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: bcp47(locale),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/**
 * The page itself. Carries the page's language and its city description, and
 * points `about` at the organization rather than redefining it — which is the
 * whole reason this file exists.
 */
export function cityPageNode(o: {
  path: string;
  name: string;
  description: string;
  locale: string;
}) {
  const url = absUrl(o.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: o.name,
    description: o.description,
    inLanguage: bcp47(o.locale),
    about: orgRef(),
    isPartOf: { '@id': ENTITY_ID.website },
    mainEntity: { '@id': `${url}#service` },
  };
}

/** A service offered in one place, at the published hourly rates. */
export function serviceNode(o: {
  path: string;
  name: string;
  serviceType: string;
  areaServed: string;
  rates?: { crew: number; price: number }[];
  minHours?: number;
}) {
  const url = absUrl(o.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: o.name,
    serviceType: o.serviceType,
    provider: orgRef(),
    areaServed: { '@type': 'City', name: o.areaServed },
    ...(o.rates && o.rates.length
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: Math.min(...o.rates.map((r) => r.price)),
            highPrice: Math.max(...o.rates.map((r) => r.price)),
            offerCount: o.rates.length,
            priceSpecification: o.rates.map((r) => ({
              '@type': 'UnitPriceSpecification',
              price: r.price,
              priceCurrency: 'USD',
              unitText: 'HUR',
              name: `Crew of ${r.crew} movers — hourly labour rate`,
              ...(o.minHours
                ? { eligibleQuantity: { '@type': 'QuantitativeValue', minValue: o.minHours, unitText: 'HUR' } }
                : {}),
            })),
          },
        }
      : {}),
  };
}

/** Serialise for dangerouslySetInnerHTML. `<` is escaped so a stray tag cannot close the script. */
export const ld = (node: unknown): string =>
  JSON.stringify(node).replace(/</g, '\u003c');

export { SITE_URL, ENTITY_ID, absUrl };
