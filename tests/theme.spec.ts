import { expect, test } from "@playwright/test";

import { hasCredentials, signIn } from "./helpers";

const theme = (page: import("@playwright/test").Page) =>
  page.locator("html").getAttribute("data-theme");

test.describe("theme", () => {
  test("follows the system setting by default", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    expect(await theme(page)).toBe("light");

    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("is set before the first paint", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    // Read the attribute as soon as <body> exists, before React has loaded.
    await page.addInitScript(() => {
      new MutationObserver((_, observer) => {
        if (document.body) {
          (window as unknown as { firstTheme?: string }).firstTheme =
            document.documentElement.dataset.theme;
          observer.disconnect();
        }
      }).observe(document, { childList: true, subtree: true });
    });
    await page.goto("/");
    expect(await page.evaluate(() => (window as unknown as { firstTheme?: string }).firstTheme)).toBe(
      "light"
    );
  });

  test("the footer switch changes the theme and remembers it", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const group = page.getByRole("group", { name: "Theme" });

    await group.getByRole("button", { name: "Light" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(group.getByRole("button", { name: "Light" })).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await page.goto("/sign-in");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await page.goto("/");
    await page.getByRole("group", { name: "Theme" }).getByRole("button", { name: "System" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("the landing page shows the screenshot that matches the theme", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const figure = page.locator("figure").first();
    await expect(figure.locator('img[src*="hero-product-light"]')).toBeVisible();
    await expect(figure.locator('img[src*="hero-product.png"]')).toBeHidden();
  });

  test("the account menu changes the theme", async ({ page }) => {
    test.skip(!hasCredentials, "Needs E2E_EMAIL and E2E_PASSWORD.");
    await page.emulateMedia({ colorScheme: "dark" });
    await signIn(page);
    await page.getByRole("button", { name: "Account menu" }).click();
    await page.getByRole("menuitem", { name: "Light" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    // The menu stays open so you can compare.
    await expect(page.getByRole("menuitem", { name: "Dark" })).toBeVisible();
  });
});
