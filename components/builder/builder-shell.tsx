"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

import BlocksPanel from "@/components/builder/blocks-panel";
import BuilderToolbar from "@/components/builder/builder-toolbar";
import Canvas from "@/components/builder/canvas";
import PropertiesPanel from "@/components/builder/properties-panel";
import { errorMessage } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBuilder } from "@/hooks/use-builder";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useProjects } from "@/hooks/use-projects";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { useBuilderStore } from "@/store/builder-store";

export function BuilderSkeleton() {
  return (
    <div className="min-h-dvh" role="status" aria-busy="true" aria-label="Loading the builder">
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="ml-auto h-8 w-20 rounded-sm" />
        <Skeleton className="h-8 w-20 rounded-sm" />
      </div>
      <div className="grid xl:grid-cols-[256px_minmax(0,1fr)_320px]">
        <div className="hidden flex-col gap-4 p-4 xl:flex">
          {[0, 1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-9 w-full rounded-sm" />
          ))}
        </div>
        <div className="bg-surface-1 p-8">
          <Skeleton className="mx-auto h-[60vh] max-w-[960px] rounded-md" />
        </div>
        <div className="hidden p-4 xl:block">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

function Message({ title, body }: { title: string; body: string }) {
  return (
    <main className="min-h-dvh px-4 pt-24">
      <div className="mx-auto flex max-w-[480px] flex-col items-start gap-3">
        <h1 className="type-h2 text-text">{title}</h1>
        <p className="type-body text-text-muted">{body}</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard">Back to sites</Link>
        </Button>
      </div>
    </main>
  );
}

export default function BuilderShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const pageId = searchParams.get("pageId");
  const creatingDefault = useRef(false);

  const builder = useBuilder(projectId, pageId);
  const { publishProjectMutation } = useProjects();
  const resetBuilder = useBuilderStore((state) => state.resetBuilder);

  const {
    blocks,
    selectedBlockId,
    viewport,
    saveStatus,
    isPreviewMode,
    currentPage,
    pages,
    project,
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
  } = builder;

  useDocumentTitle(project ? `${project.name} · Builder` : "Builder");
  useUnsavedChangesWarning({ when: saveStatus === "unsaved" });

  // Leaving the builder must not leak one page's unsaved blocks into the next.
  useEffect(() => () => resetBuilder(), [resetBuilder]);

  // A new site has no pages: create its homepage once (the ref stops React's
  // dev double-effect from creating two).
  useEffect(() => {
    if (!projectId || pagesQuery.isPending || pagesQuery.isError) return;
    if (pages.length > 0 || creatingDefault.current) return;
    creatingDefault.current = true;

    ensureDefaultPage()
      .then((created) => {
        if (!created) return;
        router.replace(`/builder?projectId=${projectId}&pageId=${created.id}`);
      })
      .catch((error: unknown) => {
        creatingDefault.current = false;
        toast.error(errorMessage(error, "The homepage couldn't be created. Reload to try again."));
      });
  }, [ensureDefaultPage, pages.length, pagesQuery.isError, pagesQuery.isPending, projectId, router]);

  const selectedBlock = useMemo(
    () => blocks.find((block) => block.id === selectedBlockId) ?? null,
    [blocks, selectedBlockId]
  );

  if (!projectId) {
    return (
      <Message
        title="Pick a site to edit"
        body="Open the builder from a site on the Sites page so we know which site to load."
      />
    );
  }

  if (projectQuery.isPending || pagesQuery.isPending) return <BuilderSkeleton />;

  if (projectQuery.isError || pagesQuery.isError) {
    return (
      <Message
        title="This site didn't load"
        body={errorMessage(
          projectQuery.error ?? pagesQuery.error,
          "It may have been deleted, or you may not have access to it."
        )}
      />
    );
  }

  const goToPage = (nextPageId: string) =>
    router.push(`/builder?projectId=${projectId}&pageId=${nextPageId}`);

  const handleCreatePage = async () => {
    try {
      const page = await createPageMutation.mutateAsync({
        site_id: projectId,
        title: `Page ${pages.length + 1}`,
        path: `/page-${pages.length + 1}`,
        layout_json: JSON.stringify({ blocks: [] }),
      });
      toast.success(`${page.title} added.`);
      goToPage(page.id);
    } catch (error) {
      toast.error(errorMessage(error, "The page couldn't be added. Try again."));
    }
  };

  const handleSave = async () => {
    try {
      await saveCurrentPage();
      toast.success("Page saved.");
    } catch (error) {
      toast.error(errorMessage(error, "The page couldn't be saved. Try again."));
    }
  };

  // Publishing used to skip unsaved edits; save them first.
  const handlePublish = async () => {
    try {
      if (saveStatus === "unsaved") await saveCurrentPage();
      await publishProjectMutation.mutateAsync(projectId);
      toast.success(`${project?.name ?? "The site"} is live.`);
    } catch (error) {
      toast.error(errorMessage(error, "The site couldn't be published. Try again."));
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
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
        isCreatingPage={createPageMutation.isPending}
        onSelectViewport={setViewport}
        onTogglePreview={() => setPreviewMode(!isPreviewMode)}
        onSave={() => void handleSave()}
        onPublish={() => void handlePublish()}
        onChangePage={goToPage}
        onCreatePage={() => void handleCreatePage()}
      />

      <main
        className={
          isPreviewMode
            ? "grid flex-1"
            : "grid flex-1 xl:grid-cols-[256px_minmax(0,1fr)_320px]"
        }
      >
        {!isPreviewMode ? <BlocksPanel onAddBlock={addBlock} disabled={!canEdit} /> : null}
        <Canvas
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          viewport={viewport}
          isPreviewMode={isPreviewMode}
          canEdit={canEdit}
          onSelectBlock={setSelectedBlockId}
          onRemoveBlock={removeBlock}
          onMoveBlock={moveBlock}
        />
        {!isPreviewMode ? (
          <PropertiesPanel
            block={selectedBlock}
            canEdit={canEdit}
            onChange={(updater) => {
              if (selectedBlock) updateBlockProps(selectedBlock.id, updater);
            }}
          />
        ) : null}
      </main>
    </div>
  );
}
