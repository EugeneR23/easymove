'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, ExternalLink, MessageCircle } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';
import { whatsappUrl } from '@/lib/utils';

const THUMBTACK_URL = 'https://www.thumbtack.com/profile/services/474342774303219734/reviews';
const REVIEW_COUNT = 32;
const RATING = 5.0;

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section ref={ref} className="section-padding bg-cream border-t border-gray-100">
      <div className="container-max max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeLuxury }}
        >
          <div className="w-8 h-px bg-gold mx-auto mb-6" />
          <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">Reviews</p>

          {/* Big rating block */}
          <div className="flex items-center justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={22} className="fill-gold text-gold" />
            ))}
          </div>
          <p className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-none mb-1">
            {RATING.toFixed(1)} <span className="text-gold">/ 5.0</span>
          </p>
          <p className="text-charcoal text-sm font-semibold mb-6">
            {REVIEW_COUNT} verified reviews on Thumbtack
          </p>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal leading-tight mb-4">
            Owner-led. Building-fluent. Honest.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto">
            Easy Move Florida is owner-operated by Evgenii Romanov out of Hollywood, FL. Every review you see is real, posted directly by the customer on Thumbtack — go check.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={THUMBTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-charcoal text-white font-bold px-6 py-3 hover:bg-charcoal/90 transition-colors"
            >
              Read all {REVIEW_COUNT} reviews <ExternalLink size={14} />
            </a>
            <a
              href={whatsappUrl('Hi Evgenii — I want to ask a few questions before booking.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal font-semibold px-6 py-3 hover:border-gold hover:text-gold transition-colors"
            >
              <MessageCircle size={15} /> WhatsApp Evgenii
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
