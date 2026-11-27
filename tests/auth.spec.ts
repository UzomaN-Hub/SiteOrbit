import { expect, test } from "@playwright/test";

import { hasCredentials, signInWithForm } from "./helpers";

for (const path of ["/sign-in", "/sign-up"]) {
  test(`${path} is a single centred column, visible immediately`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const form = page.locator("form");
    await expect(form).toBeVisible({ timeout: 1000 });

    const box = await form.boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    expect(box!.width).toBeLessThanOrEqual(400);
    if (viewport && viewport.width >= 1024) {
      const centre = box!.x + box!.width / 2;
      expect(Math.abs(centre - viewport.width / 2)).toBeLessThan(24);
      // No second column: nothing sizeable sits beside the form.
      const sideContent = await page.evaluate((formRight) => {
        return [...document.querySelectorAll("main *")].some((element) => {
          const rect = element.getBoundingClientRect();
          return rect.left > formRight + 40 && rect.width > 120 && rect.height > 120;
        });
      }, box!.x + box!.width);
      expect(sideContent).toBe(false);
    }
  });
}

test("empty submit shows field errors and focuses the first invalid field", async ({ page }) => {
  await page.goto("/sign-up");
  await page.getByRole("button", { name: "Create account" }).click();

  const name = page.getByRole("textbox", { name: "Full name" });
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
  await expect(page.getByRole("textbox", { name: "Work email" })).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Enter your full name")).toBeVisible();
});

test("a wrong password shows a readable server error", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/sign-in");
  await page.getByRole("textbox", { name: "Email" }).fill("nobody@example.com");
  await page.getByLabel("Password", { exact: true }).fill("definitely-wrong-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  // Scope to the form: Next's route announcer also has role="alert".
  const alert = page.locator("form").getByRole("alert");
  await expect(alert).toBeVisible({ timeout: 75_000 });
  await expect(alert).not.toHaveText(/^\s*$/);
});

test("signed-out visit to the dashboard redirects to sign-in with the redirect kept", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/sign-in\?redirect=%2Fdashboard$/);
});

test("sign-in and sign-up link to each other", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByRole("link", { name: "Create an account" }).click();
  await expect(page).toHaveURL(/\/sign-up$/);
  await page.getByRole("link", { name: "Sign in" }).last().click();
  await expect(page).toHaveURL(/\/sign-in$/);
});

test("signing in through the form returns to the redirect target", async ({ page }) => {
  test.skip(!hasCredentials, "Needs E2E_EMAIL and E2E_PASSWORD.");
  await signInWithForm(page, "/team");
  await expect(page.getByRole("heading", { level: 1, name: "Team" })).toBeVisible();
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { level: 1, name: "Sites" })).toBeVisible();
});
