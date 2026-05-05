'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'motion/react';
import { easeLuxury } from '@/lib/motion';

type StatItem =
  | { numeric: number; suffix?: string; prefix?: string; decimal?: boolean; label: string; sub: string }
  | { text: string; label: string; sub: string };

const stats: StatItem[] = [
  { numeric: 500, suffix: '+',   label: 'Moves Completed', sub: 'Local, long-distance & packing' },
  { numeric: 4.9, suffix: ' ★', label: 'Top-Rated',        sub: 'Across verified platforms', decimal: true },
  { text: '< 2 hrs',             label: 'Response Time',    sub: 'Coordinator calls you back' },
  { numeric: 0,   prefix: '$',   label: 'Hidden Fees',      sub: 'Final price confirmed in writing' },
];

function CountUp({ target, suffix = '', prefix = '', decimal = false }: {
  target: number; suffix?: string; prefix?: string; decimal?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // `margin: '0px'` so the trigger only fires when the element scrolls into the
  // viewport for real, not on initial mount when above-fold sections are already
  // technically "in view". This prevents the user seeing a flash of "0+" while
  // the count animation runs. SSR fallback below also shows the real number.
  const inView = useInView(ref, { once: true, margin: '0px' });
  const formatted = prefix + (decimal ? target.toFixed(1) : target) + suffix;

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;
    // Reset to 0 then animate up to target — only runs when the element
    // genuinely enters the viewport via scroll, not on initial paint.
    node.textContent = prefix + (decimal ? '0.0' : '0') + suffix;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = prefix + (decimal ? v.toFixed(1) : Math.round(v)) + suffix;
      },
    });
    return controls.stop;
  }, [inView, target, suffix, prefix, decimal]);

  // Initial SSR + first-paint render shows the real target value, not "0".
  // No-JS users see correct numbers; JS users see the count animation when scrolled into view.
  return <span ref={ref}>{formatted}</span>;
}

export default function StatsBar() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative bg-charcoal overflow-hidden -mt-px">
      <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
      <div className="absolute bottom-0 left-0 right-0 h-px gold-separator" />
      <div className="absolute inset-0 grain-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: easeLuxury }}
              className={`text-center px-3 sm:px-6 py-4 ${
                i < stats.length - 1 ? 'border-r border-white/[0.07]' : ''
              }`}
            >
              <p className="font-display text-xl sm:text-3xl font-bold text-gold mb-2 tracking-wide">
                {'numeric' in stat ? (
                  <CountUp
                    target={stat.numeric}
                    suffix={'suffix' in stat ? (stat.suffix ?? '') : ''}
                    prefix={'prefix' in stat ? (stat.prefix ?? '') : ''}
                    decimal={'decimal' in stat ? stat.decimal : false}
                  />
                ) : (
                  stat.text
                )}
              </p>
              <p className="text-white text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-gray-600 text-xs leading-snug">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
