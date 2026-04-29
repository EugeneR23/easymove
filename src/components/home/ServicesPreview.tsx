'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Building2, Truck, Palette, MapPin } from 'lucide-react';
import { easeLuxury } from '@/lib/motion';
import { cn } from '@/lib/utils';

const FEATURED = {
  icon: MapPin,
  name: 'Local Moving — Miami-Dade, Broward & Palm Beach',
  tagline: 'The most common move done right. Flat hourly rate, 3-hour minimum, truck included. No surprise fees. We show up on time, wrap everything, and have you settled by end of day.',
  href: '/quote',
  cta: 'Get a FREE local move estimate',
  image: '/images/Real/4.png',
  highlights: ['$99/hr · 2 movers', 'Truck & equipment included', 'Floor & furniture protection', 'Same-week availability'],
};

const PREVIEW = [
  {
    icon: Building2,
    name: 'High-Rise & Condo Moving',
    tagline: "Specialist crews trained for South Florida's luxury towers — elevator reservations, floor protection, and building compliance handled for you.",
    href: '/services/residential-moving',
    cta: 'Condo Moving Details',
    image: '/images/Real/9.jpg',
  },
  {
    icon: Truck,
    name: 'Long-Distance & Nationwide',
    tagline: 'Dedicated trucks, GPS tracking, and a single coordinator from Miami pickup to final placement — anywhere in the country.',
    href: '/services/long-distance-moving',
    cta: 'Long-Distance Details',
    image: '/images/Long%20distance.png',
  },
  {
    icon: Palette,
    name: 'Fine Art & Specialty Items',
    tagline: 'Custom crating, climate-controlled transport, and white-glove installation for art collections, grand pianos, and wine cellars.',
    href: '/services/specialty-items',
    cta: 'Art & Specialty Handling',
    image: '/images/Real/10.png',
  },
];

function MagneticCard({ children, className }: { children: React.ReactNode; className: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSmooth = useSpring(x, { stiffness: 200, damping: 20 });
  const ySmooth = useSpring(y, { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      style={{ x: xSmooth, y: ySmooth }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('magnetic-card', className)}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesPreview() {
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-5% 0px' });

  const { scrollYProgress } = useScroll({ target: featuredRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={sectionRef} className="relative section-padding bg-cream overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-60" />
      <div className="relative container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeLuxury }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div
            className="h-px bg-gold mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          />
          <p className="text-charcoal text-xs font-semibold tracking-[0.3em] uppercase mb-3">What We Offer</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal">
            Built for South Florida Living
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From Brickell high-rises to Boca Raton estates — residential, office, and specialty moves
            designed for South Florida&rsquo;s premium market.
          </p>
        </motion.div>

        {/* Featured: Local Move */}
        <motion.div
          ref={featuredRef}
          initial={{ opacity: 0, x: -48 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: easeLuxury, delay: 0.2 }}
          className="group mb-6 overflow-hidden bg-charcoal border border-white/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.08),_0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.18),_0_24px_56px_rgba(0,0,0,0.2)] transition-shadow duration-300"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image with parallax */}
            <div className="relative h-56 lg:h-auto lg:w-[45%] overflow-hidden shrink-0">
              <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                <Image
                  src={FEATURED.image}
                  alt={FEATURED.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-charcoal/30" />
              <div className="absolute top-4 left-4 bg-gold px-3 py-1 text-[10px] font-bold text-white uppercase tracking-[0.15em]">
                Most Popular
              </div>
            </div>
            {/* Content */}
            <div className="p-7 lg:p-10 flex flex-col justify-center flex-1 relative overflow-hidden">
              <div className="absolute inset-0 grain-overlay opacity-50" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <FEATURED.icon size={14} className="text-gold" />
                  <p className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Local Moving</p>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug">
                  {FEATURED.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg">
                  {FEATURED.tagline}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-7">
                  {FEATURED.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      <span className="text-white/60 text-xs">{h}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={FEATURED.href}
                  className="group/link inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-white text-sm font-bold px-6 py-3 transition-colors self-start"
                >
                  {FEATURED.cta}
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Specialty cards — 3 col */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREVIEW.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 32 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: easeLuxury }}
              >
                <MagneticCard className="group flex flex-col overflow-hidden bg-white border border-black/[0.05] shadow-[0_1px_4px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09),_0_24px_56px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-300 ease-out h-full">
                  {/* Image panel */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.06] group-hover:brightness-[1.04] transition-all duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-charcoal/18 group-hover:bg-charcoal/10 transition-colors duration-400" />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal/55 via-charcoal/20 to-transparent" />
                    <div className="absolute bottom-4 left-5 w-9 h-9 border border-gold/40 bg-black/25 backdrop-blur-[2px] flex items-center justify-center group-hover:border-gold/80 group-hover:bg-black/35 transition-all duration-300">
                      <Icon className="text-gold" size={16} />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-white to-[#FDFCF9]">
                    <h3 className="font-display text-xl font-semibold text-charcoal mb-3 leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-[1.75] mb-7 flex-1">
                      {service.tagline}
                    </p>
                    <Link
                      href={service.href}
                      className="group/link inline-flex items-center gap-1.5 text-gold text-[11px] font-semibold uppercase tracking-[0.12em] self-start"
                    >
                      <span className="border-b border-gold/40 pb-px group-hover/link:border-gold transition-colors duration-200">
                        {service.cta}
                      </span>
                      <ArrowRight size={12} className="translate-x-0 group-hover/link:translate-x-[3px] transition-transform duration-200 ease-out" />
                    </Link>
                  </div>
                </MagneticCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-charcoal text-sm font-semibold uppercase tracking-wider border-b border-charcoal/40 pb-0.5 hover:text-gold hover:border-gold transition-colors duration-200"
          >
            View All Moving Services <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
