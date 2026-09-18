/**
 * Every published price, derived — never typed.
 *
 * The same six-row table lived in three places: APARTMENT_TOTALS in
 * /pricing, APARTMENT_TOTALS again in /ru/pricing, and TOTALS in CostPage,
 * which renders on nineteen pages in three languages. All three carried the
 * dollar ranges as strings, and /pricing carried a four-line comment spelling
 * out the arithmetic that produced them — a comment is not a calculation.
 *
 * This module holds no numbers of its own. If a value cannot be computed from
 * src/lib/pricing.ts it does not belong here, and if the rate card moves, every
 * table, badge and schema offer moves with it in one commit.
 *
 * What it deliberately does NOT do is reach into the prose in cities*.ts,
 * costPages.ts or blog.ts, where the same figures appear about 230 more times
 * inside sentences in three languages. Templating those would be 230 edits in
 * grammatical positions no one here can proofread in Ukrainian, and it would
 * not have caught a single defect this pass found — "$129 per hour each" and
 * "$229/hr" both survive token substitution untouched. The claims-guard rule
 * `undeclared-rate` covers them instead: it fails the build on an hourly figure
 * that is not one of ours, which is the propagation mechanism that actually
 * works, because it makes a human re-read the sentence.
 */
import { HOURLY_RATE, TRUCK_FEE, MIN_HOURS, PACKING_HOURLY_RATE, CREW_SIZES } from './pricing';
import type { CrewSize } from '@/types';

export type CopyLocale = 'en' | 'ru' | 'ua';

/** What a job costs: hours at the crew's rate, plus that crew's truck for the day. */
export const jobTotal = (hours: number, crew: CrewSize): number =>
  Math.round(hours * HOURLY_RATE[crew] + TRUCK_FEE[crew]);

/**
 * The published size bands. Hours and crew are the editorial judgement; the
 * money is arithmetic. A band can span two crew sizes — a 2-bedroom is quoted
 * low with two movers and high with three — so each end names its own.
 */
interface Band {
  key: string;
  hoursLow: number;
  hoursHigh: number;
  crewLow: CrewSize;
  crewHigh: CrewSize;
  /** True where the high end is open-ended, e.g. a whole house. */
  openEnded?: boolean;
}

const BANDS: Band[] = [
  { key: 'studio', hoursLow: 3,  hoursHigh: 4,  crewLow: 2, crewHigh: 2 },
  { key: '1br',    hoursLow: 3,  hoursHigh: 5,  crewLow: 2, crewHigh: 2 },
  { key: '2br',    hoursLow: 4,  hoursHigh: 6,  crewLow: 2, crewHigh: 3 },
  { key: '3br',    hoursLow: 6,  hoursHigh: 8,  crewLow: 3, crewHigh: 3 },
  { key: '4br',    hoursLow: 8,  hoursHigh: 12, crewLow: 3, crewHigh: 3, openEnded: true },
  { key: 'office', hoursLow: 6,  hoursHigh: 9,  crewLow: 3, crewHigh: 3 },
];

const money = (n: number): string => `$${n.toLocaleString('en-US')}`;

/** "$645–$1,253", or "$1,611–$2,327+" where the band is open-ended. */
export function bandRange(key: string): string {
  const b = BANDS.find((x) => x.key === key);
  if (!b) throw new Error(`bandRange("${key}"): no such band`);
  const low = jobTotal(b.hoursLow, b.crewLow);
  const high = jobTotal(b.hoursHigh, b.crewHigh);
  return `${money(low)}–${money(high)}${b.openEnded ? '+' : ''}`;
}

/** "3–4" — the hours, without a unit, so each locale adds its own word. */
export function bandHours(key: string): string {
  const b = BANDS.find((x) => x.key === key);
  if (!b) throw new Error(`bandHours("${key}"): no such band`);
  return `${b.hoursLow}–${b.hoursHigh}`;
}

/** "2" or "2–3" — the crew, likewise unitless. */
export function bandCrew(key: string): string {
  const b = BANDS.find((x) => x.key === key);
  if (!b) throw new Error(`bandCrew("${key}"): no such band`);
  return b.crewLow === b.crewHigh ? `${b.crewLow}` : `${b.crewLow}–${b.crewHigh}`;
}

export const BAND_KEYS = BANDS.map((b) => b.key);

/** "$129/hr", for a badge or a table cell. */
export const rate = (crew: CrewSize): string => `$${HOURLY_RATE[crew]}/hr`;
export const packingRate = (crew: CrewSize): string => `$${PACKING_HOURLY_RATE[crew]}/hr`;

/**
 * The offer description in the root layout's JSON-LD, which had all three rates
 * and the minimum typed into one string.
 */
export function offerDescription(): string {
  const rates = CREW_SIZES.map((c) => `${c} movers $${HOURLY_RATE[c]}/hour`).join(', ');
  return (
    `Local moving in South Florida billed by the hour: ${rates}. ` +
    `A ${MIN_HOURS}-hour minimum, then 15-minute increments. ` +
    `The truck is its own line at the same daily figure as the crew rate ` +
    `($${TRUCK_FEE[2]}, $${TRUCK_FEE[3]}, $${TRUCK_FEE[4]}). ` +
    'No deposit, and nothing added for weekends, high season, fuel, stairs or elevators.'
  );
}
