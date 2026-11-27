import { expect, test } from "@playwright/test";

const ALLOWED_EXTERNAL = [/^https:\/\/github\.com\//, /^https:\/\/(www\.)?linkedin\.com\//];
const BANNED_COPY = [
  /Marcus Thorne/i,
  /Helix Creative/i,
  /1,500 teams/i,
  /Digital Curator/i,
  /your orbit/i,
  /Engineered for/i,
  /premium/i,
];

test.describe("landing page", () => {
  test("loads with the right title and shows the hero immediately", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle("SiteOrbit · Website builder for teams");

    const hero = page.getByRole("heading", {
      level: 1,
      name: "Build and publish sites for every client from one workspace.",
    });
    await expect(hero).toBeVisible({ timeout: 1000 });
    await expect(page.getByRole("link", { name: "Start free" }).first()).toBeVisible({ timeout: 1000 });
    await expect(page.getByRole("link", { name: "See how it works" })).toBeVisible({ timeout: 1000 });
  });

  test("primary actions go to the right places", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Start free" }).first()).toHaveAttribute("href", "/sign-up");

    await page.getByRole("link", { name: "See how it works" }).click();
    await expect(page).toHaveURL(/#how-it-works$/);
    await expect(page.getByRole("heading", { name: "How it works" })).toBeInViewport();
  });

  test("every link resolves", async ({ page, request }) => {
    await page.goto("/");
    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? "")
    );
    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of new Set(hrefs)) {
      if (href.startsWith("#")) {
        await expect(page.locator(href), `anchor ${href} exists`).toHaveCount(1);
      } else if (href.startsWith("/")) {
        const response = await request.get(href, { maxRedirects: 0 });
        expect(response.status(), `${href} responds`).toBeLessThan(400);
      } else if (href.startsWith("mailto:")) {
        continue;
      } else {
        expect(
          ALLOWED_EXTERNAL.some((pattern) => pattern.test(href)),
          `external link ${href} is allowed`
        ).toBe(true);
      }
    }
  });

  test("has no invented social proof or banned copy", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("body").innerText();
    for (const pattern of BANNED_COPY) {
      expect(text, `page text must not match ${pattern}`).not.toMatch(pattern);
    }
  });

  test("footer year is the current year", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toContainText(`© ${new Date().getFullYear()} SiteOrbit`);
  });
});
