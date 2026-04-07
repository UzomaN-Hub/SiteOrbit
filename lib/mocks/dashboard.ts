import type {
  DashboardMemberItem,
  DashboardOverviewResponse,
  DashboardProjectItem,
  DashboardStat,
} from "@/types/dashboard";
import type { WorkspaceRole } from "@/types/workspace";

export const dashboardStatCardsMock: DashboardStat[] = [
  {
    label: "Projects Active",
    value: "12",
    helper: "3 in draft",
    tone: "teal",
  },
  {
    label: "Workspace Members",
    value: "8",
    helper: "Current active collaborators",
    tone: "blue",
  },
  {
    label: "Published Projects",
    value: "9",
    helper: "Live project surfaces",
    tone: "teal",
  },
];

export const dashboardActivityMock: string[] = [
  "Spring Launch was updated recently.",
  "Maya is active in this workspace.",
  "3 project(s) still need publishing.",
];

export const dashboardProjectsMock: DashboardProjectItem[] = [
  {
    id: "project-spring-launch",
    name: "Spring Launch",
    status: "Published",
    metric: "Updated 2026-03-30",
  },
  {
    id: "project-black-friday",
    name: "Black Friday Waitlist",
    status: "Draft",
    metric: "Updated 2026-03-28",
  },
  {
    id: "project-partner-program",
    name: "Partner Program",
    status: "Draft",
    metric: "Updated 2026-03-25",
  },
];

export const dashboardMembersMock: DashboardMemberItem[] = [
  {
    id: "member-owner",
    name: "Alex Rivera",
    email: "alex@siteorbit.app",
    role: "owner" satisfies WorkspaceRole,
    status: "active",
  },
  {
    id: "member-editor",
    name: "Maya Chen",
    email: "maya@siteorbit.app",
    role: "editor" satisfies WorkspaceRole,
    status: "active",
  },
];

export const dashboardOverviewMock: DashboardOverviewResponse = {
  stats: dashboardStatCardsMock,
  activity: dashboardActivityMock,
  projects: dashboardProjectsMock,
  members: dashboardMembersMock,
};