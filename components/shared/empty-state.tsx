import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** One line that says what's missing, one sentence, one action. No art. */
export default function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 border-y border-border py-12",
        className
      )}
    >
      <h3 className="type-h3 text-text">{title}</h3>
      <p className="type-body text-text-muted prose-width">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
