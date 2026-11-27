import { z } from "zod";

/** Matches the backend rule in backend/app/schemas/auth.py (min 6). */
export const PASSWORD_MIN = 6;

const email = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .email("That doesn't look like an email address. Check for typos.");

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password."),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name (at least 2 characters)."),
  email,
  password: z
    .string()
    .min(PASSWORD_MIN, `Use at least ${PASSWORD_MIN} characters.`)
    .max(128, "Use 128 characters or fewer."),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
