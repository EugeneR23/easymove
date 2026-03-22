import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('miami-movers')!;

export const metadata: Metadata = {
  title: city.metaTitle,
  description: city.metaDescription,
  alternates: { canonical: 'https://www.easymoveelite.com/miami-movers' },
  openGraph: {
    title: city.metaTitle,
    description: city.metaDescription,
    url: 'https://www.easymoveelite.com/miami-movers',
  },
  twitter: {
    card: 'summary_large_image',
    title: city.metaTitle,
    description: city.metaDescription,
  },
};

export default function MiamiMoversPage() {
  return <CityMoversPage city={city} />;
}
