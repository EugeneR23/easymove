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
import { sendSMS, sendEmail, sendTelegram } from '../src/lib/notify';
import { sendToAirtable } from '../src/lib/airtable';

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

  // ── 3. An unconfigured channel must not count as delivered ───────────────
  // Until 2026-10-11 sendEmail, sendTelegram and sendToAirtable returned early on
  // missing config; Promise.allSettled called that "fulfilled", and a lead that
  // reached nobody was logged as delivered while the customer saw "received".
  console.log('\n[3] Unconfigured channels reject');
  for (const k of ['RESEND_API_KEY', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID', 'AIRTABLE_API_KEY', 'AIRTABLE_BASE_ID']) {
    delete process.env[k];
  }
  const settled = await Promise.allSettled([
    sendEmail('t', '<p>t</p>'),
    sendTelegram('t'),
    sendToAirtable({ Name: 't' }),
  ]);
  check('sendEmail without RESEND_API_KEY rejects', settled[0].status === 'rejected', settled[0].status);
  check('sendTelegram without token rejects', settled[1].status === 'rejected', settled[1].status);
  check('sendToAirtable without key rejects', settled[2].status === 'rejected', settled[2].status);

  // ── 4. Public lead routes are protected and honest ───────────────────────
  console.log('\n[4] Public lead routes: rate limit, honeypot, contact, no silent loss');
  for (const f of ['src/app/api/leads/route.ts', 'src/app/api/quotes/route.ts']) {
    const src = readFileSync(f, 'utf8');
    check(`${f} rate-limits`, /rateLimited\(req,/.test(src), null);
    check(`${f} drops honeypot hits`, src.includes('isHoneypotFilled(body)'), null);
    check(`${f} refuses a lead with no phone or email`, src.includes('hasContact(body)'), null);
    check(`${f} answers 502 when no channel delivered`,
      /!status\.airtable && !status\.telegram && !status\.email[\s\S]{0,400}status: 502/.test(src), null);
  }
  const reviewSrc = readFileSync('src/app/api/review-request/route.ts', 'utf8');
  const reviewPost = reviewSrc.slice(reviewSrc.indexOf('export async function POST'));
  check('review-request POST needs an admin session (it sends SMS/email in our name)',
    reviewPost.slice(0, 400).includes('unauthorizedUnlessAdmin()'), null);

  // ── 5. The customer confirmation never pretends ──────────────────────────
  console.log('\n[5] Customer confirmation reports why it did not send');
  const { sendCustomerConfirmation } = await import('../src/lib/customerEmail');
  const noAddr = await sendCustomerConfirmation('', { locale: 'en', firstName: 'T', ref: 'x' });
  check('no email -> no-recipient', !noAddr.sent && noAddr.reason === 'no-recipient', noAddr);
  process.env.RESEND_API_KEY = 're_test';
  delete process.env.RESEND_FROM;
  const unverified = await sendCustomerConfirmation('a@b.co', { locale: 'ru', firstName: 'T', ref: 'x' });
  check('onboarding sender -> sender-not-verified, not a send attempt',
    !unverified.sent && unverified.reason === 'sender-not-verified', unverified);

  console.log(failed === 0 ? '\nALL PASS' : `\n${failed} FAILURE(S)`);
  process.exit(failed ? 1 : 0);
}

main();
