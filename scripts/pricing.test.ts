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
  minInvoice,
  HOURLY_RATE,
} from '../src/lib/pricing';
import type { QuoteInventory, QuoteAddons } from '../src/types';

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
// 2br = 4.5h x $129 = $581 labour + $129 flat truck = $710.
console.log('\n[4] Local move regression');
const local = calculatePricing({
  moveType: 'local', estimatedDistance: 0,
  fromCity: 'Miami', toCity: 'Fort Lauderdale', inventory, addons,
});
check('local 2br/2 movers Miami-FtL total ($710)', local.total === 710, local.total);
check('local distance table still works (28 mi)', estimateLocalDistance('Miami', 'Fort Lauderdale') === 28, estimateLocalDistance('Miami', 'Fort Lauderdale'));

// ── 5. Truck fee is $129 flat per day — never scaled by distance ──────────────
console.log('\n[5] Truck fee model');
const nearMove = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Hollywood', toCity: 'Hollywood', inventory, addons });
const farMove  = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: 'Miami', toCity: 'Boca Raton', inventory, addons });
check('truck fee $129 with 2 movers, short trip', nearMove.truckFee === 129, nearMove.truckFee);
check('truck fee $129 with 2 movers, long local trip (no distance scaling)', farMove.truckFee === 129, farMove.truckFee);

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

console.log(failed === 0 ? '\nALL PASS' : `\n${failed} FAILURE(S)`);
process.exit(failed === 0 ? 0 : 1);
