"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { Check, ChevronDown } from "lucide-react";

import { floatingLayerClass, menuItemClass } from "@/components/ui/dropdown-menu";
import { fieldControlClass } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  className,
  size = "md",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "md";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        fieldControlClass,
        "flex items-center justify-between gap-2 text-left data-placeholder:text-text-faint",
        size === "sm" ? "h-8 type-ui font-normal" : "h-10",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-text-muted" strokeWidth={1.5} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={6}
        className={cn(
          floatingLayerClass,
          "max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width)",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item className={cn(menuItemClass, "pr-8", className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex">
        <Check className="size-4 text-text!" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
