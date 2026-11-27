import type { Metadata } from "next";

import AcceptInvite from "@/components/auth/accept-invite";
import AuthHeading from "@/components/auth/auth-heading";

export const metadata: Metadata = {
  title: "Accept invitation",
  description: "Join a SiteOrbit workspace you've been invited to.",
};

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  const value = Array.isArray(token) ? token[0] : token;

  return (
    <>
      <AuthHeading
        title="Join the workspace"
        description="You've been invited to work on sites in SiteOrbit."
      />
      <AcceptInvite token={value ?? null} />
    </>
  );
}
