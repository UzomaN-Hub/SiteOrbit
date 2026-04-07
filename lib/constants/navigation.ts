import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  Wand2,
  Globe,
} from "lucide-react";

export type AppNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const appNavigation: AppNavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Builder", href: "/builder", icon: Wand2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Team", href: "/team", icon: Users },
  { label: "Domains", href: "/domains", icon: Globe },
  { label: "Settings", href: "/settings", icon: Settings },
];