export type WorkspaceRole = "owner" | "admin" | "editor" | "viewer";

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  plan: string;
  description?: string | null;
  primary_domain?: string | null;
  created_at: string;
  updated_at: string;
};

export type WorkspaceWithRole = {
  workspace: Workspace;
  role: WorkspaceRole | string;
};

export type WorkspaceCreateInput = {
  name: string;
};

export type WorkspaceUpdateInput = {
  name?: string;
  description?: string | null;
  primary_domain?: string | null;
  logo?: string | null;
};

export type WorkspaceMember = {
  id: string;
  user_id: string;
  workspace_id: string;
  name: string;
  email: string;
  role: WorkspaceRole | string;
  status: string;
  avatar: string | null;
};