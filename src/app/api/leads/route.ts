import { NextRequest, NextResponse } from 'next/server';
import { readAllLeads, createLead } from '@/lib/data/leads';
import { generateId } from '@/lib/utils';
import { sendEmail, sendTelegram, sendSMS, tgEscape } from '@/lib/notify';
import { sendToAirtable, normalizeSource } from '@/lib/airtable';
import type { Lead, LeadSource, MoveType } from '@/types';

const LEAD_SOURCES = ['contact-form', 'quote-wizard', 'phone', 'referral'] as const satisfies readonly LeadSource[];
const MOVE_TYPES = ['local', 'long-distance', 'international', 'office', 'specialty'] as const satisfies readonly MoveType[];

function parseLeadSource(raw: unknown): LeadSource {
  if (typeof raw === 'string') {
    const match = LEAD_SOURCES.find((s) => s === raw);
    if (match) return match;
  }
  return 'contact-form';
}

function parseMoveType(raw: unknown): MoveType | undefined {
  if (typeof raw === 'string') {
    const match = MOVE_TYPES.find((s) => s === raw);
    if (match) return match;
  }
  return undefined;
}

export async function GET() {
  return NextResponse.json(readAllLeads());
}

export async function POST(req: NextRequest) {
  const startedAt = Date.now();
  console.log('[api/leads] POST received');

  const status = {
    endpoint:  '/api/leads',
    leadSaved: false,
    airtable:  false,
    email:     false,
    telegram:  false,
    sms:       false,
  };

  try {
    // ── 1. Parse body ──────────────────────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      console.error('[api/leads] Failed to parse request body');
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    console.log('[api/leads] Payload received:', JSON.stringify({
      source:    body.source,
      firstName: body.firstName,
      phone:     body.phone,
      email:     body.email,
      moveType:  body.moveType,
      fromCity:  body.fromCity,
      toCity:    body.toCity,
    }));

    // ── 2. Build lead object ───────────────────────────────────────────────────
    const lead: Lead = {
      id:         generateId(),
      createdAt:  new Date().toISOString(),
      updatedAt:  new Date().toISOString(),
      status:     'new',
      source:     parseLeadSource(body.source),
      firstName:  (body.firstName as string) ?? '',
      lastName:   (body.lastName  as string) ?? '',
      email:      (body.email     as string) ?? '',
      phone:      (body.phone     as string) ?? '',
      message:    (body.message   as string) ?? '',
      moveType:   parseMoveType(body.moveType),
      moveDate:   body.moveDate as string | undefined,
      fromCity:   body.fromCity as string | undefined,
      toCity:     body.toCity   as string | undefined,
      adminNotes: '',
      assignedTo: '',
    };

    const name = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Unknown';
    console.log(`[api/leads] Lead built: id=${lead.id} name="${name}"`);

    // ── 3. Local /tmp storage (best-effort cache — not primary, never blocks) ─
    try {
      createLead(lead);
      status.leadSaved = true;
      console.log('[api/leads] Local storage write OK:', lead.id);
    } catch (writeErr) {
      console.error('[api/leads] Local storage write failed (non-fatal):', writeErr);
    }

    // ── 4. Build notification strings ─────────────────────────────────────────
    const subject = `🔥 New Lead — ${name}${lead.phone ? ' · ' + lead.phone : ''}`;

    const row = (label: string, value: string) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top"><b>${label}</b></td><td style="padding:6px 0;color:#111">${value}</td></tr>`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px">
        <div style="background:#111;color:#fff;padding:16px 20px;border-left:4px solid #d4a017">
          <p style="margin:0;font-size:18px;font-weight:bold">🔥 NEW HIGH-INTENT LEAD</p>
          <p style="margin:4px 0 0;font-size:13px;color:#aaa">Contact form submission — respond quickly</p>
        </div>

        <div style="padding:20px;background:#fff;border:1px solid #e5e5e5;border-top:none">

          <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#111">📋 Contact</p>
          <table style="border-collapse:collapse;font-size:14px;width:100%">
            ${row('Name', `<span style="font-size:16px;font-weight:bold;color:#d4a017">${name}</span>`)}
            ${row('Phone', `<a href="tel:${lead.phone}" style="font-size:16px;font-weight:bold;color:#0066cc">${lead.phone || '—'}</a>`)}
            ${row('Email', lead.email || '—')}
          </table>

          ${(lead.moveType || lead.moveDate || lead.fromCity || lead.toCity) ? `
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
          <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#111">🚚 Move Info</p>
          <table style="border-collapse:collapse;font-size:14px;width:100%">
            ${lead.moveType ? row('Move type', lead.moveType) : ''}
            ${lead.fromCity ? row('From', lead.fromCity) : ''}
            ${lead.toCity   ? row('To', lead.toCity) : ''}
            ${lead.moveDate ? row('Date', lead.moveDate) : ''}
          </table>
          ` : ''}

          ${lead.message ? `
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
          <p style="margin:0 0 8px;font-size:15px;font-weight:bold;color:#111">💬 Message</p>
          <p style="margin:0;font-size:14px;color:#333;background:#f9f9f9;padding:12px;border-left:3px solid #d4a017">${lead.message}</p>
          ` : ''}

          <div style="background:#f5f5f5;border-left:4px solid #d4a017;padding:14px 16px;margin-top:20px">
            <p style="margin:0;font-size:15px;font-weight:bold;color:#111">⚡ ACTION: Call immediately → <a href="tel:7863051844" style="color:#0066cc">786-305-1844</a></p>
            <p style="margin:4px 0 0;font-size:12px;color:#666">Ref: ${lead.id} · Submitted: ${new Date(lead.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
          </div>
        </div>
      </div>
    `;

    const tg = `🔥 <b>NEW LEAD</b>\n👤 <b>${tgEscape(name)}</b>\n📞 <b>${tgEscape(lead.phone) || '—'}</b>\n📧 ${tgEscape(lead.email) || '—'}${lead.moveType ? '\n📦 ' + tgEscape(lead.moveType) : ''}${lead.fromCity || lead.toCity ? '\n📍 ' + (tgEscape(lead.fromCity) || '?') + ' → ' + (tgEscape(lead.toCity) || '?') : ''}${lead.message ? '\n💬 ' + tgEscape(lead.message).slice(0, 100) : ''}\n\n⚡ Call: 786-305-1844`;

    // ── 5. Airtable (primary) + all notifications in parallel ─────────────────
    // Running in parallel ensures Telegram/email fire even if Airtable fails.
    // Airtable failure still returns 500 — but only after notifications are sent.
    console.log('[api/leads] Writing to Airtable + sending notifications in parallel...');

    const [airtableResult, tgResult, smsResult, emailResult] = await Promise.allSettled([
      sendToAirtable({
        'Created At':   lead.createdAt,
        'Ref ID':       lead.id,
        'Source':       normalizeSource(lead.source),
        'Status':       'New',
        'Name':         name,
        'Phone':        lead.phone    || '',
        'Email':        lead.email    || '',
        'Move Type':    lead.moveType ?? '',
        'From City':    lead.fromCity ?? '',
        'To City':      lead.toCity   ?? '',
        'Notes':        lead.message  || '',
        'Completed':    false,
        'Deposit Paid': false,
      }),
      sendTelegram(tg),
      sendSMS(
        lead.phone,
        'Thanks for contacting EasyMove Elite. We received your request and will reach out shortly with your confirmed quote. Reply STOP to opt out.',
      ),
      sendEmail(subject, html),
    ]);

    status.airtable = airtableResult.status === 'fulfilled';
    status.telegram = tgResult.status       === 'fulfilled';
    status.sms      = smsResult.status      === 'fulfilled';
    status.email    = emailResult.status    === 'fulfilled';

    if (!status.airtable) console.error('[api/leads] Airtable FAILED:', (airtableResult as PromiseRejectedResult).reason);
    else                  console.log('[api/leads] Airtable OK');

    if (!status.telegram) console.error('[api/leads] Telegram failed:', (tgResult as PromiseRejectedResult).reason);
    else                  console.log('[api/leads] Telegram OK');

    if (!status.sms)      console.error('[api/leads] SMS failed:', (smsResult as PromiseRejectedResult).reason);
    else                  console.log('[api/leads] SMS OK');

    if (!status.email)    console.error('[api/leads] Email failed:', (emailResult as PromiseRejectedResult).reason);
    else                  console.log('[api/leads] Email OK');

    // ── 6. Final debug summary ────────────────────────────────────────────────
    console.log(`[api/leads] DEBUG STATUS (${Date.now() - startedAt}ms):`, JSON.stringify(status));

    // Return 500 if Airtable (primary save) failed — but notifications already sent above
    if (!status.airtable) {
      return NextResponse.json(
        { error: 'Lead could not be saved. Please call 786-305-1844 directly.' },
        { status: 500 },
      );
    }

    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    console.error('[api/leads] Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
