import type { Metadata } from "next";
import { Suspense } from "react";

import BuilderShell, { BuilderSkeleton } from "@/components/builder/builder-shell";

export const metadata: Metadata = { title: "Builder" };

export default function BuilderPage() {
  return (
    <Suspense fallback={<BuilderSkeleton />}>
      <BuilderShell />
    </Suspense>
  );
}
