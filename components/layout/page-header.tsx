"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pageReveal, sectionReveal, pulseGlow, staggerFast } from "@/lib/motion";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  action?: ReactNode;
  className?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  badge,
  action,
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden pb-2 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <motion.div
        variants={pulseGlow}
        initial="initial"
        animate="animate"
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 top-0 h-24 w-24 rounded-full bg-[#4fdbc8]/10 blur-2xl"
      />

      <motion.div variants={staggerFast} className="relative max-w-4xl">
        {eyebrow ? (
          <motion.div
            variants={sectionReveal}
            className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4fdbc8]"
          >
            {eyebrow}
          </motion.div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <motion.h1
            variants={sectionReveal}
            className="font-heading text-4xl font-extrabold tracking-[-0.05em] text-[#e7ebf7] sm:text-5xl"
          >
            {title}
          </motion.h1>

          {badge ? (
            <motion.div
              variants={sectionReveal}
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Badge className="rounded-full border border-[#4fdbc8]/15 bg-[#4fdbc8]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#71f8e4] hover:bg-[#4fdbc8]/10">
                {badge}
              </Badge>
            </motion.div>
          ) : null}
        </div>

        {description ? (
          <motion.p
            variants={sectionReveal}
            className="mt-4 max-w-3xl text-base leading-8 text-[#b8c3d9] md:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
      </motion.div>

      {action ? (
        <motion.div
          variants={sectionReveal}
          whileHover={{ y: -2 }}
          className="relative shrink-0 self-start md:self-auto"
        >
          {action}
        </motion.div>
      ) : null}
    </motion.div>
  );
}