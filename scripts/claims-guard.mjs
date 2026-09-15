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
const EXT = /\.(tsx?|jsx?|mjs|json|md|txt)$/;

/** Exact substrings that are confirmed true. Add only with a line in CLAIMS_TO_CONFIRM.md. */
const ALLOW = [
  // A comment recording why the old brand name was removed. Keeping the note is
  // the point: it stops someone re-adding the alternateName in good faith.
  '"EasyMove Elite" removed: it named an entity that does not exist in the',
];

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
    re: /(?:moved|handled|relocated|familiar)[^.]{0,90}(?:Steinway|Bösendorfer|Herman Miller|Steelcase|Knoll|Teknion)/gi },
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
