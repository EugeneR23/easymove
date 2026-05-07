'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { motion, useInView } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';
import { whatsappUrl } from '@/lib/utils';

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section className="relative py-14 md:py-24 bg-charcoal overflow-hidden">
      {/* Gold gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px gold-separator" />
      {/* Film grain */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Ambient pulsing radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 70%)',
            'radial-gradient(ellipse 65% 75% at 50% 100%, rgba(201,168,76,0.10) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary ambient orb at top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Decorative separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center gap-4 mb-8 md:mb-10"
          style={{ transformOrigin: 'center' }}
        >
          <div className="flex-1 max-w-[80px] h-px gold-separator" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="flex-1 max-w-[80px] h-px gold-separator" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: easeLuxury }}
          className="font-display text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
        >
          Ready to move?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="text-gray-400 text-base md:text-lg mb-8 md:mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Send photos via WhatsApp, get an estimate in 5 minutes, book same week. Or run the calculator now and lock your rate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }}>
            <Link href="/quote">
              <Button size="lg" variant="primary" className="w-full sm:w-auto min-w-[220px] shadow-[0_0_32px_rgba(201,168,76,0.2)] hover:shadow-[0_0_48px_rgba(201,168,76,0.3)]">
                Calculate My Move
              </Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }}>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="border border-white/20 bg-transparent text-white hover:bg-white/[0.06] hover:border-white/35 w-full sm:w-auto min-w-[220px] inline-flex items-center gap-2 justify-center transition-all duration-200"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </Button>
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }}>
            <a href="tel:+17863051844">
              <Button
                size="lg"
                className="border border-white/20 bg-transparent text-white hover:bg-white/[0.06] hover:border-white/35 w-full sm:w-auto min-w-[220px] inline-flex items-center gap-2 justify-center transition-all duration-200"
              >
                <Phone size={16} />
                786-305-1844
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
          className="flex items-center justify-center gap-4 mt-8 flex-wrap"
        >
          <span className="text-white/45 text-xs">Owner-led</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-white/45 text-xs">COI on request</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-white/45 text-xs">Russian + English</span>
          <span className="w-px h-3 bg-white/15" />
          <span className="text-white/45 text-xs">Hollywood-based</span>
        </motion.div>
      </div>
    </section>
  );
}
