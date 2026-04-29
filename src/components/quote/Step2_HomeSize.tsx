'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import type { HomeSize, CrewSize } from '@/types';
import { localStartingPrice } from '@/lib/pricing';
import Button from '@/components/ui/Button';
import type { WizardData } from './QuoteWizard';

const HOME_SIZES: { value: HomeSize; label: string; sub: string }[] = [
  { value: 'studio',  label: 'Studio',              sub: '1 room, minimal items'   },
  { value: '1br',     label: '1 Bedroom',           sub: '1 bed + living areas'    },
  { value: '2br',     label: '2 Bedrooms',          sub: '2 beds + common areas'   },
  { value: '3br',     label: '3 Bedrooms',          sub: '3 beds + full home'      },
  { value: '4br+',    label: '4+ Bedrooms',         sub: 'Large home or estate'    },
  { value: 'office',  label: 'Office / Commercial', sub: 'Business space'          },
];

const FL_CITIES = [
  'Miami', 'Coral Gables', 'Coconut Grove', 'Brickell', 'Aventura',
  'Sunny Isles Beach', 'Hollywood', 'Fort Lauderdale', 'Pompano Beach',
  'Boca Raton', 'Delray Beach', 'Palm Beach', 'West Palm Beach', 'Other',
];

const US_STATES = [
  { value: '', label: 'Select State' },
  ...['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
      'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA',
      'RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map((s) => ({ value: s, label: s })),
];

type PropertyType = 'house' | 'apartment';

function Tile({ label, sub, selected, onClick }: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
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

interface Props { data: WizardData; update: (p: Partial<WizardData>) => void; onNext: () => void; onBack: () => void }

export default function Step2HomeSize({ data, update, onNext, onBack }: Props) {
  const inv = data.inventory;
  const isLocal   = data.moveType === 'local';
  const isPacking = data.moveType === 'packing-only';
  const showCrew  = isLocal || isPacking;

  // Property type flow state
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [elevatorInApt, setElevatorInApt] = useState<boolean | null>(null);
  const [houseFloors, setHouseFloors]     = useState<number | null>(null);
  const [aptFloor, setAptFloor]           = useState<number | null>(null);

  // Min date for scheduling
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const minDateStr = minDate.toISOString().split('T')[0];

  const updateInv = (patch: Partial<typeof inv>) => update({ inventory: { ...inv, ...patch } });

  const setHomeSize = (size: HomeSize) => updateInv({ homeSize: size });
  const setCrewSize = (crew: CrewSize) => updateInv({ crewSize: crew });

  function pickPropertyType(type: PropertyType) {
    setPropertyType(type);
    setElevatorInApt(null);
    setHouseFloors(null);
    setAptFloor(null);
    updateInv({ isHighRise: type === 'apartment', hasElevator: false, hasStairs: false, stairsFlights: 0 });
  }

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

  function pickAptFloor(floor: number) {
    setAptFloor(floor);
    const stairs = Math.max(0, floor - 1);
    updateInv({ hasStairs: stairs > 0, stairsFlights: stairs });
  }

  const valid = !!inv.homeSize;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">What size is your home?</h2>
      <p className="text-gray-500 text-sm mb-8">
        {isPacking
          ? 'Select your home size to get a packing estimate.'
          : isLocal
            ? 'Select your home size — your live estimate updates automatically as you go.'
            : 'This helps us size your long-distance shipment.'}
      </p>

      {/* ── Home size grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {HOME_SIZES.map((opt) => {
          const selected = inv.homeSize === opt.value;
          const startPrice = isLocal ? localStartingPrice(opt.value, inv.crewSize ?? 2) : null;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setHomeSize(opt.value)}
              className={cn(
                'p-4 border text-left transition-all duration-150',
                selected ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/40',
              )}
            >
              <p className="font-semibold text-sm mb-0.5 text-charcoal">{opt.label}</p>
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

      {/* ── Crew size ───────────────────────────────────────────────────── */}
      {showCrew && (
        <div className="mb-8">
          <p className="text-sm font-semibold text-charcoal mb-1">Crew size</p>
          <p className="text-xs text-gray-400 mb-4">
            {isPacking
              ? '2 packers handle most homes. 3 packers are faster for larger spaces or tight timelines.'
              : '2 movers handle most homes. 3 movers are recommended for 3+ bedrooms, heavy items, or tight timelines.'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {([2, 3] as CrewSize[]).map((crew) => {
              const selected    = (inv.crewSize ?? 2) === crew;
              const packingRate = crew === 2 ? 79 : 119;
              const localRate   = crew === 2 ? 119 : 169;
              const localPrice  = localStartingPrice(inv.homeSize ?? '2br', crew);
              const packingMin  = packingRate * 3;
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
                  <p className="font-semibold text-charcoal mb-0.5">
                    {crew} {isPacking ? 'Packers' : 'Movers'}
                  </p>
                  <p className="text-gray-400 text-xs mb-2">
                    {isPacking
                      ? `$${packingRate}/hr · 3-hr minimum`
                      : `$${localRate}/hr · from $79 truck fee`}
                  </p>
                  <p className={cn('text-xs font-semibold', selected ? 'text-gold' : 'text-gray-400')}>
                    {inv.homeSize
                      ? isPacking ? `from ${formatCurrency(packingMin)}` : `from ${formatCurrency(localPrice)}`
                      : 'Select home size above'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showCrew && (
        <p className="text-xs text-gray-400 mb-6 bg-gray-50 p-3 border border-gray-100">
          3-hour minimum applies. All prices are preliminary — final quote confirmed before your appointment.
        </p>
      )}

      {/* ── Optional details divider ────────────────────────────────────── */}
      {!isPacking && (
        <div className="border-t border-gray-100 pt-6 mt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-1">
            More details <span className="font-normal normal-case tracking-normal">(optional — helps us give a more accurate estimate)</span>
          </p>

          {/* ── From / To ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-3">Moving From</p>
              {isLocal ? (
                <select
                  value={data.fromCity}
                  onChange={(e) => update({ fromCity: e.target.value, fromState: 'FL' })}
                  className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
                >
                  <option value="">Select city</option>
                  {FL_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <div className="space-y-3">
                  <input
                    placeholder="City"
                    value={data.fromCity}
                    onChange={(e) => update({ fromCity: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:border-gold"
                  />
                  <select
                    value={data.fromState}
                    onChange={(e) => update({ fromState: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:border-gold"
                  >
                    {US_STATES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2 mb-3">Moving To</p>
              {isLocal ? (
                <select
                  value={data.toCity}
                  onChange={(e) => update({ toCity: e.target.value, toState: 'FL' })}
                  className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold text-sm"
                >
                  <option value="">Select city</option>
                  {FL_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <div className="space-y-3">
                  <input
                    placeholder="City"
                    value={data.toCity}
                    onChange={(e) => update({ toCity: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:border-gold"
                  />
                  <select
                    value={data.toState}
                    onChange={(e) => update({ toState: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:border-gold"
                  >
                    {US_STATES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* ── Property type ─────────────────────────────────────────── */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-charcoal mb-3">What type of property?</p>
            <div className="flex gap-3">
              <Tile label="House"              selected={propertyType === 'house'}     onClick={() => pickPropertyType('house')} />
              <Tile label="Apartment / Condo"  selected={propertyType === 'apartment'} onClick={() => pickPropertyType('apartment')} />
            </div>
          </div>

          {/* ── House: floors ─────────────────────────────────────────── */}
          {propertyType === 'house' && (
            <div className="mb-5">
              <p className="text-sm font-semibold text-charcoal mb-1">How many floors?</p>
              <p className="text-xs text-gray-400 mb-3">Each floor above the first adds a stair fee.</p>
              <div className="flex gap-3">
                <Tile label="1" sub="No stairs" selected={houseFloors === 1} onClick={() => pickHouseFloors(1)} />
                <Tile label="2" sub="+$50"      selected={houseFloors === 2} onClick={() => pickHouseFloors(2)} />
                <Tile label="3+" sub="+$100"    selected={houseFloors === 3} onClick={() => pickHouseFloors(3)} />
              </div>
            </div>
          )}

          {/* ── Apartment: elevator ───────────────────────────────────── */}
          {propertyType === 'apartment' && (
            <div className="mb-5">
              <p className="text-sm font-semibold text-charcoal mb-1">Is there an elevator?</p>
              <p className="text-xs text-gray-400 mb-3">No extra charge for elevator access — this just helps us plan.</p>
              <div className="flex gap-3">
                <Tile label="Yes" sub="No extra charge"   selected={elevatorInApt === true}  onClick={() => pickElevator(true)}  />
                <Tile label="No"  sub="Stair fee may apply" selected={elevatorInApt === false} onClick={() => pickElevator(false)} />
              </div>
            </div>
          )}

          {propertyType === 'apartment' && elevatorInApt === true && (
            <p className="text-xs text-gray-400 border-l-2 border-gold/40 pl-3 mb-5">
              Got it — we&apos;ll coordinate elevator access on move day. No extra charge.
            </p>
          )}

          {/* ── Apartment, no elevator: floor ────────────────────────── */}
          {propertyType === 'apartment' && elevatorInApt === false && (
            <div className="mb-5">
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

          {/* ── Preferred date ────────────────────────────────────────── */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-charcoal mb-2">Preferred move date</p>
            <input
              type="date"
              min={minDateStr}
              value={data.preferredDate || ''}
              onChange={(e) => update({ preferredDate: e.target.value })}
              className="block w-full px-4 py-3 border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 hover:border-gold/60 transition-colors cursor-pointer"
              style={{ colorScheme: 'light' }}
            />
            <button
              type="button"
              onClick={() => update({ flexibleDates: !data.flexibleDates })}
              className={cn(
                'flex items-center gap-2 mt-3 p-3 border w-full sm:w-auto transition-all',
                data.flexibleDates ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/40',
              )}
            >
              <div className={cn('w-4 h-4 border flex items-center justify-center shrink-0', data.flexibleDates ? 'border-gold bg-gold' : 'border-gray-300')}>
                {data.flexibleDates && <span className="text-white text-[10px] leading-none">✓</span>}
              </div>
              <span className={cn('text-sm', data.flexibleDates ? 'text-charcoal' : 'text-charcoal')}>My dates are flexible</span>
              <span className="text-gray-400 text-xs ml-1">— may allow better pricing</span>
            </button>
          </div>
        </div>
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
