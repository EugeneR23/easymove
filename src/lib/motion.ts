import type { Variants } from 'motion/react';

export const easeLuxury: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeBounce: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export const containerVariants = (stagger = 0.09, delay = 0.2): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  },
});

export const slideLeft = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export const slideRight = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  },
});
