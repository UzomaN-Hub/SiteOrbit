"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock } from "lucide-react";

import BlocksPanel from "@/components/builder/blocks-panel";
import BuilderToolbar from "@/components/builder/builder-toolbar";
import Canvas from "@/components/builder/canvas";
import PropertiesPanel from "@/components/builder/properties-panel";
import { useBuilder } from "@/hooks/use-builder";
import { useProjects } from "@/hooks/use-projects";
import { easeBezier, pageReveal, sectionReveal } from "@/lib/motion";
import { useWorkspace } from "@/hooks/use-workspace";

export default function BuilderShell() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId");
  const pageId = searchParams.get("pageId");

  const {
    blocks,
    selectedBlockId,
    viewport,
    saveStatus,
    isPreviewMode,
    currentPage,
    pages,
    project,
    currentRole,
    canEdit,
    projectQuery,
    pagesQuery,
    createPageMutation,
    savePageMutation,
    setSelectedBlockId,
    setViewport,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlockProps,
    setPreviewMode,
    saveCurrentPage,
    ensureDefaultPage,
  } = useBuilder(projectId, pageId);

  const { publishProjectMutation } = useProjects();
  const { activeWorkspace } = useWorkspace();

  useEffect(() => {
    if (!projectId) return;
    if (pagesQuery.isPending) return;
    if (pages.length > 0 || createPageMutation.isPending) return;

    void (async () => {
      try {
        const created = await ensureDefaultPage();
        if (!created) return;

        const next = new URLSearchParams(searchParams.toString());
        next.set("projectId", projectId);
        next.set("pageId", created.id);
        router.replace(`/builder?${next.toString()}`);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Default page could not be created."
        );
      }
    })();
  }, [
    createPageMutation.isPending,
    ensureDefaultPage,
    pages.length,
    pagesQuery.isPending,
    projectId,
    router,
    searchParams,
  ]);

  const selectedBlock = useMemo(
    () => blocks.find((block) => block.id === selectedBlockId) ?? null,
    [blocks, selectedBlockId]
  );

  const handleChangePage = (nextPageId: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (projectId) next.set("projectId", projectId);
    next.set("pageId", nextPageId);
    router.push(`/builder?${next.toString()}`);
  };

  const handleCreatePage = async () => {
    if (!projectId) return;

    try {
      const page = await createPageMutation.mutateAsync({
        site_id: projectId,
        title: `Page ${pages.length + 1}`,
        path: pages.length === 0 ? "/" : `/page-${pages.length + 1}`,
        layout_json: JSON.stringify({ blocks: [] }),
      });

      toast.success("New page created.");

      const next = new URLSearchParams(searchParams.toString());
      next.set("projectId", projectId);
      next.set("pageId", page.id);
      router.push(`/builder?${next.toString()}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Page could not be created."
      );
    }
  };

  const handleSave = async () => {
    try {
      await saveCurrentPage();
      toast.success("Page saved successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Page could not be saved."
      );
    }
  };

  const handlePublish = async () => {
    if (!projectId) return;

    try {
      await publishProjectMutation.mutateAsync(projectId);
      toast.success("Project published successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Project could not be published."
      );
    }
  };

  if (!projectId) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.42, ease: easeBezier }}
          className="max-w-xl rounded-2xl border border-dashed border-white/10 bg-[#111522] px-8 py-10 text-center"
        >
          <h2 className="text-2xl font-bold text-[#dee2f5]">Pick a project first</h2>
          <p className="mt-3 text-sm leading-7 text-[#9aa6c0]">
            Open the builder from a project card so SiteOrbit knows which project
            and page should load into the visual editor.
          </p>
        </motion.div>
      </div>
    );
  }

  if (projectQuery.isPending || pagesQuery.isPending) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="h-20 animate-pulse rounded-2xl bg-[#111522]" />
        <div className="grid min-h-[70vh] grid-cols-[280px_1fr_320px] gap-0 rounded-2xl border border-white/8 bg-[#0f1420]">
          <div className="animate-pulse border-r border-white/8 bg-[#111522]" />
          <div className="animate-pulse bg-[#0b1020]" />
          <div className="animate-pulse border-l border-white/8 bg-[#111522]" />
        </div>
      </motion.div>
    );
  }

  if (projectQuery.isError || pagesQuery.isError) {
    const message =
      (projectQuery.error instanceof Error && projectQuery.error.message) ||
      (pagesQuery.error instanceof Error && pagesQuery.error.message) ||
      "Builder data could not be loaded.";

    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.42, ease: easeBezier }}
          className="max-w-xl rounded-2xl border border-white/10 bg-[#111522] px-8 py-10 text-center"
        >
          <h2 className="text-2xl font-bold text-[#dee2f5]">Builder unavailable</h2>
          <p className="mt-3 text-sm leading-7 text-[#9aa6c0]">{message}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {!canEdit ? (
        <motion.div
          variants={sectionReveal}
          className="flex items-start gap-3 rounded-2xl border border-[#ffcf7d]/18 bg-[#2a2418] px-5 py-4 text-[#ffcf7d]"
        >
          <Lock className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="text-sm font-semibold">
              Read-only builder access
            </p>
            <p className="mt-1 text-sm leading-6 text-[#f1d39a]">
              Your role in {activeWorkspace?.workspace.name ?? "this workspace"} is{" "}
              <span className="font-semibold capitalize">{currentRole ?? "viewer"}</span>.
              You can inspect the page structure and content, but editing and publishing are restricted.
            </p>
          </div>
        </motion.div>
      ) : null}

      <motion.div
        variants={sectionReveal}
        className="overflow-hidden rounded-2xl border border-white/8 bg-[#0f1420]"
      >
        <BuilderToolbar
          project={project}
          page={currentPage}
          pages={pages}
          viewport={viewport}
          saveStatus={saveStatus}
          isPreviewMode={isPreviewMode}
          canEdit={canEdit}
          isSaving={savePageMutation.isPending}
          isPublishing={publishProjectMutation.isPending}
          onSelectViewport={setViewport}
          onTogglePreview={() => setPreviewMode(!isPreviewMode)}
          onSave={handleSave}
          onPublish={handlePublish}
          onChangePage={handleChangePage}
          onCreatePage={handleCreatePage}
        />

        <div className="grid min-h-[70vh] grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          {!isPreviewMode ? (
            <BlocksPanel onAddBlock={addBlock} disabled={!canEdit} />
          ) : null}

          <Canvas
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            viewport={viewport}
            isPreviewMode={isPreviewMode}
            onSelectBlock={setSelectedBlockId}
            onRemoveBlock={removeBlock}
            onMoveBlock={moveBlock}
            canEdit={canEdit}
          />

          {!isPreviewMode ? (
            <PropertiesPanel
              block={selectedBlock}
              canEdit={canEdit}
              onChange={(updater) => {
                if (!selectedBlock) return;
                updateBlockProps(selectedBlock.id, updater);
              }}
            />
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}