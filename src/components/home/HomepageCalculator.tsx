'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, ChevronRight, Clock, Star, MapPin, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import { localStartingPrice } from '@/lib/pricing';
import type { HomeSize, CrewSize, MoveType } from '@/types';

// ─── Move type ────────────────────────────────────────────────────────────────
const MOVE_TYPES: { value: MoveType; label: string; sub: string }[] = [
  { value: 'local',         label: 'Local Move',    sub: 'Within South Florida' },
  { value: 'long-distance', label: 'Long Distance', sub: 'Out of state'         },
  { value: 'packing-only',  label: 'Packing Only',  sub: 'We pack, you move'    },
  { value: 'specialty',     label: 'Specialty',     sub: 'Piano, art, office'   },
];

// ─── Packing price helper ─────────────────────────────────────────────────────
const PACKING_HOURS: Record<HomeSize, number> = {
  studio: 3, '1br': 3, '2br': 4.5, '3br': 6, '4br+': 8, office: 5,
};
const PACKING_RATE: Record<CrewSize, number> = { 2: 79, 3: 119, 4: 159 };

function packingStartingPrice(size: HomeSize, crew: CrewSize): number {
  return Math.round(PACKING_RATE[crew] * Math.max(3, PACKING_HOURS[size]));
}

// ─── Home sizes ───────────────────────────────────────────────────────────────
const HOME_SIZES: { value: HomeSize; label: string; hours: string }[] = [
  { value: 'studio', label: 'Studio',      hours: '3 hrs' },
  { value: '1br',    label: '1 Bedroom',   hours: '3 hrs' },
  { value: '2br',    label: '2 Bedrooms',  hours: '4.5 hrs' },
  { value: '3br',    label: '3 Bedrooms',  hours: '6 hrs'   },
  { value: '4br+',   label: '4+ Bedrooms', hours: '8 hrs'   },
  { value: 'office', label: 'Office',      hours: '5 hrs'   },
];

// ─── Phase indicator ──────────────────────────────────────────────────────────
function PhaseTab({
  num, label, active, done,
}: { num: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all',
        done   ? 'bg-gold text-white' :
        active ? 'bg-white text-charcoal' :
                 'bg-white/10 text-white/40',
      )}>
        {done ? '✓' : num}
      </div>
      <span className={cn(
        'text-xs font-semibold uppercase tracking-wider transition-all hidden sm:inline',
        active ? 'text-white' : done ? 'text-gold' : 'text-white/30',
      )}>{label}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HomepageCalculator() {
  const [phase, setPhase]       = useState<1 | 2 | 3>(1);
  const [moveType, setMoveType] = useState<MoveType | null>(null);
  const [homeSize, setHomeSize] = useState<HomeSize | null>(null);
  const [crew, setCrew]         = useState<CrewSize>(2);

  const cardRef  = useRef<HTMLDivElement>(null);
  const isLocal    = moveType === 'local';
  const isCustom   = moveType === 'specialty';
  const isPacking  = moveType === 'packing-only';

  const price2 = homeSize ? localStartingPrice(homeSize, 2) : null;
  const price3 = homeSize ? localStartingPrice(homeSize, 3) : null;
  const selectedPrice        = homeSize ? localStartingPrice(homeSize, crew) : null;
  const selectedPackingPrice = homeSize ? packingStartingPrice(homeSize, crew) : null;

  function scrollToCard() {
    setTimeout(() => {
      if (!cardRef.current) return;
      const top = cardRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 30);
  }

  function selectMoveType(t: MoveType) {
    setMoveType(t);
    if (t === 'specialty' || t === 'long-distance') { setPhase(3); }
    else                                            { setPhase(2); }
    scrollToCard();
  }

  function getPackingWizardHref() {
    const params = new URLSearchParams();
    params.set('type', 'packing-only');
    if (homeSize) params.set('size', homeSize);
    params.set('crew', String(crew));
    return `/quote?${params.toString()}`;
  }

  function selectHomeSize(s: HomeSize) {
    setHomeSize(s);
    setPhase(3);
    scrollToCard();
  }

  function reset() {
    setPhase(1); setMoveType(null); setHomeSize(null); setCrew(2);
  }

  // Build query params to pre-fill wizard
  function getWizardHref() {
    const params = new URLSearchParams();
    if (moveType) params.set('type', moveType);
    if (homeSize) params.set('size', homeSize);
    params.set('crew', String(crew));
    return `/quote?${params.toString()}`;
  }

  const wizardHref = getWizardHref();

  return (
    <section className="bg-charcoal section-padding relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.06)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-gold opacity-60" />

      <div className="container-max relative">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Instant Estimate</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Get Your Moving Price in Seconds
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Answer 2 questions and see your starting price right away. No obligation, no hidden fees — a real coordinator confirms the final number.
          </p>
        </div>

        {/* Calculator card */}
        <div className="max-w-3xl mx-auto" ref={cardRef}>
          <div className="bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm">

            {/* Phase nav strip */}
            <div className="bg-black/20 px-4 sm:px-6 py-3.5 flex items-center gap-3 sm:gap-6 border-b border-white/10">
              <PhaseTab num={1} label="Move Type" active={phase === 1} done={phase > 1 && moveType !== null} />
              <ChevronRight size={12} className="text-white/20 shrink-0" />
              <PhaseTab num={2} label="Home Size"  active={phase === 2} done={phase > 2 && homeSize !== null} />
              <ChevronRight size={12} className="text-white/20 shrink-0" />
              <PhaseTab num={3} label="Your Price" active={phase === 3} done={false} />
            </div>

            {/* Phase content */}
            <div className="p-5 sm:p-6 md:p-10">

              {/* ── Phase 1: Move type ── */}
              {phase === 1 && (
                <div>
                  <p className="text-white/60 text-sm mb-6">Select the type of move you need</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {MOVE_TYPES.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => selectMoveType(t.value)}
                        className="group p-5 border border-white/10 text-left hover:border-gold hover:bg-gold/5 transition-all duration-200"
                      >
                        <p className="text-white font-semibold text-sm mb-1 group-hover:text-gold transition-colors">
                          {t.label}
                        </p>
                        <p className="text-white/40 text-xs">{t.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Phase 2: Home size (local + packing) ── */}
              {phase === 2 && (isLocal || isPacking) && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">
                        {isPacking ? 'Packing Only' : 'Local Move'}
                      </p>
                      <p className="text-white/60 text-sm">Select your home size to see starting price</p>
                    </div>
                    <button onClick={reset} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                      ← Change
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {HOME_SIZES.map((s) => {
                      const p = isPacking
                        ? packingStartingPrice(s.value, crew)
                        : localStartingPrice(s.value, crew);
                      const selected = homeSize === s.value;
                      return (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => selectHomeSize(s.value)}
                          className={cn(
                            'p-4 border text-left transition-all duration-200 group',
                            selected
                              ? 'border-gold bg-gold/10'
                              : 'border-white/10 hover:border-gold/50 hover:bg-white/5',
                          )}
                        >
                          <p className={cn('font-semibold text-sm mb-0.5 transition-colors', selected ? 'text-gold' : 'text-white group-hover:text-gold')}>
                            {s.label}
                          </p>
                          <p className="text-white/30 text-xs mb-2">{s.hours} est.</p>
                          <p className={cn('text-xs font-bold', selected ? 'text-gold' : 'text-white/50')}>
                            from {formatCurrency(p)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Phase 3: Price reveal ── */}
              {phase === 3 && (
                <div>
                  {isCustom ? (
                    /* Specialty / office — custom quote */
                    <div className="text-center py-4">
                      <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-4">Specialty Move</p>
                      <p className="font-display text-3xl font-bold text-white mb-3">Quoted Individually</p>
                      <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                        Specialty, office, and estate moves are priced after a brief consultation with your coordinator. Tell us about your move and we&apos;ll get back to you within a few hours.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/quote?type=specialty">
                          <span className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 text-sm font-semibold hover:bg-gold-dark transition-colors">
                            Request a Quote <ArrowRight size={15} />
                          </span>
                        </Link>
                        <a href="tel:7863051844" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 text-sm font-semibold hover:border-gold hover:text-gold transition-all">
                          Call 786-305-1844
                        </a>
                      </div>
                      <button onClick={reset} className="mt-6 text-white/30 hover:text-white/60 text-xs transition-colors">
                        ← Start over
                      </button>
                    </div>
                  ) : (
                    /* Local / long-distance — show price */
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">
                            {isLocal ? 'Local Move' : 'Long Distance'} · {HOME_SIZES.find(s => s.value === homeSize)?.label}
                          </p>
                          <p className="text-white/60 text-sm">Your starting price estimate</p>
                        </div>
                        <button onClick={reset} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                          ← Start over
                        </button>
                      </div>

                      {isPacking && homeSize ? (
                        <>
                          {/* Crew toggle — packing */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            {([2, 3, 4] as CrewSize[]).map((c) => {
                              const p = packingStartingPrice(homeSize, c);
                              const sel = crew === c;
                              return (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => setCrew(c)}
                                  className={cn(
                                    'p-4 border transition-all text-left',
                                    sel ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-gold/40',
                                  )}
                                >
                                  <p className={cn('font-semibold text-sm mb-0.5', sel ? 'text-gold' : 'text-white')}>
                                    {c} Packers
                                  </p>
                                  <p className="text-white/40 text-xs mb-2">
                                    ${c === 2 ? '79' : c === 3 ? '119' : '159'}/hr · 3-hr minimum
                                  </p>
                                  <p className={cn('font-bold text-lg', sel ? 'text-gold' : 'text-white/50')}>
                                    {formatCurrency(p)}
                                  </p>
                                </button>
                              );
                            })}
                          </div>

                          {/* Big price */}
                          <div className="bg-black/30 border border-gold/20 p-6 mb-6 flex items-center justify-between">
                            <div>
                              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Starting from</p>
                              <p className="font-display text-4xl font-bold text-gold">{formatCurrency(selectedPackingPrice!)}</p>
                              <p className="text-white/40 text-xs mt-1">3-hr minimum · {crew} packers · materials not included</p>
                            </div>
                            <div className="text-right hidden sm:block">
                              <p className="text-white/30 text-xs">Preliminary estimate</p>
                              <p className="text-white/30 text-xs">Final price confirmed</p>
                              <p className="text-white/30 text-xs">before appointment</p>
                            </div>
                          </div>

                          {/* Scarcity — show after price reveal */}
                          <div className="flex items-center gap-2 mt-3 mb-4">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 animate-pulse" />
                            <p className="text-white/50 text-xs">
                              Spring season filling fast — same-week slots available now.
                            </p>
                          </div>

                          {/* CTA */}
                          <div className="border border-gold/20 bg-black/20 p-5 mb-4">
                            <p className="text-white font-display font-semibold text-lg mb-1">Book Your Packing Service</p>
                            <p className="text-white/50 text-xs mb-4 leading-relaxed">
                              Tell us a bit more and a coordinator will confirm your final price.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Link href={getPackingWizardHref()} className="flex-1">
                                <span className="flex items-center justify-center gap-2 bg-gold text-white px-6 py-3.5 text-sm font-semibold hover:bg-gold-dark transition-colors w-full">
                                  Get My FREE Quote <ArrowRight size={15} />
                                </span>
                              </Link>
                              <a href="tel:7863051844" className="flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold transition-all">
                                Call 786-305-1844
                              </a>
                            </div>
                          </div>
                          <button onClick={reset} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                            ← Start over
                          </button>
                        </>
                      ) : isLocal && homeSize ? (
                        <>
                          {/* Crew toggle */}
                          <div className="grid grid-cols-3 gap-3 mb-6">
                            {([2, 3, 4] as CrewSize[]).map((c) => {
                              const p = localStartingPrice(homeSize, c);
                              const sel = crew === c;
                              return (
                                <button
                                  key={c}
                                  type="button"
                                  onClick={() => setCrew(c)}
                                  className={cn(
                                    'p-4 border transition-all text-left',
                                    sel ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-gold/40',
                                  )}
                                >
                                  <p className={cn('font-semibold text-sm mb-0.5', sel ? 'text-gold' : 'text-white')}>
                                    {c} Movers
                                  </p>
                                  <p className="text-white/40 text-xs mb-2">
                                    ${c === 2 ? '129' : c === 3 ? '179' : '229'}/hr · $90 truck
                                  </p>
                                  <p className={cn('font-bold text-lg', sel ? 'text-gold' : 'text-white/50')}>
                                    {formatCurrency(p)}
                                  </p>
                                </button>
                              );
                            })}
                          </div>

                          {/* Big price */}
                          <div className="bg-black/30 border border-gold/20 p-6 mb-6 flex items-center justify-between">
                            <div>
                              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Starting from</p>
                              <p className="font-display text-4xl font-bold text-gold">{formatCurrency(selectedPrice!)}</p>
                              <p className="text-white/40 text-xs mt-1">3-hr minimum · {crew} movers · truck included</p>
                            </div>
                            <div className="text-right hidden sm:block">
                              <p className="text-white/30 text-xs">Preliminary estimate</p>
                              <p className="text-white/30 text-xs">Final price confirmed</p>
                              <p className="text-white/30 text-xs">after move review</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Long distance */
                        <div className="bg-black/30 border border-gold/20 p-6 mb-6 text-center">
                          <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Starting from</p>
                          <p className="font-display text-4xl font-bold text-gold mb-1">$1,500+</p>
                          <p className="text-white/40 text-xs">Based on distance, home size &amp; access — confirmed after review</p>
                        </div>
                      )}

                      {/* Scarcity — show after price reveal */}
                      <div className="flex items-center gap-2 mt-3 mb-4">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 animate-pulse" />
                        <p className="text-white/50 text-xs">
                          Spring season filling fast — same-week slots available now.
                        </p>
                      </div>

                      {/* CTA block */}
                      <div className="border border-gold/20 bg-black/20 p-5 mb-4">
                        <p className="text-white font-display font-semibold text-lg mb-1">
                          Talk to a Move Coordinator
                        </p>
                        <p className="text-white/50 text-xs mb-4 leading-relaxed">
                          A real coordinator — not an automated system — reviews your details and confirms a final price.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link href={wizardHref} className="flex-1">
                            <span className="flex items-center justify-center gap-2 bg-gold text-white px-6 py-3.5 text-sm font-semibold hover:bg-gold-dark transition-colors w-full">
                              Get My FREE Quote <ArrowRight size={15} />
                            </span>
                          </Link>
                          <a
                            href="tel:7863051844"
                            className="flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold transition-all"
                          >
                            Call 786-305-1844
                          </a>
                        </div>
                      </div>

                      {/* Microcopy row */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-white/40 text-[10px]">No obligation</span>
                        <span className="text-white/20">·</span>
                        <span className="text-white/40 text-[10px]">Fast response</span>
                        <span className="text-white/20">·</span>
                        <span className="text-white/40 text-[10px]">Fully insured</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-x-6 gap-y-2 mt-6 flex-wrap">
            {[
              { icon: Shield,       text: 'Fully insured · COI available' },
              { icon: CheckCircle,  text: 'Experienced with condos & high-rises' },
              { icon: MapPin,       text: 'Miami-Dade · Broward · Palm Beach' },
              { icon: Clock,        text: 'Coordinator responds within hours' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={11} className="text-gold/60 shrink-0" />
                <span className="text-white/35 text-[11px]">{text}</span>
              </div>
            ))}
          </div>

          {/* Why clients choose us */}
          <div className="mt-10 pt-10 border-t border-white/10">
            <p className="text-center text-white/25 text-[10px] uppercase tracking-[0.25em] mb-6">Why clients choose us</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { icon: Star,        label: 'Careful handling',      sub: 'Every item wrapped & protected'    },
                { icon: Clock,       label: 'On-time crews',         sub: 'Arrival windows you can count on'  },
                { icon: Shield,      label: 'Transparent pricing',   sub: 'No surprise fees on moving day'    },
                { icon: MapPin,      label: 'Local expertise',       sub: 'We know South Florida buildings'   },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="w-8 h-8 border border-white/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={14} className="text-gold/50" />
                  </div>
                  <p className="text-white/60 text-xs font-semibold mb-1">{label}</p>
                  <p className="text-white/25 text-[10px] leading-snug">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
