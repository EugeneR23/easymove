'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';
import { Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  data: WizardData;
  update: (p: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}

const WHAT_YOU_GET = [
  'A real coordinator reviews your details — not an algorithm',
  'Your price confirmed in writing, typically within a few hours',
  'No commitment to book until you are fully satisfied',
];

export default function Step6Contact({ data, update, onBack, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // ── Derived validity — mirrors what the backend requires ──────────────────
  const valid = !!(data.firstName.trim() && data.lastName.trim() && data.email.trim() && data.phone.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Re-derive at submit time using current trimmed values (guards against
    // autofill populating DOM without triggering React onChange).
    const firstName = (e.currentTarget.querySelector<HTMLInputElement>('[name="firstName"]')?.value ?? data.firstName).trim();
    const lastName  = (e.currentTarget.querySelector<HTMLInputElement>('[name="lastName"]')?.value  ?? data.lastName).trim();
    const email     = (e.currentTarget.querySelector<HTMLInputElement>('[name="email"]')?.value     ?? data.email).trim();
    const phone     = (e.currentTarget.querySelector<HTMLInputElement>('[name="phone"]')?.value     ?? data.phone).trim();

    if (!firstName || !lastName || !email || !phone) {
      setError('Please fill in all required fields before submitting.');
      console.warn('[Step6] Blocked submit — missing fields:', { firstName: !!firstName, lastName: !!lastName, email: !!email, phone: !!phone });
      return;
    }

    // Sync DOM values into React state if autofill bypassed onChange
    if (firstName !== data.firstName) update({ firstName });
    if (lastName  !== data.lastName)  update({ lastName });
    if (email     !== data.email)     update({ email });
    if (phone     !== data.phone)     update({ phone });

    setLoading(true);
    setError('');
    console.log('[Step6] Submit clicked — payload preview:', { firstName, lastName, email, phone, moveType: data.moveType, homeSize: data.inventory.homeSize });

    try {
      await onSubmit();
      // If we reach here without throwing, QuoteWizard will unmount this step
      // and show QuoteSummary. setLoading(false) is intentionally omitted.
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.name === 'AbortError'
        ? 'The request timed out. Please check your connection and try again, or call us directly at 786-305-1844.'
        : err.message
        : 'Something went wrong. Please try again or call us at 786-305-1844.';
      console.error('[Step6] Submit error:', err);
      setError(msg);
      setLoading(false);
    }
  }

  return (
    // noValidate: disables browser-native validation popups so React always
    // controls validation. The required attributes remain for accessibility.
    <form onSubmit={handleSubmit} noValidate>
      {/* Header */}
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-1">
        Get Your Personalized Estimate
      </h2>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
        A real coordinator reviews your details and confirms your price — no automated quotes, no obligation to book.
      </p>

      {/* What you get */}
      <div className="bg-cream border border-gray-100 p-4 mb-7 space-y-2">
        {WHAT_YOU_GET.map((line) => (
          <div key={line} className="flex items-start gap-2.5">
            <CheckCircle size={13} className="text-gold shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">{line}</p>
          </div>
        ))}
      </div>

      {/* Fields — name attribute required so DOM query in handleSubmit works */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            name="firstName"
            label="First Name *"
            autoComplete="given-name"
            inputMode="text"
            required
            value={data.firstName}
            onChange={(e) => update({ firstName: e.target.value })}
          />
          <Input
            name="lastName"
            label="Last Name *"
            autoComplete="family-name"
            inputMode="text"
            required
            value={data.lastName}
            onChange={(e) => update({ lastName: e.target.value })}
          />
        </div>
        <Input
          name="email"
          label="Email Address *"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
        />
        <Input
          name="phone"
          label="Phone Number *"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          placeholder="786-000-0000"
          value={data.phone}
          onChange={(e) => update({ phone: e.target.value })}
        />
      </div>

      {/* Submit row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
        <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
        <Button type="submit" size="lg" loading={loading} disabled={!valid || loading}>
          Get My Exact Quote
        </Button>
      </div>

      {/* ── Error banner — BELOW the button so it stays in viewport on mobile ── */}
      {error && (
        <div className="mt-3 flex items-start gap-3 bg-red-50 border border-red-200 p-4">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-red-700 text-sm font-semibold mb-1">Submission failed</p>
            <p className="text-red-600 text-xs leading-relaxed">{error}</p>
            <a
              href="tel:7863051844"
              className="inline-block mt-2 text-xs font-semibold text-red-700 underline"
            >
              Call 786-305-1844 to book directly
            </a>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 text-center mt-4 mb-5">
        No obligation. No hidden fees. We confirm everything before your move.
      </p>

      {/* Trust strip */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <Shield size={11} className="text-gold" />
          <span className="text-xs text-gray-400">No spam, ever</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} className="text-gold" />
          <span className="text-xs text-gray-400">Response within a few hours</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle size={11} className="text-gold" />
          <span className="text-xs text-gray-400">No obligation to book</span>
        </div>
      </div>
    </form>
  );
}
