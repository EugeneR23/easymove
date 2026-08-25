'use client';
import { useState } from 'react';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';
import { localStartingPrice, LD_MINIMUM, MIN_HOURS, PACKING_HOURLY_RATE } from '@/lib/pricing';
import type { HomeSize, CrewSize, MoveType } from '@/types';

const PACKING_HOURS: Record<HomeSize, number> = {
  studio: 3, '1br': 3, '2br': 4.5, '3br': 6, '4br+': 8, office: 5,
};
const packingStartingPrice = (size: HomeSize, crew: CrewSize) =>
  Math.round(PACKING_HOURLY_RATE[crew] * Math.max(MIN_HOURS, PACKING_HOURS[size]));

const MOVE_TYPES: { value: MoveType; label: string; sub: string }[] = [
  { value: 'local',         label: 'Local',         sub: 'Within South Florida' },
  { value: 'long-distance', label: 'Long Distance', sub: 'Out of state' },
  { value: 'packing-only',  label: 'Packing Only',  sub: 'We pack, you move' },
  { value: 'specialty',     label: 'Specialty',     sub: 'Piano · art · office' },
];

const HOME_SIZES: { value: HomeSize; label: string; hours: string }[] = [
  { value: 'studio', label: 'Studio',      hours: '3 hrs' },
  { value: '1br',    label: '1 Bedroom',   hours: '3 hrs' },
  { value: '2br',    label: '2 Bedrooms',  hours: '4.5 hrs' },
  { value: '3br',    label: '3 Bedrooms',  hours: '6 hrs' },
  { value: '4br+',   label: '4+ Bedrooms', hours: '8 hrs' },
  { value: 'office', label: 'Office',      hours: '5 hrs' },
];

export default function V2Calculator() {
  const [moveType, setMoveType] = useState<MoveType | null>(null);
  const [homeSize, setHomeSize] = useState<HomeSize | null>(null);
  const [crew, setCrew]         = useState<CrewSize>(2);

  const isLocal   = moveType === 'local';
  const isPacking = moveType === 'packing-only';
  const isLong    = moveType === 'long-distance';
  const isCustom  = moveType === 'specialty';
  const showSizes = (isLocal || isPacking) && true;

  const price = homeSize
    ? isPacking ? packingStartingPrice(homeSize, crew) : localStartingPrice(homeSize, crew)
    : null;

  const wizardHref = (() => {
    const p = new URLSearchParams();
    if (moveType) p.set('type', moveType);
    if (homeSize) p.set('size', homeSize);
    p.set('crew', String(crew));
    return `/quote?${p.toString()}`;
  })();

  const reset = () => { setMoveType(null); setHomeSize(null); setCrew(2); };

  return (
    <section id="estimate" className="bg-[#060608] border-t border-gold/15 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(201,168,76,0.08),transparent_55%)]" />
      <div className="relative max-w-5xl mx-auto px-6 py-20 sm:py-28">

        {/* heading */}
        <div className="mb-12">
          <p className="text-gold text-[10px] sm:text-xs font-semibold tracking-[0.5em] uppercase mb-5">
            The estimate · takes 30 seconds
          </p>
          <h2 className="text-white font-sans font-extrabold leading-[0.95] tracking-[-0.03em] text-5xl sm:text-7xl">
            KNOW YOUR<br /><span className="text-stroke-gold">NUMBER.</span>
          </h2>
          <p className="text-white/45 text-sm sm:text-base mt-5 max-w-md leading-relaxed">
            Two questions. A real starting price — no email gate, no callbacks required.
          </p>
        </div>

        {/* step 1 — move type */}
        <div className="mb-10">
          <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4">01 · Move type</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MOVE_TYPES.map((t) => {
              const sel = moveType === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => { setMoveType(t.value); if (t.value === 'long-distance' || t.value === 'specialty') setHomeSize(null); }}
                  className={cn(
                    'p-5 border text-left transition-all duration-200 group',
                    sel ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-gold/60 hover:bg-white/[0.03]',
                  )}
                >
                  <p className={cn('font-bold text-sm tracking-wide mb-1 transition-colors', sel ? 'text-gold' : 'text-white group-hover:text-gold')}>
                    {t.label}
                  </p>
                  <p className="text-white/35 text-xs">{t.sub}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* step 2 — home size (local / packing) */}
        {showSizes && (
          <div className="mb-10">
            <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4">02 · Home size</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HOME_SIZES.map((s) => {
                const sel = homeSize === s.value;
                const p = isPacking ? packingStartingPrice(s.value, crew) : localStartingPrice(s.value, crew);
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setHomeSize(s.value)}
                    className={cn(
                      'p-4 border text-left transition-all duration-200 group',
                      sel ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-gold/50 hover:bg-white/[0.03]',
                    )}
                  >
                    <p className={cn('font-bold text-sm mb-0.5', sel ? 'text-gold' : 'text-white group-hover:text-gold')}>{s.label}</p>
                    <p className="text-white/30 text-xs mb-2">{s.hours} est.</p>
                    <p className={cn('font-mono text-sm', sel ? 'text-gold' : 'text-white/50')}>from {formatCurrency(p)}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* step 3 — the number */}
        {(homeSize && (isLocal || isPacking)) && (
          <div className="border border-gold/25 bg-gold/[0.04] p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="text-white/35 text-[10px] tracking-[0.4em] uppercase mb-3">Your starting price</p>
                <p className="font-mono text-gold text-6xl sm:text-7xl leading-none tabular-nums">
                  {formatCurrency(price!)}<span className="text-2xl text-gold/60">+</span>
                </p>
                <p className="text-white/35 text-xs mt-3">
                  {MIN_HOURS}-hr minimum · {crew} {isPacking ? 'packers' : 'movers'}{isPacking ? ' · materials separate' : ' · truck included'}
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-3">Crew</p>
                <div className="flex md:justify-end gap-2">
                  {([2, 3, 4] as CrewSize[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCrew(c)}
                      className={cn(
                        'w-12 h-12 border font-mono text-sm transition-all',
                        crew === c ? 'border-gold bg-gold text-white' : 'border-white/15 text-white/50 hover:border-gold/60',
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <p className="text-white/25 text-[10px] mt-2">
                  ${crew === 2 ? (isPacking ? 79 : 129) : crew === 3 ? (isPacking ? 119 : 179) : (isPacking ? 159 : 229)}/hr
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gold/15">
              <Link href={wizardHref} className="bg-gold hover:bg-gold-dark text-white text-xs font-bold tracking-[0.25em] uppercase px-8 py-4 text-center transition-colors">
                Lock This Rate
              </Link>
              <a href="tel:7863051844" className="border border-white/20 hover:border-gold text-white hover:text-gold text-xs font-bold tracking-[0.25em] uppercase px-8 py-4 text-center transition-all">
                786-305-1844
              </a>
              <button type="button" onClick={reset} className="text-white/25 hover:text-white/60 text-xs transition-colors sm:ml-auto">
                Start over
              </button>
            </div>
          </div>
        )}

        {/* long distance / specialty */}
        {(isLong || isCustom) && (
          <div className="border border-gold/25 bg-gold/[0.04] p-6 sm:p-10">
            <p className="text-white/35 text-[10px] tracking-[0.4em] uppercase mb-3">
              {isLong ? 'Flat rate · dedicated truck' : 'Quoted individually'}
            </p>
            <p className="font-mono text-gold text-5xl sm:text-6xl leading-none tabular-nums">
              {isLong ? <>from {formatCurrency(LD_MINIMUM)}</> : 'Custom'}
            </p>
            <p className="text-white/40 text-sm mt-4 max-w-lg leading-relaxed">
              {isLong
                ? 'Depends on miles, volume and access at both ends. Written quote within 24 hours — your goods travel on a dedicated truck, never shared.'
                : 'Pianos, art collections, estates and offices are planned personally with your coordinator. Tell us about the move — we respond within hours.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href={wizardHref} className="bg-gold hover:bg-gold-dark text-white text-xs font-bold tracking-[0.25em] uppercase px-8 py-4 text-center transition-colors">
                Get Exact Quote
              </Link>
              <a href="tel:7863051844" className="border border-white/20 hover:border-gold text-white hover:text-gold text-xs font-bold tracking-[0.25em] uppercase px-8 py-4 text-center transition-all">
                786-305-1844
              </a>
            </div>
          </div>
        )}

        {/* idle hint */}
        {!moveType && (
          <p className="text-white/20 text-xs tracking-wide">Select a move type to reveal your price.</p>
        )}
      </div>
    </section>
  );
}
