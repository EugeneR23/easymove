'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HOURLY_RATE, MIN_HOURS, TRUCK_FEE } from '@/lib/pricing';
import { whatsappUrl } from '@/lib/utils';

const TIERS = [
  {
    label: 'Crew of 2',
    price: HOURLY_RATE[2],
    note: `${MIN_HOURS}-hour minimum + $${TRUCK_FEE[2]}/day truck`,
    body: 'Furniture pads, stretch wrap and basic disassembly are in the rate. Best for studios and 1BR apartments.',
  },
  {
    label: 'Crew of 3',
    price: HOURLY_RATE[3],
    note: `${MIN_HOURS}-hour minimum + $${TRUCK_FEE[3]}/day truck`,
    body: 'Same inclusions, faster crew. Best for 2BR+, walk-ups, and larger inventory.',
    highlight: true,
  },
];

export default function PricingTransparency() {
  return (
    <section id="pricing" className="section-padding bg-white border-t border-gray-100">
      <div className="container-max">
        <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Pricing</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
            ${HOURLY_RATE[2]}/hr for two movers. <span className="gold-text">${HOURLY_RATE[3]}/hr for three.</span>
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Three-hour minimum, plus the truck as its own line on the estimate — charged per day at the crew rate, ${TRUCK_FEE[2]} with two movers and ${TRUCK_FEE[3]} with three, with fuel, tolls and mileage inside it. The rate is locked before we start and does not change on move day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
          {TIERS.map((t) => (
            <div
              key={t.label}
              className={`relative border ${
                t.highlight ? 'border-gold bg-cream' : 'border-gray-200 bg-white'
              } p-7 flex flex-col`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-7 bg-gold px-3 py-1 text-[10px] font-bold text-white uppercase tracking-[0.15em]">
                  Most common
                </div>
              )}
              <p className="text-charcoal text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                {t.label}
              </p>
              <div className="mb-2">
                {t.price !== null ? (
                  <>
                    <span className="text-gray-400 text-sm align-top mr-1">from</span>
                    <span className="font-display text-5xl font-bold text-charcoal">${t.price}</span>
                    <span className="text-gray-400 text-sm ml-1">/hr</span>
                  </>
                ) : (
                  <span className="font-display text-3xl font-bold text-charcoal">Custom estimate</span>
                )}
              </div>
              <p className="text-gold text-xs font-semibold mb-4">{t.note}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-gold text-white font-bold px-6 py-3 hover:bg-gold/90 transition-colors"
          >
            Calculate My Move <ArrowRight size={15} />
          </Link>
          <a
            href={whatsappUrl('Hi, I\'d like a moving quote — sending photos now.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-semibold px-6 py-3 hover:border-gold hover:text-gold transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
        <p className="text-center text-gray-400 text-xs mt-4 max-w-lg mx-auto">
          Send photos via WhatsApp for a tighter estimate — we reply during business hours, Monday to Saturday, 8:00 AM to 7:00 PM.
        </p>
      </div>
    </section>
  );
}
