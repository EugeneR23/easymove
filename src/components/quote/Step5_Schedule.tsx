'use client';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { WizardData } from './QuoteWizard';

interface Props { data: WizardData; update: (p: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step5Schedule({ data, update, onNext, onBack }: Props) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const minDateStr = minDate.toISOString().split('T')[0];

  // Pre-fill with the earliest available date so the field is never empty
  useEffect(() => {
    if (!data.preferredDate) {
      update({ preferredDate: minDateStr });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">When do you need to move?</h2>
      <p className="text-gray-500 text-sm mb-8">Select your preferred date. We book at least 3 days out to ensure crew availability.</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-charcoal mb-2">Preferred Move Date</label>
        <input
          type="date"
          min={minDateStr}
          value={data.preferredDate || minDateStr}
          onChange={(e) => update({ preferredDate: e.target.value })}
          className="block w-full px-4 py-4 bg-white border-2 border-gold/40 text-charcoal text-base font-medium cursor-pointer focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/60 transition-colors"
          style={{ colorScheme: 'light' }}
        />
        <p className="text-gray-400 text-xs mt-2">Tap to change your preferred move date</p>
      </div>

      <button
        type="button"
        onClick={() => update({ flexibleDates: !data.flexibleDates })}
        className={cn(
          'flex items-center gap-3 p-4 border w-full md:w-auto transition-all mb-8',
          data.flexibleDates ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/40',
        )}
      >
        <div className={cn('w-5 h-5 border flex items-center justify-center', data.flexibleDates ? 'border-gold bg-gold' : 'border-gray-300')}>
          {data.flexibleDates && <span className="text-white text-xs leading-none">✓</span>}
        </div>
        <div className="text-left">
          <p className={cn('font-medium text-sm', data.flexibleDates ? 'text-charcoal' : 'text-charcoal')}>My dates are flexible</p>
          <p className="text-gray-400 text-xs mt-0.5">Flexible scheduling may allow for better availability and pricing</p>
        </div>
      </button>

      {/* Soft urgency */}
      <div className="mb-8 flex items-start gap-3 bg-gold/5 border border-gold/15 px-4 py-3">
        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
        <p className="text-charcoal text-xs leading-relaxed">
          We&rsquo;re typically booking <span className="font-semibold">2–3 days out</span>.
          Submitting early helps secure your preferred date and morning window.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <div className="flex items-center gap-4">
          <p className="text-gray-400 text-xs hidden sm:block">Almost done — just one more step</p>
          <Button onClick={onNext} disabled={!data.preferredDate && !data.flexibleDates}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
