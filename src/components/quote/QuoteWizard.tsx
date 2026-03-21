'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import type { MoveType, QuoteInventory, QuoteAddons } from '@/types';
import { calculatePricing, estimateDistance } from '@/lib/pricing';
import Step1MoveType from './Step1_MoveType';
import Step2HomeSize from './Step2_HomeSize';
import Step3Locations from './Step3_Locations';
import Step4Services from './Step4_Services';
import Step5Schedule from './Step5_Schedule';
import Step6Contact from './Step6_Contact';
import QuoteSummary from './QuoteSummary';
import { Check, TrendingUp } from 'lucide-react';

export interface WizardData {
  moveType: MoveType;
  fromAddress: string; fromCity: string; fromState: string; fromZip: string;
  toAddress: string; toCity: string; toState: string; toZip: string;
  inventory: QuoteInventory;
  addons: QuoteAddons;
  preferredDate: string;
  flexibleDates: boolean;
  firstName: string; lastName: string; email: string; phone: string;
  notes: string;
}

const DEFAULT_DATA: WizardData = {
  moveType: 'local',
  fromAddress: '', fromCity: '', fromState: 'FL', fromZip: '',
  toAddress:   '', toCity:   '', toState:   'FL', toZip:   '',
  inventory: {
    homeSize: 'studio',
    crewSize: 2,
    bedrooms: 0,
    bathrooms: 1,
    estimatedBoxes: 0,
    specialItems: [],
    hasElevator: false,
    hasStairs: false,
    stairsFlights: 1,
    isHighRise: false,
    needsCOI: false,
    hasGarage: false,
    hasStorage: false,
  },
  addons: {
    packingService: false,
    unpackingService: false,
    furnitureAssembly: false,
    storageMonths: 0,
    autoTransport: false,
    artHandling: false,
    climateControlled: false,
  },
  preferredDate: '', flexibleDates: false,
  firstName: '', lastName: '', email: '', phone: '',
  notes: '',
};

const STEPS = [
  { label: 'Move Type',  sub: 'Local, long-distance, specialty' },
  { label: 'Home Size',  sub: 'Crew size & starting price'      },
  { label: 'Locations',  sub: 'Pickup & delivery details'       },
  { label: 'Add-ons',    sub: 'Packing, storage, and more'      },
  { label: 'Date',       sub: 'Preferred move date'             },
  { label: 'Contact',    sub: 'Name, email, phone'              },
];

// Step-specific microcopy — shown in mobile strip and sidebar
const STEP_MICRO: Record<number, string> = {
  1: 'Takes less than 2 minutes',
  2: 'Your estimate is being calculated',
  3: "Halfway there — keep going",
  4: 'Almost done',
  5: 'Just one more step',
  6: "You're almost there",
};

// ─── Live estimate from current data ──────────────────────────────────────────
function getLiveEstimate(data: WizardData) {
  if (!data.inventory.homeSize) return null;
  if (data.moveType === 'specialty') return null;

  const fromState = data.fromState || 'FL';
  const toState   = data.toState   || (data.moveType === 'local' ? 'FL' : 'NY');
  const distance  = data.moveType === 'local'
    ? 20
    : estimateDistance(fromState, toState);

  return calculatePricing({
    moveType: data.moveType,
    estimatedDistance: distance,
    inventory: data.inventory,
    addons: data.addons,
  });
}

// ─── Sidebar step list ────────────────────────────────────────────────────────
function SidebarSteps({ current, data }: { current: number; data: WizardData }) {
  const estimate = getLiveEstimate(data);
  const rangeHigh = estimate ? Math.round(estimate.total * 1.4) : null;

  return (
    <div className="bg-charcoal p-6 md:p-8 lg:p-10 flex flex-col h-full">
      {/* Brand mark */}
      <div className="mb-10 hidden lg:block">
        <div className="h-px bg-gradient-gold mb-6" />
        <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-1">EasyMove Elite</p>
        <p className="text-white/40 text-xs">Preliminary Estimate</p>
      </div>

      {/* Steps */}
      <ol className="space-y-0 flex-1">
        {STEPS.map((s, i) => {
          const num    = i + 1;
          const done   = num < current;
          const active = num === current;
          return (
            <li key={s.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300',
                  done   ? 'bg-gold text-white' :
                  active ? 'bg-white text-charcoal ring-2 ring-gold ring-offset-2 ring-offset-charcoal' :
                           'bg-white/10 text-white/30',
                )}>
                  {done ? <Check size={13} strokeWidth={2.5} /> : num}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn(
                    'w-px flex-1 my-2 min-h-[24px] transition-colors duration-300',
                    done ? 'bg-gold/40' : 'bg-white/10',
                  )} />
                )}
              </div>
              <div className="pb-6">
                <p className={cn(
                  'font-semibold text-sm leading-tight transition-colors duration-300',
                  active ? 'text-white' : done ? 'text-gold' : 'text-white/25',
                )}>
                  {s.label}
                </p>
                <p className={cn(
                  'text-xs mt-0.5 transition-colors duration-300 hidden sm:block',
                  active ? 'text-white/50' : 'text-white/20',
                )}>
                  {s.sub}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Live estimate panel */}
      <div className="hidden lg:block mb-6">
        {estimate ? (
          <div className="border border-gold/20 bg-gold/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={12} className="text-gold" />
              <p className="text-gold text-[10px] font-semibold uppercase tracking-wider">Live Estimate</p>
            </div>
            <p className="font-display text-2xl font-bold text-white mb-0.5">
              {formatCurrency(estimate.total)}+
            </p>
            {rangeHigh && (
              <p className="text-white/40 text-xs">
                Most similar moves: {formatCurrency(estimate.total)}–{formatCurrency(rangeHigh)}
              </p>
            )}
            {estimate.estimatedHours > 0 && (
              <p className="text-white/30 text-[10px] mt-2">
                {estimate.crewSize} movers · est. {estimate.estimatedHours} hrs
              </p>
            )}
            <p className="text-white/20 text-[10px] mt-1">Preliminary — updates as you go</p>
          </div>
        ) : (
          <div className="border border-white/10 p-4">
            <p className="text-white/25 text-xs">Your estimate will appear as you go</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="hidden lg:block pt-6 border-t border-white/10">
        <a href="tel:7863051844" className="inline-block text-gold text-xs font-semibold hover:text-gold-light transition-colors">
          Call or text: 786-305-1844
        </a>
        <p className="text-white/30 text-[10px] mt-1">Available today</p>
      </div>
    </div>
  );
}

// ─── Mobile sticky estimate bar — fixed above the call bar ───────────────────
function MobileEstimateBar({ data }: { data: WizardData }) {
  const estimate = getLiveEstimate(data);
  if (!estimate) return null;

  return (
    <div
      className="lg:hidden fixed bottom-14 left-0 right-0 z-30 flex items-center justify-between px-5 py-2"
      style={{
        backgroundColor: '#0b0b0b',
        borderTop: '1px solid rgba(212,160,23,0.35)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.6)',
        paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div className="flex items-baseline gap-2">
        <p style={{ color: '#d4a017', fontWeight: 700, fontSize: '18px', lineHeight: 1, fontFamily: 'var(--font-display, serif)' }}>
          {formatCurrency(estimate.total)}<span style={{ fontSize: '12px', fontWeight: 400, opacity: 0.6 }}>+</span>
        </p>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          est.
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', lineHeight: 1 }}>{estimate.crewSize} movers · {estimate.estimatedHours} hrs</p>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px', marginTop: '3px' }}>Preliminary</p>
      </div>
    </div>
  );
}

// ─── Mobile progress bar ──────────────────────────────────────────────────────
function MobileProgress({ current, total, data }: { current: number; total: number; data: WizardData }) {
  const pct     = Math.round(((current - 1) / (total - 1)) * 100);
  const micro   = STEP_MICRO[current] ?? '';
  const estimate = getLiveEstimate(data);

  return (
    <div className="lg:hidden bg-charcoal border-b border-white/10">
      <div className="px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-white/60 text-xs">
            Step <span className="text-gold font-semibold">{current}</span> of {total}
            {' — '}
            <span className="text-white">{STEPS[current - 1]?.label}</span>
          </p>
          <p className="text-white/30 text-[10px] mt-0.5">{micro}</p>
        </div>
        <div className="text-right">
          {estimate ? (
            <p className="text-gold text-sm font-bold">{formatCurrency(estimate.total)}+</p>
          ) : (
            <p className="text-white/30 text-xs">{pct}%</p>
          )}
        </div>
      </div>
      <div className="relative h-0.5 bg-white/10 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gold transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Wizard ───────────────────────────────────────────────────────────────────
export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(DEFAULT_DATA);
  const [submittedQuote, setSubmittedQuote] = useState<{
    id: string;
    pricing: { total: number; laborRate: number; truckFee: number; accessFee: number; addonsFee: number; discount: number; estimatedHours: number; crewSize: number; isLongDistance: boolean };
  } | null>(null);

  const update = (patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch }));
  const next   = () => setStep((s) => Math.min(s + 1, 6));
  const back   = () => setStep((s) => Math.max(s - 1, 1));

  async function handleSubmit() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30_000);
    try {
      console.log('[QuoteWizard] Submitting:', {
        moveType: data.moveType,
        homeSize: data.inventory.homeSize,
        from: data.fromCity || data.fromState,
        to: data.toCity || data.toState,
      });
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const payload = await res.json().catch(() => ({}));
      console.log('[QuoteWizard] Response:', res.status, res.ok ? 'OK' : (payload?.error ?? 'unknown error'));
      if (res.ok) {
        setSubmittedQuote(payload);
      } else {
        throw new Error(payload?.error ?? `Server error ${res.status}`);
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('[QuoteWizard] Submit failed:', err);
      throw err;
    }
  }

  if (submittedQuote) {
    return <QuoteSummary quote={submittedQuote} data={data} />;
  }

  const stepProps = { data, update, onNext: next, onBack: back };

  return (
    <>
      <div className="overflow-hidden border border-gray-100 shadow-luxury">
        <MobileProgress current={step} total={6} data={data} />
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-64 xl:w-72 shrink-0 hidden lg:block">
            <SidebarSteps current={step} data={data} />
          </div>
          <div className="flex-1 bg-white p-6 md:p-10 min-h-[400px] sm:min-h-[520px]">
            {step === 1 && <Step1MoveType {...stepProps} />}
            {step === 2 && <Step2HomeSize {...stepProps} />}
            {step === 3 && <Step3Locations {...stepProps} />}
            {step === 4 && <Step4Services {...stepProps} />}
            {step === 5 && <Step5Schedule {...stepProps} />}
            {step === 6 && <Step6Contact {...stepProps} onSubmit={handleSubmit} />}
          </div>
        </div>
      </div>
      <MobileEstimateBar data={data} />
    </>
  );
}
