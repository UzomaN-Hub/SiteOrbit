"use client";

import { useSyncExternalStore } from "react";

import {
  THEME_CHANGE_EVENT,
  readThemePreference,
  setThemePreference,
  type ThemePreference,
} from "@/lib/theme";

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The saved theme preference ("system" until the visitor picks one). */
export function useTheme(): {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
} {
  const preference = useSyncExternalStore(subscribe, readThemePreference, () => "system" as const);
  return { preference, setPreference: setThemePreference };
}
