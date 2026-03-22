import { NextRequest, NextResponse } from 'next/server';
import { sendSMS } from '@/lib/notify';

const REVIEW_URL = process.env.GOOGLE_REVIEW_URL ?? '';

export async function POST(req: NextRequest) {
  try {
    const { phone, name } = await req.json() as { phone?: string; name?: string };

    if (!phone) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
    }

    if (!REVIEW_URL) {
      console.warn('[review-request] GOOGLE_REVIEW_URL not set');
      return NextResponse.json({ error: 'Review URL not configured' }, { status: 500 });
    }

    const firstName = (name ?? '').split(' ')[0] || 'there';

    const message =
      `Hi ${firstName}! It was a pleasure handling your move. If you have a moment, an honest review would mean a lot to us:\n${REVIEW_URL}\n— Eugene, EasyMove Elite\nReply STOP to opt out.`;

    await sendSMS(phone, message);
    console.log(`[review-request] Sent to ${phone}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[review-request] Error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
