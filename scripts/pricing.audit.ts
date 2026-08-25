/**
 * Pricing & distance AUDIT — run with: npx tsx scripts/pricing.audit.ts
 *
 * This file is RED on purpose. Every `must(...)` states what the audit argues
 * SHOULD be true; each failure is one finding, printed with the input that
 * produced it. Nothing is fixed yet — see docs/PRICING_AUDIT_2026-08-24.md.
 *
 * Findings whose correct value is a business decision are printed as OPEN,
 * with evidence but no assertion.
 *
 * scripts/pricing.test.ts stays green: it guards the model as shipped. When
 * Evgenii decides, resolved items move over there and this file shrinks.
 */
import {
  calculatePricing, estimateLocalDistance, estimateLongDistance, estimateDistance,
  localStartingPrice, HOURLY_RATE, LD_MINIMUM,
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

// A check that cannot fail is not a check. Prove the harness can do both before
// trusting a single result below.
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
  failed = before; // discard the deliberate failure
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

// ═══ F1 · Travel time is computed and then discarded ════════════════════════
console.log('\n[F1] travel time — computed, never priced  (pricing.ts:297-302)');
{
  const near = local('Hollywood', 'Hollywood');
  const far  = local('Miami', 'Boca Raton');
  const way  = local('Homestead', 'Jupiter');
  OPEN('same total for 11, 107 and 272 minutes of driving', {
    'Hollywood-Hollywood': { mi: near.travelMiles, min: near.travelMinutes, hours: near.estimatedHours, total: near.total },
    'Miami-Boca Raton':    { mi: far.travelMiles,  min: far.travelMinutes,  hours: far.estimatedHours,  total: far.total },
    'Homestead-Jupiter':   { mi: way.travelMiles,  min: way.travelMinutes,  hours: way.estimatedHours,  total: way.total },
  });
  // Whatever the answer on billing, two moves 96 driving-minutes apart must not
  // produce a byte-identical estimate.
  must('F1 · a 96-minute longer drive changes something on the estimate',
    far.total !== near.total || far.estimatedHours !== near.estimatedHours || far.travelFee !== near.travelFee,
    { near: near.total, far: far.total });
}

// ═══ F2 · travelFee is structurally unreachable ═════════════════════════════
console.log('\n[F2] travelFee — declared (286), summed (365), returned (374), never assigned');
{
  const cities = ['Homestead', 'Miami', 'Fort Lauderdale', 'Boca Raton', 'West Palm Beach', 'Jupiter'];
  const sweep: number[] = [];
  for (const f of cities) for (const t of cities) sweep.push(local(f, t).travelFee);
  must('F2 · /pricing promises a cross-county travel-time fee — some route must produce one',
    sweep.some((v) => v > 0), { distinctValues: Array.from(new Set(sweep)), routesTried: sweep.length });
}

// ═══ F3 · Unknown city → silent 15 miles ═══════════════════════════════════
console.log('\n[F3] unknown city — silent 15 mi  (pricing.ts:65)');
{
  const cases: [string, string][] = [
    ['Maimi', 'Bocca Raton'],       // customer typo
    ['Sacramento', 'Roseville'],    // out of service area entirely
    ['Miami', 'Nowhereville'],      // one side unresolvable
    ['Naples', 'Tampa'],            // real FL cities, absent from CITY_COORDS
    ['Homestead', 'Key West'],      // 100+ mi down the Overseas Highway
    ['FL', 'FL'],                   // what a blank city field degrades into
  ];
  for (const [f, t] of cases) {
    must(`F3 · estimateLocalDistance(${JSON.stringify(f)}, ${JSON.stringify(t)}) must not silently answer 15`,
      estimateLocalDistance(f, t) !== 15, estimateLocalDistance(f, t));
  }
  const typo = local('Maimi', 'Bocca Raton');
  must('F3 · a quote built on an unresolvable city must be flagged, not returned as a normal $710',
    typo.total !== 710 || (typo as unknown as Record<string, unknown>).distanceConfirmed === false,
    { total: typo.total, miles: typo.travelMiles, fields: Object.keys(typo) });
}

// ═══ F4 · No upper bound on "local" ════════════════════════════════════════
console.log('\n[F4] no ceiling on the local hourly model  (pricing.ts:296-303)');
{
  const jupiter = local('Homestead', 'Jupiter');
  must('F4 · a 127-mile move must not price as a flat local job',
    jupiter.travelMiles < 100 || jupiter.total !== localStartingPrice('2br', 2),
    { miles: jupiter.travelMiles, minutes: jupiter.travelMinutes, total: jupiter.total, sameAsAcrossTheStreet: localStartingPrice('2br', 2) });
}

// ═══ F5 · LD falls back to Florida when the state select is left at its
//          pre-selected default (QuoteWizard.tsx:34, Step4_Details.tsx:167) ══
console.log('\n[F5] LD destination state defaults to FL and is never cleared');
{
  const dests: [string, string][] = [
    ['New York', 'NY'], ['Atlanta', 'GA'], ['Charlotte', 'NC'],
    ['Dallas', 'TX'], ['Boston', 'MA'], ['Nashville', 'TN'],
  ];
  for (const [city, st] of dests) {
    const shipped = estimateLongDistance('Miami', 'FL', city, 'FL');
    const correct = estimateLongDistance('Miami', 'FL', city, st);
    const pS = calculatePricing({ moveType: 'long-distance', estimatedDistance: shipped, fromCity: 'Miami', toCity: city, inventory: INV, addons: ADD });
    const pC = calculatePricing({ moveType: 'long-distance', estimatedDistance: correct, fromCity: 'Miami', toCity: city, inventory: INV, addons: ADD });
    must(`F5 · Miami-${city} with the state left at FL must not quote like a Florida move`,
      Math.abs(shipped - correct) < 100,
      { milesShipped: shipped, milesCorrect: correct, quoteShipped: pS.total, quoteCorrect: pC.total, underQuote: pC.total - pS.total });
  }
  must('F5b · LD with a filled city and a blank state must not collapse to 30 mi',
    estimateLongDistance('Miami', 'FL', 'New York', '') > 100,
    estimateLongDistance('Miami', 'FL', 'New York', ''));
}

// ═══ F6 · estimateDistance is case-sensitive ═══════════════════════════════
console.log('\n[F6] estimateDistance state keys are case-sensitive  (pricing.ts:393-402)');
{
  must('F6 · estimateDistance("fl","ny") must equal estimateDistance("FL","NY")',
    estimateDistance('fl', 'ny') === estimateDistance('FL', 'NY'),
    { lower: estimateDistance('fl', 'ny'), upper: estimateDistance('FL', 'NY') });
  OPEN('every unlisted state pair answers 600', {
    'FL-TN': estimateDistance('FL', 'TN'), 'FL-AL': estimateDistance('FL', 'AL'),
    'NY-NJ': estimateDistance('NY', 'NJ'), 'FL-WA': estimateDistance('FL', 'WA'),
  });
}

// ═══ F7 · crewSize off the rate table → NaN, and NaN reaches the output ════
console.log('\n[F7] crew size off the rate table  (pricing.ts:298, 301)');
{
  const bad = local('Miami', 'Miami', 0, { ...INV, crewSize: 5 as unknown as CrewSize });
  must('F7 · an unpriceable crew size must throw or clamp, never return NaN',
    Number.isFinite(bad.total),
    { total: bad.total, rendered: `$${bad.total}`, afterJsonRoundTrip: JSON.parse(JSON.stringify(bad)).total, truckFee: bad.truckFee });
}

// ═══ F8 · Published bands vs what the engine actually quotes ═══════════════
console.log('\n[F8] /pricing + /moving-cost-miami + llms.txt bands vs the engine');
{
  const bands: [string, HomeSize, CrewSize, number, number, string][] = [
    ['Studio',     'studio', 2,  516,  645, 'pricing/page.tsx:64'],
    ['1-bedroom',  '1br',    2,  516,  774, 'pricing/page.tsx:65'],
    ['2-bedroom',  '2br',    2,  645, 1253, 'pricing/page.tsx:66'],
    ['3-bedroom',  '3br',    3, 1253, 1611, 'pricing/page.tsx:67'],
    ['4+ bedroom', '4br+',   3, 1611, 2327, 'pricing/page.tsx:68'],
    ['Office',     'office', 3, 1253, 1790, 'pricing/page.tsx:69'],
  ];
  for (const [label, size, crew, low, high, where] of bands) {
    const engine = localStartingPrice(size, crew);
    must(`F8 · ${label}: the calculator's own floor must sit inside the published band (${where})`,
      engine >= low && engine <= high,
      { publishedLow: low, publishedHigh: high, engineQuote: engine, engineHours: Math.max(3, SIZE_HOURS[size]) });
  }
}

// ═══ F9 · The retired $229 4-mover rate is hardcoded in the wizard ════════
console.log('\n[F9] Step2_HomeSize.tsx:157 hardcodes the rate table');
{
  const wizardCard: Record<number, number> = { 2: 129, 3: 179, 4: 229 }; // verbatim from Step2_HomeSize.tsx:157
  for (const c of [2, 3, 4] as CrewSize[]) {
    must(`F9 · wizard crew card rate for ${c} movers must match HOURLY_RATE`,
      wizardCard[c] === HOURLY_RATE[c], { wizardCard: wizardCard[c], HOURLY_RATE: HOURLY_RATE[c] });
  }
}

// ═══ F10 · LD floor rewrites the linehaul line ═════════════════════════════
console.log('\n[F10] LD_MINIMUM backfills truckFee, so the printed linehaul is fiction');
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
  must('F10a · no LD combination prices below LD_MINIMUM', belowFloor === 0, { belowFloor });
  must('F10b · no LD combination produces a negative truck fee', negative === 0, { negative });
  must('F10c · the "Linehaul (truck · fuel · driver)" line must equal the computed linehaul',
    rewritten.length === 0, { rewrittenCases: rewritten.length, of: sizes.length * crews.length * 11, examples: rewritten.slice(0, 3) });
}

// ═══ F11 · packing-only ignores stairs; local/office/LD do not ═════════════
console.log('\n[F11] stairs are free on packing-only  (pricing.ts:337 omits stairsHours)');
{
  const stairs = { ...INV, hasStairs: true, stairsFlights: 3 };
  for (const mt of ['local', 'office', 'long-distance', 'packing-only'] as const) {
    const flat = calculatePricing({ moveType: mt, estimatedDistance: 600, fromCity: 'Miami', toCity: 'Miami', inventory: INV, addons: ADD });
    const up   = calculatePricing({ moveType: mt, estimatedDistance: 600, fromCity: 'Miami', toCity: 'Miami', inventory: stairs, addons: ADD });
    must(`F11 · ${mt}: 3 flights of stairs must add carry time`,
      up.estimatedHours > flat.estimatedHours, { flat: flat.estimatedHours, withStairs: up.estimatedHours });
  }
}

// ═══ F12 · Admin breakdown does not add up to the admin total ══════════════
console.log('\n[F12] admin/quotes/[id]/page.tsx:82-88 omits truckFee, shows a phantom Distance Fee');
{
  const miles = estimateLongDistance('Venice', 'FL', 'Cary', 'NC');
  const p = calculatePricing({ moveType: 'long-distance', estimatedDistance: miles, fromCity: 'Venice', toCity: 'Cary', inventory: INV, addons: ADD });
  const adminSum = p.baseRate + p.distanceFee + p.inventoryFee + p.addonsFee - p.discount;
  must('F12 · the admin line items must sum to the admin total',
    adminSum === p.total,
    { lineItemSum: adminSum, headlineTotal: p.total, missingTruckFee: p.truckFee, phantomDistanceFee: p.distanceFee });
}

// ═══ F13 · The refined distance from the form is dropped ═══════════════════
console.log('\n[F13] estimatedDistance is ignored whenever both cities are set  (pricing.ts:299)');
{
  const override = local('Miami', 'Miami', 999);
  OPEN('caller-supplied estimatedDistance=999 with both cities set', {
    travelMiles: override.travelMiles, note: 'the same-city rule wins; the passed 999 is discarded',
  });
  // What the wizard sidebar computes vs what /api/quotes computes for the SAME
  // submission with the location block left blank.
  const sidebar = calculatePricing({ moveType: 'local', estimatedDistance: 0, fromCity: undefined, toCity: undefined, inventory: INV, addons: ADD });
  const server  = calculatePricing({ moveType: 'local', estimatedDistance: estimateDistance('FL', 'FL'), fromCity: '', toCity: '', inventory: INV, addons: ADD });
  must('F13 · the wizard sidebar and /api/quotes must derive the same mileage for one submission',
    sidebar.travelMiles === server.travelMiles, { sidebarMiles: sidebar.travelMiles, serverMiles: server.travelMiles });
}

// ═══ F14 · Same-city is 5 mi for every city ════════════════════════════════
console.log('\n[F14] same-city constant  (pricing.ts:66)');
OPEN('every city, however large, is 5 mi across', Object.fromEntries(
  ['Miami', 'Sunny Isles Beach', 'Homestead', 'Fort Lauderdale', 'Jupiter'].map((c) => [c, estimateLocalDistance(c, c)])));

// ═══ F15 · TRAVEL_SPEED_MPH has no effect on any price ═════════════════════
console.log('\n[F15] TRAVEL_SPEED_MPH = 28  (pricing.ts:265)');
OPEN('the speed scalar only moves travelMinutes, which nothing prices or displays', {
  'Miami-Boca Raton': { miles: 50, at28mph: Math.round(50 / 28 * 60), at45mph: Math.round(50 / 45 * 60), priceDelta: 0 },
  shownTo: 'nobody — QuoteSummary.tsx:69 and api/quotes/route.ts:218,244 all gate on travelFee > 0',
});

console.log(`\n${passed} ok · ${failed} FAILING (findings) · ${open} open questions`);
console.log(failed === 0
  ? 'No findings reproduced — if that is a surprise, check that the imports actually resolved.'
  : `${failed} assertion(s) fail against the code as it ships today. That is the audit.`);
process.exit(0); // this file is a report, not a gate
