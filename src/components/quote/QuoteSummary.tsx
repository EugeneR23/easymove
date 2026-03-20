import Link from 'next/link';
import { CheckCircle, Phone, ArrowRight, Shield, Clock, Mail } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';

interface Pricing {
  total: number;
  laborRate: number;
  truckFee: number;
  accessFee: number;
  addonsFee: number;
  discount: number;
  estimatedHours: number;
  crewSize: number;
  isLongDistance: boolean;
}

interface Props {
  quote: { id: string; pricing: Pricing };
  data: WizardData;
}

const NEXT_STEPS = [
  {
    icon: Mail,
    label: 'Confirmation email sent',
    sub: 'Check your inbox — your reference number and details are on their way.',
  },
  {
    icon: Clock,
    label: 'Coordinator reviews your move',
    sub: 'A real person looks at your details — home size, access, add-ons — and prepares your confirmed price.',
  },
  {
    icon: Phone,
    label: 'We follow up with your quote',
    sub: 'Typically within a few hours. We\u2019ll confirm the final price and answer any questions before you commit to anything.',
  },
];

export default function QuoteSummary({ quote, data }: Props) {
  const { pricing } = quote;
  const ref     = quote.id.slice(-8).toUpperCase();
  const isLocal = !pricing.isLongDistance && data.moveType !== 'specialty';

  const lineItems = [
    isLocal && pricing.laborRate > 0
      ? { label: `Labour — ${pricing.crewSize} movers × ${pricing.estimatedHours}h`, value: pricing.laborRate }
      : { label: 'Base rate', value: pricing.laborRate },
    pricing.truckFee  > 0 ? { label: 'Truck & travel fee', value: pricing.truckFee } : null,
    pricing.accessFee > 0 ? (() => {
      const flights = data.inventory.stairsFlights ?? 1;
      const floor   = flights + 1;
      const ordinal = floor === 2 ? '2nd' : floor === 3 ? '3rd' : `${floor}th`;
      const floorStr = flights === 1 ? `${ordinal} floor` : `up to ${ordinal} floor`;
      return {
        label: `Additional floor (${floorStr}) — no elevator`,
        value: pricing.accessFee,
      };
    })() : null,
    pricing.addonsFee > 0 ? { label: 'Additional services',   value: pricing.addonsFee } : null,
    pricing.discount  > 0 ? { label: 'Discount',              value: -pricing.discount } : null,
  ].filter(Boolean) as { label: string; value: number }[];

  return (
    <div className="bg-white border border-gray-100 shadow-card overflow-hidden">

      {/* Confirmation banner */}
      <div className="bg-charcoal px-6 md:px-10 py-8 text-center relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
        <div className="w-14 h-14 border border-gold/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={26} className="text-gold" />
        </div>
        <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-2">Request Received</p>
        <h2 className="font-display text-3xl font-bold text-white mb-1">
          Your request has been received
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
          A coordinator will review your details and contact you shortly with a confirmed price.
        </p>
        <p className="text-white/25 text-xs mt-3">Reference #{ref}</p>
      </div>

      <div className="p-6 md:p-10">

        {/* Price block */}
        <div className="bg-charcoal p-6 mb-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Preliminary Starting Price</p>
              <p className="font-display text-4xl sm:text-5xl font-bold text-gold">{formatCurrency(pricing.total)}</p>
              {isLocal && pricing.estimatedHours > 0 && (
                <p className="text-gray-400 text-sm mt-1">
                  {pricing.crewSize} movers · est. {pricing.estimatedHours} hrs · 3-hour minimum
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 max-w-[180px] leading-snug">
                Preliminary estimate. Final price confirmed by your coordinator — in writing, before your move.
              </p>
            </div>
          </div>

          {lineItems.length > 1 && (
            <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
              {lineItems.map((item) => (
                <div key={item.label} className="flex justify-between text-sm gap-2">
                  <span className="text-gray-400 flex-1 min-w-0 pr-1">{item.label}</span>
                  <span className={`shrink-0 whitespace-nowrap ${item.value < 0 ? 'text-green-400 font-medium' : 'text-white font-medium'}`}>
                    {item.value < 0 ? `−${formatCurrency(-item.value)}` : formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Move details */}
        <div className="bg-cream p-5 mb-8">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">Your Move Details</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-400 text-xs block mb-1">Type</span>
              <span className="text-charcoal font-medium capitalize">{data.moveType.replace('-', ' ')}</span>
            </div>
            <div>
              <span className="text-gray-400 text-xs block mb-1">Home Size</span>
              <span className="text-charcoal font-medium capitalize">{data.inventory.homeSize ?? '—'}</span>
            </div>
            <div>
              <span className="text-gray-400 text-xs block mb-1">From</span>
              <span className="text-charcoal font-medium">{data.fromCity || '—'}</span>
            </div>
            <div>
              <span className="text-gray-400 text-xs block mb-1">To</span>
              <span className="text-charcoal font-medium">{data.toCity || '—'}</span>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-5">What Happens Next</p>
          <ol className="space-y-5">
            {NEXT_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-gold" />
                    </div>
                    {i < NEXT_STEPS.length - 1 && (
                      <div className="w-px flex-1 my-2 min-h-[16px] bg-gray-100" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="font-semibold text-charcoal text-sm">{s.label}</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{s.sub}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Call CTA */}
        <div className="border border-gold/20 bg-gold/5 p-5 flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <p className="font-semibold text-charcoal text-sm">Prefer to talk now?</p>
            <p className="text-gray-500 text-xs mt-0.5">Mon–Sat, 8am–7pm EST</p>
          </div>
          <a
            href="tel:7863051844"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 text-sm font-semibold hover:bg-charcoal/80 transition-colors"
          >
            <Phone size={14} />
            786-305-1844
          </a>
        </div>

        {/* Trust + navigation */}
        <div className="flex items-center gap-2 mb-6">
          <Shield size={12} className="text-gold shrink-0" />
          <p className="text-xs text-gray-400">Fully insured · COI available · Local South Florida team · No hidden fees</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button variant="ghost" className="w-full">Back to Home</Button>
          </Link>
          <Link href="/contact" className="flex-1">
            <Button variant="primary" className="w-full inline-flex items-center justify-center gap-2">
              Talk to a Coordinator <ArrowRight size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
