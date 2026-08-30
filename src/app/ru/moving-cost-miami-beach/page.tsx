import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageRu } from '@/lib/data/costPages';

const page = getCostPageRu('ru/moving-cost-miami-beach')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Сколько стоит переезд в Майами-Бич? Цены 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-cost-miami-beach`,
    languages: {
      en: `${siteUrl}/moving-cost-miami-beach`,
      ru: `${siteUrl}/ru/moving-cost-miami-beach`,
      'x-default': `${siteUrl}/moving-cost-miami-beach`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Сколько стоит переезд в Майами-Бич? Цены 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-cost-miami-beach`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Цены на переезд — Майами-Бич, 2026" }],
  },
};

export default function MovingCostMiamiBeachPageRu() {
  return <CostPage page={page} locale="ru" />;
}
