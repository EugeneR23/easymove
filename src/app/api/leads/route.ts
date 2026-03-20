import { NextRequest, NextResponse } from 'next/server';
import { readAllLeads, createLead } from '@/lib/data/leads';
import { generateId } from '@/lib/utils';
import { sendEmail, sendTelegram, sendSMS } from '@/lib/notify';
import type { Lead } from '@/types';

export async function GET() {
  return NextResponse.json(readAllLeads());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lead: Lead = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'new',
      source: body.source ?? 'contact-form',
      firstName: body.firstName ?? '',
      lastName: body.lastName ?? '',
      email: body.email ?? '',
      phone: body.phone ?? '',
      message: body.message ?? '',
      moveType: body.moveType,
      moveDate: body.moveDate,
      fromCity: body.fromCity,
      toCity: body.toCity,
      adminNotes: '',
      assignedTo: '',
    };
    createLead(lead);

    // Build notifications
    const name    = [lead.firstName, lead.lastName].filter(Boolean).join(' ') || 'Unknown';
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

    const tg = `🔥 <b>NEW LEAD</b>\n👤 <b>${name}</b>\n📞 <b>${lead.phone || '—'}</b>\n📧 ${lead.email || '—'}${lead.moveType ? '\n📦 ' + lead.moveType : ''}${lead.fromCity || lead.toCity ? '\n📍 ' + (lead.fromCity || '?') + ' → ' + (lead.toCity || '?') : ''}${lead.message ? '\n💬 ' + lead.message.slice(0, 100) : ''}\n\n⚡ Call: 786-305-1844`;

    // All notifications are fire-and-forget — failures are logged but never block lead capture
    sendTelegram(tg).catch((err) => console.error('[api/leads] Telegram failed:', err));
    sendSMS(
      lead.phone,
      'Thanks for contacting EasyMove Elite. We received your request and will reach out shortly with your confirmed quote. Reply STOP to opt out.',
    ).catch((err) => console.error('[api/leads] SMS failed:', err));
    sendEmail(subject, html).catch((err) => console.error('[api/leads] Email failed:', err));

    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    console.error('[api/leads] Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
