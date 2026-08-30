import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone, Clock } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS, TRUCK_FEE, LD_MINIMUM, minInvoice } from '@/lib/pricing';
import type { CostPageData } from '@/lib/data/costPages';

const siteUrl = 'https://www.easy-move-florida.com';

/**
 * "How much do movers cost in {city}?" — the template behind every
 * /moving-cost-<city> page.
 *
 * Modeled on /moving-cost-miami, the page ChatGPT already cites, but generic:
 * the rates and the totals table come from the pricing module and a shared
 * constant, so a rate change propagates to every cost page in one edit. What
 * differs per city — the answer paragraph, the access factors that move the
 * hour count, the FAQ — comes from lib/data/costPages.ts.
 */

// hours band × that crew's hourly rate + that crew's truck fee.
// Same arithmetic as /pricing's APARTMENT_TOTALS; kept as strings because the
// bands mix crews (2BR spans a 2-mover low and a 3-mover high).
const TOTALS = [
  { hours: '3–4',  total: '$516–$645' },
  { hours: '3–5',  total: '$516–$774' },
  { hours: '4–6',  total: '$645–$1,253' },
  { hours: '6–8',  total: '$1,253–$1,611' },
  { hours: '8–12', total: '$1,611–$2,327+' },
];

type Locale = 'en' | 'ru' | 'ua';

/** Chrome around the content. The numbers all come from the pricing module. */
const UI = {
  en: {
    kicker: (c: string) => `${c} moving costs`,
    h1: (c: string) => `How Much Do Movers Cost in ${c}? (2026 Prices)`,
    ctaEstimate: 'Get a Written Estimate',
    ratesTitle: (c: string) => `${c} hourly moving rates, 2026`,
    thBook: 'What you book', thRate: 'Rate', thNotes: 'Notes',
    movers2: '2 movers', movers3: '3 movers', truck: 'Truck', minimum: 'Minimum', longDistance: 'Long distance',
    notes2: 'Studios and 1-bedrooms',
    notes3: '2 bedrooms and up, or a tight elevator window',
    notesTruck: 'Per day at the crew rate, its own line. Fuel, tolls and mileage included',
    notesMin: (m: number) => `Smallest invoice $${m} — then 15-minute increments`,
    notesLd: 'Flat per job, written estimate within 24 hours',
    hours: 'hours',
    totalsTitle: (c: string) => `What a ${c} move actually costs, by home size`,
    totalsIntro: 'Every figure is the same arithmetic: hours × hourly rate, plus the truck at that same crew rate.',
    thSize: 'Home size', thTime: 'Typical time', thCrew: 'Crew', thTotal: 'All-in total',
    sizes: ['Studio', '1 bedroom', '2 bedrooms', '3 bedrooms', '4+ bedrooms'],
    crews: ['2 movers', '2 movers', '2–3 movers', '3 movers', '3–4 movers'],
    factorsTitle: (c: string) => `What moves the price in ${c}`,
    factorsIntro: 'None of these are fees — there is no stairs fee, elevator fee, long-carry fee or fuel surcharge here. They cost time, and that time belongs in the written estimate before move day.',
    faqTitle: (c: string) => `${c} moving cost FAQ`,
    related: 'Related:', pricingLink: 'full pricing page with a worked example',
    cityLink: (c: string) => `${c} movers`, miamiLink: 'Miami moving costs',
    breadcrumbHome: 'Home', breadcrumbCosts: (c: string) => `${c} Moving Costs`,
  },
  ru: {
    kicker: (c: string) => `Цены на переезд — ${c}`,
    h1: (c: string) => `Сколько стоит переезд в ${c}? Цены 2026`,
    ctaEstimate: 'Получить письменную смету',
    ratesTitle: (c: string) => `Почасовые ставки — ${c}, 2026`,
    thBook: 'Что вы заказываете', thRate: 'Ставка', thNotes: 'Примечания',
    movers2: '2 грузчика', movers3: '3 грузчика', truck: 'Трак', minimum: 'Минимум', longDistance: 'Дальний переезд',
    notes2: 'Студии и однокомнатные',
    notes3: 'От двух спален или узкое лифтовое окно',
    notesTruck: 'За день по ставке бригады, отдельной строкой. Топливо, платные дороги и пробег внутри',
    notesMin: (m: number) => `Минимальный счёт $${m}, дальше шагами по 15 минут`,
    notesLd: 'Фиксированно за работу, письменная смета за 24 часа',
    hours: 'часа',
    totalsTitle: (c: string) => `Сколько на самом деле стоит переезд в ${c}, по размеру жилья`,
    totalsIntro: 'Арифметика везде одна: часы × ставка бригады плюс трак по той же ставке.',
    thSize: 'Размер жилья', thTime: 'Обычно часов', thCrew: 'Бригада', thTotal: 'Итого «под ключ»',
    sizes: ['Студия', '1 спальня', '2 спальни', '3 спальни', '4+ спальни'],
    crews: ['2 грузчика', '2 грузчика', '2–3 грузчика', '3 грузчика', '3–4 грузчика'],
    factorsTitle: (c: string) => `Что влияет на сумму в ${c}`,
    factorsIntro: 'Ничего из этого не является сбором: у нас нет платы за лестницы, лифт, длинный пронос или топливо. Это время, и оно попадает в письменную смету до дня переезда, а не в счёт после.',
    faqTitle: (c: string) => `Вопросы о ценах — ${c}`,
    related: 'Ещё:', pricingLink: 'полная страница цен с разбором примера',
    cityLink: (c: string) => `грузчики в ${c}`, miamiLink: 'цены на переезд в Майами',
    breadcrumbHome: 'Главная', breadcrumbCosts: (c: string) => `Цены на переезд — ${c}`,
  },
  ua: {
    kicker: (c: string) => `Ціни на переїзд — ${c}`,
    h1: (c: string) => `Скільки коштує переїзд у ${c}? Ціни 2026`,
    ctaEstimate: 'Отримати письмовий кошторис',
    ratesTitle: (c: string) => `Погодинні ставки — ${c}, 2026`,
    thBook: 'Що ви замовляєте', thRate: 'Ставка', thNotes: 'Примітки',
    movers2: '2 вантажники', movers3: '3 вантажники', truck: 'Трак', minimum: 'Мінімум', longDistance: 'Далекий переїзд',
    notes2: 'Студії та однокімнатні',
    notes3: 'Від двох спалень або вузьке ліфтове вікно',
    notesTruck: 'За день за ставкою бригади, окремим рядком. Пальне, платні дороги й пробіг усередині',
    notesMin: (m: number) => `Мінімальний рахунок $${m}, далі кроками по 15 хвилин`,
    notesLd: 'Фіксовано за роботу, письмовий кошторис за 24 години',
    hours: 'години',
    totalsTitle: (c: string) => `Скільки насправді коштує переїзд у ${c}, за розміром житла`,
    totalsIntro: 'Арифметика скрізь одна: години × ставка бригади плюс трак за тією ж ставкою.',
    thSize: 'Розмір житла', thTime: 'Зазвичай годин', thCrew: 'Бригада', thTotal: 'Разом «під ключ»',
    sizes: ['Студія', '1 спальня', '2 спальні', '3 спальні', '4+ спальні'],
    crews: ['2 вантажники', '2 вантажники', '2–3 вантажники', '3 вантажники', '3–4 вантажники'],
    factorsTitle: (c: string) => `Що впливає на суму в ${c}`,
    factorsIntro: 'Нічого з цього не є збором: у нас немає плати за сходи, ліфт, довге перенесення чи пальне. Це час, і він потрапляє у письмовий кошторис до дня переїзду, а не в рахунок після.',
    faqTitle: (c: string) => `Питання про ціни — ${c}`,
    related: 'Ще:', pricingLink: 'повна сторінка цін із розбором прикладу',
    cityLink: (c: string) => `вантажники в ${c}`, miamiLink: 'ціни на переїзд у Маямі',
    breadcrumbHome: 'Головна', breadcrumbCosts: (c: string) => `Ціни на переїзд — ${c}`,
  },
} as const;

export default function CostPage({ page, locale = 'en' }: { page: CostPageData; locale?: Locale }) {
  const t = UI[locale];
  // The city name in the page's own language, falling back to the Latin one.
  const city = (locale === 'ru' ? page.cityNameRu : locale === 'ua' ? page.cityNameUa : undefined) ?? page.cityName;
  const url = `${siteUrl}/${page.slug}`;

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: locale === 'en' ? siteUrl : `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.breadcrumbCosts(city), item: url },
    ],
  });

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'ua' ? 'uk' : locale,
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
        {/* Hero — the answer sits in the first paragraph */}
        <section className="relative bg-charcoal py-20 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">{t.kicker(city)}</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {t.h1(city)}
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-4">{page.answer}</p>
            <p className="text-gray-400 leading-relaxed mb-8">{page.intro}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button size="lg" variant="primary">{t.ctaEstimate}</Button>
              </Link>
              <a href="tel:7863051844">
                <Button size="lg" variant="ghost" className="inline-flex items-center gap-2 text-white border-white/20">
                  <Phone size={15} /> 786-305-1844
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Rate table — straight from the pricing module */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-5 leading-tight">
              {t.ratesTitle(city)}
            </h2>
            <div className="overflow-x-auto border border-gray-200">
              <table className="w-full text-left text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-charcoal text-white text-xs uppercase tracking-[0.15em]">
                    <th className="px-5 py-3 font-semibold">{t.thBook}</th>
                    <th className="px-5 py-3 font-semibold">{t.thRate}</th>
                    <th className="px-5 py-3 font-semibold">{t.thNotes}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">{t.movers2}</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">${HOURLY_RATE[2]}/hour</td>
                    <td className="px-5 py-4 text-gray-500">{t.notes2}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">{t.movers3}</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">${HOURLY_RATE[3]}/hour</td>
                    <td className="px-5 py-4 text-gray-500">{t.notes3}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">{t.truck}</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">${TRUCK_FEE[2]}–${TRUCK_FEE[4]}/day</td>
                    <td className="px-5 py-4 text-gray-500">{t.notesTruck}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-4 text-charcoal font-semibold">{t.minimum}</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">{MIN_HOURS} {t.hours}</td>
                    <td className="px-5 py-4 text-gray-500">{t.notesMin(minInvoice(2))}</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 text-charcoal font-semibold">{t.longDistance}</td>
                    <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">from ${LD_MINIMUM.toLocaleString('en-US')}</td>
                    <td className="px-5 py-4 text-gray-500">{t.notesLd}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Totals by size */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight">
              {t.totalsTitle(city)}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              {t.totalsIntro}
            </p>
            <div className="overflow-x-auto bg-white border border-gray-200">
              <table className="w-full text-left text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-charcoal text-white text-xs uppercase tracking-[0.15em]">
                    <th className="px-5 py-3 font-semibold">{t.thSize}</th>
                    <th className="px-5 py-3 font-semibold">{t.thTime}</th>
                    <th className="px-5 py-3 font-semibold">{t.thCrew}</th>
                    <th className="px-5 py-3 font-semibold">{t.thTotal}</th>
                  </tr>
                </thead>
                <tbody>
                  {TOTALS.map((r, i) => (
                    <tr key={t.sizes[i]} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-5 py-4 text-charcoal font-semibold">{t.sizes[i]}</td>
                      <td className="px-5 py-4 text-gray-600">{r.hours} {t.hours}</td>
                      <td className="px-5 py-4 text-gray-600">{t.crews[i]}</td>
                      <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What moves the hour count in this city */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight">
              {t.factorsTitle(city)}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              {t.factorsIntro}
            </p>
            <div className="space-y-6">
              {page.accessFactors.map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <Clock size={17} className="text-gold shrink-0 mt-1" />
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
              {t.faqTitle(city)}
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
              <Link href={locale === 'en' ? '/pricing' : `/${locale}/pricing`} className="text-gold hover:underline">{t.pricingLink}</Link>
              {' · '}
              <Link href={`/${page.citySlug}`} className="text-gold hover:underline">{t.cityLink(city)}</Link>
              {' · '}
              <Link href={locale === 'ru' ? '/ru/moving-cost-miami' : '/moving-cost-miami'} className="text-gold hover:underline">{t.miamiLink}</Link>
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
