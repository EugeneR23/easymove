import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageUa } from '@/lib/data/costPages';

const page = getCostPageUa('ua/moving-cost-miami')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Скільки коштує переїзд у Маямі? Ціни 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/moving-cost-miami`,
    languages: {
      en: `${siteUrl}/moving-cost-miami`,
      ru: `${siteUrl}/ru/moving-cost-miami`,
      uk: `${siteUrl}/ua/moving-cost-miami`,
      'x-default': `${siteUrl}/moving-cost-miami`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: "Скільки коштує переїзд у Маямі? Ціни 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ua/moving-cost-miami`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Ціни на переїзд — Маямі, 2026" }],
  },
};

export default function MovingCostMiamiPageUa() {
  return <CostPage page={page} locale="ua" />;
}
