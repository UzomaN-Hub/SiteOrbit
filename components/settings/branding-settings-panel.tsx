"use client";

import { toast } from "sonner";

import { errorMessage } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { brandingDefaults } from "@/lib/constants/branding";

export type BrandingFormState = { -readonly [K in keyof typeof brandingDefaults]: string };

type Props = {
  form: BrandingFormState;
  initialForm: BrandingFormState;
  canManageSettings: boolean;
  isSaving: boolean;
  onChange: (next: BrandingFormState) => void;
  onReset: () => void;
  onSave: () => Promise<void>;
};

const colorFields: [string, keyof BrandingFormState][] = [
  ["Primary", "primary"],
  ["Secondary", "secondary"],
  ["Accent", "accent"],
  ["Background", "background"],
  ["Surface", "surface"],
];

const typeFields: [string, keyof BrandingFormState, string?][] = [
  ["Heading font", "heading_font"],
  ["Body font", "body_font"],
  ["Base text size", "base_size", "16px"],
];

const layoutFields: [string, keyof BrandingFormState][] = [
  ["Space between sections", "section_gap"],
  ["Content width", "container_width"],
  ["Card corners", "card_radius"],
  ["Button corners", "button_radius"],
  ["Field corners", "input_radius"],
];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  const id = `brand-group-${title.toLowerCase()}`;
  return (
    <div
      role="group"
      aria-labelledby={id}
      className="flex flex-col gap-4 border-t border-border pt-6 first:border-t-0 first:pt-0"
    >
      <h4 id={id} className="type-ui text-text">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function BrandingSettingsPanel({
  form,
  initialForm,
  canManageSettings,
  isSaving,
  onChange,
  onReset,
  onSave,
}: Props) {
  const dirty = JSON.stringify(form) !== JSON.stringify(initialForm);
  const set = (key: keyof BrandingFormState, value: string) => onChange({ ...form, [key]: value });

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onSave();
      toast.success("Brand settings saved.");
    } catch (error) {
      toast.error(errorMessage(error, "Brand settings couldn't be saved. Try again."));
    }
  };

  return (
    <form onSubmit={save} className="grid items-start gap-6 lg:grid-cols-[3fr_2fr]">
      <Card>
        <CardHeader>
          <CardTitle>Client brand</CardTitle>
          <CardDescription>
            Colours, type and spacing used by every site in this workspace.
          </CardDescription>
        </CardHeader>
        <div className="flex flex-col gap-6" aria-disabled={!canManageSettings || undefined}>
          <Group title="Colours">
            <div className="grid gap-4 sm:grid-cols-2">
              {colorFields.map(([label, key]) => (
                <Field key={key}>
                  <FieldLabel htmlFor={`brand-${key}`}>{label}</FieldLabel>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      aria-label={`${label} colour picker`}
                      value={form[key]}
                      disabled={!canManageSettings}
                      onChange={(event) => set(key, event.target.value)}
                      className="h-10 w-12 shrink-0 cursor-pointer rounded-sm border border-border bg-surface-1 p-1 disabled:cursor-not-allowed"
                    />
                    <Input
                      id={`brand-${key}`}
                      value={form[key]}
                      spellCheck={false}
                      disabled={!canManageSettings}
                      onChange={(event) => set(key, event.target.value)}
                      className="tabular uppercase"
                    />
                  </div>
                </Field>
              ))}
            </div>
          </Group>
          <Group title="Type">
            <div className="grid gap-4 sm:grid-cols-3">
              {typeFields.map(([label, key]) => (
                <Field key={key}>
                  <FieldLabel htmlFor={`brand-${key}`}>{label}</FieldLabel>
                  <Input
                    id={`brand-${key}`}
                    value={form[key]}
                    disabled={!canManageSettings}
                    onChange={(event) => set(key, event.target.value)}
                  />
                </Field>
              ))}
            </div>
          </Group>
          <Group title="Layout">
            <div className="grid gap-4 sm:grid-cols-2">
              {layoutFields.map(([label, key]) => (
                <Field key={key}>
                  <FieldLabel htmlFor={`brand-${key}`}>{label}</FieldLabel>
                  <Input
                    id={`brand-${key}`}
                    value={form[key]}
                    disabled={!canManageSettings}
                    onChange={(event) => set(key, event.target.value)}
                    className="tabular"
                  />
                </Field>
              ))}
            </div>
          </Group>
        </div>
        {canManageSettings ? (
          <CardFooter>
            <Button type="button" variant="link" disabled={!dirty || isSaving} onClick={onReset}>
              Discard changes
            </Button>
            <Button type="submit" disabled={!dirty} loading={isSaving}>
              Save changes
            </Button>
          </CardFooter>
        ) : null}
      </Card>

      {/* Preview uses the client's own values, so inline styles are expected here. */}
      <aside className="flex flex-col gap-3 lg:sticky lg:top-32" aria-label="Brand preview">
        <p className="type-label text-text-muted">Preview</p>
        <div
          className="overflow-hidden rounded-md border border-border"
          style={{ background: form.background, fontSize: form.base_size }}
        >
          <div className="flex flex-col gap-3 p-6" style={{ color: form.primary }}>
            <p style={{ fontFamily: form.heading_font, fontSize: "1.5em", lineHeight: 1.2 }}>
              A heading in {form.heading_font}
            </p>
            <p style={{ fontFamily: form.body_font, opacity: 0.8 }}>
              Body copy in {form.body_font} at {form.base_size}.
            </p>
            <div className="mt-2 flex flex-wrap gap-2" style={{ fontFamily: form.body_font }}>
              <span
                className="px-4 py-2"
                style={{
                  background: form.primary,
                  color: form.background,
                  borderRadius: form.button_radius,
                }}
              >
                Primary button
              </span>
              <span
                className="px-4 py-2"
                style={{ background: form.accent, color: form.primary, borderRadius: form.button_radius }}
              >
                Accent
              </span>
            </div>
            <div
              className="mt-2 p-4"
              style={{ background: form.surface, borderRadius: form.card_radius }}
            >
              <span style={{ fontFamily: form.body_font, fontSize: "0.875em" }}>A card on the surface colour</span>
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}
