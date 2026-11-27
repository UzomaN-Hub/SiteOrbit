/**
 * Defaults for a client's own site theme (Settings → Branding). These are
 * customer content, not SiteOrbit UI colours, which is why this file is the
 * one place outside globals.css allowed to hold hex values (see
 * scripts/design-lint.mjs).
 */
export const brandingDefaults = {
  primary: "#1F4E79",
  secondary: "#E8EEF4",
  accent: "#F2A541",
  background: "#FFFFFF",
  surface: "#F6F7F9",
  heading_font: "Georgia",
  body_font: "system-ui",
  base_size: "16px",
  section_gap: "80px",
  container_width: "1200px",
  card_radius: "12px",
  button_radius: "8px",
  input_radius: "8px",
} as const;
