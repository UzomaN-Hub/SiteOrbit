"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export function getInitials(name?: string | null) {
  if (!name?.trim()) return "?";
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type AvatarProps = {
  name?: string | null;
  src?: string | null;
  /** person = circle; workspace = rounded square. The shape carries meaning. */
  kind?: "person" | "workspace";
  size?: 20 | 28 | 32;
  className?: string;
};

const sizeClass = {
  20: "size-6 text-[10px]",
  28: "size-8 text-[12px]",
  32: "size-9 text-[13px]",
} as const;

function Avatar({ name, src, kind = "person", size = 28, className }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-kind={kind}
      // Decorative: the person's or workspace's name is always shown or
      // announced next to it, so screen readers shouldn't read the initials.
      aria-hidden="true"
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden bg-surface-2 font-semibold text-text select-none",
        kind === "person" ? "rounded-full" : size >= 32 ? "rounded-sm" : "rounded-xs",
        kind === "workspace" && "border border-border-strong",
        sizeClass[size],
        className
      )}
    >
      {src ? (
        <AvatarPrimitive.Image src={src} alt="" className="size-full object-cover" />
      ) : null}
      {/* Initials are drawn with CSS, so they're never read out or counted as label text. */}
      <AvatarPrimitive.Fallback
        data-initials={getInitials(name)}
        className="flex size-full items-center justify-center before:content-[attr(data-initials)]"
      />
    </AvatarPrimitive.Root>
  );
}

export { Avatar };
