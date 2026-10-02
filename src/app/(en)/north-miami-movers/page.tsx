import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';
import { alternatesFor } from '@/lib/seo/routes';
import { ogImage } from '@/lib/seo/og';

const city = getCityData('north-miami-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('north-miami-movers', 'en'),
  openGraph: {
    type: 'website',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: 'https://www.easy-move-florida.com/north-miami-movers',
    images: [
      ogImage(`https://www.easy-move-florida.com${city.heroImage}`, 'Easy Move Florida — Movers in North Miami, FL'),
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    images: [`https://www.easy-move-florida.com${city.heroImage}`],
  },
};

export default function NorthMiamiMoversPage() {
  return <CityMoversPage city={city} />;
}
