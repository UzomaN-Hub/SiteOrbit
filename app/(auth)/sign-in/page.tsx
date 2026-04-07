import Link from "next/link";

import AuthCard from "@/components/auth/auth-card";
import AuthForm from "@/components/auth/auth-form";
import AuthOrbitVisual from "@/components/auth/auth-orbit-visual";

export default function SignInPage() {
  return (
    <div className="flex justify-center">
      <AuthCard
        title="Welcome back"
        description="Sign in to continue building, publishing, and managing your workspace without losing momentum."
        heroTitle="Return to the control layer."
        heroDescription="Secure access, clear system context, and a polished workflow for teams shaping their digital presence."
        visual={<AuthOrbitVisual mode="sign-in" />}
        footer={
          <p className="text-sm text-muted-foreground">
            New to SiteOrbit?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Create your account
            </Link>
          </p>
        }
      >
        <AuthForm variant="sign-in" />
      </AuthCard>
    </div>
  );
}