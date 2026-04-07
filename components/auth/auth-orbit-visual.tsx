"use client";

import { motion } from "framer-motion";

import { authEase } from "@/components/auth/auth-form-motion";
import {
  FloatingOrb,
  OrbitPulse,
} from "@/components/auth/auth-visual-primitives";

type AuthOrbitVisualProps = {
  mode?: "sign-in" | "sign-up" | "forgot-password";
};

export default function AuthOrbitVisual({
  mode = "sign-in",
}: AuthOrbitVisualProps) {
  const label =
    mode === "sign-up"
      ? "New workspace systems"
      : mode === "forgot-password"
        ? "Recovery pathway"
        : "Secure team access";

  const title =
    mode === "sign-up"
      ? "Launch your workspace with momentum."
      : mode === "forgot-password"
        ? "Recover access without losing flow."
        : "Step back into your digital orbit.";

  const subtitle =
    mode === "sign-up"
      ? "Create a workspace, invite your team, and move from setup to publishing with clarity."
      : mode === "forgot-password"
        ? "Keep the recovery path calm, readable, and confidence-building for first-time and returning users."
        : "A polished control layer for teams building, publishing, and managing branded landing pages.";

  return (
    <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,13,24,0.72),rgba(13,20,35,0.94))]">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 28% 30%, rgba(79,219,200,0.16), transparent 22%), radial-gradient(circle at 76% 62%, rgba(137,206,255,0.10), transparent 22%)",
            "radial-gradient(circle at 34% 34%, rgba(79,219,200,0.2), transparent 24%), radial-gradient(circle at 72% 58%, rgba(137,206,255,0.14), transparent 24%)",
            "radial-gradient(circle at 28% 30%, rgba(79,219,200,0.16), transparent 22%), radial-gradient(circle at 76% 62%, rgba(137,206,255,0.10), transparent 22%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%,rgba(255,255,255,0.01))]" />

      <FloatingOrb className="left-[10%] top-[14%] h-28 w-28 bg-[#4fdbc8]/12 blur-2xl" delay={0} />
      <FloatingOrb className="right-[12%] top-[18%] h-24 w-24 bg-[#89ceff]/12 blur-2xl" delay={1.4} />
      <FloatingOrb className="bottom-[12%] left-[26%] h-36 w-36 bg-[#4fdbc8]/10 blur-3xl" delay={2.2} />

      <OrbitPulse className="left-1/2 top-1/2 size-[210px] -translate-x-1/2 -translate-y-1/2" delay={0} />
      <OrbitPulse className="left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2" delay={0.6} />
      <OrbitPulse className="left-1/2 top-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2" delay={1.1} />

      <motion.div
        className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4fdbc8]/20 bg-[radial-gradient(circle_at_center,rgba(79,219,200,0.18),rgba(79,219,200,0.04)_55%,transparent_72%)] shadow-[0_0_90px_rgba(79,219,200,0.18)]"
        animate={{
          scale: [1, 1.06, 0.98, 1],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-[17%] top-[24%] rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9feee2]"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {label}
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-6 right-6 rounded-[1.25rem] border border-white/8 bg-black/20 p-5 backdrop-blur-md"
        initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.2, ease: authEase }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
          SiteOrbit System
        </p>
        <h3 className="mt-3 font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#e9edf7]">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[#b8c3d9]">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}