import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'clubbnb_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (clubId: number) => {
    setFavorites(prev =>
      prev.includes(clubId)
        ? prev.filter(id => id !== clubId)
        : [...prev, clubId]
    );
  };

  const isFavorite = (clubId: number) => favorites.includes(clubId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoriteCount: favorites.length
  };
}
