"use client";

import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BuilderBlock, BuilderViewport } from "@/types/builder";

type CanvasProps = {
  blocks: BuilderBlock[];
  selectedBlockId: string | null;
  viewport: BuilderViewport;
  isPreviewMode: boolean;
  canEdit: boolean;
  onSelectBlock: (blockId: string) => void;
  onRemoveBlock: (blockId: string) => void;
  onMoveBlock: (blockId: string, direction: "up" | "down") => void;
};

const viewportWidth: Record<BuilderViewport, string> = {
  desktop: "max-w-[960px]",
  tablet: "max-w-[720px]",
  mobile: "max-w-[390px]",
};

const blockNames: Record<BuilderBlock["type"], string> = {
  hero: "Hero",
  text: "Text",
  features: "Features",
  cta: "Call to action",
};

function FakeButton({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span className="mt-6 inline-flex h-10 items-center rounded-sm border border-border-strong px-4 type-ui text-text">
      {label}
    </span>
  );
}

function RenderBlock({ block }: { block: BuilderBlock }) {
  const { props } = block;

  if (block.type === "hero") {
    return (
      <section className="px-6 py-16 text-center sm:px-12">
        <h2 className="mx-auto max-w-[20ch] type-h1 text-text">{props.title || "Headline"}</h2>
        <p className="mx-auto mt-4 max-w-[48ch] type-body-lg text-text-muted">
          {props.subtitle || "Supporting sentence"}
        </p>
        <FakeButton label={props.buttonLabel} />
      </section>
    );
  }

  if (block.type === "text") {
    return (
      <section className="px-6 py-12 sm:px-12">
        <h3 className="type-h2 text-text">{props.title || "Section title"}</h3>
        <p className="mt-4 type-body text-text-muted prose-width">{props.body || "Body text"}</p>
      </section>
    );
  }

  if (block.type === "features") {
    const items = props.items?.length ? props.items : ["First point", "Second point", "Third point"];
    return (
      <section className="px-6 py-12 sm:px-12">
        <h3 className="type-h2 text-text">{props.title || "Features"}</h3>
        <ul className="mt-8 grid gap-6 @[560px]:grid-cols-3 @[560px]:gap-0">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="type-body text-text @[560px]:border-l @[560px]:border-border @[560px]:px-6 @[560px]:first:border-l-0 @[560px]:first:pl-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="border-t border-border px-6 py-12 sm:px-12">
      <h3 className="type-h2 text-text">{props.title || "Call to action"}</h3>
      <p className="mt-3 type-body text-text-muted prose-width">{props.subtitle}</p>
      <FakeButton label={props.buttonLabel} />
    </section>
  );
}

export default function Canvas({
  blocks,
  selectedBlockId,
  viewport,
  isPreviewMode,
  canEdit,
  onSelectBlock,
  onRemoveBlock,
  onMoveBlock,
}: CanvasProps) {
  return (
    <div className="min-h-[60vh] bg-surface-1 p-4 sm:p-8 xl:h-[calc(100dvh-64px)] xl:overflow-y-auto">
      <div
        className={cn(
          "@container mx-auto min-h-full rounded-md border border-border bg-bg transition-[max-width] duration-(--dur-base) ease-brand",
          viewportWidth[viewport]
        )}
      >
        {blocks.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 p-8 text-center">
            <h3 className="type-h3 text-text">This page is empty</h3>
            <p className="max-w-[40ch] type-body text-text-muted">
              {canEdit
                ? "Add a hero section from the list to give the page its headline."
                : "Nobody has added sections to this page yet."}
            </p>
          </div>
        ) : (
          <ol className="flex flex-col py-2">
            {blocks.map((block, index) => {
              const selected = !isPreviewMode && block.id === selectedBlockId;
              return (
                <li key={block.id} className="relative p-2">
                  {!isPreviewMode ? (
                    <button
                      type="button"
                      aria-label={`Edit ${blockNames[block.type]} section ${index + 1}`}
                      aria-pressed={selected}
                      onClick={() => onSelectBlock(block.id)}
                      className="absolute inset-2 z-0 rounded-sm transition-colors duration-(--dur-fast) hover:bg-surface-1"
                    />
                  ) : null}
                  <div
                    className={cn(
                      "pointer-events-none relative rounded-sm",
                      selected && "block-selected"
                    )}
                  >
                    <RenderBlock block={block} />
                  </div>
                  {selected ? (
                    <div className="absolute -top-1 left-4 z-10 flex items-center gap-1">
                      <span className="rounded-xs bg-brand px-1.5 py-0.5 type-small font-medium text-on-brand">
                        {blockNames[block.type]}
                      </span>
                      {canEdit ? (
                        <span className="ml-1 flex items-center gap-0.5 rounded-sm border border-border bg-surface-2 p-0.5 shadow-float">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="size-8"
                            aria-label="Move section up"
                            disabled={index === 0}
                            onClick={() => onMoveBlock(block.id, "up")}
                          >
                            <ArrowUp />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="size-8"
                            aria-label="Move section down"
                            disabled={index === blocks.length - 1}
                            onClick={() => onMoveBlock(block.id, "down")}
                          >
                            <ArrowDown />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="size-8"
                            aria-label="Remove section"
                            onClick={() => onRemoveBlock(block.id)}
                          >
                            <Trash2 />
                          </Button>
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
