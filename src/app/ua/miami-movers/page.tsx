import type { Metadata } from 'next';
import CityMoversPage from '@/components/city/CityMoversPage';
import { getCityDataUa } from '@/lib/data/citiesUa';
import { alternatesFor } from '@/lib/seo/routes';
import { ogImage } from '@/lib/seo/og';

const city = getCityDataUa('ua/miami-movers')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: city.metaTitle },
  description: city.metaDescription,
  alternates: alternatesFor('miami-movers', 'uk'),
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Easy Move Florida',
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    url: `${siteUrl}/ua/miami-movers`,
    images: [ogImage(`${siteUrl}${city.heroImage}`, "Вантажники та переїзди — Miami | Easy Move Florida")],
  },
};

export default function MiamiMoversPageUa() {
  return <CityMoversPage city={city} locale="ua" />;
}
