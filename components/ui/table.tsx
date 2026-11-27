import * as React from "react";

import { cn } from "@/lib/utils";

/** Full width, no outer card, 56px rows with hairlines (DESIGN.md §6). */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom border-collapse text-left", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("border-b border-border", className)} {...props} />;
}

function TableBody(props: React.ComponentProps<"tbody">) {
  return <tbody {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border transition-colors duration-(--dur-fast) [tbody_&]:hover:bg-surface-2",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      scope="col"
      className={cn(
        "h-10 px-3 type-label font-medium whitespace-nowrap text-text-muted first:pl-0 last:pr-0",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "h-14 px-3 type-ui font-normal text-text first:pl-0 last:pr-0",
        className
      )}
      {...props}
    />
  );
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
