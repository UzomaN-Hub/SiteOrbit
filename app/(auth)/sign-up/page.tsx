import Link from "next/link";

import AuthCard from "@/components/auth/auth-card";
import AuthForm from "@/components/auth/auth-form";
import AuthOrbitVisual from "@/components/auth/auth-orbit-visual";

export default function SignUpPage() {
  return (
    <div className="flex justify-center">
      <AuthCard
        title="Create your account"
        description="Start your SiteOrbit workspace and move from setup to publishing with a smoother onboarding path."
        heroTitle="Build the workspace before the website."
        heroDescription="Set up your team context, create your first orbit, and move into the builder with confidence."
        visual={<AuthOrbitVisual mode="sign-up" />}
        footer={
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        }
      >
        <AuthForm variant="sign-up" />
      </AuthCard>
    </div>
  );
}