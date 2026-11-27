"use client";

import { useEffect } from "react";

import ErrorState from "@/components/shared/error-state";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-dvh px-4 pt-12 sm:pt-24">
      <div className="mx-auto w-full max-w-[480px]">
        <ErrorState
          title="This page hit an error"
          error={error}
          fallback="Something went wrong while showing this page. Try again, and if it keeps happening, reload."
          onRetry={reset}
        />
      </div>
    </main>
  );
}
