"use client";

import { Plus } from "lucide-react";

import type { BuilderBlock } from "@/types/builder";

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
  create: () => BuilderBlock;
};

/** Starting content is written as guidance, so clients never ship lorem ipsum. */
export const blockTemplates: BlockTemplate[] = [
  {
    type: "hero",
    title: "Hero",
    description: "Headline, one sentence and a button.",
    create: () => ({
      id: createId(),
      type: "hero",
      props: {
        title: "Say what this business does in one line",
        subtitle: "Follow with one sentence on who it's for and why it's different.",
        buttonLabel: "Book an appointment",
        buttonHref: "",
      },
    }),
  },
  {
    type: "text",
    title: "Text",
    description: "A heading and a paragraph.",
    create: () => ({
      id: createId(),
      type: "text",
      props: {
        title: "About us",
        body: "Two or three sentences about the team, how long you've been doing this and where you work.",
      },
    }),
  },
  {
    type: "features",
    title: "Features",
    description: "Three short points side by side.",
    create: () => ({
      id: createId(),
      type: "features",
      props: {
        title: "What we offer",
        items: ["First service", "Second service", "Third service"],
      },
    }),
  },
  {
    type: "cta",
    title: "Call to action",
    description: "A closing line and a button.",
    create: () => ({
      id: createId(),
      type: "cta",
      props: {
        title: "Ask the one thing you want visitors to do",
        subtitle: "Remove any doubt with a short line, like how quickly you reply.",
        buttonLabel: "Get in touch",
        buttonHref: "",
      },
    }),
  },
];

export default function BlocksPanel({
  onAddBlock,
  disabled = false,
}: {
  onAddBlock: (block: BuilderBlock) => void;
  disabled?: boolean;
}) {
  return (
    <aside
      aria-label="Add sections"
      className="flex flex-col border-b border-border xl:h-[calc(100dvh-56px)] xl:overflow-y-auto xl:border-r xl:border-b-0"
    >
      <div className="px-4 pt-4 pb-2">
        <h2 className="type-ui text-text">Add a section</h2>
        <p className="type-small text-text-muted">New sections go to the end of the page.</p>
      </div>
      <ul className="grid grid-cols-2 gap-1 p-2 sm:grid-cols-4 xl:grid-cols-1">
        {blockTemplates.map((template) => (
          <li key={template.type}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onAddBlock(template.create())}
              className="group flex w-full items-start gap-3 rounded-sm px-2 py-2 text-left transition-colors duration-(--dur-fast) hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <Plus
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-text-muted group-hover:text-text"
                strokeWidth={1.5}
              />
              <span className="min-w-0">
                <span className="block type-ui text-text">{template.title}</span>
                <span className="block type-small text-text-muted">{template.description}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
