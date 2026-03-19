import { cn } from '@/lib/utils';
import type { MoveType } from '@/types';
import { Truck, MapPin, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';

const MOVE_TYPES: { value: MoveType; label: string; sub: string; icon: React.ElementType }[] = [
  { value: 'local',         label: 'Local Move',        sub: 'Same city or within South Florida', icon: Truck },
  { value: 'long-distance', label: 'Long-Distance',     sub: 'Out of state or out of region',     icon: MapPin },
  { value: 'specialty',     label: 'Specialty / Fine Art', sub: 'Piano, art, wine, custom items', icon: Star },
];

interface Props { data: WizardData; update: (p: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step1MoveType({ data, update, onNext }: Props) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">What type of move is this?</h2>
      <p className="text-gray-500 text-sm mb-8">Select the option that best describes your relocation.</p>

      <div className="space-y-3 mb-8">
        {MOVE_TYPES.map((mt) => {
          const Icon = mt.icon;
          const selected = data.moveType === mt.value;
          return (
            <button
              key={mt.value}
              type="button"
              onClick={() => update({ moveType: mt.value })}
              className={cn(
                'w-full flex items-center gap-5 p-5 border text-left transition-all duration-150',
                selected
                  ? 'border-gold bg-gold/5'
                  : 'border-gray-200 hover:border-gold/40 hover:bg-gray-50/50',
              )}
            >
              <div className={cn(
                'w-11 h-11 flex items-center justify-center shrink-0 transition-colors',
                selected ? 'bg-gold' : 'bg-gray-100',
              )}>
                <Icon size={18} className={selected ? 'text-white' : 'text-gray-500'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn('font-semibold', selected ? 'text-charcoal' : 'text-charcoal')}>{mt.label}</p>
                <p className="text-gray-400 text-sm mt-0.5">{mt.sub}</p>
              </div>
              <div className={cn(
                'w-5 h-5 border rounded-full flex items-center justify-center shrink-0 transition-all',
                selected ? 'border-gold bg-gold' : 'border-gray-300',
              )}>
                {selected && <span className="w-2 h-2 rounded-full bg-white block" />}
              </div>
            </button>
          );
        })}
      </div>

      {data.moveType === 'specialty' && (
        <div className="bg-cream border border-gold/20 p-4 mb-6">
          <p className="text-sm text-charcoal font-medium mb-1">Specialty moves are quoted individually.</p>
          <p className="text-xs text-gray-500">
            Continue to provide your details and we will follow up with a custom quote — typically within a few hours.
          </p>
        </div>
      )}

      <div className="flex justify-end items-center gap-5">
        <p className="text-gray-400 text-xs">No obligation · Takes ~2 minutes</p>
        <Button onClick={onNext} size="lg">Continue</Button>
      </div>
    </div>
  );
}
