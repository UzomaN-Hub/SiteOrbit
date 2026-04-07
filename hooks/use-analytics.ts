"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import type {
  AnalyticsOverviewResponse,
  AnalyticsRange,
} from "@/types/analytics";

export function useAnalytics(projectId: string | null) {
  const { accessToken, isAuthenticated } = useAuthStore();
  const [range, setRange] = useState<AnalyticsRange>("30d");

  const analyticsQuery = useQuery({
    queryKey: ["analytics", "overview", projectId, range, accessToken],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        site_id: projectId as string,
        range,
      });

      return apiClient.get<AnalyticsOverviewResponse>(
        `${apiEndpoints.analytics.overview}?${searchParams.toString()}`,
        {
          token: accessToken,
        }
      );
    },
    enabled: Boolean(projectId && accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const data = useMemo(
    () =>
      analyticsQuery.data ?? {
        metrics: [],
        traffic: [],
        sources: [],
        top_pages: [],
      },
    [analyticsQuery.data]
  );

  return {
    range,
    setRange,
    analyticsQuery,
    data,
  };
}