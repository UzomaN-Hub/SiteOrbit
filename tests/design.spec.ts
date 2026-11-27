import { expect, test, type Page } from "@playwright/test";

import { hasCredentials, publicPages, signIn } from "./helpers";

// carbon, bone, amber
const PALETTE: [number, number, number][] = [
  [17, 18, 20],
  [236, 234, 228],
  [217, 165, 32],
];

/** True if rgb is one of the three colours, or a mix of them over carbon. */
function onPalette([r, g, b]: number[]) {
  const [carbon] = PALETTE;
  return PALETTE.some(([pr, pg, pb]) => {
    // Solve for t in mix(colour, carbon, t) on the dominant channel and check the rest.
    const channels: [number, number, number][] = [
      [r, pr, carbon[0]],
      [g, pg, carbon[1]],
      [b, pb, carbon[2]],
    ];
    const [cr, cp, cc] = channels.reduce((a, c) => (Math.abs(c[1] - c[2]) > Math.abs(a[1] - a[2]) ? c : a));
    const t = cp === cc ? 1 : (cr - cc) / (cp - cc);
    if (t < -0.02 || t > 1.02) return false;
    return channels.every(([value, p, c]) => Math.abs(c + (p - c) * t - value) <= 6);
  });
}

async function collectColours(page: Page) {
  return page.evaluate(() => {
    const out: { tag: string; prop: string; value: string }[] = [];
    for (const element of document.querySelectorAll<HTMLElement>("body *")) {
      if (element.closest("svg, nextjs-portal, img, [data-allow-colour]")) continue;
      const style = getComputedStyle(element);
      if (style.visibility === "hidden" || style.display === "none") continue;
      for (const prop of ["color", "background-color", "border-top-color"] as const) {
        const value = style.getPropertyValue(prop);
        if (prop === "border-top-color" && style.borderTopWidth === "0px") continue;
        out.push({ tag: element.tagName.toLowerCase() + (element.className ? `.${String(element.className).split(" ")[0]}` : ""), prop, value });
      }
    }
    return out;
  });
}

function parseColour(value: string): { rgb: number[]; alpha: number } | null {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) {
    const srgb = value.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)/);
    if (!srgb) return null;
    return {
      rgb: [srgb[1], srgb[2], srgb[3]].map((part) => Number(part) * 255),
      alpha: srgb[4] ? Number(srgb[4]) : 1,
    };
  }
  const parts = match[1].split(/[ ,/]+/).filter(Boolean).map(Number);
  return { rgb: parts.slice(0, 3), alpha: parts[3] ?? 1 };
}

async function checkPage(page: Page) {
  // Fonts
  const fonts = await page.evaluate(async () => {
    await document.fonts.ready;
    const families = new Set<string>();
    document.querySelectorAll<HTMLElement>("body *").forEach((element) => {
      families.add(getComputedStyle(element).fontFamily.split(",")[0].trim().replace(/['"]/g, ""));
    });
    return [...families];
  });
  for (const family of fonts) {
    expect(family, "no banned or system font is first in the stack").not.toMatch(
      /^(Inter|Geist|Sora|Arial|Helvetica|system-ui|-apple-system|Segoe UI)$/i
    );
  }
  expect(fonts.some((family) => /fraunces/i.test(family))).toBe(true);
  expect(fonts.some((family) => /hanken/i.test(family))).toBe(true);

  // Colours
  const offPalette = (await collectColours(page)).filter(({ value }) => {
    const parsed = parseColour(value);
    if (!parsed || parsed.alpha === 0) return false;
    return !onPalette(parsed.rgb);
  });
  expect(offPalette, "every colour is carbon, bone or amber (or a mix)").toEqual([]);

  // No gradients or backdrop blur
  const effects = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("body *")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return (
          style.backgroundImage.includes("gradient") ||
          (style.backdropFilter && style.backdropFilter !== "none")
        );
      })
      .map((element) => element.outerHTML.slice(0, 120))
  );
  expect(effects).toEqual([]);

  // Radius by role
  const radii = await page.evaluate(() => {
    const read = (selector: string) =>
      [...new Set([...document.querySelectorAll<HTMLElement>(selector)].map((el) => getComputedStyle(el).borderTopLeftRadius))];
    return {
      button: read('[data-slot="button"]:not([data-variant="link"])'),
      input: read('[data-slot="input"]'),
      badge: read('[data-slot="badge"]'),
      card: read('[data-slot="card"]'),
    };
  });
  for (const value of radii.button) expect(["6px"]).toContain(value);
  for (const value of radii.input) expect(value).toBe("6px");
  for (const value of radii.badge) expect(value).toBe("3px");
  for (const value of radii.card) expect(value).toBe("10px");
}

for (const path of publicPages) {
  test(`design system holds on ${path}`, async ({ page }) => {
    await page.goto(path);
    await checkPage(page);
  });
}

test("design system holds on the dashboard", async ({ page }) => {
  test.skip(!hasCredentials, "Needs E2E_EMAIL and E2E_PASSWORD.");
  await signIn(page);
  await page.getByRole("heading", { level: 1, name: "Sites" }).waitFor();
  await checkPage(page);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  for (const path of publicPages) {
    test(`no transform or keyframe animations run on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const running = await page.evaluate(() =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running")
          .map((animation) => (animation as CSSAnimation).animationName ?? "transition")
      );
      expect(running).toEqual([]);
    });
  }
});

test("content is visible with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  for (const id of ["product", "how-it-works", "pricing"]) {
    const opacity = await page.locator(`#${id}`).evaluate((el) => getComputedStyle(el).opacity);
    expect(opacity).toBe("1");
  }
  await context.close();
});
