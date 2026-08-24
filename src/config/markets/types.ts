/**
 * One market = one deployment = one domain.
 *
 * The site ships twice from this repo: Florida at easy-move-florida.com and
 * Sacramento at its own domain. `NEXT_PUBLIC_MARKET` picks which config a build
 * uses; everything that differs between the two branches lives here rather than
 * in 130 hardcoded literals.
 *
 * Rules this shape enforces on purpose:
 * - `rating` is optional. A market with no reviews yet cannot accidentally
 *   publish an AggregateRating, because there is nothing to read.
 * - `licence` holds a nullable number and the name of the regulator that issues
 *   it. While the number is null the site makes no licensing claim at all —
 *   same contract as src/lib/data/credentials.ts.
 * - `pricing.doubleDriveTime` exists because California law requires it and
 *   Florida has no equivalent. It is a rule, not a rate.
 */

export type MarketId = 'fl' | 'ca';

export interface MarketPhone {
  e164: string;
  display: string;
  whatsapp: string;
}

export interface MarketNap {
  streetAddress: string | null;
  addressLocality: string;
  addressRegion: 'FL' | 'CA';
  postalCode: string | null;
  addressCountry: 'US';
  geo: { latitude: number; longitude: number } | null;
}

export interface MarketLicence {
  /** Who issues the permit this market's movers must hold. */
  regulator: string;
  /** e.g. "FDACS IM number" (FL) or "BHGS household mover permit / Cal-T" (CA). */
  permitLabel: string;
  /** null until the owner supplies it. No number, no licensing claim anywhere. */
  permitNumber: string | null;
  usdotNumber: string | null;
  /** Where the owner obtains or verifies it — surfaced in docs, never on the site. */
  sourceUrl: string;
}

export interface MarketPricing {
  hourlyRate: Record<2 | 3 | 4, number>;
  minHours: number;
  /** Flat per-day truck line item. */
  truckFee: number;
  /** Interstate floor. */
  ldMinimum: number;
  /**
   * California only. Maximum Rate Tariff 4 Item 320 requires hourly charges to
   * bill *double* the driving time from origin to destination on local moves
   * where the two points are >= 5 miles apart. Florida has no such rule, so this
   * is false there and the drive time is billed once.
   */
  doubleDriveTime: boolean;
  /** Minimum separation before double drive time applies (miles). CA: 5. */
  doubleDriveTimeMinMiles: number;
  /**
   * True where a state tariff caps what may be charged. When true the rates
   * above must be checked against that tariff before they go live.
   */
  rateCapAuthority: string | null;
}

export interface MarketRating {
  value: string;
  count: number;
}

export interface MarketConfig {
  id: MarketId;
  /** Consumer-facing brand. Also the schema `name`. */
  brandName: string;
  /** Canonical host, no protocol. */
  domain: string;
  /** Canonical origin, no trailing slash. */
  siteUrl: string;
  email: string;
  phone: MarketPhone;
  nap: MarketNap;
  /** "South Florida", "the Sacramento area" — used in copy and schema. */
  regionLabel: string;
  /** Default state for the quote wizard and long-distance origin. */
  defaultState: 'FL' | 'CA';
  /** Cities offered in the quote wizard dropdowns. */
  quoteCities: string[];
  /** Locales this deployment actually ships. Gates /ru and hreflang. */
  locales: Array<'en' | 'ru'>;
  /** Schema City nodes for areaServed. */
  areaServedCities: Array<{ name: string; sameAs?: string }>;
  /** Absent on a market with no verified reviews — no rating is then emitted. */
  rating?: MarketRating;
  sameAs: string[];
  licence: MarketLicence;
  pricing: MarketPricing;
  openingHours: { opens: string; closes: string; days: string[] };
  foundingDate: string | null;
  indexNow: { key: string; keyFile: string } | null;
  /** The other branch, for parentOrganization / subOrganization cross-links. */
  sibling: { brandName: string; url: string; relation: 'parent' | 'sub' } | null;
}
