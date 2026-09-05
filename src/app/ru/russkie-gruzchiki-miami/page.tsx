import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone, MessageCircle } from 'lucide-react';
import { CITIES_RU } from '@/lib/data/citiesRu';

const siteUrl = 'https://www.easy-move-florida.com';

/**
 * /ru/russkie-gruzchiki-miami — русская пара к /russian-speaking-movers-miami.
 *
 * Английская страница стоит первой по «russian speaking movers miami»
 * (проверено живой выдачей 2026-09-05). По русскому запросу «русские грузчики
 * майами» выдачу держат каталоги объявлений — ни у одного мувера нет
 * посвящённой страницы на русском. Эта страница — та самая: не перевод
 * английской, а её зеркало, написанное для человека, который ищет по-русски.
 */

const TITLE = 'Русские грузчики в Майами и Южной Флориде | Easy Move Florida';
const DESCRIPTION =
  'Русские грузчики в Майами, Санни-Айлс, Авентуре, Халландейле и Холливуде. Владелец на связи, от $129/час, COI за 24 часа бесплатно. Звоните: 786-305-1844.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteUrl}/ru/russkie-gruzchiki-miami`,
    languages: {
      en: `${siteUrl}/russian-speaking-movers-miami`,
      ru: `${siteUrl}/ru/russkie-gruzchiki-miami`,
      'x-default': `${siteUrl}/russian-speaking-movers-miami`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    siteName: 'Easy Move Florida',
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteUrl}/ru/russkie-gruzchiki-miami`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Русские грузчики в Майами и Южной Флориде' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${siteUrl}/images/Hero.png`],
  },
};

const SECTIONS = [
  {
    title: 'Весь переезд может пройти по-русски',
    body: 'Многие компании пишут в объявлениях «русскоязычные грузчики», а трубку берёт колл-центр. У нас язык — это просто то, как устроена компания. Владелец Евгений Романов говорит по-русски, координатор, который принимает звонок и считает смету, работает по-русски, и большинство грузчиков в день переезда говорят по-русски. Родители могут сами объяснить, в каких коробках хрупкое, и услышать ответ на своём языке — без вас в роли переводчика. Первый звонок, осмотр, письменная смета, договор и финальный счёт — всё возможно по-русски, по-английски или вперемешку, как удобно семье.',
  },
  {
    title: 'Где мы работаем каждый день',
    body: 'База — Холливуд, Флорида; обслуживаем округа Miami-Dade, Broward и Palm Beach. Больше всего заказов там, где живёт русскоязычная община Южной Флориды: Санни-Айлс-Бич, Авентура, Халландейл-Бич, Холливуд и сам Майами. Башни вдоль Collins Avenue — от Winston Towers до Trump Towers, Porsche Design и Jade — наша обычная территория: бронирование грузового лифта и страховые бумаги для этих зданий у нас отработаны до рутины. Однокомнатная на два этажа выше в той же башне или дом из Авентуры в Бока-Ратон — для наших бригад это будни, а не особый заказ.',
  },
  {
    title: 'Цены без тумана',
    body: 'Ставка зависит от бригады: $129 в час за двух грузчиков, $179 за трёх, $219 за четырёх, минимум три часа на любой заказ. Трак считается один раз в день по ставке вашей бригады — $129, $179 или $219, — поэтому минимальный счёт с бригадой из двух — $516. Надбавок за выходные, топливо и лестницы нет. Типичные суммы: студия — $516–$645, однокомнатная — $516–$774, двухкомнатная — $645–$1,253, трёхкомнатная — $1,253–$1,611. Упаковка — от $79 в час, хранение — от $200 в месяц.',
  },
  {
    title: 'Бумаги для высоток — на нас',
    body: 'Если зданию нужен сертификат страхования (COI), мы выпускаем его бесплатно в течение 24 часов. Большинство башен Южной Флориды просят покрытие в диапазоне $1–2 млн: перешлите нам лист требований от менеджмента, и мы сверим сертификат с ним до дня переезда. Там, где грузовой лифт бронируется по записи, поможем занять окно и подстроим старт бригады под него. В закрытых посёлках заранее внесём бригаду и трак в список на въезд, чтобы день не начинался с разборок на КПП. Вы пересылаете одно письмо из вашего здания — остальное делаем мы.',
  },
  {
    title: 'Снегоптицы и сезонные переезды',
    body: 'Сезонные заезды и выезды — большая часть нашего календаря: квартиры, закрытые на лето, дома, открытые к сезону, вещи на склад и обратно. Мы делаем флоридскую часть этой работы: локальный переезд, упаковку, рейс на склад. Межштатное плечо мы не возим — на него нужно федеральное разрешение, которого у нас нет, — но подскажем лицензированного перевозчика и возьмём на себя всё, когда ваш груз здесь.',
  },
];

const FAQS = [
  {
    q: 'Грузчики правда говорят по-русски?',
    a: 'Да. Владелец Евгений Романов русскоязычный, координатор ведёт заказ по-русски, большинство грузчиков говорят по-русски. Это не строчка для отзывов — компания каждый день работает на двух языках. Весь переезд, от первого звонка до финального обхода, может пройти по-русски; если кому-то в семье удобнее английский, бригада переключается без проблем.',
  },
  {
    q: 'Смету и договор можно получить на русском?',
    a: 'Да. Координатор пройдёт по вещам, объяснит цены и подготовит письменную смету по-русски, а перед подписанием разберёт каждую строку договора. Ничего не подписывается, пока не понято. Если переезд организует англоязычный родственник — тот же разговор проведём с ним по-английски, и обе стороны увидят одни и те же цифры.',
  },
  {
    q: 'Сколько стоят русские грузчики в Майами?',
    a: 'Ставка по бригаде: $129 в час за двоих, $179 за троих, $219 за четверых, минимум три часа. Трак — один раз в день по ставке бригады, отдельной строкой в смете. Надбавок за выходные, топливо и лестницы нет. Студия обычно выходит $516–$645, однокомнатная — $516–$774, двухкомнатная — $645–$1,253.',
  },
  {
    q: 'Какие города вы обслуживаете?',
    a: 'База в Холливуде; работаем по всем округам Miami-Dade, Broward и Palm Beach. Ежедневная география — Майами, Санни-Айлс-Бич, Авентура, Халландейл-Бич и Холливуд, включая башни вдоль Collins Avenue. Мы локальная компания: переезды в другие штаты не возим — подскажем лицензированного перевозчика, а упаковку и флоридскую часть сделаем сами.',
  },
  {
    q: 'Сделаете COI для моего здания?',
    a: 'Да, бесплатно и в течение 24 часов. Перешлите лист требований от менеджмента — отправим сертификат напрямую в здание, с правильными формулировками, до дня переезда. Если нужен грузовой лифт по записи, поможем забронировать окно, чтобы бригада начала вовремя, а не ждала в лобби.',
  },
  {
    q: 'Можно заказать переезд для русскоязычных родителей?',
    a: 'Да, это частый случай. Вы бронируете по-английски откуда угодно; в день переезда бригада работает с родителями напрямую по-русски. Координатор держит вас в курсе по телефону или смс, говоря с родителями на их языке, — никому не приходится переводить, и ничего не теряется между двумя разговорами.',
  },
  {
    q: 'Нужен ли депозит, и что если планы изменятся?',
    a: 'Депозит для брони не нужен, отмена бесплатна при предупреждении более чем за 48 часов — это важно, когда сдвигается дата закрытия сделки или одобрение кондо тянется дольше обещанного. Письменная смета — это то, по чему бригада работает в день переезда, без внезапных доплат. Позвоните на 786-305-1844, и координатор придержит вашу дату.',
  },
];

const breadcrumbJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/ru` },
    { '@type': 'ListItem', position: 2, name: 'Русские грузчики в Майами', item: `${siteUrl}/ru/russkie-gruzchiki-miami` },
  ],
});

const faqJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export default function RusskieGruzchikiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        <section className="relative bg-charcoal py-20 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">По-русски и по-английски · Южная Флорида</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Русские грузчики в Майами и Южной Флориде
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">Easy Move Florida — русскоязычная мувинговая компания из Холливуда, Флорида. Ей управляет владелец Евгений Романов, работаем по округам Miami-Dade, Broward и Palm Beach. Координатор и большинство грузчиков говорят по-русски, поэтому весь переезд может пройти на русском — от первого звонка до финального обхода, — или на английском, или на обоих. Ставки от $129 в час за двух грузчиков, трак считается один раз в день по ставке бригады, минимум три часа. Надбавок за выходные, топливо и лестницы нет, а если зданию нужен сертификат страхования — выпустим его бесплатно за 24 часа.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button size="lg" variant="primary">Получить письменную смету</Button>
              </Link>
              <a href="tel:7863051844">
                <Button size="lg" variant="ghost" className="inline-flex items-center gap-2 text-white border-white/20">
                  <Phone size={15} /> 786-305-1844
                </Button>
              </a>
            </div>
          </div>
        </section>

        {SECTIONS.map((s, i) => (
          <section key={s.title} className={i % 2 === 0 ? 'section-padding bg-white' : 'section-padding bg-cream'}>
            <div className="container-max max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-tight">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          </section>
        ))}

        {/* Страницы городов на русском */}
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-tight">
              Ваш город — отдельной страницей
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">У каждого города Южной Флориды, где мы работаем, есть своя русская страница: здания, правила лифтов, местные особенности и вопросы, которые задают именно там.</p>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link href="/russian-speaking-movers-miami" className="inline-block text-sm border border-gold/40 text-charcoal px-4 py-2 hover:bg-gold/5 transition-colors duration-150">
                  This page in English
                </Link>
              </li>
              {CITIES_RU.slice(0, 10).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="inline-block text-sm border border-gray-200 text-gray-600 px-4 py-2 hover:border-gold/40 hover:text-charcoal transition-colors duration-150">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">
              Вопросы о русскоязычном сервисе
            </h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {FAQS.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-semibold text-charcoal text-base mb-2">{f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-8 flex items-center gap-2">
              <MessageCircle size={15} className="text-gold shrink-0" />
              Пишите по-русски в WhatsApp — 786-305-1844 — отвечает сам владелец.
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
