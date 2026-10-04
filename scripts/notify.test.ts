/**
 * sendSMS must never let "skipped" and "sent" produce the same answer.
 *
 * Written against the code that shipped the bug: sendSMS returned void and
 * never threw, so all three call sites did `status === 'fulfilled'` and got
 * true whether Twilio delivered the message, skipped it for missing config, or
 * failed inside the API. Production has no TWILIO_* variables at all, so every
 * lead, every quote and every review request had been reporting a delivered SMS
 * for a message that was never sent.
 *
 * Run: npx tsx scripts/notify.test.ts
 */
import { readFileSync } from 'node:fs';
import { sendSMS } from '../src/lib/notify';

let failed = 0;
function check(name: string, cond: boolean, actual: unknown) {
  if (cond) console.log(`  PASS  ${name}`);
  else { console.error(`  FAIL  ${name} — got: ${JSON.stringify(actual)}`); failed++; }
}

async function main() {
  // ── 1. sendSMS says why nothing went out ──────────────────────────────────
  console.log('\n[1] sendSMS reports why nothing was sent');
  for (const k of ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER']) {
    delete process.env[k];
  }

  const unconfigured = await sendSMS('+17865551234', 'test');
  check('missing credentials -> sent: false', unconfigured.sent === false, unconfigured);
  check('and names the reason',
    !unconfigured.sent && unconfigured.reason === 'not-configured', unconfigured);

  process.env.TWILIO_ACCOUNT_SID  = 'ACtest';
  process.env.TWILIO_AUTH_TOKEN   = 'token';
  process.env.TWILIO_PHONE_NUMBER = '+17869779993';

  const noRecipient = await sendSMS('', 'test');
  check('no recipient -> its own reason',
    noRecipient.sent === false && noRecipient.reason === 'no-recipient', noRecipient);

  // Fake credentials make the SDK reject. That must come back reported, not
  // thrown, and above all not as a success.
  const badCreds = await sendSMS('+17865551234', 'test');
  check('rejected by Twilio -> sent: false, reason failed',
    badCreds.sent === false && badCreds.reason === 'failed', badCreds);

  // ── 2. No caller equates "the promise settled" with "it was delivered" ────
  console.log('\n[2] Call sites read delivery, not promise state');
  for (const f of ['src/app/api/leads/route.ts', 'src/app/api/quotes/route.ts']) {
    const src = readFileSync(f, 'utf8');
    check(`${f} does not equate fulfilled with sent`,
      !/status\.sms\s*=\s*smsResult\.status\s*===\s*'fulfilled'\s*;/.test(src),
      src.match(/status\.sms\s*=.*/)?.[0]);
    check(`${f} reads .value.sent`,
      src.includes('smsResult.value.sent'),
      src.match(/status\.sms\s*=.*/)?.[0]);
  }

  const review = readFileSync('src/app/api/review-request/route.ts', 'utf8');
  check('review-request no longer sets results.sms = true unconditionally',
    !/await sendSMS\([^)]*\);\s*\n\s*results\.sms = true;/.test(review),
    review.match(/results\.sms\s*=.*/g));
  check('review-request reports the reason instead',
    review.includes('smsResult.sent ? true :'),
    review.match(/results\.sms\s*=.*/g));

  // Lead and quote records carry customers' names, phones and emails. Until
  // 2026-10-04 every GET, PATCH and DELETE on them was open to anyone, and the
  // admin cookie was unsigned base64 JSON that anyone could forge.
  console.log('\n[guard] lead and quote data needs an admin session');
  const unguarded: string[] = [];
  for (const f of [
    'src/app/api/leads/route.ts', 'src/app/api/leads/[id]/route.ts',
    'src/app/api/quotes/route.ts', 'src/app/api/quotes/[id]/route.ts',
  ]) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/export async function (GET|PATCH|DELETE)\b[^{]*\{([\s\S]*?)\n\}/g)) {
      if (!m[2].includes('unauthorizedUnlessAdmin()')) unguarded.push(`${f} ${m[1]}`);
    }
  }
  check('every GET/PATCH/DELETE on leads and quotes checks the admin session',
    unguarded.length === 0, unguarded);
  const auth = readFileSync('src/lib/auth.ts', 'utf8');
  check('the admin session cookie is verified with an HMAC, not just decoded',
    auth.includes('timingSafeEqual(') && auth.includes("createHmac('sha256'"), null);
  // Returning before cookies() when no key exists at build time made Next.js
  // prerender /admin as a static redirect (caught on a local build 2026-10-04).
  const body = auth.slice(auth.indexOf('export function getSession('));
  const firstReturn = body.indexOf('return ');
  const cookieRead = body.indexOf('cookies().get(');
  check('getSession reads cookies() before any early return',
    cookieRead > -1 && firstReturn > -1 && cookieRead < firstReturn, { cookieRead, firstReturn });

  console.log(failed === 0 ? '\nALL PASS' : `\n${failed} FAILURE(S)`);
  process.exit(failed ? 1 : 0);
}

main();
