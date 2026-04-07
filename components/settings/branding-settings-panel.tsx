"use client";

import { ImageIcon, Loader2, Palette, Type } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  cardReveal,
  pageReveal,
  pulseGlow,
  staggerContainer,
  sectionReveal,
} from "@/lib/motion";

export type BrandingFormState = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  heading_font: string;
  body_font: string;
  base_size: string;
  section_gap: string;
  container_width: string;
  card_radius: string;
  button_radius: string;
  input_radius: string;
};

type BrandingSettingsPanelProps = {
  form: BrandingFormState;
  initialForm: BrandingFormState;
  canManageSettings: boolean;
  isSaving: boolean;
  onChange: (next: BrandingFormState) => void;
  onReset: () => void;
  onSave: () => Promise<void>;
};

export default function BrandingSettingsPanel({
  form,
  initialForm,
  canManageSettings,
  isSaving,
  onChange,
  onReset,
  onSave,
}: BrandingSettingsPanelProps) {
  const hasUnsavedChanges =
    JSON.stringify(form) !== JSON.stringify(initialForm);

  const handleSave = async () => {
    try {
      await onSave();
      toast.success("Brand settings saved.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Brand settings could not be saved.";
      toast.error(message);
    }
  };

  return (
    <motion.div
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className="grid gap-8 lg:grid-cols-[1.2fr_1fr]"
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
                Brand System
              </h2>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Theme colors, typography, spacing, and radius values used across
                the workspace.
              </p>
            </div>
            <motion.div whileHover={{ rotate: -10, scale: 1.08 }}>
              <Palette className="size-7 text-[#4fdbc8]/40" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2"
          >
            {[
              ["Primary", "primary"],
              ["Secondary", "secondary"],
              ["Accent", "accent"],
              ["Background", "background"],
              ["Surface", "surface"],
            ].map(([label, key]) => (
              <motion.div key={key} variants={sectionReveal}>
                <Field>
                  <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                    {label}
                  </FieldLabel>
                  <FieldContent>
                    <div className="flex gap-3">
                      <Input
                        type="color"
                        value={form[key as keyof BrandingFormState] as string}
                        disabled={!canManageSettings}
                        onChange={(event) =>
                          onChange({
                            ...form,
                            [key]: event.target.value,
                          })
                        }
                        className="h-12 w-16 rounded-lg bg-[#090e1b] p-2"
                      />
                      <Input
                        value={form[key as keyof BrandingFormState] as string}
                        disabled={!canManageSettings}
                        onChange={(event) =>
                          onChange({
                            ...form,
                            [key]: event.target.value,
                          })
                        }
                        className="h-12 rounded-lg bg-[#090e1b] text-[#dee2f5]"
                      />
                    </div>
                  </FieldContent>
                </Field>
              </motion.div>
            ))}

            {[
              ["Heading Font", "heading_font"],
              ["Body Font", "body_font"],
              ["Base Size", "base_size"],
              ["Section Gap", "section_gap"],
              ["Container Width", "container_width"],
              ["Card Radius", "card_radius"],
              ["Button Radius", "button_radius"],
              ["Input Radius", "input_radius"],
            ].map(([label, key]) => (
              <motion.div key={key} variants={sectionReveal}>
                <Field>
                  <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                    {label}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      value={form[key as keyof BrandingFormState] as string}
                      disabled={!canManageSettings}
                      onChange={(event) =>
                        onChange({
                          ...form,
                          [key]: event.target.value,
                        })
                      }
                      className="h-12 rounded-lg bg-[#090e1b] text-[#dee2f5]"
                    />
                  </FieldContent>
                </Field>
              </motion.div>
            ))}
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

            <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                className="h-11 rounded-md bg-[#4fdbc8] px-5 text-[#03241f] hover:bg-[#46cfbd]"
                disabled={!canManageSettings || !hasUnsavedChanges || isSaving}
                onClick={() => void handleSave()}
              >
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : null}
                Save Branding
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.aside variants={staggerContainer} className="space-y-8">
        <motion.section
          variants={cardReveal}
          className="rounded-xl bg-[#1a1f2d] p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-[#dee2f5]">
                Live Preview Tokens
              </h3>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Quick visual summary of the active workspace theme.
              </p>
            </div>
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }}>
              <Type className="size-6 text-[#4fdbc8]/45" />
            </motion.div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="rounded-lg bg-[#090e1b] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9aa6c0]">
                Colors
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  form.primary,
                  form.secondary,
                  form.accent,
                  form.background,
                  form.surface,
                ].map((value) => (
                  <motion.div
                    key={value}
                    whileHover={{ y: -2, scale: 1.06 }}
                    className="size-10 rounded-full border border-white/10"
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-[#090e1b] p-4 text-sm text-[#bbcac6]">
              <p className="font-semibold text-[#dee2f5]">
                {form.heading_font}
              </p>
              <p className="mt-2">
                Body font: {form.body_font} · Base size: {form.base_size}
              </p>
              <p className="mt-2">
                Container: {form.container_width} · Section gap: {form.section_gap}
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={cardReveal}
          className="rounded-xl bg-[#1a1f2d] p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-[#dee2f5]">
                Brand Assets
              </h3>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Placeholder surface for workspace logo and visual identity
                assets.
              </p>
            </div>
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }}>
              <ImageIcon className="size-6 text-[#4fdbc8]/45" />
            </motion.div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-[#090e1b] p-6 text-center text-sm text-[#9aa6c0]">
            Logo upload can be added next without changing the settings structure.
          </div>
        </motion.section>
      </motion.aside>
    </motion.div>
  );
}