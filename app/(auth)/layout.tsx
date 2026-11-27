import type { ReactNode } from "react";

import Logo from "@/components/brand/logo";

/** One centred 400px column. No split panel, no marketing copy, no delay. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh px-4 pt-12 pb-16 sm:pt-24">
      <div className="mx-auto flex w-full max-w-[400px] flex-col">
        <Logo className="self-start" />
        <div className="mt-12">{children}</div>
      </div>
    </main>
  );
}
