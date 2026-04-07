"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { Workspace, WorkspaceCreateInput, WorkspaceWithRole } from "@/types/workspace";

export function useWorkspace() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const workspaceStore = useWorkspaceStore();

  const workspacesQuery = useQuery({
    queryKey: ["workspaces", "list", accessToken],
    queryFn: () =>
      apiClient.get<WorkspaceWithRole[]>(apiEndpoints.workspaces.list, {
        token: accessToken,
      }),
    enabled: Boolean(accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const workspaces = workspacesQuery.data ?? workspaceStore.workspaces;

  const activeWorkspace = useMemo(() => {
    if (!workspaces.length) return null;

    if (workspaceStore.activeWorkspaceId) {
      return (
        workspaces.find(
          (entry) => entry.workspace.id === workspaceStore.activeWorkspaceId
        ) ?? workspaces[0]
      );
    }

    return workspaces[0];
  }, [workspaces, workspaceStore.activeWorkspaceId]);

  const activeWorkspaceId = activeWorkspace?.workspace.id ?? null;
  const currentRole = activeWorkspace?.role ?? null;

  const createWorkspaceMutation = useMutation({
    mutationFn: (payload: WorkspaceCreateInput) =>
      apiClient.post<Workspace>(apiEndpoints.workspaces.create, payload, {
        token: accessToken,
      }),
    onSuccess: async (workspace) => {
      const appended: WorkspaceWithRole = {
        workspace,
        role: "owner",
      };

      const existing = queryClient.getQueryData<WorkspaceWithRole[]>([
        "workspaces",
        "list",
        accessToken,
      ]);

      queryClient.setQueryData<WorkspaceWithRole[]>(
        ["workspaces", "list", accessToken],
        existing ? [...existing, appended] : [appended]
      );

      workspaceStore.setActiveWorkspace(appended);

      await queryClient.invalidateQueries({
        queryKey: ["workspaces", "list", accessToken],
      });
    },
  });

  const shouldPromptWorkspaceCreation =
    workspacesQuery.isSuccess && workspaces.length === 0;

  return {
    workspaces,
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    hasWorkspaces: workspaces.length > 0,
    shouldPromptWorkspaceCreation,
    workspacesQuery,
    createWorkspaceMutation,
    setActiveWorkspaceId: workspaceStore.setActiveWorkspaceId,
  };
}