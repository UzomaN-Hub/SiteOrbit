"use client";

import { BarChart3, Boxes, PenSquare, Users2 } from "lucide-react";
import { motion } from "framer-motion";

import { cardReveal, floatingOrb, pageReveal, staggerContainer, staggerFast } from "@/lib/motion";

const features = [
  {
    title: "Visual editing that stays structured",
    description:
      "Move quickly with a builder that keeps sections clear, reusable, and easy for teams to manage.",
    icon: PenSquare,
  },
  {
    title: "Workspace-aware collaboration",
    description:
      "Invite teammates, manage roles, and keep every workspace isolated without losing speed.",
    icon: Users2,
  },
  {
    title: "Composable site systems",
    description:
      "Build branded landing pages from flexible blocks instead of fragile one-off layouts.",
    icon: Boxes,
  },
  {
    title: "Analytics with signal first",
    description:
      "Focus on the metrics that matter with readable charts, top pages, and source.",
    icon: BarChart3,
  },
];

export default function Features() {
  return (
    <motion.section
      variants={pageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className="relative mx-auto max-w-7xl overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <motion.div
        variants={floatingOrb}
        initial="initial"
        animate="animate"
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full bg-[#4fdbc8]/8 blur-3xl"
      />

      <motion.div variants={staggerFast} className="mb-10 space-y-3">
        <motion.p
          variants={cardReveal}
          className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#4fdbc8]"
        >
          Capabilities
        </motion.p>
        <motion.h2
          variants={cardReveal}
          className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5] sm:text-5xl"
        >
          Engineered for Velocity.
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid gap-4 md:grid-cols-2"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              variants={cardReveal}
              whileHover={{
                y: -10,
                rotateX: -5,
                rotateY: index % 2 === 0 ? -4 : 4,
                boxShadow: "0 28px 90px rgba(0,0,0,0.34)",
              }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`group rounded-2xl border border-white/6 bg-[#161b29]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] ${
                index === 0 ? "md:col-span-1" : ""
              }`}
              style={{ transformPerspective: 1400 }}
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="mb-6 flex size-9 items-center justify-center rounded-lg bg-[#1e2433] text-[#4fdbc8]"
              >
                <Icon className="size-4" />
              </motion.div>

              <h3 className="font-heading text-lg font-bold text-[#dee2f5]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#b8c3d9]">
                {feature.description}
              </p>

              <motion.div
                className="mt-5 rounded-xl border border-white/6 bg-[#1a1f2d] p-4"
                whileHover={{ borderColor: "rgba(79,219,200,0.22)" }}
              >
                <motion.div
                  className="h-24 rounded-lg bg-[linear-gradient(180deg,rgba(79,219,200,0.1),rgba(79,219,200,0.02))]"
                  animate={{
                    opacity: [0.7, 1, 0.82],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={cardReveal}
        className="mt-12 max-w-3xl"
      >
        <div className="text-3xl leading-tight text-[#dee2f5]">
          <span className="mr-2 text-[#4fdbc8]">”</span>
          SiteOrbit has fundamentally shifted how our agency ships digital
          experiences. The separation of concerns between design and data
          management is handled with surgical precision.
          <span className="mr-2 text-[#4fdbc8]">”</span>
        </div>

        <motion.div
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="mt-6 flex items-center gap-3"
        >
          <div className="size-9 rounded-lg bg-[#74f5e3]" />
          <div>
            <p className="text-sm font-medium text-[#dee2f5]">Marcus Thorne</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[#7f8aa3]">
              CEO @ Helix Creative
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}