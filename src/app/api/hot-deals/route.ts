import { NextResponse } from 'next/server';

const HOT_DEALS_DATA = [
  {
    id: 1,
    clubName: 'Club RACE (레이스)',
    image: 'https://images.unsplash.com/photo-1574391884720-bbe37400581a?q=80&w=800&auto=format&fit=crop',
    price: '₩150,000',
    time: '22:00 - 08:00',
    expiresIn: 3600 * 2 + 450,
  },
  {
    id: 2,
    clubName: 'Jack Livin (잭리빈)',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop',
    price: '₩120,000',
    time: '23:00 - 08:00',
    expiresIn: 3600 * 1 + 1200,
  },
  {
    id: 3,
    clubName: 'Club ARTRE (아르떼)',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    price: '₩99,000',
    time: '22:00 - 05:00',
    expiresIn: 3600 * 0 + 2400,
  },
  {
    id: 4,
    clubName: 'Club TIMES (타임즈)',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=800&auto=format&fit=crop',
    price: '₩180,000',
    time: '22:30 - 07:00',
    expiresIn: 3600 * 3 + 150,
  },
  {
    id: 5,
    clubName: 'Club 5 (힙합클럽 5)',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800&auto=format&fit=crop',
    price: '₩140,000',
    time: '22:00 - 06:00',
    expiresIn: 3600 * 1 + 600,
  },
  {
    id: 6,
    clubName: 'Triple Seven (777)',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
    price: '₩110,000',
    time: '21:00 - 05:00',
    expiresIn: 3600 * 0 + 1200,
  }
];

export async function GET() {
  return NextResponse.json(HOT_DEALS_DATA);
}
