import { create } from 'zustand';

interface AuthState {
  user: { email: string } | null;
  setUser: (user: { email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));``