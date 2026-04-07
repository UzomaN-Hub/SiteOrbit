"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/navigation/sidebar";
import Topbar from "@/components/navigation/topbar";
import { pageReveal } from "@/lib/motion";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
     
      <Sidebar />

      <SidebarInset className="min-h-screen bg-[#0b1020] text-[#dee2f5]">
        <Topbar />

        <motion.main
          variants={pageReveal}
          initial="hidden"
          animate="visible"
          className="w-full px-4 py-6 md:px-6 lg:px-8"
        >
          {children}
        </motion.main>
      </SidebarInset>
    </SidebarProvider>
  );
}