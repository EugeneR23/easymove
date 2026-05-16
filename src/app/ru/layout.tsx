import type { Metadata } from 'next';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: {
    default: 'Переезды Майами | Easy Move Florida',
    template: '%s | Easy Move Florida',
  },
  description:
    'Переезды в Южной Флориде — Майами, Холливуд, Sunny Isles, Aventura. От $129/час, минимум 3 часа. Полная страховка, COI за 24 часа. 786-305-1844.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    siteName: 'EasyMove Elite',
    url: `${siteUrl}/ru`,
    title: 'EasyMove Elite — Переезды в Южной Флориде',
    description:
      'Профессиональные переезды в Майами, Форт-Лодердейл и Бока-Ратон. Основатель лично контролирует каждый переезд. Прозрачные цены.',
    images: [{ url: '/images/Hero.png', width: 1200, height: 630, alt: 'EasyMove Elite — переезды в Южной Флориде' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMove Elite — Переезды в Южной Флориде',
    description: 'Профессиональные переезды в Майами. Полная страховка, прозрачные цены, без скрытых платежей.',
    images: [`${siteUrl}/images/Hero.png`],
  },
  alternates: {
    canonical: `${siteUrl}/ru`,
    languages: {
      'en': siteUrl,
      'ru': `${siteUrl}/ru`,
      'x-default': siteUrl,
    },
  },
};

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
