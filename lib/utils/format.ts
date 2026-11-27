export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** "3 minutes ago", "yesterday", "12 Mar 2026" for anything older than 30 days. */
export function formatRelative(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSeconds);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (abs < 45) return "just now";
  if (abs < 3600) return rtf.format(Math.round(diffSeconds / 60), "minute");
  if (abs < 86_400) return rtf.format(Math.round(diffSeconds / 3600), "hour");
  if (abs < 30 * 86_400) return rtf.format(Math.round(diffSeconds / 86_400), "day");
  return formatDate(date);
}

/** Only allow same-origin paths as post-auth redirects (no open redirects). */
export function safeRedirect(value: string | null | undefined, fallback = "/dashboard") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }
  return value;
}
