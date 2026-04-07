"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type { DashboardOverviewResponse } from "@/types/dashboard";

export function useDashboard() {
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId } = useWorkspace();

  const dashboardQuery = useQuery({
    queryKey: ["dashboard", "overview", activeWorkspaceId, accessToken],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        workspace_id: activeWorkspaceId as string,
      });

      return apiClient.get<DashboardOverviewResponse>(
        `${apiEndpoints.dashboard.overview}?${searchParams.toString()}`,
        {
          token: accessToken,
        }
      );
    },
    enabled: Boolean(accessToken && isAuthenticated && activeWorkspaceId),
    staleTime: 60_000,
    retry: false,
  });

  return {
    dashboardQuery,
    activeWorkspace,
    activeWorkspaceId,
  };
}