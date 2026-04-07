"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Logo from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
  heroTitle?: string;
  heroDescription?: string;
  visual?: ReactNode;
  className?: string;
};

export default function AuthCard({
  title,
  description,
  footer,
  children,
  heroTitle,
  heroDescription,
  visual,
  className,
}: AuthCardProps) {
  return (
    <div className={cn("grid min-h-screen lg:grid-cols-[1fr_1fr]", className)}>
      <motion.section
        initial={{ opacity: 0, x: -24, filter: "blur(12px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-14"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <Logo href="/" />
        </motion.div>

        <div className="max-w-xl space-y-6">
          {visual ? (
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.97, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-10 overflow-hidden rounded-[1.25rem] border border-white/6 bg-white/[0.02] p-0 shadow-[0_20px_80px_rgba(0,0,0,0.28)]"
              style={{ transformPerspective: 1400 }}
            >
              {visual}
            </motion.div>
          ) : null}

          {heroTitle ? (
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-7xl font-extrabold leading-[0.98] tracking-tight text-[#dee2f5]"
            >
              {heroTitle}
            </motion.h1>
          ) : null}

          {heroDescription ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="max-w-lg text-[1.1rem] leading-8 text-[#bbcac6]"
            >
              {heroDescription}
            </motion.p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-white/30"
        >
          <span>© 2024 SiteOrbit</span>
          <motion.span
            className="h-px flex-1 bg-white/10"
            animate={{ opacity: [0.35, 0.8, 0.45] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>The Digital Curator</span>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="lg:hidden"
          >
            <Logo href="/" />
          </motion.div>

          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="font-heading text-5xl font-bold tracking-tight text-[#dee2f5]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="text-lg text-[#bbcac6]"
            >
              {description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>

          {footer ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="pt-2"
            >
              {footer}
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="flex justify-end gap-6 text-sm text-white/35"
          >
            <motion.div whileHover={{ y: -1, color: "#ffffff" }}>
              <Link href="/">Privacy</Link>
            </motion.div>
            <motion.div whileHover={{ y: -1, color: "#ffffff" }}>
              <Link href="/">Terms</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}