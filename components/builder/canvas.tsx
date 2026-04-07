"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  MousePointer,
  Rows3,
  Trash2,
  Type,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cardReveal, easeBezier, subtlePulse } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { BuilderBlock, BuilderViewport } from "@/types/builder";

type CanvasProps = {
  blocks: BuilderBlock[];
  selectedBlockId: string | null;
  viewport: BuilderViewport;
  isPreviewMode: boolean;
  onSelectBlock: (blockId: string) => void;
  onRemoveBlock: (blockId: string) => void;
  onMoveBlock: (blockId: string, direction: "up" | "down") => void;
  canEdit?: boolean;
};

function getViewportClass(viewport: BuilderViewport) {
  switch (viewport) {
    case "mobile":
      return "max-w-sm";
    case "tablet":
      return "max-w-3xl";
    case "desktop":
    default:
      return "max-w-5xl";
  }
}

function blockIcon(type: BuilderBlock["type"]) {
  switch (type) {
    case "features":
      return Rows3;
    case "cta":
      return MousePointer;
    case "text":
      return Type;
    case "hero":
    default:
      return Rows3;
  }
}

function RenderBlock({ block }: { block: BuilderBlock }) {
  if (block.type === "hero") {
    return (
      <section className="rounded-2xl bg-[#0f1420] px-8 py-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          {block.props.title || "Hero title"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#c4cfdf]">
          {block.props.subtitle || "Hero subtitle"}
        </p>
        {block.props.buttonLabel ? (
          <div className="mt-6">
            <span className="inline-flex rounded-full bg-[#4fdbc8] px-5 py-3 text-sm font-semibold text-[#03241f]">
              {block.props.buttonLabel}
            </span>
          </div>
        ) : null}
      </section>
    );
  }

  if (block.type === "text") {
    return (
      <section className="rounded-2xl bg-[#0f1420] px-8 py-10">
        <h3 className="text-2xl font-bold text-white">
          {block.props.title || "Section title"}
        </h3>
        <p className="mt-4 text-base leading-7 text-[#c4cfdf]">
          {block.props.body || "Body text"}
        </p>
      </section>
    );
  }

  if (block.type === "features") {
    const items =
      block.props.items && block.props.items.length > 0
        ? block.props.items
        : ["Feature one", "Feature two", "Feature three"];

    return (
      <section className="rounded-2xl bg-[#0f1420] px-8 py-10">
        <h3 className="text-2xl font-bold text-white">
          {block.props.title || "Feature section"}
        </h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: index * 0.06, ease: easeBezier }}
              className="rounded-xl border border-white/8 bg-[#151b29] p-4 text-sm text-[#d7deea]"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-[#0f1420] px-8 py-10 text-center">
      <h3 className="text-2xl font-bold text-white">
        {block.props.title || "Call to action"}
      </h3>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#c4cfdf]">
        {block.props.subtitle || "CTA subtitle"}
      </p>
      {block.props.buttonLabel ? (
        <div className="mt-6">
          <span className="inline-flex rounded-full bg-[#4fdbc8] px-5 py-3 text-sm font-semibold text-[#03241f]">
            {block.props.buttonLabel}
          </span>
        </div>
      ) : null}
    </section>
  );
}

export default function Canvas({
  blocks,
  selectedBlockId,
  viewport,
  isPreviewMode,
  onSelectBlock,
  onRemoveBlock,
  onMoveBlock,
  canEdit = true,
}: CanvasProps) {
  if (blocks.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.42, ease: easeBezier }}
          className="max-w-md rounded-2xl border border-dashed border-white/12 bg-[#111522] px-6 py-10 text-center"
        >
          <h3 className="text-xl font-bold text-[#dee2f5]">No sections yet</h3>
          <p className="mt-3 text-sm leading-7 text-[#9aa6c0]">
            Start with a visible section from the left panel so the page quickly
            becomes understandable and editable.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="h-full overflow-auto bg-[#0b1020] p-6"
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
    >
      <motion.div
        layout
        className={cn("mx-auto space-y-5", getViewportClass(viewport))}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
      >
        {blocks.map((block, index) => {
          const Icon = blockIcon(block.type);
          const selected = selectedBlockId === block.id;

          return (
            <motion.div
              key={block.id}
              layout
              variants={cardReveal}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 170, damping: 20 }}
              className={cn(
                "rounded-[1.6rem] border border-transparent p-2 transition",
                selected && !isPreviewMode && "border-[#4fdbc8]/50 bg-[#101728]"
              )}
            >
              {!isPreviewMode ? (
                <motion.div
                  layout
                  className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-[#111522] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      variants={selected ? subtlePulse : undefined}
                      initial={selected ? "initial" : undefined}
                      animate={selected ? "animate" : undefined}
                      className="flex size-9 items-center justify-center rounded-lg bg-[#172c29] text-[#4fdbc8]"
                    >
                      <Icon className="size-4" />
                    </motion.div>

                    <div>
                      <div className="text-sm font-semibold capitalize text-[#dee2f5]">
                        {block.type} block
                      </div>
                      <div className="text-xs uppercase tracking-[0.18em] text-[#7f8aa3]">
                        Section {index + 1}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        className="text-[#9aa6c0]"
                        disabled={!canEdit}
                        onClick={() => onMoveBlock(block.id, "up")}
                      >
                        <ChevronUp />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        className="text-[#9aa6c0]"
                        disabled={!canEdit}
                        onClick={() => onMoveBlock(block.id, "down")}
                      >
                        <ChevronDown />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="border-white/8 bg-transparent text-[#dee2f5]"
                        onClick={() => onSelectBlock(block.id)}
                      >
                        Edit
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        className="text-[#f2b8b5]"
                        disabled={!canEdit}
                        onClick={() => onRemoveBlock(block.id)}
                      >
                        <Trash2 />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}

              <motion.div
                layout
                onClick={() => !isPreviewMode && onSelectBlock(block.id)}
                whileHover={!isPreviewMode ? { y: -2 } : undefined}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className={!isPreviewMode ? "cursor-pointer" : undefined}
              >
                <RenderBlock block={block} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}