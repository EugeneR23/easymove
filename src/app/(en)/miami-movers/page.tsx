import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';
import { alternatesFor } from '@/lib/seo/routes';
import { ogImage } from '@/lib/seo/og';

const city = getCityData('miami-movers')!;

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('miami-movers', 'en'),
  openGraph: {
    type: 'website',
    siteName: 'Easy Move Florida',
    title: city.metaTitle,
    description: city.metaDescription,
    url: 'https://www.easy-move-florida.com/miami-movers',
    images: [
      ogImage('https://www.easy-move-florida.com/images/Real/Miami.jpg', 'Easy Move Florida — movers in Miami, FL'),
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: city.metaTitle,
    description: city.metaDescription,
    images: ['https://www.easy-move-florida.com/images/Real/Miami.jpg'],
  },
};

export default function MiamiMoversPage() {
  return <CityMoversPage city={city} />;
}
