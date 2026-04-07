"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import LoadingState from "@/components/shared/loading-state";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";

export default function AuthBootstrapProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken } = useAuthStore();
  const { meQuery, signOut, isUnauthorized } = useAuth();

  useEffect(() => {
    if (!isUnauthorized) return;

    void (async () => {
      await signOut();

      const redirect = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
      router.replace(`/sign-in${redirect}`);
      router.refresh();
    })();
  }, [isUnauthorized, pathname, router, signOut]);

  if (accessToken && meQuery.isPending) {
    return (
      <div className="px-4 py-10 md:px-8 md:py-12">
        <LoadingState
          title="Loading your workspace"
          description="Checking your session and preparing your account."
        />
      </div>
    );
  }

  return <>{children}</>;
}