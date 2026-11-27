"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";

import CreateWorkspaceDialog from "@/components/app-shell/create-workspace-dialog";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/hooks/use-hydrated";
import { useWorkspace } from "@/hooks/use-workspace";

export default function WorkspaceSwitcher() {
  const hydrated = useHydrated();
  const { workspaces, activeWorkspace, setActiveWorkspaceId, workspacesQuery } =
    useWorkspace();
  const [createOpen, setCreateOpen] = useState(false);

  if (!hydrated || (workspacesQuery.isPending && !workspaces.length)) {
    return <Skeleton className="h-5 w-32" />;
  }

  const name = activeWorkspace?.workspace.name ?? "No workspace";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="min-w-0 gap-2 px-2"
          >
            <Avatar kind="workspace" size={20} name={activeWorkspace?.workspace.name} />
            <span className="max-w-[40vw] truncate sm:max-w-60">{name}</span>
            <span className="sr-only">, switch workspace</span>
            <ChevronsUpDown className="size-3.5! text-text-muted" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          {workspaces.map((entry) => (
            <DropdownMenuCheckItem
              key={entry.workspace.id}
              checked={entry.workspace.id === activeWorkspace?.workspace.id}
              onSelect={() => setActiveWorkspaceId(entry.workspace.id)}
            >
              <Avatar kind="workspace" size={20} name={entry.workspace.name} />
              <span className="truncate">{entry.workspace.name}</span>
              <span className="ml-auto type-small text-text-muted capitalize">
                {entry.role}
              </span>
            </DropdownMenuCheckItem>
          ))}
          {workspaces.length ? <DropdownMenuSeparator /> : null}
          <DropdownMenuItem onSelect={() => setCreateOpen(true)}>
            <Plus />
            New workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateWorkspaceDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
