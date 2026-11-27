"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

import BrandingSettingsPanel, {
  type BrandingFormState,
} from "@/components/settings/branding-settings-panel";
import WorkspaceSettingsPanel, {
  type WorkspaceFormState,
} from "@/components/settings/workspace-settings-panel";
import ErrorState from "@/components/shared/error-state";
import NavTabs from "@/components/shared/nav-tabs";
import PageHeader from "@/components/shared/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useProjects } from "@/hooks/use-projects";
import { useSettings } from "@/hooks/use-settings";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { brandingDefaults } from "@/lib/constants/branding";
import type { Theme } from "@/types/theme";
import type { Workspace } from "@/types/workspace";

type Tab = "workspace" | "branding" | "billing";

function toWorkspaceForm(input: Workspace | null): WorkspaceFormState {
  return {
    name: input?.name ?? "",
    primary_domain: input?.primary_domain ?? "",
    description: input?.description ?? "",
  };
}

function toBrandingForm(input: Theme | null): BrandingFormState {
  const d = brandingDefaults;
  return {
    primary: input?.colors?.primary ?? d.primary,
    secondary: input?.colors?.secondary ?? d.secondary,
    accent: input?.colors?.accent ?? d.accent,
    background: input?.colors?.background ?? d.background,
    surface: input?.colors?.surface ?? d.surface,
    heading_font: input?.typography?.heading_font ?? d.heading_font,
    body_font: input?.typography?.body_font ?? d.body_font,
    base_size: input?.typography?.base_size ?? d.base_size,
    section_gap: input?.spacing?.section_gap ?? d.section_gap,
    container_width: input?.spacing?.container_width ?? d.container_width,
    card_radius: input?.radius?.card ?? d.card_radius,
    button_radius: input?.radius?.button ?? d.button_radius,
    input_radius: input?.radius?.input ?? d.input_radius,
  };
}

function useDraft<T>(initial: T) {
  const [form, setForm] = useState<T>(initial);
  useUnsavedChangesWarning({ when: JSON.stringify(form) !== JSON.stringify(initial) });
  return [form, setForm] as const;
}

function WorkspaceTab(props: {
  initial: WorkspaceFormState;
  canManage: boolean;
  isSaving: boolean;
  onSave: (form: WorkspaceFormState) => Promise<void>;
}) {
  const [form, setForm] = useDraft(props.initial);
  return (
    <WorkspaceSettingsPanel
      form={form}
      initialForm={props.initial}
      canManageSettings={props.canManage}
      isSaving={props.isSaving}
      onChange={setForm}
      onReset={() => setForm(props.initial)}
      onSave={() => props.onSave(form)}
    />
  );
}

function BrandingTab(props: {
  initial: BrandingFormState;
  canManage: boolean;
  isSaving: boolean;
  onSave: (form: BrandingFormState) => Promise<void>;
}) {
  const [form, setForm] = useDraft(props.initial);
  return (
    <BrandingSettingsPanel
      form={form}
      initialForm={props.initial}
      canManageSettings={props.canManage}
      isSaving={props.isSaving}
      onChange={setForm}
      onReset={() => setForm(props.initial)}
      onSave={() => props.onSave(form)}
    />
  );
}

function BillingTab({ plan, siteCount }: { plan: string; siteCount: number | null }) {
  return (
    <Card className="max-w-2xl">
      <CardHeader className="mb-0">
        <CardTitle>Plan</CardTitle>
        <CardDescription>
          Paid plans aren&apos;t switched on yet, so there&apos;s nothing to pay and no card on file.
        </CardDescription>
      </CardHeader>
      <dl className="mt-6 grid grid-cols-2 border-t border-border">
        <div className="flex flex-col gap-1 py-4 pr-4">
          <dt className="type-label text-text-muted">Current plan</dt>
          <dd className="type-h3 capitalize text-text">{plan}</dd>
        </div>
        <div className="flex flex-col gap-1 border-l border-border py-4 pl-4">
          <dt className="type-label text-text-muted">Sites in this workspace</dt>
          <dd className="type-h3 tabular text-text">
            {siteCount === null ? <Skeleton className="mt-1 h-5 w-8" /> : siteCount}
          </dd>
        </div>
      </dl>
    </Card>
  );
}

function SettingsContent() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("tab");
  const tab: Tab = requested === "branding" || requested === "billing" ? requested : "workspace";

  const {
    activeWorkspace,
    canManageSettings,
    currentRole,
    workspaceQuery,
    themeQuery,
    updateWorkspaceMutation,
    updateThemeMutation,
  } = useSettings();
  const { projectsQuery } = useProjects();

  useDocumentTitle(
    activeWorkspace ? `Settings · ${activeWorkspace.workspace.name}` : "Settings"
  );

  const workspaceInitial = useMemo(
    () => toWorkspaceForm(workspaceQuery.data ?? null),
    [workspaceQuery.data]
  );
  const brandingInitial = useMemo(() => toBrandingForm(themeQuery.data ?? null), [themeQuery.data]);

  const query = tab === "branding" ? themeQuery : workspaceQuery;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Settings"
        description={
          canManageSettings
            ? `Details and brand for ${activeWorkspace?.workspace.name ?? "this workspace"}.`
            : `You have ${currentRole ?? "viewer"} access, so these settings are read-only.`
        }
      />

      <NavTabs
        label="Settings sections"
        tabs={[
          { label: "Workspace", href: "/settings", active: tab === "workspace" },
          { label: "Branding", href: "/settings?tab=branding", active: tab === "branding" },
          { label: "Billing", href: "/settings?tab=billing", active: tab === "billing" },
        ]}
      />

      {tab !== "billing" && query.isPending ? (
        <div className="flex flex-col gap-6 rounded-md border border-border p-6" aria-busy="true">
          <Skeleton className="h-5 w-40" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-10 rounded-sm" />
            <Skeleton className="h-10 rounded-sm" />
          </div>
          <Skeleton className="h-24 rounded-sm" />
        </div>
      ) : null}

      {tab !== "billing" && query.isError ? (
        <ErrorState title="Settings didn't load" error={query.error} onRetry={() => void query.refetch()} />
      ) : null}

      {tab === "workspace" && workspaceQuery.isSuccess ? (
        <WorkspaceTab
          key={JSON.stringify(workspaceInitial)}
          initial={workspaceInitial}
          canManage={canManageSettings}
          isSaving={updateWorkspaceMutation.isPending}
          onSave={async (form) => {
            await updateWorkspaceMutation.mutateAsync({
              name: form.name.trim() || undefined,
              primary_domain: form.primary_domain.trim() || null,
              description: form.description.trim() || null,
            });
          }}
        />
      ) : null}

      {tab === "branding" && themeQuery.isSuccess ? (
        <BrandingTab
          key={JSON.stringify(brandingInitial)}
          initial={brandingInitial}
          canManage={canManageSettings}
          isSaving={updateThemeMutation.isPending}
          onSave={async (form) => {
            await updateThemeMutation.mutateAsync({
              colors: {
                primary: form.primary,
                secondary: form.secondary,
                accent: form.accent,
                background: form.background,
                surface: form.surface,
              },
              typography: {
                heading_font: form.heading_font,
                body_font: form.body_font,
                base_size: form.base_size,
              },
              spacing: { section_gap: form.section_gap, container_width: form.container_width },
              radius: {
                card: form.card_radius,
                button: form.button_radius,
                input: form.input_radius,
              },
            });
          }}
        />
      ) : null}

      {tab === "billing" ? (
        <BillingTab
          plan={activeWorkspace?.workspace.plan ?? "free"}
          siteCount={projectsQuery.data ? projectsQuery.data.length : null}
        />
      ) : null}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsContent />
    </Suspense>
  );
}
