"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown, Laptop, Plus, Smartphone, Tablet } from "lucide-react";

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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { BuilderPageRecord, BuilderViewport, SaveStatus } from "@/types/builder";
import type { Project } from "@/types/project";

type Props = {
  project: Project | null;
  page: BuilderPageRecord | null;
  pages: BuilderPageRecord[];
  viewport: BuilderViewport;
  saveStatus: SaveStatus;
  isPreviewMode: boolean;
  canEdit: boolean;
  isSaving: boolean;
  isPublishing: boolean;
  isCreatingPage: boolean;
  onSelectViewport: (viewport: BuilderViewport) => void;
  onTogglePreview: () => void;
  onSave: () => void;
  onPublish: () => void;
  onChangePage: (pageId: string) => void;
  onCreatePage: () => void;
};

const viewports: { value: BuilderViewport; label: string; icon: typeof Laptop }[] = [
  { value: "desktop", label: "Desktop", icon: Laptop },
  { value: "tablet", label: "Tablet", icon: Tablet },
  { value: "mobile", label: "Phone", icon: Smartphone },
];

const saveLabels: Record<SaveStatus, string> = {
  idle: "All changes saved",
  saved: "All changes saved",
  saving: "Saving…",
  unsaved: "Unsaved changes",
  error: "Couldn't save. Try again.",
};

export default function BuilderToolbar(props: Props) {
  const { project, page, pages, viewport, saveStatus, isPreviewMode, canEdit } = props;
  const isLive = project?.status === "published";

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-bg px-2 sm:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <Button asChild variant="ghost" size="sm" className="px-2">
          <Link href="/dashboard">
            <ArrowLeft />
            <span className="hidden sm:inline">Sites</span>
          </Link>
        </Button>
        <span aria-hidden="true" className="text-text-faint">
          /
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="min-w-0 gap-1.5 px-2">
              <span className="truncate">{project?.name ?? "Untitled site"}</span>
              {page ? (
                <span className="hidden truncate font-normal text-text-muted md:inline">
                  {page.title}
                </span>
              ) : null}
              <ChevronDown className="size-3.5! text-text-muted" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Pages</DropdownMenuLabel>
            {pages.map((item) => (
              <DropdownMenuCheckItem
                key={item.id}
                checked={item.id === page?.id}
                onSelect={() => props.onChangePage(item.id)}
              >
                <span className="truncate">{item.title}</span>
                <span className="ml-auto truncate type-small text-text-muted">{item.path}</span>
              </DropdownMenuCheckItem>
            ))}
            {canEdit ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={props.isCreatingPage} onSelect={props.onCreatePage}>
                  <Plus />
                  New page
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
        <p
          aria-live="polite"
          className={cn(
            "hidden truncate type-small lg:block",
            saveStatus === "unsaved" || saveStatus === "error" ? "text-text" : "text-text-muted"
          )}
        >
          {canEdit ? saveLabels[saveStatus] : "View only"}
        </p>
      </div>

      <div
        role="group"
        aria-label="Preview size"
        className="hidden items-center gap-0.5 md:flex"
      >
        {viewports.map(({ value, label, icon: Icon }) => (
          <Tooltip key={value}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={label}
                aria-pressed={viewport === value}
                onClick={() => props.onSelectViewport(value)}
                className={viewport === value ? "text-text" : "text-text-muted"}
              >
                <Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        {canEdit && saveStatus !== "idle" && saveStatus !== "saved" ? (
          <Button
            variant="ghost"
            size="sm"
            loading={props.isSaving}
            disabled={!page}
            onClick={props.onSave}
          >
            Save
          </Button>
        ) : null}
        <Button variant="outline" size="sm" aria-pressed={isPreviewMode} onClick={props.onTogglePreview}>
          {isPreviewMode ? "Edit" : "Preview"}
        </Button>
        {canEdit ? (
          <Button
            size="sm"
            loading={props.isPublishing}
            disabled={!project}
            onClick={props.onPublish}
          >
            {isLive ? "Publish changes" : "Publish"}
          </Button>
        ) : null}
      </div>
    </header>
  );
}
