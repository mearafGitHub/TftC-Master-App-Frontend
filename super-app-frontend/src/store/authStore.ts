import create from 'zustand';
import { persist } from 'zustand/middleware'; // For persisting state to localStorage

interface User {
  userId: string;
  email: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // Name of the item in localStorage
      onRehydrateStorage: () => (state) => { // Optional: check token validity on rehydration
        if (state?.token) state.isAuthenticated = true; // Basic rehydration
      }
    }
  )
);