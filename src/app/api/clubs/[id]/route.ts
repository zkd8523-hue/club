import { NextResponse } from 'next/server';
import { getClub } from '@/data/clubs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const club = getClub(id);

  if (!club) {
    return NextResponse.json(
      { error: 'Club not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(club);
}
