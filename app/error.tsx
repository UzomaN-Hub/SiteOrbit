"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

import ErrorState from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";

export default function Error({
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
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <ErrorState
          title="Something broke in this view"
          description={
            error.message ||
            "An unexpected error stopped this page from rendering correctly."
          }
          action={
            <Button
              onClick={reset}
              variant="outline"
              className="rounded-md border-white/8 bg-transparent text-[#dee2f5]"
            >
              <RefreshCcw data-icon="inline-start" />
              Try again
            </Button>
          }
        />
      </div>
    </main>
  );
}