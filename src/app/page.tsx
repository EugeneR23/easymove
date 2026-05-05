import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import FounderBlock from '@/components/home/FounderBlock';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import WorkGallery from '@/components/home/WorkGallery';
import CTABanner from '@/components/home/CTABanner';
import FAQSection from '@/components/home/FAQSection';
import MobileStickyBar from '@/components/ui/MobileStickyBar';

export const metadata: Metadata = {
  title: { absolute: 'EasyMove Elite — Premium Moving Company in South Florida' },
  description:
    'South Florida\'s premier white-glove movers. Residential, high-rise, long-distance & fine art moves in Miami, Fort Lauderdale & Boca Raton. Fully insured, founder-led.',
  alternates: {
    canonical: 'https://easy-move-florida.com',
  },
  openGraph: {
    title: 'EasyMove Elite — Premium Moving Company in South Florida',
    description:
      'Founder-led, fully insured white-glove movers in Miami, Fort Lauderdale & Boca Raton. Transparent pricing, no surprises.',
    url: 'https://easy-move-florida.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EasyMove Elite — Premium Moving Company in South Florida',
    description:
      'White-glove movers in Miami, Fort Lauderdale & Boca Raton. Founder-led, fully insured, no surprise fees.',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <HeroSection />
        <StatsBar />
        <TestimonialsSection />
        <WhyChooseUs />
        <ServicesPreview />
        <FounderBlock />
        <WorkGallery />
        <ProcessSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
