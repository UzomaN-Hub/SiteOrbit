"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import { panelSlideUp, staggerContainer } from "@/lib/motion";

type ErrorStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function ErrorState({
  title,
  description,
  action,
}: ErrorStateProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-2xl border border-[#f2b8b5]/14 bg-[#1a1f2d] p-8 md:p-10"
    >
      <motion.div
        className="absolute -left-10 top-10 size-24 rounded-full bg-[#f2b8b5]/8 blur-3xl"
        animate={{
          x: [0, 8, -4, 0],
          y: [0, -6, 5, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={panelSlideUp}
        className="relative flex flex-col items-center text-center"
      >
        <motion.div
          whileHover={{ y: -2, scale: 1.03 }}
          className="flex size-14 items-center justify-center rounded-2xl bg-[#2b1d1d] text-[#f2b8b5]"
        >
          <AlertTriangle className="size-6" />
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
            className="mt-3 max-w-xl text-sm leading-7 text-[#9aa6c0]"
          >
            {description}
          </motion.p>
        ) : null}

        {action ? (
          <motion.div variants={panelSlideUp} className="mt-6">
            {action}
          </motion.div>
        ) : null}
      </motion.div>
    </motion.section>
  );
}