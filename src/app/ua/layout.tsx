import type { Metadata } from 'next';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: {
    default: 'Переїзди в Південній Флориді | Easy Move Florida',
    template: '%s | Easy Move Florida',
  },
  description:
    'Переїзди в Південній Флориді — Маямі, Голлівуд, Санні-Айлс, Авентура. Від $129/год за двох вантажників плюс трак за ставкою бригади, мінімум 3 години. COI за 24 години. 786-305-1844.',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    alternateLocale: ['en_US', 'ru_RU'],
    siteName: 'Easy Move Florida',
    url: `${siteUrl}/ua`,
    title: 'Easy Move Florida — переїзди в Південній Флориді',
    description:
      'Переїзди в Маямі, Форт-Лодердейлі та Голлівуді. Ціни відкриті, кошторис письмовий, депозиту немає. Сайт українською.',
    images: [{ url: '/images/Hero.png', width: 1200, height: 630, alt: 'Easy Move Florida — переїзди в Південній Флориді' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Move Florida — переїзди в Південній Флориді',
    description: 'Від $129/год плюс трак за ставкою бригади. Ставка зафіксована, прихованих зборів немає.',
    images: [`${siteUrl}/images/Hero.png`],
  },
  alternates: {
    canonical: `${siteUrl}/ua`,
    languages: {
      'en': siteUrl,
      'ru': `${siteUrl}/ru`,
      'uk': `${siteUrl}/ua`,
      'x-default': siteUrl,
    },
  },
};

export default function UaLayout({ children }: { children: React.ReactNode }) {
  // Same reasoning as the Russian subtree: the root layout owns
  // <html lang="en">, and making it locale-aware would require headers(), which
  // opts every route out of static generation. Element-level lang applies to
  // the whole subtree, so lang="uk" here covers every Ukrainian page.
  return <div lang="uk">{children}</div>;
}
