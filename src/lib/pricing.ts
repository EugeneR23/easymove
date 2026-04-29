import type { MoveType, HomeSize, CrewSize, QuoteInventory, QuoteAddons, QuotePricing } from '@/types';

// ─── Rate Tables ──────────────────────────────────────────────────────────────
const HOURLY_RATE: Record<CrewSize, number>         = { 2: 99, 3: 139 };
const PACKING_HOURLY_RATE: Record<CrewSize, number> = { 2: 79,  3: 119 };
const TRUCK_BASE = 79;
const TRUCK_MAX: Record<CrewSize, number>            = { 2: 99, 3: 139 };
const MIN_HOURS = 3;

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

/** Estimate driving distance (miles) between two South Florida cities */
export function estimateLocalDistance(fromCity: string, toCity: string): number {
  const norm = (c: string) => c.toLowerCase().trim().replace(/\s+/g, ' ').replace(/,.*$/, '');
  const a = CITY_COORDS[norm(fromCity)];
  const b = CITY_COORDS[norm(toCity)];
  if (!a || !b) return 15;                              // unknown — assume 15 mi
  if (norm(fromCity) === norm(toCity)) return 5;        // same city
  const dx = a[0] - b[0], dy = a[1] - b[1];
  return Math.round(Math.sqrt(dx * dx + dy * dy) * 1.15); // 1.15 road routing factor
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

// ─── Long-distance multipliers by home size ───────────────────────────────────
const LD_HOME_MULTIPLIER: Record<HomeSize, number> = {
  'studio': 1.0,
  '1br':    1.2,
  '2br':    1.5,
  '3br':    2.0,
  '4br+':   2.8,
  'office': 1.8,
};

// ─── Main calculator ──────────────────────────────────────────────────────────
// Average South Florida city driving speed (mph) — accounts for traffic + stops
const TRAVEL_SPEED_MPH = 28;
// Trips under this distance are considered "included" — no surcharge
const TRAVEL_FREE_MILES = 8;

/** Truck fee scales with distance: $79 base → up to hourly rate for long trips */
function getDistanceTruckFee(crew: CrewSize, miles: number): number {
  if (miles <= TRAVEL_FREE_MILES) return TRUCK_BASE;
  const extra = miles - TRAVEL_FREE_MILES;
  const maxExtra = 22; // ~30 mi total ≈ Miami→Ft Lauderdale = max fee
  const fee = TRUCK_BASE + Math.round(extra * (TRUCK_MAX[crew] - TRUCK_BASE) / maxExtra);
  return Math.min(TRUCK_MAX[crew], fee);
}

interface PricingInput {
  moveType: MoveType;
  estimatedDistance: number;
  fromCity?: string;
  toCity?: string;
  inventory: QuoteInventory;
  addons: QuoteAddons;
}

export function calculatePricing(input: PricingInput): QuotePricing {
  const { moveType, estimatedDistance, fromCity, toCity, inventory, addons } = input;
  const crew   = (inventory.crewSize ?? 2) as CrewSize;
  const size   = inventory.homeSize ?? '2br';
  const isLong = moveType === 'long-distance' || moveType === 'international';

  // ── 1. Labour (local) or base rate (long-distance) ────────────────────────
  let laborRate      = 0;
  let truckFee       = 0;
  let estimatedHours = 0;
  let travelFee      = 0;
  let travelMiles    = 0;
  let travelMinutes  = 0;

  switch (moveType) {
    case 'local': {
      estimatedHours = Math.max(MIN_HOURS, HOME_SIZE_HOURS[size] ?? 3);
      laborRate      = Math.round(HOURLY_RATE[crew] * estimatedHours);
      // Distance-based truck fee: $79 base, scales up to hourly rate for longer trips
      travelMiles   = fromCity && toCity ? estimateLocalDistance(fromCity, toCity) : estimatedDistance;
      travelMinutes  = Math.round(travelMiles / TRAVEL_SPEED_MPH * 60);
      truckFee       = getDistanceTruckFee(crew, travelMiles);
      break;
    }
    case 'office': {
      estimatedHours = Math.max(MIN_HOURS, HOME_SIZE_HOURS[size] ?? 4);
      laborRate      = Math.round(HOURLY_RATE[crew] * estimatedHours);
      travelMiles   = fromCity && toCity ? estimateLocalDistance(fromCity, toCity) : estimatedDistance;
      travelMinutes  = Math.round(travelMiles / TRAVEL_SPEED_MPH * 60);
      truckFee       = getDistanceTruckFee(crew, travelMiles);
      break;
    }
    case 'long-distance': {
      const base = Math.max(1200, estimatedDistance * 1.5);
      laborRate  = Math.round(base * (LD_HOME_MULTIPLIER[size] ?? 1.2));
      break;
    }
    case 'international': {
      laborRate = 4500;
      break;
    }
    case 'packing-only': {
      // $79/hr for 2 packers, $119/hr for 3 packers — 3-hour minimum
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

  // ── 2. Access fees ────────────────────────────────────────────────────────
  let accessFee = 0;
  if (inventory.hasStairs) accessFee += (inventory.stairsFlights ?? 1) * 50;

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

  const subtotal = laborRate + truckFee + accessFee + addonsFee + travelFee;
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
  };
}

// ─── Distance estimator ───────────────────────────────────────────────────────
export function estimateDistance(fromState: string, toState: string): number {
  if (!fromState || !toState || fromState === toState) return 30;
  const pairs: Record<string, number> = {
    'FL-NY': 1280, 'NY-FL': 1280,
    'FL-TX': 1100, 'TX-FL': 1100,
    'FL-CA': 2700, 'CA-FL': 2700,
    'FL-IL': 1300, 'IL-FL': 1300,
    'FL-GA': 660,  'GA-FL': 660,
    'FL-NC': 930,  'NC-FL': 930,
    'FL-DC': 1050, 'DC-FL': 1050,
  };
  return pairs[`${fromState}-${toState}`] ?? 600; // unknown pair — conservative default
}

// ─── Starting price helpers (for homepage display) ────────────────────────────
export function localStartingPrice(size: HomeSize, crew: CrewSize = 2): number {
  const hours = Math.max(MIN_HOURS, HOME_SIZE_HOURS[size]);
  return Math.round(HOURLY_RATE[crew] * hours + TRUCK_BASE);
}
