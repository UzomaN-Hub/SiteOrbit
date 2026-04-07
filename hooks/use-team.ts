"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type { WorkspaceMember, WorkspaceRole } from "@/types/workspace";
import type { CreateInvitationInput, Invitation } from "@/types/invitation";

export function useTeam() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId, currentRole } = useWorkspace();

  const membersQuery = useQuery({
    queryKey: ["team", "members", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<WorkspaceMember[]>(
        apiEndpoints.workspaces.members(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const invitationsQuery = useQuery({
    queryKey: ["team", "invitations", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<Invitation[]>(
        apiEndpoints.workspaces.invitations(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const inviteMemberMutation = useMutation({
    mutationFn: (payload: CreateInvitationInput) =>
      apiClient.post<Invitation>(
        apiEndpoints.workspaces.invitations(activeWorkspaceId as string),
        payload,
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["team", "invitations", activeWorkspaceId],
      });
    },
  });

  const updateMemberRoleMutation = useMutation({
    mutationFn: ({
      memberId,
      role,
    }: {
      memberId: string;
      role: WorkspaceRole;
    }) =>
      apiClient.patch<WorkspaceMember>(
        `${apiEndpoints.workspaces.members(activeWorkspaceId as string)}/${memberId}`,
        { role },
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["team", "members", activeWorkspaceId],
      });
    },
  });

  const canManageTeam = currentRole === "owner" || currentRole === "admin";

  return {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageTeam,
    membersQuery,
    invitationsQuery,
    inviteMemberMutation,
    updateMemberRoleMutation,
  };
}