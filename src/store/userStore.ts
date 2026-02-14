import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'partner';
  membershipTier?: 'standard' | 'gold' | 'elite';
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateMembership: (tier: User['membershipTier']) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      updateMembership: (tier) => set((state) => ({
        user: state.user ? { ...state.user, membershipTier: tier } : null
      })),
    }),
    {
      name: 'clubbnb-user-storage',
    }
  )
);
