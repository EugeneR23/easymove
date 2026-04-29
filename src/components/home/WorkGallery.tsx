'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { easeLuxury } from '@/lib/motion';

const photos = [
  { src: '/images/Real/9.jpg',  alt: 'Professional movers wrapping furniture in Miami high-rise elevator with city skyline view',   caption: 'High-rise move · Miami elevator' },
  { src: '/images/Real/8.jpg',  alt: 'EasyMove Elite moving truck and crew outside South Florida home during full residential move',  caption: 'Full move · South Florida community' },
  { src: '/images/Real/4.png',  alt: 'Furniture professionally wrapped in protective blankets and plastic before loading',            caption: 'White-glove furniture protection' },
  { src: '/images/Real/6.png',  alt: 'Neatly packed moving boxes organized and ready to load in South Florida home',                 caption: 'Packed & ready to load' },
  { src: '/images/Real/10.png', alt: 'Mover in white gloves carefully wrapping specialty item for safe transport',                   caption: 'White-glove wrap · specialty item' },
  { src: '/images/Real/1.png',  alt: 'Full-home packing job with boxes organized throughout Miami-Dade property',                   caption: 'Full-home packing · Miami-Dade' },
];

export default function WorkGallery() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-10% 0px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-5% 0px' });

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeLuxury }}
          className="text-center mb-10"
        >
          <p className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Work</p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-charcoal mb-3">
            Real Moves. Real Results.
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Every photo is from an actual job. No staging, no stock photography.
          </p>
        </motion.div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={gridInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: easeLuxury }}
              className="relative overflow-hidden group aspect-[4/3]"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5, ease: easeLuxury }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={idx < 3}
                />
              </motion.div>

              {/* Gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Caption */}
              <motion.p
                className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white text-xs font-medium tracking-wide pointer-events-none"
                initial={{ y: '100%', opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {photo.caption}
              </motion.p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
          className="text-center text-gray-400 text-xs mt-6"
        >
          500+ completed moves across Miami-Dade, Broward &amp; Palm Beach Counties
        </motion.p>
      </div>
    </section>
  );
}
