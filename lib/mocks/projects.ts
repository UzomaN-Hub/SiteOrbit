import type { Project, ProjectStatus } from "@/types/project";

export const projectListMock: Project[] = [
  {
    id: "project-1",
    workspace_id: "local-workspace",
    name: "Spring Launch",
    description: "Main campaign landing page for Q2 acquisition.",
    status: "published" satisfies ProjectStatus,
    created_at: "2026-03-12T09:00:00.000Z",
    updated_at: "2026-03-29T10:30:00.000Z",
  },
  {
    id: "project-2",
    workspace_id: "local-workspace",
    name: "Partner Program",
    description: "Lead capture page for affiliate and partner signups.",
    status: "draft" satisfies ProjectStatus,
    created_at: "2026-03-20T11:00:00.000Z",
    updated_at: "2026-03-28T15:45:00.000Z",
  },
  {
    id: "project-3",
    workspace_id: "local-workspace",
    name: "Changelog Microsite",
    description: "Product updates and release notes experience.",
    status: "archived" satisfies ProjectStatus,
    created_at: "2026-02-18T08:15:00.000Z",
    updated_at: "2026-03-22T09:10:00.000Z",
  },
  {
    id: "project-4",
    workspace_id: "local-workspace",
    name: "Black Friday Waitlist",
    description: "Pre-launch waitlist funnel with segmented signup steps.",
    status: "draft" satisfies ProjectStatus,
    created_at: "2026-03-25T12:00:00.000Z",
    updated_at: "2026-03-29T08:20:00.000Z",
  },
  {
    id: "project-5",
    workspace_id: "local-workspace",
    name: "Docs Refresh",
    description: "Documentation landing pages and onboarding hub.",
    status: "published" satisfies ProjectStatus,
    created_at: "2026-01-30T07:30:00.000Z",
    updated_at: "2026-03-27T16:40:00.000Z",
  },
];