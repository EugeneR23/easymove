import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageRu } from '@/lib/data/costPages';

const page = getCostPageRu('ru/moving-cost-hallandale-beach')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Сколько стоит переезд в Халландейл-Бич? Цены 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-cost-hallandale-beach`,
    languages: {
      en: `${siteUrl}/moving-cost-hallandale-beach`,
      ru: `${siteUrl}/ru/moving-cost-hallandale-beach`,
      'x-default': `${siteUrl}/moving-cost-hallandale-beach`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Сколько стоит переезд в Халландейл-Бич? Цены 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-cost-hallandale-beach`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Цены на переезд — Халландейл-Бич, 2026" }],
  },
};

export default function MovingCostHallandaleBeachPageRu() {
  return <CostPage page={page} locale="ru" />;
}
