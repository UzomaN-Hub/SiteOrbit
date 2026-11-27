import type { Metadata } from "next";
import Link from "next/link";

import AuthHeading from "@/components/auth/auth-heading";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "How to get back into your SiteOrbit account.",
};

/**
 * The API has no password-reset endpoint yet, so this page says so plainly
 * instead of pretending to send an email (the old page faked a success toast).
 */
export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeading
        title="Reset your password"
        description="Email reset links aren't available yet."
      />
      <div className="flex flex-col gap-4 border-y border-border py-6 type-body text-text-muted">
        <p>
          If you created your account with Google or GitHub, go back and use that button
          instead. You don&apos;t need a SiteOrbit password.
        </p>
        <p>
          If you signed up with email, ask the owner of your workspace to invite you
          again with a new account.
        </p>
      </div>
      <Button asChild size="auth" className="mt-8 w-full">
        <Link href="/sign-in">Back to sign in</Link>
      </Button>
    </>
  );
}
