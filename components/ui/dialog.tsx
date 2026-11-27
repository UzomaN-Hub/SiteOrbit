"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

export const overlayClass = "fixed inset-0 z-50 bg-scrim";

export const dialogPanelClass = cn(
  "fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-32px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 gap-6",
  "rounded-lg border border-border bg-surface-2 p-6 text-text shadow-float outline-none sm:p-8"
);

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay data-slot="dialog-overlay" className={overlayClass} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(dialogPanelClass, className)}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-sm text-text-muted transition-colors duration-(--dur-fast) hover:bg-surface-1 hover:text-text"
          >
            <X className="size-4" strokeWidth={1.5} />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 pr-8", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title className={cn("type-h3 text-text", className)} {...props} />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("type-body text-text-muted", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
