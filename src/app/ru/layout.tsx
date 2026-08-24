import type { Metadata } from 'next';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: {
    default: 'Переезды Майами | Easy Move Florida',
    template: '%s | Easy Move Florida',
  },
  description:
    'Переезды в Южной Флориде — Майами, Холливуд, Sunny Isles, Aventura. От $129/час за 2 грузчиков плюс трак в день по ставке бригады, минимум 3 часа. COI за 24 часа. 786-305-1844.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    siteName: 'Easy Move Florida',
    url: `${siteUrl}/ru`,
    title: 'Easy Move Florida — Переезды в Южной Флориде',
    description:
      'Переезды в Майами, Форт-Лодердейл и Бока-Ратон. Владелец лично на связи, русский и английский. Ставка фиксируется до начала работ.',
    images: [{ url: '/images/Hero.png', width: 1200, height: 630, alt: 'Easy Move Florida — переезды в Южной Флориде' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Move Florida — Переезды в Южной Флориде',
    description: 'Переезды в Майами. От $129/час плюс трак в день по ставке бригады. Ставка зафиксирована, скрытых сборов нет.',
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
  // The root layout owns <html lang="en"> and making it locale-aware would
  // require headers(), which opts every route out of static generation. Marking
  // the Russian subtree with lang="ru" is the standards-correct alternative:
  // element-level lang applies to the whole subtree.
  return <div lang="ru">{children}</div>;
}
