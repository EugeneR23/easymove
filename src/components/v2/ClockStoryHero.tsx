'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';

// ── Scenes of moving day ───────────────────────────────────────────────────────
const SCENES = [
  {
    time: '08:00', meridiem: 'AM', label: 'Scene 01 · Arrival',
    headline: ['THE CREW', 'ARRIVES.'],
    sub: 'On the minute. Walk-through, floor protection, a plan confirmed before a single box moves.',
    photo: '/images/v2/scene-1-arrival.jpg',
    alt: 'Luxury moving truck arriving at a Miami estate at dawn',
  },
  {
    time: '09:30', meridiem: 'AM', label: 'Scene 02 · Protection',
    headline: ['WRAPPED LIKE', "IT'S OURS."],
    sub: 'Every edge padded, every surface film-wrapped. White-glove is not a buzzword — it is the procedure.',
    photo: '/images/v2/scene-2-protection.jpg',
    alt: 'White-gloved hands wrapping a designer chair in protective film',
  },
  {
    time: '01:00', meridiem: 'PM', label: 'Scene 03 · Loading',
    headline: ['LOADED LIKE', 'A VAULT.'],
    sub: 'Engineered stacking, strapped tiers, zero shifting in transit. Your estate travels first class.',
    photo: '/images/v2/scene-3-loading.jpg',
    alt: 'Furniture stacked like a vault inside the moving truck',
  },
  {
    time: '06:00', meridiem: 'PM', label: 'Scene 04 · Home',
    headline: ['SAME DAY.', 'NEW ADDRESS.'],
    sub: 'Placed, unwrapped, reassembled. Sunset over the skyline — and your life already in its place.',
    photo: '/images/v2/scene-4-home.jpg',
    alt: 'Miami penthouse at sunset with furniture set in place',
    cta: true,
  },
] as const;

const INTRO_END = 0.16;                    // scroll progress where intro hands off
const SCENE_SPAN = (1 - INTRO_END) / SCENES.length;

// Visibility window for scene i: [fade-in start, full, full, fade-out end]
function sceneWindow(i: number): [number, number, number, number] {
  const start = INTRO_END + i * SCENE_SPAN;
  const end = start + SCENE_SPAN;
  return [start, start + SCENE_SPAN * 0.22, end - SCENE_SPAN * 0.22, end];
}

// ── Giant clock ────────────────────────────────────────────────────────────────
const NUMERALS = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

function GiantClock({ progress }: { progress: MotionValue<number> }) {
  // 08:00 → 18:00 = 10 hours = 300° of hour-hand travel.
  // Hands hang downward from the pivot, so rotate = clock angle − 180°:
  // 240° (8:00) → 60, 540° (18:00) → 360.
  const hourAngle   = useTransform(progress, [INTRO_END, 1], [60, 360], { clamp: true });
  const minuteAngle = useTransform(hourAngle, (a) => a * 12 + 180);
  const drift       = useTransform(progress, [0, 1], [0, -120]); // slow parallax drift

  return (
    // Positioning lives on the wrapper — motion would overwrite class transforms
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[26%]
                 w-[150vw] h-[150vw] max-w-[1100px] max-h-[1100px] md:w-[60vw] md:h-[60vw]"
      aria-hidden="true"
    >
    <motion.div style={{ y: drift }} className="absolute inset-0">
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
    </div>
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
      {/* photo — right side on desktop, dimmed backdrop on mobile */}
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
            <a href="#estimate" className="bg-gold hover:bg-gold-dark text-white text-xs font-bold tracking-[0.25em] uppercase px-8 py-4 transition-colors">
              See My Price
            </a>
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
        Your entire move — planned, executed and finished between sunrise and sunset.
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
function Bar({ progress, a, d }: { progress: MotionValue<number>; a: number; d: number }) {
  const fill = useTransform(progress, [a, d], ['0%', '100%'], { clamp: true });
  return (
    <div className="w-9 h-[3px] bg-white/10 overflow-hidden">
      <motion.div style={{ width: fill }} className="h-full bg-gold" />
    </div>
  );
}

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

  // Progress computed manually: the hero starts at the top of the page, so
  // progress = scrollY / (section height − viewport). Framer's target
  // measurement is unreliable here — the scroll container changes when the
  // overflow-x guard below flips from `hidden` to `clip` after hydration.
  const { scrollY } = useScroll();
  const [range, setRange] = useState(1);
  useEffect(() => {
    const measure = () => setRange(Math.max(1, (containerRef.current?.offsetHeight ?? 0) - window.innerHeight));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const scrollYProgress = useTransform(scrollY, (y) => Math.min(1, Math.max(0, y / range)));

  // Site-wide `overflow-x: hidden` on html/body turns body into a scroll
  // container and kills position:sticky. `clip` guards overflow without that
  // side effect. Scoped to this page; restored on unmount.
  useEffect(() => {
    const html = document.documentElement.style;
    const body = document.body.style;
    const prev = [html.overflowX, body.overflowX];
    html.overflowX = 'clip';
    body.overflowX = 'clip';
    return () => { html.overflowX = prev[0]; body.overflowX = prev[1]; };
  }, []);

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
