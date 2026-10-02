import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';
import { alternatesFor } from '@/lib/seo/routes';
import { ogImage } from '@/lib/seo/og';

const city = getCityDataUa('ua/fort-lauderdale-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('fort-lauderdale-movers', 'uk'),
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/fort-lauderdale-movers`,
    images: [ogImage(`${siteUrl}${city.heroImage}`, "Вантажники та переїзди — Fort Lauderdale | Easy Move Florida")],
  },
};

export default function FortLauderdaleMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
