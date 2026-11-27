"use client";

import { usePathname } from "next/navigation";

import { LogoMark } from "@/components/brand/logo";
import AccountMenu from "@/components/app-shell/account-menu";
import WorkspaceSwitcher from "@/components/app-shell/workspace-switcher";
import NavTabs from "@/components/shared/nav-tabs";
import Link from "next/link";

const tabs = [
  { label: "Sites", href: "/dashboard", match: ["/dashboard", "/projects"] },
  { label: "Analytics", href: "/analytics", match: ["/analytics"] },
  { label: "Team", href: "/team", match: ["/team"] },
  { label: "Domains", href: "/domains", match: ["/domains"] },
  { label: "Settings", href: "/settings", match: ["/settings"] },
];

export const appContentClass = "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-brand px-4 py-2 type-ui text-on-brand focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 bg-bg">
        <div className="border-b border-border">
          <div className={`${appContentClass} flex h-16 items-center gap-2`}>
            <Link
              href="/dashboard"
              aria-label="Sites home"
              className="logo-link inline-flex size-9 shrink-0 items-center justify-center rounded-sm text-text"
            >
              <LogoMark />
            </Link>
            <span aria-hidden="true" className="type-body text-text-faint">
              /
            </span>
            <WorkspaceSwitcher />
            <div className="ml-auto">
              <AccountMenu />
            </div>
          </div>
        </div>
        <div className={appContentClass}>
          <NavTabs
            label="Workspace sections"
            className="border-b-0"
            tabs={tabs.map((tab) => ({
              label: tab.label,
              href: tab.href,
              active: tab.match.some(
                (route) => pathname === route || pathname.startsWith(`${route}/`)
              ),
            }))}
          />
        </div>
        <div className="border-b border-border" />
      </header>

      <main id="main" tabIndex={-1} className={`${appContentClass} flex-1 py-8 outline-none`}>
        {children}
      </main>
    </div>
  );
}
