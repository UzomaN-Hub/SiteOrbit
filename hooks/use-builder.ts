"use client";

import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useBuilderStore } from "@/store/builder-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type {
  BuilderPageCreateInput,
  BuilderPageLayout,
  BuilderPageListResponse,
  BuilderPageRecord,
  BuilderPageUpdateInput,
} from "@/types/builder";
import type { Project } from "@/types/project";

function parseLayoutJson(layoutJson: string | null): BuilderPageLayout {
  if (!layoutJson) {
    return { blocks: [] };
  }

  try {
    const parsed = JSON.parse(layoutJson) as BuilderPageLayout;
    return {
      blocks: Array.isArray(parsed.blocks) ? parsed.blocks : [],
    };
  } catch {
    return { blocks: [] };
  }
}

export function useBuilder(projectId?: string | null, pageId?: string | null) {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { currentRole } = useWorkspace();
  const builderStore = useBuilderStore();

  const projectQuery = useQuery({
    queryKey: ["project", "detail", projectId, accessToken],
    queryFn: () =>
      apiClient.get<Project>(apiEndpoints.projects.byId(projectId as string), {
        token: accessToken,
      }),
    enabled: Boolean(projectId && accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const pagesQuery = useQuery({
    queryKey: ["pages", "list", projectId, accessToken],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        site_id: projectId as string,
      });

      const response = await apiClient.get<BuilderPageListResponse>(
        `${apiEndpoints.pages.list}?${searchParams.toString()}`,
        {
          token: accessToken,
        }
      );

      return response.items;
    },
    enabled: Boolean(projectId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const createPageMutation = useMutation({
    mutationFn: (payload: BuilderPageCreateInput) =>
      apiClient.post<BuilderPageRecord>(apiEndpoints.pages.create, payload, {
        token: accessToken,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["pages", "list", projectId],
      });
    },
  });

  const savePageMutation = useMutation({
    mutationFn: ({
      pageId,
      payload,
    }: {
      pageId: string;
      payload: BuilderPageUpdateInput;
    }) =>
      apiClient.patch<BuilderPageRecord>(apiEndpoints.pages.byId(pageId), payload, {
        token: accessToken,
      }),
    onMutate: () => {
      builderStore.setSaveStatus("saving");
    },
    onSuccess: async (_, variables) => {
      builderStore.setSaveStatus("saved");
      await queryClient.invalidateQueries({
        queryKey: ["pages", "list", projectId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["page", "detail", variables.pageId],
      });
    },
    onError: () => {
      builderStore.setSaveStatus("error");
    },
  });

  const pageDetailQuery = useQuery({
    queryKey: ["page", "detail", pageId, accessToken],
    queryFn: () =>
      apiClient.get<BuilderPageRecord>(apiEndpoints.pages.byId(pageId as string), {
        token: accessToken,
      }),
    enabled: Boolean(pageId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const pages = pagesQuery.data ?? [];
  const resolvedPage =
    pageDetailQuery.data ??
    (pageId ? pages.find((page) => page.id === pageId) : null) ??
    pages[0] ??
    null;

  const parsedLayout = useMemo(
    () => parseLayoutJson(resolvedPage?.layout_json ?? null),
    [resolvedPage?.layout_json]
  );

  useEffect(() => {
    if (!resolvedPage) return;
    if (builderStore.hydratedFromPageId === resolvedPage.id) return;

    builderStore.hydrateFromLayout(resolvedPage.id, parsedLayout);
  }, [builderStore, parsedLayout, resolvedPage]);

  const canEdit =
    currentRole === "owner" || currentRole === "admin" || currentRole === "editor";

  const hasUnsavedChanges = builderStore.saveStatus === "unsaved";

  const ensureDefaultPage = async () => {
    if (!projectId) return null;
    if (pagesQuery.isPending) return null;
    if (pages.length > 0) return pages[0];

    return createPageMutation.mutateAsync({
      site_id: projectId,
      title: "Homepage",
      path: "/",
      layout_json: JSON.stringify({ blocks: [] }),
    });
  };

  const saveCurrentPage = async () => {
    if (!resolvedPage) return;

    await savePageMutation.mutateAsync({
      pageId: resolvedPage.id,
      payload: {
        layout_json: builderStore.getLayoutJson(),
      },
    });
  };

  return {
    ...builderStore,
    currentRole,
    canEdit,
    hasUnsavedChanges,
    projectQuery,
    pagesQuery,
    pageDetailQuery,
    createPageMutation,
    savePageMutation,
    project: projectQuery.data ?? null,
    pages,
    currentPage: resolvedPage,
    parsedLayout,
    ensureDefaultPage,
    saveCurrentPage,
  };
}