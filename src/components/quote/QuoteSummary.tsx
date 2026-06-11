import Link from 'next/link';
import { CheckCircle, Phone, ArrowRight, Shield } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PACKING_COST } from '@/lib/pricing';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';

interface Pricing {
  total: number;
  laborRate: number;
  truckFee: number;
  accessFee: number;
  addonsFee: number;
  travelFee: number;
  travelMiles: number;
  travelMinutes: number;
  discount: number;
  estimatedHours: number;
  crewSize: number;
  isLongDistance: boolean;
}

interface Props {
  quote: { id: string; pricing: Pricing };
  data: WizardData;
  embedded?: boolean;
}

export default function QuoteSummary({ quote, data, embedded = false }: Props) {
  const { pricing } = quote;
  const ref     = quote.id.slice(-8).toUpperCase();
  const isLocal = !pricing.isLongDistance && data.moveType !== 'specialty';

  const isPacking = data.moveType === 'packing-only';
  const size      = data.inventory.homeSize ?? '2br';

  // ── Labor label ────────────────────────────────────────────────────────────
  const laborLabel = isPacking
    ? `Packing — ${pricing.crewSize} packers × ${pricing.estimatedHours}h`
    : isLocal
      ? `Labour — ${pricing.crewSize} movers × ${pricing.estimatedHours}h`
      : pricing.isLongDistance && pricing.estimatedHours > 0
        ? `Loading & unloading — ${pricing.crewSize} movers × ${pricing.estimatedHours}h`
        : 'Base rate';

  // ── Access fee label ───────────────────────────────────────────────────────
  const accessLabel = (() => {
    const flights = data.inventory.stairsFlights ?? 1;
    const floor   = flights + 1;
    const ordinal = floor === 2 ? '2nd' : floor === 3 ? '3rd' : `${floor}th`;
    return `Stairs — ${ordinal} floor ($${flights * 50} per flight)`;
  })();

  // ── Addon line items (one per service) ────────────────────────────────────
  const addonLines: { label: string; value: number }[] = [];
  if (data.addons.packingService)    addonLines.push({ label: 'Packing service',           value: PACKING_COST[size] ?? 375 });
  if (data.addons.unpackingService)  addonLines.push({ label: 'Unpacking service',          value: PACKING_COST[size] ?? 375 });
  if (data.addons.storageMonths > 0) addonLines.push({ label: `Storage — ${data.addons.storageMonths} month${data.addons.storageMonths > 1 ? 's' : ''}`, value: data.addons.storageMonths * 200 });
  if (data.addons.autoTransport)     addonLines.push({ label: 'Auto transport',             value: 1200 });
  if (data.addons.artHandling)       addonLines.push({ label: 'Art & antique handling',     value: data.inventory.specialItems.length > 0 ? data.inventory.specialItems.length * 150 : 300 });

  const travelLabel = pricing.travelMiles > 0
    ? `Travel — ~${pricing.travelMiles} mi · ~${pricing.travelMinutes} min est.`
    : 'Travel time';

  const lineItems = [
    pricing.laborRate > 0 ? { label: laborLabel, value: pricing.laborRate } : null,
    pricing.truckFee  > 0 ? {
      label: pricing.isLongDistance
        ? `Long-distance transport${pricing.travelMiles > 0 ? ` — ~${pricing.travelMiles} mi` : ''}`
        : 'Truck fee',
      value: pricing.truckFee,
    } : null,
    pricing.travelFee > 0 ? { label: travelLabel, value: pricing.travelFee } : null,
    pricing.accessFee > 0 ? { label: accessLabel, value: pricing.accessFee } : null,
    ...addonLines,
    pricing.discount  > 0 ? { label: 'Discount', value: -pricing.discount } : null,
  ].filter(Boolean) as { label: string; value: number }[];

  return (
    <div className={embedded ? 'w-full max-w-full bg-white overflow-x-hidden' : 'w-full max-w-full bg-white border border-gray-100 shadow-card overflow-x-hidden'}>

      {/* ── Confirmation banner ──────────────────────────────────────────────── */}
      <div className="bg-charcoal px-5 sm:px-8 py-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
        <div className="w-12 h-12 border border-gold/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={22} className="text-gold" />
        </div>
        <p className="text-gold text-xs font-semibold tracking-[0.15em] uppercase mb-2">Request Received</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          We&rsquo;ll contact you shortly
        </h2>
        <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
          We&rsquo;ll review your details and confirm your final price — usually within a few hours.
        </p>
        <p className="text-white/25 text-xs mt-4">Reference #{ref}</p>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-8 overflow-x-hidden w-full">

        {/* Price block — single-column on mobile */}
        <div className="bg-charcoal p-5 mb-6 overflow-hidden">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Preliminary Starting Price</p>
          <p className="font-display text-4xl font-bold text-gold mb-1">
            {formatCurrency(pricing.total)}
          </p>
          {isLocal && pricing.estimatedHours > 0 && (
            <p className="text-gray-500 text-xs">
              {pricing.crewSize} movers · est. {pricing.estimatedHours} hrs · 3-hr minimum
            </p>
          )}
          <p className="text-gray-600 text-xs mt-3 leading-snug">
            Preliminary only — final price confirmed in writing before your move.
          </p>

          {lineItems.length > 1 && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
              {lineItems.map((item) => (
                <div key={item.label} className="flex justify-between text-sm gap-2">
                  <span className="text-gray-400 flex-1 min-w-0 pr-1 break-words">{item.label}</span>
                  <span className={`shrink-0 whitespace-nowrap ${item.value < 0 ? 'text-green-400 font-medium' : 'text-white font-medium'}`}>
                    {item.value < 0 ? `−${formatCurrency(-item.value)}` : formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Move details — 2-col always */}
        <div className="bg-cream p-4 mb-6 overflow-hidden">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">Your Move</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="min-w-0">
              <span className="text-gray-400 text-xs block mb-0.5">Type</span>
              <span className="text-charcoal font-medium capitalize block truncate">{data.moveType.replace('-', ' ')}</span>
            </div>
            <div className="min-w-0">
              <span className="text-gray-400 text-xs block mb-0.5">Home Size</span>
              <span className="text-charcoal font-medium capitalize block truncate">{data.inventory.homeSize ?? '—'}</span>
            </div>
            {data.fromCity && (
              <div className="min-w-0">
                <span className="text-gray-400 text-xs block mb-0.5">From</span>
                <span className="text-charcoal font-medium block truncate">{data.fromCity}</span>
              </div>
            )}
            {data.toCity && (
              <div className="min-w-0">
                <span className="text-gray-400 text-xs block mb-0.5">To</span>
                <span className="text-charcoal font-medium block truncate">{data.toCity}</span>
              </div>
            )}
          </div>
        </div>

        {/* Call CTA — full-width button on mobile */}
        <div className="border border-gold/20 bg-gold/5 p-4 mb-5">
          <p className="font-semibold text-charcoal text-sm">Prefer to talk now?</p>
          <p className="text-gray-500 text-xs mt-0.5 mb-3">Mon–Sat, 8am–7pm EST</p>
          <a
            href="tel:7863051844"
            className="flex items-center justify-center gap-2 bg-charcoal text-white px-4 py-2.5 text-sm font-semibold w-full hover:bg-charcoal/80 transition-colors"
          >
            <Phone size={14} />
            786-305-1844
          </a>
        </div>

        {/* Trust line — flex-wrap safe */}
        <div className="flex items-start gap-2 mb-5">
          <Shield size={12} className="text-gold shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400 min-w-0 leading-relaxed">
            Fully insured · COI available · Local South Florida team · No hidden fees
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link href="/" className="w-full sm:w-auto sm:flex-1">
            <Button variant="ghost" className="w-full">Back to Home</Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto sm:flex-1">
            <Button variant="primary" className="w-full inline-flex items-center justify-center gap-2">
              Talk to a Coordinator <ArrowRight size={15} />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
