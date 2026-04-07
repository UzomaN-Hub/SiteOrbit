"use client";

import { create } from "zustand";

import type {
  BuilderBlock,
  BuilderPageLayout,
  BuilderViewport,
  SaveStatus,
} from "@/types/builder";

type BuilderState = {
  pageId: string | null;
  selectedBlockId: string | null;
  viewport: BuilderViewport;
  saveStatus: SaveStatus;
  blocks: BuilderBlock[];
  isPreviewMode: boolean;
  hydratedFromPageId: string | null;
  setPageId: (pageId: string | null) => void;
  setSelectedBlockId: (blockId: string | null) => void;
  setViewport: (viewport: BuilderViewport) => void;
  setSaveStatus: (status: SaveStatus) => void;
  setBlocks: (blocks: BuilderBlock[]) => void;
  hydrateFromLayout: (pageId: string, layout: BuilderPageLayout) => void;
  addBlock: (block: BuilderBlock) => void;
  updateBlock: (blockId: string, updater: Partial<BuilderBlock>) => void;
  updateBlockProps: (
    blockId: string,
    updater: Partial<BuilderBlock["props"]>
  ) => void;
  removeBlock: (blockId: string) => void;
  moveBlock: (blockId: string, direction: "up" | "down") => void;
  setPreviewMode: (value: boolean) => void;
  resetBuilder: () => void;
  getLayoutJson: () => string;
};

const initialState = {
  pageId: null,
  selectedBlockId: null,
  viewport: "desktop" as BuilderViewport,
  saveStatus: "idle" as SaveStatus,
  blocks: [] as BuilderBlock[],
  isPreviewMode: false,
  hydratedFromPageId: null as string | null,
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  ...initialState,

  setPageId: (pageId) => set({ pageId }),
  setSelectedBlockId: (selectedBlockId) => set({ selectedBlockId }),
  setViewport: (viewport) => set({ viewport }),
  setSaveStatus: (saveStatus) => set({ saveStatus }),
  setBlocks: (blocks) => set({ blocks }),

  hydrateFromLayout: (pageId, layout) =>
    set({
      pageId,
      blocks: Array.isArray(layout.blocks) ? layout.blocks : [],
      selectedBlockId: layout.blocks[0]?.id ?? null,
      saveStatus: "idle",
      hydratedFromPageId: pageId,
    }),

  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, block],
      selectedBlockId: block.id,
      saveStatus: "unsaved",
    })),

  updateBlock: (blockId, updater) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId ? { ...block, ...updater } : block
      ),
      saveStatus: "unsaved",
    })),

  updateBlockProps: (blockId, updater) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              props: {
                ...block.props,
                ...updater,
              },
            }
          : block
      ),
      saveStatus: "unsaved",
    })),

  removeBlock: (blockId) =>
    set((state) => {
      const nextBlocks = state.blocks.filter((block) => block.id !== blockId);

      return {
        blocks: nextBlocks,
        selectedBlockId:
          state.selectedBlockId === blockId
            ? (nextBlocks[0]?.id ?? null)
            : state.selectedBlockId,
        saveStatus: "unsaved",
      };
    }),

  moveBlock: (blockId, direction) =>
    set((state) => {
      const index = state.blocks.findIndex((block) => block.id === blockId);
      if (index === -1) return state;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.blocks.length) {
        return state;
      }

      const nextBlocks = [...state.blocks];
      const [item] = nextBlocks.splice(index, 1);
      nextBlocks.splice(targetIndex, 0, item);

      return {
        blocks: nextBlocks,
        saveStatus: "unsaved",
      };
    }),

  setPreviewMode: (isPreviewMode) => set({ isPreviewMode }),

  resetBuilder: () => set(initialState),

  getLayoutJson: () => {
    const layout: BuilderPageLayout = {
      blocks: get().blocks,
    };

    return JSON.stringify(layout);
  },
}));