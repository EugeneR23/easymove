import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { Award, Users, Shield, MapPin, Phone } from 'lucide-react';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: 'О компании | Easy Move Florida' },
  description:
    'Easy Move Florida — мувинговая компания с личным участием владельца в Южной Флориде. Майами, Форт-Лодердейл, Бока-Ратон. Основатель Евгений Романов. Говорим по-русски.',
  alternates: {
    canonical: `${siteUrl}/ru/about`,
    languages: {
      'en': `${siteUrl}/about`,
      'ru': `${siteUrl}/ru/about`,
      'x-default': `${siteUrl}/about`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: 'О нас — Easy Move Florida | Переезды в Майами',
    description: 'Основатель сам отвечает на ваш звонок. Бригада знает ваше здание до приезда. Сертификат страхования за 24 часа.',
    url: `${siteUrl}/ru/about`,
  },
};

const VALUES = [
  {
    icon: Award,
    title: 'Качество',
    body: 'Каждая упаковка, каждый перенос, каждое размещение — это отражение нас. Мы держим стандарт, о котором клиент не должен напоминать.',
  },
  {
    icon: Shield,
    title: 'Ответственность',
    body: 'В счёте только те строки, что были в смете. Ни топливного сбора, ни платы за лестницы, лифт или длинный пронос. Ничего не начисляется, пока вы это не одобрили.',
  },
  {
    icon: Users,
    title: 'Конфиденциальность',
    body: 'Среди наших клиентов — руководители, спортсмены, коллекционеры и семьи, которым важна приватность. Работаем с соответствующей деликатностью.',
  },
  {
    icon: MapPin,
    title: 'Локальная экспертиза',
    body: 'Мы знаем Южную Флориду — её здания, требования HOA, трафик и жару. Эта локальная глубина превращается в плавный переезд.',
  },
];

const HOW_WE_WORK = [
  { title: 'Без субподрядчиков', body: 'Каждый переезд выполняет наша собственная обученная бригада — а не сторонние ребята, нанятые на день через приложение.' },
  { title: 'Прямая ответственность', body: 'Евгений — это человек, которому вы звоните, если что-то требует внимания. Не служба поддержки. Не диспетчер.' },
  { title: 'Контроль качества на каждой работе', body: 'Один и тот же стандарт независимо от того, переезжаете ли вы из студии или из загородного дома.' },
  { title: 'Бригада подготовлена до приезда', body: 'Доступ в здание, окна лифта, требования к страховке — всё подтверждено до того, как бригада появится на месте.' },
];

export default function RuAboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-72 md:h-[420px] flex items-center justify-center overflow-hidden bg-charcoal">
          <Image
            src="/images/Real/8.jpg"
            alt="Бригада Easy Move Florida во время переезда в Южной Флориде"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/75 to-charcoal/95" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative z-10 text-center px-4">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Наша история</p>
            <h1 className="font-display text-3xl md:text-6xl font-bold text-white">О Easy Move Florida</h1>
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              Основатель лично контролирует. Бригада обучена. Создано для Южной Флориды.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-white">
          <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">От основателя</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-6 leading-tight">
                Создано в Южной Флориде.<br />Управляется человеком, которому вы звоните.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Я основал Easy Move Florida потому, что не мог найти мувинговую компанию, которой бы доверил свои собственные вещи.
                Слишком много бригад, отправленных диспетчером, который никогда не был в здании. Слишком много смет, которые
                раздувались в день переезда. Слишком мало ответственности, когда что-то шло не так.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Поэтому я построил компанию, которой мне самому не хватало. Где человек на телефоне — это тот же человек,
                кто отвечает за ваш переезд. Где бригада приезжает зная здание, расписание и что именно требует защиты.
                Где сертификат страхования (COI) — это не запоздалая мысль, а готовый документ ещё до того, как вы его попросили.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Мы работаем с домовладельцами, арендаторами, коллекционерами и малым бизнесом по всему Майами-Дейд, Броварду
                и Палм-Бич. Какие-то переезды простые, какие-то нет. Уровень внимания одинаков для обоих.
              </p>
              <p className="text-gold text-sm font-semibold mt-6">— Евгений Романов, основатель</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Лидер компании', 'Лично на каждом сложном переезде', 'Прямая линия: 786-305-1844', 'Говорим по-русски'].map((tag) => (
                  <span key={tag} className="text-[11px] border border-gold/25 text-gold/75 px-3 py-1 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="relative w-full h-56 sm:h-80 lg:h-[420px] overflow-hidden">
                <Image
                  src="/images/about.png"
                  alt="Easy Move Florida — премиум-бригада переездов в Южной Флориде"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center sm:object-top"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Что нами движет</p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal">Наши обязательства</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-cream p-6 sm:p-8 h-full">
                    <div className="w-10 h-10 flex items-center justify-center mb-5">
                      <Icon className="text-gold" size={22} />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-charcoal mb-3">{v.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{v.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder + How we work */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start bg-cream border border-gray-100 p-6 sm:p-8 mb-12">
                <div className="shrink-0">
                  <div className="relative w-48 h-48 overflow-hidden bg-gray-200">
                    <Image
                      src="/images/founder-2.png"
                      alt="Евгений Романов, основатель Easy Move Florida"
                      fill
                      sizes="192px"
                      className="object-cover object-[center_20%]"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-xs text-gray-400">Южная Флорида</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-charcoal text-xl">Евгений Романов</h3>
                  <p className="text-gold text-xs uppercase tracking-widest mt-1 mb-4">Основатель и владелец</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Евгений построил Easy Move Florida с нуля после многих лет, наблюдая, как клиентов разочаровывают крупные
                    обезличенные мувинговые компании. Его стандарт: вы говорите напрямую с владельцем, бригада знает здание
                    до приезда, и каждая вещь обрабатывается так, как если бы принадлежала семье. Он лично присутствует на
                    каждом дорогом и сложном переезде.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-5">
                    {['Владелец и диспетчер', 'Русский и английский', 'WhatsApp: 786-305-1844'].map((badge) => (
                      <span key={badge} className="text-xs border border-gray-200 px-3 py-1 text-gray-500">{badge}</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Как мы работаем</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3 leading-tight">
                Ваш переезд под личным контролем
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Когда вы бронируете у Easy Move Florida, вы не работаете с диспетчером или колл-центром. Евгений лично
                принимает ваш звонок, координирует бригаду и остаётся на связи на протяжении всего переезда. Без субподрядчиков.
                Без посторонних людей, отправленных через приложение.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100">
                {HOW_WE_WORK.map((item) => (
                  <div key={item.title} className="bg-white p-5 sm:p-6">
                    <p className="font-semibold text-charcoal text-sm mb-2">{item.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-charcoal py-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
          <div className="absolute bottom-0 left-0 right-0 h-px gold-separator" />
          <div className="absolute inset-0 grain-overlay" />
          <div className="relative container-max">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-center">
              {[
                { label: '5.0 · 32 отзыва', sub: 'Проверено на Thumbtack' },
                { label: 'COI по запросу', sub: 'Готов в течение 24 часов' },
                { label: 'Опыт работы с высотками', sub: 'Кондо, лифты, погрузочные доки' },
                { label: 'Лидер компании на месте', sub: 'Евгений участвует в каждом переезде' },
              ].map((c) => (
                <div key={c.label} className="max-w-[180px]">
                  <p className="text-white text-sm font-semibold mb-1">{c.label}</p>
                  <p className="text-gray-500 text-xs leading-snug">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream py-16">
          <div className="container-max text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Готовы получить смету?
            </h2>
            <p className="text-gray-500 mb-8">Звоните или отправьте запрос — отвечаем в течение нескольких часов.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/ru#calculator"
                className="inline-flex items-center justify-center gap-2 bg-gold text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-gold/90 transition-colors"
              >
                Бесплатный расчёт
              </Link>
              <a
                href="tel:+17863051844"
                className="inline-flex items-center justify-center gap-2 border border-charcoal/20 text-charcoal font-bold px-8 py-4 text-sm uppercase tracking-wider hover:border-gold hover:text-gold transition-colors"
              >
                <Phone size={15} /> 786-305-1844
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
