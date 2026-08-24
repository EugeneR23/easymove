import type { MoveType, HomeSize, CrewSize, QuoteInventory, QuoteAddons, QuotePricing } from '@/types';

// ─── Rate Tables ──────────────────────────────────────────────────────────────
// Updated 2026-07-30 per owner's source of truth (truck fee set to $129 by
// Evgenii on 2026-07-30, superseding the earlier $99 figure):
//   - Truck: $129 flat per day, always a separate line item. Fuel, tolls and
//     mileage are inside the $129. Never scaled by distance, never "included".
//   - No weekend or seasonal surcharges: the hourly rate is locked.
//   - Stairs/long carries cost TIME (extra estimated hours), never a fee.
// [TODO: confirm with Evgenii] the 4-mover $229/hr rate — not in the verified
// rate card ($129 / $179 only); kept because the wizard offers a 4-mover crew.
export const HOURLY_RATE: Record<CrewSize, number>  = { 2: 129, 3: 179, 4: 229 };
export const MIN_HOURS = 3;
const PACKING_HOURLY_RATE: Record<CrewSize, number> = { 2: 79,  3: 119, 4: 159 };
export const TRUCK_FEE = 129; // flat per day — fuel, tolls, mileage included
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

// ─── Long-distance cost model ─────────────────────────────────────────────────
// Price = crew labour at both ends + linehaul (truck/fuel/driver, scaled by home
// size) + per-diem for multi-day trips. Never below LD_MINIMUM.
const LD_RATE_PER_MILE  = 2.0;  // $/mi linehaul base — truck, fuel, driver, return leg
const LD_MILES_PER_DAY  = 450;  // DOT hours-of-service: ~450 mi per driving day
const LD_DAY_FEE        = 250;  // lodging + per-diem for each extra day on the road
const LD_AVG_SPEED_MPH  = 55;   // highway average incl. stops
const LD_UNLOAD_FACTOR  = 0.75; // unloading is faster than loading
export const LD_MINIMUM = 1500; // interstate minimum charge
const LD_DEFAULT_MILES  = 600;  // destination unknown — conservative default

// ─── US city coordinates [lat, lon] for long-distance routes ─────────────────
// Keyed "city st" (lowercase). FL origins covered densely; major metros per state.
// Unknown city falls back to its state centroid.
const LD_CITY_COORDS: Record<string, [number, number]> = {
  // Florida (origin side)
  'miami fl': [25.76, -80.19], 'miami beach fl': [25.79, -80.13], 'brickell fl': [25.76, -80.19],
  'hialeah fl': [25.86, -80.28], 'coral gables fl': [25.72, -80.27], 'kendall fl': [25.68, -80.32],
  'doral fl': [25.82, -80.36], 'aventura fl': [25.96, -80.14], 'homestead fl': [25.47, -80.48],
  'hollywood fl': [26.01, -80.15], 'pembroke pines fl': [26.01, -80.30], 'fort lauderdale fl': [26.12, -80.14],
  'pompano beach fl': [26.24, -80.12], 'coral springs fl': [26.27, -80.27], 'boca raton fl': [26.37, -80.10],
  'delray beach fl': [26.46, -80.07], 'boynton beach fl': [26.53, -80.07], 'west palm beach fl': [26.71, -80.05],
  'jupiter fl': [26.93, -80.09], 'port st lucie fl': [27.27, -80.35], 'fort pierce fl': [27.45, -80.33],
  'vero beach fl': [27.64, -80.40], 'melbourne fl': [28.08, -80.61], 'palm bay fl': [28.03, -80.59],
  'naples fl': [26.14, -81.79], 'marco island fl': [25.94, -81.72], 'bonita springs fl': [26.34, -81.78],
  'fort myers fl': [26.64, -81.87], 'cape coral fl': [26.56, -81.95], 'punta gorda fl': [26.93, -82.05],
  'port charlotte fl': [26.98, -82.10], 'north port fl': [27.04, -82.24], 'englewood fl': [26.96, -82.35],
  'venice fl': [27.10, -82.45], 'sarasota fl': [27.34, -82.53], 'bradenton fl': [27.50, -82.57],
  'st petersburg fl': [27.77, -82.64], 'clearwater fl': [27.97, -82.80], 'tampa fl': [27.95, -82.46],
  'brandon fl': [27.94, -82.29], 'lakeland fl': [28.04, -81.95], 'winter haven fl': [28.02, -81.73],
  'kissimmee fl': [28.29, -81.41], 'orlando fl': [28.54, -81.38], 'the villages fl': [28.93, -82.01],
  'ocala fl': [29.19, -82.14], 'gainesville fl': [29.65, -82.32], 'daytona beach fl': [29.21, -81.02],
  'palm coast fl': [29.58, -81.21], 'st augustine fl': [29.90, -81.31], 'jacksonville fl': [30.33, -81.66],
  'tallahassee fl': [30.44, -84.28], 'pensacola fl': [30.42, -87.22], 'key west fl': [24.56, -81.78],
  // Northeast / Mid-Atlantic
  'new york ny': [40.71, -74.01], 'new york city ny': [40.71, -74.01], 'manhattan ny': [40.71, -74.01],
  'brooklyn ny': [40.68, -73.94], 'queens ny': [40.73, -73.79], 'bronx ny': [40.84, -73.87],
  'staten island ny': [40.58, -74.15], 'buffalo ny': [42.89, -78.88], 'rochester ny': [43.16, -77.61],
  'albany ny': [42.65, -73.75], 'newark nj': [40.74, -74.17], 'jersey city nj': [40.73, -74.06],
  'edison nj': [40.52, -74.41], 'trenton nj': [40.22, -74.74], 'philadelphia pa': [39.95, -75.17],
  'pittsburgh pa': [40.44, -80.00], 'allentown pa': [40.60, -75.49], 'harrisburg pa': [40.27, -76.88],
  'boston ma': [42.36, -71.06], 'worcester ma': [42.26, -71.80], 'springfield ma': [42.10, -72.59],
  'hartford ct': [41.77, -72.67], 'new haven ct': [41.31, -72.92], 'stamford ct': [41.05, -73.54],
  'providence ri': [41.82, -71.41], 'manchester nh': [42.99, -71.46], 'portland me': [43.66, -70.26],
  'burlington vt': [44.48, -73.21], 'washington dc': [38.91, -77.04], 'baltimore md': [39.29, -76.61],
  'rockville md': [39.08, -77.15], 'annapolis md': [38.97, -76.50], 'wilmington de': [39.74, -75.55],
  'dover de': [39.16, -75.52], 'arlington va': [38.88, -77.10], 'alexandria va': [38.80, -77.05],
  'richmond va': [37.54, -77.44], 'virginia beach va': [36.85, -75.98], 'norfolk va': [36.85, -76.29],
  'roanoke va': [37.27, -79.94],
  // Southeast
  'charlotte nc': [35.23, -80.84], 'raleigh nc': [35.78, -78.64], 'cary nc': [35.79, -78.78],
  'durham nc': [35.99, -78.90], 'chapel hill nc': [35.91, -79.06], 'greensboro nc': [36.07, -79.79],
  'winston salem nc': [36.10, -80.24], 'asheville nc': [35.60, -82.55], 'wilmington nc': [34.23, -77.94],
  'fayetteville nc': [35.05, -78.88], 'charleston sc': [32.78, -79.93], 'columbia sc': [34.00, -81.03],
  'greenville sc': [34.85, -82.40], 'myrtle beach sc': [33.69, -78.89], 'atlanta ga': [33.75, -84.39],
  'savannah ga': [32.08, -81.09], 'augusta ga': [33.47, -81.97], 'macon ga': [32.84, -83.63],
  'athens ga': [33.96, -83.38], 'nashville tn': [36.16, -86.78], 'memphis tn': [35.15, -90.05],
  'knoxville tn': [35.96, -83.92], 'chattanooga tn': [35.05, -85.31], 'birmingham al': [33.52, -86.80],
  'montgomery al': [32.38, -86.31], 'huntsville al': [34.73, -86.59], 'mobile al': [30.69, -88.04],
  'jackson ms': [32.30, -90.18], 'gulfport ms': [30.37, -89.09], 'new orleans la': [29.95, -90.07],
  'baton rouge la': [30.45, -91.19], 'louisville ky': [38.25, -85.76], 'lexington ky': [38.04, -84.50],
  'charleston wv': [38.35, -81.63], 'little rock ar': [34.75, -92.29],
  // Midwest
  'chicago il': [41.88, -87.63], 'naperville il': [41.75, -88.15], 'columbus oh': [39.96, -83.00],
  'cleveland oh': [41.50, -81.69], 'cincinnati oh': [39.10, -84.51], 'dayton oh': [39.76, -84.19],
  'toledo oh': [41.65, -83.54], 'detroit mi': [42.33, -83.05], 'grand rapids mi': [42.96, -85.66],
  'ann arbor mi': [42.28, -83.74], 'indianapolis in': [39.77, -86.16], 'fort wayne in': [41.08, -85.14],
  'milwaukee wi': [43.04, -87.91], 'madison wi': [43.07, -89.40], 'minneapolis mn': [44.98, -93.27],
  'st paul mn': [44.95, -93.09], 'des moines ia': [41.59, -93.62], 'st louis mo': [38.63, -90.20],
  'kansas city mo': [39.10, -94.58], 'omaha ne': [41.26, -95.93], 'wichita ks': [37.69, -97.34],
  'sioux falls sd': [43.55, -96.73], 'fargo nd': [46.88, -96.79],
  // West / Southwest
  'houston tx': [29.76, -95.37], 'dallas tx': [32.78, -96.80], 'fort worth tx': [32.76, -97.33],
  'austin tx': [30.27, -97.74], 'san antonio tx': [29.42, -98.49], 'el paso tx': [31.76, -106.49],
  'oklahoma city ok': [35.47, -97.52], 'tulsa ok': [36.15, -95.99], 'denver co': [39.74, -104.99],
  'colorado springs co': [38.83, -104.82], 'boulder co': [40.01, -105.27], 'albuquerque nm': [35.08, -106.65],
  'santa fe nm': [35.69, -105.94], 'phoenix az': [33.45, -112.07], 'tucson az': [32.22, -110.97],
  'scottsdale az': [33.49, -111.93], 'mesa az': [33.42, -111.83], 'salt lake city ut': [40.76, -111.89],
  'las vegas nv': [36.17, -115.14], 'reno nv': [39.53, -119.81], 'boise id': [43.62, -116.21],
  'billings mt': [45.78, -108.50], 'cheyenne wy': [41.14, -104.82], 'seattle wa': [47.61, -122.33],
  'spokane wa': [47.66, -117.43], 'tacoma wa': [47.25, -122.44], 'portland or': [45.52, -122.68],
  'eugene or': [44.05, -123.09], 'los angeles ca': [34.05, -118.24], 'san diego ca': [32.72, -117.16],
  'san francisco ca': [37.77, -122.42], 'san jose ca': [37.34, -121.89], 'sacramento ca': [38.58, -121.49],
  'fresno ca': [36.74, -119.79], 'oakland ca': [37.80, -122.27], 'irvine ca': [33.68, -117.83],
  'anchorage ak': [61.22, -149.90], 'honolulu hi': [21.31, -157.86],
};

// State centroids [lat, lon] — fallback when the city is not in the table
const STATE_CENTROIDS: Record<string, [number, number]> = {
  AL: [32.8, -86.8], AK: [61.2, -149.9], AZ: [33.4, -112.1], AR: [34.8, -92.3],
  CA: [36.7, -119.8], CO: [39.5, -105.0], CT: [41.6, -72.7], DE: [39.0, -75.5],
  DC: [38.9, -77.0], FL: [27.8, -81.7], GA: [33.0, -83.5], HI: [21.3, -157.9],
  ID: [44.0, -114.7], IL: [40.0, -89.0], IN: [39.8, -86.3], IA: [42.0, -93.5],
  KS: [38.5, -98.0], KY: [37.8, -84.9], LA: [30.5, -91.0], ME: [44.3, -69.8],
  MD: [39.0, -76.7], MA: [42.3, -71.8], MI: [43.3, -84.5], MN: [45.7, -93.9],
  MS: [32.7, -89.7], MO: [38.5, -92.3], MT: [46.9, -110.4], NE: [41.1, -98.0],
  NV: [38.8, -116.4], NH: [43.5, -71.6], NJ: [40.1, -74.5], NM: [34.8, -106.2],
  NY: [42.2, -74.9], NC: [35.6, -79.8], ND: [47.5, -99.8], OH: [40.4, -82.8],
  OK: [35.6, -96.9], OR: [43.8, -120.6], PA: [40.6, -77.2], RI: [41.7, -71.5],
  SC: [33.9, -80.9], SD: [44.3, -100.0], TN: [35.7, -86.7], TX: [31.0, -97.6],
  UT: [39.3, -111.1], VT: [44.0, -72.7], VA: [37.5, -78.9], WA: [47.4, -120.7],
  WV: [38.6, -80.5], WI: [44.3, -89.6], WY: [43.1, -107.3],
};

const LD_ROAD_FACTOR = 1.18; // road miles vs straight line on interstate corridors

function normLdCity(c: string): string {
  return c.toLowerCase().trim()
    .replace(/,.*$/, '')        // "Venice, FL" → "venice"
    .replace(/\./g, '')         // "St. Petersburg" → "St Petersburg"
    .replace(/-/g, ' ')
    .replace(/^saint /, 'st ')
    .replace(/^ft /, 'fort ')
    .replace(/\s+/g, ' ');
}

function haversineMiles(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 3958.8; // earth radius, miles
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2
          + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function resolveLdPoint(city: string, state: string): [number, number] | null {
  const c = normLdCity(city);
  const st = state.trim().toUpperCase();
  if (c && st) {
    const exact = LD_CITY_COORDS[`${c} ${st.toLowerCase()}`];
    if (exact) return exact;
  }
  return STATE_CENTROIDS[st] ?? null;
}

/**
 * Estimate driving miles for a long-distance move from city/state pairs.
 * City lookup → state centroid fallback → legacy state-pair table → 600 mi default.
 */
export function estimateLongDistance(fromCity: string, fromState: string, toCity: string, toState: string): number {
  const fromSt = (fromState || 'FL').trim().toUpperCase();
  const toSt   = (toState || '').trim().toUpperCase();
  // Destination not provided — conservative default, coordinator confirms
  if (!normLdCity(toCity) && (!toSt || toSt === fromSt)) return LD_DEFAULT_MILES;
  const from = resolveLdPoint(fromCity, fromSt) ?? STATE_CENTROIDS['FL'];
  const to   = resolveLdPoint(toCity, toSt);
  if (!to) return estimateDistance(fromSt, toSt);
  const miles = Math.round(haversineMiles(from, to) * LD_ROAD_FACTOR);
  return Math.max(miles, 100); // long-distance implies a meaningful linehaul
}

// ─── Main calculator ──────────────────────────────────────────────────────────
// Average South Florida city driving speed (mph) — accounts for traffic + stops
const TRAVEL_SPEED_MPH = 28;

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

  // Stairs cost time, not a fee — extra carry hours added to the labour estimate
  const stairsHours = inventory.hasStairs
    ? (inventory.stairsFlights ?? 1) * STAIRS_EXTRA_HOURS_PER_FLIGHT
    : 0;

  switch (moveType) {
    case 'local': {
      estimatedHours = Math.max(MIN_HOURS, (HOME_SIZE_HOURS[size] ?? 3) + stairsHours);
      laborRate      = Math.round(HOURLY_RATE[crew] * estimatedHours);
      travelMiles   = fromCity && toCity ? estimateLocalDistance(fromCity, toCity) : estimatedDistance;
      travelMinutes  = Math.round(travelMiles / TRAVEL_SPEED_MPH * 60);
      truckFee       = TRUCK_FEE; // flat per day, separate line item
      break;
    }
    case 'office': {
      estimatedHours = Math.max(MIN_HOURS, (HOME_SIZE_HOURS[size] ?? 4) + stairsHours);
      laborRate      = Math.round(HOURLY_RATE[crew] * estimatedHours);
      travelMiles   = fromCity && toCity ? estimateLocalDistance(fromCity, toCity) : estimatedDistance;
      travelMinutes  = Math.round(travelMiles / TRAVEL_SPEED_MPH * 60);
      truckFee       = TRUCK_FEE; // flat per day, separate line item
      break;
    }
    case 'long-distance': {
      const miles   = Math.max(100, Math.round(estimatedDistance));
      travelMiles   = miles;
      travelMinutes = Math.round((miles / LD_AVG_SPEED_MPH) * 60);
      // 1) Crew labour at both ends — loading + unloading at standard hourly rates
      const loadHours   = (HOME_SIZE_HOURS[size] ?? 4.5) + stairsHours;
      const unloadHours = Math.round(loadHours * LD_UNLOAD_FACTOR * 2) / 2;
      estimatedHours    = loadHours + unloadHours;
      laborRate         = Math.round(HOURLY_RATE[crew] * estimatedHours);
      // 2) Linehaul — truck, fuel, driver, return leg; scales with shipment size
      const linehaul = miles * LD_RATE_PER_MILE * (LD_HOME_MULTIPLIER[size] ?? 1.2);
      // 3) Multi-day trips — lodging + per-diem for each extra day on the road
      const roadDays = Math.max(1, Math.ceil(miles / LD_MILES_PER_DAY));
      truckFee = Math.round(linehaul + (roadDays - 1) * LD_DAY_FEE);
      // Interstate minimum — never quote below LD_MINIMUM regardless of inputs
      if (laborRate + truckFee < LD_MINIMUM) truckFee = LD_MINIMUM - laborRate;
      break;
    }
    case 'international': {
      laborRate = 4500;
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
  return Math.round(HOURLY_RATE[crew] * hours + TRUCK_FEE);
}
