/**
 * Fails the build on claims the company cannot back up.
 *
 * Every rule below was written against code that violated it. If you add a rule,
 * run it on the offending code first and watch it fail — a guard that has never
 * failed is decoration, and this file exists precisely because plausible-sounding
 * copy shipped for months without anyone able to point at the evidence for it.
 *
 * When Evgenii confirms a specific claim, put its exact string in ALLOW and note
 * the confirmation in docs/CLAIMS_TO_CONFIRM.md. Do not loosen a pattern to make
 * one sentence pass.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const SCAN = ['src', 'data', 'public/llms.txt', 'docs/GBP_COPY_PASTE_PACKAGE.md', 'docs/AGGREGATOR_SUBMISSION_PACKAGE.md'];
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'audit', 'superpowers', 'deflora']);
/** Files allowed to contain what a rule bans, because they are its single source. */
const RULE_EXEMPT = new Map([
  ['hand-written-canonical', ['src/lib/seo/routes.ts']],
  ['tel-format', ['src/lib/data/contact.ts']],
]);
const EXT = /\.(tsx?|jsx?|mjs|json|md|txt)$/;

/** Exact substrings that are confirmed true. Add only with a line in CLAIMS_TO_CONFIRM.md. */
const ALLOW = [
  // A comment recording why the old brand name was removed. Keeping the note is
  // the point: it stops someone re-adding the alternateName in good faith.
  '"EasyMove Elite" removed: it named an entity that does not exist in the',
  // hours.ts documents the hours it replaced. Describing the old value is how
  // the next reader learns why the module exists.
  '* away from the Google Business Profile: the site said',
  // The GBP package documents what the previous version wrongly told the owner
  // to paste. Naming the mistake is the point of the warning.
  'Не добавлять «International moving» — такой услуги нет.',
  'Не «EasyMove Elite», не «Easy Move FL»',
  // credentials.ts documents the live profile figures it is the source of, and
  // records the Google-verification sentence that was removed for being untrue.
  // Naming the wrong value is the point of the note, same as the entries above.
  '4.7 across 33 reviews (91% five-star, one 1-star)',
  'The site used to say "Both platforms verify the customer hired us before they',
  'hand-typed "5.0/32" copies went stale the day a one-star review landed',
  // pricing.ts documents the interstate model it replaced. Naming the constant is
  // how the next reader learns why routeMode() exists and must not be bypassed.
  'set of state centroids, a haversine linehaul model and `LD_MINIMUM = 1500`',
  // policies.ts quotes the two sentences from /terms that it replaced. Naming
  // them is how the next reader learns the module is not decoration.
  'while the rest of the site said payment is collected on site about',
  'and "Cancellation fees may apply"',
  '* to — contradicted every one of them. It said "Payment is due upon completion of',
  // Two notes that name the retired $229 four-mover rate and the "each" defect
  // on purpose. Removing the note is how someone re-introduces the bug in good
  // faith, which is the same reasoning as the entries above.
  'used to print $229/hr for four movers next to a "from" price that',
  'not have caught a single defect this pass found — "$129 per hour each" and',
  '"$229/hr" both survive token substitution untouched. The claims-guard rule',
];

/**
 * The hourly figures the site is allowed to state, read from the rate card
 * itself. If HOURLY_RATE changes, every prose sentence still naming the old one
 * fails this build with a file:line list.
 *
 * TRUCK_FEE is deliberately not in here. It is a per-day fee that currently
 * equals the crew rate, and including it kept $129 authorised after a
 * simulated change to $139 — the guard passed the very change it exists to
 * catch. Verified by making that change and watching it stay clean.
 */
const RATE_CARD = (() => {
  const src = readFileSync(join(ROOT, 'src/lib/pricing.ts'), 'utf8');
  const nums = new Set();
  for (const name of ['HOURLY_RATE', 'PACKING_HOURLY_RATE']) {
    const m = new RegExp(name + String.raw`[^=]*=\s*\{([^}]*)\}`).exec(src);
    if (!m) throw new Error(`claims-guard: could not read ${name} from src/lib/pricing.ts`);
    for (const n of m[1].matchAll(/:\s*(\d+)/g)) nums.add(n[1]);
  }
  if (nums.size < 3) throw new Error('claims-guard: rate card looks empty; refusing to run a rule that would pass everything');
  return nums;
})();

const hourlyRate = new RegExp(
  String.raw`(?<![–—-]\s?)[$](\d{2,4})\s?(?:[/]\s?(?:hr|hour|год)\b|per hour\b|an hour\b|в час\b|за годину\b)`,
  'gi',
);

const RULES = [
  { id: 'dock-manager-by-name', why: 'Claims personal acquaintance with building staff. Nobody has confirmed this.',
    re: /know[s]?\b[^.\n]{0,60}\bby name/gi },
  { id: 'regular-service', why: 'Claims a move history that no record backs. Describe the building rule instead.',
    re: /part of (?:our|my) regular/gi },
  { id: 'spanish-crew', why: 'Crews and dispatch work in English and Russian. Spanish fluency was never true.',
    re: /fluent in Spanish|hablamos|hablan espa\u00f1ol|Trilingual Crew/gi },
  { id: 'latam-relocations', why: 'Executive relocations from Latin America are not a service that exists.',
    re: /Caracas|Bogot[\u00e1a]|S\u00e3o Paulo|Mexico City/g },
  { id: 'interstate-routes', why: 'Interstate household moves need federal authority the company does not hold.',
    re: /routes we run regularly|dedicated trucks? \(no shared loads\)|we run weekly inbound|\u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043d\u043e \u0432\u043e\u0437\u0438\u043c|\u0432\u0441\u0442\u0440\u0435\u0447\u0430\u0435\u043c \u043a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440\u044b/gi },
  { id: 'out-of-state-offer', why: 'Offers out-of-state moves. In-Florida long-distance is fine; crossing a state line is not.',
    re: /anywhere in Florida or out of state|out of state \u2014 by custom|long-distance nationwide/gi },
  { id: 'international-service', why: 'International moving is not a service. Miami International Airport is fine; these are not.',
    re: /international-moving|International (?:Moving|& Overseas|and Overseas)|international (?:relocation|inbound|shipping|transport)|\u041c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u044b\u0435 \u043f\u0435\u0440\u0435\u0435\u0437\u0434\u044b/gi },
  { id: 'customs-freight', why: 'Customs and ocean freight coordination is not a service the company performs.',
    re: /customs|freight forwarder|NVOCC|FMC-licensed/gi },
  { id: 'stale-hours', why: 'Hours are Mon-Fri 9:00-19:00 and Sat-Sun 10:00-18:00. Import from src/lib/data/hours.ts.',
    re: /Mon ?[\u2013-] ?Sat|Monday ?[\u2013-] ?Saturday|Monday (?:through|to) Saturday|Mo-Sa|08:00-19:00|8:00 ?[AP]M ?[\u2013-] ?7:00 ?PM|8 ?am ?[\u2013-] ?7 ?pm|\u041f\u043d[\u2013-]\u0421\u0431|8:00 ?[\u2013\u2014-] ?19:00/gi },
  // Only the boast is a problem. "e.g. Steinway grand piano" in a form placeholder
  // asks the customer what they own; "We've handled Steelcase" asserts a history.
  { id: 'brand-name-drops', why: 'Asserts having handled a named make. Use the category, not the brand.',
    re: /(?:moved|handled|relocated|familiar)[^.]{0,90}(?:Steinway|Bösendorfer|Herman Miller|Steelcase|Knoll\b|Teknion)/gi },
  // Added 2026-09-18. Each was run against the tree that shipped the defect first:
  // `git stash && npm run test:claims` must name the exact file:line it fixed.
  { id: 'rate-per-mover', why: 'Turns a crew rate into a per-mover rate: "$129 per hour each" reads as $258/hr. The rate covers the crew and its truck.',
    re: /(?:per hour|an hour|\/hour|\/hr|\u0432 \u0447\u0430\u0441|\u0437\u0430 \u0447\u0430\u0441|\/\u0433\u043e\u0434|\u0437\u0430 \u0433\u043e\u0434\u0438\u043d\u0443)[\s,;]*(?:each|per mover|per person|apiece|\u043a\u0430\u0436\u0434\u044b\u0439|\u0441 \u043a\u0430\u0436\u0434\u043e\u0433\u043e|\u0437\u0430 \u043a\u0430\u0436\u0434\u043e\u0433\u043e|\u043a\u043e\u0436\u0435\u043d)\b/gi },

  { id: 'weekend-surcharge', why: 'There is no weekend or seasonal surcharge (owner confirmed 2026-09-18). A percentage beside a weekend word is the old, wrong answer.',
    re: /(?:\u043d\u0430\u0434\u0431\u0430\u0432\u043a\w*|\u0434\u043e\u043f\u043b\u0430\u0442\w*|\u043d\u0430\u0446\u0435\u043d\u043a\w*)[^.\n]{0,40}\d{1,2}\s?%|\d{1,2}\s?%[^.\n]{0,25}(?:\u043a \u043f\u043e\u0447\u0430\u0441\u043e\u0432\u043e\u0439|\u043a \u0441\u0442\u0430\u0432\u043a\u0435)|(?:our|we charge|we add)[^.\n]{0,30}(?:weekend|seasonal)[^.\n]{0,25}\d{1,2}\s?%/gi },

  { id: 'hardcoded-rating', why: 'Ratings and review counts come from src/lib/data/credentials.ts. A hand-typed copy goes stale the day a review lands, and one already had.',
    re: /\b[0-5][.,]\d\s*(?:\u2605|\/\s?5\b|on (?:Google|Thumbtack))|(?:Google|Thumbtack)[^\n]{0,35}?(?<!at least )(?<!more than )(?<!fewer than )(?<!over )(?<!under )\b\d{1,4}\s+(?:verified\s+)?(?:reviews?|\u043e\u0442\u0437\u044b\u0432\w*|\u0432\u0456\u0434\u0433\u0443\u043a\w*)|(?<!at least )(?<!more than )(?<!over )\b\d{1,4}\s+(?:verified\s+)?(?:Google|Thumbtack)\s+(?:reviews?|\u043e\u0442\u0437\u044b\u0432\w*)/gi },

  { id: 'climate-controlled-owned', why: 'Climate control is not ours (owner, 2026-09-18) - we book it with a third party. Write "we arrange/book", never "our" or "every facility we use".',
    re: /(?:facilit\w+ we use|we own|our (?:own )?(?:facilit\w+|warehouse)|we (?:offer|provide|run|deliver to a))[^.\n]{0,50}climate|climate-controlled[^.\n]{0,25}(?:\(standard\)|: included)/gi },

  { id: 'interstate-pricing', why: 'The interstate quote engine was deleted 2026-09-18 - it priced a service the company refuses. Do not reintroduce a US-wide table, a linehaul model or a long-distance floor.',
    re: /LD_MINIMUM|estimateLongDistance|STATE_CENTROIDS|LD_CITY_COORDS|LD_RATE_PER_MILE|'AL',\s*'AK',\s*'AZ'/g },

  { id: 'contradicts-payment-policy', why: 'Payment is collected on site 45-60 min BEFORE the crew finishes, never "upon completion" and never in advance. Import POLICY_COPY from src/lib/data/policies.ts.',
    re: /payment is due (?:upon|on) completion|(?<!nothing is )(?<!no deposit is )due up front|payable in advance|\u043e\u043f\u043b\u0430\u0442\u0430 \u043f\u043e \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0438/gi },

  { id: 'contradicts-cancellation-policy', why: 'Free cancellation more than 48h out, and no fee inside it. Import POLICY_COPY from src/lib/data/policies.ts.',
    re: /cancellation fees? (?:may|will|can) apply|cancellation (?:fee|charge) of|\u0448\u0442\u0440\u0430\u0444 \u0437\u0430 \u043e\u0442\u043c\u0435\u043d\u0443 \u0441\u043e\u0441\u0442\u0430\u0432/gi },

  { id: 'hand-written-canonical', why: 'canonical and hreflang come from alternatesFor() in src/lib/seo/routes.ts. Typing either by hand is how nine Russian pages ended up with a canonical and no language cluster.',
    re: /canonical:\s*[`'"]|languages:\s*\{|'x-default'/g },

  { id: 'tel-format', why: 'Every tel: href is tel:+17863051844. A bare ten-digit number is ambiguous outside the US, and 26 files disagreed with 19 on the same button. Use telHref() from src/lib/data/contact.ts.',
    re: /tel:(?![$][{])(?!\+17863051844)[^"'`\s)]+/g },

  { id: 'foreign-phone', why: 'One phone number exists: 786-305-1844. Another US-shaped number in copy is a typo or somebody else. Add it to ALLOW if it is deliberate.',
    re: /(?<!786[-.])\b(?!786[-.]305[-.]1844)(?!800[-.])(?!\d{3}[-.]000[-.]0000)\d{3}[-.]\d{3}[-.]\d{4}\b/g },

  { id: 'undeclared-rate', why: 'An hourly dollar figure that is not on the rate card in src/lib/pricing.ts. This is how a rate change reaches the prose: the build fails and names every stale sentence. A template could not do that - "$129 per hour each" and "$229/hr" both survive token substitution untouched.',
    // Skips the upper bound of a range ("$99-$149/hour"), which is honest market
    // context about other movers, not a claim about ours.
    re: hourlyRate, check: (m) => !RATE_CARD.has(m[1]) },

  { id: 'crew-composition-ratio', why: 'A ratio of the crew that speaks a language is a perishable statistic nobody can evidence - it changes when one person leaves, and it was published in 15 places plus a directory paste block. Say that Ukrainian-speaking movers are on the crew and can be assigned on request.',
    re: /\u043a\u043e\u0436\u0435\u043d \u0442\u0440\u0435\u0442\u0456\u0439|\u043a\u0430\u0436\u0434\u044b\u0439 \u0442\u0440\u0435\u0442\u0438\u0439|\u0442\u0440\u0435\u0442\u0438\u043d\u0430 (?:\u0432\u0430\u043d\u0442\u0430\u0436\u043d\u0438\u043a|\u043a\u043e\u043c\u0430\u043d\u0434)|one in three (?:movers|crew)|a third of (?:the |our )?(?:crew|movers)/gi },

  { id: 'stale-brand', why: 'The entity is Easy Move Florida. Other spellings split it in the knowledge graph.',
    re: /EasyMove Elite/g },
];

function* walk(p) {
  let st;
  try { st = statSync(p); } catch { return; }
  if (st.isFile()) { if (EXT.test(p)) yield p; return; }
  for (const name of readdirSync(p)) {
    if (SKIP_DIRS.has(name)) continue;
    yield* walk(join(p, name));
  }
}

const hits = [];
for (const target of SCAN) {
  for (const file of walk(join(ROOT, target))) {
    const text = readFileSync(file, 'utf8');
    const lines = text.split(/\r?\n/);
    for (const rule of RULES) {
      lines.forEach((line, i) => {
        rule.re.lastIndex = 0;
        for (const m of line.matchAll(rule.re)) {
          if (ALLOW.some((a) => line.includes(a))) continue;
          const rel = relative(ROOT, file).split(sep).join('/');
          if (RULE_EXEMPT.get(rule.id)?.includes(rel)) continue;
          if (rule.check && !rule.check(m)) continue;
          hits.push({ rule, file: relative(ROOT, file).split(sep).join('/'), line: i + 1, text: m[0] });
        }
      });
    }
  }
}

if (hits.length === 0) {
  console.log('claims-guard: clean');
  process.exit(0);
}

const byRule = new Map();
for (const h of hits) {
  if (!byRule.has(h.rule.id)) byRule.set(h.rule.id, { why: h.rule.why, items: [] });
  byRule.get(h.rule.id).items.push(h);
}
console.error(`claims-guard: ${hits.length} unverified claim(s) in ${new Set(hits.map((h) => h.file)).size} file(s)\n`);
for (const [id, { why, items }] of byRule) {
  console.error(`  ${id} — ${why}`);
  for (const h of items.slice(0, 8)) console.error(`    ${h.file}:${h.line}  "${h.text}"`);
  if (items.length > 8) console.error(`    ... and ${items.length - 8} more`);
  console.error('');
}
process.exit(1);
