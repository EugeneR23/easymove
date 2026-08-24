import { notFound } from 'next/navigation';
import { MARKET, type MarketId } from '@/config/market';

/**
 * Serve this route only on the named market's deployment; 404 everywhere else.
 *
 * Both branches build from one repo, so Florida's city pages, Russian pages and
 * Miami cost guide are present in the California bundle unless something stops
 * them. A Sacramento site answering /miami-movers would be a duplicate-content
 * problem and a lie about where the company works.
 *
 * On the market it names this is a no-op, so adding the call cannot change what
 * Florida serves today.
 */
export function marketOnly(id: MarketId): void {
  if (MARKET.id !== id) notFound();
}
