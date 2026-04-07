"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  AUTH_STORAGE_KEY,
  clearAuthCookie,
  setAuthCookie,
  syncAuthCookieFromStorage,
} from "@/lib/auth/session";
import type { AuthUser } from "@/types/auth";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setSession: (payload: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }) => void;
  updateTokens: (payload: { accessToken: string; refreshToken: string }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setSession: ({ user, accessToken, refreshToken }) => {
        setAuthCookie(accessToken);

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      updateTokens: ({ accessToken, refreshToken }) => {
        setAuthCookie(accessToken);

        set((state) => ({
          ...state,
          accessToken,
          refreshToken,
          isAuthenticated: Boolean(state.user),
        }));
      },

      clearSession: () => {
        clearAuthCookie();

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      
      storage: createJSONStorage(() => sessionStorage), 
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => () => {
        syncAuthCookieFromStorage();
      },
    }
  )
);