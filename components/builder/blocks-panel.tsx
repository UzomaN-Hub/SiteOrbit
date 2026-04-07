"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, MousePointer, Rows3, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cardReveal, panelSlideLeft, staggerFast } from "@/lib/motion";
import type { BuilderBlock } from "@/types/builder";

export type BlocksPanelProps = {
  onAddBlock: (block: BuilderBlock) => void;
  disabled?: boolean;
};

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

type BlockTemplate = {
  type: BuilderBlock["type"];
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  create: () => BuilderBlock;
};

const blockTemplates: BlockTemplate[] = [
  {
    type: "hero",
    title: "Hero",
    description: "Big title, subtitle, and CTA.",
    icon: LayoutTemplate,
    create: () => ({
      id: createId(),
      type: "hero",
      props: {
        title: "Launch faster with SiteOrbit",
        subtitle: "Create focused landing pages for modern teams.",
        buttonLabel: "Get started",
        buttonHref: "#",
      },
    }),
  },
  {
    type: "text",
    title: "Text section",
    description: "Simple content block for supporting copy.",
    icon: Type,
    create: () => ({
      id: createId(),
      type: "text",
      props: {
        title: "Tell your product story",
        body: "Use this section to explain the value, flow, and offer clearly.",
      },
    }),
  },
  {
    type: "features",
    title: "Features",
    description: "Three quick value points.",
    icon: Rows3,
    create: () => ({
      id: createId(),
      type: "features",
      props: {
        title: "Why teams choose SiteOrbit",
        items: ["Fast setup", "Clear collaboration", "Confident publishing"],
      },
    }),
  },
  {
    type: "cta",
    title: "CTA",
    description: "Final conversion block with action.",
    icon: MousePointer,
    create: () => ({
      id: createId(),
      type: "cta",
      props: {
        title: "Ready to launch?",
        subtitle:
          "Create, publish, and track your next campaign from one workspace.",
        buttonLabel: "Start building",
        buttonHref: "#",
      },
    }),
  },
];

export default function BlocksPanel({
  onAddBlock,
  disabled = false,
}: BlocksPanelProps) {
  return (
    <motion.aside
      variants={panelSlideLeft}
      initial="hidden"
      animate="visible"
      className="h-full border-r border-white/8 bg-[#111522]"
    >
      <motion.div
        variants={panelSlideLeft}
        className="border-b border-white/8 px-4 py-4"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
          Block library
        </p>
        <h2 className="mt-2 text-lg font-bold text-[#dee2f5]">Build your page</h2>
        <p className="mt-1 text-sm leading-6 text-[#9aa6c0]">
          Add visible sections first. Keep the page clear and focused.
        </p>
      </motion.div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="space-y-3 p-4"
      >
        {blockTemplates.map((template) => {
          const Icon = template.icon;

          return (
            <motion.button
              key={template.type}
              variants={cardReveal}
              type="button"
              disabled={disabled}
              onClick={() => onAddBlock(template.create())}
              whileHover={disabled ? undefined : { y: -2, scale: 1.01 }}
              whileTap={disabled ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full rounded-xl border border-white/8 bg-[#1a1f2d] p-4 text-left transition hover:border-[#2cdbc2]/40 hover:bg-[#1d2434] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  whileHover={disabled ? undefined : { rotate: -6, scale: 1.06 }}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#162a27] text-[#4fdbc8]"
                >
                  <Icon className="size-4" />
                </motion.div>

                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#dee2f5]">
                    {template.title}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-[#9aa6c0]">
                    {template.description}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}

        <motion.div variants={cardReveal}>
          <Button
            type="button"
            variant="outline"
            disabled
            className="mt-2 h-10 w-full rounded-md border-white/8 bg-transparent text-[#9aa6c0]"
          >
            More starter blocks soon
          </Button>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}