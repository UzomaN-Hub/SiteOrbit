"use client";

import { motion } from "framer-motion";
import { cardReveal, panelSlideUp } from "@/lib/motion";

type SettingsPlaceholderPanelProps = {
  title: string;
  description: string;
};

export default function SettingsPlaceholderPanel({
  title,
  description,
}: SettingsPlaceholderPanelProps) {
  return (
    <motion.section
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      className="rounded-xl bg-[#1a1f2d] p-8"
    >
      <motion.h2
        variants={panelSlideUp}
        initial="hidden"
        animate="visible"
        className="font-heading text-xl font-bold text-[#dee2f5]"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={panelSlideUp}
        initial="hidden"
        animate="visible"
        className="mt-3 max-w-2xl text-sm leading-6 text-[#bbcac6]"
      >
        {description}
      </motion.p>
    </motion.section>
  );
}