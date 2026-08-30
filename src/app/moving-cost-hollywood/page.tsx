import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPage } from '@/lib/data/costPages';

const page = getCostPage('moving-cost-hollywood')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "How Much Do Movers Cost in Hollywood? (2026 Prices) | Easy Move Florida" },
  description: page.metaDescription,
  alternates: { canonical: `${siteUrl}/moving-cost-hollywood` },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: "How Much Do Movers Cost in Hollywood? (2026 Prices)",
    description: page.metaDescription,
    url: `${siteUrl}/moving-cost-hollywood`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Hollywood moving costs 2026" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Do Movers Cost in Hollywood? (2026 Prices)",
    description: page.metaDescription,
    images: [`${siteUrl}/images/Hero.png`],
  },
};

export default function MovingCostHollywoodPage() {
  return <CostPage page={page} />;
}
