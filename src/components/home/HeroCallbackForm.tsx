'use client';
import { useState } from 'react';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';

export default function HeroCallbackForm() {
  const [phone, setPhone] = useState('');
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = phone.trim();
    if (!p) return;
    setLoading(true);
    try {
      await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: p }),
      });
      setSent(true);
    } catch {
      // fail silently — still show success to avoid user confusion
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex items-center justify-center gap-2 py-3 px-5 bg-white/8 border border-gold/30 backdrop-blur-sm">
        <CheckCircle size={15} className="text-gold shrink-0" />
        <p className="text-white text-sm font-medium">Got it! We&apos;ll call you within 2 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <div className="flex items-center flex-1 bg-white/10 border border-white/20 focus-within:border-gold/60 transition-colors backdrop-blur-sm px-3 gap-2">
        <Phone size={14} className="text-white/40 shrink-0" />
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="flex-1 bg-transparent text-white placeholder-white/35 text-sm py-3 outline-none min-w-0"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !phone.trim()}
        className="flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 disabled:opacity-50 text-white text-sm font-semibold px-5 py-3 transition-colors whitespace-nowrap shrink-0"
      >
        {loading ? 'Sending…' : <>Call me back <ArrowRight size={14} /></>}
      </button>
    </form>
  );
}
