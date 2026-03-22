import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuoteWizard from '@/components/quote/QuoteWizard';
import ExitIntent from '@/components/quote/ExitIntent';
import MobileStickyBar from '@/components/ui/MobileStickyBar';
import { Shield, Clock, Phone, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get a Free Moving Estimate in South Florida — EasyMove Elite',
  description:
    'Get a free moving estimate in under 2 minutes. A real coordinator confirms your final price — no automated guesswork. Miami, Fort Lauderdale & Boca Raton.',
  alternates: {
    canonical: 'https://www.easymoveelite.com/quote',
  },
  openGraph: {
    title: 'Get a Free Moving Estimate — EasyMove Elite',
    description:
      'Free written moving estimate in under 2 minutes. No obligation. A real coordinator reviews your details and confirms pricing.',
    url: 'https://www.easymoveelite.com/quote',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Free Moving Estimate — EasyMove Elite',
    description:
      'Under 2 minutes. A real coordinator confirms your final price. No obligation. Serving Miami, Fort Lauderdale & Boca Raton.',
  },
};

const TRUST_POINTS = [
  { icon: Shield, text: 'No hidden fees' },
  { icon: Star,   text: 'Fully insured' },
  { icon: Phone,  text: 'Direct communication — speak with the person handling your move' },
  { icon: Clock,  text: 'Fast scheduling · Call or text: 786-305-1844' },
];

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-cream">
        {/* Hero */}
        <div className="bg-charcoal py-14 px-4 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Preliminary Estimate</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Get a Fast Moving Estimate
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-sm">
            6 steps, under 2 minutes. A coordinator reviews your details and confirms a final price — no automated guesswork.
          </p>
        </div>

        {/* Wizard */}
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-36 lg:pb-8 overflow-hidden">
          <QuoteWizard />

          {/* Trust strip below wizard */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
            {TRUST_POINTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={13} className="text-gold shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client-side: exit intent + mobile sticky bar */}
        <ExitIntent />
        <MobileStickyBar onQuotePage />
      </main>
      <Footer />
    </>
  );
}
