"use client";

import { useMemo, useState } from "react";
import { Lock, Plus, Search } from "lucide-react";
import { toast } from "sonner";

import CreateWorkspaceDialog from "@/components/app-shell/create-workspace-dialog";
import EmptyState from "@/components/shared/empty-state";
import ErrorState, { errorMessage } from "@/components/shared/error-state";
import PageHeader from "@/components/shared/page-header";
import Segmented from "@/components/shared/segmented";
import NewSiteDialog from "@/components/sites/new-site-dialog";
import SitesTable, { SitesTableSkeleton, siteTone } from "@/components/sites/sites-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useProjects } from "@/hooks/use-projects";
import { useTeam } from "@/hooks/use-team";
import { useWorkspace } from "@/hooks/use-workspace";
import { formatNumber } from "@/lib/utils/format";
import type { Project } from "@/types/project";

type Filter = "all" | "live" | "draft" | "inactive";

function Num({ value }: { value: number }) {
  return <strong className="tabular font-semibold text-text">{formatNumber(value)}</strong>;
}

export default function SitesPage() {
  const { workspacesQuery, workspaces } = useWorkspace();
  const {
    activeWorkspace,
    canManageProjects,
    currentRole,
    projectsQuery,
    publishProjectMutation,
    unpublishProjectMutation,
    deleteProjectMutation,
  } = useProjects();
  const { membersQuery } = useTeam();

  const [newSiteOpen, setNewSiteOpen] = useState(false);
  const [newWorkspaceOpen, setNewWorkspaceOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useDocumentTitle(activeWorkspace ? `Sites · ${activeWorkspace.workspace.name}` : "Sites");

  const sites = useMemo(() => projectsQuery.data ?? [], [projectsQuery.data]);
  const counts = useMemo(() => {
    const tally = { all: sites.length, live: 0, draft: 0, inactive: 0 };
    sites.forEach((site) => {
      tally[siteTone(site.status) as Exclude<Filter, "all">] += 1;
    });
    return tally;
  }, [sites]);

  const visibleSites = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sites.filter((site) => {
      const matchesFilter = filter === "all" || siteTone(site.status) === filter;
      const matchesSearch =
        !query ||
        site.name.toLowerCase().includes(query) ||
        (site.description ?? "").toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search, sites]);

  const busyId =
    (publishProjectMutation.isPending && publishProjectMutation.variables) ||
    (unpublishProjectMutation.isPending && unpublishProjectMutation.variables) ||
    (deleteProjectMutation.isPending && deleteProjectMutation.variables) ||
    null;

  const run = async (action: () => Promise<unknown>, success: string, failure: string) => {
    try {
      await action();
      toast.success(success);
    } catch (error) {
      toast.error(errorMessage(error, failure));
      throw error;
    }
  };

  const handlePublish = (site: Project) =>
    void run(
      () => publishProjectMutation.mutateAsync(site.id),
      `${site.name} is live.`,
      `${site.name} couldn't be published. Try again.`
    ).catch(() => undefined);

  const handleUnpublish = (site: Project) =>
    void run(
      () => unpublishProjectMutation.mutateAsync(site.id),
      `${site.name} is back in draft.`,
      `${site.name} couldn't be moved to draft. Try again.`
    ).catch(() => undefined);

  const handleDelete = (site: Project) =>
    run(
      () => deleteProjectMutation.mutateAsync(site.id),
      `${site.name} was deleted.`,
      `${site.name} couldn't be deleted. Try again.`
    );

  // A brand-new account has no workspace yet.
  if (workspacesQuery.isSuccess && workspaces.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader title="Sites" />
        <EmptyState
          title="No workspace yet"
          description="A workspace keeps one client's sites, team and domains together. Create one to add your first site."
          action={
            <Button onClick={() => setNewWorkspaceOpen(true)}>
              <Plus />
              New workspace
            </Button>
          }
        />
        <CreateWorkspaceDialog open={newWorkspaceOpen} onOpenChange={setNewWorkspaceOpen} />
      </div>
    );
  }

  const loading = projectsQuery.isPending;
  const memberCount = membersQuery.data?.length;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Sites"
        action={
          canManageProjects ? (
            <Button onClick={() => setNewSiteOpen(true)}>
              <Plus />
              New site
            </Button>
          ) : null
        }
      >
        {loading ? (
          <Skeleton className="h-4 w-72" />
        ) : projectsQuery.isError ? null : (
          <p className="type-body text-text-muted">
            <Num value={counts.all} /> {counts.all === 1 ? "site" : "sites"} ·{" "}
            <Num value={counts.live} /> live
            {typeof memberCount === "number" ? (
              <>
                {" "}
                · <Num value={memberCount} /> {memberCount === 1 ? "member" : "members"}
              </>
            ) : null}
          </p>
        )}
      </PageHeader>

      {!canManageProjects && currentRole ? (
        <p className="flex items-center gap-2 type-small text-text-muted">
          <Lock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          You have <span className="capitalize">{currentRole}</span> access, so you can view
          sites but not create, publish or delete them.
        </p>
      ) : null}

      {loading ? <SitesTableSkeleton /> : null}

      {projectsQuery.isError ? (
        <ErrorState
          title="Sites didn't load"
          error={projectsQuery.error}
          onRetry={() => void projectsQuery.refetch()}
        />
      ) : null}

      {!loading && !projectsQuery.isError && sites.length === 0 ? (
        <EmptyState
          title="No sites yet"
          description="Create your first site to start building pages for a client."
          action={
            canManageProjects ? (
              <Button onClick={() => setNewSiteOpen(true)}>
                <Plus />
                New site
              </Button>
            ) : null
          }
        />
      ) : null}

      {!loading && sites.length > 0 ? (
        <section className="flex flex-col gap-4" aria-label="Sites">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Segmented<Filter>
              label="Filter by status"
              value={filter}
              onChange={setFilter}
              options={[
                { value: "all", label: "All", count: counts.all },
                { value: "live", label: "Live", count: counts.live },
                { value: "draft", label: "Draft", count: counts.draft },
                ...(counts.inactive
                  ? [{ value: "inactive" as const, label: "Archived", count: counts.inactive }]
                  : []),
              ]}
            />
            <div className="relative w-full sm:w-72">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-text-faint"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <Input
                type="search"
                aria-label="Search sites"
                placeholder="Search sites"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-10 pl-10 type-ui font-normal"
              />
            </div>
          </div>

          {visibleSites.length ? (
            <SitesTable
              sites={visibleSites}
              canManage={canManageProjects}
              busyId={busyId || null}
              onPublish={handlePublish}
              onUnpublish={handleUnpublish}
              onDelete={handleDelete}
            />
          ) : (
            <p className="border-y border-border py-8 type-body text-text-muted">
              No sites match {search.trim() ? `“${search.trim()}”` : "this filter"}.{" "}
              <button
                type="button"
                className="rounded-xs text-text underline underline-offset-[3px]"
                onClick={() => {
                  setSearch("");
                  setFilter("all");
                }}
              >
                Clear filters
              </button>
            </p>
          )}
        </section>
      ) : null}

      <NewSiteDialog open={newSiteOpen} onOpenChange={setNewSiteOpen} />
    </div>
  );
}
