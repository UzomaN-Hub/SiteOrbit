export type BuilderViewport = "desktop" | "tablet" | "mobile";
export type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "error";

export type BuilderBlockType = "hero" | "text" | "features" | "cta";

export type BuilderBlockProps = {
  title?: string;
  subtitle?: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
  items?: string[];
};

export type BuilderBlock = {
  id: string;
  type: BuilderBlockType;
  props: BuilderBlockProps;
};

export type BuilderPageLayout = {
  blocks: BuilderBlock[];
};

export type BuilderPageRecord = {
  id: string;
  site_id: string;
  title: string;
  path: string;
  layout_json: string | null;
  created_at: string;
  updated_at: string;
};

export type BuilderPageListResponse = {
  items: BuilderPageRecord[];
};

export type BuilderPageCreateInput = {
  site_id: string;
  title: string;
  path: string;
  layout_json?: string | null;
};

export type BuilderPageUpdateInput = {
  title?: string;
  path?: string;
  layout_json?: string | null;
};