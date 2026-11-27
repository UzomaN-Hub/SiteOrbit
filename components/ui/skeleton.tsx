import { cn } from "@/lib/utils";

/** Stand-in block: --surface-2, the radius of what it replaces, slow pulse. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("skeleton rounded-xs bg-surface-2", className)}
      {...props}
    />
  );
}

export { Skeleton };
