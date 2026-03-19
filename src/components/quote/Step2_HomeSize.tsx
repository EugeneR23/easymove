import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import type { HomeSize, CrewSize } from '@/types';
import { localStartingPrice } from '@/lib/pricing';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';

const HOME_SIZES: { value: HomeSize; label: string; sub: string }[] = [
  { value: 'studio',  label: 'Studio',       sub: '1 room, minimal items'   },
  { value: '1br',     label: '1 Bedroom',    sub: '1 bed + living areas'    },
  { value: '2br',     label: '2 Bedrooms',   sub: '2 beds + common areas'   },
  { value: '3br',     label: '3 Bedrooms',   sub: '3 beds + full home'      },
  { value: '4br+',    label: '4+ Bedrooms',  sub: 'Large home or estate'    },
  { value: 'office',  label: 'Office / Commercial', sub: 'Business space'   },
];

interface Props { data: WizardData; update: (p: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step2HomeSize({ data, update, onNext, onBack }: Props) {
  const inv = data.inventory;
  const isLocal = data.moveType === 'local';

  const setHomeSize = (size: HomeSize) => {
    update({ inventory: { ...inv, homeSize: size } });
  };
  const setCrewSize = (crew: CrewSize) => {
    update({ inventory: { ...inv, crewSize: crew } });
  };

  const valid = !!inv.homeSize;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">What size is your home?</h2>
      <p className="text-gray-500 text-sm mb-8">
        {isLocal
          ? 'Select your home size — your live estimate updates automatically as you go.'
          : 'This helps us size your long-distance shipment.'}
      </p>

      {/* Home size grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {HOME_SIZES.map((opt) => {
          const selected = inv.homeSize === opt.value;
          const startPrice = isLocal
            ? localStartingPrice(opt.value, inv.crewSize ?? 2)
            : null;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setHomeSize(opt.value)}
              className={cn(
                'p-4 border text-left transition-all duration-150',
                selected
                  ? 'border-gold bg-gold/5'
                  : 'border-gray-200 hover:border-gold/40',
              )}
            >
              <p className={cn('font-semibold text-sm mb-0.5', selected ? 'text-charcoal' : 'text-charcoal')}>
                {opt.label}
              </p>
              <p className="text-gray-400 text-xs mb-2">{opt.sub}</p>
              {isLocal && startPrice !== null && (
                <p className={cn('text-xs font-semibold', selected ? 'text-gold' : 'text-gray-400')}>
                  from {formatCurrency(startPrice)}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Crew size — only show for local moves */}
      {isLocal && (
        <div className="mb-8">
          <p className="text-sm font-semibold text-charcoal mb-1">Crew size</p>
          <p className="text-xs text-gray-400 mb-4">
            2 movers handle most homes. 3 movers are recommended for 3+ bedrooms, heavy items, or tight timelines.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {([2, 3] as CrewSize[]).map((crew) => {
              const selected = (inv.crewSize ?? 2) === crew;
              const price = localStartingPrice(inv.homeSize ?? '2br', crew);
              return (
                <button
                  key={crew}
                  type="button"
                  onClick={() => setCrewSize(crew)}
                  className={cn(
                    'p-4 border text-left transition-all duration-150',
                    selected ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/40',
                  )}
                >
                  <p className={cn('font-semibold mb-0.5', selected ? 'text-charcoal' : 'text-charcoal')}>
                    {crew} Movers
                  </p>
                  <p className="text-gray-400 text-xs mb-2">
                    {crew === 2 ? '$119/hr · $79 truck fee' : '$169/hr · $99 truck fee'}
                  </p>
                  <p className={cn('text-xs font-semibold', selected ? 'text-gold' : 'text-gray-400')}>
                    {inv.homeSize ? `from ${formatCurrency(price)}` : 'Select home size above'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isLocal && (
        <p className="text-xs text-gray-400 mb-6 bg-gray-50 p-3 border border-gray-100">
          3-hour minimum applies to all local moves.
          All prices are preliminary estimates — final quote confirmed after move review.
        </p>
      )}

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <div className="flex items-center gap-4">
          <p className="text-gray-400 text-xs hidden sm:block">Fully insured · Handled with care</p>
          <Button onClick={onNext} disabled={!valid}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
