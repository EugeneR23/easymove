import { NextRequest, NextResponse } from 'next/server';
import { sendSMS, sendEmail } from '@/lib/notify';

const REVIEW_URL = process.env.GOOGLE_REVIEW_URL ?? '';

/**
 * Trigger a post-move review request via SMS, email, or both.
 *
 * Recommended timing: 3 days after move completion. Sterling Sky's "18-day rule"
 * shows GBP rankings cliff when no new reviews are received in 21+ days.
 *
 * Body: { phone?, email?, name?, channel?: 'sms'|'email'|'both', moveCity?, moveType? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      phone?: string;
      email?: string;
      name?: string;
      channel?: 'sms' | 'email' | 'both';
      moveCity?: string;
      moveType?: string;
    };

    const channel = body.channel ?? (body.email && body.phone ? 'both' : body.email ? 'email' : 'sms');

    if (!body.phone && !body.email) {
      return NextResponse.json({ error: 'Phone or email required' }, { status: 400 });
    }
    if (!REVIEW_URL) {
      console.warn('[review-request] GOOGLE_REVIEW_URL not set');
      return NextResponse.json({ error: 'Review URL not configured' }, { status: 500 });
    }

    const firstName = (body.name ?? '').split(' ')[0] || 'there';
    const moveContext = body.moveCity
      ? ` your move${body.moveType ? ` (${body.moveType})` : ''} in ${body.moveCity}`
      : ' your move';

    const results: Record<string, boolean | string> = {};

    if ((channel === 'sms' || channel === 'both') && body.phone) {
      const smsBody =
        `Hi ${firstName}! It was a pleasure handling${moveContext}. ` +
        `If you have 30 seconds, an honest Google review means everything to a small business like ours:\n${REVIEW_URL}\n` +
        `— Evgenii, Easy Move Florida\nReply STOP to opt out.`;
      try {
        await sendSMS(body.phone, smsBody);
        results.sms = true;
      } catch (e) {
        results.sms = (e as Error).message;
      }
    }

    if ((channel === 'email' || channel === 'both') && body.email) {
      const subject = `Quick favor, ${firstName}? — A Google review for Easy Move Florida`;
      const html = `
        <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:540px;margin:0 auto;color:#1C1C1E;">
          <p>Hi ${firstName},</p>
          <p>Thanks again for trusting us with${moveContext}. It was a pleasure to work with you.</p>
          <p>If you have 30 seconds, an honest Google review means everything to a small, founder-led business like ours. New clients read these before booking — your words help more than you'd think.</p>
          <p style="text-align:center;margin:32px 0;">
            <a href="${REVIEW_URL}" style="background:#C9A84C;color:#fff;padding:14px 28px;text-decoration:none;font-weight:bold;letter-spacing:1px;text-transform:uppercase;font-size:13px;">
              Leave a Google Review
            </a>
          </p>
          <p>Even one or two sentences is more than enough.</p>
          <p>If anything didn't meet your expectations, please reply to this email first — I'd rather hear from you directly and make it right.</p>
          <p>— Evgenii Romanov<br/>Owner, Easy Move Florida<br/>786-305-1844</p>
        </div>
      `;
      try {
        await sendEmail(subject, html, body.email);
        results.email = true;
      } catch (e) {
        results.email = (e as Error).message;
      }
    }

    console.log(`[review-request] Sent to name=${body.name} phone=${body.phone} email=${body.email} channel=${channel}`, results);
    return NextResponse.json({ ok: true, results });
  } catch (err) {
    console.error('[review-request] Error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
