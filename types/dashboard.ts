export type DashboardStat = {
  label: string;
  value: string;
  helper: string;
  tone: string;
};

export type DashboardProjectItem = {
  id: string;
  name: string;
  status: string;
  metric: string;
};

export type DashboardMemberItem = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export type DashboardOverviewResponse = {
  stats: DashboardStat[];
  activity: string[];
  projects: DashboardProjectItem[];
  members: DashboardMemberItem[];
};