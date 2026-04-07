"use client";

import { useMemo, useState } from "react";
import {
  FolderOpen,
  Loader2,
  Plus,
  Search,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

import ProjectGrid from "@/components/projects/project-grid";
import { useProjects, normalizeProjectStatus } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterValue = "all" | "draft" | "published" | "archived";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);

  const {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageProjects,
    projectsQuery,
    createProjectMutation,
    publishProjectMutation,
    unpublishProjectMutation,
    deleteProjectMutation,
  } = useProjects();

  const filteredProjects = useMemo(() => {
    const items = projectsQuery.data ?? [];

    return items.filter((project) => {
      const status = normalizeProjectStatus(project.status);
      const matchesFilter = filter === "all" ? true : status === filter;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0
          ? true
          : project.name.toLowerCase().includes(query) ||
            (project.description ?? "").toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [filter, projectsQuery.data, search]);

  const handleCreateProject = async () => {
    const name = projectName.trim();
    const description = projectDescription.trim();

    if (!activeWorkspaceId) {
      setCreateError("No active workspace is available yet.");
      return;
    }

    if (name.length < 2) {
      setCreateError("Project name must be at least 2 characters.");
      return;
    }

    try {
      setCreateError(null);

      await createProjectMutation.mutateAsync({
        workspace_id: activeWorkspaceId,
        name,
        description: description || null,
        status: "draft",
      });

      setProjectName("");
      setProjectDescription("");
      setCreateDialogOpen(false);

      toast.success("Project created successfully.");
    } catch (error) {
      setCreateError(
        error instanceof Error ? error.message : "Project could not be created."
      );
    }
  };

  const handlePublish = async (projectId: string) => {
    try {
      await publishProjectMutation.mutateAsync(projectId);
      toast.success("Project published successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Project could not be published."
      );
    }
  };

  const handleUnpublish = async (projectId: string) => {
    try {
      await unpublishProjectMutation.mutateAsync(projectId);
      toast.success("Project moved back to draft.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Project could not be unpublished."
      );
    }
  };

  const handleDelete = async (projectId: string) => {
    const confirmed = window.confirm(
      "Delete this project? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteProjectMutation.mutateAsync(projectId);
      toast.success("Project deleted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Project could not be deleted."
      );
    }
  };

  const workspaceName = activeWorkspace?.workspace.name ?? "your workspace";

  return (
    <>
      <div className="space-y-8">
        <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Project library
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Your project orbit.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              Create, organize, and revisit every campaign, landing page, or client
              deployment inside {workspaceName}.
            </p>
          </div>

          <Button
            type="button"
            className="h-12 rounded-md px-5"
            disabled={!canManageProjects}
            onClick={() => setCreateDialogOpen(true)}
          >
            <Plus data-icon="inline-start" />
            New Project
          </Button>
        </section>

        {!canManageProjects ? (
          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#1a1f2d] px-4 py-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[#ffcf7d]" />
            <div>
              <p className="font-medium text-[#dee2f5]">Read-only access</p>
              <p className="mt-1 text-sm leading-6 text-[#bbcac6]">
                Your current role is <span className="capitalize">{currentRole ?? "viewer"}</span>.
                You can view project records, but only owners, admins, and editors can create,
                publish, or delete them.
              </p>
            </div>
          </div>
        ) : null}

        <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="w-full xl:max-w-xl">
            <InputGroup className="h-12 rounded-xl border-white/8 bg-[#161b29]">
              <InputGroupAddon>
                <Search className="size-4 text-[#9aa6c0]" />
              </InputGroupAddon>
              <InputGroupInput
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by project name or description"
                className="text-[#dee2f5] placeholder:text-[#7f8aa3]"
              />
            </InputGroup>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-[#161b29] px-3 py-2 text-xs uppercase tracking-[0.14em] text-[#9aa6c0] sm:inline-flex">
              <SlidersHorizontal className="size-3.5" />
              Filters
            </div>

            <Tabs
              value={filter}
              onValueChange={(value) => setFilter(value as FilterValue)}
              className="w-full xl:w-auto"
            >
              <TabsList className="grid h-12 grid-cols-4 rounded-xl bg-[#161b29] p-1">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        {projectsQuery.isPending ? (
          <section className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[270px] animate-pulse rounded-xl bg-[#1a1f2d]"
              />
            ))}
          </section>
        ) : null}

        {projectsQuery.isError ? (
          <section className="rounded-xl border border-white/8 bg-[#1a1f2d] px-6 py-8">
            <p className="text-lg font-semibold text-[#dee2f5]">
              Projects could not be loaded
            </p>
            <p className="mt-2 text-sm leading-6 text-[#bbcac6]">
              {projectsQuery.error instanceof Error
                ? projectsQuery.error.message
                : "Something went wrong while fetching this workspace project list."}
            </p>
            <Button
              type="button"
              onClick={() => void projectsQuery.refetch()}
              className="mt-5 h-11 rounded-md px-5"
            >
              Try again
            </Button>
          </section>
        ) : null}

        {!projectsQuery.isPending &&
        !projectsQuery.isError &&
        filteredProjects.length === 0 ? (
          <section className="rounded-xl border border-dashed border-white/10 bg-[#1a1f2d] px-6 py-12 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#111522] text-[#4fdbc8]">
              <FolderOpen className="size-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[#dee2f5]">
              {search.trim().length > 0 || filter !== "all"
                ? "No matching projects"
                : "No projects yet"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#bbcac6]">
              {search.trim().length > 0 || filter !== "all"
                ? "Adjust your search or filters to find the project you want."
                : "Create your first project to start building pages, publish experiences, and track analytics inside this workspace."}
            </p>

            {canManageProjects && search.trim().length === 0 && filter === "all" ? (
              <Button
                type="button"
                onClick={() => setCreateDialogOpen(true)}
                className="mt-6 h-11 rounded-md px-5"
              >
                <Plus data-icon="inline-start" />
                Create your first project
              </Button>
            ) : null}
          </section>
        ) : null}

        {!projectsQuery.isPending &&
        !projectsQuery.isError &&
        filteredProjects.length > 0 ? (
          <ProjectGrid
            projects={filteredProjects}
            canManage={canManageProjects}
            onPublish={(projectId) => void handlePublish(projectId)}
            onUnpublish={(projectId) => void handleUnpublish(projectId)}
            onDelete={(projectId) => void handleDelete(projectId)}
            activePublishId={publishProjectMutation.isPending ? publishProjectMutation.variables ?? null : null}
            activeUnpublishId={
              unpublishProjectMutation.isPending
                ? unpublishProjectMutation.variables ?? null
                : null
            }
            activeDeleteId={
              deleteProjectMutation.isPending ? deleteProjectMutation.variables ?? null : null
            }
          />
        ) : null}
      </div>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="border-white/8 bg-[#121826] text-[#dee2f5] sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription className="text-[#9aa6c0]">
              Start a fresh site surface inside {workspaceName}. You can wire pages,
              builder content, publishing, and analytics next.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <Field>
              <FieldLabel
                htmlFor="project-name"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Project name
              </FieldLabel>
              <FieldContent>
                <InputGroup className="min-h-12 rounded-xl border-white/8 bg-[#161b29]">
                  <InputGroupInput
                    id="project-name"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    placeholder="Spring campaign launch"
                    className="text-[#dee2f5] placeholder:text-white/20"
                  />
                </InputGroup>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel
                htmlFor="project-description"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Description
              </FieldLabel>
              <FieldContent>
                <InputGroup className="min-h-[120px] rounded-xl border-white/8 bg-[#161b29]">
                  <InputGroupTextarea
                    id="project-description"
                    value={projectDescription}
                    onChange={(event) => setProjectDescription(event.target.value)}
                    placeholder="Briefly describe what this project is for."
                    className="min-h-[120px] text-[#dee2f5] placeholder:text-white/20"
                  />
                </InputGroup>
                <FieldError errors={createError ? [{ message: createError }] : []} />
              </FieldContent>
            </Field>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="h-11 rounded-md bg-[#4fdbc8] px-5 text-[#03241f] hover:bg-[#46cfbd]"
                disabled={createProjectMutation.isPending || !activeWorkspaceId}
                onClick={() => void handleCreateProject()}
              >
                {createProjectMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Plus data-icon="inline-start" />
                )}
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}