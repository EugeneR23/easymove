'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { easeLuxury } from '@/lib/motion';

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  once?: boolean;
}

export default function AnimateIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: AnimateInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 24 : 0,
    x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: easeLuxury }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
