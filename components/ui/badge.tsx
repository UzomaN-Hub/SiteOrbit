import * as React from "react";

import { cn } from "@/lib/utils";

/** 20px label, --r-xs radius, never a pill. */
function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex h-6 w-fit shrink-0 items-center gap-1 rounded-xs bg-surface-2 px-2 type-small font-medium whitespace-nowrap text-text-muted",
        className
      )}
      {...props}
    />
  );
}

type StatusTone = "live" | "draft" | "inactive" | "pending";

const statusLabels: Record<StatusTone, string> = {
  live: "Live",
  draft: "Draft",
  inactive: "Archived",
  pending: "Pending",
};

/**
 * Status is a dot plus a word, never a coloured fill (DESIGN.md §2).
 * Live = solid amber dot; everything else = hollow muted ring.
 */
function StatusDot({
  tone,
  label,
  className,
}: {
  tone: StatusTone;
  label?: string;
  className?: string;
}) {
  const isLive = tone === "live";

  return (
    <span
      data-slot="status"
      data-tone={tone}
      className={cn(
        "inline-flex items-center gap-2 type-ui font-normal",
        isLive ? "text-text" : "text-text-muted",
        className
      )}
    >
      <span
        aria-hidden="true"
        data-allow-round
        className={cn(
          "size-2 shrink-0 rounded-full",
          isLive ? "bg-brand-ink" : "border-[1.5px] border-text-muted"
        )}
      />
      {label ?? statusLabels[tone]}
    </span>
  );
}

export { Badge, StatusDot };
export type { StatusTone };
