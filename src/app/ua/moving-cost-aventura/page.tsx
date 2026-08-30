import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageUa } from '@/lib/data/costPages';

const page = getCostPageUa('ua/moving-cost-aventura')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Скільки коштує переїзд у Авентура? Ціни 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/moving-cost-aventura`,
    languages: {
      en: `${siteUrl}/moving-cost-aventura`,
      ru: `${siteUrl}/ru/moving-cost-aventura`,
      uk: `${siteUrl}/ua/moving-cost-aventura`,
      'x-default': `${siteUrl}/moving-cost-aventura`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: "Скільки коштує переїзд у Авентура? Ціни 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ua/moving-cost-aventura`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Ціни на переїзд — Авентура, 2026" }],
  },
};

export default function MovingCostAventuraPageUa() {
  return <CostPage page={page} locale="ua" />;
}
