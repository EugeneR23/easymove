import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';
import type { QuoteAddons } from '@/types';
import { X } from 'lucide-react';
import { useState } from 'react';

interface Addon {
  key: keyof QuoteAddons;
  label: string;
  description: string;
  price: string;
}

const ADDONS: Addon[] = [
  {
    key: 'packingService',
    label: 'Professional Packing',
    description: 'Full-service packing — we bring all materials and handle everything.',
    price: 'Priced by home size',
  },
  {
    key: 'climateControlled',
    label: 'Packing Materials',
    description: 'Boxes, tape, and protective wrap — billed after the move based on usage.',
    price: 'Based on usage',
  },
  {
    key: 'furnitureAssembly',
    label: 'Furniture Disassembly & Reassembly',
    description: 'Basic disassembly included. Complex items quoted separately if needed.',
    price: 'Basic included',
  },
  {
    key: 'artHandling',
    label: 'Heavy / Specialty Items',
    description: 'Piano, antiques, heavy safes, fine art. Pricing confirmed after review.',
    price: 'Quote after review',
  },
];

interface Props { data: WizardData; update: (p: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step4Services({ data, update, onNext, onBack }: Props) {
  const addons = data.addons;
  const inv    = data.inventory;
  const [specialItem, setSpecialItem] = useState('');

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

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">Anything else we should know?</h2>
      <p className="text-gray-500 text-sm mb-8">
        All add-ons are optional — select what applies and we&apos;ll include it in your estimate. You can always adjust later.
      </p>

      <div className="space-y-2 mb-8">
        {ADDONS.map((addon) => {
          const selected = !!addons[addon.key];
          return (
            <button
              key={addon.key}
              type="button"
              onClick={() => toggleAddon(addon.key)}
              className={cn(
                'w-full flex items-start gap-4 p-4 border text-left transition-all duration-150',
                selected ? 'border-gold bg-gold/5' : 'border-gray-100 hover:border-gold/30',
              )}
            >
              <div className={cn(
                'w-5 h-5 border shrink-0 mt-0.5 flex items-center justify-center transition-all',
                selected ? 'border-gold bg-gold' : 'border-gray-300',
              )}>
                {selected && <span className="text-white text-xs leading-none">✓</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn('font-semibold text-sm', selected ? 'text-charcoal' : 'text-charcoal')}>{addon.label}</p>
                  <span className={cn('text-xs font-semibold shrink-0', selected ? 'text-gold' : 'text-gray-400')}>{addon.price}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{addon.description}</p>
              </div>
            </button>
          );
        })}

        {/* Storage */}
        <div className={cn('p-4 border transition-all', addons.storageMonths > 0 ? 'border-gold bg-gold/5' : 'border-gray-100')}>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <p className="font-semibold text-sm text-charcoal">Storage</p>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                We pick up, store securely, and deliver back when you&apos;re ready.
                No need to rent a unit or manage logistics.
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-400 shrink-0">From $200/mo</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">Months needed:</span>
            {[0, 1, 2, 3, 6].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => update({ addons: { ...addons, storageMonths: n } })}
                className={cn(
                  'w-10 h-8 border text-sm font-medium transition-all',
                  addons.storageMonths === n ? 'border-gold bg-gold text-white' : 'border-gray-200 text-gray-500 hover:border-gold/50',
                )}
              >
                {n === 0 ? 'No' : n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Specialty items list */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-charcoal mb-1">Specialty Items to Note</p>
        <p className="text-xs text-gray-400 mb-3">Piano, sculpture, wine collection, antiques, safe, etc.</p>
        <div className="flex gap-2 mb-3">
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
          <div className="flex flex-wrap gap-2">
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

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <div className="flex items-center gap-4">
          <p className="text-gray-400 text-xs hidden sm:block">Almost done — 2 more steps</p>
          <Button onClick={onNext}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
