export type ProjectStatus = "draft" | "published" | "archived";

export type Project = {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
};

export type ProjectListResponse = {
  items: Project[];
};

export type CreateProjectInput = {
  workspace_id: string;
  name: string;
  description?: string | null;
  status?: ProjectStatus;
};

export type UpdateProjectInput = {
  name?: string;
  description?: string | null;
  status?: ProjectStatus;
};

export type ProjectPublishResponse = {
  id: string;
  status: ProjectStatus;
  message: string;
};