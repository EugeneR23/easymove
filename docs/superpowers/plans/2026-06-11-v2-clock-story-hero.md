# /v2 Clock-Story Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/v2` — a cinematic noir, scroll-driven giant-clock storytelling page (spec: `docs/superpowers/specs/2026-06-11-v2-clock-story-hero-design.md`). Production homepage untouched.

**Architecture:** One new route (`src/app/v2/page.tsx`) composed of three new client components in `src/components/v2/` plus the existing `Footer`. All scroll animation via `motion/react` (`useScroll` + `useTransform`) bound to a 520vh container with a sticky 100vh stage. Transform/opacity-only animation. `noindex`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, motion/react (already installed), next/image.

---

### Task 1: V2Header

**Files:**
- Create: `src/components/v2/V2Header.tsx`

- [ ] **Step 1: Create component**

```tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';

export default function V2Header() {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'America/New_York',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 140], ['rgba(6,6,8,0)', 'rgba(6,6,8,0.88)']);
  const borderOpacity = useTransform(scrollY, [0, 140], [0, 1]);

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <motion.div style={{ opacity: borderOpacity }} className="absolute bottom-0 left-0 right-0 h-px bg-gold/25" />
      <div className="flex items-center justify-between px-5 sm:px-10 h-16">
        <Link href="/" className="text-white font-display font-bold tracking-[0.25em] text-sm">
          EASYMOVE <span className="text-gold">ELITE</span>
        </Link>
        <div className="hidden md:flex items-baseline gap-2 select-none" aria-hidden="true">
          <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase">Miami</span>
          <span className="text-gold font-mono text-sm tabular-nums">{time}</span>
          <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase">EST</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:7863051844" className="hidden sm:block text-white/70 hover:text-gold text-sm transition-colors">786-305-1844</a>
          <Link
            href="/quote"
            className="bg-gold hover:bg-gold-dark text-charcoal text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 transition-colors"
          >
            Get Private Quote
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
```

- [ ] **Step 2: Type check** — Run: `npx tsc --noEmit`. Expected: clean.
  (Note: `gold-dark` exists in tailwind config — verify with `grep gold-dark tailwind.config.ts`; if absent use `hover:opacity-90`.)

### Task 2: ClockStoryHero (centerpiece)

**Files:**
- Create: `src/components/v2/ClockStoryHero.tsx`

- [ ] **Step 1: Create component** — full code:

```tsx
'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';

// ── Scenes of moving day ───────────────────────────────────────────────────────
const SCENES = [
  {
    time: '08:00', meridiem: 'AM', label: 'Scene 01 · Arrival',
    headline: ['THE CREW', 'ARRIVES.'],
    sub: 'On the minute. Walk-through, floor protection, a plan confirmed before a single box moves.',
    photo: '/images/Real/8.jpg',
    alt: 'EasyMove Elite truck and packed boxes at a South Florida home at 8 AM',
  },
  {
    time: '09:30', meridiem: 'AM', label: 'Scene 02 · Protection',
    headline: ['WRAPPED LIKE', "IT'S OURS."],
    sub: 'Every edge padded, every surface film-wrapped. White-glove is not a buzzword — it is the procedure.',
    photo: '/images/Real/10.png',
    alt: 'Professional movers wrapping furniture in protective film',
  },
  {
    time: '01:00', meridiem: 'PM', label: 'Scene 03 · Loading',
    headline: ['LOADED LIKE', 'A VAULT.'],
    sub: 'Engineered stacking, strapped tiers, zero shifting in transit. Your estate travels first class.',
    photo: '/images/Real/2.png',
    alt: 'Boxes and wrapped furniture loaded securely inside the moving truck',
  },
  {
    time: '06:00', meridiem: 'PM', label: 'Scene 04 · Home',
    headline: ['SAME DAY.', 'NEW ADDRESS.'],
    sub: 'Placed, unwrapped, reassembled. Sunset over the skyline — and your life already in its place.',
    photo: '/images/Real/9.jpg',
    alt: 'Wrapped furniture delivered to a Miami high-rise with skyline view',
    cta: true,
  },
] as const;

const INTRO_END = 0.16;                    // scroll progress where intro hands off
const SCENE_SPAN = (1 - INTRO_END) / SCENES.length;

// Window for scene i: fade in/out inside its span
function sceneWindow(i: number): [number, number, number, number] {
  const start = INTRO_END + i * SCENE_SPAN;
  const end = start + SCENE_SPAN;
  return [start, start + SCENE_SPAN * 0.22, end - SCENE_SPAN * 0.22, end];
}

// ── Giant clock ────────────────────────────────────────────────────────────────
const NUMERALS = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

function GiantClock({ progress }: { progress: MotionValue<number> }) {
  // 08:00 → 18:00 = 10 hours = 300° of hour-hand travel (starts at 240°)
  const hourAngle   = useTransform(progress, [INTRO_END, 1], [240, 540], { clamp: true });
  const minuteAngle = useTransform(hourAngle, (a) => a * 12);
  const drift       = useTransform(progress, [0, 1], [0, -120]); // slow parallax drift

  return (
    <motion.div
      style={{ y: drift }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[26%]
                 w-[150vw] h-[150vw] max-w-[1100px] max-h-[1100px] md:w-[60vw] md:h-[60vw]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full border border-gold/20" />
      <div className="absolute inset-[7%] rounded-full border border-gold/10" />
      {NUMERALS.map((n, i) => {
        const a = (i * 30 - 90) * (Math.PI / 180);
        return (
          <span
            key={n}
            className="absolute font-display text-gold/50 text-base md:text-2xl select-none"
            style={{
              left: `${50 + 46 * Math.cos(a)}%`,
              top: `${50 + 46 * Math.sin(a)}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {n}
          </span>
        );
      })}
      {/* hour hand */}
      <motion.div
        style={{ rotate: hourAngle }}
        className="absolute left-1/2 top-1/2 w-[3px] -ml-[1.5px] h-[27%] origin-top"
      >
        <div className="w-full h-full bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
      {/* minute hand */}
      <motion.div
        style={{ rotate: minuteAngle }}
        className="absolute left-1/2 top-1/2 w-px h-[38%] origin-top"
      >
        <div className="w-full h-full bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
      <div className="absolute left-1/2 top-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_24px_rgba(201,168,76,0.6)]" />
    </motion.div>
  );
}

// ── One scene layer ────────────────────────────────────────────────────────────
function Scene({ scene, index, progress }: {
  scene: (typeof SCENES)[number]; index: number; progress: MotionValue<number>;
}) {
  const [a, b, c, d] = sceneWindow(index);
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const photoY  = useTransform(progress, [a, d], [80, -80]);
  const copyY   = useTransform(progress, [a, d], [40, -40]);
  const scale   = useTransform(progress, [a, d], [1.08, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center pointer-events-none">
      {/* photo — right side on desktop, backdrop on mobile */}
      <motion.div
        style={{ y: photoY, scale }}
        className="absolute inset-0 md:left-[44%] md:inset-y-[10%] md:right-[5%]"
      >
        <div className="relative w-full h-full md:shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden">
          <Image
            src={scene.photo}
            alt={scene.alt}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover opacity-30 md:opacity-90"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608]/60 md:bg-gradient-to-r md:from-[#060608] md:via-transparent md:to-transparent" />
        </div>
      </motion.div>

      {/* copy */}
      <motion.div style={{ y: copyY }} className="relative z-10 px-6 sm:px-12 md:pl-[8%] max-w-xl">
        <p className="text-gold text-[10px] sm:text-xs font-semibold tracking-[0.45em] uppercase mb-4">{scene.label}</p>
        <div className="flex items-baseline gap-3 mb-5">
          <span className="font-mono text-gold text-4xl sm:text-5xl tabular-nums">{scene.time}</span>
          <span className="text-white/40 text-sm tracking-[0.3em]">{scene.meridiem}</span>
        </div>
        <h2 className="text-white font-sans font-extrabold leading-[0.93] tracking-[-0.03em] text-[13vw] sm:text-7xl lg:text-8xl">
          {scene.headline[0]}<br />
          <span className="text-stroke-gold">{scene.headline[1]}</span>
        </h2>
        <p className="text-white/55 text-sm sm:text-base leading-relaxed mt-6 max-w-md">{scene.sub}</p>
        {'cta' in scene && scene.cta && (
          <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
            <Link href="/quote" className="bg-gold hover:bg-gold-dark text-charcoal text-xs font-bold tracking-[0.25em] uppercase px-8 py-4 transition-colors">
              Plan My Day
            </Link>
            <a href="tel:7863051844" className="border border-white/25 hover:border-gold text-white hover:text-gold text-xs font-bold tracking-[0.25em] uppercase px-8 py-4 transition-all">
              786-305-1844
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Intro layer ────────────────────────────────────────────────────────────────
function Intro({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, INTRO_END * 0.7], [1, 0]);
  const y = useTransform(progress, [0, INTRO_END], [0, -120]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <p className="text-gold/90 text-[10px] sm:text-xs font-semibold tracking-[0.5em] uppercase mb-6">
        Miami&apos;s private moving atelier
      </p>
      <h1 className="text-white font-sans font-extrabold leading-[0.9] tracking-[-0.035em] text-[17vw] md:text-[9.5rem]">
        ONE DAY.<br />
        <span className="text-stroke-gold">ZERO CHAOS.</span>
      </h1>
      <p className="text-white/50 text-sm sm:text-base mt-8 max-w-md leading-relaxed">
        Your entire move — planned, executed and finished between sunrise and sunset. Scroll the day.
      </p>
      <div className="mt-12 flex flex-col items-center gap-3" aria-hidden="true">
        <span className="text-white/35 text-[10px] tracking-[0.45em] uppercase">Scroll the day</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
        />
      </div>
    </motion.div>
  );
}

// ── Progress rail ──────────────────────────────────────────────────────────────
function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, INTRO_END, INTRO_END + 0.02, 0.98, 1], [0, 0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity }} className="absolute bottom-6 left-6 sm:left-12 z-20 flex items-center gap-3" aria-hidden="true">
      {SCENES.map((s, i) => {
        const [a, , , d] = sceneWindow(i);
        return <Bar key={s.time} progress={progress} a={a} d={d} />;
      })}
      <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase ml-2">The day · 08:00 — 18:00</span>
    </motion.div>
  );
}
function Bar({ progress, a, d }: { progress: MotionValue<number>; a: number; d: number }) {
  const fill = useTransform(progress, [a, d], ['0%', '100%'], { clamp: true });
  return (
    <div className="w-9 h-[3px] bg-white/12 overflow-hidden">
      <motion.div style={{ width: fill }} className="h-full bg-gold" />
    </div>
  );
}

// ── Reduced-motion fallback: static stacked scenes ─────────────────────────────
function StaticStory() {
  return (
    <div className="bg-[#060608]">
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-24">
        <h1 className="text-white font-sans font-extrabold leading-[0.9] tracking-[-0.035em] text-[15vw] md:text-8xl">
          ONE DAY.<br /><span className="text-stroke-gold">ZERO CHAOS.</span>
        </h1>
      </div>
      {SCENES.map((s) => (
        <div key={s.time} className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gold text-xs tracking-[0.45em] uppercase mb-3">{s.label}</p>
            <p className="font-mono text-gold text-4xl mb-4">{s.time} <span className="text-white/40 text-sm">{s.meridiem}</span></p>
            <h2 className="text-white font-extrabold text-4xl leading-tight">{s.headline.join(' ')}</h2>
            <p className="text-white/55 mt-4">{s.sub}</p>
          </div>
          <div className="relative aspect-[4/3]">
            <Image src={s.photo} alt={s.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function ClockStoryHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  if (reduced) return <StaticStory />;

  return (
    <section ref={containerRef} className="relative h-[520vh] bg-[#060608]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,168,76,0.07),transparent_55%)]" />
        <GiantClock progress={scrollYProgress} />
        <Intro progress={scrollYProgress} />
        {SCENES.map((s, i) => (
          <Scene key={s.time} scene={s} index={i} progress={scrollYProgress} />
        ))}
        <ProgressRail progress={scrollYProgress} />
        {/* film grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-grain" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `text-stroke-gold` + `bg-grain` utilities** — Modify `src/app/globals.css` (append outside @layer):

```css
/* /v2 cinematic utilities */
.text-stroke-gold {
  color: transparent;
  -webkit-text-stroke: 1.5px #C9A84C;
}
.bg-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

- [ ] **Step 3: Type check** — `npx tsc --noEmit`, expected clean.

### Task 3: V2CTA + page

**Files:**
- Create: `src/components/v2/V2CTA.tsx`
- Create: `src/app/v2/page.tsx`

- [ ] **Step 1: V2CTA** (server component — pricing from real rate tables):

```tsx
import Link from 'next/link';
import { localStartingPrice, LD_MINIMUM } from '@/lib/pricing';
import { formatCurrency } from '@/lib/utils';

export default function V2CTA() {
  return (
    <section className="bg-[#060608] border-t border-gold/15 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(201,168,76,0.10),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center">
        <p className="text-gold text-[10px] sm:text-xs font-semibold tracking-[0.5em] uppercase mb-6">The estimate is the easy part</p>
        <h2 className="text-white font-sans font-extrabold leading-[0.95] tracking-[-0.03em] text-5xl sm:text-7xl mb-8">
          YOUR MOVE,<br /><span className="text-stroke-gold">TO THE MINUTE.</span>
        </h2>
        <p className="text-white/50 max-w-lg mx-auto leading-relaxed mb-4">
          Local moves from {formatCurrency(localStartingPrice('studio'))} · long-distance from {formatCurrency(LD_MINIMUM)}.
          A real coordinator confirms every number in writing — before the truck rolls.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link href="/quote" className="bg-gold hover:bg-gold-dark text-charcoal text-xs font-bold tracking-[0.25em] uppercase px-10 py-5 transition-colors">
            Get My Private Quote
          </Link>
          <a href="tel:7863051844" className="border border-white/25 hover:border-gold text-white hover:text-gold text-xs font-bold tracking-[0.25em] uppercase px-10 py-5 transition-all">
            Call 786-305-1844
          </a>
        </div>
        <p className="text-white/25 text-xs mt-10 tracking-wide">
          Fully insured · COI within 24h · Owner-led crews · Miami-Dade — Broward — Palm Beach
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: page.tsx**:

```tsx
import type { Metadata } from 'next';
import V2Header from '@/components/v2/V2Header';
import ClockStoryHero from '@/components/v2/ClockStoryHero';
import V2CTA from '@/components/v2/V2CTA';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { absolute: 'EasyMove Elite — One Day. Zero Chaos.' },
  description: 'Your entire move — planned, executed and finished between sunrise and sunset. Miami’s private moving atelier.',
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return (
    <main className="bg-[#060608]">
      <V2Header />
      <ClockStoryHero />
      <V2CTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Type check + build** — `npx tsc --noEmit` then `npx next build`. Expected: `/v2` in route list; pre-existing local-Windows OG-image prerender errors (`/icon`, `/twitter-image`) are known environmental noise, ignore.

### Task 4: Visual verification (Playwright)

- [ ] **Step 1:** `npx next dev` (background), wait for ready.
- [ ] **Step 2:** Playwright: open `http://localhost:3000/v2`, screenshot at 1440×900 — top, mid-scroll (scene 2-3), end (scene 4 + CTA). Repeat at 375×812. Check: no horizontal overflow (`document.documentElement.scrollWidth <= innerWidth`), clock hand rotates between scroll positions.
- [ ] **Step 3:** Fix visual issues found; re-screenshot.

### Task 5: Commit + preview deploy

- [ ] **Step 1:** Ensure `.superpowers/` is in `.gitignore` (append if missing).
- [ ] **Step 2:** `git add src/app/v2 src/components/v2 src/app/globals.css docs/superpowers .gitignore && git commit -m "feat(v2): cinematic clock-story experience page"`
- [ ] **Step 3:** `npx vercel` (preview, NOT --prod) → share preview URL `/v2` with Eugene.

## Self-review

Spec coverage: header ✓(T1), clock+scenes+intro+progress+grain ✓(T2), reduced-motion ✓(T2 StaticStory), CTA+pricing ✓(T3), noindex ✓(T3), real photos ✓(T2 SCENES), mobile 375 ✓(T4), preview-only deploy ✓(T5). No placeholders; type names consistent (`ClockStoryHero`, `scrollYProgress`, `sceneWindow`). 13:00 displayed as «01:00 PM» — intentional (12-hour format consistency).
