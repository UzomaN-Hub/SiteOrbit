"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import LoadingState from "@/components/shared/loading-state";
import { useAuth } from "@/hooks/use-auth";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasStartedRef = useRef(false);

  const { oauthExchangeMutation } = useAuth();

  useEffect(() => {
    if (hasStartedRef.current) return;

    const code = searchParams.get("code");
    const redirect = searchParams.get("redirect") || "/dashboard";

    if (!code) {
      hasStartedRef.current = true;
      toast.error("OAuth sign-in could not be completed.");
      router.replace("/sign-in");
      return;
    }

    hasStartedRef.current = true;

    void (async () => {
      try {
        await oauthExchangeMutation.mutateAsync(code);
        toast.success("Signed in successfully.");
        router.replace(redirect);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "OAuth sign-in failed.";
        toast.error(message);
        router.replace("/sign-in");
      }
    })();
  }, [oauthExchangeMutation, router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <LoadingState
          title="Completing sign-in"
          description="Finalizing your secure SiteOrbit session."
        />
      </div>
    </main>
  );
}