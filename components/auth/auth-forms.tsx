"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import OAuthButtons, { AuthDivider } from "@/components/auth/oauth-buttons";
import PasswordInput from "@/components/auth/password-input";
import { errorMessage } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FormAlert,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { ApiError } from "@/lib/api/client";
import {
  PASSWORD_MIN,
  signInSchema,
  signUpSchema,
  type SignInSchema,
  type SignUpSchema,
} from "@/lib/validators/auth";

function describeAuthError(error: unknown, mode: "sign-in" | "sign-up") {
  if (error instanceof ApiError) {
    if (mode === "sign-in" && (error.status === 401 || error.status === 400)) {
      if (/uses .* sign-in/i.test(error.message)) return error.message;
      return "That email and password don't match. Try again or reset your password.";
    }
    if (mode === "sign-up" && error.status === 409) {
      return "There's already an account with this email. Sign in instead.";
    }
    if (error.status === 429) {
      return "Too many attempts in a short time. Wait a minute, then try again.";
    }
    if (error.status === 422) {
      return "Some details aren't valid. Check the fields and try again.";
    }
    if (error.status >= 500) {
      return "Something went wrong on our side. Try again in a minute.";
    }
  }
  return errorMessage(error, "We couldn't reach the server. Check your connection and try again.");
}

function withRedirect(href: string, redirect: string) {
  return redirect === "/dashboard" ? href : `${href}?redirect=${encodeURIComponent(redirect)}`;
}

export function SignInForm({ redirect }: { redirect: string }) {
  const router = useRouter();
  const { signInMutation } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const { errors } = form.formState;
  const busy = signInMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      await signInMutation.mutateAsync(values);
      router.push(redirect);
      router.refresh();
    } catch (error) {
      setServerError(describeAuthError(error, "sign-in"));
    }
  });

  return (
    <>
      <OAuthButtons redirect={redirect} disabled={busy} onError={setServerError} />
      <AuthDivider />

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <FormAlert message={serverError} />

        <fieldset disabled={busy} className="flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              size="lg"
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...form.register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </Field>

          <Field>
            <div className="flex items-baseline justify-between gap-3">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/forgot-password"
                className="rounded-xs type-small text-text underline underline-offset-[3px] hover:decoration-2"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              size="lg"
              autoComplete="current-password"
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...form.register("password")}
            />
            <FieldError id="password-error" message={errors.password?.message} />
          </Field>
        </fieldset>

        <Button type="submit" size="auth" className="w-full" loading={busy}>
          Sign in
        </Button>
      </form>

      <p className="mt-8 type-body text-text-muted">
        New to SiteOrbit?{" "}
        <Link
          href={withRedirect("/sign-up", redirect)}
          className="rounded-xs text-text underline underline-offset-[3px] hover:decoration-2"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}

export function SignUpForm({ redirect }: { redirect: string }) {
  const router = useRouter();
  const { signUpMutation } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const { errors } = form.formState;
  const busy = signUpMutation.isPending;

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      await signUpMutation.mutateAsync(values);
      router.push(redirect);
      router.refresh();
    } catch (error) {
      setServerError(describeAuthError(error, "sign-up"));
    }
  });

  return (
    <>
      <OAuthButtons redirect={redirect} disabled={busy} onError={setServerError} />
      <AuthDivider />

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <FormAlert message={serverError} />

        <fieldset disabled={busy} className="flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input
              id="name"
              size="lg"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...form.register("name")}
            />
            <FieldError id="name-error" message={errors.name?.message} />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Work email</FieldLabel>
            <Input
              id="email"
              type="email"
              size="lg"
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...form.register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <PasswordInput
              id="password"
              size="lg"
              autoComplete="new-password"
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? "password-error" : "password-help"}
              {...form.register("password")}
            />
            {errors.password ? (
              <FieldError id="password-error" message={errors.password.message} />
            ) : (
              <FieldDescription id="password-help">
                At least {PASSWORD_MIN} characters.
              </FieldDescription>
            )}
          </Field>
        </fieldset>

        <Button type="submit" size="auth" className="w-full" loading={busy}>
          Create account
        </Button>
      </form>

      <p className="mt-8 type-body text-text-muted">
        Already have an account?{" "}
        <Link
          href={withRedirect("/sign-in", redirect)}
          className="rounded-xs text-text underline underline-offset-[3px] hover:decoration-2"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
