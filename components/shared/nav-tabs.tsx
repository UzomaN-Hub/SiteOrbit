"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type NavTab = { label: string; href: string; active: boolean };

/**
 * Route tabs with a 2px underline that slides to the active tab
 * (DESIGN.md §6, FRONTEND.md §6). Tabs are links with aria-current.
 */
export default function NavTabs({
  tabs,
  label,
  className,
}: {
  tabs: NavTab[];
  label: string;
  className?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(
    null
  );
  const activeHref = tabs.find((tab) => tab.active)?.href ?? null;

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLAnchorElement>('[aria-current="page"]');
      setIndicator(
        active ? { left: active.offsetLeft, width: active.offsetWidth } : null
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeHref]);

  return (
    <nav aria-label={label} className={cn("border-b border-border", className)}>
      <div
        ref={listRef}
        className="no-scrollbar relative flex h-11 items-stretch gap-6 overflow-x-auto"
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={tab.active ? "page" : undefined}
            className={cn(
              "inline-flex shrink-0 items-center rounded-xs type-ui transition-colors duration-(--dur-fast)",
              tab.active ? "text-text" : "text-text-muted hover:text-text"
            )}
          >
            {tab.label}
          </Link>
        ))}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 h-0.5 bg-text transition-[left,width,opacity] duration-(--dur-base) ease-brand"
          style={{
            left: indicator?.left ?? 0,
            width: indicator?.width ?? 0,
            opacity: indicator ? 1 : 0,
          }}
        />
      </div>
    </nav>
  );
}
