import type { Metadata } from 'next';
import V2Header from '@/components/v2/V2Header';
import ClockStoryHero from '@/components/v2/ClockStoryHero';
import V2CTA from '@/components/v2/V2CTA';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { absolute: 'EasyMove Elite — One Day. Zero Chaos.' },
  description:
    'Your entire move — planned, executed and finished between sunrise and sunset. Miami’s private moving atelier.',
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return (
    <main className="bg-[#060608]">
      <V2Header />
      <ClockStoryHero />
      <V2CTA />
      <Footer />
    </main>
  );
}
