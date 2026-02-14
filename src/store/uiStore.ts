import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isLoginModalOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isLoginModalOpen: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
