import Link from 'next/link';
import Button from '@/components/ui/Button';
import { localStartingPrice } from '@/lib/pricing';
import { formatCurrency } from '@/lib/utils';
import type { HomeSize } from '@/types';
import { ArrowRight, Shield } from 'lucide-react';

const LOCAL_SIZES: { size: HomeSize; label: string }[] = [
  { size: 'studio', label: 'Studio' },
  { size: '1br',    label: '1 Bedroom' },
  { size: '2br',    label: '2 Bedrooms' },
  { size: '3br',    label: '3 Bedrooms' },
];

export default function QuoteTeaser() {
  return (
    <section className="bg-cream section-padding border-t border-gray-100">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Transparent Pricing</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
              Know Your Starting<br />Price Before You Call
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Local moves in South Florida are priced by the hour based on crew size.
              No flat-rate guesswork, no hidden fees. Use our calculator to get a
              preliminary estimate in under two minutes.
            </p>
            <p className="text-xs text-gray-400 mb-8 border-l-2 border-gold/30 pl-4">
              All estimates are preliminary. Final price is confirmed after we review
              your specific move — access, inventory, and any special requirements.
            </p>
            <Link href="/quote">
              <Button size="lg" variant="primary" className="inline-flex items-center gap-2">
                Get My Estimate <ArrowRight size={16} />
              </Button>
            </Link>
            <p className="text-xs text-gray-400 mt-3">No obligation. Fast response.</p>
          </div>

          {/* Right — price grid */}
          <div>
            <div className="bg-white border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-charcoal px-6 py-4 flex items-center justify-between">
                <p className="text-white text-sm font-semibold">Local Move Starting Prices</p>
                <p className="text-gray-500 text-xs">South Florida · 3-hour minimum</p>
              </div>

              {/* Rate explanation */}
              <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
                <div className="px-5 py-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">2 Movers</p>
                  <p className="font-display text-xl font-bold text-charcoal">$129<span className="text-sm font-normal text-gray-400">/hr</span></p>
                  <p className="text-xs text-gray-400 mt-0.5">+ $90 truck fee</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">3 Movers</p>
                  <p className="font-display text-xl font-bold text-charcoal">$179<span className="text-sm font-normal text-gray-400">/hr</span></p>
                  <p className="text-xs text-gray-400 mt-0.5">+ $90 truck fee</p>
                </div>
              </div>

              {/* Size grid */}
              <div className="divide-y divide-gray-50">
                {LOCAL_SIZES.map(({ size, label }) => {
                  const price2 = localStartingPrice(size, 2);
                  const price3 = localStartingPrice(size, 3);
                  return (
                    <div key={size} className="grid grid-cols-3 px-5 py-3.5 hover:bg-cream/60 transition-colors">
                      <div className="flex items-center">
                        <span className="text-charcoal text-sm font-medium">{label}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-charcoal text-sm font-semibold">{formatCurrency(price2)}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-charcoal text-sm font-semibold">{formatCurrency(price3)}</span>
                      </div>
                    </div>
                  );
                })}
                <div className="grid grid-cols-3 px-5 py-3.5 bg-gray-50">
                  <span className="text-gray-400 text-sm">4+ Bedrooms</span>
                  <span className="text-center text-gray-400 text-sm">Custom</span>
                  <span className="text-center text-gray-400 text-sm">Custom</span>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Shield size={13} className="text-gold shrink-0" />
                  <span className="text-xs text-gray-400">Fully insured · COI on request</span>
                </div>
                <Link href="/quote" className="inline-flex items-center gap-1 text-gold text-xs font-semibold uppercase tracking-wider hover:gap-2 transition-all">
                  Calculator <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Long-distance &amp; specialty moves — quoted individually after review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
