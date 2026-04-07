"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import BrandingSettingsPanel, {
  type BrandingFormState,
} from "@/components/settings/branding-settings-panel";
import SettingsNav, { type SettingsTab } from "@/components/settings/settings-nav";
import SettingsPlaceholderPanel from "@/components/settings/settings-placeholder-panel";
import WorkspaceSettingsPanel, {
  type WorkspaceFormState,
} from "@/components/settings/workspace-settings-panel";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/hooks/use-settings";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";

function normalizeWorkspaceForm(input?: {
  name?: string | null;
  primary_domain?: string | null;
  description?: string | null;
} | null): WorkspaceFormState {
  return {
    name: input?.name ?? "",
    primary_domain: input?.primary_domain ?? "",
    description: input?.description ?? "",
  };
}

function normalizeBrandingForm(input?: {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
  };
  typography?: {
    heading_font?: string;
    body_font?: string;
    base_size?: string;
  };
  spacing?: {
    section_gap?: string;
    container_width?: string;
  };
  radius?: {
    card?: string;
    button?: string;
    input?: string;
  };
} | null): BrandingFormState {
  return {
    primary: input?.colors?.primary ?? "#4FDBC8",
    secondary: input?.colors?.secondary ?? "#89CEFF",
    accent: input?.colors?.accent ?? "#DEE2F5",
    background: input?.colors?.background ?? "#090E1B",
    surface: input?.colors?.surface ?? "#1A1F2D",
    heading_font: input?.typography?.heading_font ?? "Inter",
    body_font: input?.typography?.body_font ?? "Inter",
    base_size: input?.typography?.base_size ?? "16px",
    section_gap: input?.spacing?.section_gap ?? "80px",
    container_width: input?.spacing?.container_width ?? "1200px",
    card_radius: input?.radius?.card ?? "16px",
    button_radius: input?.radius?.button ?? "10px",
    input_radius: input?.radius?.input ?? "10px",
  };
}

function WorkspaceTabContent({
  initialForm,
  currentRole,
  canManageSettings,
  isSaving,
  onSave,
}: {
  initialForm: WorkspaceFormState;
  currentRole: string | null;
  canManageSettings: boolean;
  isSaving: boolean;
  onSave: (form: WorkspaceFormState) => Promise<void>;
}) {
  const [form, setForm] = useState<WorkspaceFormState>(initialForm);

  const hasUnsavedChanges = JSON.stringify(form) !== JSON.stringify(initialForm);

  useUnsavedChangesWarning({
    when: hasUnsavedChanges,
  });

  return (
    <WorkspaceSettingsPanel
      form={form}
      initialForm={initialForm}
      currentRole={currentRole}
      canManageSettings={canManageSettings}
      isSaving={isSaving}
      onChange={setForm}
      onReset={() => setForm(initialForm)}
      onSave={() => onSave(form)}
    />
  );
}

function BrandingTabContent({
  initialForm,
  canManageSettings,
  isSaving,
  onSave,
}: {
  initialForm: BrandingFormState;
  canManageSettings: boolean;
  isSaving: boolean;
  onSave: (form: BrandingFormState) => Promise<void>;
}) {
  const [form, setForm] = useState<BrandingFormState>(initialForm);

  const hasUnsavedChanges = JSON.stringify(form) !== JSON.stringify(initialForm);

  useUnsavedChangesWarning({
    when: hasUnsavedChanges,
  });

  return (
    <BrandingSettingsPanel
      form={form}
      initialForm={initialForm}
      canManageSettings={canManageSettings}
      isSaving={isSaving}
      onChange={setForm}
      onReset={() => setForm(initialForm)}
      onSave={() => onSave(form)}
    />
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("workspace");

  const {
    activeWorkspace,
    currentRole,
    canManageSettings,
    workspaceQuery,
    themeQuery,
    updateWorkspaceMutation,
    updateThemeMutation,
  } = useSettings();

  const workspaceData = workspaceQuery.data ?? null;
  const themeData = themeQuery.data ?? null;

  const initialWorkspaceForm = useMemo(
    () => normalizeWorkspaceForm(workspaceData),
    [workspaceData]
  );

  const initialBrandingForm = useMemo(
    () => normalizeBrandingForm(themeData),
    [themeData]
  );

  const isLoading = workspaceQuery.isPending || themeQuery.isPending;

  const isSaving =
    updateWorkspaceMutation.isPending || updateThemeMutation.isPending;

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Workspace Settings
            </h1>
            <p className="max-w-2xl text-lg text-[#bbcac6]">
              Configure your SiteOrbit workspace, branding system, and connected
              product settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-white/10 text-[#bbcac6]">
              {activeWorkspace?.workspace.name ?? "Workspace"}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/10 capitalize text-[#9aa6c0]"
            >
              {currentRole ?? "viewer"}
            </Badge>
            <Badge
              variant="outline"
              className={
                isSaving
                  ? "border-[#89ceff]/30 text-[#89ceff]"
                  : "border-[#4fdbc8]/30 text-[#4fdbc8]"
              }
            >
              {isSaving ? "Saving…" : "Ready"}
            </Badge>
          </div>
        </div>
      </section>

      <SettingsNav value={activeTab} onValueChange={setActiveTab} />

      {isLoading ? (
        <section className="rounded-xl bg-[#1a1f2d] p-8 text-[#bbcac6]">
          <div className="flex items-center gap-3">
            <Loader2 className="size-5 animate-spin text-[#4fdbc8]" />
            Loading workspace settings…
          </div>
        </section>
      ) : null}

      {!isLoading && activeTab === "workspace" ? (
        <WorkspaceTabContent
          key={JSON.stringify(initialWorkspaceForm)}
          initialForm={initialWorkspaceForm}
          currentRole={currentRole}
          canManageSettings={canManageSettings}
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

      {!isLoading && activeTab === "branding" ? (
        <BrandingTabContent
          key={JSON.stringify(initialBrandingForm)}
          initialForm={initialBrandingForm}
          canManageSettings={canManageSettings}
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
              spacing: {
                section_gap: form.section_gap,
                container_width: form.container_width,
              },
              radius: {
                card: form.card_radius,
                button: form.button_radius,
                input: form.input_radius,
              },
            });
          }}
        />
      ) : null}

      {!isLoading && activeTab === "domains" ? (
        <SettingsPlaceholderPanel
          title="Domains"
          description="Custom domains already have a dedicated product surface. This tab is reserved for a future settings-level summary and quick actions."
        />
      ) : null}

      {!isLoading && activeTab === "api" ? (
        <SettingsPlaceholderPanel
          title="API & Webhooks"
          description="This is a planned MVP placeholder for future API key and webhook controls. Keeping it here preserves the product structure without overbuilding."
        />
      ) : null}

      {!isLoading && activeTab === "billing" ? (
        <SettingsPlaceholderPanel
          title="Billing"
          description="Billing is intentionally out of real MVP scope for now, but the tab remains in the product shell so the settings architecture stays complete and realistic."
        />
      ) : null}
    </div>
  );
}