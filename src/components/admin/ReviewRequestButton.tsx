'use client';
import { useState } from 'react';

/**
 * Owner, 2026-10-11 (Q14): ask for a Google review by email, from the admin
 * lead list. One click, one email, and the button shows what actually happened.
 */
export default function ReviewRequestButton({ email, name }: { email: string; name: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [detail, setDetail] = useState('');

  async function send() {
    setState('sending');
    try {
      const res = await fetch('/api/review-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, channel: 'email' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.results?.email === true) {
        setState('sent');
      } else {
        setState('failed');
        setDetail(String(data?.results?.email ?? data?.error ?? `HTTP ${res.status}`));
      }
    } catch {
      setState('failed');
      setDetail('network error');
    }
  }

  if (state === 'sent') return <span className="text-green-700 text-xs font-semibold">Sent</span>;
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={send}
        disabled={state === 'sending'}
        className="text-xs font-semibold border border-gold text-gold px-2 py-1 hover:bg-gold hover:text-white disabled:opacity-50 whitespace-nowrap"
      >
        {state === 'sending' ? 'Sending…' : 'Ask for review'}
      </button>
      {state === 'failed' && <span className="text-red-600 text-[11px] max-w-[160px]">{detail}</span>}
    </div>
  );
}
