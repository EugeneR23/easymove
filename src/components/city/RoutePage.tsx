import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone, CheckCircle, Truck } from 'lucide-react';
import { LD_MINIMUM } from '@/lib/pricing';
import { bandForSlug } from '@/lib/data/routes';
import type { RoutePageData } from '@/lib/data/routePages';

const siteUrl = 'https://www.easy-move-florida.com';

/**
 * Long-distance route page — /moving-miami-to-new-york and friends.
 *
 * The price band table reads from lib/data/routes.ts, the same array /pricing
 * renders, so a band can never say one thing on the route page and another on
 * the pricing page. A route with no published band (Florida → California)
 * renders the flat-minimum framing instead — no band is ever invented here.
 */

type Locale = 'en' | 'ru';

/**
 * Chrome and the verified service facts, per language. The price bands are not
 * here — RoutePage looks them up in lib/data/routes.ts by slug, so a band can
 * never say one thing in English and another in Russian.
 */
const UI = {
  en: {
    kicker: 'Long-distance moving',
    h1: (from: string, to: string) => `Moving from ${from} to ${to}: Cost & How It Works`,
    cta: 'Get a Written Estimate in 24h',
    bandsTitle: (from: string, to: string) => `${from} → ${to} price bands, 2026`,
    thStudio: 'Studio', th1: '1 bedroom', th2: '2 bedrooms', th3: '3 bedrooms',
    bandNote: (min: string) =>
      `These bands are estimates from our published rate table, not booked-job averages — your written estimate, inside 24 hours of the inventory, is the number that counts. Every job on this route is a flat rate with a dedicated truck, starting at the $${min} interstate minimum.`,
    noBand: (min: string) =>
      `This route is priced individually — long-distance jobs start at $${min} flat and the exact figure depends on inventory volume, access at both ends and timing. Send your inventory (photos of every room are enough) and the written estimate arrives within 24 hours. No deposit to book.`,
    howTitle: (route: string) => `How a ${route} move works here`,
    included: [
      'A dedicated truck — your belongings ride alone, never combined with another household’s load',
      'Flat rate per job: the number on the written estimate is the number on the invoice',
      'Written estimate within 24 hours of receiving your inventory',
      'No deposit to book, and free cancellation more than 48 hours out',
      'Packing available from $79/hour for two packers',
    ],
    affectsTitle: 'What moves the price on this route',
    faqTitle: (route: string) => `${route} moving FAQ`,
    related: 'Related:', ldLink: 'long-distance moving service',
    pricingLink: 'all routes and pricing', quoteLink: 'start your estimate',
    breadcrumbHome: 'Home', breadcrumbRoute: (route: string) => `Moving ${route}`,
  },
  ru: {
    kicker: 'Дальние переезды',
    h1: (from: string, to: string) => `Переезд из ${from} в ${to}: цена и как это работает`,
    cta: 'Письменная смета за 24 часа',
    bandsTitle: (from: string, to: string) => `${from} → ${to}: диапазоны цен, 2026`,
    thStudio: 'Студия', th1: '1 спальня', th2: '2 спальни', th3: '3 спальни',
    bandNote: (min: string) =>
      `Это оценки из нашей опубликованной таблицы, а не средние по выполненным работам: считается та письменная смета, которую вы получите в течение 24 часов после описи. Любая работа на этом маршруте — фиксированная ставка и выделенный трак, от межштатного минимума $${min}.`,
    noBand: (min: string) =>
      `Этот маршрут считается индивидуально: дальние переезды начинаются от $${min} фиксированно, а точная сумма зависит от объёма вещей, доступа с обеих сторон и сроков. Пришлите опись — фотографий каждой комнаты достаточно, — и письменная смета придёт в течение 24 часов. Депозита нет.`,
    howTitle: (route: string) => `Как проходит переезд ${route}`,
    included: [
      'Выделенный трак — ваши вещи едут одни, без чужих грузов',
      'Фиксированная ставка за работу: сумма в письменной смете и есть сумма в счёте',
      'Письменная смета в течение 24 часов после получения описи',
      'Депозита нет, бесплатная отмена более чем за 48 часов',
      'Упаковка по желанию — от $79 в час за двух упаковщиков',
    ],
    affectsTitle: 'Что влияет на цену на этом маршруте',
    faqTitle: (route: string) => `Вопросы о переезде ${route}`,
    related: 'Ещё:', ldLink: 'услуга дальних переездов',
    pricingLink: 'все маршруты и цены', quoteLink: 'начать расчёт',
    breadcrumbHome: 'Главная', breadcrumbRoute: (route: string) => `Переезд ${route}`,
  },
} as const;

export default function RoutePage({ page, locale = 'en' }: { page: RoutePageData; locale?: Locale }) {
  const t = UI[locale];
  const url = `${siteUrl}/${page.slug}`;
  // The band lives in lib/data/routes.ts under the un-prefixed slug, so the
  // Russian page and the English one cannot disagree about a price.
  const band = page.hasBand ? bandForSlug(page.slug.replace(/^(ru|ua)\//, '')) : undefined;
  const from = (locale === 'ru' ? page.fromCityRu : undefined) ?? page.fromCity;
  const to = (locale === 'ru' ? page.toCityRu : undefined) ?? page.toCity;
  const routeLabel = locale === 'ru' ? `${from} — ${to}` : `${from} to ${to}`;
  const ldMin = LD_MINIMUM.toLocaleString('en-US');

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.breadcrumbRoute(routeLabel), item: url },
    ],
  });

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        {/* Hero */}
        <section className="relative bg-charcoal py-20 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">{t.kicker}</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {t.h1(from, to)}
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">{page.answer}</p>
            <p className="text-gray-400 leading-relaxed mb-8">{page.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button size="lg" variant="primary">{t.cta}</Button>
              </Link>
              <a href="tel:7863051844">
                <Button size="lg" variant="ghost" className="inline-flex items-center gap-2 text-white border-white/20">
                  <Phone size={15} /> 786-305-1844
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Price band or flat-minimum framing */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-tight">
              {t.bandsTitle(from, to)}
            </h2>
            {band ? (
              <>
                <div className="overflow-x-auto border border-gray-200">
                  <table className="w-full text-left text-sm min-w-[520px]">
                    <thead>
                      <tr className="bg-charcoal text-white text-xs uppercase tracking-[0.15em]">
                        <th className="px-5 py-3 font-semibold">{t.thStudio}</th>
                        <th className="px-5 py-3 font-semibold">{t.th1}</th>
                        <th className="px-5 py-3 font-semibold">{t.th2}</th>
                        <th className="px-5 py-3 font-semibold">{t.th3}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-5 py-5 text-gold font-bold whitespace-nowrap">{band.studio}</td>
                        <td className="px-5 py-5 text-gold font-bold whitespace-nowrap">{band.oneBr}</td>
                        <td className="px-5 py-5 text-gold font-bold whitespace-nowrap">{band.twoBr}</td>
                        <td className="px-5 py-5 text-gold font-bold whitespace-nowrap">{band.threeBr}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mt-5">{t.bandNote(ldMin)}</p>
              </>
            ) : (
              <p className="text-gray-600 leading-relaxed">{t.noBand(ldMin)}</p>
            )}
          </div>
        </section>

        {/* What's included */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">
              {t.howTitle(routeLabel)}
            </h2>
            <ul className="space-y-4">
              {t.included.map((line) => (
                <li key={line} className="flex gap-3 items-start">
                  <CheckCircle size={17} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What moves the price */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">
              {t.affectsTitle}
            </h2>
            <div className="space-y-6">
              {page.whatAffects.map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <Truck size={17} className="text-gold shrink-0 mt-1" />
                  <div>
                    <p className="text-charcoal font-semibold text-sm mb-1">{f.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">
              {t.faqTitle(routeLabel)}
            </h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {page.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-semibold text-charcoal text-base mb-2">{f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-8">
              {t.related}{' '}
              <Link href="/services/long-distance-moving" className="text-gold hover:underline">{t.ldLink}</Link>
              {' · '}
              <Link href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="text-gold hover:underline">{t.pricingLink}</Link>
              {' · '}
              <Link href="/quote" className="text-gold hover:underline">{t.quoteLink}</Link>
            </p>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
