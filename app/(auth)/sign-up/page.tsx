import type { Metadata } from "next";

import AuthHeading from "@/components/auth/auth-heading";
import { SignUpForm } from "@/components/auth/auth-forms";
import { safeRedirect } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Create your account",
  description:
    "Create a SiteOrbit account and set up a workspace for your first client.",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  const { redirect } = await searchParams;
  const target = safeRedirect(Array.isArray(redirect) ? redirect[0] : redirect);

  return (
    <>
      <AuthHeading
        title="Create your account"
        description="Set up a workspace for your first client in a few minutes."
      />
      <SignUpForm redirect={target} />
    </>
  );
}
