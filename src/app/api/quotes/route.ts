import { NextRequest, NextResponse } from 'next/server';
import { readAllQuotes, createQuote } from '@/lib/data/quotes';
import { calculatePricing, estimateDistance } from '@/lib/pricing';
import { generateId } from '@/lib/utils';
import { sendEmail, sendTelegram, sendSMS, tgEscape } from '@/lib/notify';
import { sendToAirtable } from '@/lib/airtable';
import type { Quote, MoveType } from '@/types';

const MOVE_TYPES = ['local', 'long-distance', 'international', 'office', 'specialty'] as const satisfies readonly MoveType[];

function parseMoveType(raw: unknown): MoveType {
  if (typeof raw === 'string') {
    const match = MOVE_TYPES.find((s) => s === raw);
    if (match) return match;
  }
  return 'local';
}

export async function GET() {
  const quotes = readAllQuotes();
  return NextResponse.json(quotes);
}

export async function POST(req: NextRequest) {
  const startedAt = Date.now();
  console.log('[api/quotes] POST received');

  // Delivery status for debug log
  const status = {
    endpoint:   '/api/quotes',
    leadSaved:  false,
    airtable:   false,
    email:      false,
    telegram:   false,
    sms:        false,
  };

  try {
    // ── 1. Parse body ──────────────────────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      console.error('[api/quotes] Failed to parse request body');
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    console.log('[api/quotes] Payload received:', JSON.stringify({
      moveType:  body.moveType,
      homeSize:  (body.inventory as Record<string, unknown>)?.homeSize,
      fromCity:  body.fromCity,
      toCity:    body.toCity,
      firstName: body.firstName,
      phone:     body.phone,
      email:     body.email,
    }));

    // ── 2. Build quote object ──────────────────────────────────────────────────
    const estimatedDistance = estimateDistance(
      body.fromState as string,
      body.toState   as string,
    );
    const moveType = parseMoveType(body.moveType);
    const pricing = calculatePricing({
      moveType,
      estimatedDistance,
      inventory:         body.inventory         as QuoteInventory,
      addons:            body.addons            as QuoteAddons,
    });

    const quote: Quote = {
      id:          generateId(),
      createdAt:   new Date().toISOString(),
      updatedAt:   new Date().toISOString(),
      status:      'pending',
      moveType,
      fromAddress: (body.fromAddress as string) ?? '',
      fromCity:    (body.fromCity   as string) ?? '',
      fromState:   (body.fromState  as string) ?? '',
      fromZip:     (body.fromZip    as string) ?? '',
      toAddress:   (body.toAddress  as string) ?? '',
      toCity:      (body.toCity     as string) ?? '',
      toState:     (body.toState    as string) ?? '',
      toZip:       (body.toZip      as string) ?? '',
      estimatedDistance,
      inventory:       body.inventory       as QuoteInventory,
      addons:          body.addons          as QuoteAddons,
      preferredDate:   (body.preferredDate  as string) ?? '',
      flexibleDates:   (body.flexibleDates  as boolean) ?? false,
      firstName:       (body.firstName      as string) ?? '',
      lastName:        (body.lastName       as string) ?? '',
      email:           (body.email          as string) ?? '',
      phone:           (body.phone          as string) ?? '',
      pricing,
      adminNotes:  body.notes ? `Customer note: ${body.notes}` : '',
      assignedTo:  '',
    };

    const name = `${quote.firstName} ${quote.lastName}`.trim() || 'Unknown';
    console.log(`[api/quotes] Quote built: id=${quote.id} name="${name}" total=$${pricing.total}`);

    // ── 3. Local /tmp storage (best-effort cache — not primary, never blocks) ─
    try {
      createQuote(quote);
      status.leadSaved = true;
      console.log('[api/quotes] Local storage write OK:', quote.id);
    } catch (writeErr) {
      console.error('[api/quotes] Local storage write failed (non-fatal):', writeErr);
    }

    // ── 4. Build notification content ─────────────────────────────────────────
    // (Airtable write and notification sends happen together in step 6 below)
    const addonsList: string[] = [];
    if (quote.addons.packingService)    addonsList.push('Packing');
    if (quote.addons.furnitureAssembly) addonsList.push('Furniture disassembly');
    if (quote.addons.storageMonths > 0) addonsList.push(`Storage (${quote.addons.storageMonths} mo)`);
    if (quote.addons.autoTransport)     addonsList.push('Auto transport');
    if (quote.addons.artHandling)       addonsList.push('Art/antique handling');
    if (quote.addons.climateControlled) addonsList.push('Packing materials requested');

    const accessNotes: string[] = [];
    if (quote.inventory.hasStairs)   accessNotes.push(`Stairs (${quote.inventory.stairsFlights} flight${quote.inventory.stairsFlights !== 1 ? 's' : ''})`);
    if (quote.inventory.hasElevator) accessNotes.push('Elevator');
    if (quote.inventory.isHighRise)  accessNotes.push('High-rise');
    if (quote.inventory.needsCOI)    accessNotes.push('COI required');

    const propertyType = quote.inventory.isHighRise
      ? 'High-Rise'
      : quote.inventory.hasElevator
        ? 'Elevator Building'
        : quote.inventory.hasStairs
          ? 'Walk-Up'
          : 'Standard';

    const floorsStairs = quote.inventory.hasStairs
      ? `${quote.inventory.stairsFlights} flight${quote.inventory.stairsFlights !== 1 ? 's' : ''}`
      : '';

    // ── 5. Build email / Telegram message strings ─────────────────────────────
    const row = (label: string, value: string | number | boolean) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top"><b>${label}</b></td><td style="padding:6px 0;color:#111">${value}</td></tr>`;

    const subject = `🔥 New Quote — ${name} · ${quote.fromCity || '?'} → ${quote.toCity || '?'} · $${quote.pricing.total}`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px">
        <div style="background:#111;color:#fff;padding:16px 20px;border-left:4px solid #d4a017">
          <p style="margin:0;font-size:18px;font-weight:bold">🔥 NEW HIGH-INTENT LEAD</p>
          <p style="margin:4px 0 0;font-size:13px;color:#aaa">Quote submitted — respond within minutes for best conversion</p>
        </div>

        <div style="padding:20px;background:#fff;border:1px solid #e5e5e5;border-top:none">

          <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#111">📋 Contact</p>
          <table style="border-collapse:collapse;font-size:14px;width:100%">
            ${row('Name', `<span style="font-size:16px;font-weight:bold;color:#d4a017">${name}</span>`)}
            ${row('Phone', `<a href="tel:${quote.phone}" style="font-size:16px;font-weight:bold;color:#0066cc">${quote.phone || '—'}</a>`)}
            ${row('Email', quote.email || '—')}
          </table>

          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">

          <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#111">🚚 Move Details</p>
          <table style="border-collapse:collapse;font-size:14px;width:100%">
            ${row('Move type', quote.moveType)}
            ${row('Home size', quote.inventory.homeSize)}
            ${row('Crew', `${quote.pricing.crewSize} movers`)}
            ${row('From', `${quote.fromAddress ? quote.fromAddress + ', ' : ''}${quote.fromCity || '—'}, ${quote.fromState} ${quote.fromZip}`)}
            ${row('To', `${quote.toAddress ? quote.toAddress + ', ' : ''}${quote.toCity || '—'}, ${quote.toState} ${quote.toZip}`)}
            ${row('Distance', `~${quote.estimatedDistance} miles`)}
            ${row('Date', quote.preferredDate || (quote.flexibleDates ? 'Flexible' : '—'))}
          </table>

          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">

          <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#111">📦 Inventory</p>
          <table style="border-collapse:collapse;font-size:14px;width:100%">
            ${row('Est. boxes', quote.inventory.estimatedBoxes)}
            ${row('Special items', quote.inventory.specialItems.length > 0 ? quote.inventory.specialItems.join(', ') : 'None')}
            ${row('Garage', quote.inventory.hasGarage ? 'Yes' : 'No')}
            ${row('Storage unit', quote.inventory.hasStorage ? 'Yes' : 'No')}
            ${row('Access', accessNotes.length > 0 ? accessNotes.join(', ') : 'No issues')}
          </table>

          ${addonsList.length > 0 ? `
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
          <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#111">➕ Add-ons Requested</p>
          <p style="margin:0;font-size:14px;color:#111">${addonsList.join(' · ')}</p>
          ` : ''}

          ${body.notes ? `
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
          <p style="margin:0 0 8px;font-size:15px;font-weight:bold;color:#111">📝 Customer Note</p>
          <p style="margin:0;font-size:14px;color:#333;background:#fffbe6;border-left:4px solid #d4a017;padding:10px 14px">${body.notes}</p>
          ` : ''}

          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">

          <p style="margin:0 0 14px;font-size:15px;font-weight:bold;color:#111">💰 Estimated Price</p>
          <table style="border-collapse:collapse;font-size:14px;width:100%">
            ${row('Labor', `$${quote.pricing.laborRate}`)}
            ${row('Truck fee', `$${quote.pricing.truckFee}`)}
            ${quote.pricing.accessFee > 0 ? row('Access fee', `$${quote.pricing.accessFee}`) : ''}
            ${quote.pricing.addonsFee > 0 ? row('Add-ons fee', `$${quote.pricing.addonsFee}`) : ''}
            ${quote.pricing.discount > 0 ? row('Discount', `-$${quote.pricing.discount}`) : ''}
            ${row('Est. hours', `${quote.pricing.estimatedHours} hrs`)}
            ${row('TOTAL', `<span style="font-size:20px;font-weight:bold;color:#d4a017">$${quote.pricing.total}</span>`)}
          </table>

          <div style="background:#f5f5f5;border-left:4px solid #d4a017;padding:14px 16px;margin-top:20px">
            <p style="margin:0;font-size:15px;font-weight:bold;color:#111">⚡ ACTION: Call immediately → <a href="tel:7863051844" style="color:#0066cc">786-305-1844</a></p>
            <p style="margin:4px 0 0;font-size:12px;color:#666">Ref: ${quote.id} · Submitted: ${new Date(quote.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
          </div>
        </div>
      </div>
    `;

    const tg = `🔥 <b>NEW QUOTE</b>\n👤 <b>${tgEscape(name)}</b>\n📞 <b>${tgEscape(quote.phone) || '—'}</b>\n📧 ${tgEscape(quote.email) || '—'}\n\n📦 ${tgEscape(quote.moveType)} · ${tgEscape(quote.inventory.homeSize)}\n📍 ${tgEscape(quote.fromCity) || '?'} → ${tgEscape(quote.toCity) || '?'}\n📅 ${tgEscape(quote.preferredDate) || 'Flexible'}\n💰 <b>~$${quote.pricing.total}</b>${body.notes ? `\n\n📝 <i>${tgEscape(body.notes as string)}</i>` : ''}\n\n⚡ Call: 786-305-1844`;

    // ── 6. Airtable (primary) + all notifications in parallel ─────────────────
    // Running in parallel ensures Telegram/email fire even if Airtable fails.
    // Airtable failure still returns 500 — but only after notifications are sent.
    console.log('[api/quotes] Writing to Airtable + sending notifications in parallel...');

    const [airtableResult, tgResult, smsResult, emailResult] = await Promise.allSettled([
      sendToAirtable({
        'Created At':      quote.createdAt,
        'Ref ID':          quote.id,
        'Source':          'quote_form',
        'Status':          'New',
        'Name':            name,
        'Phone':           quote.phone    || '',
        'Email':           quote.email    || '',
        'Move Type':       quote.moveType || '',
        'Home Size':       quote.inventory.homeSize || '',
        'From City':       quote.fromCity  || '',
        'To City':         quote.toCity    || '',
        'Property Type':   propertyType,
        'Floors / Stairs': floorsStairs,
        'Add-ons':         addonsList.join(', '),
        'Notes':           (body.notes as string) || '',
        'Estimated Price': quote.pricing.total,
        'Completed':       false,
        'Deposit Paid':    false,
      }),
      sendTelegram(tg),
      sendSMS(
        quote.phone,
        'Thanks for contacting EasyMove Elite. We received your request and will reach out shortly with your confirmed quote. Reply STOP to opt out.',
      ),
      sendEmail(subject, html),
    ]);

    status.airtable = airtableResult.status === 'fulfilled';
    status.telegram = tgResult.status       === 'fulfilled';
    status.sms      = smsResult.status      === 'fulfilled';
    status.email    = emailResult.status    === 'fulfilled';

    if (!status.airtable) console.error('[api/quotes] Airtable FAILED:', (airtableResult as PromiseRejectedResult).reason);
    else                  console.log('[api/quotes] Airtable OK');

    if (!status.telegram) console.error('[api/quotes] Telegram failed:', (tgResult as PromiseRejectedResult).reason);
    else                  console.log('[api/quotes] Telegram OK');

    if (!status.sms)      console.error('[api/quotes] SMS failed:', (smsResult as PromiseRejectedResult).reason);
    else                  console.log('[api/quotes] SMS OK');

    if (!status.email)    console.error('[api/quotes] Email failed:', (emailResult as PromiseRejectedResult).reason);
    else                  console.log('[api/quotes] Email OK');

    // ── 7. Final debug summary ────────────────────────────────────────────────
    console.log(`[api/quotes] DEBUG STATUS (${Date.now() - startedAt}ms):`, JSON.stringify(status));

    // Return 500 if Airtable (primary save) failed — but notifications already sent above
    if (!status.airtable) {
      return NextResponse.json(
        { error: 'Lead could not be saved. Please call 786-305-1844 directly.' },
        { status: 500 },
      );
    }

    return NextResponse.json(quote, { status: 201 });
  } catch (err) {
    console.error('[api/quotes] Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}

// These type aliases avoid an import cycle — they mirror the types file exactly
type QuoteInventory = Quote['inventory'];
type QuoteAddons    = Quote['addons'];
