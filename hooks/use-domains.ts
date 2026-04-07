"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type { CreateDomainInput, Domain } from "@/types/domain";

export function useDomains() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId, currentRole } = useWorkspace();

  const domainsQuery = useQuery({
    queryKey: ["domains", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<Domain[]>(
        apiEndpoints.workspaces.domains(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const createDomainMutation = useMutation({
    mutationFn: (payload: CreateDomainInput) =>
      apiClient.post<Domain>(
        apiEndpoints.workspaces.domains(activeWorkspaceId as string),
        payload,
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["domains", activeWorkspaceId],
      });
    },
  });

  const canManageDomains = currentRole === "owner" || currentRole === "admin";

  return {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageDomains,
    domainsQuery,
    createDomainMutation,
  };
}