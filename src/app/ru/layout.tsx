import type { Metadata } from 'next';
import RootShell, { BASE_METADATA } from '@/components/layout/RootShell';
import '../globals.css';
import { alternatesFor } from '@/lib/seo/routes';
import { TWITTER_CARD_URL, ogCard } from '@/lib/seo/og';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: {
    default: 'Переезды Майами',
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
    images: [ogCard('Easy Move Florida — переезды в Южной Флориде')],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Move Florida — Переезды в Южной Флориде',
    description: 'Переезды в Майами. От $129/час плюс трак в день по ставке бригады. Ставка зафиксирована, скрытых сборов нет.',
    images: [TWITTER_CARD_URL],
  },
  alternates: alternatesFor('', 'ru'),
};

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ru">{children}</RootShell>;
}
