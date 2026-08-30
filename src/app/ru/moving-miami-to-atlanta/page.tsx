import type { Metadata } from 'next';
import RoutePage from '@/components/city/RoutePage';
import { getRoutePageRu } from '@/lib/data/routePages';

const page = getRoutePageRu('ru/moving-miami-to-atlanta')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Переезд из Майами в Атланта: цена и как это работает | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-miami-to-atlanta`,
    languages: {
      en: `${siteUrl}/moving-miami-to-atlanta`,
      ru: `${siteUrl}/ru/moving-miami-to-atlanta`,
      'x-default': `${siteUrl}/moving-miami-to-atlanta`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Переезд из Майами в Атланта: цена и как это работает | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-miami-to-atlanta`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Переезд Майами — Атланта, Easy Move Florida" }],
  },
};

export default function MovingMiamiToAtlantaPageRu() {
  return <RoutePage page={page} locale="ru" />;
}
