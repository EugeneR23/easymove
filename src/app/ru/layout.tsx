import type { Metadata } from 'next';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: {
    default: 'EasyMove Elite — Переезды в Майами, Форт-Лодердейл и Бока-Ратон',
    template: '%s | EasyMove Elite',
  },
  description:
    'Премиальная мувинговая компания в Южной Флориде. Переезды квартир, домов, офисов, дальние перевозки. Полная страховка, без скрытых платежей. Звоните: 786-305-1844.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
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
  },
  alternates: {
    canonical: `${siteUrl}/ru`,
    languages: {
      'en': siteUrl,
      'ru': `${siteUrl}/ru`,
    },
  },
};

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
