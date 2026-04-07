"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type {
  CreateProjectInput,
  Project,
  ProjectListResponse,
  ProjectPublishResponse,
  ProjectStatus,
  UpdateProjectInput,
} from "@/types/project";

export function useProjects() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId, currentRole } = useWorkspace();

  const projectsQuery = useQuery({
    queryKey: ["projects", "list", activeWorkspaceId, accessToken],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        workspace_id: activeWorkspaceId as string,
      });

      const response = await apiClient.get<ProjectListResponse>(
        `${apiEndpoints.projects.list}?${searchParams.toString()}`,
        {
          token: accessToken,
        }
      );

      return response.items;
    },
    enabled: Boolean(accessToken && isAuthenticated && activeWorkspaceId),
    staleTime: 60_000,
    retry: false,
  });

  const createProjectMutation = useMutation({
    mutationFn: (payload: CreateProjectInput) =>
      apiClient.post<Project>(apiEndpoints.projects.create, payload, {
        token: accessToken,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: UpdateProjectInput;
    }) =>
      apiClient.patch<Project>(apiEndpoints.projects.byId(projectId), payload, {
        token: accessToken,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const publishProjectMutation = useMutation({
    mutationFn: (projectId: string) =>
      apiClient.post<ProjectPublishResponse>(
        apiEndpoints.projects.publish(projectId),
        undefined,
        {
          token: accessToken,
        }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const unpublishProjectMutation = useMutation({
    mutationFn: (projectId: string) =>
      apiClient.post<ProjectPublishResponse>(
        apiEndpoints.projects.unpublish(projectId),
        undefined,
        {
          token: accessToken,
        }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (projectId: string) =>
      apiClient.delete<void>(apiEndpoints.projects.byId(projectId), {
        token: accessToken,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const canManageProjects =
    currentRole === "owner" || currentRole === "admin" || currentRole === "editor";

  return {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageProjects,
    projectsQuery,
    createProjectMutation,
    updateProjectMutation,
    publishProjectMutation,
    unpublishProjectMutation,
    deleteProjectMutation,
  };
}

export function normalizeProjectStatus(status: string): ProjectStatus {
  const lowered = status.toLowerCase();

  if (lowered === "published") return "published";
  if (lowered === "archived") return "archived";
  return "draft";
}