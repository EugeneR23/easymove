import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageRu } from '@/lib/data/costPages';

const page = getCostPageRu('ru/moving-cost-fort-lauderdale')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Сколько стоит переезд в Форт-Лодердейл? Цены 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-cost-fort-lauderdale`,
    languages: {
      en: `${siteUrl}/moving-cost-fort-lauderdale`,
      ru: `${siteUrl}/ru/moving-cost-fort-lauderdale`,
      'x-default': `${siteUrl}/moving-cost-fort-lauderdale`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Сколько стоит переезд в Форт-Лодердейл? Цены 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-cost-fort-lauderdale`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Цены на переезд — Форт-Лодердейл, 2026" }],
  },
};

export default function MovingCostFortLauderdalePageRu() {
  return <CostPage page={page} locale="ru" />;
}
