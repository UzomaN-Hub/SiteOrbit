"use client";

import { useMemo, useState } from "react";
import { MailPlus, ShieldAlert, Users } from "lucide-react";
import { toast } from "sonner";

import { useTeam } from "@/hooks/use-team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription as DialogText,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkspaceRole } from "@/types/workspace";

const roleOptions: WorkspaceRole[] = ["owner", "admin", "editor", "viewer"];

export default function TeamPage() {
  const {
    activeWorkspace,
    currentRole,
    canManageTeam,
    membersQuery,
    invitationsQuery,
    inviteMemberMutation,
    updateMemberRoleMutation,
  } = useTeam();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<WorkspaceRole>("viewer");
  const [inviteError, setInviteError] = useState<string | null>(null);

  const members = membersQuery.data ?? [];
  const invitations = invitationsQuery.data ?? [];

  const pendingInvites = useMemo(
    () => invitations.filter((item) => item.status === "pending"),
    [invitations]
  );

  const handleInvite = async () => {
    const email = inviteEmail.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      setInviteError("Enter a valid email address.");
      return;
    }

    try {
      setInviteError(null);
      await inviteMemberMutation.mutateAsync({
        email,
        role: inviteRole,
      });
      setInviteEmail("");
      setInviteRole("viewer");
      setInviteOpen(false);
      toast.success("Invitation sent successfully.");
    } catch (error) {
      setInviteError(
        error instanceof Error ? error.message : "Invitation could not be sent."
      );
    }
  };

  const handleRoleChange = async (memberId: string, role: WorkspaceRole) => {
    try {
      await updateMemberRoleMutation.mutateAsync({ memberId, role });
      toast.success("Member role updated.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Role could not be updated."
      );
    }
  };

  const workspaceName = activeWorkspace?.workspace.name ?? "this workspace";

  return (
    <>
      <div className="space-y-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Team management
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Keep the right people in orbit.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              Manage collaborators, control roles, and track pending invitations in {workspaceName}.
            </p>
          </div>

          <Button
            type="button"
            className="h-12 rounded-md px-5"
            disabled={!canManageTeam}
            onClick={() => setInviteOpen(true)}
          >
            <MailPlus data-icon="inline-start" />
            Invite Member
          </Button>
        </section>

        {!canManageTeam ? (
          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#1a1f2d] px-4 py-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[#ffcf7d]" />
            <div>
              <p className="font-medium text-[#dee2f5]">Limited access</p>
              <p className="mt-1 text-sm leading-6 text-[#bbcac6]">
                Your current role is <span className="capitalize">{currentRole ?? "viewer"}</span>.
                You can view team information, but only owners and admins can invite
                members or change roles. 
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-xl border-none bg-[#1a1f2d]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="size-5 text-[#4fdbc8]" />
                <CardTitle className="text-xl font-bold text-[#dee2f5]">
                  Members
                </CardTitle>
              </div>
              <CardDescription className="text-[#bbcac6]">
                Role-aware workspace membership with clear visibility. 
              </CardDescription>
            </CardHeader>
            <CardContent>
              {membersQuery.isPending ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-16 animate-pulse rounded-xl bg-[#111522]" />
                  ))}
                </div>
              ) : membersQuery.isError ? (
                <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                  {membersQuery.error instanceof Error
                    ? membersQuery.error.message
                    : "Members could not be loaded."}
                </div>
              ) : members.length ? (
                <div className="overflow-hidden rounded-xl border border-white/8">
                  <div className="grid grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr] gap-4 bg-[#111522] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#859490]">
                    <span>Member</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Status</span>
                  </div>

                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="grid grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr] gap-4 border-t border-white/8 bg-[#151a27] px-4 py-4 text-sm text-[#dee2f5]"
                    >
                      <span className="font-medium">{member.name}</span>
                      <span className="text-[#bbcac6]">{member.email}</span>
                      <div>
                        {canManageTeam ? (
                          <Select
                            value={member.role}
                            onValueChange={(value) =>
                              void handleRoleChange(member.id, value as WorkspaceRole)
                            }
                          >
                            <SelectTrigger className="h-9 border-white/8 bg-[#111522] text-[#dee2f5]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roleOptions.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="capitalize">{member.role}</span>
                        )}
                      </div>
                      <span className="capitalize text-[#4fdbc8]">{member.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                  No team members are visible yet.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl border-none bg-[#1a1f2d]">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Pending invitations
              </CardTitle>
              <CardDescription className="text-[#bbcac6]">
                Invites should be visible immediately with role and status badges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {invitationsQuery.isPending ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-16 animate-pulse rounded-xl bg-[#111522]" />
                ))
              ) : invitationsQuery.isError ? (
                <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                  {invitationsQuery.error instanceof Error
                    ? invitationsQuery.error.message
                    : "Invitations could not be loaded."}
                </div>
              ) : pendingInvites.length ? (
                pendingInvites.map((invite) => (
                  <div key={invite.id} className="rounded-xl bg-[#111522] p-4">
                    <p className="font-medium text-[#dee2f5]">{invite.email}</p>
                    <p className="mt-1 text-sm text-[#9aa6c0]">
                      Role: <span className="capitalize">{invite.role}</span>
                    </p>
                    <p className="mt-1 text-sm text-[#4fdbc8] capitalize">
                      {invite.status}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                  No pending invitations right now.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="border-white/8 bg-[#121826] text-[#dee2f5] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite a new member</DialogTitle>
            <DialogText className="text-[#9aa6c0]">
              Add the right collaborator with the right workspace role.
            </DialogText>
          </DialogHeader>

          <div className="space-y-5">
            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Email address
              </FieldLabel>
              <FieldContent>
                <Input
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder="name@company.com"
                  className="h-12 rounded-xl border-white/8 bg-[#161b29] text-[#dee2f5] placeholder:text-white/20"
                />
                <FieldError errors={inviteError ? [{ message: inviteError }] : []} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Role
              </FieldLabel>
              <FieldContent>
                <Select
                  value={inviteRole}
                  onValueChange={(value) => setInviteRole(value as WorkspaceRole)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-white/8 bg-[#161b29] text-[#dee2f5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <div className="flex justify-end">
              <Button
                type="button"
                className="h-11 rounded-md px-5"
                disabled={inviteMemberMutation.isPending}
                onClick={() => void handleInvite()}
              >
                Invite Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}