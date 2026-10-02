import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';
import { alternatesFor } from '@/lib/seo/routes';
import { ogImage } from '@/lib/seo/og';

const city = getCityData('miramar-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('miramar-movers', 'en'),
  openGraph: {
    type: 'website',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: 'https://www.easy-move-florida.com/miramar-movers',
    images: [
      ogImage(`https://www.easy-move-florida.com${city.heroImage}`, 'Easy Move Florida — Movers in Miramar, FL'),
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    images: [`https://www.easy-move-florida.com${city.heroImage}`],
  },
};

export default function MiramarMoversPage() {
  return <CityMoversPage city={city} />;
}
