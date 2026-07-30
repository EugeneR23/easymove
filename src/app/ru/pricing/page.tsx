import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { CheckCircle, X, Phone, Shield, Clock, AlertCircle } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS } from '@/lib/pricing';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: 'Цены на переезд | Easy Move Florida' },
  description:
    'Переезд в Южной Флориде: $129/час за 2 грузчиков или $179/час за 3, минимум 3 часа, плюс $129 за трак в день отдельной строкой. Реальные суммы по размерам квартиры и что входит в ставку.',
  alternates: {
    canonical: `${siteUrl}/ru/pricing`,
    languages: {
      en: `${siteUrl}/pricing`,
      ru: `${siteUrl}/ru/pricing`,
      'x-default': `${siteUrl}/pricing`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    siteName: 'EasyMove Elite',
    title: 'Сколько стоит переезд в Майами? | EasyMove Elite',
    description:
      'Реальные цены: студия $516–$645, 1 комн. $516–$774, 2 комн. $645–$1,203, 3 комн. $1,203–$1,561. Ставка зафиксирована, трак — отдельная строка $129 в день.',
    url: `${siteUrl}/ru/pricing`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'EasyMove Elite — прозрачные цены на переезд' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Цены на переезд в Южной Флориде — Прозрачные ставки',
    description: 'От $129/час, минимум 3 часа. Без надбавок за топливо, без оплаты за лестницы, без сюрпризов.',
    images: [`${siteUrl}/images/Hero.png`],
  },
};

const APARTMENT_TOTALS = [
  { size: 'Студия',                 hours: '3–4 часа',   crew: '2 грузчика',   range: '$516–$645',     details: 'Кровать, диван, комод, ~15 коробок' },
  { size: '1-комнатная',            hours: '3–5 часов',  crew: '2 грузчика',   range: '$516–$774',     details: 'Кровать, диван, комод, обеденный стол, ~25 коробок' },
  { size: '2-комнатная',            hours: '4–6 часов',  crew: '2–3 грузчика', range: '$645–$1,203',   details: 'Две спальни, диван, обеденная группа, ~40 коробок' },
  { size: '3-комнатная',            hours: '6–8 часов',  crew: '3 грузчика',   range: '$1,203–$1,561', details: 'Три спальни, гостиная, столовая, ~60 коробок' },
  { size: '4+ комнаты / дом',       hours: '8–12 часов', crew: '3–4 грузчика', range: '$1,561–$2,277+', details: 'Дом целиком — рекомендуем осмотр на месте' },
  { size: 'Офис (до 20 человек)',   hours: '6–9 часов',  crew: '3 грузчика',   range: '$1,203–$1,740', details: 'Столы, кресла, техника, документация' },
];

const INCLUDED = [
  'Два (или три) грузчика на весь объём работы',
  'Пледы, стретч-плёнка и чехлы для матрасов — на время переезда, возвращаются с траком',
  'Защитные пледы, стрейч-плёнка, базовая шринк-обмотка',
  'Стандартная разборка и сборка (кровати, столы, базовая IKEA-мебель)',
  'Стандартная страховая ответственность на каждом переезде',
  'Страховое свидетельство (COI) для здания — за 24 часа, бесплатно',
  'Двухчасовое окно прибытия + звонок за 30 минут',
  'Письменная смета до начала любых работ',
];

const NOT_INCLUDED = [
  'Упаковочные материалы кроме пледов и стрейч-плёнки (коробки, бумага, скотч) — отдельный счёт или вы привозите сами',
  'Специальные предметы: пианино, сейф, мраморная столешница — фиксированная сумма, без сюрпризов',
  'Длинный перенос / шаттл-сервис для зданий без близкого подъезда — раскрывается при оценке',
  'Хранение между датами выезда и заезда — координируется с нашим партнёром по складам',
  'Расширенное страховое покрытие для дорогих предметов (искусство, антиквариат, электроника) — отдельная сумма в смете',
];

const FACTORS = [
  {
    title: 'Расстояние между точкой загрузки и выгрузки',
    body: 'Внутри Miami-Dade или Broward: обычно не влияет на ставку, просто добавляет время в дороге в почасовой счётчик. Между округами или в Palm Beach: может применяться разовая плата за время в пути, она указывается до бронирования.',
  },
  {
    title: 'Размер бригады',
    body: 'Два грузчика ($129/час) — оптимальный вариант для большинства студий и 1-комнатных. Три грузчика ($179/час) заканчивают 2-комнатную примерно на 30% быстрее, поэтому итоговая сумма часто получается похожей. Четыре грузчика ($229/час) — для домов 4+ спальни или жёстких лифтовых окон.',
  },
  {
    title: 'Доступ к зданию',
    body: 'Высотки с одним грузовым лифтом и двухчасовым окном для заезда занимают больше времени, чем малоэтажки с подъездной дорожкой. Мы учитываем это в смете до дня переезда, а не после.',
  },
  {
    title: 'Объём упаковки',
    body: 'Полная упаковка добавляет 2–6 часов в зависимости от размера квартиры по тарифу упаковки ($79/час за 2 упаковщиков, $119/час за 3, $159/час за 4). Частичная упаковка — только кухня и хрупкие вещи — обычно добавляет 2–3 часа.',
  },
  {
    title: 'Специальный инвентарь',
    body: 'Пианино, оружейные сейфы, мраморные обеденные столы и крупногабаритные предметы искусства оцениваются фиксированной надбавкой, а не почасово. Цена указана в вашей письменной смете до бронирования.',
  },
];

const PRICING_FAQS = [
  {
    q: 'Минимум 3 часа взимается, даже если переезд прошёл быстрее?',
    a: 'Да. Минимум покрывает выезд грузовика, топливо, пробег до и от вашего адреса, и гарантированный заработок бригады за слот. Если мы закончили за 2 часа 10 минут, в счёте всё равно 3 часа.',
  },
  {
    q: 'Изменится ли цена в день переезда?',
    a: 'Почасовая ставка не меняется никогда — ни из-за выходного дня, ни из-за того, что работа затянулась. Если появляется что-то, чего нет в смете (гараж, о котором не сказали, лишняя комната, предмет под обрешётку), бригада останавливается, вы получаете новую цифру, и работа продолжается только после вашего «да».',
  },
  {
    q: 'Берёте ли вы депозит?',
    a: 'Нет. Депозита нет ни на локальные, ни на дальние переезды. Отмена или перенос бесплатны, если больше чем за 48 часов до переезда.',
  },
  {
    q: 'Как вы считаете — поминутно, по четверти часа или по часу?',
    a: 'Шагами по 15 минут после того, как минимум 3 часа закрыт. Мы не округляем вверх до следующего часа.',
  },
  {
    q: 'Есть ли доплата за топливо, лестницы или тяжёлые предметы?',
    a: 'Нет. Нет платы за лестницы, за тяжёлые предметы, за лифт и за длинный пронос. На почасовой работе это время, а не сборы, поэтому мы закладываем их в часы в смете. Расскажите про лестницы, длинный пронос и правила грузового лифта заранее — и смета будет точной. Если выяснится в день переезда, вырастут часы, но ставка и структура сборов не меняются никогда.'
  },
  {
    q: 'Какие способы оплаты вы принимаете?',
    a: 'Карта (Visa, MasterCard, Amex, Discover), Zelle, Apple Pay и наличные. Карта без комиссии.',
  },
  {
    q: 'Можно ли отменить или перенести?',
    a: 'Бесплатная отмена или перенос более чем за 48 часов до переезда. Внутри 48 часов мы просим частичный сбор за перенос только если не можем заполнить слот другим клиентом.',
  },
  {
    q: 'Сколько стоит дальний переезд?',
    a: 'Дальний переезд — фиксированная сумма за весь груз, а не почасово. Начинается от $1,500 и зависит от миль, веса и сложности. Письменная смета приходит в течение 24 часов после получения инвентаря.',
  },
  {
    q: 'Берёте ли вы дополнительно за переезд в выходные?',
    a: 'Нет. Ставка одинаковая все семь дней в неделю — она не растёт из-за субботы или воскресенья. Но выходные разбирают первыми, поэтому бронируйте их раньше.',
  },
  {
    q: 'Есть ли сезонная надбавка?',
    a: 'Нет. Ставка одинаковая круглый год. Сезон снежных птиц (примерно с ноября по апрель) — самый загруженный, поэтому чем раньше вы напишете, тем шире выбор дат и времени для лифта в вашем здании.',
  },
  {
    q: 'Входят ли чаевые в цену?',
    a: 'Нет. Чаевые — на ваше усмотрение. Бригады обычно получают 15–20% за стандартный переезд, больше за сложные условия (сильный дождь, 5-й этаж без лифта, много хрупких вещей).',
  },
];

const breadcrumbJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/ru` },
    { '@type': 'ListItem', position: 2, name: 'Цены', item: `${siteUrl}/ru/pricing` },
  ],
});

const faqJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'ru-RU',
  mainEntity: PRICING_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const offerJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}/ru/pricing#service`,
  name: 'Локальный переезд — Южная Флорида',
  serviceType: 'Local Moving',
  inLanguage: 'ru-RU',
  provider: { '@type': 'MovingCompany', name: 'Easy Move Florida', telephone: '+17863051844', url: siteUrl },
  areaServed: { '@type': 'AdministrativeArea', name: 'Южная Флорида (округа Miami-Dade, Broward, Palm Beach)' },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: HOURLY_RATE[2],
    highPrice: HOURLY_RATE[4],
    offerCount: 3,
    priceSpecification: [
      {
        '@type': 'UnitPriceSpecification',
        price: HOURLY_RATE[2],
        priceCurrency: 'USD',
        unitText: 'HUR',
        name: '2 грузчика + грузовик',
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
      },
      {
        '@type': 'UnitPriceSpecification',
        price: HOURLY_RATE[3],
        priceCurrency: 'USD',
        unitText: 'HUR',
        name: '3 грузчика + грузовик',
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
      },
      {
        '@type': 'UnitPriceSpecification',
        price: HOURLY_RATE[4],
        priceCurrency: 'USD',
        unitText: 'HUR',
        name: '4 грузчика + грузовик',
        eligibleQuantity: { '@type': 'QuantitativeValue', minValue: MIN_HOURS, unitText: 'HUR' },
      },
    ],
  },
});

export default function PricingRuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: offerJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        <section className="relative bg-charcoal py-20 md:py-28 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Цены</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              Сколько стоит переезд в <span className="gold-text">Южной Флориде</span>?
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Почасовые ставки фиксируются до старта. Если работа идёт дольше расчёта — та же ставка. Без надбавок за топливо, без оплаты за лестницы, без сюрпризов в день переезда.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/quote">
                <Button size="lg" variant="primary">Получить смету</Button>
              </Link>
              <a href="tel:7863051844">
                <Button size="lg" variant="ghost" className="inline-flex items-center gap-2 text-white border-white/20">
                  <Phone size={15} /> 786-305-1844
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-max">
            <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
              <div className="w-8 h-px bg-gold mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
                Основные ставки
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Это публичные ставки на любой локальный переезд в Южной Флориде. Дальние и специальные переезды оцениваются отдельно — смотрите ниже.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
              <div className="border border-gray-200 bg-white p-7">
                <p className="text-charcoal text-xs font-semibold tracking-[0.2em] uppercase mb-4">2 грузчика + грузовик</p>
                <div className="mb-2">
                  <span className="text-gray-400 text-sm align-top mr-1">от</span>
                  <span className="font-display text-5xl font-bold text-charcoal">${HOURLY_RATE[2]}</span>
                  <span className="text-gray-400 text-sm ml-1">/час</span>
                </div>
                <p className="text-gold text-xs font-semibold mb-4">минимум {MIN_HOURS} часа</p>
                <p className="text-gray-500 text-sm leading-relaxed">Подходит для студий и 1-комнатных квартир. Грузовик, пледы, плёнка, базовая разборка — включено.</p>
              </div>
              <div className="relative border border-gold bg-cream p-7">
                <div className="absolute -top-3 left-7 bg-gold px-3 py-1 text-[10px] font-bold text-white uppercase tracking-[0.15em]">Самый частый</div>
                <p className="text-charcoal text-xs font-semibold tracking-[0.2em] uppercase mb-4">3 грузчика + грузовик</p>
                <div className="mb-2">
                  <span className="text-gray-400 text-sm align-top mr-1">от</span>
                  <span className="font-display text-5xl font-bold text-charcoal">${HOURLY_RATE[3]}</span>
                  <span className="text-gray-400 text-sm ml-1">/час</span>
                </div>
                <p className="text-gold text-xs font-semibold mb-4">минимум {MIN_HOURS} часа</p>
                <p className="text-gray-500 text-sm leading-relaxed">Для 2+ комнат, домов без лифта, большого инвентаря. Итог часто такой же, как с 2 грузчиками — за счёт скорости.</p>
              </div>
              <div className="border border-gray-200 bg-white p-7">
                <p className="text-charcoal text-xs font-semibold tracking-[0.2em] uppercase mb-4">Дальние переезды</p>
                <div className="mb-2">
                  <span className="font-display text-3xl font-bold text-charcoal">От $1,500</span>
                </div>
                <p className="text-gold text-xs font-semibold mb-4">Фиксированная сумма</p>
                <p className="text-gray-500 text-sm leading-relaxed">Выделенный грузовик, без объединённых грузов. Письменная смета в течение 24 часов после получения инвентаря.</p>
              </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-6">
              Трак — $129 фиксированно за день, отдельной строкой в каждой смете. Топливо, платные дороги и пробег уже внутри этих $129. Ставка одинаковая семь дней в неделю, круглый год. Цены проверены 30 июля 2026.
            </p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-max max-w-5xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Реальные суммы</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-3">
                Сколько вы действительно платите по размеру квартиры
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-2xl">
                Диапазоны ниже отражают нижнюю и верхнюю границу нормального переезда — лёгкий доступ, стандартный инвентарь, без специальных предметов. Пришлите фото в WhatsApp для точной сметы.
              </p>
            </div>

            <div className="bg-white border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-charcoal text-white text-xs font-semibold tracking-[0.2em] uppercase px-6 py-4">
                <div className="col-span-3">Размер</div>
                <div className="col-span-2">Время</div>
                <div className="col-span-2">Бригада</div>
                <div className="col-span-2">Итого</div>
                <div className="col-span-3">Что входит</div>
              </div>
              {APARTMENT_TOTALS.map((row) => (
                <div
                  key={row.size}
                  className="grid grid-cols-1 md:grid-cols-12 px-6 py-5 border-b border-gray-100 last:border-b-0 gap-y-1 md:gap-y-0"
                >
                  <div className="md:col-span-3 font-semibold text-charcoal text-sm md:text-base">{row.size}</div>
                  <div className="md:col-span-2 text-gray-600 text-sm flex items-center gap-1.5">
                    <Clock size={13} className="text-gold shrink-0 md:hidden" />
                    <span>{row.hours}</span>
                  </div>
                  <div className="md:col-span-2 text-gray-600 text-sm">{row.crew}</div>
                  <div className="md:col-span-2 text-gold font-bold text-sm md:text-base">{row.range}</div>
                  <div className="md:col-span-3 text-gray-500 text-xs leading-relaxed">{row.details}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 text-xs text-gray-500 max-w-3xl">
              <AlertCircle size={14} className="text-gold shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Это реальные диапазоны с переездов в Южной Флориде, а не интернет-средние. Здания со строгим окном лифта, 4-й этаж без лифта или тяжёлые специальные предметы поднимут вас к верхней границе. Всё это раскрывается в вашей письменной смете до бронирования.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-max max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Входит в почасовую ставку</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">
                  Всё необходимое — без допродаж
                </h2>
                <ul className="space-y-3">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3 text-charcoal text-sm leading-relaxed">
                      <CheckCircle size={16} className="text-gold shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-charcoal/60 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Оценивается отдельно</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">
                  Что вы увидите заранее, а не в день переезда
                </h2>
                <ul className="space-y-3">
                  {NOT_INCLUDED.map((item) => (
                    <li key={item} className="flex gap-3 text-charcoal text-sm leading-relaxed">
                      <X size={16} className="text-charcoal/40 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-max max-w-4xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Что влияет на цену</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3 leading-tight">
                Пять факторов, на которые мы смотрим при оценке
              </h2>
              <p className="text-gray-500 leading-relaxed max-w-2xl">
                Большинство смет попадает в пределах $50 от финального счёта. Вот короткий список того, что сдвигает цифру вверх или вниз.
              </p>
            </div>
            <div className="space-y-4">
              {FACTORS.map((f, i) => (
                <div key={f.title} className="bg-white border border-gray-100 p-6 flex gap-5">
                  <span className="shrink-0 font-display text-2xl text-gold/40 font-bold leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal text-sm md:text-base mb-2">{f.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-charcoal py-16">
          <div className="container-max max-w-4xl text-center">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Наша гарантия</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
              Сначала письменная смета. Фиксированная ставка. Никаких сюрпризов.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'COI за 24 часа', desc: 'Сертификат уходит в ваше здание в течение 24 часов после бронирования, бесплатно.' },
                { title: 'Та же ставка', desc: 'Если работа идёт дольше расчёта — почасовая ставка не меняется.' },
                { title: 'Бесплатная отмена', desc: 'Более чем за 48 часов — отмена или перенос без оплаты, без вопросов.' },
              ].map((g) => (
                <div key={g.title}>
                  <Shield size={18} className="text-gold mx-auto mb-3" />
                  <p className="text-white font-semibold text-sm mb-1">{g.title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <div className="mb-10">
              <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Частые вопросы</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight">
                Прямые ответы о ценах
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {PRICING_FAQS.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-semibold text-charcoal text-base mb-2">{faq.q}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
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
