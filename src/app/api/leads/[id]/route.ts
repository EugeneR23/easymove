import { NextRequest, NextResponse } from 'next/server';
import { unauthorizedUnlessAdmin } from '@/lib/auth';
import { readOneLead, updateLead, deleteLead } from '@/lib/data/leads';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const denied = unauthorizedUnlessAdmin();
  if (denied) return denied;
  const lead = readOneLead(params.id);
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(lead);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const denied = unauthorizedUnlessAdmin();
  if (denied) return denied;
  const patch = await req.json();
  const updated = updateLead(params.id, patch);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const denied = unauthorizedUnlessAdmin();
  if (denied) return denied;
  const ok = deleteLead(params.id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
