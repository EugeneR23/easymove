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
            className="bg-gold hover:bg-gold-dark text-white text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 transition-colors"
          >
            Get Private Quote
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
