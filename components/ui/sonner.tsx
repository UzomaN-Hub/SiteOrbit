"use client";

import { AlertTriangle, Check, Info } from "lucide-react";
import { Toaster as Sonner } from "sonner";

/** Toasts: bottom right, 4 seconds, icon plus one sentence. */
function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      duration={4000}
      gap={8}
      icons={{
        success: <Check className="size-4" strokeWidth={1.5} />,
        error: <AlertTriangle className="size-4 text-brand" strokeWidth={1.5} />,
        info: <Info className="size-4" strokeWidth={1.5} />,
        warning: <AlertTriangle className="size-4 text-brand" strokeWidth={1.5} />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-[356px] max-w-[calc(100vw-32px)] items-start gap-3 rounded-md border border-border bg-surface-2 p-4 text-text shadow-float",
          title: "type-ui text-text",
          description: "mt-1 type-small text-text-muted",
          icon: "mt-0.5 text-text",
          actionButton: "ml-auto type-ui underline underline-offset-[3px]",
        },
      }}
    />
  );
}

export { Toaster };
