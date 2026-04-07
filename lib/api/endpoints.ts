export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    oauthAuthorize: (provider: "google" | "github", redirectTo: string) =>
      `/auth/oauth/${provider}/authorize?redirect_to=${encodeURIComponent(redirectTo)}`,
    oauthExchange: "/auth/oauth/exchange",
  },
  users: {
    me: "/users/me",
  },
  workspaces: {
    list: "/workspaces",
    create: "/workspaces",
    byId: (workspaceId: string) => `/workspaces/${workspaceId}`,
    members: (workspaceId: string) => `/workspaces/${workspaceId}/members`,
    memberById: (workspaceId: string, memberId: string) =>
      `/workspaces/${workspaceId}/members/${memberId}`,
    theme: (workspaceId: string) => `/workspaces/${workspaceId}/theme`,
    invitations: (workspaceId: string) => `/workspaces/${workspaceId}/invitations`,
    acceptInvitation: "/workspaces/invitations/accept",
    domains: (workspaceId: string) => `/workspaces/${workspaceId}/domains`,
  },
  projects: {
    list: "/projects",
    create: "/projects",
    byId: (projectId: string) => `/projects/${projectId}`,
    publish: (projectId: string) => `/projects/${projectId}/publish`,
    unpublish: (projectId: string) => `/projects/${projectId}/unpublish`,
  },
  pages: {
    list: "/pages",
    create: "/pages",
    byId: (pageId: string) => `/pages/${pageId}`,
  },
  dashboard: {
    overview: "/dashboard/overview",
  },
  analytics: {
    overview: "/analytics/overview",
  },
};