import type { Metadata } from "next";

import Logo from "@/components/brand/logo";
import OAuthCallback from "@/components/auth/oauth-callback";
import { safeRedirect } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Signing in",
  robots: { index: false },
};

export default async function OAuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; redirect?: string }>;
}) {
  const { code, redirect } = await searchParams;

  return (
    <main className="min-h-dvh px-4 pt-12 sm:pt-24">
      <div className="mx-auto flex w-full max-w-[400px] flex-col gap-12">
        <Logo className="self-start" />
        <div className="flex flex-col gap-4">
          <h1 className="type-h2 text-text">Signing you in</h1>
          <OAuthCallback code={code ?? null} redirect={safeRedirect(redirect)} />
        </div>
      </div>
    </main>
  );
}
