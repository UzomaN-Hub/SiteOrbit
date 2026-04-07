import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  collapsed?: boolean;
  className?: string;
};

export default function Logo({
  href = "/",
  collapsed = false,
  className,
}: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex size-11 items-center justify-center rounded-xl bg-[#71f8e4] text-[#00201c] shadow-[0_12px_30px_rgba(79,219,200,0.18)]">
        <Sparkles className="size-4" />
      </div>

      {!collapsed && (
        <div className="min-w-0">
          <div className="truncate font-heading text-[1.75rem] font-bold tracking-tight text-[#dee2f5]">
            SiteOrbit
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Link href={href} className="outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {content}
    </Link>
  );
}