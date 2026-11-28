/**
 * Light and dark mode without a library. The visitor's choice lives in
 * localStorage; with no choice we follow the system setting. The resolved
 * theme is written to <html data-theme>, which globals.css reads.
 */
export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "siteorbit-theme";
export const THEME_CHANGE_EVENT = "siteorbit-theme-change";

const LIGHT_QUERY = "(prefers-color-scheme: light)";

export function readThemePreference(): ThemePreference {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

export function applyTheme(preference = readThemePreference()) {
  const resolved =
    preference === "system"
      ? window.matchMedia(LIGHT_QUERY).matches
        ? "light"
        : "dark"
      : preference;
  document.documentElement.dataset.theme = resolved;
}

export function setThemePreference(preference: ThemePreference) {
  try {
    if (preference === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Storage blocked: the theme still applies for this page view.
  }
  applyTheme(preference);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

/**
 * Runs in <head> before the first paint so there's no flash of the wrong
 * theme, and keeps following the system setting when no choice is saved.
 */
export const themeScript = `(function(){try{var d=document.documentElement,m=window.matchMedia(${JSON.stringify(
  LIGHT_QUERY
)});function a(){var p=null;try{p=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)})}catch(e){}d.dataset.theme=p==="light"||p==="dark"?p:m.matches?"light":"dark"}a();m.addEventListener("change",a);window.addEventListener("storage",a)}catch(e){}})();`;
