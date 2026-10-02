import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageUa } from '@/lib/data/costPages';
import { alternatesFor } from '@/lib/seo/routes';
import { ogCard } from '@/lib/seo/og';

const page = getCostPageUa('ua/moving-cost-hollywood')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Скільки коштує переїзд у Голлівуд? Ціни 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: alternatesFor('moving-cost-hollywood', 'uk'),
  openGraph: {
    type: 'article',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: "Скільки коштує переїзд у Голлівуд? Ціни 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ua/moving-cost-hollywood`,
    images: [ogCard("Ціни на переїзд — Голлівуд, 2026")],
  },
};

export default function MovingCostHollywoodPageUa() {
  return <CostPage page={page} locale="ua" />;
}
