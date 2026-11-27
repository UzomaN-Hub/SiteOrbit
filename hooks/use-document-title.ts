"use client";

import { useEffect } from "react";

import { siteConfig } from "@/lib/config/site";

/**
 * Signed-in pages are client components, so their title depends on data
 * (the workspace name). This keeps the tab title in the
 * "Sites · Acme Studio · SiteOrbit" pattern.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · ${siteConfig.name}`;
  }, [title]);
}
