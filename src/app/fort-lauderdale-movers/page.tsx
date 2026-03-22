import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityData } from '@/lib/data/cities';

const city = getCityData('fort-lauderdale-movers')!;

export const metadata: Metadata = {
  title: city.metaTitle,
  description: city.metaDescription,
  alternates: { canonical: 'https://www.easymoveelite.com/fort-lauderdale-movers' },
  openGraph: {
    title: city.metaTitle,
    description: city.metaDescription,
    url: 'https://www.easymoveelite.com/fort-lauderdale-movers',
  },
  twitter: {
    card: 'summary_large_image',
    title: city.metaTitle,
    description: city.metaDescription,
  },
};

export default function FortLauderdaleMoversPage() {
  return <CityMoversPage city={city} />;
}
