import type { ReactNode } from "react";

import { revealScript } from "@/components/marketing/reveal";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      <a
        href="#main"
        className="sr-only z-50 rounded-sm bg-brand px-4 py-2 type-ui text-on-brand focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      {children}
    </>
  );
}
