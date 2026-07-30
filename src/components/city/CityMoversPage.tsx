import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import AnimateIn from '@/components/ui/AnimateIn';
import { Phone, Shield, Award, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import type { CityData } from '@/lib/data/cities';

const SERVICES = {
  en: [
    { href: '/services/residential-moving',  label: 'High-Rise & Residential', desc: 'Condos, apartments, and homes of every size.' },
    { href: '/services/long-distance-moving', label: 'Long-Distance',           desc: 'Interstate moves with full coordination.' },
    { href: '/services/office-commercial',   label: 'Office & Commercial',     desc: 'Minimal downtime, maximum precision.' },
    { href: '/services/specialty-items',     label: 'Fine Art & Specialty',    desc: 'Museum-grade handling for high-value items.' },
    { href: '/services/storage-solutions',   label: 'Premium Storage',         desc: 'Short-term and monthly storage options.' },
    { href: '/services/international-moving', label: 'International',          desc: 'Customs coordination and overseas shipping.' },
  ],
  ru: [
    { href: '/services/residential-moving',  label: 'Квартиры и высотки',      desc: 'Кондо, апартаменты и дома любого размера.' },
    { href: '/services/long-distance-moving', label: 'Дальние переезды',        desc: 'Межштатные переезды с полной координацией.' },
    { href: '/services/office-commercial',   label: 'Офисы и бизнес',          desc: 'Минимальный простой, максимальная точность.' },
    { href: '/services/specialty-items',     label: 'Искусство и антиквариат', desc: 'Музейный уровень обращения с ценными вещами.' },
    { href: '/services/storage-solutions',   label: 'Хранение',                desc: 'Краткосрочное и помесячное хранение вещей.' },
    { href: '/services/international-moving', label: 'Международные',          desc: 'Координация с таможней и морской отправкой.' },
  ],
} as const;

const TRUST = {
  en: [
    { icon: Shield, label: 'Fully Owner-led' },
    { icon: Award,  label: 'Founder-Led — No Subcontractors' },
    { icon: CheckCircle, label: 'COI Issued Within 24 Hours' },
    { icon: MapPin, label: 'South Florida Team' },
  ],
  ru: [
    { icon: Shield, label: 'Лицензия и страховка' },
    { icon: Award,  label: 'Работает владелец — без субподрядчиков' },
    { icon: CheckCircle, label: 'COI для здания за 24 часа' },
    { icon: MapPin, label: 'Русскоязычная команда в Южной Флориде' },
  ],
} as const;

const UI = {
  en: {
    heroAlt: (c: CityData) => `Professional movers in ${c.name}, ${c.state} — Easy Move Florida`,
    countyLine: (c: CityData) => `${c.county} County · ${c.state}`,
    ctaEstimate: 'Get a FREE Estimate',
    localExpertise: 'Local Expertise',
    weKnow: (c: CityData) => `We Know ${c.name}`,
    coordinatorPara: 'Every move is assigned a dedicated coordinator. The crew arrives briefed on your building, your timeline, and everything that needs protecting — before a single box is loaded.',
    tags: ['Founder-Led', 'COI Available', 'No Subcontractors', 'Direct: 786-305-1844'],
    whatWeOffer: 'What We Offer',
    everyMove: (c: CityData) => `Every move in ${c.name} we handle`,
    learnMore: 'Learn More',
    serviceArea: 'Service Area',
    neighborhoods: (c: CityData) => `Neighborhoods We Serve in ${c.name}`,
    dontSee: 'Don’t see your neighborhood?',
    callUs: 'Call us',
    weCover: ' — we likely cover your area.',
    freeEstimate: 'Free Estimate',
    readyToMove: (c: CityData) => `Ready to Move in ${c.name}?`,
    commonQuestions: 'Common Questions',
    faqTitle: (c: CityData) => `${c.name} Moving FAQs`,
    breadcrumbHome: 'Home',
    breadcrumbAreas: 'Service Areas',
    breadcrumbCity: (c: CityData) => `${c.name} Movers`,
  },
  ru: {
    heroAlt: (c: CityData) => `Профессиональные грузчики и переезды в ${c.name} — Easy Move Florida`,
    countyLine: (c: CityData) => `Округ ${c.county} · ${c.state}`,
    ctaEstimate: 'Бесплатный расчёт',
    localExpertise: 'Знаем район',
    weKnow: (c: CityData) => `Мы знаем ${c.name}`,
    coordinatorPara: 'За каждым переездом закреплён персональный координатор — по-русски, напрямую, без колл-центра. Бригада приезжает, уже зная ваше здание, лифт, правила управляющей компании и что нужно беречь особенно.',
    tags: ['Русскоязычный владелец', 'COI за 24 часа', 'Без субподрядчиков', 'Прямой телефон: 786-305-1844'],
    whatWeOffer: 'Что мы делаем',
    everyMove: (c: CityData) => `Любой переезд в ${c.name} — наша работа`,
    learnMore: 'Подробнее',
    serviceArea: 'Зона обслуживания',
    neighborhoods: (c: CityData) => `Районы, которые мы обслуживаем — ${c.name}`,
    dontSee: 'Не нашли свой район?',
    callUs: 'Позвоните',
    weCover: ' — скорее всего, мы туда выезжаем.',
    freeEstimate: 'Бесплатная смета',
    readyToMove: (c: CityData) => `Переезжаете в ${c.name}?`,
    commonQuestions: 'Частые вопросы',
    faqTitle: (c: CityData) => `Вопросы о переезде — ${c.name}`,
    breadcrumbHome: 'Главная',
    breadcrumbAreas: 'Города',
    breadcrumbCity: (c: CityData) => `Грузчики ${c.name}`,
  },
} as const;

type Locale = keyof typeof UI;

interface Props {
  city: CityData;
  locale?: Locale;
}

export default function CityMoversPage({ city, locale = 'en' }: Props) {
  const t = UI[locale];
  const services = SERVICES[locale];
  const trust = TRUST[locale];
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: 'Easy Move Florida',
    description: city.metaDescription,
    url: `https://www.easy-move-florida.com/${city.slug}`,
    telephone: '+17863051844',
    email: 'romanov@easy-move-florida.com',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${city.name}, ${city.state}`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2130 Stirling Rd',
      addressLocality: 'Hollywood',
      addressRegion: 'FL',
      postalCode: '33020',
      addressCountry: 'US',
    },
    priceRange: '$$$',
    openingHours: 'Mo-Sa 08:00-19:00',
    knowsLanguage: ['en', 'ru'],
    inLanguage: locale,
  });

  const faqSchemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: city.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  });

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: locale === 'ru' ? 'https://www.easy-move-florida.com/ru' : 'https://www.easy-move-florida.com' },
      { '@type': 'ListItem', position: 2, name: t.breadcrumbAreas, item: locale === 'ru' ? 'https://www.easy-move-florida.com/ru/services' : 'https://www.easy-move-florida.com/services' },
      { '@type': 'ListItem', position: 3, name: t.breadcrumbCity(city), item: `https://www.easy-move-florida.com/${city.slug}` },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchemaJson }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJson }}
      />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-[420px] md:min-h-[520px] flex items-center overflow-hidden bg-charcoal">
          <Image
            src={city.heroImage}
            alt={t.heroAlt(city)}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/70 to-charcoal/95" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {t.countyLine(city)}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4 max-w-3xl">
              {city.heroHeadline}
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">{city.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="gap-2">
                  {t.ctaEstimate} <ArrowRight size={15} />
                </Button>
              </Link>
              <a
                href="tel:+17863051844"
                className="inline-flex items-center justify-center gap-2 border border-white/50 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/70 transition-colors duration-200"
              >
                <Phone size={15} /> 786-305-1844
              </a>
            </div>
          </div>
        </section>

        {/* ── Trust strip ───────────────────────────────────────────────── */}
        <section className="relative bg-charcoal py-6">
          <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              {trust.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400">
                  <Icon size={14} className="text-gold shrink-0" />
                  <span className="text-xs tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intro + local facts ───────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                {t.localExpertise}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-5 leading-tight">
                {t.weKnow(city)}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">{city.intro}</p>
              <p className="text-gray-600 leading-relaxed">
                {t.coordinatorPara}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <span key={tag} className="text-[11px] border border-gold/25 text-gold/75 px-3 py-1 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {city.localFacts.map((fact) => (
                <div key={fact.title} className="p-6 bg-cream border-l-2 border-gold">
                  <h3 className="font-semibold text-charcoal mb-2">{fact.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{fact.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services — 2-col asymmetric zig-zag (replaces generic 3-col card grid) ─── */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-5xl">
            <div className="mb-12 md:mb-16">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">{t.whatWeOffer}</p>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal max-w-2xl leading-tight">
                {t.everyMove(city)}
              </h2>
            </div>
            {/*
              Asymmetric 2-col zig-zag: even items align left, odd align right with a top
              offset for visual rhythm. Avoids the "3 equal cards" AI-tell while still
              showcasing all 6 services. On mobile collapses to single column with no offset.
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-8 md:gap-y-12">
              {services.map((s, i) => {
                const offsetTop = i % 2 === 1 ? 'md:mt-16 lg:mt-24' : '';
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    className={`group block border-l-2 border-gold/30 hover:border-gold pl-6 md:pl-8 py-2 transition-all duration-300 ${offsetTop}`}
                  >
                    <p className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      0{i + 1}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight group-hover:text-gold transition-colors duration-300">
                      {s.label}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed mb-4 max-w-md">
                      {s.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-charcoal text-xs font-semibold tracking-widest uppercase border-b border-charcoal/30 group-hover:border-gold group-hover:text-gold transition-colors duration-200 pb-0.5">
                      {t.learnMore}
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Neighborhoods ─────────────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl mx-auto text-center">
            <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">{t.serviceArea}</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6">
              {t.neighborhoods(city)}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {city.neighborhoods.map((n) => (
                <span key={n} className="text-sm border border-gray-200 text-gray-500 px-4 py-2 hover:border-gold/30 hover:text-charcoal transition-colors duration-150">
                  {n}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6">
              {t.dontSee}{' '}
              <a href="tel:+17863051844" className="text-gold hover:underline">{t.callUs}</a>
              {t.weCover}
            </p>
          </div>
        </section>

        {/* ── Mid-page CTA ──────────────────────────────────────────────── */}
        <section className="bg-charcoal py-14">
          <div className="container-max text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">{t.freeEstimate}</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-7">
              {t.readyToMove(city)}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="gap-2">
                  {t.ctaEstimate} <ArrowRight size={15} />
                </Button>
              </Link>
              <a
                href="tel:+17863051844"
                className="inline-flex items-center justify-center gap-2 border border-white/50 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/70 transition-colors duration-200"
              >
                <Phone size={15} /> 786-305-1844
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">{t.commonQuestions}</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal">
                {t.faqTitle(city)}
              </h2>
            </div>
            <div className="space-y-0 divide-y divide-gray-200 border-t border-b border-gray-200">
              {city.faqs.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-semibold text-charcoal mb-2">{faq.q}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
