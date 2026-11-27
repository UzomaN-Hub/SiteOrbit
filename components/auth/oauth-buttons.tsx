"use client";

import { useState } from "react";

import { errorMessage } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import type { OAuthProvider } from "@/types/auth";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M21.6 12.23c0-.68-.06-1.36-.18-2.02H12v3.83h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.98-4.3 2.98-7.33ZM12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22Zm-5.6-8.1a6 6 0 0 1 0-3.8V7.52H3.07a10 10 0 0 0 0 8.96L6.4 13.9ZM12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.52L6.4 10.1C7.19 7.74 9.4 5.98 12 5.98Z" />
    </svg>
  );
}

export function GitHubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-current`}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-1.95c-3.2.69-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.76 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a10.98 10.98 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.83 1.18 3.09 0 4.42-2.71 5.39-5.29 5.68.41.35.78 1.05.78 2.11v3.12c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function OAuthButtons({
  redirect,
  disabled,
  onError,
}: {
  redirect: string;
  disabled?: boolean;
  onError: (message: string) => void;
}) {
  const { beginOAuth } = useAuth();
  const [active, setActive] = useState<OAuthProvider | null>(null);

  const start = async (provider: OAuthProvider) => {
    try {
      setActive(provider);
      await beginOAuth(provider, redirect);
    } catch (error) {
      setActive(null);
      onError(
        errorMessage(
          error,
          `${provider === "google" ? "Google" : "GitHub"} sign-in didn't start. Try again.`
        )
      );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
      <Button
        type="button"
        variant="outline"
        size="auth"
        loading={active === "google"}
        disabled={disabled || (active !== null && active !== "google")}
        onClick={() => void start("google")}
      >
        <GoogleIcon />
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        size="auth"
        loading={active === "github"}
        disabled={disabled || (active !== null && active !== "github")}
        onClick={() => void start("github")}
      >
        <GitHubIcon />
        GitHub
      </Button>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
      <span className="type-small text-text-muted">or with email</span>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  );
}
