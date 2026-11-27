"use client";

import { useRouter } from "next/navigation";
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
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/use-projects";

export default function NewSiteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { activeWorkspace, activeWorkspaceId, createProjectMutation } = useProjects();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = name.trim();

    if (!activeWorkspaceId) {
      setError("Create or pick a workspace first.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Use at least 2 characters for the site name.");
      return;
    }

    try {
      setError(null);
      const site = await createProjectMutation.mutateAsync({
        workspace_id: activeWorkspaceId,
        name: trimmed,
        description: description.trim() || null,
        status: "draft",
      });
      toast.success(`${site.name} created. Opening the builder.`);
      setName("");
      setDescription("");
      onOpenChange(false);
      router.push(`/builder?projectId=${site.id}`);
    } catch (submitError) {
      setError(errorMessage(submitError, "The site couldn't be created. Try again."));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New site</DialogTitle>
          <DialogDescription>
            Adds a draft site to {activeWorkspace?.workspace.name ?? "this workspace"}.
            You can publish it from the builder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
          <Field>
            <FieldLabel htmlFor="site-name">Site name</FieldLabel>
            <Input
              id="site-name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Harbour Dental"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "site-name-error" : undefined}
            />
            <FieldError id="site-name-error" message={error} />
          </Field>
          <Field>
            <FieldLabel htmlFor="site-description">Description</FieldLabel>
            <Textarea
              id="site-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Booking site for the Leeds clinic"
            />
            <FieldDescription>Optional. Only your team sees this.</FieldDescription>
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" loading={createProjectMutation.isPending}>
              Create site
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
