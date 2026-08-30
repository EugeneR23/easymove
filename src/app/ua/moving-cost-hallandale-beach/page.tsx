import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageUa } from '@/lib/data/costPages';

const page = getCostPageUa('ua/moving-cost-hallandale-beach')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Скільки коштує переїзд у Халландейл-Біч? Ціни 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/moving-cost-hallandale-beach`,
    languages: {
      en: `${siteUrl}/moving-cost-hallandale-beach`,
      ru: `${siteUrl}/ru/moving-cost-hallandale-beach`,
      uk: `${siteUrl}/ua/moving-cost-hallandale-beach`,
      'x-default': `${siteUrl}/moving-cost-hallandale-beach`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: "Скільки коштує переїзд у Халландейл-Біч? Ціни 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ua/moving-cost-hallandale-beach`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Ціни на переїзд — Халландейл-Біч, 2026" }],
  },
};

export default function MovingCostHallandaleBeachPageUa() {
  return <CostPage page={page} locale="ua" />;
}
