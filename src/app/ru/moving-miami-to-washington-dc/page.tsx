import type { Metadata } from 'next';
import RoutePage from '@/components/city/RoutePage';
import { getRoutePageRu } from '@/lib/data/routePages';

const page = getRoutePageRu('ru/moving-miami-to-washington-dc')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Переезд из Майами в Вашингтон: цена и как это работает | Easy Move Florida" },
  description: page.metaDescription,
  alternates: {
    canonical: `${siteUrl}/ru/moving-miami-to-washington-dc`,
    languages: {
      en: `${siteUrl}/moving-miami-to-washington-dc`,
      ru: `${siteUrl}/ru/moving-miami-to-washington-dc`,
      'x-default': `${siteUrl}/moving-miami-to-washington-dc`,
    },
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    siteName: 'Easy Move Florida',
    title: "Переезд из Майами в Вашингтон: цена и как это работает | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/ru/moving-miami-to-washington-dc`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Переезд Майами — Вашингтон, Easy Move Florida" }],
  },
};

export default function MovingMiamiToWashingtonDcPageRu() {
  return <RoutePage page={page} locale="ru" />;
}
