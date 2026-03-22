import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';

interface Props { data: WizardData; update: (p: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function StepPackingMaterials({ data, update, onNext, onBack }: Props) {
  const ourMaterials = data.addons.climateControlled;

  const select = (ours: boolean) => {
    update({ addons: { ...data.addons, climateControlled: ours } });
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">
        Who provides the packing materials?
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Boxes, tape, bubble wrap, and protective supplies.
      </p>

      <div className="space-y-3 mb-6">
        {[
          {
            value: false,
            label: 'I provide my own materials',
            sub: 'You supply boxes, tape, and bubble wrap',
          },
          {
            value: true,
            label: 'You provide materials',
            sub: 'We bring boxes, tape, bubble wrap, and packing paper',
          },
        ].map((opt) => {
          const selected = ourMaterials === opt.value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => select(opt.value)}
              className={cn(
                'w-full flex items-center gap-5 p-5 border text-left transition-all duration-150',
                selected
                  ? 'border-gold bg-gold/5'
                  : 'border-gray-200 hover:border-gold/40 hover:bg-gray-50/50',
              )}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-charcoal mb-0.5">{opt.label}</p>
                <p className="text-gray-400 text-sm">{opt.sub}</p>
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

      {ourMaterials && (
        <div className="bg-cream border border-gold/20 px-4 py-3 mb-6 text-xs text-gray-500 leading-relaxed">
          Materials cost is quoted separately based on what&rsquo;s needed — we&rsquo;ll confirm the exact amount before your appointment.
        </div>
      )}

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
}
