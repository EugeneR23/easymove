import type { MoveType, HomeSize, CrewSize, QuoteInventory, QuoteAddons, QuotePricing, QuoteMode } from '@/types';

// ─── Rate Tables ──────────────────────────────────────────────────────────────
// Updated 2026-08-24 per Evgenii's rate card. Two changes from 2026-07-30:
//   - The 4-mover rate is $219, not $229. This closes the open TODO that kept
//     $229 only because the wizard offered a 4-mover crew.
//   - The truck fee is NO LONGER a flat $129. It is charged per day at the same
//     figure as the crew's hourly rate — a bigger crew brings a bigger truck.
//     2 movers → $129, 3 → $179, 4 → $219.
// Unchanged: still a separate line item on every estimate, with fuel, tolls and
// mileage inside it; never scaled by distance and never folded into the hourly
// rate. No weekend or seasonal surcharge. Stairs and long carries cost TIME
// (extra estimated hours), never a fee.
export const HOURLY_RATE: Record<CrewSize, number>  = { 2: 129, 3: 179, 4: 219 };
export const MIN_HOURS = 3;
/** Packing-only hourly rate per crew size. Exported so no component retypes it. */
export const PACKING_HOURLY_RATE: Record<CrewSize, number> = { 2: 79,  3: 119, 4: 159 };
/** The only crew sizes that have a rate. Anything else is corrupt input, not a price. */
export const CREW_SIZES = [2, 3, 4] as const satisfies readonly CrewSize[];
/**
 * Coerce whatever arrived from a form, a stale sessionStorage blob or a raw POST
 * into a crew size that HOURLY_RATE and TRUCK_FEE can actually answer for.
 * Without this, crewSize 5 makes `HOURLY_RATE[5] * hours` NaN, and NaN survives
 * all the way out: "$NaN" on screen, `null` after JSON.stringify, into Telegram
 * and Airtable as a lead with no price.
 */
export function normalizeCrewSize(raw: unknown): CrewSize {
  const n = Number(raw);
  return (CREW_SIZES as readonly number[]).includes(n) ? (n as CrewSize) : 2;
}

/** Every move type the site sells. 'international' was removed 2026-09-15. */
export const MOVE_TYPES = ['local', 'long-distance', 'office', 'specialty', 'packing-only'] as const satisfies readonly MoveType[];

/**
 * Same reasoning as normalizeCrewSize, for the one field that can arrive naming
 * a service we no longer sell. A returning visitor's sessionStorage still holds
 * `moveType: 'international'` from before it was dropped; restored unchecked it
 * fell through the pricing switch to the specialty branch and quoted $800 for a
 * service that does not exist.
 */
export function normalizeMoveType(raw: unknown): MoveType {
  return (MOVE_TYPES as readonly string[]).includes(raw as string) ? (raw as MoveType) : 'local';
}
/** Truck, per day, per crew size. Keyed so a caller cannot forget the crew. */
export const TRUCK_FEE: Record<CrewSize, number> = { 2: 129, 3: 179, 4: 219 };
/** Smallest possible invoice for a crew: the 3-hour minimum plus that crew's truck. */
export const minInvoice = (crew: CrewSize): number => MIN_HOURS * HOURLY_RATE[crew] + TRUCK_FEE[crew];
// Stairs are billed as time, not a fee: each flight adds carry time per crew day
export const STAIRS_EXTRA_HOURS_PER_FLIGHT = 0.5;

// ─── South Florida city coordinates ──────────────────────────────────────────
// [miles_north, miles_east] from a reference point near Homestead
// Used to estimate driving distance between pickup and dropoff cities
const CITY_COORDS: Record<string, [number, number]> = {
  'homestead': [0, 0], 'florida city': [2, 0], 'princeton': [12, 0],
  'cutler bay': [10, 2], 'palmetto bay': [13, 3],
  'south miami': [20, 5], 'coral gables': [21, 5], 'coconut grove': [22, 6],
  'miami': [25, 7], 'brickell': [24, 7], 'little havana': [23, 5],
  'wynwood': [26, 7], 'midtown miami': [26, 8], 'design district': [26, 8],
  'south beach': [24, 12], 'miami beach': [26, 12], 'mid beach': [28, 13],
  'north beach': [30, 13], 'surfside': [31, 13], 'bal harbour': [32, 13],
  'bay harbor islands': [32, 12], 'sunny isles beach': [34, 13],
  'aventura': [38, 11], 'north miami beach': [35, 9], 'north miami': [33, 7],
  'hialeah': [28, 1], 'hialeah gardens': [28, -2],
  'doral': [27, -5], 'medley': [30, -4],
  'miami gardens': [33, 3], 'miami lakes': [33, -1], 'opa-locka': [31, 4],
  'kendall': [22, -2], 'westchester': [23, 2], 'sweetwater': [25, -2],
  'tamiami': [23, -4], 'country walk': [18, -2],
  'hallandale beach': [41, 9], 'hollywood': [43, 7],
  'miramar': [43, 1], 'pembroke pines': [44, -1],
  'davie': [46, -1], 'plantation': [47, 2],
  'lauderdale lakes': [48, 3], 'lauderhill': [47, 2],
  'fort lauderdale': [49, 7], 'wilton manors': [50, 7], 'oakland park': [51, 7],
  'sunrise': [49, -1], 'weston': [44, -6], 'southwest ranches': [44, -4],
  'tamarac': [52, 0], 'north lauderdale': [52, 3], 'margate': [53, -1],
  'coconut creek': [55, 0], 'pompano beach': [56, 7],
  'deerfield beach': [62, 5], 'coral springs': [55, -4], 'parkland': [57, -4],
  'lighthouse point': [60, 9],
  'boca raton': [68, 5], 'delray beach': [76, 6], 'boynton beach': [83, 3],
  'greenacres': [87, 0], 'lake worth': [87, 5], 'lake worth beach': [87, 6],
  'west palm beach': [91, 4], 'palm beach': [91, 10],
  'north palm beach': [97, 8], 'palm beach gardens': [100, 3],
  'riviera beach': [96, 7], 'singer island': [96, 10],
  'jupiter': [110, 2],
};

/**
 * Driving distance (miles) between two South Florida cities, plus whether both
 * ends were actually found in CITY_COORDS.
 *
 * `confirmed` matters now that drive time is billed: an unrecognised city (a
 * typo, an address outside the service area, a real Florida city missing from
 * the table) falls back to 15 miles, and 15 unverified miles must never turn
 * into billable hours on a client's estimate.
 */
export function resolveLocalDistance(fromCity: string, toCity: string): { miles: number; confirmed: boolean } {
  const norm = (c: string) => c.toLowerCase().trim().replace(/\s+/g, ' ').replace(/,.*$/, '');
  const a = CITY_COORDS[norm(fromCity)];
  const b = CITY_COORDS[norm(toCity)];
  if (!a || !b) return { miles: 15, confirmed: false };            // unknown — assume 15 mi
  if (norm(fromCity) === norm(toCity)) return { miles: 5, confirmed: true }; // same city
  const dx = a[0] - b[0], dy = a[1] - b[1];
  return { miles: Math.round(Math.sqrt(dx * dx + dy * dy) * 1.15), confirmed: true }; // 1.15 road routing factor
}

/** Estimate driving distance (miles) between two South Florida cities */
export function estimateLocalDistance(fromCity: string, toCity: string): number {
  return resolveLocalDistance(fromCity, toCity).miles;
}

/** Estimated labour hours by home size */
const HOME_SIZE_HOURS: Record<HomeSize, number> = {
  'studio': 2.5,
  '1br':    3,
  '2br':    4.5,
  '3br':    6,
  '4br+':   8,
  'office': 5,
};

/** Bedrooms by home size (kept for admin/lead display) */
export const HOME_SIZE_BEDROOMS: Record<HomeSize, number> = {
  'studio': 0,
  '1br':    1,
  '2br':    2,
  '3br':    3,
  '4br+':   4,
  'office': 2,
};

/** Packing cost by home size (used for packingService addon on regular moves) */
export const PACKING_COST: Record<HomeSize, number> = {
  'studio': 200,
  '1br':    275,
  '2br':    375,
  '3br':    495,
  '4br+':   650,
  'office': 400,
};

// ─── Where a quote can be priced at all ──────────────────────────────────
/**
 * Until 2026-09-18 this module carried a 170-city, 50-state coordinate table, a
 * set of state centroids, a haversine linehaul model and `LD_MINIMUM = 1500`
 * commented "interstate minimum charge". A visitor could pick "To: Seattle, WA"
 * and receive a firm dollar figure for a move the company refuses to take, and
 * the same code ran server-side in /api/quotes, so the client was not the fix.
 *
 * All of it is deleted rather than retuned. The floor was wrong for the only
 * long-distance job the company actually does: a Miami -> Orlando studio landed
 * on the interstate minimum exactly. Every piece of copy on the site already
 * says these are quoted individually by distance, volume and access
 * (SERVICE_SCOPE in lib/data/scope.ts), so the code now says the same thing.
 *
 * Three answers, and only the first carries a price:
 *   priced   - local hourly work inside the service area
 *   custom   - long-distance inside Florida; a coordinator writes the estimate
 *   referral - crosses a state line; refused and referred to a licensed carrier
 */
export const SERVICE_STATES = ['FL'] as const;

export type { QuoteMode } from '@/types';

export function routeMode(fromState: string, toState: string, moveType: MoveType): QuoteMode {
  const norm = (s: string) => (s ?? '').trim().toUpperCase();
  const from = norm(fromState) || 'FL';
  const to   = norm(toState);
  // 'OUT' is what the quote form offers for anywhere beyond Florida. A blank
  // destination is not yet a refusal - the visitor simply has not answered.
  const outside = (s: string) => s !== '' && s !== 'FL';
  if (outside(from) || outside(to)) return 'referral';
  return moveType === 'long-distance' ? 'custom' : 'priced';
}

// ─── Main calculator ──────────────────────────────────────────────────────────
// Average South Florida city driving speed (mph) — accounts for traffic + stops
const TRAVEL_SPEED_MPH = 28;

// Drive time between pickup and drop-off is billable on an hourly job: the crew
// is on the clock for it (confirmed by Evgenii, 2026-08-24). It is charged as
// TIME at the crew's own rate, never as a separate fee, and rounded the same way
// the rest of the invoice is — 15-minute increments, the rule already published
// on /pricing, /moving-cost-miami, /about and in llms.txt.
//
// Only the loaded pickup → drop-off leg is billed. The drive from the yard to
// the first address is not in the estimate and is not charged.
const BILLING_INCREMENT_HOURS = 0.25;

/** Billable drive-time hours for a local/office job, rounded up to the increment. */
export function travelHoursFor(travelMinutes: number, confirmed: boolean): number {
  if (!confirmed || travelMinutes <= 0) return 0;
  return Math.ceil(travelMinutes / 60 / BILLING_INCREMENT_HOURS) * BILLING_INCREMENT_HOURS;
}

interface PricingInput {
  moveType: MoveType;
  estimatedDistance: number;
  fromCity?: string;
  toCity?: string;
  /** 'FL' or 'OUT'. Drives routeMode(); a blank destination is not yet a refusal. */
  fromState?: string;
  toState?: string;
  inventory: QuoteInventory;
  addons: QuoteAddons;
}

export function calculatePricing(input: PricingInput): QuotePricing {
  const { moveType, estimatedDistance, fromCity, toCity, inventory, addons } = input;
  const quoteMode = routeMode(input.fromState ?? 'FL', input.toState ?? '', moveType);
  const crew   = normalizeCrewSize(inventory.crewSize);
  const size   = inventory.homeSize ?? '2br';
  const isLong = moveType === 'long-distance';

  // ── 1. Labour (local) or base rate (long-distance) ────────────────────────
  let laborRate      = 0;
  let truckFee       = 0;
  let estimatedHours = 0;
  let travelFee      = 0;
  let travelMiles    = 0;
  let travelMinutes  = 0;
  let travelHours    = 0;
  // False when a city could not be resolved, so the mileage is a guess. The
  // coordinator is told; the guess is never billed.
  let distanceConfirmed = true;

  // Stairs cost time, not a fee — extra carry hours added to the labour estimate
  const stairsHours = inventory.hasStairs
    ? (inventory.stairsFlights ?? 1) * STAIRS_EXTRA_HOURS_PER_FLIGHT
    : 0;

  switch (moveType) {
    case 'local':
    case 'office': {
      // Distance first — the drive is billable time, so it has to be known
      // before the hours are totalled.
      if (fromCity && toCity) {
        const resolved   = resolveLocalDistance(fromCity, toCity);
        travelMiles      = resolved.miles;
        distanceConfirmed = resolved.confirmed;
      } else {
        travelMiles      = estimatedDistance;
        distanceConfirmed = false; // no cities given — nothing to verify against
      }
      travelMinutes  = Math.round(travelMiles / TRAVEL_SPEED_MPH * 60);
      travelHours    = travelHoursFor(travelMinutes, distanceConfirmed);
      const baseHours = HOME_SIZE_HOURS[size] ?? (moveType === 'office' ? 4 : 3);
      estimatedHours = Math.max(MIN_HOURS, baseHours + stairsHours + travelHours);
      laborRate      = Math.round(HOURLY_RATE[crew] * estimatedHours);
      truckFee       = TRUCK_FEE[crew]; // per day, matches the crew's rate
      break;
    }
    case 'long-distance': {
      // Quoted individually by a coordinator, never by this function. The hours
      // are still estimated so the lead carries a shape of the job; the money is
      // deliberately zero, because no formula here is one the company stands behind.
      estimatedHours = (HOME_SIZE_HOURS[size] ?? 4.5) + stairsHours;
      laborRate      = 0;
      truckFee       = 0;
      break;
    }
    case 'packing-only': {
      // $79/hr for 2 packers, $119/hr for 3 packers, $159/hr for 4 packers — 3-hour minimum
      // [TODO: confirm with Evgenii] packing hourly rates are not in the verified rate card
      estimatedHours = Math.max(MIN_HOURS, HOME_SIZE_HOURS[size] ?? 3);
      laborRate      = Math.round(PACKING_HOURLY_RATE[crew] * estimatedHours);
      truckFee       = 0;
      break;
    }
    default: {
      // specialty — custom base, quoted individually
      laborRate = 800;
      break;
    }
  }

  // ── 2. Access ─────────────────────────────────────────────────────────────
  // No stairs fee, no elevator fee, no long-carry fee — access conditions are
  // already priced into estimatedHours above. accessFee stays for type compat.
  const accessFee = 0;

  // ── 3. Add-ons ────────────────────────────────────────────────────────────
  let addonsFee = 0;
  if (addons.packingService)    addonsFee += PACKING_COST[size] ?? 375;
  // furnitureAssembly: basic included, complex items priced separately — not added to estimate
  if (addons.storageMonths > 0) addonsFee += addons.storageMonths * 200;
  if (addons.autoTransport)     addonsFee += 1200;
  if (addons.artHandling)       addonsFee += inventory.specialItems.length > 0
                                              ? inventory.specialItems.length * 150
                                              : 300;
  // climateControlled = "our materials" for packing-only — quoted separately, not added to estimate

  // A referral carries no figure at all: an out-of-state job is one we do not take,
  // so any number here would be a price for a service that does not exist.
  const priced   = quoteMode === 'priced';
  const subtotal = priced ? laborRate + truckFee + accessFee + addonsFee + travelFee : 0;
  const discount = 0;
  const total    = subtotal - discount;

  return {
    laborRate,
    truckFee,
    accessFee,
    addonsFee,
    travelFee,
    travelMiles,
    travelMinutes,
    travelHours,
    distanceConfirmed,
    // legacy fields for admin dashboard
    baseRate:     laborRate,
    distanceFee:  isLong ? Math.round(estimatedDistance * 0.1) : 0,
    inventoryFee: accessFee,
    discount,
    total:        Math.round(total),
    currency:     'USD',
    estimatedHours,
    crewSize:     crew,
    isLongDistance: isLong,
    quoteMode,
  };
}

// ─── Starting price helpers (for homepage display) ────────────────────────────
export function localStartingPrice(size: HomeSize, crew: CrewSize = 2): number {
  const hours = Math.max(MIN_HOURS, HOME_SIZE_HOURS[size]);
  return Math.round(HOURLY_RATE[crew] * hours + TRUCK_FEE[crew]);
}
