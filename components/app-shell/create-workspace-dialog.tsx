"use client";

import { useState } from "react";
import { toast } from "sonner";

import { errorMessage } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/hooks/use-workspace";

export default function CreateWorkspaceDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { createWorkspaceMutation } = useWorkspace();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Use at least 2 characters for the workspace name.");
      return;
    }

    try {
      setError(null);
      await createWorkspaceMutation.mutateAsync({ name: trimmed });
      toast.success(`${trimmed} is ready.`);
      setName("");
      onOpenChange(false);
    } catch (submitError) {
      setError(errorMessage(submitError, "The workspace couldn't be created. Try again."));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New workspace</DialogTitle>
          <DialogDescription>
            A workspace holds one client&apos;s sites, team and domains.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
          <Field>
            <FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
            <Input
              id="workspace-name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Acme Studio"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "workspace-name-error" : undefined}
            />
            <FieldError id="workspace-name-error" message={error} />
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="link">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" loading={createWorkspaceMutation.isPending}>
              Create workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
