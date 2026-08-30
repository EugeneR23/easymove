/**
 * Which paths exist in more than one language.
 *
 * The header's language switch reads this to send a visitor to the counterpart
 * of the page they are on instead of dumping them on the homepage. It is a
 * slug-only module on purpose: the header is a client component, and importing
 * CITIES_RU or CITIES_UA there would ship every word of that content to the
 * browser.
 *
 * Because it is hand-kept, scripts/links.test.ts compares it against the real
 * city arrays and fails when the two drift. The list had already gone stale
 * once — nine dual-language cities shipped while the switch still knew six.
 */
export const PAIRED_SLUGS = {
  /** Non-city paths that exist in EN and RU. */
  staticPages: ['about', 'services', 'pricing', 'contact'],

  /** City slugs with a /ru counterpart. */
  ru: [
    'miami-movers',
    'miami-beach-movers',
    'north-miami-beach-movers',
    'bal-harbour-movers',
    'sunny-isles-movers',
    'aventura-movers',
    'hallandale-beach-movers',
    'hollywood-movers',
    'fort-lauderdale-movers',
    'pembroke-pines-movers',
    'weston-movers',
    'coral-springs-movers',
    'sunrise-movers',
    'boca-raton-movers',
    'delray-beach-movers',
    'boynton-beach-movers',
  ],

  /** City slugs with a /ua counterpart. */
  ua: [
    'sunny-isles-movers',
    'hallandale-beach-movers',
    'hollywood-movers',
    'miami-movers',
    'aventura-movers',
    'fort-lauderdale-movers',
  ],
} as const;

/** Every path the RU switch can reach directly. */
export const RU_PAIRED_PATHS: string[] = [...PAIRED_SLUGS.staticPages, ...PAIRED_SLUGS.ru];

/** Every path the UA switch can reach directly. Static pages have no UA version yet. */
export const UA_PAIRED_PATHS: string[] = [...PAIRED_SLUGS.ua];
