"use client";

import { Bell, Grid2x2, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import UserMenu from "@/components/navigation/user-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { sectionReveal, staggerFast } from "@/lib/motion";

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/projects")) return "Projects";
  if (pathname.startsWith("/builder")) return "Builder";
  if (pathname.startsWith("/analytics")) return "Analytics";
  if (pathname.startsWith("/team")) return "Team";
  if (pathname.startsWith("/templates")) return "Templates";
  if (pathname.startsWith("/domains")) return "Domains";
  if (pathname.startsWith("/settings")) return "Settings";
  return "SiteOrbit";
}

export default function Topbar() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <motion.header
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-30 flex h-16 items-center justify-between overflow-hidden border-b border-white/6 bg-[#0e1320]/70 px-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:px-8"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_left,rgba(79,219,200,0.12),transparent_68%)]"
        animate={{
          opacity: [0.45, 0.8, 0.5],
          x: [0, 12, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="relative flex items-center gap-4 md:gap-6"
      >
        <motion.div variants={sectionReveal}>
          <SidebarTrigger className="md:hidden" />
        </motion.div>

        <motion.h2
          variants={sectionReveal}
          key={pageTitle}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-2xl font-bold tracking-tighter text-[#dee2f5]"
        >
          {pageTitle}
        </motion.h2>

        <motion.div
          variants={sectionReveal}
          className="relative hidden w-80 lg:block"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
        >
          <InputGroup className="rounded-md border border-white/6 bg-[#090e1b]/92 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
            <InputGroupAddon>
              <motion.div
                animate={{ rotate: [0, 8, -6, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Search className="size-4 text-[#859490]" />
              </motion.div>
            </InputGroupAddon>
            <InputGroupInput
              placeholder={`Search ${pageTitle.toLowerCase()}...`}
              className="bg-transparent text-sm text-[#dee2f5] placeholder:text-[#859490]"
            />
          </InputGroup>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="relative flex items-center gap-4"
      >
        <motion.button
          variants={sectionReveal}
          whileHover={{ y: -2, scale: 1.04, rotate: -6 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full p-2 text-slate-400 transition-colors duration-200 hover:bg-[#303443]/50 hover:text-white"
        >
          <Bell className="size-5" />
        </motion.button>

        <motion.button
          variants={sectionReveal}
          whileHover={{ y: -2, scale: 1.04, rotate: 6 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full p-2 text-slate-400 transition-colors duration-200 hover:bg-[#303443]/50 hover:text-white"
        >
          <Grid2x2 className="size-5" />
        </motion.button>

        <motion.div
          variants={sectionReveal}
          whileHover={{ y: -2, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <UserMenu />
        </motion.div>
      </motion.div>
    </motion.header>
  );
}