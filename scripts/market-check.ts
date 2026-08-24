/**
 * Print the market a build would resolve to, and assert the invariants that
 * protect a launch.
 *
 *   npx tsx scripts/market-check.ts                        # Florida (default)
 *   NEXT_PUBLIC_MARKET=ca npx tsx scripts/market-check.ts  # Sacramento
 *
 * The assertions are the point. Two of them exist because the failure they
 * prevent would be published to customers before anyone noticed: a branch
 * borrowing another branch's reviews, and a California site that bills drive
 * time once when the tariff requires double.
 */
import { MARKET } from '../src/config/market';

const problems: string[] = [];
const notes: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) problems.push(message);
}

console.log(`market:        ${MARKET.id}`);
console.log(`brand:         ${MARKET.brandName}`);
console.log(`site:          ${MARKET.siteUrl}`);
console.log(`phone:         ${MARKET.phone.display}`);
console.log(`region:        ${MARKET.regionLabel}`);
console.log(`locales:       ${MARKET.locales.join(', ')}`);
console.log(`rating:        ${MARKET.rating ? `${MARKET.rating.value} / ${MARKET.rating.count}` : 'none (no AggregateRating emitted)'}`);
console.log(`licence:       ${MARKET.licence.permitNumber ?? 'none published'} (${MARKET.licence.regulator})`);
console.log(`rate cap:      ${MARKET.pricing.rateCapAuthority ?? 'none'}`);
console.log(`double drive:  ${MARKET.pricing.doubleDriveTime ? `yes, at >= ${MARKET.pricing.doubleDriveTimeMinMiles} mi` : 'no'}`);
console.log(`indexnow:      ${MARKET.indexNow ? 'key set' : 'no key'}`);
console.log('');

// A market may only publish a rating it actually earned.
check(
  MARKET.id !== 'ca' || MARKET.rating === undefined,
  'Sacramento must not carry a rating until it has its own Google reviews. Florida\'s are Florida\'s.',
);

// California's Maximum Rate Tariff 4, Item 320.
check(
  MARKET.id !== 'ca' || MARKET.pricing.doubleDriveTime,
  'California bills double drive time on local moves. Turning this off is not a pricing choice, it is a tariff violation.',
);

// Never claim a licence without a number behind it.
check(
  MARKET.licence.permitNumber !== '' && MARKET.licence.usdotNumber !== '',
  'Licence numbers must be a real number or null, never an empty string.',
);

check(
  !MARKET.siteUrl.endsWith('/'),
  'siteUrl must have no trailing slash — canonicals and JSON-LD @ids are built from it.',
);

check(
  MARKET.locales.includes('en'),
  'Every market ships English.',
);

// Things that are legal but must not reach a public launch unnoticed.
if (MARKET.pricing.rateCapAuthority && MARKET.id === 'ca') {
  notes.push(
    `rates are capped by ${MARKET.pricing.rateCapAuthority} — confirm $${MARKET.pricing.hourlyRate[2]}/$${MARKET.pricing.hourlyRate[3]} comply before this domain is public`,
  );
}
if (!MARKET.licence.permitNumber) {
  notes.push(`no ${MARKET.licence.permitLabel} on file — the site makes no licensing claim until there is one (${MARKET.licence.sourceUrl})`);
}
if (!MARKET.nap.streetAddress) {
  notes.push('no street address — PostalAddress will omit streetAddress rather than invent one');
}
if (!MARKET.indexNow) {
  notes.push('no IndexNow key — Bing and Yandex will not be notified of updates');
}

for (const n of notes) console.log(`note:  ${n}`);
if (notes.length) console.log('');

if (problems.length) {
  for (const p of problems) console.error(`FAIL:  ${p}`);
  process.exitCode = 1;
} else {
  console.log('all market invariants hold');
}
