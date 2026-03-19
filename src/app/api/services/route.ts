import { NextResponse } from 'next/server';
import { readAllServices } from '@/lib/data/services';

export async function GET() {
  return NextResponse.json(readAllServices());
}
