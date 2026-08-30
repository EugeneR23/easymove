import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageRu } from '@/lib/data/costPages';

const page = getCostPageRu('ru/moving-cost-hollywood')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Сколько стоит переезд в Голливуд? Цены 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-cost-hollywood`,
    languages: {
      en: `${siteUrl}/moving-cost-hollywood`,
      ru: `${siteUrl}/ru/moving-cost-hollywood`,
      'x-default': `${siteUrl}/moving-cost-hollywood`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Сколько стоит переезд в Голливуд? Цены 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-cost-hollywood`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Цены на переезд — Голливуд, 2026" }],
  },
};

export default function MovingCostHollywoodPageRu() {
  return <CostPage page={page} locale="ru" />;
}
