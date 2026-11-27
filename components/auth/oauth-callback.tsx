"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { errorMessage } from "@/components/shared/error-state";
import { FormAlert } from "@/components/ui/field";
import { useAuth } from "@/hooks/use-auth";

export default function OAuthCallback({
  code,
  redirect,
}: {
  code: string | null;
  redirect: string;
}) {
  const router = useRouter();
  const startedRef = useRef(false);
  const { oauthExchangeMutation } = useAuth();
  const [error, setError] = useState<string | null>(
    code ? null : "The sign-in provider didn't send a code back. Try signing in again."
  );

  useEffect(() => {
    if (startedRef.current || !code) return;
    startedRef.current = true;

    oauthExchangeMutation
      .mutateAsync(code)
      .then(() => router.replace(redirect))
      .catch((exchangeError: unknown) =>
        setError(errorMessage(exchangeError, "Sign-in couldn't be completed. Try again."))
      );
  }, [code, oauthExchangeMutation, redirect, router]);

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <FormAlert message={error} />
        <Link
          href="/sign-in"
          className="self-start rounded-xs type-body text-text underline underline-offset-[3px]"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <p className="type-body text-text-muted" aria-live="polite">
      Finishing sign-in. You&apos;ll be redirected in a moment.
    </p>
  );
}
