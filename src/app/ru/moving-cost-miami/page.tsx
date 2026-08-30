import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageRu } from '@/lib/data/costPages';

const page = getCostPageRu('ru/moving-cost-miami')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Сколько стоит переезд в Майами? Цены 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-cost-miami`,
    languages: {
      en: `${siteUrl}/moving-cost-miami`,
      ru: `${siteUrl}/ru/moving-cost-miami`,
      'x-default': `${siteUrl}/moving-cost-miami`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Сколько стоит переезд в Майами? Цены 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-cost-miami`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Цены на переезд — Майами, 2026" }],
  },
};

export default function MovingCostMiamiPageRu() {
  return <CostPage page={page} locale="ru" />;
}
