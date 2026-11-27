"use client";

import { cn } from "@/lib/utils";

export type SegmentOption<T extends string> = {
  value: T;
  label: string;
  count?: number;
};

/** A small row of toggle buttons for filters and ranges. */
export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-fit items-center gap-0.5 rounded-sm border border-border p-0.5",
        className
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex h-full items-center gap-1.5 rounded-xs px-3 type-ui transition-colors duration-(--dur-fast)",
              selected
                ? "bg-surface-2 text-text"
                : "text-text-muted hover:text-text"
            )}
          >
            {option.label}
            {typeof option.count === "number" ? (
              <span className="tabular type-small text-text-muted">{option.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
