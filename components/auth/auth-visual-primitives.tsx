"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("absolute rounded-full", className)}
      animate={{
        x: [0, 12, -8, 0],
        y: [0, -16, 10, 0],
        scale: [1, 1.06, 0.97, 1],
      }}
      transition={{
        duration: 9,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function OrbitPulse({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full border border-white/8",
        className
      )}
      animate={{
        opacity: [0.15, 0.38, 0.12],
        scale: [0.96, 1.03, 1.08],
      }}
      transition={{
        duration: 5.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}