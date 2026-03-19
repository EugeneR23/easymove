'use client';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';
import { Shield, Clock, CheckCircle } from 'lucide-react';

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
  const valid = data.firstName && data.lastName && data.email && data.phone;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setError('');
    try {
      await onSubmit();
    } catch {
      setError('Something went wrong. Please try again or call us at 786-305-1844.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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

      {/* Fields */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="First Name *" required value={data.firstName} onChange={(e) => update({ firstName: e.target.value })} />
          <Input label="Last Name *"  required value={data.lastName}  onChange={(e) => update({ lastName:  e.target.value })} />
        </div>
        <Input label="Email Address *" type="email" required value={data.email} onChange={(e) => update({ email: e.target.value })} />
        <Input
          label="Phone Number *"
          type="tel"
          required
          placeholder="786-000-0000"
          value={data.phone}
          onChange={(e) => update({ phone: e.target.value })}
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Submit row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-3">
        <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
        <Button type="submit" size="lg" loading={loading} disabled={!valid}>
          Get My Exact Quote
        </Button>
      </div>

      <p className="text-xs text-gray-400 text-center mb-5">
        No obligation. No hidden fees. We confirm everything before your move.
      </p>

      {/* Micro trust strip */}
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
