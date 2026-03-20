import { NextRequest, NextResponse } from 'next/server';
import { readAllQuotes, createQuote } from '@/lib/data/quotes';
import { calculatePricing, estimateDistance } from '@/lib/pricing';
import { generateId } from '@/lib/utils';
import { sendEmail, sendTelegram, sendSMS, tgEscape } from '@/lib/notify';
import type { Quote } from '@/types';

export async function GET() {
  const quotes = readAllQuotes();
  return NextResponse.json(quotes);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const estimatedDistance = estimateDistance(body.fromState, body.toState);
    const pricing = calculatePricing({
      moveType: body.moveType,
      estimatedDistance,
      inventory: body.inventory,
      addons: body.addons,
    });

    const quote: Quote = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending',
      moveType: body.moveType,
      fromAddress: body.fromAddress ?? '',
      fromCity: body.fromCity ?? '',
      fromState: body.fromState ?? '',
      fromZip: body.fromZip ?? '',
      toAddress: body.toAddress ?? '',
      toCity: body.toCity ?? '',
      toState: body.toState ?? '',
      toZip: body.toZip ?? '',
      estimatedDistance,
      inventory: body.inventory,
      addons: body.addons,
      preferredDate: body.preferredDate ?? '',
      flexibleDates: body.flexibleDates ?? false,
      firstName: body.firstName ?? '',
      lastName: body.lastName ?? '',
      email: body.email ?? '',
      phone: body.phone ?? '',
      pricing,
      adminNotes: body.notes ? `Customer note: ${body.notes}` : '',
      assignedTo: '',
    };

    try {
      createQuote(quote);
      console.log('[api/quotes] Quote saved:', quote.id);
    } catch (writeErr) {
      console.error('[api/quotes] Storage write failed — continuing with notifications:', writeErr);
    }

    // Build notifications — never block the response
    const name    = `${quote.firstName} ${quote.lastName}`.trim() || 'Unknown';
    const subject = `🔥 New Quote — ${name} · ${quote.fromCity || '?'} → ${quote.toCity || '?'} · $${quote.pricing.total}`;

    // Build add-ons list
    const addonsList: string[] = [];
    if (quote.addons.packingService)    addonsList.push('Packing');
    if (quote.addons.furnitureAssembly) addonsList.push('Furniture disassembly');
    if (quote.addons.storageMonths > 0) addonsList.push(`Storage (${quote.addons.storageMonths} mo)`);
    if (quote.addons.autoTransport)     addonsList.push('Auto transport');
    if (quote.addons.artHandling)       addonsList.push('Art/antique handling');
    if (quote.addons.climateControlled) addonsList.push('Packing materials requested');

    // Build access notes
    const accessNotes: string[] = [];
    if (quote.inventory.hasStairs)      accessNotes.push(`Stairs (${quote.inventory.stairsFlights} flight${quote.inventory.stairsFlights !== 1 ? 's' : ''})`);
    if (quote.inventory.hasElevator)    accessNotes.push('Elevator');
    if (quote.inventory.isHighRise)     accessNotes.push('High-rise');
    if (quote.inventory.needsCOI)       accessNotes.push('COI required');

    const row = (label: string, value: string | number | boolean) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap;vertical-align:top"><b>${label}</b></td><td style="padding:6px 0;color:#111">${value}</td></tr>`;

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

    const tg = `🔥 <b>NEW QUOTE</b>\n👤 <b>${tgEscape(name)}</b>\n📞 <b>${tgEscape(quote.phone) || '—'}</b>\n📧 ${tgEscape(quote.email) || '—'}\n\n📦 ${tgEscape(quote.moveType)} · ${tgEscape(quote.inventory.homeSize)}\n📍 ${tgEscape(quote.fromCity) || '?'} → ${tgEscape(quote.toCity) || '?'}\n📅 ${tgEscape(quote.preferredDate) || 'Flexible'}\n💰 <b>~$${quote.pricing.total}</b>${body.notes ? `\n\n📝 <i>${tgEscape(body.notes)}</i>` : ''}\n\n⚡ Call: 786-305-1844`;

    // All notifications are fire-and-forget — failures are logged but never block quote capture
    sendTelegram(tg).catch((err) => console.error('[api/quotes] Telegram failed:', err));
    sendSMS(
      quote.phone,
      'Thanks for contacting EasyMove Elite. We received your request and will reach out shortly with your confirmed quote. Reply STOP to opt out.',
    ).catch((err) => console.error('[api/quotes] SMS failed:', err));
    sendEmail(subject, html).catch((err) => console.error('[api/quotes] Email failed:', err));

    return NextResponse.json(quote, { status: 201 });
  } catch (err) {
    console.error('[api/quotes] Unexpected error:', err);
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}
