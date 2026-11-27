"use client";

import { Suspense, useEffect, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { useHydrated } from "@/hooks/use-hydrated";
import { useAuthStore } from "@/store/auth-store";

/**
 * Sends the visitor to sign-in when there is no session (new tab, expired
 * token) or the API rejects it. Renders nothing, so pages never wait on it.
 */
function AuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hydrated = useHydrated();

  const { accessToken } = useAuthStore();
  const { signOut, isUnauthorized } = useAuth();

  useEffect(() => {
    if (!hydrated) return;
    if (accessToken && !isUnauthorized) return;

    void (async () => {
      if (isUnauthorized) await signOut();
      const query = searchParams.toString();
      const target = `${pathname}${query ? `?${query}` : ""}`;
      router.replace(`/sign-in?redirect=${encodeURIComponent(target)}`);
    })();
  }, [accessToken, hydrated, isUnauthorized, pathname, router, searchParams, signOut]);

  return null;
}

/** No loading gate: pages render their own skeletons straight away. */
export default function AuthBootstrapProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <AuthGuard />
      </Suspense>
      {children}
    </>
  );
}
