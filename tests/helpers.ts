import { readFileSync } from "node:fs";
import { expect, type Page, test } from "@playwright/test";

import { SESSION_FILE } from "./global-setup";

export const credentials = {
  email: process.env.E2E_EMAIL,
  password: process.env.E2E_PASSWORD,
};

export const hasCredentials = Boolean(credentials.email && credentials.password);

export function requireCredentials() {
  test.skip(
    !hasCredentials,
    "Set E2E_EMAIL and E2E_PASSWORD (in .env.test.local) to run signed-in tests."
  );
}

/** Starts a page already signed in, using the session from global-setup. */
export async function signIn(page: Page, target = "/dashboard") {
  const session = JSON.parse(readFileSync(SESSION_FILE, "utf8")) as {
    accessToken: string;
    refreshToken: string;
    user: unknown;
  };

  const baseURL = test.info().project.use.baseURL ?? "http://localhost:4318";
  await page.context().addCookies([
    { name: "siteorbit_access_token", value: session.accessToken, url: baseURL },
  ]);
  await page.addInitScript((value) => {
    window.sessionStorage.setItem("siteorbit-auth", value);
  }, JSON.stringify({ state: { ...session, isAuthenticated: true }, version: 0 }));

  await page.goto(target);
}

/** Signs in through the real form. Use sparingly: the API allows 5 logins a minute. */
export async function signInWithForm(page: Page, redirect: string) {
  await page.goto(`/sign-in?redirect=${encodeURIComponent(redirect)}`);
  await page.getByRole("textbox", { name: "Email" }).fill(credentials.email ?? "");
  await page.getByLabel("Password", { exact: true }).fill(credentials.password ?? "");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.waitForURL(`**${redirect}`, { timeout: 60_000 });
}

/** Pages every design and accessibility check runs on. */
export const publicPages = ["/", "/sign-in", "/sign-up"];

export { expect };
