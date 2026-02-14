import { Club } from '@/types/club';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function getClubs(): Promise<Club[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/clubs`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch clubs');
    return res.json();
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return [];
  }
}

export async function getClubById(id: string | number): Promise<Club | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/clubs/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching club:', error);
    return null;
  }
}
