"use client";

import { Info, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cardReveal, pageReveal, pulseGlow, staggerContainer, sectionReveal } from "@/lib/motion";

export type WorkspaceFormState = {
  name: string;
  primary_domain: string;
  description: string;
};

type WorkspaceSettingsPanelProps = {
  form: WorkspaceFormState;
  initialForm: WorkspaceFormState;
  currentRole: string | null;
  canManageSettings: boolean;
  isSaving: boolean;
  onChange: (next: WorkspaceFormState) => void;
  onReset: () => void;
  onSave: () => Promise<void>;
};

export default function WorkspaceSettingsPanel({
  form,
  initialForm,
  currentRole,
  canManageSettings,
  isSaving,
  onChange,
  onReset,
  onSave,
}: WorkspaceSettingsPanelProps) {
  const hasUnsavedChanges =
    JSON.stringify(form) !== JSON.stringify(initialForm);

  const handleSave = async () => {
    try {
      await onSave();
      toast.success("Workspace settings saved.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Workspace settings could not be saved.";
      toast.error(message);
    }
  };

  return (
    <motion.div
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]"
    >
      <motion.section
        variants={cardReveal}
        className="relative overflow-hidden rounded-xl bg-[#1a1f2d] p-8"
      >
        <motion.div
          variants={pulseGlow}
          initial="initial"
          animate="animate"
          className="absolute -right-16 -top-16 size-32 rounded-full bg-[#4fdbc8]/5 blur-3xl"
        />

        <motion.div variants={staggerContainer} className="relative space-y-8">
          <motion.div
            variants={sectionReveal}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <h2 className="font-heading text-xl font-bold text-[#dee2f5]">
                Workspace Details
              </h2>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Core information for the active SiteOrbit workspace.
              </p>
            </div>
            <motion.div whileHover={{ rotate: -10, scale: 1.08 }}>
              <Info className="size-7 text-[#4fdbc8]/40" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={sectionReveal}>
              <Field>
                <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                  Workspace Name
                </FieldLabel>
                <FieldContent>
                  <Input
                    value={form.name}
                    disabled={!canManageSettings}
                    onChange={(event) =>
                      onChange({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    className="h-12 rounded-lg bg-[#090e1b] text-[#dee2f5]"
                  />
                </FieldContent>
              </Field>
            </motion.div>

            <motion.div variants={sectionReveal}>
              <Field>
                <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                  Primary Domain
                </FieldLabel>
                <FieldContent>
                  <Input
                    value={form.primary_domain}
                    disabled={!canManageSettings}
                    onChange={(event) =>
                      onChange({
                        ...form,
                        primary_domain: event.target.value,
                      })
                    }
                    className="h-12 rounded-lg bg-[#090e1b] text-[#dee2f5]"
                  />
                </FieldContent>
              </Field>
            </motion.div>

            <motion.div variants={sectionReveal} className="md:col-span-2">
              <Field className="md:col-span-2">
                <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                  Description
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    rows={4}
                    value={form.description}
                    disabled={!canManageSettings}
                    onChange={(event) =>
                      onChange({
                        ...form,
                        description: event.target.value,
                      })
                    }
                    className="rounded-lg bg-[#090e1b] text-[#dee2f5]"
                  />
                </FieldContent>
              </Field>
            </motion.div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                disabled={!canManageSettings || !hasUnsavedChanges}
                onClick={onReset}
              >
                Reset
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
            >
              <Button
                type="button"
                className="h-11 rounded-md bg-[#4fdbc8] px-5 text-[#03241f] hover:bg-[#46cfbd]"
                disabled={!canManageSettings || !hasUnsavedChanges || isSaving}
                onClick={() => void handleSave()}
              >
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : null}
                Save Workspace
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.aside
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.section
          variants={cardReveal}
          className="rounded-xl bg-[#1a1f2d] p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-[#dee2f5]">
                Access & Permissions
              </h3>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Permission-aware controls for this workspace.
              </p>
            </div>
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }}>
              <Shield className="size-6 text-[#4fdbc8]/45" />
            </motion.div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-[#bbcac6]">
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center justify-between rounded-lg bg-[#090e1b] px-4 py-3"
            >
              <span>Your role</span>
              <Badge
                variant="outline"
                className="border-white/10 capitalize text-[#dee2f5]"
              >
                {currentRole ?? "viewer"}
              </Badge>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center justify-between rounded-lg bg-[#090e1b] px-4 py-3"
            >
              <span>Can manage settings</span>
              <Badge
                variant="outline"
                className={
                  canManageSettings
                    ? "border-[#4fdbc8]/30 text-[#4fdbc8]"
                    : "border-[#f7c97a]/30 text-[#f7c97a]"
                }
              >
                {canManageSettings ? "Yes" : "Read only"}
              </Badge>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          variants={cardReveal}
          className="rounded-xl bg-[#1a1f2d] p-7"
        >
          <h3 className="font-heading text-lg font-semibold text-[#dee2f5]">
            Workspace Guidance
          </h3>
          <FieldDescription className="mt-3 text-[#bbcac6]">
            Update core workspace details here. Branding, domains, and API
            configuration are separated into their own tabs to keep this screen
            easy to scan.
          </FieldDescription>
        </motion.section>
      </motion.aside>
    </motion.div>
  );
}