import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoMarkProps = { size?: number; className?: string };

/** A 1.5px bone ring with a small amber dot riding its upper-right edge. */
export function LogoMark({ size = 22, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 overflow-visible", className)}
    >
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <g className="logo-orbit" style={{ transformOrigin: "12px 12px" }}>
        <circle cx="18.01" cy="5.99" r="3.1" className="fill-brand" />
      </g>
    </svg>
  );
}

type LogoProps = {
  href?: string;
  variant?: "mark" | "full";
  className?: string;
  label?: string;
};

export default function Logo({
  href = "/",
  variant = "full",
  className,
  label = "SiteOrbit home",
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={variant === "mark" ? label : undefined}
      className={cn(
        "logo-link inline-flex items-center gap-2 rounded-xs text-text",
        className
      )}
    >
      <LogoMark />
      {variant === "full" ? (
        <span className="font-display text-[19px] leading-none font-semibold tracking-[-0.01em]">
          SiteOrbit
        </span>
      ) : null}
    </Link>
  );
}
