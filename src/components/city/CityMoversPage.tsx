import Link from 'next/link';
import { THUMBTACK_QUOTES } from '@/lib/data/thumbtackQuotes';
import { THUMBTACK } from '@/lib/data/credentials';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import AnimateIn from '@/components/ui/AnimateIn';
import { Phone, Shield, Award, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { CITIES, type CityData } from '@/lib/data/cities';
import { CITIES_RU } from '@/lib/data/citiesRu';
import { CITIES_UA } from '@/lib/data/citiesUa';
import { COST_PAGES, COST_PAGES_RU, COST_PAGES_UA } from '@/lib/data/costPages';


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
  ua: [
    { href: '/services/residential-moving',  label: 'Квартири та висотки',     desc: 'Кондо, апартаменти й будинки будь-якого розміру.' },
    { href: '/services/long-distance-moving', label: 'Далекі переїзди',         desc: 'Міжштатні переїзди з повною координацією.' },
    { href: '/services/office-commercial',   label: 'Офіси та бізнес',         desc: 'Мінімальний простій, максимальна точність.' },
    { href: '/services/specialty-items',     label: 'Мистецтво й антикваріат', desc: 'Музейний рівень поводження з цінними речами.' },
    { href: '/services/storage-solutions',   label: 'Зберігання',              desc: 'Короткострокове та помісячне зберігання речей.' },
    { href: '/services/international-moving', label: 'Міжнародні',             desc: 'Координація з митницею та морським відправленням.' },
  ],
} as const;

// [TODO: Evgenii] add the FDACS IM# here once you send it — a published Florida
// mover registration number is the strongest trust signal on a city page.
const TRUST = {
  en: [
    { icon: Shield, label: '$129/hr · 2 movers · 3-hr minimum' },
    { icon: Award,  label: 'Owner-led — the WhatsApp number reaches Evgenii' },
    { icon: CheckCircle, label: 'COI issued within 24 hours, no charge' },
    { icon: MapPin, label: 'Based in Hollywood · Russian & English' },
  ],
  ru: [
    { icon: Shield, label: 'От $129/час · 2 грузчика · минимум 3 часа' },
    { icon: Award,  label: 'Владелец на связи — WhatsApp 786-305-1844' },
    { icon: CheckCircle, label: 'COI для здания за 24 часа, бесплатно' },
    { icon: MapPin, label: 'База в Голливуде · русский и английский' },
  ],
  ua: [
    { icon: Shield, label: 'Від $129/год · 2 вантажники · мінімум 3 години' },
    { icon: Award,  label: 'Власник на звʼязку — WhatsApp 786-305-1844' },
    { icon: CheckCircle, label: 'COI для будинку за 24 години, безкоштовно' },
    { icon: MapPin, label: 'База в Голлівуді · україномовні вантажники в бригаді' },
  ],
} as const;

// Nearby city pages, so each city page has lateral links instead of being a
// dead end. Ordered by geography; the current city is filtered out at render.
// Russian display names. Only a label map — the list of cities that actually
// gets linked is derived from the data below, so a new city page can never be
// missing from the internal links just because someone forgot this file.
const RU_NAMES: Record<string, string> = {
  'miami-movers': 'Майами',
  'miami-beach-movers': 'Майами-Бич',
  'coral-gables-movers': 'Корал-Гейблс',
  'coconut-grove-movers': 'Коконат-Гроув',
  'doral-movers': 'Дорал',
  'aventura-movers': 'Авентура',
  'sunny-isles-movers': 'Санни-Айлс-Бич',
  'bal-harbour-movers': 'Бал-Харбор',
  'north-miami-beach-movers': 'Норт-Майами-Бич',
  'hallandale-beach-movers': 'Халландейл-Бич',
  'hollywood-movers': 'Голливуд',
  'fort-lauderdale-movers': 'Форт-Лодердейл',
  'pembroke-pines-movers': 'Пемброк-Пайнс',
  'weston-movers': 'Уэстон',
  'coral-springs-movers': 'Корал-Спрингс',
  'sunrise-movers': 'Санрайз',
  'boca-raton-movers': 'Бока-Ратон',
  'delray-beach-movers': 'Делрей-Бич',
  'boynton-beach-movers': 'Бойнтон-Бич',
};

// Ukrainian display names for the same nineteen slugs. Same rule as RU_NAMES:
// a label map only, never the source of which cities get linked.
const UA_NAMES: Record<string, string> = {
  'miami-movers': 'Маямі',
  'miami-beach-movers': 'Маямі-Біч',
  'coral-gables-movers': 'Корал-Гейблс',
  'coconut-grove-movers': 'Коконат-Ґроув',
  'doral-movers': 'Дорал',
  'aventura-movers': 'Авентура',
  'sunny-isles-movers': 'Санні-Айлс-Біч',
  'bal-harbour-movers': 'Бал-Гарбор',
  'north-miami-beach-movers': 'Норт-Маямі-Біч',
  'hallandale-beach-movers': 'Галландейл-Біч',
  'hollywood-movers': 'Голлівуд',
  'fort-lauderdale-movers': 'Форт-Лодердейл',
  'pembroke-pines-movers': 'Пемброк-Пайнс',
  'weston-movers': 'Вестон',
  'coral-springs-movers': 'Корал-Спрінгс',
  'sunrise-movers': 'Санрайз',
  'boca-raton-movers': 'Бока-Ратон',
  'delray-beach-movers': 'Делрей-Біч',
  'boynton-beach-movers': 'Бойнтон-Біч',
};

// Which cities have a Russian page — read from the Russian data itself rather
// than kept as a second hand-maintained list that drifts out of step with it.
const RU_CITY_SLUGS = new Set(CITIES_RU.map((c) => c.slug.replace(/^ru\//, '')));
const UA_CITY_SLUGS = new Set(CITIES_UA.map((c) => c.slug.replace(/^ua\//, '')));

/**
 * The cities we serve, ordered roughly south to north.
 *
 * South Florida is a coastal strip, so a single ordinal is enough to say which
 * cities sit next to which. This is deliberately NOT the pricing module's
 * CITY_COORDS table: that one silently returns 15 miles for any city it does
 * not know, which put Boynton Beach's "nearby" links in Coral Gables, forty
 * miles away. Ordering has no business depending on a lookup that fails quietly.
 */
const SOUTH_TO_NORTH = [
  'coconut-grove-movers',
  'coral-gables-movers',
  'miami-movers',
  'miami-beach-movers',
  'doral-movers',
  'north-miami-beach-movers',
  'bal-harbour-movers',
  'sunny-isles-movers',
  'aventura-movers',
  'hallandale-beach-movers',
  'hollywood-movers',
  'pembroke-pines-movers',
  'weston-movers',
  'fort-lauderdale-movers',
  'sunrise-movers',
  'coral-springs-movers',
  'boca-raton-movers',
  'delray-beach-movers',
  'boynton-beach-movers',
];

/**
 * The nearest other cities we serve, closest first.
 *
 * With nineteen city pages, listing every one of them on every page is a link
 * dump that helps nobody. A reader on the Boynton Beach page is shown Delray
 * and Boca, not Coconut Grove.
 */
function nearbyCities(current: CityData, limit = 8) {
  const currentSlug = current.slug.replace(/^ru\//, '');
  const here = SOUTH_TO_NORTH.indexOf(currentSlug);
  const rank = (slug: string) => {
    const i = SOUTH_TO_NORTH.indexOf(slug);
    // A city missing from the order sorts last rather than pretending to be adjacent.
    if (i < 0 || here < 0) return Number.MAX_SAFE_INTEGER;
    return Math.abs(i - here);
  };
  return CITIES.filter((c) => c.slug !== currentSlug)
    .map((c) => ({ city: c, d: rank(c.slug) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map(({ city }) => ({
      slug: city.slug,
      en: city.name,
      ru: RU_NAMES[city.slug] ?? city.name,
      ua: UA_NAMES[city.slug] ?? city.name,
    }));
}

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
    reviewsKicker: 'Verified Reviews',
    reviewsTitle: 'What clients say about our crews',
    reviewsNote: (r: number) => `Quoted word-for-word from our Thumbtack profile — ${r} verified reviews, every one from a client Thumbtack confirmed hired us.`,
    reviewsCta: 'Read all reviews on Thumbtack',
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
    reviewsKicker: 'Проверенные отзывы',
    reviewsTitle: 'Что клиенты говорят о наших бригадах',
    reviewsNote: (r: number) => `Дословные цитаты с нашего профиля Thumbtack — ${r} проверенных отзыва, каждый от клиента, чей заказ Thumbtack подтвердил. Оригиналы на английском.`,
    reviewsCta: 'Все отзывы на Thumbtack',
    breadcrumbHome: 'Главная',
    breadcrumbAreas: 'Города',
    breadcrumbCity: (c: CityData) => `Грузчики ${c.name}`,
  },
  // Українська. Мовна точність: приблизно третина вантажників україномовні,
  // тож бригаду можна зібрати під запит; координація — російська або англійська.
  ua: {
    heroAlt: (c: CityData) => `Професійні вантажники та переїзди в ${c.name} — Easy Move Florida`,
    countyLine: (c: CityData) => `Округ ${c.county} · ${c.state}`,
    ctaEstimate: 'Безкоштовний розрахунок',
    localExpertise: 'Знаємо район',
    weKnow: (c: CityData) => `Ми знаємо ${c.name}`,
    coordinatorPara: 'За кожним переїздом закріплений персональний координатор. Приблизно кожен третій наш вантажник — україномовний, тож бригаду, яка говоритиме з вами українською, зберемо за попереднім запитом; кошторис і листування ведемо російською або англійською. Бригада приїздить, уже знаючи ваш будинок, ліфт і правила менеджменту.',
    tags: ['Власник на звʼязку', 'COI за 24 години', 'Без субпідрядників', 'Телефон: 786-305-1844'],
    whatWeOffer: 'Що ми робимо',
    everyMove: (c: CityData) => `Будь-який переїзд у ${c.name} — наша робота`,
    learnMore: 'Докладніше',
    serviceArea: 'Зона обслуговування',
    neighborhoods: (c: CityData) => `Райони, які ми обслуговуємо — ${c.name}`,
    dontSee: 'Не знайшли свій район?',
    callUs: 'Зателефонуйте',
    weCover: ' — найімовірніше, ми туди виїжджаємо.',
    freeEstimate: 'Безкоштовний кошторис',
    readyToMove: (c: CityData) => `Переїжджаєте в ${c.name}?`,
    commonQuestions: 'Часті питання',
    faqTitle: (c: CityData) => `Питання про переїзд — ${c.name}`,
    reviewsKicker: 'Перевірені відгуки',
    reviewsTitle: 'Що клієнти кажуть про наші бригади',
    reviewsNote: (r: number) => `Дослівні цитати з нашого профілю Thumbtack — ${r} перевірені відгуки, кожен від клієнта, чиє замовлення Thumbtack підтвердив. Оригінали англійською.`,
    reviewsCta: 'Усі відгуки на Thumbtack',
    breadcrumbHome: 'Головна',
    breadcrumbAreas: 'Міста',
    breadcrumbCity: (c: CityData) => `Вантажники ${c.name}`,
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
  const isRu = locale === 'ru';
  const isUa = locale === 'ua';
  // The cost page for this city in the same language as this page. A Russian
  // city page must link to the Russian cost page rather than send the reader
  // into English mid-journey; where no localised cost page exists yet, the
  // lookup simply finds nothing and the link is not rendered.
  const costSource = isRu ? COST_PAGES_RU : isUa ? COST_PAGES_UA : COST_PAGES;
  const costPage = costSource.find((c) => c.citySlug === city.slug);
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
    inLanguage: locale === 'ua' ? 'uk' : locale, // BCP-47: Ukrainian is uk, not ua
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
      { '@type': 'ListItem', position: 1, name: t.breadcrumbHome, item: isRu ? 'https://www.easy-move-florida.com/ru' : isUa ? 'https://www.easy-move-florida.com/ua' : 'https://www.easy-move-florida.com' },
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

        {/* ── Verified Thumbtack quotes — verbatim, company-wide ────────── */}
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">{t.reviewsKicker}</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">{t.reviewsTitle}</h2>
              <p className="text-gray-500 text-sm max-w-2xl mx-auto">{t.reviewsNote(THUMBTACK.reviewCount)}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {THUMBTACK_QUOTES.slice(0, 3).map((q) => (
                <figure key={q.author} className="border border-gray-200 bg-cream p-6 flex flex-col">
                  <blockquote className="text-gray-600 text-sm leading-relaxed flex-1">“{q.text}”</blockquote>
                  <figcaption className="mt-4 pt-4 border-t border-gray-200">
                    <span className="block font-semibold text-charcoal text-sm">{q.author}</span>
                    <span className="block text-gray-400 text-xs">{q.service} · {q.date}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="text-center mt-8">
              <a href={THUMBTACK.url} target="_blank" rel="noopener noreferrer" className="text-gold text-sm font-semibold hover:underline">
                {t.reviewsCta} ↗
              </a>
            </p>
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

        {/* ── Nearby cities ─────────────────────────────────────────────── */}
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-max max-w-4xl mx-auto text-center">
            {costPage && (
              <p className="text-gray-500 text-sm mb-8">
                <Link href={`/${costPage.slug}`} className="text-gold hover:underline">
                  {/* The cost page carries the city name in its own language;
                      city.name is the Latin form and would read wrong here. */}
                  {isRu
                    ? `Сколько стоит переезд в ${costPage.cityNameRu ?? city.name} — цены 2026`
                    : isUa
                      ? `Скільки коштує переїзд у ${costPage.cityNameUa ?? city.name} — ціни 2026`
                      : `How much do movers cost in ${city.name}? 2026 prices`}
                </Link>
              </p>
            )}
            <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              {isRu ? 'Другие города' : isUa ? 'Інші міста' : 'We also move in'}
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {nearbyCities(city).map((n) => {
                const href = isRu && RU_CITY_SLUGS.has(n.slug) ? `/ru/${n.slug}`
                  : isUa && UA_CITY_SLUGS.has(n.slug) ? `/ua/${n.slug}`
                  : `/${n.slug}`;
                return (
                  <li key={n.slug}>
                    <Link
                      href={href}
                      className="inline-block text-sm border border-gray-200 text-gray-600 px-4 py-2 hover:border-gold/40 hover:text-charcoal transition-colors duration-150"
                    >
                      {isRu ? n.ru : isUa ? n.ua : n.en}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
