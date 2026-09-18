/**
 * How to reach the company, and where it is.
 *
 * The number itself never disagreed — 786-305-1844 in all 282 places. The
 * *links* did: 26 files wrote `tel:7863051844` and 19 wrote
 * `tel:+17863051844`, for the same button on the same site. A bare
 * ten-digit tel: works from a US handset and is ambiguous from anywhere else,
 * which for a company whose customers are half Russian-speaking snowbirds is
 * not a hypothetical.
 *
 * src/lib/utils.ts already exported PHONE_E164 and PHONE_DISPLAY for this, and
 * had zero importers in the whole repository. Exporting a constant nobody
 * imports is not centralisation; it is a second place to be wrong. Those are
 * gone and this module replaces them.
 *
 * Deliberately not attempted: the ~200 occurrences of 786-305-1844 inside prose
 * in cities*.ts, costPages.ts and blog.ts. A phone number inside a Russian
 * sentence is copy, not a link, and templating it would buy nothing — the guard
 * rule `foreign-phone` catches a wrong one instead.
 */

export const PHONE = {
  /** The only form that belongs in a tel: or wa.me href. */
  e164: '+17863051844',
  /** The only form that belongs in visible copy. */
  display: '786-305-1844',
  /** For prose that wants the country code spelled out. */
  intl: '+1 786-305-1844',
  /** wa.me path segment — E.164 without the plus. */
  digits: '17863051844',
} as const;

export const telHref = (): string => `tel:${PHONE.e164}`;
export const smsHref = (body?: string): string =>
  `sms:${PHONE.e164}${body ? `?&body=${encodeURIComponent(body)}` : ''}`;

export const EMAIL = 'romanov@easy-move-florida.com';
export const emailHref = (subject?: string): string =>
  `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

/**
 * The canonical NAP address, confirmed by the owner 2026-09-11 and the one used
 * on every directory listing. A second street on a third-party card splits the
 * entity exactly as a second spelling of the name would.
 */
export const ADDRESS = {
  streetAddress: '2130 Stirling Rd',
  addressLocality: 'Hollywood',
  addressRegion: 'FL',
  postalCode: '33020',
  addressCountry: 'US',
} as const;

/** One line, for a footer or a contact block. */
export const addressLine = (): string =>
  `${ADDRESS.streetAddress}, ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion} ${ADDRESS.postalCode}`;

/** [TODO: Evgenii] take the exact coordinates from the Google profile rather than a map pin. */
export const GEO = { latitude: 26.0038, longitude: -80.158 } as const;

export const OWNER = {
  name: 'Evgenii Romanov',
  /** Spellings that appear in the wild. Kept so schema can list them as alternates. */
  alternateNames: ['Eugene Romanov', 'Евгений Романов'] as const,
  jobTitle: 'Founder & Owner',
} as const;

/** { '@type': 'PostalAddress', ... } — so the address is typed once for schema too. */
export const postalAddressSchema = () => ({ '@type': 'PostalAddress', ...ADDRESS });

/** WhatsApp deep link. Moved here from lib/utils.ts, next to the number it uses. */
export function whatsappUrl(message = "Hi, I'd like a moving quote"): string {
  return `https://wa.me/${PHONE.digits}?text=${encodeURIComponent(message)}`;
}
