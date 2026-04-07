"use client";

import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiError, apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import type {
  AuthResponse,
  AuthUser,
  LoginInput,
  OAuthAuthorizeResponse,
  OAuthProvider,
  RegisterInput,
} from "@/types/auth";
import { useWorkspaceStore } from "@/store/workspace-store";

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    setSession,
    clearSession,
  } = useAuthStore();

  const { clearWorkspaceState } = useWorkspaceStore();

  const refreshMutation = useMutation({
    mutationFn: async (token: string) =>
      apiClient.post<AuthResponse>(apiEndpoints.auth.refresh, {
        refresh_token: token,
      }),
    onSuccess: (data) => {
      setSession({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
    },
    onError: () => {
      clearSession();
      clearWorkspaceState();
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["workspaces"] });
    },
  });

  const meQuery = useQuery({
    queryKey: ["auth", "me", accessToken],
    queryFn: () =>
      apiClient.get<AuthUser>(apiEndpoints.users.me, {
        token: accessToken,
      }),
    enabled: Boolean(accessToken),
    staleTime: 60_000,
    retry: false,
  });

  useEffect(() => {
    if (!accessToken || !meQuery.isError) return;

    const error = meQuery.error;
    if (!(error instanceof ApiError) || error.status !== 401) return;
    if (!refreshToken || refreshMutation.isPending) return;

    void refreshMutation.mutateAsync(refreshToken);
  }, [
    accessToken,
    meQuery.error,
    meQuery.isError,
    refreshMutation,
    refreshToken,
  ]);

  useEffect(() => {
    if (!meQuery.data || !accessToken || !refreshToken) return;

    const currentUser = meQuery.data;
    const hasChanged =
      !user ||
      user.id !== currentUser.id ||
      user.name !== currentUser.name ||
      user.email !== currentUser.email ||
      user.avatar !== currentUser.avatar ||
      user.created_at !== currentUser.created_at;

    if (hasChanged) {
      setSession({
        user: currentUser,
        accessToken,
        refreshToken,
      });
    }
  }, [accessToken, meQuery.data, refreshToken, setSession, user]);

  const signInMutation = useMutation({
    mutationFn: (payload: LoginInput) =>
      apiClient.post<AuthResponse>(apiEndpoints.auth.login, payload),
    onSuccess: (data) => {
      setSession({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (payload: RegisterInput) =>
      apiClient.post<AuthResponse>(apiEndpoints.auth.register, payload),
    onSuccess: (data) => {
      setSession({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  const oauthExchangeMutation = useMutation({
    mutationFn: (code: string) =>
      apiClient.post<AuthResponse>(apiEndpoints.auth.oauthExchange, { code }),
    onSuccess: (data) => {
      setSession({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  const signOut = async () => {
    try {
      if (accessToken) {
        await apiClient.post<{ message: string }>(
          apiEndpoints.auth.logout,
          undefined,
          {
            token: accessToken,
          }
        );
      }
    } catch {
      // Even if logout fails remotely, clear the local session.
    } finally {
      clearSession();
      clearWorkspaceState();
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["workspaces"] });
    }
  };

  const beginOAuth = async (
    provider: OAuthProvider,
    redirectTo = "/dashboard"
  ) => {
    const response = await apiClient.get<OAuthAuthorizeResponse>(
      apiEndpoints.auth.oauthAuthorize(provider, redirectTo)
    );

    window.location.href = response.authorization_url;
  };

  const isUnauthorized = useMemo(() => {
    if (!meQuery.isError) return false;
    return meQuery.error instanceof ApiError && meQuery.error.status === 401;
  }, [meQuery.error, meQuery.isError]);

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    meQuery,
    signInMutation,
    signUpMutation,
    oauthExchangeMutation,
    beginOAuth,
    signOut,
    isUnauthorized,
  };
}