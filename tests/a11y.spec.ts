import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { hasCredentials, publicPages, signIn } from "./helpers";

async function seriousViolations(page: import("@playwright/test").Page) {
  // Let entrance fades finish: mid-fade text is partly transparent, which axe
  // would report as low contrast.
  await page.evaluate(() =>
    Promise.all(document.getAnimations().map((animation) => animation.finished.catch(() => null)))
  );
  const results = await new AxeBuilder({ page }).exclude("nextjs-portal").analyze();
  return results.violations
    .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
    .map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`);
}

for (const path of publicPages) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    expect(await seriousViolations(page)).toEqual([]);
  });

  test(`${path}: keyboard reaches the main action with a visible focus ring`, async ({ page }) => {
    await page.goto(path);
    const target = path === "/" ? "Start free" : path === "/sign-in" ? "Sign in" : "Create account";

    let reached = false;
    for (let step = 0; step < 25 && !reached; step += 1) {
      await page.keyboard.press("Tab");
      reached = await page.evaluate((name) => {
        const active = document.activeElement as HTMLElement | null;
        return Boolean(active && active.textContent?.trim() === name);
      }, target);
    }
    expect(reached, `Tab reaches "${target}"`).toBe(true);

    const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
    expect(outline).not.toBe("none");
  });
}

test("the dashboard has no serious accessibility violations", async ({ page }) => {
  test.skip(!hasCredentials, "Needs E2E_EMAIL and E2E_PASSWORD.");
  await signIn(page);
  await page.getByRole("heading", { level: 1, name: "Sites" }).waitFor();
  expect(await seriousViolations(page)).toEqual([]);
});
