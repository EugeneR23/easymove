'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Phone } from 'lucide-react';

export default function ExitIntent() {
  const [visible, setVisible]   = useState(false);
  const [dismissed, setDismiss] = useState(false);
  const [phone, setPhone]       = useState('');
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const triggered               = useRef(false);

  useEffect(() => {
    if (dismissed) return;

    // Desktop: mouse moves toward the top of the viewport (toward browser chrome / back button)
    const onMouseLeave = (e: MouseEvent) => {
      if (!triggered.current && e.clientY <= 8) {
        triggered.current = true;
        setVisible(true);
      }
    };
    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, [dismissed]);

  function dismiss() {
    setDismiss(true);
    setVisible(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), source: 'popup', createdAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error('Failed');
      setSent(true);
      setTimeout(dismiss, 3000);
    } catch {
      setError('Something went wrong. Please try again or call us.');
    } finally {
      setLoading(false);
    }
  }

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal border-t border-gold/30 shadow-luxury"
      style={{ animation: 'slideUp 0.3s ease-out' }}
    >
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>

      <div className="max-w-2xl mx-auto px-4 py-5 flex items-start gap-4">
        {sent ? (
          <div className="flex-1 text-center py-1">
            <p className="text-gold font-semibold text-sm">Thanks — we&apos;ll contact you shortly.</p>
            <p className="text-white/40 text-xs mt-1">A coordinator will reach out within a few hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1">
            <p className="text-white font-semibold text-sm mb-0.5">
              Want us to hold your estimate?
            </p>
            <p className="text-white/40 text-xs mb-3">
              Leave your number and a coordinator will follow up — no obligation.
            </p>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="flex-1 min-w-0 px-3 py-2.5 bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                disabled={!phone.trim() || loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gold text-white text-sm font-semibold hover:bg-gold-dark transition-colors disabled:opacity-40 whitespace-nowrap"
              >
                <Phone size={13} /> {loading ? 'Sending…' : 'Call Me Back'}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            {!error && <p className="text-white/20 text-[10px] mt-2">No spam. We only call once.</p>}
          </form>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-white/30 hover:text-white/70 transition-colors shrink-0 mt-0.5"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
