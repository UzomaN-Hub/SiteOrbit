import type { WorkspaceRole } from "@/types/workspace";

export const roleOptions: WorkspaceRole[] = ["owner", "admin", "editor", "viewer"];

export const roleDescriptions: Record<WorkspaceRole, string> = {
  owner: "Full control, including billing and deleting the workspace.",
  admin: "Manages the team, domains and settings.",
  editor: "Creates, edits and publishes sites.",
  viewer: "Can look at sites and analytics but not change them.",
};
