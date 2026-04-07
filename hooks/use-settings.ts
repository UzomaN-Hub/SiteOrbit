"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type { Theme, ThemeUpdateInput } from "@/types/theme";
import type { Workspace, WorkspaceUpdateInput } from "@/types/workspace";

export function useSettings() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId, currentRole } = useWorkspace();

  const workspaceQuery = useQuery({
    queryKey: ["settings", "workspace", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<Workspace>(
        apiEndpoints.workspaces.byId(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const themeQuery = useQuery({
    queryKey: ["settings", "theme", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<Theme>(
        apiEndpoints.workspaces.theme(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const updateWorkspaceMutation = useMutation({
    mutationFn: (payload: WorkspaceUpdateInput) =>
      apiClient.patch<Workspace>(
        apiEndpoints.workspaces.byId(activeWorkspaceId as string),
        payload,
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["settings", "workspace", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });

  const updateThemeMutation = useMutation({
    mutationFn: (payload: ThemeUpdateInput) =>
      apiClient.patch<Theme>(
        apiEndpoints.workspaces.theme(activeWorkspaceId as string),
        payload,
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["settings", "theme", activeWorkspaceId],
      });
    },
  });

  const canManageSettings = currentRole === "owner" || currentRole === "admin";

  return {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageSettings,
    workspaceQuery,
    themeQuery,
    updateWorkspaceMutation,
    updateThemeMutation,
  };
}