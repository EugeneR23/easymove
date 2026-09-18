/**
 * One-off pricing regression test — run with: npx tsx scripts/pricing.test.ts
 *
 * Local hourly pricing, plus the rule added 2026-09-18: nothing crossing a state
 * line, and nothing long-distance at all, may come back carrying a dollar figure.
 */
import {
  calculatePricing,
  estimateLocalDistance,
  routeMode,
  resolveLocalDistance,
  travelHoursFor,
  normalizeCrewSize,
  minInvoice,
  HOURLY_RATE,
  PACKING_HOURLY_RATE,
} from '../src/lib/pricing';
import { readFileSync } from 'node:fs';
import type { QuoteInventory, QuoteAddons, CrewSize } from '../src/types';

let failed = 0;
function check(name: string, cond: boolean, actual: unknown) {
  if (cond) { console.log(`  PASS  ${name}`); }
  else      { console.error(`  FAIL  ${name} — got: ${JSON.stringify(actual)}`); failed++; }
}

const inventory: QuoteInventory = {
  homeSize: '2br', crewSize: 2, bedrooms: 2, bathrooms: 1,
  estimatedBoxes: 0, specialItems: [], hasElevator: false, hasStairs: false,
  stairsFlights: 1, isHighRise: false, needsCOI: false, hasGarage: false, hasStorage: false,
};
const addons: QuoteAddons = {
  packingService: false, unpackingService: false, furnitureAssembly: false,
  storageMonths: 0, autoTransport: false, artHandling: false, climateControlled: false,
};

// ── 1. Out-of-state and Florida long-distance carry no automatic price ──────
// Until 2026-09-18 this file asserted the opposite: that Venice FL → Cary NC
// priced at $3,000-$4,500 and never below a $1,500 floor. The company holds no
// interstate authority, so those were prices for a job it refuses. The engine
// no longer computes them and these checks fail if it ever does again.
console.log('\n[1] routeMode');
check('FL → FL local is priced',            routeMode('FL', 'FL', 'local') === 'priced', routeMode('FL', 'FL', 'local'));
check('FL → FL long-distance is custom',    routeMode('FL', 'FL', 'long-distance') === 'custom', routeMode('FL', 'FL', 'long-distance'));
check('FL → OUT is a referral',             routeMode('FL', 'OUT', 'local') === 'referral', routeMode('FL', 'OUT', 'local'));
check('a raw state code is still a referral', routeMode('FL', 'WA', 'long-distance') === 'referral', routeMode('FL', 'WA', 'long-distance'));
check('lower case is not a loophole',        routeMode('fl', 'wa', 'local') === 'referral', routeMode('fl', 'wa', 'local'));
check('an origin outside FL is a referral',  routeMode('NY', 'FL', 'local') === 'referral', routeMode('NY', 'FL', 'local'));
check('a blank destination is not yet a refusal', routeMode('FL', '', 'local') === 'priced', routeMode('FL', '', 'local'));

console.log('\n[2] a referral never carries a figure');
const seattle = calculatePricing({
  moveType: 'long-distance', estimatedDistance: 0,
  fromCity: 'Miami', toCity: 'Seattle', fromState: 'FL', toState: 'OUT',
  inventory, addons,
});
check('out-of-state total is 0', seattle.total === 0, seattle.total);
check('out-of-state labour is 0', seattle.laborRate === 0, seattle.laborRate);
check('out-of-state truck/linehaul is 0', seattle.truckFee === 0, seattle.truckFee);
check("mode says why, so a caller cannot read 0 as 'free'", seattle.quoteMode === 'referral', seattle.quoteMode);

console.log('\n[3] Florida long-distance is quoted by hand, not by formula');
const orlando = calculatePricing({
  moveType: 'long-distance', estimatedDistance: 0,
  fromCity: 'Miami', toCity: 'Orlando', fromState: 'FL', toState: 'FL',
  inventory, addons,
});
check('Miami→Orlando total is 0', orlando.total === 0, orlando.total);
check('and is marked custom, not refused', orlando.quoteMode === 'custom', orlando.quoteMode);
check('hours are still estimated so the lead has a shape', orlando.estimatedHours > 0, orlando.estimatedHours);


// ── 4. Local pricing (regression guard) ────────────────────────────────────────
// 2br = 4.5h work + 1h drive (28 mi at 28 mph) = 5.5h x $129 = $710 labour
// + $129 truck = $839. Drive time is billable on an hourly job — confirmed by
// Evgenii 2026-08-24; it is charged as TIME at the crew rate, never as a fee.
console.log('\n[4] Local move regression');
const local = calculatePricing({
  moveType: 'local', estimatedDistance: 0,
  fromCity: 'Miami', toCity: 'Fort Lauderdale', inventory, addons,
});
check('local 2br/2 movers Miami-FtL total ($839)', local.total === 839, local.total);
check('local distance table still works (28 mi)', estimateLocalDistance('Miami', 'Fort Lauderdale') === 28, estimateLocalDistance('Miami', 'Fort Lauderdale'));
check('drive time is inside estimatedHours (4.5 work + 1 drive)', local.estimatedHours === 5.5, local.estimatedHours);
check('drive time is hours, never a fee', local.travelFee === 0 && local.travelHours === 1, `fee ${local.travelFee} / hours ${local.travelHours}`);

// ── 5. Truck fee is $129 flat per day — never scaled by distance ──────────────
console.log('\n[5] Truck fee model');
const nearMove = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Hollywood', toCity: 'Hollywood', inventory, addons });
const farMove  = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Miami', toCity: 'Boca Raton', inventory, addons });
check('truck fee $129 with 2 movers, short trip', nearMove.truckFee === 129, nearMove.truckFee);
check('truck fee $129 with 2 movers, long local trip (no distance scaling)', farMove.truckFee === 129, farMove.truckFee);
// The distance shows up in HOURS, not in the truck line. A far move must cost
// more than a near one — before 2026-08-24 both were $710 and 96 extra driving
// minutes were free.
check('a 96-min longer drive costs more than a same-city move', farMove.total > nearMove.total, `${nearMove.total} vs ${farMove.total}`);
check('Hollywood-Hollywood: 11 min drive -> 0.25h billed', nearMove.travelHours === 0.25 && nearMove.total === 742, `${nearMove.travelHours}h / $${nearMove.total}`);
check('Miami-Boca Raton: 107 min drive -> 2h billed', farMove.travelHours === 2 && farMove.total === 968, `${farMove.travelHours}h / $${farMove.total}`);

// The truck is charged at the crew's hourly rate (2026-08-24 rate card), so it
// is NOT flat. These three are the cases that a flat-$129 model gets wrong —
// without them the suite passes on either model and proves nothing.
const crew3 = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Miami', toCity: 'Miami', inventory: { ...inventory, crewSize: 3 }, addons });
const crew4 = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Miami', toCity: 'Miami', inventory: { ...inventory, crewSize: 4 }, addons });
check('truck fee $179 with 3 movers', crew3.truckFee === 179, crew3.truckFee);
check('truck fee $219 with 4 movers', crew4.truckFee === 219, crew4.truckFee);
check('truck fee scales with crew, never flat', crew3.truckFee !== nearMove.truckFee && crew4.truckFee !== crew3.truckFee, `${nearMove.truckFee}/${crew3.truckFee}/${crew4.truckFee}`);
check('truck fee equals that crew\'s hourly rate', crew3.truckFee === HOURLY_RATE[3] && crew4.truckFee === HOURLY_RATE[4], `${crew3.truckFee} vs ${HOURLY_RATE[3]}`);
check('4-mover rate is $219, not the retired $229', HOURLY_RATE[4] === 219, HOURLY_RATE[4]);

// Smallest invoice per crew: 3h × rate + that crew's truck.
check('minimum invoice $516 / $716 / $876 by crew',
  minInvoice(2) === 516 && minInvoice(3) === 716 && minInvoice(4) === 876,
  `${minInvoice(2)}/${minInvoice(3)}/${minInvoice(4)}`);

// ── 6. Stairs cost time, not a fee ────────────────────────────────────────────
console.log('\n[6] Stairs = hours, never a fee');
const stairsInv: QuoteInventory = { ...inventory, hasStairs: true, stairsFlights: 2 };
const stairsMove = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Miami', toCity: 'Miami', inventory: stairsInv, addons });
const flatMove   = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Miami', toCity: 'Miami', inventory, addons });
check('no access fee for stairs', stairsMove.accessFee === 0, stairsMove.accessFee);
check('stairs add estimated hours (+1h for 2 flights)', stairsMove.estimatedHours === flatMove.estimatedHours + 1, stairsMove.estimatedHours);
check('stairs raise labour, not fees', stairsMove.laborRate > flatMove.laborRate, stairsMove.laborRate);

// ── 7. Drive time is billed only when the route is actually known ─────────────
// Every check below failed against the code that shipped before 2026-08-24.
console.log('\n[7] Unrecognised city — mileage is a guess, and a guess is not billed');
const typo = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Maimi', toCity: 'Bocca Raton', inventory, addons });
check('typo route is flagged unconfirmed', typo.distanceConfirmed === false, typo.distanceConfirmed);
check('unconfirmed mileage bills zero drive hours', typo.travelHours === 0, typo.travelHours);
check('a known route IS flagged confirmed', local.distanceConfirmed === true, local.distanceConfirmed);
check('resolveLocalDistance separates "15 mi" from "we do not know"',
  resolveLocalDistance('Homestead', 'Key West').confirmed === false
  && resolveLocalDistance('Miami', 'Boca Raton').confirmed === true,
  JSON.stringify(resolveLocalDistance('Homestead', 'Key West')));
check('no cities at all -> nothing billed for driving',
  calculatePricing({ moveType: 'local', estimatedDistance: 0, inventory, addons }).travelHours === 0,
  calculatePricing({ moveType: 'local', estimatedDistance: 0, inventory, addons }).travelHours);
// Billing rounds to 15 minutes — the increment already published on /pricing,
// /moving-cost-miami, /about and in llms.txt.
check('drive time rounds up to 15-minute increments',
  travelHoursFor(1, true) === 0.25 && travelHoursFor(15, true) === 0.25
  && travelHoursFor(16, true) === 0.5 && travelHoursFor(60, true) === 1,
  [travelHoursFor(1, true), travelHoursFor(15, true), travelHoursFor(16, true), travelHoursFor(60, true)].join('/'));
check('unconfirmed distance never rounds into billable time', travelHoursFor(272, false) === 0, travelHoursFor(272, false));

// ── 9. Inputs that cannot be priced must not become NaN ──────────────────────
console.log('\n[9] Corrupt input never reaches the client as a price');
const badCrew = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Miami', toCity: 'Miami', inventory: { ...inventory, crewSize: 5 as unknown as CrewSize }, addons });
check('crew size off the rate table does not produce NaN', Number.isFinite(badCrew.total), badCrew.total);
check('NaN does not survive JSON either', JSON.parse(JSON.stringify(badCrew)).total !== null, JSON.parse(JSON.stringify(badCrew)).total);
check('normalizeCrewSize clamps anything unpriceable to 2',
  normalizeCrewSize(5) === 2 && normalizeCrewSize(0) === 2 && normalizeCrewSize(undefined) === 2
  && normalizeCrewSize('3') === 3 && normalizeCrewSize(4) === 4,
  [normalizeCrewSize(5), normalizeCrewSize(0), normalizeCrewSize(undefined), normalizeCrewSize('3'), normalizeCrewSize(4)].join('/'));

// ── 10. Rate tables have exactly one home ────────────────────────────────────
console.log('\n[10] One source for every rate');
check('packing rates are exported and match the card ($79/$119/$159)',
  PACKING_HOURLY_RATE[2] === 79 && PACKING_HOURLY_RATE[3] === 119 && PACKING_HOURLY_RATE[4] === 159,
  JSON.stringify(PACKING_HOURLY_RATE));
check('no long-distance input produces a price, whatever mileage is passed in',
  [0, 15, 753, 99999].every((d) =>
    calculatePricing({ moveType: 'long-distance', estimatedDistance: d, fromState: 'FL', toState: 'OUT', inventory, addons }).total === 0),
  [0, 15, 753, 99999].map((d) =>
    calculatePricing({ moveType: 'long-distance', estimatedDistance: d, fromState: 'FL', toState: 'OUT', inventory, addons }).total));

// ── 11. The drive-time examples printed on /pricing must be the engine's ─────
// Written after shipping "about an hour and three quarters" for a route the
// engine bills as 2h: 107 minutes rounds UP to the next quarter-hour. A number
// in prose is still a number, and it drifts silently.
console.log('\n[11] /pricing drive-time copy matches the engine');
{
  const src = readFileSync(new URL('../src/app/pricing/page.tsx', import.meta.url), 'utf8');
  const minutesFor = (f: string, t: string) => Math.round(estimateLocalDistance(f, t) / 28 * 60);
  const spoken: Record<number, string> = {
    0.25: 'a quarter of an hour', 0.5: 'half an hour', 0.75: 'three quarters of an hour',
    1: 'an hour', 1.5: 'an hour and a half', 2: 'two hours', 3: 'three hours',
  };
  const hollywood = travelHoursFor(minutesFor('Hollywood', 'Hollywood'), true);
  const boca      = travelHoursFor(minutesFor('Miami', 'Boca Raton'), true);
  check('the copy exists to check at all', src.includes('The drive between your two addresses is on the clock'), src.length);
  check(`Hollywood example says "${spoken[hollywood]}" (engine: ${hollywood}h)`,
    src.includes(`across Hollywood adds ${spoken[hollywood]}`), spoken[hollywood]);
  check(`Boca Raton example says "${spoken[boca]}" (engine: ${boca}h)`,
    src.includes(`Miami to Boca Raton ${spoken[boca]}`), spoken[boca]);
  check('the retired "one-time travel-time fee" promise is gone', !src.includes('one-time travel-time fee'), src.includes('one-time travel-time fee'));
}

console.log(failed === 0 ? '\nALL PASS' : `\n${failed} FAILURE(S)`);
process.exit(failed === 0 ? 0 : 1);
