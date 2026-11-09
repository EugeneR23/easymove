import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { SERVICE_SCOPE } from '@/lib/data/scope';
import { CITIES } from '@/lib/data/cities';
import { BASE_AREA } from '@/lib/data/contact';
import { RESPONSE } from '@/lib/data/policies';
import { LONG_DISTANCE_THRESHOLD_MILES } from '@/lib/pricing';

/**
 * Every city that has a page, linked, from the one list the footer and the
 * sitemap use.
 *
 * This section used to keep two hand-typed lists. Five cities with a page of
 * their own (Hallandale, Dania Beach, Miami Beach, North Miami, Doral) were
 * plain text, Pinecrest appeared here and nowhere else on the site, and the
 * second list was headed "Custom-priced (distance)" for cities the calculator
 * prices at the ordinary hourly rate. The owner's answer of 2026-11-09 is one
 * rate everywhere and no travel fee; only a leg over the threshold is quoted
 * by hand.
 *
 * No 'use client': nothing here is interactive, and a client component would
 * ship the whole city data file to the browser.
 */
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
            Our crew is based in the {BASE_AREA} and works across Miami-Dade, Broward and Palm Beach at the same hourly rate. {SERVICE_SCOPE.en.short}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <MapPin size={14} /> Cities we serve
            </p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {CITIES.map((c) => (
                <li key={c.slug} className="text-charcoal">
                  <Link href={`/${c.slug}`} className="hover:text-gold transition-colors text-sm font-medium border-b border-transparent hover:border-gold">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-charcoal/60 text-xs font-semibold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <MapPin size={14} /> How distance is priced
            </p>
            <ul className="space-y-3 text-sm text-charcoal">
              <li>
                <span className="font-semibold">One hourly rate in every city.</span> There is no travel fee. Billable hours start when the crew arrives at your first address.
              </li>
              <li>
                <span className="font-semibold">More than {LONG_DISTANCE_THRESHOLD_MILES} miles between your two addresses:</span> quoted by hand, in writing, within {RESPONSE.writtenEstimateWithinHours} hours.
              </li>
              <li>
                <span className="font-semibold">Long distance:</span> anywhere inside Florida, by custom estimate. We do not move out of state.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
