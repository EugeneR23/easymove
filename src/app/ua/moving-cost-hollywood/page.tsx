import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageUa } from '@/lib/data/costPages';

const page = getCostPageUa('ua/moving-cost-hollywood')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Скільки коштує переїзд у Голлівуд? Ціни 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/moving-cost-hollywood`,
    languages: {
      en: `${siteUrl}/moving-cost-hollywood`,
      ru: `${siteUrl}/ru/moving-cost-hollywood`,
      uk: `${siteUrl}/ua/moving-cost-hollywood`,
      'x-default': `${siteUrl}/moving-cost-hollywood`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: "Скільки коштує переїзд у Голлівуд? Ціни 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ua/moving-cost-hollywood`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Ціни на переїзд — Голлівуд, 2026" }],
  },
};

export default function MovingCostHollywoodPageUa() {
  return <CostPage page={page} locale="ua" />;
}
