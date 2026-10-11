'use client';
import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * Counts taps on phone, WhatsApp and email links, site-wide, with one listener.
 *
 * The site has 40+ tel: links and WhatsApp buttons in seven components, and
 * until 2026-10-11 none of them was counted: the only events in the dataLayer
 * were the quote wizard's two. Calls are how most movers get booked, so a
 * channel nobody counts is a channel nobody can judge (an ad, a city page, a
 * partner). Listening at the document means no link has to remember to report.
 *
 * Fires a Vercel Analytics event (visible without GTM) and a dataLayer event
 * (for GTM, once it has loaded).
 */
function channelOf(href: string): 'phone' | 'whatsapp' | 'email' | 'sms' | null {
  if (href.startsWith('tel:')) return 'phone';
  if (href.startsWith('sms:')) return 'sms';
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) return 'whatsapp';
  return null;
}

export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const channel = channelOf(link.getAttribute('href') ?? '');
      if (!channel) return;
      const page = window.location.pathname;
      try {
        const w = window as unknown as { dataLayer?: unknown[] };
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: 'contact_click', channel, page });
        track('contact_click', { channel, page });
      } catch { /* never block the call */ }
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
