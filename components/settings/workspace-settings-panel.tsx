"use client";

import { toast } from "sonner";

import { errorMessage } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type WorkspaceFormState = {
  name: string;
  primary_domain: string;
  description: string;
};

type Props = {
  form: WorkspaceFormState;
  initialForm: WorkspaceFormState;
  canManageSettings: boolean;
  isSaving: boolean;
  onChange: (next: WorkspaceFormState) => void;
  onReset: () => void;
  onSave: () => Promise<void>;
};

export default function WorkspaceSettingsPanel({
  form,
  initialForm,
  canManageSettings,
  isSaving,
  onChange,
  onReset,
  onSave,
}: Props) {
  const dirty = JSON.stringify(form) !== JSON.stringify(initialForm);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onSave();
      toast.success("Workspace details saved.");
    } catch (error) {
      toast.error(errorMessage(error, "Workspace details couldn't be saved. Try again."));
    }
  };

  return (
    <form onSubmit={save}>
      <Card>
        <CardHeader>
          <CardTitle>Workspace details</CardTitle>
          <CardDescription>Your team sees these. Clients never do.</CardDescription>
        </CardHeader>
        <fieldset disabled={!canManageSettings} className="grid gap-6 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="ws-name">Workspace name</FieldLabel>
            <Input
              id="ws-name"
              value={form.name}
              onChange={(event) => onChange({ ...form, name: event.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="ws-domain">Primary domain</FieldLabel>
            <Input
              id="ws-domain"
              value={form.primary_domain}
              spellCheck={false}
              placeholder="www.example.com"
              onChange={(event) => onChange({ ...form, primary_domain: event.target.value })}
            />
          </Field>
          <Field className="md:col-span-2">
            <FieldLabel htmlFor="ws-description">Description</FieldLabel>
            <Textarea
              id="ws-description"
              rows={4}
              value={form.description}
              onChange={(event) => onChange({ ...form, description: event.target.value })}
            />
            <FieldDescription>Optional. A note about who this workspace is for.</FieldDescription>
          </Field>
        </fieldset>
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
    </form>
  );
}
