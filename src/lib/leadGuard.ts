/**
 * Protection shared by every public lead endpoint: a per-IP rate limit and a
 * honeypot field.
 *
 * CLAUDE.md has required a rate limit on lead routes for months, but only the
 * unused /api/callback had one; /api/leads and /api/quotes accepted any number
 * of requests from anyone, each one writing to Airtable and pinging Telegram.
 *
 * The limit is in memory, per server instance. That stops a script hammering
 * one endpoint; it is not a distributed limiter and does not pretend to be.
 */

const WINDOW_MS = 60_000;
/** CLAUDE.md: 3 requests per minute per IP. */
const MAX_PER_WINDOW = 3;
const buckets = new Map<string, { count: number; resetAt: number }>();

export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown';
}

/** True when this IP has used up its allowance on this route. */
export function rateLimited(req: Request, route: string, max = MAX_PER_WINDOW): boolean {
  const key = `${route}:${clientIp(req)}`;
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (buckets.size > 5_000) {
      buckets.forEach((v, k) => { if (now > v.resetAt) buckets.delete(k); });
    }
    return false;
  }
  if (entry.count >= max) return true;
  entry.count++;
  return false;
}

/**
 * Hidden form field. A person never sees it, so never fills it; a form-filling
 * bot fills every input it finds. Every public form renders <HoneypotField />.
 */
export const HONEYPOT_FIELD = 'company_website';

export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  const v = body[HONEYPOT_FIELD];
  return typeof v === 'string' && v.trim().length > 0;
}

/** A lead nobody can call or write back to is not a lead. */
export function hasContact(body: Record<string, unknown>): boolean {
  const phone = typeof body.phone === 'string' ? body.phone.replace(/\D/g, '') : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  return phone.length >= 7 || /.+@.+\..+/.test(email);
}
