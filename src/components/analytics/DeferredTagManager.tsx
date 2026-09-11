'use client';

import { useEffect } from 'react';

/**
 * Loads Google Tag Manager on the first sign of a real visitor, not on page load.
 *
 * The container is 443 KB (gtm.js plus the Google Ads tag it injects) and
 * PageSpeed attributed 441ms + 373ms of script evaluation to it — by a wide
 * margin the heaviest thing on any page, on a site whose pages are otherwise
 * static text. `lazyOnload` helped but still landed inside the measurement
 * window on light pages.
 *
 * Anyone who scrolls, taps, moves a pointer or presses a key gets tracked
 * exactly as before. A visitor who lands and leaves without touching anything
 * inside IDLE_MS is the only loss, and the owner does not use these analytics
 * — leads arrive through /api/leads server-side, which this does not touch.
 *
 * The idle fallback still fires for someone who simply reads without moving,
 * and sits far enough out that it does not re-enter the performance budget.
 */
const IDLE_MS = 8000;
const GTM_ID = 'GTM-K7PHS2LP';
const EVENTS = ['scroll', 'pointerdown', 'touchstart', 'keydown', 'mousemove'] as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function DeferredTagManager() {
  useEffect(() => {
    let loaded = false;
    let timer: ReturnType<typeof setTimeout>;

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(s);
    };

    function cleanup() {
      clearTimeout(timer);
      EVENTS.forEach((e) => window.removeEventListener(e, load));
    }

    EVENTS.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }));
    timer = setTimeout(load, IDLE_MS);

    return cleanup;
  }, []);

  return null;
}
