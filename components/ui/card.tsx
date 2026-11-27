import * as React from "react";

import { cn } from "@/lib/utils";

/** A separate object (a site, a plan, a settings group). --r-md, no shadow. */
function Card({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="card"
      className={cn(
        "rounded-md border border-border bg-surface-1 p-4 sm:p-6",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("mb-6 flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("type-h3 text-text", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("type-body text-text-muted prose-width", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-6 flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardFooter };
