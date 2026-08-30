import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPageUa } from '@/lib/data/costPages';

const page = getCostPageUa('ua/moving-cost-sunny-isles')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Скільки коштує переїзд у Санні-Айлс-Біч? Ціни 2026 | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ua/moving-cost-sunny-isles`,
    languages: {
      en: `${siteUrl}/moving-cost-sunny-isles`,
      ru: `${siteUrl}/ru/moving-cost-sunny-isles`,
      uk: `${siteUrl}/ua/moving-cost-sunny-isles`,
      'x-default': `${siteUrl}/moving-cost-sunny-isles`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: "Скільки коштує переїзд у Санні-Айлс-Біч? Ціни 2026 | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ua/moving-cost-sunny-isles`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Ціни на переїзд — Санні-Айлс-Біч, 2026" }],
  },
};

export default function MovingCostSunnyIslesPageUa() {
  return <CostPage page={page} locale="ua" />;
}
