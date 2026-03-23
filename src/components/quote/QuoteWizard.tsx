'use client';
import { useState, useRef, useEffect } from 'react';
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
import StepPackingMaterials from './Step_PackingMaterials';
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

const DEFAULT_STEPS = [
  { label: 'Move Type',  sub: 'Local, long-distance, specialty' },
  { label: 'Home Size',  sub: 'Crew size & starting price'      },
  { label: 'Locations',  sub: 'Pickup & delivery details'       },
  { label: 'Add-ons',    sub: 'Packing, storage, and more'      },
  { label: 'Date',       sub: 'Preferred move date'             },
  { label: 'Contact',    sub: 'Name, email, phone'              },
];

const PACKING_STEPS = [
  { label: 'Service',   sub: 'Packing only'          },
  { label: 'Home Size', sub: 'Number of rooms'        },
  { label: 'Materials', sub: 'Boxes & supplies'       },
  { label: 'Date',      sub: 'Preferred packing date' },
  { label: 'Contact',   sub: 'Name, email, phone'     },
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
  // No travel surcharge until cities are entered in step 3 — keeps sidebar estimate consistent with homepage calculator
  const distance  = data.moveType === 'local'
    ? 0
    : estimateDistance(fromState, toState);

  return calculatePricing({
    moveType: data.moveType,
    estimatedDistance: distance,
    fromCity: data.fromCity || undefined,
    toCity:   data.toCity   || undefined,
    inventory: data.inventory,
    addons: data.addons,
  });
}

// ─── Sidebar step list ────────────────────────────────────────────────────────
function SidebarSteps({ current, data, steps }: { current: number; data: WizardData; steps: { label: string; sub: string }[] }) {
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
        {steps.map((s, i) => {
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
                {i < steps.length - 1 && (
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

      {/* Social proof snippet */}
      <div className="hidden lg:block mb-6 border border-white/8 bg-white/[0.03] p-4">
        <div className="flex gap-0.5 mb-2">
          {[1,2,3,4,5].map(i => (
            <svg key={i} className="w-3 h-3 fill-gold text-gold" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          ))}
        </div>
        <p className="text-white/60 text-[11px] leading-relaxed italic">
          &ldquo;Professional, on time, and no hidden fees. Exactly what I needed.&rdquo;
        </p>
        <p className="text-white/30 text-[10px] mt-1.5">— Maria S., Brickell · Feb 2025</p>
      </div>

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
      className="lg:hidden fixed bottom-14 left-0 right-0 z-30 flex items-center justify-between px-5 overflow-hidden"
      style={{
        height: '44px',
        backgroundColor: '#0b0b0b',
        borderTop: '1px solid rgba(212,160,23,0.35)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.6)',
      }}
    >
      <div className="flex items-baseline gap-1.5">
        <p style={{ color: '#d4a017', fontWeight: 700, fontSize: '18px', lineHeight: 1, fontFamily: 'var(--font-display, serif)' }}>
          {formatCurrency(estimate.total)}<span style={{ fontSize: '11px', fontWeight: 400, opacity: 0.6 }}>+</span>
        </p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>est.</p>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
        {estimate.crewSize} movers · {estimate.estimatedHours} hrs
      </p>
    </div>
  );
}

// ─── Mobile progress bar ──────────────────────────────────────────────────────
function MobileProgress({ current, total, data, steps }: { current: number; total: number; data: WizardData; steps: { label: string; sub: string }[] }) {
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
            <span className="text-white">{steps[current - 1]?.label}</span>
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
    pricing: { total: number; laborRate: number; truckFee: number; accessFee: number; addonsFee: number; travelFee: number; travelMiles: number; travelMinutes: number; discount: number; estimatedHours: number; crewSize: number; isLongDistance: boolean };
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // ── Restore from sessionStorage on mount ──────────────────────────────────
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('quoteWizardData');
      if (saved) {
        const { data: savedData, step: savedStep } = JSON.parse(saved);
        if (savedData && savedStep) {
          setData({ ...DEFAULT_DATA, ...savedData });
          setStep(savedStep);
        }
      }
    } catch { /* ignore parse errors */ }
  }, []);

  // ── Persist to sessionStorage on every change ─────────────────────────────
  useEffect(() => {
    if (submittedQuote) {
      sessionStorage.removeItem('quoteWizardData');
      return;
    }
    try {
      sessionStorage.setItem('quoteWizardData', JSON.stringify({ data, step }));
    } catch { /* ignore quota errors */ }
  }, [data, step, submittedQuote]);

  function scrollToWizard() {
    setTimeout(() => {
      if (!containerRef.current) return;
      const top = containerRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 30);
  }

  useEffect(() => {
    if (submittedQuote) {
      // Jump to top instantly — no animation, prevents jarring mid-page scroll
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [submittedQuote]);

  const isPacking  = data.moveType === 'packing-only';
  const totalSteps = isPacking ? 5 : 6;
  const activeSteps = isPacking ? PACKING_STEPS : DEFAULT_STEPS;

  const update = (patch: Partial<WizardData>) => setData((d) => ({ ...d, ...patch }));
  const next   = () => { setStep((s) => Math.min(s + 1, totalSteps)); scrollToWizard(); };
  const back   = () => { setStep((s) => Math.max(s - 1, 1)); scrollToWizard(); };

  async function handleSubmit() {
    // 55s timeout — Vercel Hobby functions cut off at 60s.
    // Mobile LTE can add 10–20s on top of server processing.
    const TIMEOUT_MS = 55_000;
    const controller = new AbortController();
    const timeoutId  = setTimeout(() => {
      console.warn('[QuoteWizard] Aborting fetch after', TIMEOUT_MS / 1000, 's — network too slow');
      controller.abort();
    }, TIMEOUT_MS);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const tag = isMobile ? '[QuoteWizard][mobile]' : '[QuoteWizard][desktop]';

    console.log(tag, 'handleSubmit fired — payload:', {
      moveType:  data.moveType,
      homeSize:  data.inventory.homeSize,
      fromCity:  data.fromCity  || data.fromState,
      toCity:    data.toCity    || data.toState,
      firstName: data.firstName || '(empty)',
      lastName:  data.lastName  || '(empty)',
      email:     data.email     || '(empty)',
      phone:     data.phone     || '(empty)',
    });

    try {
      const bodyStr = JSON.stringify(data);
      console.log(tag, 'fetch → POST /api/quotes, body size:', bodyStr.length, 'bytes');

      const res = await fetch('/api/quotes', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    bodyStr,
        signal:  controller.signal,
      });

      clearTimeout(timeoutId);
      console.log(tag, 'fetch resolved — status:', res.status, res.statusText);

      const payload = await res.json().catch((parseErr) => {
        console.warn(tag, 'Could not parse response JSON:', parseErr);
        return {};
      });

      console.log(tag, 'response payload:', JSON.stringify(payload).slice(0, 200));

      if (res.ok) {
        console.log(tag, 'SUCCESS — triggering QuoteSummary');
        setSubmittedQuote(payload);
      } else {
        const msg = payload?.error ?? `Server error ${res.status}`;
        console.error(tag, 'Non-OK response:', res.status, msg);
        throw new Error(msg);
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.error(tag, 'Submit failed:', err instanceof Error ? err.message : err);
      throw err;
    }
  }

  const stepProps = { data, update, onNext: next, onBack: back };

  return (
    <>
      <div ref={containerRef} className="overflow-hidden border border-gray-100 shadow-luxury">
        {submittedQuote ? (
          <QuoteSummary quote={submittedQuote} data={data} embedded />
        ) : (
          <>
            <MobileProgress current={step} total={totalSteps} data={data} steps={activeSteps} />
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-64 xl:w-72 shrink-0 hidden lg:block">
                <SidebarSteps current={step} data={data} steps={activeSteps} />
              </div>
              <div className="flex-1 bg-white p-6 md:p-10 min-h-[400px] sm:min-h-[520px]">
                {step === 1 && <Step1MoveType {...stepProps} />}
                {step === 2 && <Step2HomeSize {...stepProps} />}
                {/* Packing-only flow: Materials → Schedule → Contact */}
                {step === 3 && isPacking  && <StepPackingMaterials {...stepProps} />}
                {step === 4 && isPacking  && <Step5Schedule {...stepProps} />}
                {step === 5 && isPacking  && <Step6Contact {...stepProps} onSubmit={handleSubmit} />}
                {/* Standard flow: Locations → Add-ons → Schedule → Contact */}
                {step === 3 && !isPacking && <Step3Locations {...stepProps} />}
                {step === 4 && !isPacking && <Step4Services {...stepProps} />}
                {step === 5 && !isPacking && <Step5Schedule {...stepProps} />}
                {step === 6 && !isPacking && <Step6Contact {...stepProps} onSubmit={handleSubmit} />}
              </div>
            </div>
          </>
        )}
      </div>
      {!submittedQuote && <MobileEstimateBar data={data} />}
    </>
  );
}
