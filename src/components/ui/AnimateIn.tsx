'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal without an animation library.
 *
 * This wrapper sits on most pages of the site, and it used to pull motion/react
 * into every one of them. PageSpeed attributed 928ms of script evaluation to
 * that chunk on a cost page whose own content is static text. An
 * IntersectionObserver plus two CSS classes does the same job for a few hundred
 * bytes, so the library now only loads where something genuinely needs it.
 *
 * The element is visible by default and only hidden once the observer is known
 * to be running (mounted === true). Without that, a visitor whose JS fails
 * would be left with blank sections — the failure mode worth engineering
 * against, and the reason this is not simply `opacity-0` in the markup.
 */
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
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: '-10% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const state = !mounted || inView ? 'in' : 'out';

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} reveal-${state}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
