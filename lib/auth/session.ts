"use client";

export const AUTH_STORAGE_KEY = "siteorbit-auth";
const ACCESS_COOKIE_NAME = "siteorbit_access_token";

function isBrowser() {
  return typeof window !== "undefined";
}

export function setAuthCookie(accessToken: string) {
  if (!isBrowser()) return;

  document.cookie = `${ACCESS_COOKIE_NAME}=${encodeURIComponent(
    accessToken
  )}; path=/; SameSite=Lax`;
}

export function clearAuthCookie() {
  if (!isBrowser()) return;

  document.cookie = `${ACCESS_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function syncAuthCookieFromStorage() {
  if (!isBrowser()) return;

  try {
    // The auth store persists to sessionStorage (store/auth-store.ts), so read
    // from the same place. Reading localStorage here cleared the cookie on
    // every page load and bounced signed-in users back to sign-in.
    const raw = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      clearAuthCookie();
      return;
    }

    const parsed = JSON.parse(raw) as {
      state?: {
        accessToken?: string | null;
      };
    };

    const accessToken = parsed?.state?.accessToken;
    if (accessToken) {
      setAuthCookie(accessToken);
      return;
    }

    clearAuthCookie();
  } catch {
    clearAuthCookie();
  }
}