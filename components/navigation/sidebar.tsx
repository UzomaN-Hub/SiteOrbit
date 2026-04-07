"use client";

import Link from "next/link";
import { HelpCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useWorkspace } from "@/hooks/use-workspace";
import { appNavigation, type AppNavigationItem } from "@/lib/constants/navigation";
import { easeBezier } from "@/lib/motion";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import WorkspaceSwitcher from "@/components/navigation/workspace-switcher";

export default function Sidebar() {
  const pathname = usePathname();
  const { activeWorkspace } = useWorkspace();

  const workspaceName = activeWorkspace?.workspace.name ?? "Main Workspace";

  return (
    <UISidebar className="border-r border-white/6 bg-[#0f1420]">
      <SidebarHeader className="border-b border-white/6 px-4 py-5">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.38, ease: easeBezier }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.06, rotate: -6 }}
            className="flex size-11 items-center justify-center rounded-2xl bg-[#172c29] text-[#4fdbc8]"
          >
            <span className="font-heading text-lg font-black">S</span>
          </motion.div>

          <div className="min-w-0">
            <h1 className="truncate font-heading text-lg font-black tracking-tight text-[#4fdbc8]">
              SiteOrbit Pro
            </h1>
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              {workspaceName}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.06, ease: easeBezier }}
          className="mt-4 px-2"
        >
          <WorkspaceSwitcher />
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu className="gap-1">
          {appNavigation.map((item: AppNavigationItem, index: number) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.28,
                  delay: 0.03 * index,
                  ease: easeBezier,
                }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className={
                      isActive
                        ? "rounded-md bg-gradient-to-r from-[#4fdbc8] to-[#14b8a6] text-white shadow-[0_0_10px_rgba(79,219,200,0.2)] hover:text-white"
                        : "rounded-md text-slate-400 hover:bg-[#1a1f2d] hover:text-white"
                    }
                  >
                    <Link href={item.href}>
                      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                        <Icon className="size-4" />
                        <span className="font-body text-sm font-medium">
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </motion.div>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4 pb-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.12, ease: easeBezier }}
          className="mb-4 rounded-xl bg-[#161b29] px-4 py-4"
        >
          <div className="mb-2 flex justify-between text-[11px]">
            <span className="font-medium text-[#bbcac6]">Plan Usage</span>
            <span className="font-bold text-[#4fdbc8]">65%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#303443]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 0.8, delay: 0.18, ease: easeBezier }}
              className="h-full rounded-full bg-[#4fdbc8]"
            />
          </div>
          <p className="mt-2 text-[10px] text-slate-500">12 of 20 sites active</p>
        </motion.div>

        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Support"
              className="rounded-md text-slate-400 hover:bg-[#1a1f2d] hover:text-white"
            >
              <HelpCircle className="size-4" />
              <span className="font-body text-sm font-medium">Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="rounded-md text-slate-400 hover:bg-[#1a1f2d] hover:text-white"
            >
              <LogOut className="size-4" />
              <span className="font-body text-sm font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </UISidebar>
  );
}