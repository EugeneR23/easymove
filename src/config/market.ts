import type { MarketConfig, MarketId } from './markets/types';
import { FL } from './markets/fl';
import { CA } from './markets/ca';

export type { MarketConfig, MarketId } from './markets/types';

const MARKETS: Record<MarketId, MarketConfig> = { fl: FL, ca: CA };

function resolveMarket(): MarketConfig {
  const raw = process.env.NEXT_PUBLIC_MARKET;
  // Unset means Florida. The Florida project therefore builds identically with
  // no configuration at all, which is what keeps the live site safe from this
  // refactor.
  if (!raw) return FL;
  const found = MARKETS[raw as MarketId];
  if (!found) {
    throw new Error(
      `NEXT_PUBLIC_MARKET="${raw}" is not a market. Expected one of: ${Object.keys(MARKETS).join(', ')}.`,
    );
  }
  return found;
}

/** The market this build serves. Resolved once, at build time. */
export const MARKET: MarketConfig = resolveMarket();

export const SITE_URL = MARKET.siteUrl;
export const BRAND = MARKET.brandName;

/** True when the running build serves `id`. Use to gate market-specific routes. */
export function isMarket(id: MarketId): boolean {
  return MARKET.id === id;
}
