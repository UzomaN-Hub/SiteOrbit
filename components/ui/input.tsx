import * as React from "react";

import { cn } from "@/lib/utils";

export const fieldControlClass = cn(
  "w-full min-w-0 rounded-sm border border-border bg-surface-1 px-3 type-body text-text",
  "transition-[border-color,background-color] duration-(--dur-fast) ease-brand",
  "hover:border-border-strong focus-visible:border-text-muted",
  "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border",
  "aria-invalid:border-brand aria-invalid:hover:border-brand"
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  /** md is 44px (dashboard); lg is 48px (auth pages). */
  size?: "md" | "lg";
};

function Input({ className, type, size = "md", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(
        fieldControlClass,
        size === "lg" ? "h-12" : "h-11",
        "file:mr-3 file:border-0 file:bg-transparent file:type-ui file:text-text",
        className
      )}
      {...props}
    />
  );
}

export { Input };
