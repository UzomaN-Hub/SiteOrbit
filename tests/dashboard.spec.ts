import { expect, test } from "@playwright/test";

import { requireCredentials, signIn } from "./helpers";

test.describe("dashboard", () => {
  test.beforeEach(async ({ page }) => {
    requireCredentials();
    await signIn(page);
  });

  test("has no sidebar", async ({ page }) => {
    await expect(page.locator('[data-slot="sidebar"]')).toHaveCount(0);
    const pinnedLeftNav = await page.evaluate(() =>
      [...document.querySelectorAll("nav, aside")].some((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left <= 1 && rect.height >= window.innerHeight - 2 && rect.width < 400;
      })
    );
    expect(pinnedLeftNav).toBe(false);
  });

  test("workspace switcher and account menu work from the keyboard", async ({ page }) => {
    for (const name of [/switch workspace/i, /Account menu/]) {
      const trigger = page.getByRole("button", { name });
      await trigger.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("menu")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("menu")).toHaveCount(0);
    }
  });

  test("each tab navigates and marks itself current", async ({ page }) => {
    const tabs: [string, RegExp][] = [
      ["Analytics", /\/analytics/],
      ["Team", /\/team/],
      ["Domains", /\/domains/],
      ["Settings", /\/settings/],
      ["Sites", /\/dashboard/],
    ];
    const nav = page.getByRole("navigation", { name: "Workspace sections" });
    for (const [label, url] of tabs) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(url);
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
    }
  });

  test("the page body never scrolls sideways", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    );
    expect(overflow).toBe(true);
  });

  test("shows the sites table or the empty state", async ({ page }) => {
    await expect(
      page.getByRole("table").or(page.getByRole("heading", { name: /No sites yet|No workspace yet/ }))
    ).toBeVisible();
    await expect(page.locator(".animate-spin")).toHaveCount(0);
  });
});
