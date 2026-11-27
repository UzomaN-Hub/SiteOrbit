import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Buttons (DESIGN.md §6). One primary per screen; everything else is
 * outline, ghost or link. Radius is always --r-sm.
 */
const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 rounded-sm whitespace-nowrap select-none",
    "type-ui transition-[background-color,border-color,color,transform] duration-(--dur-fast) ease-brand",
    "active:not-disabled:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:stroke-[1.5]",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-on-brand font-semibold enabled:hover:bg-brand-hover [a&]:hover:bg-brand-hover",
        outline:
          "border border-border-strong bg-transparent text-text enabled:hover:border-text-muted enabled:hover:bg-surface-2 [a&]:hover:border-text-muted [a&]:hover:bg-surface-2 aria-expanded:bg-surface-2",
        ghost:
          "bg-transparent text-text enabled:hover:bg-surface-2 [a&]:hover:bg-surface-2 aria-expanded:bg-surface-2 aria-pressed:bg-surface-2",
        link: "h-auto! px-0! text-text underline decoration-1 underline-offset-[3px] hover:decoration-2 active:scale-100!",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-[16px]",
        auth: "h-11 px-4",
        "icon-sm": "size-8",
        "icon-md": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          data-allow-round className="skeleton size-1 rounded-full bg-current"
          style={{ animationDelay: `${dot * 160}ms` }}
        />
      ))}
    </span>
  );
}

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(
        buttonVariants({ variant, size }),
        loading && "disabled:opacity-100",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className="invisible inline-flex items-center gap-2">
            {children}
          </span>
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <LoadingDots />
          </span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
