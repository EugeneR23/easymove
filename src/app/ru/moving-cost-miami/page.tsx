import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageRu } from '@/lib/data/costPages';
import { alternatesFor } from '@/lib/seo/routes';

const page = getCostPageRu('ru/moving-cost-miami')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Сколько стоит переезд в Майами? Цены 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: alternatesFor('moving-cost-miami', 'ru'),
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
