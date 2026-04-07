"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cardReveal, panelSlideUp, staggerContainer } from "@/lib/motion";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
};

export function EmptyStatePrimaryAction({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}

export function EmptyStateSecondaryAction({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
      <Button variant="outline" {...props}>
        {children}
      </Button>
    </motion.div>
  );
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const resolvedPrimaryAction = primaryAction ?? action;

  return (
    <motion.section
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      className={`relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#1a1f2d] p-8 md:p-10 ${className ?? ""}`}
    >
      <motion.div
        className="absolute -right-12 bottom-0 size-28 rounded-full bg-[#4fdbc8]/8 blur-3xl"
        animate={{
          x: [0, -8, 4, 0],
          y: [0, 6, -4, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center text-center"
      >
        <motion.div
          variants={panelSlideUp}
          whileHover={{ y: -2, scale: 1.04, rotate: -6 }}
          className="flex size-14 items-center justify-center rounded-2xl bg-[#172c29] text-[#4fdbc8]"
        >
          {icon ?? <Sparkles className="size-6" />}
        </motion.div>

        <motion.h2
          variants={panelSlideUp}
          className="mt-5 font-heading text-2xl font-bold text-[#dee2f5]"
        >
          {title}
        </motion.h2>

        {description ? (
          <motion.p
            variants={panelSlideUp}
            className="mt-3 max-w-2xl text-sm leading-7 text-[#9aa6c0]"
          >
            {description}
          </motion.p>
        ) : null}

        {(resolvedPrimaryAction || secondaryAction) ? (
          <motion.div
            variants={panelSlideUp}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            {resolvedPrimaryAction}
            {secondaryAction}
          </motion.div>
        ) : null}
      </motion.div>
    </motion.section>
  );
}