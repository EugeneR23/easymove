'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';

const TIER_1 = [
  { label: 'Hollywood', href: '/hollywood-movers' },
  { label: 'Aventura', href: '/aventura-movers' },
  { label: 'Hallandale', href: null },
  { label: 'Sunny Isles', href: '/sunny-isles-movers' },
  { label: 'Dania Beach', href: null },
  { label: 'Fort Lauderdale', href: '/fort-lauderdale-movers' },
  { label: 'Miami Beach', href: null },
  { label: 'Miami', href: '/miami-movers' },
  { label: 'North Miami', href: null },
];

const TIER_2 = [
  { label: 'Boca Raton', href: '/boca-raton-movers' },
  { label: 'Coral Gables', href: '/coral-gables-movers' },
  { label: 'Coconut Grove', href: '/coconut-grove-movers' },
  { label: 'Pompano Beach', href: null },
  { label: 'Doral', href: null },
  { label: 'Pinecrest', href: null },
];

export default function ServiceAreasSection() {
  return (
    <section className="section-padding bg-white border-t border-gray-100">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Service Area</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal leading-tight mb-4">
            Where we move.
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Hollywood-based, covering all of South Florida. Tier 1 cities are within our 30-minute base radius. Tier 2 is custom-priced based on distance. Long-distance — anywhere in Florida or out of state — by custom estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <MapPin size={14} /> Primary service area
            </p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {TIER_1.map((c) => (
                <li key={c.label} className="text-charcoal">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-gold transition-colors text-sm font-medium border-b border-transparent hover:border-gold">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium">{c.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-charcoal/60 text-xs font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <MapPin size={14} /> Custom-priced (distance)
            </p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {TIER_2.map((c) => (
                <li key={c.label} className="text-charcoal">
                  {c.href ? (
                    <Link href={c.href} className="hover:text-gold transition-colors text-sm font-medium border-b border-transparent hover:border-gold">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium">{c.label}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-xs mt-6 leading-relaxed">
              <span className="text-charcoal font-semibold">Long-distance:</span> custom estimate anywhere in Florida or out of state. Send origin and destination — written estimate within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
