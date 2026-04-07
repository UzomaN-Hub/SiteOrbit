import Link from "next/link";

import AuthCard from "@/components/auth/auth-card";
import AuthForm from "@/components/auth/auth-form";
import AuthOrbitVisual from "@/components/auth/auth-orbit-visual";

export default function ForgotPasswordPage() {
  return (
    <div className="flex justify-center">
      <AuthCard
      
        title="Reset your password"
        description="Enter your email and continue the recovery flow without losing clarity about what happens next."
        heroTitle="Recovery should feel calm."
        heroDescription="Keep the reset pathway readable, guided, and confidence-building instead of abrupt or confusing."
        visual={<AuthOrbitVisual mode="forgot-password" />}
        footer={
          <p className="text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Back to sign in
            </Link>
          </p>
        }

      >
        <AuthForm variant="forgot-password" />
      </AuthCard>
    </div>
  );
}