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
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeam } from "@/hooks/use-team";
import { roleDescriptions, roleOptions } from "@/lib/constants/roles";
import type { WorkspaceRole } from "@/types/workspace";

export default function InviteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { activeWorkspace, inviteMemberMutation } = useTeam();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WorkspaceRole>("editor");
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("That doesn't look like an email address. Check for typos.");
      return;
    }

    try {
      setError(null);
      await inviteMemberMutation.mutateAsync({ email: value, role });
      toast.success(`Invite sent to ${value}.`);
      setEmail("");
      setRole("editor");
      onOpenChange(false);
    } catch (submitError) {
      setError(errorMessage(submitError, "The invite couldn't be sent. Try again."));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite member</DialogTitle>
          <DialogDescription>
            They&apos;ll get access to {activeWorkspace?.workspace.name ?? "this workspace"} once
            they accept.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} noValidate className="flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="invite-email">Email</FieldLabel>
            <Input
              id="invite-email"
              type="email"
              autoComplete="off"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@agency.com"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "invite-email-error" : undefined}
            />
            <FieldError id="invite-email-error" message={error} />
          </Field>
          <Field>
            <FieldLabel id="invite-role-label">Role</FieldLabel>
            <Select value={role} onValueChange={(value) => setRole(value as WorkspaceRole)}>
              <SelectTrigger aria-labelledby="invite-role-label">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    <span className="capitalize">{option}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>{roleDescriptions[role]}</FieldDescription>
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="link">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" loading={inviteMemberMutation.isPending}>
              Send invite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
