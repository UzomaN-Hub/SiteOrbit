"use client";

import dynamic from "next/dynamic";

import LoadingState from "@/components/shared/loading-state";

const BuilderShell = dynamic(
  () => import("@/components/builder/builder-shell"),
  {
    loading: () => (
      <LoadingState
        compact
        title="Loading builder"
        description="Preparing the visual editor."
      />
    ),
    ssr: false,
  }
);

export default function BuilderPageClient() {
  return <BuilderShell />;
}