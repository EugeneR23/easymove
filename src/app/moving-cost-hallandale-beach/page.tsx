import type { Metadata } from 'next';
import CostPage from '@/components/city/CostPage';
import { getCostPage } from '@/lib/data/costPages';
import { alternatesFor } from '@/lib/seo/routes';
import { TWITTER_CARD_URL, ogCard } from '@/lib/seo/og';

const page = getCostPage('moving-cost-hallandale-beach')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "How Much Do Movers Cost in Hallandale Beach? (2026 Prices) | Easy Move Florida" },
  description: page.metaDescription,
  alternates: alternatesFor('moving-cost-hallandale-beach', 'en'),
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: "How Much Do Movers Cost in Hallandale Beach? (2026 Prices)",
    description: page.metaDescription,
    url: `${siteUrl}/moving-cost-hallandale-beach`,
    images: [ogCard("Hallandale Beach moving costs 2026")],
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Much Do Movers Cost in Hallandale Beach? (2026 Prices)",
    description: page.metaDescription,
    images: [TWITTER_CARD_URL],
  },
};

export default function MovingCostHallandaleBeachPage() {
  return <CostPage page={page} />;
}
