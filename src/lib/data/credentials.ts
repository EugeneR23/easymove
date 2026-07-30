/**
 * Trust credentials that require Evgenii's input.
 *
 * Everything on the site that would state a licence number, a Google rating or
 * an insurance limit reads from here. While a value is `null`, the site simply
 * does not make that claim — no placeholder text ever renders to a customer.
 * Fill a value in and the badge, the schema property and the llms.txt line all
 * appear automatically. One file, three values, no hunting through components.
 */

/**
 * Florida mover registration number issued by FDACS under Chapter 507.
 * Where to find it: your registration certificate, or search your business name
 * at https://www.fdacs.gov/Consumer-Resources/Business-Search — the number looks
 * like "IM1234".
 *
 * This is the single highest-value trust signal still missing. Competitors who
 * outrank us for "movers sunny isles beach" publish theirs (Biscayne Moving
 * shows IM 4191 and USDOT 5292075); we currently publish nothing, and the
 * audit had to strip ~15 "Licensed & Insured" badges because none of them
 * pointed at a checkable number.
 */
export const FDACS_NUMBER: string | null = null;

/** US DOT number, if you run interstate moves under your own authority. */
export const USDOT_NUMBER: string | null = null;

/**
 * Google Business Profile. Setting these re-enables the Google blocks on
 * /reviews and adds the profile to the entity graph's sameAs.
 * - profileUrl: the public "share" link from your GBP dashboard
 * - reviewUrl:  Dashboard → Ask for reviews → the https://g.page/r/.../review link
 * - rating / reviewCount: only fill these in with the live numbers, and update
 *   them when they move. A stale rating in schema is worse than none.
 */
export const GOOGLE_BUSINESS: {
  profileUrl: string | null;
  reviewUrl: string | null;
  rating: string | null;
  reviewCount: number | null;
} = {
  profileUrl: null,
  reviewUrl: null,
  rating: null,
  reviewCount: null,
};

/**
 * Insurance. Only fill this in if the numbers should be public. Once set, the
 * site can say "general liability to $X, cargo to $Y with <carrier>" instead of
 * the vaguer "COI to your building within 24 hours" it says today.
 */
export const INSURANCE: {
  carrier: string | null;
  generalLiabilityLimit: string | null;
  cargoLimit: string | null;
} = {
  carrier: null,
  generalLiabilityLimit: null,
  cargoLimit: null,
};

/** Verified review source we can already cite today. */
export const THUMBTACK = {
  url: 'https://www.thumbtack.com/profile/services/474342774303219734/reviews',
  rating: '5.0',
  reviewCount: 32,
} as const;

/** True once there is a licence number worth showing. */
export const hasLicenceNumber = (): boolean => Boolean(FDACS_NUMBER || USDOT_NUMBER);

/** "FDACS IM1234 · USDOT 5292075", or null while neither is set. */
export function licenceLine(): string | null {
  const parts: string[] = [];
  if (FDACS_NUMBER) parts.push(`FDACS ${FDACS_NUMBER}`);
  if (USDOT_NUMBER) parts.push(`USDOT ${USDOT_NUMBER}`);
  return parts.length ? parts.join(' · ') : null;
}
