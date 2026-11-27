"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { errorMessage } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/hooks/use-hydrated";
import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import type { Invitation } from "@/types/invitation";

export default function AcceptInvite({ token }: { token: string | null }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const hydrated = useHydrated();
  const { accessToken, user } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const acceptMutation = useMutation({
    mutationFn: (inviteToken: string) =>
      apiClient.post<Invitation>(
        apiEndpoints.workspaces.acceptInvitation,
        { token: inviteToken },
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  if (!token) {
    return (
      <p className="border-y border-border py-6 type-body text-text-muted">
        This invite link is missing its code. Open the link from your invitation email
        again, or ask the person who invited you to send a new one.
      </p>
    );
  }

  if (!hydrated) {
    return <Skeleton className="h-11 w-full rounded-sm" />;
  }

  const back = `/accept-invite?token=${encodeURIComponent(token)}`;

  if (!accessToken) {
    return (
      <div className="flex flex-col gap-3">
        <p className="mb-3 type-body text-text-muted">
          Sign in or create an account with the email address the invite was sent to.
          You&apos;ll come straight back here.
        </p>
        <Button asChild size="auth" className="w-full">
          <Link href={`/sign-in?redirect=${encodeURIComponent(back)}`}>Sign in to accept</Link>
        </Button>
        <Button asChild variant="outline" size="auth" className="w-full">
          <Link href={`/sign-up?redirect=${encodeURIComponent(back)}`}>Create an account</Link>
        </Button>
      </div>
    );
  }

  const accept = async () => {
    setError(null);
    try {
      await acceptMutation.mutateAsync(token);
      toast.success("You've joined the workspace.");
      router.push("/dashboard");
    } catch (acceptError) {
      setError(
        errorMessage(
          acceptError,
          "This invite couldn't be accepted. It may have expired or been sent to another email."
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <FormAlert message={error} />
      <p className="type-body text-text-muted">
        You&apos;re signed in as <span className="text-text">{user?.email}</span>. Accepting
        adds this account to the workspace.
      </p>
      <Button
        size="auth"
        className="w-full"
        loading={acceptMutation.isPending}
        onClick={() => void accept()}
      >
        Accept invitation
      </Button>
    </div>
  );
}
