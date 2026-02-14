import { NextResponse } from 'next/server';

const AUCTIONS_DATA = [
  {
    id: 1,
    clubName: 'Club RACE',
    itemName: 'VIP Stage Table (Premium Selection)',
    startPrice: 500000,
    currentBid: 720000,
    increment: 10000,
    bidders: 15,
    expiresIn: 1800,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac40895481?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    clubName: 'Jack Livin',
    itemName: 'DJ Booth Side Bottle Service',
    startPrice: 300000,
    currentBid: 455000,
    increment: 5000,
    bidders: 8,
    expiresIn: 3600,
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop',
  }
];

export async function GET() {
  return NextResponse.json(AUCTIONS_DATA);
}

export async function POST(request: Request) {
  const { auctionId, bidAmount } = await request.json();

  return NextResponse.json({
    success: true,
    newBid: bidAmount,
    auctionId,
    message: '입찰이 완료되었습니다.',
  });
}
