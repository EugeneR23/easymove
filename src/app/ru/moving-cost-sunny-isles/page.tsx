import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageRu } from '@/lib/data/costPages';

const page = getCostPageRu('ru/moving-cost-sunny-isles')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Сколько стоит переезд в Санни-Айлс-Бич? Цены 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-cost-sunny-isles`,
    languages: {
      en: `${siteUrl}/moving-cost-sunny-isles`,
      ru: `${siteUrl}/ru/moving-cost-sunny-isles`,
      'x-default': `${siteUrl}/moving-cost-sunny-isles`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Сколько стоит переезд в Санни-Айлс-Бич? Цены 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-cost-sunny-isles`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Цены на переезд — Санни-Айлс-Бич, 2026" }],
  },
};

export default function MovingCostSunnyIslesPageRu() {
  return <CostPage page={page} locale="ru" />;
}
