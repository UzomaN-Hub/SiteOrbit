"use client";

import { Check, ChevronsUpDown, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useWorkspace } from "@/hooks/use-workspace";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function getPlanLabel(plan?: string | null) {
  if (!plan) return "Free";
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

export default function WorkspaceSwitcher() {
  const {
    workspaces,
    activeWorkspace,
    setActiveWorkspaceId,
    createWorkspaceMutation,
  } = useWorkspace();

  const [isOpen, setIsOpen] = useState(false);

 
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");

  const displayWorkspace = activeWorkspace?.workspace ?? null;
  const displayName = displayWorkspace?.name ?? "Select workspace";
  const displayPlan = getPlanLabel(displayWorkspace?.plan);

 
  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) return;

    try {
      await createWorkspaceMutation.mutateAsync({
        name: workspaceName.trim(),
      });

      toast.success("Workspace created successfully.");
      setWorkspaceName("");
      setIsCreateOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Workspace could not be created."
      );
    }
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-full justify-between rounded-xl border-white/8 bg-[#111522] px-3 text-left text-[#dee2f5] hover:bg-[#171c2a]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#172c29] text-[#4fdbc8]">
                <Sparkles className="size-4" />
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">
                  {displayName}
                </div>
                <div className="truncate text-xs text-[#9aa6c0]">
                  {activeWorkspace?.role
                    ? `${activeWorkspace.role} • ${displayPlan}`
                    : displayPlan}
                </div>
              </div>
            </div>

            <ChevronsUpDown className="size-4 shrink-0 text-[#9aa6c0]" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[280px] rounded-xl border-white/8 bg-[#1a1f2d] text-[#dee2f5]"
        >
          <div className="px-2 py-2">
            <div className="text-xs uppercase tracking-[0.18em] text-[#7f8aa3]">
              Workspaces
            </div>
          </div>

          <DropdownMenuGroup>
            {workspaces.map((entry) => {
              const isActive =
                entry.workspace.id === activeWorkspace?.workspace.id;

              return (
                <DropdownMenuItem
                  key={entry.workspace.id}
                  onClick={() => setActiveWorkspaceId(entry.workspace.id)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 focus:bg-[#252a38] focus:text-white",
                    isActive && "bg-[#202634]"
                  )}
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">
                      {entry.workspace.name}
                    </div>
                    <div className="truncate text-xs text-[#9aa6c0]">
                      {entry.role} • {getPlanLabel(entry.workspace.plan)}
                    </div>
                  </div>

                  <div className="ml-3 flex items-center gap-2">
                    {entry.workspace.plan?.toLowerCase() !== "free" ? (
                      <Badge className="rounded-full bg-[#182b28] text-[#4fdbc8]">
                        {getPlanLabel(entry.workspace.plan)}
                      </Badge>
                    ) : null}
                    {isActive ? (
                      <Check className="size-4 text-[#4fdbc8]" />
                    ) : null}
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-white/8" />

          <DropdownMenuItem
            onClick={() => setIsCreateOpen(true)} // ✅ OPEN MODAL
            disabled={createWorkspaceMutation.isPending}
            className="rounded-lg px-3 py-2 focus:bg-[#252a38] focus:text-white"
          >
            <Plus className="mr-2 size-4" />
            {createWorkspaceMutation.isPending
              ? "Creating workspace..."
              : "Create workspace"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-[#1a1f2d] text-[#dee2f5] border-white/10">
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="bg-[#090e1b]"
            autoFocus
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={() => void handleCreateWorkspace()}
              disabled={createWorkspaceMutation.isPending}
            >
              {createWorkspaceMutation.isPending
                ? "Creating..."
                : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}