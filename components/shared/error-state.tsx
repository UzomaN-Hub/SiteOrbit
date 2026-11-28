import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    if (/failed to fetch|networkerror|load failed/i.test(error.message)) {
      return "We couldn't reach the server. Check your connection and try again.";
    }
    return error.message;
  }
  return fallback;
}

export default function ErrorState({
  title,
  error,
  fallback = "Something went wrong while loading this page.",
  onRetry,
}: {
  title: string;
  error?: unknown;
  fallback?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-md border border-brand-ink bg-surface-1 p-6"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-4 text-brand-ink" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="type-ui text-text">{title}</h3>
      </div>
      <p className="type-body text-text-muted prose-width">
        {errorMessage(error, fallback)}
      </p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
