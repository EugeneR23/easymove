'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';

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

type PropertyType = 'house' | 'apartment';

interface Props { data: WizardData; update: (p: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

function Tile({
  label, sub, selected, onClick,
}: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 px-4 py-4 border text-left transition-all duration-150',
        selected ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/40',
      )}
    >
      <p className={cn('text-sm font-semibold leading-tight', selected ? 'text-charcoal' : 'text-gray-600')}>
        {label}
      </p>
      {sub && (
        <p className={cn('text-xs mt-1', selected ? 'text-gray-500' : 'text-gray-400')}>{sub}</p>
      )}
    </button>
  );
}

export default function Step3Locations({ data, update, onNext, onBack }: Props) {
  const inv = data.inventory;
  const updateInv = (patch: Partial<typeof inv>) => update({ inventory: { ...inv, ...patch } });

  const isLocal = data.moveType === 'local';
  const valid = data.fromCity && data.fromState && data.toCity && data.toState;

  // Local UI state for the property flow
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [elevatorInApt, setElevatorInApt] = useState<boolean | null>(null);
  const [houseFloors, setHouseFloors] = useState<number | null>(null);  // 1 | 2 | 3
  const [aptFloor, setAptFloor]         = useState<number | null>(null); // 1 | 2 | 3 | 4

  function pickPropertyType(type: PropertyType) {
    setPropertyType(type);
    setElevatorInApt(null);
    setHouseFloors(null);
    setAptFloor(null);
    updateInv({
      isHighRise: type === 'apartment',
      hasElevator: false,
      hasStairs: false,
      stairsFlights: 0,
    });
  }

  // House: stairs = floors - 1
  function pickHouseFloors(floors: number) {
    setHouseFloors(floors);
    const stairs = Math.max(0, floors - 1);
    updateInv({ hasStairs: stairs > 0, stairsFlights: stairs });
  }

  function pickElevator(hasElevator: boolean) {
    setElevatorInApt(hasElevator);
    setAptFloor(null);
    updateInv({ hasElevator, hasStairs: false, stairsFlights: 0 });
  }

  // Apartment, no elevator: first floor is free — stairs = floor - 1
  function pickAptFloor(floor: number) {
    setAptFloor(floor);
    const stairs = Math.max(0, floor - 1);
    updateInv({ hasStairs: stairs > 0, stairsFlights: stairs });
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">Where are you moving?</h2>
      <p className="text-gray-500 text-sm mb-8">Enter your locations, then answer a few quick questions about the property.</p>

      {/* ── Location fields ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Moving From</h3>
          {isLocal ? (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">City *</label>
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
              <Input label="City *" required placeholder="Miami"    value={data.fromCity}  onChange={(e) => update({ fromCity: e.target.value })} />
              <Select label="State *" options={US_STATES}           value={data.fromState} onChange={(e) => update({ fromState: e.target.value })} />
            </>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Moving To</h3>
          {isLocal ? (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">City *</label>
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
              <Input label="City *" required placeholder="New York" value={data.toCity}   onChange={(e) => update({ toCity: e.target.value })} />
              <Select label="State *" options={US_STATES}           value={data.toState}  onChange={(e) => update({ toState: e.target.value })} />
            </>
          )}
        </div>
      </div>

      {/* ── Property type flow ──────────────────────────────────────────────── */}
      <div className="space-y-7 mb-8">

        {/* Step A: Property type */}
        <div>
          <p className="text-sm font-semibold text-charcoal mb-3">What type of property?</p>
          <div className="flex gap-3">
            <Tile
              label="House"
              selected={propertyType === 'house'}
              onClick={() => pickPropertyType('house')}
            />
            <Tile
              label="Apartment / Condo"
              selected={propertyType === 'apartment'}
              onClick={() => pickPropertyType('apartment')}
            />
          </div>
        </div>

        {/* Step B — House: number of floors */}
        {propertyType === 'house' && (
          <div>
            <p className="text-sm font-semibold text-charcoal mb-1">How many floors?</p>
            <p className="text-xs text-gray-400 mb-3">Each floor above the first adds a stair fee.</p>
            <div className="flex gap-3">
              <Tile label="1"  sub="No stairs"  selected={houseFloors === 1} onClick={() => pickHouseFloors(1)} />
              <Tile label="2"  sub="+$50"        selected={houseFloors === 2} onClick={() => pickHouseFloors(2)} />
              <Tile label="3+" sub="+$100"       selected={houseFloors === 3} onClick={() => pickHouseFloors(3)} />
            </div>
          </div>
        )}

        {/* Step B — Apartment: elevator? */}
        {propertyType === 'apartment' && (
          <div>
            <p className="text-sm font-semibold text-charcoal mb-1">Is there an elevator?</p>
            <p className="text-xs text-gray-400 mb-3">No extra charge for elevator access — this just helps us plan.</p>
            <div className="flex gap-3">
              <Tile
                label="Yes"
                sub="No extra charge"
                selected={elevatorInApt === true}
                onClick={() => pickElevator(true)}
              />
              <Tile
                label="No"
                sub="Stair fee may apply"
                selected={elevatorInApt === false}
                onClick={() => pickElevator(false)}
              />
            </div>
          </div>
        )}

        {/* Elevator confirmed — reassurance note */}
        {propertyType === 'apartment' && elevatorInApt === true && (
          <p className="text-xs text-gray-400 border-l-2 border-gold/40 pl-3">
            Got it — we&apos;ll coordinate elevator access on move day. No extra charge.
          </p>
        )}

        {/* Step C — Apartment, no elevator: which floor */}
        {propertyType === 'apartment' && elevatorInApt === false && (
          <div>
            <p className="text-sm font-semibold text-charcoal mb-1">How many floors up?</p>
            <p className="text-xs text-gray-400 mb-3">$50 per floor carried without an elevator.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Tile label="1st" sub="No charge" selected={aptFloor === 1} onClick={() => pickAptFloor(1)} />
              <Tile label="2nd" sub="+$50"      selected={aptFloor === 2} onClick={() => pickAptFloor(2)} />
              <Tile label="3rd" sub="+$100"     selected={aptFloor === 3} onClick={() => pickAptFloor(3)} />
              <Tile label="4th+" sub="+$150"    selected={aptFloor === 4} onClick={() => pickAptFloor(4)} />
            </div>
          </div>
        )}
      </div>

      {/* ── Notes ───────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-charcoal mb-1">
          Anything we should know about your move?{' '}
          <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          value={data.notes}
          onChange={(e) => update({ notes: e.target.value })}
          placeholder="e.g. large sectional sofa, fragile antique mirror, tight stairwell..."
          rows={3}
          className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold resize-none"
        />
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!valid}>Continue</Button>
      </div>
    </div>
  );
}
