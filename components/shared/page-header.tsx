import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Dashboard page title (h2), one line of description, one action. */
export default function PageHeader({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <h1 className="type-h2 text-text">{title}</h1>
        {description ? (
          <p className="type-body text-text-muted prose-width">{description}</p>
        ) : null}
        {children}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </header>
  );
}
