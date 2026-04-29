'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';
import type { QuoteAddons } from '@/types';
import { X } from 'lucide-react';

const FL_CITIES = [
  'Miami', 'Coral Gables', 'Coconut Grove', 'Brickell', 'Aventura',
  'Sunny Isles Beach', 'Hollywood', 'Fort Lauderdale', 'Pompano Beach',
  'Boca Raton', 'Delray Beach', 'Palm Beach', 'West Palm Beach', 'Other',
];

const US_STATES = [
  { value: '', label: 'Select State' },
  ...['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
    .map((s) => ({ value: s, label: s })),
];

interface AddonOption {
  key: keyof QuoteAddons;
  label: string;
}

const ADDON_OPTIONS: AddonOption[] = [
  { key: 'packingService',    label: 'Professional Packing' },
  { key: 'climateControlled', label: 'Packing Materials' },
  { key: 'furnitureAssembly', label: 'Furniture Disassembly & Reassembly' },
  { key: 'artHandling',       label: 'Heavy / Specialty Items' },
];

interface Props {
  data: WizardData;
  update: (p: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => Promise<void>;
}

export default function Step4Details({ data, update, onNext, onBack, onSubmit }: Props) {
  const isLocal = data.moveType === 'local';
  const addons  = data.addons;
  const inv     = data.inventory;

  const [specialItem, setSpecialItem] = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  // Min date: 3 days from today
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const minDateStr = minDate.toISOString().split('T')[0];

  const toggleAddon = (key: keyof QuoteAddons) => {
    update({ addons: { ...addons, [key]: !addons[key] } });
  };

  const addSpecial = () => {
    const val = specialItem.trim();
    if (val && !inv.specialItems.includes(val)) {
      update({ inventory: { ...inv, specialItems: [...inv.specialItems, val] } });
    }
    setSpecialItem('');
  };

  async function handleSubmit() {
    setLoading(true);
    setError('');
    try {
      await onSubmit();
    } catch (err: unknown) {
      const msg = err instanceof Error
        ? err.name === 'AbortError'
          ? 'The request timed out. Please check your connection and try again, or call us directly at 786-305-1844.'
          : err.message
        : 'Something went wrong. Please try again or call us at 786-305-1844.';
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-1">Optional Details</h2>
      <p className="text-gray-500 text-sm mb-7 leading-relaxed">
        All fields below are optional — your coordinator will follow up to confirm the details. Fill in what you know now to get a more accurate estimate.
      </p>

      {/* ── Locations (optional) ─────────────────────────────────────────────── */}
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-4">
          Locations <span className="font-normal normal-case tracking-normal text-gray-300">(optional)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* From */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Moving From</p>
            {isLocal ? (
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">City</label>
                <select
                  value={data.fromCity}
                  onChange={(e) => update({ fromCity: e.target.value, fromState: 'FL' })}
                  className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
                >
                  <option value="">Select city</option>
                  {FL_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">City</label>
                  <input
                    type="text"
                    placeholder="Miami"
                    value={data.fromCity}
                    onChange={(e) => update({ fromCity: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">State</label>
                  <select
                    value={data.fromState}
                    onChange={(e) => update({ fromState: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
                  >
                    {US_STATES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* To */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Moving To</p>
            {isLocal ? (
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1.5">City</label>
                <select
                  value={data.toCity}
                  onChange={(e) => update({ toCity: e.target.value, toState: 'FL' })}
                  className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
                >
                  <option value="">Select city</option>
                  {FL_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">City</label>
                  <input
                    type="text"
                    placeholder="New York"
                    value={data.toCity}
                    onChange={(e) => update({ toCity: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1.5">State</label>
                  <select
                    value={data.toState}
                    onChange={(e) => update({ toState: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
                  >
                    {US_STATES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Preferred date (optional) ────────────────────────────────────────── */}
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-4">
          Preferred Date <span className="font-normal normal-case tracking-normal text-gray-300">(optional)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1.5">Move Date</label>
            <input
              type="date"
              min={minDateStr}
              value={data.preferredDate || ''}
              onChange={(e) => update({ preferredDate: e.target.value })}
              className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
              style={{ colorScheme: 'light' }}
            />
          </div>
          <div className="pt-0 sm:pt-7">
            <button
              type="button"
              onClick={() => update({ flexibleDates: !data.flexibleDates })}
              className={cn(
                'flex items-center gap-3 p-3 border w-full transition-all',
                data.flexibleDates ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/40',
              )}
            >
              <div className={cn('w-5 h-5 border flex items-center justify-center shrink-0', data.flexibleDates ? 'border-gold bg-gold' : 'border-gray-300')}>
                {data.flexibleDates && <span className="text-white text-xs leading-none">✓</span>}
              </div>
              <div className="text-left">
                <p className="font-medium text-sm text-charcoal">My dates are flexible</p>
                <p className="text-gray-400 text-xs mt-0.5">May allow better availability</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Add-ons (optional) ───────────────────────────────────────────────── */}
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-4">
          Add-ons <span className="font-normal normal-case tracking-normal text-gray-300">(optional)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          {ADDON_OPTIONS.map((addon) => {
            const selected = !!addons[addon.key];
            return (
              <button
                key={addon.key}
                type="button"
                onClick={() => toggleAddon(addon.key)}
                className={cn(
                  'flex items-center gap-3 p-3 border text-left transition-all duration-150',
                  selected ? 'border-gold bg-gold/5' : 'border-gray-100 hover:border-gold/30',
                )}
              >
                <div className={cn(
                  'w-5 h-5 border shrink-0 flex items-center justify-center transition-all',
                  selected ? 'border-gold bg-gold' : 'border-gray-300',
                )}>
                  {selected && <span className="text-white text-xs leading-none">✓</span>}
                </div>
                <p className={cn('text-sm font-medium', selected ? 'text-charcoal' : 'text-gray-600')}>{addon.label}</p>
              </button>
            );
          })}
        </div>

        {/* Specialty items */}
        <div className="mb-3">
          <p className="text-sm font-medium text-charcoal mb-1">Specialty Items</p>
          <p className="text-xs text-gray-400 mb-2">Piano, sculpture, antiques, safe, etc.</p>
          <div className="flex gap-2">
            <input
              value={specialItem}
              onChange={(e) => setSpecialItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecial())}
              placeholder="e.g. Steinway grand piano"
              className="flex-1 px-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-gold text-charcoal placeholder-gray-400"
            />
            <button
              type="button"
              onClick={addSpecial}
              className="px-4 py-2.5 bg-charcoal text-white text-sm font-medium hover:bg-charcoal/90 transition-colors"
            >
              Add
            </button>
          </div>
          {inv.specialItems.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {inv.specialItems.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 text-charcoal px-3 py-1 text-xs font-medium">
                  {item}
                  <button
                    type="button"
                    onClick={() => update({ inventory: { ...inv, specialItems: inv.specialItems.filter((i) => i !== item) } })}
                    className="text-gray-400 hover:text-charcoal"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Notes ───────────────────────────────────────────────────────────── */}
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-4">
          Notes <span className="font-normal normal-case tracking-normal text-gray-300">(optional)</span>
        </p>
        <textarea
          value={data.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="e.g. large sectional sofa, fragile antique mirror, tight stairwell..."
          rows={3}
          className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold resize-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-start gap-3 bg-red-50 border border-red-200 p-4">
          <div className="min-w-0">
            <p className="text-red-700 text-sm font-semibold mb-1">Submission failed</p>
            <p className="text-red-600 text-xs leading-relaxed">{error}</p>
            <a href="tel:7863051844" className="inline-block mt-2 text-xs font-semibold text-red-700 underline">
              Call 786-305-1844 to book directly
            </a>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="text-gray-400 text-xs hover:text-gray-600 transition-colors underline-offset-2 hover:underline disabled:opacity-50"
          >
            {loading ? 'Submitting…' : 'Skip & Submit'}
          </button>
          <Button onClick={handleSubmit} loading={loading} disabled={loading}>
            Get My Exact Quote
          </Button>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        No obligation. No hidden fees. We confirm everything before your move.
      </p>
    </div>
  );
}
