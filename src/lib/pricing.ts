import type { MoveType, HomeSize, CrewSize, QuoteInventory, QuoteAddons, QuotePricing } from '@/types';

// ─── Rate Tables ──────────────────────────────────────────────────────────────
const HOURLY_RATE: Record<CrewSize, number> = { 2: 119, 3: 169 };
const TRUCK_FEE: Record<CrewSize, number>   = { 2: 79,  3: 99  };
const MIN_HOURS = 3;

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

/** Packing cost by home size */
const PACKING_COST: Record<HomeSize, number> = {
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
interface PricingInput {
  moveType: MoveType;
  estimatedDistance: number;
  inventory: QuoteInventory;
  addons: QuoteAddons;
}

export function calculatePricing(input: PricingInput): QuotePricing {
  const { moveType, estimatedDistance, inventory, addons } = input;
  const crew   = (inventory.crewSize ?? 2) as CrewSize;
  const size   = inventory.homeSize ?? '2br';
  const isLong = moveType === 'long-distance' || moveType === 'international';

  // ── 1. Labour (local) or base rate (long-distance) ────────────────────────
  let laborRate      = 0;
  let truckFee       = 0;
  let estimatedHours = 0;

  switch (moveType) {
    case 'local': {
      estimatedHours = Math.max(MIN_HOURS, HOME_SIZE_HOURS[size] ?? 3);
      laborRate      = Math.round(HOURLY_RATE[crew] * estimatedHours);
      truckFee       = TRUCK_FEE[crew];
      break;
    }
    case 'office': {
      estimatedHours = Math.max(MIN_HOURS, HOME_SIZE_HOURS[size] ?? 4);
      laborRate      = Math.round(169 * estimatedHours);
      truckFee       = 99;
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
  // climateControlled repurposed as packing materials (variable cost — not added to estimate)

  const subtotal = laborRate + truckFee + accessFee + addonsFee;
  const discount = 0;
  const total    = subtotal - discount;

  return {
    laborRate,
    truckFee,
    accessFee,
    addonsFee,
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
  return pairs[`${fromState}-${toState}`] ?? Math.floor(Math.random() * 1200 + 300);
}

// ─── Starting price helpers (for homepage display) ────────────────────────────
export function localStartingPrice(size: HomeSize, crew: CrewSize = 2): number {
  const hours = Math.max(MIN_HOURS, HOME_SIZE_HOURS[size]);
  return Math.round(HOURLY_RATE[crew] * hours + TRUCK_FEE[crew]);
}
