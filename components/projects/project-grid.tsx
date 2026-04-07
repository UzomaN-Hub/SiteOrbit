"use client";

import { motion } from "framer-motion";

import ProjectCard from "@/components/projects/project-card";
import { staggerContainer } from "@/lib/motion";
import type { Project } from "@/types/project";

type ProjectGridProps = {
  projects: Project[];
  canManage: boolean;
  onPublish: (projectId: string) => void;
  onUnpublish: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  activePublishId?: string | null;
  activeUnpublishId?: string | null;
  activeDeleteId?: string | null;
};

export default function ProjectGrid({
  projects,
  canManage,
  onPublish,
  onUnpublish,
  onDelete,
  activePublishId = null,
  activeUnpublishId = null,
  activeDeleteId = null,
}: ProjectGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          canManage={canManage}
          onPublish={onPublish}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
          isPublishing={activePublishId === project.id}
          isUnpublishing={activeUnpublishId === project.id}
          isDeleting={activeDeleteId === project.id}
        />
      ))}
    </motion.div>
  );
}