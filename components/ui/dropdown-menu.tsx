"use client";

import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const floatingLayerClass =
  "z-50 rounded-md border border-border bg-surface-2 p-2 text-text shadow-float outline-none";

export const menuItemClass = cn(
  "relative flex h-10 cursor-default items-center gap-2 rounded-sm px-2 type-ui font-normal text-text outline-none select-none",
  "data-highlighted:bg-surface-1 data-disabled:pointer-events-none data-disabled:opacity-40",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:stroke-[1.5] [&_svg]:text-text-muted"
);

function DropdownMenuContent({
  className,
  sideOffset = 6,
  align = "start",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(floatingLayerClass, "min-w-48", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item className={cn(menuItemClass, className)} {...props} />
  );
}

function DropdownMenuCheckItem({
  className,
  checked,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  checked?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(menuItemClass, "pr-8", className)}
      aria-current={checked ? "true" : undefined}
      {...props}
    >
      {children}
      {checked ? (
        <Check className="absolute right-2 size-4 text-text!" aria-hidden="true" />
      ) : null}
    </DropdownMenuPrimitive.Item>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn("px-2 pt-1 pb-2 type-label text-text-muted", className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("-mx-2 my-2 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
