import type { Metadata } from 'next';
import RootShell, { BASE_METADATA } from '@/components/layout/RootShell';
import '../globals.css';
import { alternatesFor } from '@/lib/seo/routes';
import { TWITTER_CARD_URL, ogCard } from '@/lib/seo/og';

const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  ...BASE_METADATA,
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
    images: [ogCard('Easy Move Florida — переїзди в Південній Флориді')],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Move Florida — переїзди в Південній Флориді',
    description: 'Від $129/год плюс трак за ставкою бригади. Ставка зафіксована, прихованих зборів немає.',
    images: [TWITTER_CARD_URL],
  },
  alternates: alternatesFor('', 'uk'),
};

export default function UaLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="uk">{children}</RootShell>;
}
