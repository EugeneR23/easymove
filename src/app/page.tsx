import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PricingTransparency from '@/components/home/PricingTransparency';
import ServicesPreview from '@/components/home/ServicesPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BuildingHOASection from '@/components/home/BuildingHOASection';
import ServiceAreasSection from '@/components/home/ServiceAreasSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import FounderBlock from '@/components/home/FounderBlock';
import CTABanner from '@/components/home/CTABanner';
import MobileStickyBar from '@/components/ui/MobileStickyBar';

export const metadata: Metadata = {
  title: { absolute: 'Easy Move Florida — Local Moving & Small Handyman in South Florida' },
  description:
    'Owner-led local movers across South Florida — Hollywood, Aventura, Miami, Fort Lauderdale. From $99/hr, 3-hour minimum. COI in 24h. Russian + English.',
  alternates: {
    canonical: 'https://www.easy-move-florida.com',
    languages: {
      en: 'https://www.easy-move-florida.com',
      ru: 'https://www.easy-move-florida.com/ru',
      'x-default': 'https://www.easy-move-florida.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
    siteName: 'Easy Move Florida',
    title: 'Easy Move Florida — Local Moving & Small Handyman in South Florida',
    description:
      'Owner-led local movers in South Florida. Transparent hourly pricing from $99/hr, 3-hour minimum. WhatsApp-friendly, Russian + English.',
    url: 'https://www.easy-move-florida.com',
    images: [
      {
        url: 'https://www.easy-move-florida.com/images/Hero.png',
        width: 1200,
        height: 630,
        alt: 'Easy Move Florida — local moving crew in South Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Easy Move Florida — Local Moving & Small Handyman',
    description:
      'Hollywood-based movers serving all of South Florida. Honest hourly pricing, COI on request, Russian + English.',
    images: ['https://www.easy-move-florida.com/images/Hero.png'],
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <PricingTransparency />
        <ServicesPreview />
        <WhyChooseUs />
        <BuildingHOASection />
        <ServiceAreasSection />
        <TestimonialsSection />
        <FAQSection />
        <FounderBlock />
        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
