"use client";

import { useMemo, useState } from "react";
import { Lock, Plus } from "lucide-react";
import { toast } from "sonner";

import ErrorState, { errorMessage } from "@/components/shared/error-state";
import PageHeader from "@/components/shared/page-header";
import InviteDialog from "@/components/team/invite-dialog";
import { Avatar } from "@/components/ui/avatar";
import { StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useTeam } from "@/hooks/use-team";
import { roleOptions } from "@/lib/constants/roles";
import { formatRelative } from "@/lib/utils/format";
import type { WorkspaceRole } from "@/types/workspace";

function RowsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div aria-busy="true" className="border-t border-border">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex h-14 items-center gap-3 border-b border-border">
          <Skeleton className="size-8 rounded-full" data-allow-round />
          <Skeleton className="h-3.5 w-40" />
          <Skeleton className="ml-auto h-3.5 w-20" />
        </div>
      ))}
    </div>
  );
}

export default function TeamPage() {
  const {
    activeWorkspace,
    currentRole,
    canManageTeam,
    membersQuery,
    invitationsQuery,
    updateMemberRoleMutation,
  } = useTeam();
  const [inviteOpen, setInviteOpen] = useState(false);

  useDocumentTitle(activeWorkspace ? `Team · ${activeWorkspace.workspace.name}` : "Team");

  const members = membersQuery.data ?? [];
  const pendingInvites = useMemo(
    () => (invitationsQuery.data ?? []).filter((invite) => invite.status === "pending"),
    [invitationsQuery.data]
  );

  const changeRole = async (memberId: string, name: string, role: WorkspaceRole) => {
    try {
      await updateMemberRoleMutation.mutateAsync({ memberId, role });
      toast.success(`${name} is now ${role === "admin" || role === "owner" ? "an" : "a"} ${role}.`);
    } catch (error) {
      toast.error(errorMessage(error, `${name}'s role couldn't be changed. Try again.`));
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        title="Team"
        description={`People who can work on ${activeWorkspace?.workspace.name ?? "this workspace"}, and what each of them can do.`}
        action={
          canManageTeam ? (
            <Button onClick={() => setInviteOpen(true)}>
              <Plus />
              Invite member
            </Button>
          ) : null
        }
      >
        {!canManageTeam && currentRole ? (
          <p className="flex items-center gap-2 type-small text-text-muted">
            <Lock className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            Only owners and admins can invite people or change roles.
          </p>
        ) : null}
      </PageHeader>

      <section className="flex flex-col gap-4" aria-labelledby="members-title">
        <h2 id="members-title" className="type-h3 text-text">
          Members
        </h2>
        {membersQuery.isPending ? (
          <RowsSkeleton />
        ) : membersQuery.isError ? (
          <ErrorState
            title="Members didn't load"
            error={membersQuery.error}
            onRetry={() => void membersQuery.refetch()}
          />
        ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="w-40">Role</TableHead>
                <TableHead className="hidden w-28 sm:table-cell">Status</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="max-w-0">
                    <div className="flex items-center gap-3">
                      <Avatar name={member.name} src={member.avatar} size={32} />
                      <div className="min-w-0">
                        <p className="truncate">{member.name}</p>
                        <p className="truncate type-small text-text-muted md:hidden">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-text-muted md:table-cell">
                    {member.email}
                  </TableCell>
                  <TableCell>
                    {canManageTeam ? (
                      <Select
                        value={member.role}
                        onValueChange={(value) =>
                          void changeRole(member.id, member.name, value as WorkspaceRole)
                        }
                      >
                        <SelectTrigger
                          size="sm"
                          className="w-32 capitalize"
                          aria-label={`Role for ${member.name}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem key={role} value={role}>
                              <span className="capitalize">{role}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="capitalize">{member.role}</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDot
                      tone={member.status === "active" ? "live" : "pending"}
                      label={member.status === "active" ? "Active" : "Pending"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="invites-title">
        <h2 id="invites-title" className="type-h3 text-text">
          Pending invitations
        </h2>
        {invitationsQuery.isPending ? (
          <RowsSkeleton rows={2} />
        ) : invitationsQuery.isError ? (
          <ErrorState
            title="Invitations didn't load"
            error={invitationsQuery.error}
            onRetry={() => void invitationsQuery.refetch()}
          />
        ) : pendingInvites.length ? (
          <Table>
            <TableHeader>
              <tr>
                <TableHead>Email</TableHead>
                <TableHead className="w-40">Role</TableHead>
                <TableHead className="hidden w-40 sm:table-cell">Sent</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {pendingInvites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="max-w-0 truncate">{invite.email}</TableCell>
                  <TableCell className="capitalize">{invite.role}</TableCell>
                  <TableCell className="hidden text-text-muted sm:table-cell">
                    {formatRelative(invite.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="border-y border-border py-6 type-body text-text-muted">
            No invitations waiting. People you invite show up here until they accept.
          </p>
        )}
      </section>

      <InviteDialog open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  );
}
