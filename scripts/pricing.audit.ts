/**
 * Pricing & distance audit — what is STILL open.  npx tsx scripts/pricing.audit.ts
 *
 * The first pass (2026-08-24) raised 15 findings. Six are fixed and have moved to
 * scripts/pricing.test.ts as guards, where they belong; that suite is green and
 * every one of its new checks was confirmed to fail against the pre-fix engine.
 *
 * What is left is here: items whose right answer is a business decision, plus the
 * ones the travel-time change made newly urgent. See docs/PRICING_AUDIT_2026-08-24.md.
 *
 * `must(...)` = something that should hold and does not. `OPEN(...)` = evidence
 * for a question only Evgenii can answer; no assertion, because inventing the
 * number would be worse than leaving it open.
 */
import {
  calculatePricing, resolveLocalDistance, estimateLocalDistance,
  estimateLongDistance, localStartingPrice, LD_MINIMUM,
} from '../src/lib/pricing';
import type { QuoteInventory, QuoteAddons, HomeSize, CrewSize } from '../src/types';

let failed = 0, passed = 0, open = 0;

function must(name: string, cond: boolean, actual: unknown) {
  if (cond) { passed++; console.log(`  ok    ${name}`); }
  else      { failed++; console.error(`  FAIL  ${name}\n          got: ${JSON.stringify(actual)}`); }
}
function OPEN(name: string, evidence: unknown) {
  open++; console.log(`  OPEN  ${name}\n          evidence: ${JSON.stringify(evidence)}`);
}

// A check that cannot fail is not a check. Prove the harness does both before
// trusting one line below it.
must('harness canary — a true condition passes', 1 + 1 === 2, 2);
{
  const before = failed;
  let suppressed = 0;
  const orig = console.error;
  console.error = () => { suppressed++; };
  must('harness canary — a false condition fails', 1 + 1 === 3, 3);
  console.error = orig;
  if (failed !== before + 1 || suppressed !== 1) {
    console.error('  ABORT  the harness does not detect failures — every result below is worthless');
    process.exit(2);
  }
  failed = before;
  console.log('  ok    harness canary — a false condition fails');
  passed++;
}

const INV: QuoteInventory = {
  homeSize: '2br', crewSize: 2, bedrooms: 2, bathrooms: 1,
  estimatedBoxes: 0, specialItems: [], hasElevator: false, hasStairs: false,
  stairsFlights: 1, isHighRise: false, needsCOI: false, hasGarage: false, hasStorage: false,
};
const ADD: QuoteAddons = {
  packingService: false, unpackingService: false, furnitureAssembly: false,
  storageMonths: 0, autoTransport: false, artHandling: false, climateControlled: false,
};
const local = (fromCity?: string, toCity?: string, d = 0, inv: QuoteInventory = INV) =>
  calculatePricing({ moveType: 'local', estimatedDistance: d, fromCity, toCity, inventory: inv, addons: ADD });

const LD_MULT: Record<string, number> = { studio: 1, '1br': 1.2, '2br': 1.5, '3br': 2, '4br+': 2.8, office: 1.8 };
const SIZE_HOURS: Record<string, number> = { studio: 2.5, '1br': 3, '2br': 4.5, '3br': 6, '4br+': 8, office: 5 };

// ═══════════════════════════════════════════════════════════════════════════
// CLOSED — kept as a short proof that the six fixes actually landed. The real
// guards live in scripts/pricing.test.ts.
// ═══════════════════════════════════════════════════════════════════════════
console.log('\n[CLOSED] the six fixed findings, re-checked here');
must('F1 · drive time now changes the estimate', local('Miami', 'Boca Raton').total > local('Hollywood', 'Hollywood').total,
  { hollywood: local('Hollywood', 'Hollywood').total, boca: local('Miami', 'Boca Raton').total });
must('F3 · an unrecognised city is flagged and not billed',
  resolveLocalDistance('Maimi', 'Bocca Raton').confirmed === false && local('Maimi', 'Bocca Raton').travelHours === 0,
  { confirmed: resolveLocalDistance('Maimi', 'Bocca Raton').confirmed, billed: local('Maimi', 'Bocca Raton').travelHours });
must('F5 · Miami→New York no longer depends on the state field',
  estimateLongDistance('Miami', 'FL', 'New York', 'FL') === estimateLongDistance('Miami', 'FL', 'New York', 'NY'),
  { withFL: estimateLongDistance('Miami', 'FL', 'New York', 'FL'), withNY: estimateLongDistance('Miami', 'FL', 'New York', 'NY') });
must('F7 · a crew size off the rate table no longer yields NaN',
  Number.isFinite(local('Miami', 'Miami', 0, { ...INV, crewSize: 5 as unknown as CrewSize }).total),
  local('Miami', 'Miami', 0, { ...INV, crewSize: 5 as unknown as CrewSize }).total);
must('F12 · the admin line items now sum to the admin total', (() => {
  const p = calculatePricing({ moveType: 'long-distance', estimatedDistance: estimateLongDistance('Venice', 'FL', 'Cary', 'NC'), fromCity: 'Venice', toCity: 'Cary', inventory: INV, addons: ADD });
  return p.laborRate + p.truckFee + p.accessFee + p.travelFee + p.addonsFee - p.discount === p.total;
})(), 'see admin/quotes/[id]/page.tsx lineItems');
must('F13 · sidebar and server agree when no cities are given',
  local(undefined, undefined, 0).total === local('', '', 0).total,
  { sidebar: local(undefined, undefined, 0).total, server: local('', '', 0).total });

// ═══════════════════════════════════════════════════════════════════════════
// STILL OPEN — needs Evgenii
// ═══════════════════════════════════════════════════════════════════════════

// ── Q6 (NEW) · TRAVEL_SPEED_MPH went from decoration to a price lever ───────
// It used to move only travelMinutes, which nothing read. It now sets billable
// hours directly, so one scalar for all of South Florida at all hours is a
// pricing decision, not a constant.
console.log('\n[Q6] TRAVEL_SPEED_MPH = 28 now sets billable hours  (pricing.ts)');
{
  const rows = [['Miami', 'Boca Raton'], ['Miami', 'Fort Lauderdale'], ['Homestead', 'Jupiter']] as [string, string][];
  OPEN('what one mph assumption is now worth, per move', Object.fromEntries(rows.map(([f, t]) => {
    const p = local(f, t);
    const mi = p.travelMiles;
    const at = (mph: number) => Math.ceil(Math.round(mi / mph * 60) / 60 / 0.25) * 0.25;
    return [`${f}-${t}`, {
      miles: mi,
      billedNow: `${p.travelHours}h @28mph = $${p.total}`,
      at35mph: `${at(35)}h`, at45mph: `${at(45)}h`,
      swingVs45mph: `$${Math.round((p.travelHours! - at(45)) * 129)}`,
    }];
  })));
}

// ── Q2 (still open, now consequential) · the unrecognised city ──────────────
console.log('\n[Q2] unrecognised city — flagged, but nothing is billed for the drive');
{
  const cases: [string, string][] = [
    ['Maimi', 'Bocca Raton'], ['Naples', 'Tampa'], ['Homestead', 'Key West'], ['Sacramento', 'Roseville'],
  ];
  OPEN('these route to a real job but bill zero drive time', Object.fromEntries(cases.map(([f, t]) => {
    const p = local(f, t);
    return [`${f}-${t}`, { assumedMiles: estimateLocalDistance(f, t), confirmed: p.distanceConfirmed, driveBilled: p.travelHours, total: p.total }];
  })));
  // Homestead→Key West is the sharp one: a real route, over 100 miles, and the
  // engine has no coordinates for either end of the Keys.
  must('Q2 · a real service-area route should not be unresolvable',
    resolveLocalDistance('Homestead', 'Key West').confirmed, resolveLocalDistance('Homestead', 'Key West'));
}

// ── Q3 · no upper bound on the local hourly model ──────────────────────────
console.log('\n[Q3] no ceiling on "local"');
{
  const j = local('Homestead', 'Jupiter');
  OPEN('a 127-mile job still books as a local hourly move', {
    miles: j.travelMiles, minutes: j.travelMinutes, driveBilled: j.travelHours,
    total: j.total, note: 'drive time is now paid, but there is still no mileage at which this must become long-distance',
  });
}

// ── Q4 · the LD floor rewrites the linehaul line ───────────────────────────
console.log('\n[Q4] LD_MINIMUM backfills truckFee, so the printed linehaul is fiction');
{
  const sizes: HomeSize[] = ['studio', '1br', '2br', '3br', '4br+', 'office'];
  const crews: CrewSize[] = [2, 3, 4];
  let belowFloor = 0, negative = 0;
  const rewritten: Record<string, unknown>[] = [];
  for (const s of sizes) for (const c of crews) for (const m of [0, 1, 15, 100, 200, 449, 450, 451, 900, 1300, 2700]) {
    const p = calculatePricing({ moveType: 'long-distance', estimatedDistance: m, inventory: { ...INV, homeSize: s, crewSize: c }, addons: ADD });
    if (p.total < LD_MINIMUM) belowFloor++;
    if (p.truckFee < 0) negative++;
    const miles = Math.max(100, Math.round(m));
    const trueLinehaul = Math.round(miles * 2.0 * LD_MULT[s] + (Math.max(1, Math.ceil(miles / 450)) - 1) * 250);
    if (p.truckFee !== trueLinehaul) rewritten.push({ size: s, crew: c, miles: m, printedLinehaul: p.truckFee, actualLinehaul: trueLinehaul });
  }
  must('Q4a · no LD combination prices below LD_MINIMUM', belowFloor === 0, { belowFloor });
  must('Q4b · no LD combination produces a negative truck fee', negative === 0, { negative });
  OPEN('the "Linehaul" line differs from the computed linehaul when the floor bites', {
    cases: rewritten.length, of: sizes.length * crews.length * 11, examples: rewritten.slice(0, 3),
  });
}

// ── Q5 · published bands vs the engine ─────────────────────────────────────
console.log('\n[Q5] published bands vs the engine (bands exclude drive time)');
{
  const bands: [string, HomeSize, CrewSize, number, number][] = [
    ['Studio', 'studio', 2, 516, 645], ['1-bedroom', '1br', 2, 516, 774],
    ['2-bedroom', '2br', 2, 645, 1253], ['3-bedroom', '3br', 3, 1253, 1611],
    ['4+ bedroom', '4br+', 3, 1611, 2327], ['Office', 'office', 3, 1253, 1790],
  ];
  for (const [label, size, crew, low, high] of bands) {
    const engine = localStartingPrice(size, crew);
    must(`Q5 · ${label}: the "from" price the site prints must sit inside its own published band`,
      engine >= low && engine <= high, { publishedLow: low, publishedHigh: high, engineFloor: engine, engineHours: Math.max(3, SIZE_HOURS[size]) });
  }
  OPEN('localStartingPrice excludes drive time — the published "from" is now a true floor only for a same-address job', {
    '2br from': localStartingPrice('2br', 2),
    '2br Miami-Fort Lauderdale actual': local('Miami', 'Fort Lauderdale').total,
    note: 'decide whether the bands should be restated to include a typical drive',
  });
}

// ── Q7 · same-city is 5 miles for every city, and 5 miles now costs money ───
console.log('\n[Q7] same-city constant now has a price');
OPEN('every city, however large, is 5 mi across — and that is 0.25h on the invoice', Object.fromEntries(
  ['Miami', 'Sunny Isles Beach', 'Homestead', 'Fort Lauderdale'].map((c) => {
    const p = local(c, c);
    return [c, { miles: p.travelMiles, minutes: p.travelMinutes, billed: `${p.travelHours}h`, total: p.total }];
  })));

// ── Q8 · packing-only ignores stairs; the other three branches do not ───────
console.log('\n[Q8] stairs on packing-only');
{
  const stairs = { ...INV, hasStairs: true, stairsFlights: 3 };
  OPEN('deliberate or an omission? packers work inside the home, so this may be correct',
    Object.fromEntries((['local', 'office', 'long-distance', 'packing-only'] as const).map((mt) => {
      const a = calculatePricing({ moveType: mt, estimatedDistance: 600, fromCity: 'Miami', toCity: 'Miami', inventory: INV, addons: ADD });
      const b = calculatePricing({ moveType: mt, estimatedDistance: 600, fromCity: 'Miami', toCity: 'Miami', inventory: stairs, addons: ADD });
      return [mt, { flat: a.estimatedHours, withStairs: b.estimatedHours, delta: b.estimatedHours - a.estimatedHours }];
    })));
}

console.log(`\n${passed} ok · ${failed} FAILING · ${open} open questions`);
console.log(failed === 0
  ? 'Nothing left that is fixable without a decision. The OPEN items need Evgenii.'
  : `${failed} assertion(s) still fail against the code as it ships.`);
process.exit(0); // this file is a report, not a gate
