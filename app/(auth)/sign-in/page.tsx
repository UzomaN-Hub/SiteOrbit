import type { Metadata } from "next";

import AuthHeading from "@/components/auth/auth-heading";
import { SignInForm } from "@/components/auth/auth-forms";
import { safeRedirect } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to SiteOrbit to manage your client sites, team and domains.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  const { redirect } = await searchParams;
  const target = safeRedirect(Array.isArray(redirect) ? redirect[0] : redirect);

  return (
    <>
      <AuthHeading title="Sign in" description="Welcome back. Pick up where you left off." />
      <SignInForm redirect={target} />
    </>
  );
}
