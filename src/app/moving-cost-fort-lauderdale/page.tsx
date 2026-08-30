import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPage } from '@/lib/data/costPages';

const page = getCostPage('moving-cost-fort-lauderdale')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "How Much Do Movers Cost in Fort Lauderdale? (2026 Prices) | Easy Move Florida" },
  description: page.metaDescription,
  alternates: { canonical: `${siteUrl}/moving-cost-fort-lauderdale` },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: "How Much Do Movers Cost in Fort Lauderdale? (2026 Prices)",
    description: page.metaDescription,
    url: `${siteUrl}/moving-cost-fort-lauderdale`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Fort Lauderdale moving costs 2026" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Do Movers Cost in Fort Lauderdale? (2026 Prices)",
    description: page.metaDescription,
    images: [`${siteUrl}/images/Hero.png`],
  },
};

export default function MovingCostFortLauderdalePage() {
  return <CostPage page={page} />;
}
