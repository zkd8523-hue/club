import { NextResponse } from 'next/server';
import { clubs } from '@/data/clubs';

export async function GET() {
  return NextResponse.json(clubs);
}
