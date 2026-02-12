import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthResult, UserDto } from '@ub-lms/shared-types';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserDto | null;
  isAuthenticated: boolean;
  login: (result: AuthResult) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      login: (result: AuthResult) =>
        set({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user: result.user,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    { name: 'ub-lms-auth' }
  )
);
