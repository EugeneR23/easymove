import { NextRequest, NextResponse } from 'next/server';
import { unauthorizedUnlessAdmin } from '@/lib/auth';
import { readAllLeads, createLead } from '@/lib/data/leads';
import { generateId } from '@/lib/utils';
import { sendEmail, sendTelegram, sendSMS, tgEscape, ownerEmailEnabled } from '@/lib/notify';
import { sendToAirtable, normalizeSource } from '@/lib/airtable';
import { rateLimited, isHoneypotFilled, hasContact } from '@/lib/leadGuard';
import { sendCustomerConfirmation, confirmationNote, customerLocale } from '@/lib/customerEmail';
import type { HomeSize, Lead, LeadSource, MoveType } from '@/types';

const LEAD_SOURCES = ['contact-form', 'quote-wizard', 'phone', 'referral', 'popup', 'callback', 'quick-form'] as const satisfies readonly LeadSource[];
// Deliberately narrower than pricing's MOVE_TYPES: the lead forms have no
// packing-only option. `satisfies` still fails the build if a name drifts.
const MOVE_TYPES = ['local', 'long-distance', 'office', 'specialty'] as const satisfies readonly MoveType[];
const HOME_SIZES = ['studio', '1br', '2br', '3br', '4br+', 'office'] as const satisfies readonly HomeSize[];

/** What the owner sees first in Telegram and the email subject. */
const SOURCE_LABEL: Record<LeadSource, string> = {
  'contact-form': 'NEW LEAD — contact form',
  'quote-wizard': 'NEW LEAD — quote wizard',
  'phone':        'NEW LEAD — phone',
  'referral':     'NEW LEAD — referral',
  'popup':        'CALLBACK REQUEST — exit popup',
  'callback':     'CALLBACK REQUEST',
  'quick-form':   'NEW LEAD — quick quote form',
};

function pick<T extends string>(list: readonly T[], raw: unknown): T | undefined {
  return typeof raw === 'string' ? list.find((s) => s === raw) : undefined;
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export async function GET() {
  const denied = unauthorizedUnlessAdmin();
  if (denied) return denied;
  return NextResponse.json(readAllLeads());
}

export async function POST(req: NextRequest) {
  const startedAt = Date.now();
  console.log('[api/leads] POST received');

  if (rateLimited(req, 'leads')) {
    return NextResponse.json(
      { error: 'Too many requests. Please call or WhatsApp 786-305-1844.' },
      { status: 429 },
    );
  }

  const status = {
    endpoint:      '/api/leads',
    leadSaved:     false,
    airtable:      false,
    email:         false,
    telegram:      false,
    sms:           false,
    customerEmail: false,
  };

  try {
    // ── 1. Parse and screen ────────────────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      console.error('[api/leads] Failed to parse request body');
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (isHoneypotFilled(body)) {
      // Answer like a success so the bot learns nothing; deliver nothing.
      console.warn('[api/leads] Honeypot filled — dropped as spam');
      return NextResponse.json({ id: generateId() }, { status: 201 });
    }

    if (!hasContact(body)) {
      return NextResponse.json(
        { error: 'Please leave a phone number or an email so we can reach you.' },
        { status: 400 },
      );
    }

    // ── 2. Build lead object ───────────────────────────────────────────────────
    const locale = customerLocale(body.locale);
    const lead: Lead = {
      id:         generateId(),
      createdAt:  new Date().toISOString(),
      updatedAt:  new Date().toISOString(),
      status:     'new',
      source:     pick(LEAD_SOURCES, body.source) ?? 'contact-form',
      firstName:  str(body.firstName),
      lastName:   str(body.lastName),
      email:      str(body.email),
      phone:      str(body.phone),
      message:    str(body.message),
      moveType:   pick(MOVE_TYPES, body.moveType),
      moveDate:   str(body.moveDate) || undefined,
      fromCity:   str(body.fromCity) || undefined,
      toCity:     str(body.toCity) || undefined,
      homeSize:   pick(HOME_SIZES, body.homeSize),
      locale,
      adminNotes: '',
      assignedTo: '',
    };

    const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Unknown';
    const headline = SOURCE_LABEL[lead.source] + (locale !== 'en' ? ` (${locale.toUpperCase()})` : '');
    console.log(`[api/leads] Lead built: id=${lead.id} source=${lead.source} locale=${locale}`);

    // ── 3. Local /tmp storage (best-effort cache — not primary, never blocks) ─
    try {
      createLead(lead);
      status.leadSaved = true;
    } catch (writeErr) {
      console.error('[api/leads] Local storage write failed (non-fatal):', writeErr);
    }

    // ── 4. Customer confirmation first, so the owner's alert can say whether
    //       the customer heard back.
    const confirmation = await sendCustomerConfirmation(lead.email, {
      locale, firstName: lead.firstName, ref: lead.id,
    });
    status.customerEmail = confirmation.sent;
    const confirmationLine = confirmationNote(confirmation);

    // ── 5. Owner notification content ─────────────────────────────────────────
    const subject = `🔥 ${headline} — ${name}${lead.phone ? ' · ' + lead.phone : ''}`;

    const row = (label: string, value: string) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top"><b>${label}</b></td><td style="padding:6px 0;color:#111">${value}</td></tr>`;
    const h = (v: string | undefined) => tgEscape(v ?? '');

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px">
        <div style="background:#111;color:#fff;padding:16px 20px;border-left:4px solid #d4a017">
          <p style="margin:0;font-size:18px;font-weight:bold">🔥 ${h(headline)}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#aaa">Respond quickly — the site promises a reply within 2 working hours</p>
        </div>
        <div style="padding:20px;background:#fff;border:1px solid #e5e5e5;border-top:none">
          <table style="border-collapse:collapse;font-size:14px;width:100%">
            ${row('Name', `<span style="font-size:16px;font-weight:bold;color:#d4a017">${h(name)}</span>`)}
            ${row('Phone', `<a href="tel:${h(lead.phone)}" style="font-size:16px;font-weight:bold;color:#0066cc">${h(lead.phone) || '—'}</a>`)}
            ${row('Email', h(lead.email) || '—')}
            ${row('Language', locale.toUpperCase())}
            ${lead.moveType ? row('Move type', h(lead.moveType)) : ''}
            ${lead.homeSize ? row('Home size', h(lead.homeSize)) : ''}
            ${lead.fromCity ? row('From', h(lead.fromCity)) : ''}
            ${lead.toCity   ? row('To', h(lead.toCity)) : ''}
            ${lead.moveDate ? row('Date', h(lead.moveDate)) : ''}
            ${row('Auto-reply', h(confirmationLine))}
          </table>
          ${lead.message ? `<p style="margin:16px 0 0;font-size:14px;color:#333;background:#f9f9f9;padding:12px;border-left:3px solid #d4a017">${h(lead.message)}</p>` : ''}
          <p style="margin:16px 0 0;font-size:12px;color:#666">Ref: ${lead.id} · ${new Date(lead.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
        </div>
      </div>
    `;

    const tg = [
      `🔥 <b>${h(headline)}</b>`,
      `👤 <b>${h(name)}</b>`,
      `📞 <b>${h(lead.phone) || '—'}</b>`,
      `📧 ${h(lead.email) || '—'}`,
      lead.moveType ? `📦 ${h(lead.moveType)}${lead.homeSize ? ' · ' + h(lead.homeSize) : ''}` : lead.homeSize ? `📦 ${h(lead.homeSize)}` : '',
      lead.fromCity || lead.toCity ? `📍 ${h(lead.fromCity) || '?'} → ${h(lead.toCity) || '?'}` : '',
      lead.moveDate ? `📅 ${h(lead.moveDate)}` : '',
      lead.message ? `💬 ${h(lead.message).slice(0, 200)}` : '',
      `✉️ ${h(confirmationLine)}`,
    ].filter(Boolean).join('\n');

    // ── 6. Airtable (primary) + notifications in parallel ─────────────────────
    const noteTag = `[${lead.source}${locale !== 'en' ? ' ' + locale : ''}${lead.homeSize ? ' ' + lead.homeSize : ''}]`;
    const [airtableResult, tgResult, smsResult, emailResult] = await Promise.allSettled([
      sendToAirtable({
        'Created At':   new Date(lead.createdAt).toISOString().split('T')[0],
        'Ref ID':       lead.id,
        'Source':       normalizeSource(lead.source),
        'Status':       'New',
        'Name':         name,
        'Phone':        lead.phone    || '',
        'Email':        lead.email    || '',
        'Move Type':    lead.moveType ?? '',
        'From City':    lead.fromCity ?? '',
        'To City':      lead.toCity   ?? '',
        'Notes':        [noteTag, lead.message].filter(Boolean).join(' '),
        ...(lead.moveDate ? { 'Job Date': lead.moveDate } : {}),
        'Completed':    false,
        'Deposit Paid': false,
      }),
      sendTelegram(tg),
      sendSMS(
        lead.phone,
        'Thanks for contacting Easy Move Florida. We received your request and will reach out shortly with your confirmed quote. Reply STOP to opt out.',
      ),
      // Owner chose Telegram only (2026-10-11); 'skipped' is not a delivery.
      ownerEmailEnabled() ? sendEmail(subject, html) : Promise.resolve('skipped' as const),
    ]);

    status.airtable = airtableResult.status === 'fulfilled';
    status.telegram = tgResult.status       === 'fulfilled';
    // sendSMS never throws, so a fulfilled promise says nothing about delivery.
    status.sms      = smsResult.status === 'fulfilled' && smsResult.value.sent;
    const emailSkipped = emailResult.status === 'fulfilled' && emailResult.value === 'skipped';
    status.email    = emailResult.status    === 'fulfilled' && !emailSkipped;

    if (!status.airtable) console.error('[api/leads] Airtable FAILED:', (airtableResult as PromiseRejectedResult).reason);
    if (!status.telegram) console.error('[api/leads] Telegram FAILED:', (tgResult as PromiseRejectedResult).reason);
    if (!status.email && !emailSkipped)    console.error('[api/leads] Email FAILED:', (emailResult as PromiseRejectedResult).reason);
    if (!status.sms) {
      const why = smsResult.status === 'fulfilled' ? smsResult.value : (smsResult as PromiseRejectedResult).reason;
      console.warn('[api/leads] SMS not sent:', why);
    }
    console.log(`[api/leads] DELIVERY (${Date.now() - startedAt}ms):`, JSON.stringify(status));

    // A lead that reached no one is a lost customer who was told "received".
    // Say so, so the form can show the phone number instead.
    if (!status.airtable && !status.telegram && !status.email) {
      console.error('[api/leads] Lead reached NO channel:', lead.id);
      return NextResponse.json(
        { error: 'We could not deliver your request. Please call or WhatsApp 786-305-1844.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ id: lead.id, customerEmail: status.customerEmail }, { status: 201 });
  } catch (err) {
    console.error('[api/leads] Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to create lead. Please call 786-305-1844.' }, { status: 500 });
  }
}
