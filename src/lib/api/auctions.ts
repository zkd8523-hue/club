import { Auction } from '@/types/club';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getAuctions(): Promise<Auction[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auctions`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch auctions');
    return res.json();
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
}

export async function placeBid(auctionId: number, bidAmount: number): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auctions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auctionId, bidAmount }),
    });
    if (!res.ok) throw new Error('Failed to place bid');
    return res.json();
  } catch (error) {
    console.error('Error placing bid:', error);
    return { success: false, message: '입찰에 실패했습니다.' };
  }
}
