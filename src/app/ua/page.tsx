import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import Button from '@/components/ui/Button';
import { Phone } from 'lucide-react';
import { CITIES_UA } from '@/lib/data/citiesUa';

const siteUrl = 'https://www.easy-move-florida.com';

/**
 * /ua — the Ukrainian landing page.
 *
 * South Florida's Ukrainian community searches in Ukrainian and nobody serves
 * those queries. Roughly a third of the crew speaks Ukrainian, so a
 * Ukrainian-speaking crew can be assigned when a customer asks at booking;
 * coordination — estimate, scheduling, correspondence — runs in Russian or
 * English. Pages state that split rather than promising either extreme.
 */

export const metadata: Metadata = {
  title: { absolute: `Переїзди в Південній Флориді — сайт українською | Easy Move Florida` },
  description: `Easy Move Florida — переїзди в Маямі, Голлівуді, Санні-Айлс: вантажники від $129/год, без депозиту, кошторис за 24 години. Сайт українською. 786-305-1844.`,
  alternates: {
    canonical: `${siteUrl}/ua`,
    languages: {
      en: siteUrl,
      ru: `${siteUrl}/ru`,
      uk: `${siteUrl}/ua`,
      'x-default': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: `Переїзди в Південній Флориді — сайт українською | Easy Move Florida`,
    description: `Easy Move Florida — переїзди в Маямі, Голлівуді, Санні-Айлс: вантажники від $129/год, без депозиту, кошторис за 24 години. Сайт українською. 786-305-1844.`,
    url: `${siteUrl}/ua`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: 'Easy Move Florida — переїзди в Південній Флориді' }],
  },
};

const PRICING = [
  {
    "label": "2 вантажники",
    "value": "$129/год"
  },
  {
    "label": "3 вантажники",
    "value": "$179/год"
  },
  {
    "label": "Трак",
    "value": "за день, за ставкою бригади — окремий рядок у кошторисі"
  },
  {
    "label": "Мінімальне замовлення",
    "value": "3 години роботи"
  },
  {
    "label": "Далекі переїзди",
    "value": "від $1,500 — письмовий кошторис за 24 години"
  },
  {
    "label": "Депозит",
    "value": "$0 — безкоштовне скасування за 48+ годин"
  }
];

const FAQS = [
  {
    "q": "Чи можна спілкуватися українською?",
    "a": "Так. Приблизно кожен третій наш вантажник — україномовний, і бригаду, яка спілкуватиметься з вами українською, ми поставимо на ваш переїзд за попереднім запитом: скажіть про це під час бронювання. Координація — кошторис, узгодження дати, листування — іде російською або англійською. Написати нам у WhatsApp українською можна сміливо: вас зрозуміють, а відповідь прийде російською або англійською."
  },
  {
    "q": "Скільки коштує переїзд?",
    "a": "Орієнтири з реальних замовлень: студія — $516–$645, одна спальня — $516–$774, дві спальні — $645–$1,253, три — $1,253–$1,611, чотири й більше — $1,611–$2,327. Мінімальний рахунок разом із траком — $516 за бригаду з двох, $716 за трьох, $876 за чотирьох. Після трьох годин мінімуму час рахується кроками по 15 хвилин."
  },
  {
    "q": "Скільки коштує трак і чи є збір за паливо?",
    "a": "Трак оплачується за день і завжди йде окремим рядком у кошторисі — за ставкою вашої бригади: $129 при двох вантажниках, $179 при трьох, $219 при чотирьох. Фіксованої «ціни трака» без розміру бригади не буває. Паливних зборів, доплат за милі по місту, вихідні чи сезон немає взагалі."
  },
  {
    "q": "Які міста ви обслуговуєте?",
    "a": "Уся Південна Флорида: Голлівуд — наше домашнє місто, поруч Халландейл-Біч, Авентура, Санні-Айлс-Біч, Маямі, Форт-Лодердейл та сусідні міста округів Broward і Miami-Dade. Місцеві переїзди рахуються погодинно, далекі — по Флориді й за її межі — фіксованою сумою від $1,500 із письмовим кошторисом за 24 години."
  },
  {
    "q": "Як забронювати дату переїзду?",
    "a": "Напишіть у WhatsApp або зателефонуйте на 786-305-1844: опишіть житло, поверхи та бажану дату, можна докинути кілька фото. Ми надішлемо письмовий кошторис, і якщо все влаштовує — дата ваша, без жодної передоплати. Якщо будинок вимагає COI, оформимо його безкоштовно протягом 24 годин після бронювання."
  },
  {
    "q": "Чи є доплати за сходи, ліфт або важкі меблі?",
    "a": "Ні. Ми принципово не тримаємо прейскуранта дрібних зборів: сходи, довге перенесення, робота з ліфтом, важкі шафи чи техніка — усе це просто час бригади, який чесно закладений у години письмового кошторису ще до бронювання. Ковдри, плівка та розбирання меблів теж уже входять у погодинну ставку."
  }
];

const faqJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'uk',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export default function UaLandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />
      <Header />
      <main className="pt-20 pb-16 lg:pb-0">
        <section className="relative bg-charcoal py-20 md:py-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-4">Південна Флорида</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              Переїзди в Південній Флориді — сайт українською
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-8">Якщо ви шукали муверів українською — вітаємо, ви їх знайшли. Easy Move Florida — місцева компанія з Голлівуда: наш двір із траками стоїть на Stirling Road, а власник Євгеній Романов особисто відповідає за кожне замовлення. Ми перевозимо квартири, кондо та будинки в Санні-Айлс, Халландейлі, Голлівуді, Авентурі, Маямі та Форт-Лодердейлі — містах, де живе велика українська громада. Про мову одразу: приблизно кожен третій наш вантажник — україномовний, тож бригаду, яка говоритиме з вами українською в день переїзду, ми зберемо — просто скажіть про це під час бронювання. Координація (кошторис, узгодження дати, листування) іде російською або англійською. Пишіть нам українською у WhatsApp на 786-305-1844: повідомлення зрозуміють, відповідь надійде російською чи англійською. Ціни погодинні й публічні, депозиту немає, кошторис — письмовий, доплат за вихідні, сходи чи важкі меблі не існує. Оберіть своє місто нижче або надішліть кілька фото квартири — і ми повернемося з конкретними цифрами.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote">
                <Button size="lg" variant="primary">Безкоштовний кошторис</Button>
              </Link>
              <a href="tel:7863051844">
                <Button size="lg" variant="ghost" className="inline-flex items-center gap-2 text-white border-white/20">
                  <Phone size={15} /> 786-305-1844
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">Ціни</h2>
            <div className="overflow-x-auto border border-gray-200">
              <table className="w-full text-left text-sm">
                <tbody>
                  {PRICING.map((row) => (
                    <tr key={row.label} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-5 py-4 text-charcoal font-semibold">{row.label}</td>
                      <td className="px-5 py-4 text-gold font-bold whitespace-nowrap">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-6 leading-tight">Міста</h2>
            <ul className="flex flex-wrap gap-2">
              {CITIES_UA.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="inline-block text-sm border border-gray-200 text-gray-600 px-4 py-2 hover:border-gold/40 hover:text-charcoal transition-colors duration-150"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-8 leading-tight">Часті питання</h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              {FAQS.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="font-semibold text-charcoal text-base mb-2">{f.q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
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
