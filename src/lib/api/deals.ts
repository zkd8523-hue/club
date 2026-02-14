import { HotDeal } from '@/types/club';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getHotDeals(): Promise<HotDeal[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/hot-deals`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch hot deals');
    return res.json();
  } catch (error) {
    console.error('Error fetching hot deals:', error);
    return [];
  }
}
