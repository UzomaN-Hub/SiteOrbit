import * as React from "react";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field" className={cn("flex flex-col gap-2", className)} {...props} />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn("type-label text-text", className)}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("type-small text-text-muted", className)}
      {...props}
    />
  );
}

/** Amber warning icon plus the message in --text. Link it with aria-describedby. */
function FieldError({
  id,
  message,
  className,
}: {
  id?: string;
  message?: string | null;
  className?: string;
}) {
  if (!message) return null;

  return (
    <p
      id={id}
      data-slot="field-error"
      className={cn("flex items-start gap-2 type-small text-text", className)}
    >
      <AlertTriangle
        aria-hidden="true"
        className="mt-px size-3.5 shrink-0 text-brand-ink"
        strokeWidth={1.5}
      />
      {message}
    </p>
  );
}

/** Server or network error box at the top of a form. */
function FormAlert({ message, className }: { message?: string | null; className?: string }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-sm border border-brand-ink bg-surface-1 px-3 py-3 type-body text-text",
        className
      )}
    >
      <AlertTriangle
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-brand-ink"
        strokeWidth={1.5}
      />
      <span>{message}</span>
    </div>
  );
}

export { Field, FieldDescription, FieldError, FieldLabel, FormAlert };
