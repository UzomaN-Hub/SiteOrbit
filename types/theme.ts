export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
};

export type ThemeTypography = {
  heading_font: string;
  body_font: string;
  base_size: string;
};

export type ThemeSpacing = {
  section_gap: string;
  container_width: string;
};

export type ThemeRadius = {
  card: string;
  button: string;
  input: string;
};

export type Theme = {
  id: string;
  workspace_id: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  created_at: string;
  updated_at: string;
};

export type ThemeUpdateInput = {
  colors?: ThemeColors;
  typography?: ThemeTypography;
  spacing?: ThemeSpacing;
  radius?: ThemeRadius;
};