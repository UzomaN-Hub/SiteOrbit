"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  Globe,
  Loader2,
  PencilLine,
  Trash2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardReveal, easeBezier, subtlePulse } from "@/lib/motion";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  canManage: boolean;
  onPublish: (projectId: string) => void;
  onUnpublish: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  isPublishing?: boolean;
  isUnpublishing?: boolean;
  isDeleting?: boolean;
};

function getStatusClasses(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "published") {
    return "bg-[#12251f] text-[#4fdbc8]";
  }

  if (normalized === "archived") {
    return "bg-[#2a2430] text-[#d7b4ff]";
  }

  return "bg-[#2a2418] text-[#ffcf7d]";
}

function formatUpdatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";

  return `Updated ${date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}`;
}

export default function ProjectCard({
  project,
  canManage,
  onPublish,
  onUnpublish,
  onDelete,
  isPublishing = false,
  isUnpublishing = false,
  isDeleting = false,
}: ProjectCardProps) {
  const isPublished = project.status === "published";
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="truncate text-xl font-bold text-[#dee2f5]">
                {project.name}
              </CardTitle>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: easeBezier }}
                className="mt-2 line-clamp-2 text-sm leading-6 text-[#bbcac6]"
              >
                {project.description?.trim() || "No project description added yet."}
              </motion.p>
            </div>

            <motion.span
              layout
              variants={isPublishing || isUnpublishing ? subtlePulse : undefined}
              initial={isPublishing || isUnpublishing ? "initial" : undefined}
              animate={isPublishing || isUnpublishing ? "animate" : undefined}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClasses(
                project.status
              )}`}
            >
              {project.status}
            </motion.span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.04, ease: easeBezier }}
            className="flex items-center gap-2 text-sm text-[#9aa6c0]"
          >
            <Globe className="size-4 text-[#4fdbc8]" />
            <span>{formatUpdatedAt(project.updated_at)}</span>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                asChild
                type="button"
                variant="outline"
                className="h-10 w-full rounded-md border-white/8 bg-transparent text-[#dee2f5]"
              >
                <Link href={`/builder?projectId=${project.id}`}>
                  <PencilLine data-icon="inline-start" />
                  Open Builder
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                asChild
                type="button"
                variant="outline"
                className="h-10 w-full rounded-md border-white/8 bg-transparent text-[#dee2f5]"
              >
                <Link href={`/analytics?projectId=${project.id}`}>
                  <BarChart3 data-icon="inline-start" />
                  Analytics
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-white/8 bg-[#151a27]">
          {canManage ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                  {isPublished ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                      disabled={isUnpublishing}
                      onClick={() => onUnpublish(project.id)}
                    >
                      {isUnpublishing ? (
                        <Loader2 className="animate-spin" />
                      ) : null}
                      Unpublish
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="h-10 rounded-md bg-[#4fdbc8] text-[#03241f] hover:bg-[#46cfbd]"
                      disabled={isPublishing}
                      onClick={() => onPublish(project.id)}
                    >
                      {isPublishing ? <Loader2 className="animate-spin" /> : null}
                      Publish
                    </Button>
                  )}
                </motion.div>
              </div>

              <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 rounded-md text-[#f2b8b5] hover:bg-[#2b1d1d] hover:text-[#ffd3d1]"
                    >
                      <Trash2 data-icon="inline-start" />
                      Delete
                    </Button>
                  </motion.div>
                </AlertDialogTrigger>

                <AlertDialogContent className="border-white/8 bg-[#1a1f2d] text-[#dee2f5]">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-[#2a1d1d] text-[#f2b8b5]">
                      <AlertTriangle />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete project?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#9aa6c0]">
                      This will remove <span className="font-semibold text-[#dee2f5]">{project.name}</span> and its related pages from the current workspace.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="border-white/10 bg-transparent text-[#dee2f5] hover:bg-white/[0.03]"
                      disabled={isDeleting}
                    >
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      variant="destructive"
                      className="bg-[#c45a4f] text-white hover:bg-[#b64f44]"
                      disabled={isDeleting}
                      onClick={() => {
                        onDelete(project.id);
                        setDeleteDialogOpen(false);
                      }}
                    >
                      {isDeleting ? "Deleting..." : "Delete project"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <span className="text-sm text-[#9aa6c0]">
              View-only access
            </span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}