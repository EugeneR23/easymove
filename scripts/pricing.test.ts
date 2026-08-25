/**
 * One-off pricing regression test — run with: npx tsx scripts/pricing.test.ts
 *
 * Reproduces the Dmitry lead (Ref mq9keymqq4hr00tv2l, 2026-06-11):
 * long-distance · 2br · 2 movers · Venice, FL → Cary, NC
 * Bug: server used the South-Florida city table → 15 mi → $1800 floor price.
 */
import {
  calculatePricing,
  estimateLocalDistance,
  estimateLongDistance,
  estimateDistance,
  resolveLocalDistance,
  travelHoursFor,
  normalizeCrewSize,
  minInvoice,
  HOURLY_RATE,
  PACKING_HOURLY_RATE,
  LD_MINIMUM,
} from '../src/lib/pricing';
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

// ── 1. Long-distance miles: Venice FL → Cary NC (driving ≈ 715 mi) ────────────
console.log('\n[1] estimateLongDistance');
const miles = estimateLongDistance('Venice', 'FL', 'Cary', 'NC');
check('Venice→Cary ≈ 650–850 mi', miles >= 650 && miles <= 850, miles);

const miaNy = estimateLongDistance('Miami', 'FL', 'New York', 'NY');
check('Miami→New York ≈ 1200–1400 mi', miaNy >= 1200 && miaNy <= 1400, miaNy);

const unknownDest = estimateLongDistance('Venice', 'FL', '', '');
check('Unknown destination → 600 mi default', unknownDest === 600, unknownDest);

const stateOnly = estimateLongDistance('', 'FL', '', 'TX');
check('States only FL→TX ≈ 900–1300 mi', stateOnly >= 900 && stateOnly <= 1300, stateOnly);

// ── 2. Dmitry quote recalculation ──────────────────────────────────────────────
console.log('\n[2] Dmitry: long-distance · 2br · 2 movers · Venice FL → Cary NC');
const dmitry = calculatePricing({
  moveType: 'long-distance',
  estimatedDistance: miles,
  fromCity: 'Venice', toCity: 'Cary',
  inventory, addons,
});
console.log('     →', JSON.stringify(dmitry));
check('counts loading+unloading hours (6–10h)', dmitry.estimatedHours >= 6 && dmitry.estimatedHours <= 10, dmitry.estimatedHours);
check('labor = hours × $129 crew rate', dmitry.laborRate === Math.round(dmitry.estimatedHours * 129), dmitry.laborRate);
check('truck/linehaul ≥ $2000 (FL→NC truck alone costs ~$2k+)', dmitry.truckFee >= 2000, dmitry.truckFee);
check('total in realistic band $3000–$4500', dmitry.total >= 3000 && dmitry.total <= 4500, dmitry.total);
check('travelMiles recorded', dmitry.travelMiles === miles, dmitry.travelMiles);

// ── 3. Old bug must be dead: even with bogus 15 mi the LD floor protects ───────
console.log('\n[3] LD floor with degenerate distance');
const degenerate = calculatePricing({
  moveType: 'long-distance', estimatedDistance: 15,
  fromCity: 'Venice', toCity: 'Cary', inventory, addons,
});
check('LD never prices below $1500 floor', degenerate.total >= 1500, degenerate.total);

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

// ── 8. Long distance: the destination state is not assumed ────────────────────
console.log('\n[8] LD destination resolution');
// The wizard used to pre-select FL and never clear it, so "New York" resolved to
// the Florida state centroid: 199 mi, $1,629, against 1,289 mi and $5,399.
const nyWrongState = estimateLongDistance('Miami', 'FL', 'New York', 'FL');
const nyRightState = estimateLongDistance('Miami', 'FL', 'New York', 'NY');
check('Miami-New York does not depend on the state field being right',
  nyWrongState === nyRightState && nyWrongState > 1200, `${nyWrongState} vs ${nyRightState}`);
check('Miami-Atlanta likewise', estimateLongDistance('Miami', 'FL', 'Atlanta', 'FL') === estimateLongDistance('Miami', 'FL', 'Atlanta', 'GA'),
  `${estimateLongDistance('Miami', 'FL', 'Atlanta', 'FL')} vs ${estimateLongDistance('Miami', 'FL', 'Atlanta', 'GA')}`);
check('blank destination state no longer collapses to 30 mi',
  estimateLongDistance('Miami', 'FL', 'New York', '') > 1200, estimateLongDistance('Miami', 'FL', 'New York', ''));
check('an unresolvable destination falls back to the 600 mi default, never 30',
  estimateLongDistance('Miami', 'FL', 'Nowhereville', '') === 600, estimateLongDistance('Miami', 'FL', 'Nowhereville', ''));
// An ambiguous city name must NOT be guessed — Portland is both OR and ME.
check('an ambiguous city name is left to the given state, not guessed',
  estimateLongDistance('Miami', 'FL', 'Portland', 'OR') !== estimateLongDistance('Miami', 'FL', 'Portland', 'ME'),
  `${estimateLongDistance('Miami', 'FL', 'Portland', 'OR')} vs ${estimateLongDistance('Miami', 'FL', 'Portland', 'ME')}`);
// A real in-state LD destination that is in the table must be unaffected.
check('Miami-Orlando FL still resolves to the Orlando entry',
  estimateLongDistance('Miami', 'FL', 'Orlando', 'FL') === 243, estimateLongDistance('Miami', 'FL', 'Orlando', 'FL'));

// ── 9. Inputs that cannot be priced must not become NaN ──────────────────────
console.log('\n[9] Corrupt input never reaches the client as a price');
const badCrew = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Miami', toCity: 'Miami', inventory: { ...inventory, crewSize: 5 as unknown as CrewSize }, addons });
check('crew size off the rate table does not produce NaN', Number.isFinite(badCrew.total), badCrew.total);
check('NaN does not survive JSON either', JSON.parse(JSON.stringify(badCrew)).total !== null, JSON.parse(JSON.stringify(badCrew)).total);
check('normalizeCrewSize clamps anything unpriceable to 2',
  normalizeCrewSize(5) === 2 && normalizeCrewSize(0) === 2 && normalizeCrewSize(undefined) === 2
  && normalizeCrewSize('3') === 3 && normalizeCrewSize(4) === 4,
  [normalizeCrewSize(5), normalizeCrewSize(0), normalizeCrewSize(undefined), normalizeCrewSize('3'), normalizeCrewSize(4)].join('/'));
check('estimateDistance is case-insensitive', estimateDistance('fl', 'ny') === estimateDistance('FL', 'NY') && estimateDistance('fl', 'ny') === 1280,
  `${estimateDistance('fl', 'ny')} vs ${estimateDistance('FL', 'NY')}`);

// ── 10. Rate tables have exactly one home ────────────────────────────────────
console.log('\n[10] One source for every rate');
check('packing rates are exported and match the card ($79/$119/$159)',
  PACKING_HOURLY_RATE[2] === 79 && PACKING_HOURLY_RATE[3] === 119 && PACKING_HOURLY_RATE[4] === 159,
  JSON.stringify(PACKING_HOURLY_RATE));
check('LD floor still holds after the local change',
  calculatePricing({ moveType: 'long-distance', estimatedDistance: 0, inventory, addons }).total >= LD_MINIMUM,
  calculatePricing({ moveType: 'long-distance', estimatedDistance: 0, inventory, addons }).total);
check('long distance bills no local drive time (fuel + miles are in the linehaul)',
  (calculatePricing({ moveType: 'long-distance', estimatedDistance: 753, fromCity: 'Venice', toCity: 'Cary', inventory, addons }).travelHours ?? 0) === 0,
  calculatePricing({ moveType: 'long-distance', estimatedDistance: 753, fromCity: 'Venice', toCity: 'Cary', inventory, addons }).travelHours);

console.log(failed === 0 ? '\nALL PASS' : `\n${failed} FAILURE(S)`);
process.exit(failed === 0 ? 0 : 1);
