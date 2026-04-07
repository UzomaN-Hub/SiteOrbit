"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WorkspaceWithRole } from "@/types/workspace";

type WorkspaceState = {
  workspaces: WorkspaceWithRole[];
  activeWorkspaceId: string | null;
  activeWorkspace: WorkspaceWithRole | null;
  setWorkspaces: (workspaces: WorkspaceWithRole[]) => void;
  setActiveWorkspaceId: (workspaceId: string | null) => void;
  setActiveWorkspace: (workspace: WorkspaceWithRole | null) => void;
  clearWorkspaceState: () => void;
};

function resolveActiveWorkspace(
  workspaces: WorkspaceWithRole[],
  activeWorkspaceId: string | null
) {
  if (!workspaces.length) {
    return {
      activeWorkspaceId: null,
      activeWorkspace: null,
    };
  }

  const matched =
    (activeWorkspaceId
      ? workspaces.find((entry) => entry.workspace.id === activeWorkspaceId)
      : null) ?? workspaces[0];

  return {
    activeWorkspaceId: matched.workspace.id,
    activeWorkspace: matched,
  };
}

function areWorkspaceListsEqual(
  a: WorkspaceWithRole[],
  b: WorkspaceWithRole[]
): boolean {
  if (a.length !== b.length) return false;

  return a.every((item, index) => {
    const other = b[index];
    return (
      item.workspace.id === other.workspace.id &&
      item.workspace.name === other.workspace.name &&
      item.workspace.slug === other.workspace.slug &&
      item.workspace.logo === other.workspace.logo &&
      item.workspace.plan === other.workspace.plan &&
      item.workspace.description === other.workspace.description &&
      item.workspace.primary_domain === other.workspace.primary_domain &&
      item.workspace.created_at === other.workspace.created_at &&
      item.workspace.updated_at === other.workspace.updated_at &&
      item.role === other.role
    );
  });
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaces: [],
      activeWorkspaceId: null,
      activeWorkspace: null,

      setWorkspaces: (workspaces) => {
        set((state) => {
          if (areWorkspaceListsEqual(state.workspaces, workspaces)) {
            return state;
          }

          const resolved = resolveActiveWorkspace(
            workspaces,
            state.activeWorkspaceId
          );

          return {
            workspaces,
            activeWorkspaceId: resolved.activeWorkspaceId,
            activeWorkspace: resolved.activeWorkspace,
          };
        });
      },

      setActiveWorkspaceId: (workspaceId) => {
        set((state) => {
          const nextActive =
            workspaceId == null
              ? null
              : state.workspaces.find(
                  (entry) => entry.workspace.id === workspaceId
                ) ?? null;

          if (
            state.activeWorkspaceId === (nextActive?.workspace.id ?? null) &&
            state.activeWorkspace?.workspace.id ===
              (nextActive?.workspace.id ?? null)
          ) {
            return state;
          }

          return {
            activeWorkspaceId: nextActive?.workspace.id ?? null,
            activeWorkspace: nextActive,
          };
        });
      },

      setActiveWorkspace: (workspace) => {
        set((state) => {
          const alreadyExists = workspace
            ? state.workspaces.some(
                (entry) => entry.workspace.id === workspace.workspace.id
              )
            : true;

          return {
            activeWorkspaceId: workspace?.workspace.id ?? null,
            activeWorkspace: workspace,
            workspaces:
              workspace && !alreadyExists
                ? [workspace, ...state.workspaces]
                : state.workspaces,
          };
        });
      },

      clearWorkspaceState: () => {
        set({
          workspaces: [],
          activeWorkspaceId: null,
          activeWorkspace: null,
        });
      },
    }),
    {
      name: "siteorbit-workspace",
      partialize: (state) => ({
        activeWorkspaceId: state.activeWorkspaceId,
      }),
    }
  )
);