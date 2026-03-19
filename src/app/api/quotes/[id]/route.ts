import { NextRequest, NextResponse } from 'next/server';
import { readOneQuote, updateQuote, deleteQuote } from '@/lib/data/quotes';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const quote = readOneQuote(params.id);
  if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(quote);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const patch = await req.json();
  const updated = updateQuote(params.id, patch);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const ok = deleteQuote(params.id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
