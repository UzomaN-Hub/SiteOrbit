"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { easeBezier, staggerContainer, panelSlideUp, subtlePulse } from "@/lib/motion";

type LoadingStateProps = {
  title: string;
  description?: string;
  compact?: boolean;
};

export default function LoadingState({
  title,
  description,
  compact = false,
}: LoadingStateProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`relative overflow-hidden rounded-2xl border border-white/8 bg-[#1a1f2d] ${
        compact ? "p-6" : "p-8 md:p-10"
      }`}
    >
      <motion.div
        className="absolute -right-12 -top-12 size-28 rounded-full bg-[#4fdbc8]/8 blur-3xl"
        animate={{
          x: [0, 10, -4, 0],
          y: [0, -8, 6, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={panelSlideUp}
        className="relative flex flex-col items-center text-center"
      >
        <motion.div
          variants={subtlePulse}
          initial="initial"
          animate="animate"
          className="flex size-14 items-center justify-center rounded-2xl bg-[#172c29] text-[#4fdbc8]"
        >
          <Loader2 className="size-6 animate-spin" />
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

        <motion.div
          variants={panelSlideUp}
          className="mt-6 flex w-full max-w-sm flex-col gap-3"
        >
          <div className="h-3 overflow-hidden rounded-full bg-white/6">
            <motion.div
              className="h-full rounded-full bg-[#4fdbc8]"
              initial={{ width: "18%" }}
              animate={{ width: ["18%", "72%", "46%", "86%"] }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: easeBezier,
              }}
            />
          </div>

          {!compact ? (
            <>
              <div className="h-3 rounded-full bg-white/6" />
              <div className="h-3 w-4/5 self-center rounded-full bg-white/6" />
            </>
          ) : null}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}