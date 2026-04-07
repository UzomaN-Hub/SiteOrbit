"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Loader2,
  LogIn,
  Mail,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthSocialButton from "@/components/auth/auth-social-button";
import {
  authContainerVariants,
  authFeedbackVariants,
  authItemVariants,
} from "@/components/auth/auth-form-motion";
import PasswordFieldToggle from "@/components/auth/password-field-toggle";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  signInSchema,
  signUpSchema,
  type SignInSchema,
  type SignUpSchema,
} from "@/lib/validators/auth";

type AuthFormProps =
  | { variant: "sign-in" }
  | { variant: "sign-up" }
  | { variant: "forgot-password" }
  | { variant: "accept-invite"; inviteEmail?: string };

function InlineFeedback({
  tone,
  text,
}: {
  tone: "success" | "neutral";
  text: string;
}) {
  const toneClasses =
    tone === "success"
      ? "border-[#4fdbc8]/18 bg-[#4fdbc8]/8 text-[#a6f2e9]"
      : "border-white/10 bg-white/[0.03] text-[#c3cee4]";

  return (
    <motion.div
      variants={authFeedbackVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex items-start gap-3 rounded-[0.95rem] border px-4 py-3 text-sm ${toneClasses}`}
    >
      {tone === "success" ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
      ) : (
        <Mail className="mt-0.5 size-4 shrink-0" />
      )}
      <span className="leading-6">{text}</span>
    </motion.div>
  );
}

function MotionField({ children }: { children: React.ReactNode }) {
  return <motion.div variants={authItemVariants}>{children}</motion.div>;
}

export default function AuthForm(props: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInMutation, signUpMutation, beginOAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showInvitePassword, setShowInvitePassword] = useState(false);
  const [oauthProvider, setOAuthProvider] = useState<"google" | "github" | null>(
    null
  );
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);

  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onBlur",
  });

  const forgotPasswordForm = useForm<{ email: string }>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const acceptInviteForm = useForm<{ name: string; password: string }>({
    defaultValues: { name: "", password: "" },
    mode: "onBlur",
  });

  const authInputClassName =
    "h-14 rounded-[0.85rem] border-white/8 bg-[#161b29] text-[#dee2f5] placeholder:text-white/20 pr-12 transition-[border-color,transform,background-color,box-shadow] duration-200 focus-visible:scale-[1.01] focus-visible:border-[#4fdbc8]/40 focus-visible:bg-[#171f2d]";

  const authInputClassNameWithoutToggle =
    "h-14 rounded-[0.85rem] border-white/8 bg-[#161b29] text-[#dee2f5] placeholder:text-white/20 transition-[border-color,transform,background-color,box-shadow] duration-200 focus-visible:scale-[1.01] focus-visible:border-[#4fdbc8]/40 focus-visible:bg-[#171f2d]";

  const primaryButtonClassName =
    "relative h-16 w-full overflow-hidden rounded-[0.95rem] bg-[#4fdbc8] text-xl font-semibold text-[#03241f] hover:bg-[#46cfbd]";

  const forgotPasswordEmail = forgotPasswordForm.watch("email");

  const forgotPasswordMessage = useMemo(() => {
    if (!forgotPasswordSubmitted) return null;

    return forgotPasswordEmail
      ? `A recovery link would be sent to ${forgotPasswordEmail}. Backend reset delivery can be connected next.`
      : "Password reset flow confirmed. Backend delivery can be connected next.";
  }, [forgotPasswordEmail, forgotPasswordSubmitted]);

  const handleAuthError = (error: unknown, fallback: string) => {
    const message = error instanceof Error ? error.message : fallback;

    toast.error("Action could not be completed.", {
      description: message,
    });
  };

  const handleOAuthStart = async (provider: "google" | "github") => {
    try {
      setOAuthProvider(provider);
      await beginOAuth(provider, redirectTarget);
    } catch (error) {
      handleAuthError(
        error,
        `${provider === "google" ? "Google" : "GitHub"} sign-in could not be started.`
      );
      setOAuthProvider(null);
    }
  };

  const divider = (
    <motion.div variants={authItemVariants} className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-white/8" />
      <span className="text-xs uppercase tracking-[0.25em] text-white/30">
        Or continue with
      </span>
      <div className="h-px flex-1 bg-white/8" />
    </motion.div>
  );

  if (props.variant === "sign-in") {
    return (
      <motion.div
        variants={authContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={authItemVariants} className="grid gap-4 sm:grid-cols-2">
          <AuthSocialButton
            provider="google"
            activeProvider={oauthProvider}
            disabled={oauthProvider !== null}
            onClick={() => void handleOAuthStart("google")}
          />
          <AuthSocialButton
            provider="github"
            activeProvider={oauthProvider}
            disabled={oauthProvider !== null}
            onClick={() => void handleOAuthStart("github")}
          />
        </motion.div>

        {divider}

        <motion.form
          variants={authContainerVariants}
          onSubmit={signInForm.handleSubmit(async (values) => {
            try {
              await signInMutation.mutateAsync(values);
              toast.success("Signed in successfully.");
              router.push(redirectTarget);
              router.refresh();
            } catch (error) {
              handleAuthError(error, "Sign in failed.");
            }
          })}
          className="space-y-5"
        >
          <MotionField>
            <Field>
              <FieldLabel
                htmlFor="sign-in-email"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Email address
              </FieldLabel>
              <FieldContent>
                <Input
                  id="sign-in-email"
                  type="email"
                  placeholder="name@company.com"
                  className={authInputClassNameWithoutToggle}
                  {...signInForm.register("email")}
                />
                <FieldError errors={[signInForm.formState.errors.email]} />
              </FieldContent>
            </Field>
          </MotionField>

          <MotionField>
            <Field>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel
                  htmlFor="sign-in-password"
                  className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
                >
                  Password
                </FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#4fdbc8] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FieldContent>
                <div className="relative">
                  <Input
                    id="sign-in-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={authInputClassName}
                    {...signInForm.register("password")}
                  />
                  <PasswordFieldToggle
                    shown={showPassword}
                    onToggle={() => setShowPassword((prev) => !prev)}
                  />
                </div>
                <FieldError errors={[signInForm.formState.errors.password]} />
              </FieldContent>
            </Field>
          </MotionField>

          <motion.div
            variants={authItemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.995 }}
          >
            <Button
              type="submit"
              className={primaryButtonClassName}
              disabled={signInMutation.isPending || oauthProvider !== null}
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]"
                animate={
                  signInMutation.isPending
                    ? { x: ["-120%", "120%"] }
                    : { x: "-120%" }
                }
                transition={
                  signInMutation.isPending
                    ? { duration: 1.05, repeat: Infinity, ease: "linear" }
                    : { duration: 0.2 }
                }
              />
              {signInMutation.isPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <LogIn data-icon="inline-start" />
              )}
              Sign In
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    );
  }

  if (props.variant === "sign-up") {
    return (
      <motion.div
        variants={authContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={authItemVariants} className="grid gap-4 sm:grid-cols-2">
          <AuthSocialButton
            provider="google"
            activeProvider={oauthProvider}
            disabled={oauthProvider !== null}
            onClick={() => void handleOAuthStart("google")}
          />
          <AuthSocialButton
            provider="github"
            activeProvider={oauthProvider}
            disabled={oauthProvider !== null}
            onClick={() => void handleOAuthStart("github")}
          />
        </motion.div>

        {divider}

        <motion.form
          variants={authContainerVariants}
          onSubmit={signUpForm.handleSubmit(async (values) => {
            try {
              await signUpMutation.mutateAsync(values);
              toast.success("Account created successfully.");
              router.push("/dashboard");
              router.refresh();
            } catch (error) {
              handleAuthError(error, "Sign up failed.");
            }
          })}
          className="space-y-5"
        >
          <MotionField>
            <Field>
              <FieldLabel
                htmlFor="sign-up-name"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Full name
              </FieldLabel>
              <FieldContent>
                <Input
                  id="sign-up-name"
                  placeholder="Alex Morgan"
                  className={authInputClassNameWithoutToggle}
                  {...signUpForm.register("name")}
                />
                <FieldError errors={[signUpForm.formState.errors.name]} />
              </FieldContent>
            </Field>
          </MotionField>

          <MotionField>
            <Field>
              <FieldLabel
                htmlFor="sign-up-email"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Work email
              </FieldLabel>
              <FieldContent>
                <Input
                  id="sign-up-email"
                  type="email"
                  placeholder="alex@workspace.com"
                  className={authInputClassNameWithoutToggle}
                  {...signUpForm.register("email")}
                />
                <FieldError errors={[signUpForm.formState.errors.email]} />
              </FieldContent>
            </Field>
          </MotionField>

          <MotionField>
            <Field>
              <FieldLabel
                htmlFor="sign-up-password"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Password
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Input
                    id="sign-up-password"
                    type={showSignUpPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={authInputClassName}
                    {...signUpForm.register("password")}
                  />
                  <PasswordFieldToggle
                    shown={showSignUpPassword}
                    onToggle={() => setShowSignUpPassword((prev) => !prev)}
                  />
                </div>
                <FieldError errors={[signUpForm.formState.errors.password]} />
              </FieldContent>
            </Field>
          </MotionField>

          <motion.div
            variants={authItemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.995 }}
          >
            <Button
              type="submit"
              className={primaryButtonClassName}
              disabled={signUpMutation.isPending || oauthProvider !== null}
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]"
                animate={
                  signUpMutation.isPending
                    ? { x: ["-120%", "120%"] }
                    : { x: "-120%" }
                }
                transition={
                  signUpMutation.isPending
                    ? { duration: 1.05, repeat: Infinity, ease: "linear" }
                    : { duration: 0.2 }
                }
              />
              {signUpMutation.isPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <UserPlus data-icon="inline-start" />
              )}
              Create Account
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    );
  }

  if (props.variant === "forgot-password") {
    return (
      <motion.form
        variants={authContainerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={forgotPasswordForm.handleSubmit(async () => {
          setForgotPasswordSubmitted(true);
          toast.success("Password reset link sent.", {
            description:
              "This is a placeholder flow for the MVP. Backend recovery can be added next.",
          });
        })}
        className="space-y-5"
      >
        <AnimatePresence initial={false}>
          {forgotPasswordMessage ? (
            <InlineFeedback tone="success" text={forgotPasswordMessage} />
          ) : null}
        </AnimatePresence>

        <MotionField>
          <Field>
            <FieldLabel
              htmlFor="forgot-password-email"
              className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
            >
              Email address
            </FieldLabel>
            <FieldContent>
              <Input
                id="forgot-password-email"
                type="email"
                placeholder="name@company.com"
                className={authInputClassNameWithoutToggle}
                {...forgotPasswordForm.register("email", {
                  required: "Email is required.",
                })}
              />
              <FieldError errors={[forgotPasswordForm.formState.errors.email]} />
            </FieldContent>
          </Field>
        </MotionField>

        <motion.div
          variants={authItemVariants}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.995 }}
        >
          <Button type="submit" className={primaryButtonClassName}>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]"
              animate={
                forgotPasswordSubmitted
                  ? { opacity: [0.2, 0.5, 0.2] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.4,
                repeat: forgotPasswordSubmitted ? Infinity : 0,
              }}
            />
            {forgotPasswordSubmitted ? (
              <CheckCircle2 data-icon="inline-start" />
            ) : (
              <Mail data-icon="inline-start" />
            )}
            {forgotPasswordSubmitted ? "Reset Link Sent" : "Send Reset Link"}
          </Button>
        </motion.div>
      </motion.form>
    );
  }

  return (
    <motion.form
      variants={authContainerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={acceptInviteForm.handleSubmit(async () => {
        toast.success("Invitation accepted.", {
          description:
            "The account acceptance flow is ready for backend invite completion.",
        });
      })}
      className="space-y-5"
    >
      <motion.div variants={authItemVariants}>
        <InlineFeedback
          tone="neutral"
          text="This acceptance flow is already connected to the intended onboarding path. Backend invite completion can be plugged in next without restructuring the UI."
        />
      </motion.div>

      <MotionField>
        <Field>
          <FieldLabel
            htmlFor="accept-invite-email"
            className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
          >
            Invite email
          </FieldLabel>
          <FieldContent>
            <Input
              id="accept-invite-email"
              value={props.inviteEmail ?? "invite@company.com"}
              disabled
              className={authInputClassNameWithoutToggle}
            />
          </FieldContent>
        </Field>
      </MotionField>

      <MotionField>
        <Field>
          <FieldLabel
            htmlFor="accept-invite-name"
            className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
          >
            Full name
          </FieldLabel>
          <FieldContent>
            <Input
              id="accept-invite-name"
              placeholder="Enter your full name"
              className={authInputClassNameWithoutToggle}
              {...acceptInviteForm.register("name", {
                required: "Name is required.",
              })}
            />
            <FieldError errors={[acceptInviteForm.formState.errors.name]} />
          </FieldContent>
        </Field>
      </MotionField>

      <MotionField>
        <Field>
          <FieldLabel
            htmlFor="accept-invite-password"
            className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
          >
            Password
          </FieldLabel>
          <FieldContent>
            <div className="relative">
              <Input
                id="accept-invite-password"
                type={showInvitePassword ? "text" : "password"}
                placeholder="Create your password"
                className={authInputClassName}
                {...acceptInviteForm.register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                })}
              />
              <PasswordFieldToggle
                shown={showInvitePassword}
                onToggle={() => setShowInvitePassword((prev) => !prev)}
              />
            </div>
            <FieldError errors={[acceptInviteForm.formState.errors.password]} />
          </FieldContent>
        </Field>
      </MotionField>

      <motion.div
        variants={authItemVariants}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.995 }}
      >
        <Button type="submit" className={primaryButtonClassName}>
          <ShieldCheck data-icon="inline-start" />
          Accept Invite
        </Button>
      </motion.div>
    </motion.form>
  );
}