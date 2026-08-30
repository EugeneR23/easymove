import type { Metadata } from 'next';
import RoutePage from '@/components/city/RoutePage';
import { getRoutePage } from '@/lib/data/routePages';

const page = getRoutePage('moving-miami-to-jacksonville')!;
const siteUrl = 'https://www.easy-move-florida.com';

export const metadata: Metadata = {
  title: { absolute: "Moving from Miami to Jacksonville: Cost & How It Works | Easy Move Florida" },
  description: page.metaDescription,
  alternates: { canonical: `${siteUrl}/moving-miami-to-jacksonville` },
  openGraph: {
    type: 'article',
    locale: 'en_US',
    siteName: 'Easy Move Florida',
    title: "Moving from Miami to Jacksonville: Cost & How It Works | Easy Move Florida",
    description: page.metaDescription,
    url: `${siteUrl}/moving-miami-to-jacksonville`,
    images: [{ url: `${siteUrl}/images/Hero.png`, width: 1200, height: 630, alt: "Moving from Miami to Jacksonville — Easy Move Florida" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Moving from Miami to Jacksonville: Cost & How It Works | Easy Move Florida",
    description: page.metaDescription,
    images: [`${siteUrl}/images/Hero.png`],
  },
};

export default function MovingMiamiToJacksonvillePage() {
  return <RoutePage page={page} />;
}
