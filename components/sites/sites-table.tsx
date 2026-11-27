"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, MoreHorizontal, PencilLine, Trash2, Upload, Undo2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StatusDot, type StatusTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRelative } from "@/lib/utils/format";
import type { Project } from "@/types/project";

export function siteTone(status: string): StatusTone {
  const normalized = status.toLowerCase();
  if (normalized === "published") return "live";
  if (normalized === "archived") return "inactive";
  return "draft";
}

type SitesTableProps = {
  sites: Project[];
  canManage: boolean;
  busyId?: string | null;
  onPublish: (site: Project) => void;
  onUnpublish: (site: Project) => void;
  onDelete: (site: Project) => Promise<void>;
};

export function SitesTableSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading sites">
      <div className="h-10 border-b border-border" />
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex h-14 items-center gap-6 border-b border-border">
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="hidden h-3.5 w-24 sm:block" />
          <Skeleton className="size-8 rounded-sm" />
        </div>
      ))}
    </div>
  );
}

export default function SitesTable({
  sites,
  canManage,
  busyId,
  onPublish,
  onUnpublish,
  onDelete,
}: SitesTableProps) {
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <Table>
        <TableHeader>
          <tr>
            <TableHead>Site</TableHead>
            <TableHead className="w-32">Status</TableHead>
            <TableHead className="hidden w-44 sm:table-cell">Last updated</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {sites.map((site) => {
            const tone = siteTone(site.status);
            return (
              <TableRow key={site.id} className="relative">
                <TableCell className="max-w-0">
                  <Link
                    href={`/builder?projectId=${site.id}`}
                    className="block truncate rounded-xs type-ui text-text after:absolute after:inset-0 after:content-['']"
                  >
                    {site.name}
                  </Link>
                  <p className="truncate type-small text-text-muted">
                    {site.description?.trim() || "No description"}
                  </p>
                </TableCell>
                <TableCell>
                  <StatusDot tone={tone} />
                </TableCell>
                <TableCell className="hidden text-text-muted sm:table-cell">
                  <time dateTime={site.updated_at} className="tabular">
                    {formatRelative(site.updated_at)}
                  </time>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="relative z-10"
                        aria-label={`Actions for ${site.name}`}
                        disabled={busyId === site.id}
                      >
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/builder?projectId=${site.id}`}>
                          <PencilLine />
                          Open builder
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/analytics?projectId=${site.id}`}>
                          <BarChart3 />
                          View analytics
                        </Link>
                      </DropdownMenuItem>
                      {canManage ? (
                        <>
                          <DropdownMenuSeparator />
                          {tone === "live" ? (
                            <DropdownMenuItem onSelect={() => onUnpublish(site)}>
                              <Undo2 />
                              Move back to draft
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onSelect={() => onPublish(site)}>
                              <Upload />
                              Publish
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onSelect={() => setPendingDelete(site)}>
                            <Trash2 />
                            Delete site
                          </DropdownMenuItem>
                        </>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <div className="flex flex-col gap-2">
            <AlertDialogTitle>Delete {pendingDelete?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes {pendingDelete?.name} and all of its pages. It can&apos;t be undone.
            </AlertDialogDescription>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <AlertDialogCancel asChild>
              <Button variant="link" disabled={deleting}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="outline"
                loading={deleting}
                onClick={async (event) => {
                  event.preventDefault();
                  if (!pendingDelete) return;
                  setDeleting(true);
                  try {
                    await onDelete(pendingDelete);
                    setPendingDelete(null);
                  } finally {
                    setDeleting(false);
                  }
                }}
              >
                Delete site
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
