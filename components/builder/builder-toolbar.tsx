"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  Laptop,
  Loader2,
  MonitorSmartphone,
  Save,
  Smartphone,
  Tablet,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  easeBezier,
  panelSlideUp,
  staggerFast,
  subtlePulse,
} from "@/lib/motion";
import type {
  BuilderPageRecord,
  BuilderViewport,
  SaveStatus,
} from "@/types/builder";
import type { Project } from "@/types/project";

type BuilderToolbarProps = {
  project: Project | null;
  page: BuilderPageRecord | null;
  pages: BuilderPageRecord[];
  viewport: BuilderViewport;
  saveStatus: SaveStatus;
  isPreviewMode: boolean;
  canEdit?: boolean;
  isSaving?: boolean;
  isPublishing?: boolean;
  onSelectViewport: (viewport: BuilderViewport) => void;
  onTogglePreview: () => void;
  onSave: () => void;
  onPublish: () => void;
  onChangePage: (pageId: string) => void;
  onCreatePage: () => void;
};

function saveStatusLabel(status: SaveStatus) {
  switch (status) {
    case "saving":
      return "Saving…";
    case "saved":
      return "Saved";
    case "unsaved":
      return "Unsaved changes";
    case "error":
      return "Save failed";
    case "idle":
    default:
      return "Ready";
  }
}

function saveStatusTone(status: SaveStatus) {
  switch (status) {
    case "saving":
      return "border-[#89ceff]/25 bg-[#89ceff]/10 text-[#b9e3ff]";
    case "saved":
      return "border-[#4fdbc8]/25 bg-[#4fdbc8]/10 text-[#9feee2]";
    case "unsaved":
      return "border-[#f7c97a]/25 bg-[#f7c97a]/10 text-[#ffdca2]";
    case "error":
      return "border-[#f2b8b5]/25 bg-[#f2b8b5]/10 text-[#f7cbc9]";
    case "idle":
    default:
      return "border-white/10 bg-[#1a1f2d] text-[#9aa6c0]";
  }
}

export default function BuilderToolbar({
  project,
  page,
  pages,
  viewport,
  saveStatus,
  isPreviewMode,
  canEdit = true,
  isSaving = false,
  isPublishing = false,
  onSelectViewport,
  onTogglePreview,
  onSave,
  onPublish,
  onChangePage,
  onCreatePage,
}: BuilderToolbarProps) {
  return (
    <motion.header
      variants={panelSlideUp}
      initial="hidden"
      animate="visible"
      className="border-b border-white/8 bg-[#0f1420] px-4 py-3"
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4fdbc8]">
            Builder
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h1 className="truncate text-xl font-bold text-[#dee2f5]">
              {project?.name ?? "Untitled project"}
            </h1>

            {page ? (
              <motion.span
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full bg-[#1a1f2d] px-3 py-1 text-xs text-[#9aa6c0]"
              >
                {page.title} · {page.path}
              </motion.span>
            ) : null}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={saveStatus}
              initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: easeBezier }}
              className="mt-2"
            >
              <motion.span
                variants={saveStatus === "saving" ? subtlePulse : undefined}
                initial={saveStatus === "saving" ? "initial" : undefined}
                animate={saveStatus === "saving" ? "animate" : undefined}
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${saveStatusTone(
                  saveStatus
                )}`}
              >
                {saveStatusLabel(saveStatus)}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 xl:flex-row xl:items-center"
        >
          <motion.div
            variants={panelSlideUp}
            className="flex items-center gap-2 rounded-xl bg-[#111522] p-1"
          >
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
              <Button
                type="button"
                size="icon-sm"
                variant={viewport === "desktop" ? "default" : "ghost"}
                onClick={() => onSelectViewport("desktop")}
              >
                <Laptop />
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
              <Button
                type="button"
                size="icon-sm"
                variant={viewport === "tablet" ? "default" : "ghost"}
                onClick={() => onSelectViewport("tablet")}
              >
                <Tablet />
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
              <Button
                type="button"
                size="icon-sm"
                variant={viewport === "mobile" ? "default" : "ghost"}
                onClick={() => onSelectViewport("mobile")}
              >
                <Smartphone />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={panelSlideUp}
            className="flex flex-wrap items-center gap-2"
          >
            <motion.select
              whileFocus={{ scale: 1.01 }}
              value={page?.id ?? ""}
              onChange={(event) => onChangePage(event.target.value)}
              className="h-10 rounded-md border border-white/8 bg-[#111522] px-3 text-sm text-[#dee2f5] outline-none transition focus:border-[#4fdbc8]/35"
            >
              {pages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} ({item.path})
                </option>
              ))}
            </motion.select>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                disabled={!canEdit}
                onClick={onCreatePage}
              >
                New page
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                onClick={onTogglePreview}
              >
                {isPreviewMode ? <MonitorSmartphone /> : <Eye />}
                {isPreviewMode ? "Exit preview" : "Preview"}
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                disabled={!canEdit || isSaving || !page}
                onClick={onSave}
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                Save
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                className="h-10 rounded-md bg-[#4fdbc8] text-[#03241f] hover:bg-[#46cfbd]"
                disabled={!canEdit || isPublishing || !project}
                onClick={onPublish}
              >
                {isPublishing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <UploadCloud />
                )}
                Publish
              </Button>
            </motion.div>

            {project ? (
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Button
                  asChild
                  type="button"
                  variant="outline"
                  className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                >
                  <Link href={`/analytics?projectId=${project.id}`}>Analytics</Link>
                </Button>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}