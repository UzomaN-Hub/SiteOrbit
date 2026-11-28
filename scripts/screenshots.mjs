#!/usr/bin/env node
/**
 * Captures review screenshots (TESTING.md §4) at 390px and 1440px in both
 * themes, plus the landing-page hero image for each theme. Run against a local stack:
 *
 *   API_URL=http://localhost:8417/api/v1 APP_URL=http://localhost:4317 \
 *   SEED=1 node scripts/screenshots.mjs
 *
 * SEED=1 creates a demo account and sample client sites through the API.
 * Only point it at a local or throwaway backend.
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";

const API = process.env.API_URL ?? "http://localhost:8417/api/v1";
const APP = process.env.APP_URL ?? "http://localhost:4317";
const EMAIL = process.env.DEMO_EMAIL ?? "demo@northfield.studio";
const PASSWORD = process.env.DEMO_PASSWORD ?? "demo-password-2026";
const OUT = "docs/redesign/screenshots";

async function api(path, { method = "GET", body, token } = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(`${method} ${path} → ${response.status} ${text}`);
  return data;
}

async function seed() {
  let auth;
  try {
    auth = await api("/auth/register", {
      method: "POST",
      body: { name: "Ada Okafor", email: EMAIL, password: PASSWORD },
    });
  } catch {
    auth = await api("/auth/login", { method: "POST", body: { email: EMAIL, password: PASSWORD } });
    console.log("Demo account exists; reusing it.");
    return auth.access_token;
  }
  const token = auth.access_token;
  const workspace = await api("/workspaces/", {
    method: "POST",
    token,
    body: { name: "Northfield Studio" },
  });
  const sites = [
    ["Harbour Dental", "Booking site for the Leeds clinic", true],
    ["Calder Bakery", "Menu, opening hours and wholesale orders", true],
    ["Moss & Pine Landscaping", "Portfolio and quote request form", false],
    ["Ridgeway Physio", "New site for the spring relaunch", false],
  ];
  for (const [name, description, live] of sites) {
    const site = await api("/projects/", {
      method: "POST",
      token,
      body: { workspace_id: workspace.id, name, description, status: "draft" },
    });
    await api("/pages/", {
      method: "POST",
      token,
      body: {
        site_id: site.id,
        title: "Homepage",
        path: "/",
        layout_json: JSON.stringify({
          blocks: [
            {
              id: "b1",
              type: "hero",
              props: {
                title: `${name}`,
                subtitle: description,
                buttonLabel: "Book an appointment",
              },
            },
            {
              id: "b2",
              type: "features",
              props: {
                title: "What we offer",
                items: ["Same-week appointments", "Evening hours", "Free first visit"],
              },
            },
            {
              id: "b3",
              type: "cta",
              props: {
                title: "Ready when you are",
                subtitle: "We reply to every message within one working day.",
                buttonLabel: "Get in touch",
              },
            },
          ],
        }),
      },
    });
    if (live) await api(`/projects/${site.id}/publish`, { method: "POST", token });
  }
  console.log("Seeded demo workspace.");
  return token;
}

const HIDE_DEV = "nextjs-portal{display:none!important}";

async function shoot(page, name, width, theme) {
  await page.addStyleTag({ content: HIDE_DEV });
  await page.waitForTimeout(900);
  const file = `${name}-${width}${theme === "light" ? "-light" : ""}.png`;
  await page.screenshot({ path: `${OUT}/${file}`, fullPage: true });
  console.log(`  ${file}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  if (process.env.SEED) await seed();

  const browser = await chromium.launch();

  // Four sign-ins in total: the API allows five a minute.
  for (const theme of ["dark", "light"]) for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
      deviceScaleFactor: width === 390 ? 2 : 1,
      reducedMotion: "reduce",
      colorScheme: theme,
    });
    const page = await context.newPage();

    await page.goto(`${APP}/`);
    await shoot(page, "landing", width, theme);
    await page.goto(`${APP}/sign-up`);
    await shoot(page, "sign-up", width, theme);
    await page.goto(`${APP}/sign-in`);
    await shoot(page, "sign-in", width, theme);

    await page.getByLabel("Email").fill(EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForURL("**/dashboard");
    await page.getByRole("table").waitFor();
    await shoot(page, "dashboard", width, theme);

    if (width === 1440) {
      // Landing-page hero: the Sites page at 1600px, cropped to the content
      // column so it still reads at ~480px wide.
      await page.setViewportSize({ width: 1600, height: 720 });
      await page.waitForTimeout(600);
      const hero = `public/images/hero-product${theme === "light" ? "-light" : ""}.png`;
      await page.screenshot({ path: hero, clip: { x: 200, y: 0, width: 1200, height: 600 } });
      console.log(`  ${hero}`);
      await page.setViewportSize({ width, height: 900 });
    }

    await page.goto(`${APP}/team`);
    await page.getByRole("table").first().waitFor();
    await shoot(page, "team", width, theme);

    await page.goto(`${APP}/settings?tab=branding`);
    await page.getByText("Client brand").waitFor();
    await shoot(page, "settings-branding", width, theme);

    await page.goto(`${APP}/dashboard`);
    await page.getByRole("link", { name: "Harbour Dental" }).click();
    await page.getByRole("button", { name: /Edit Hero section/ }).waitFor();
    await page.getByRole("button", { name: /Edit Hero section/ }).click();
    await shoot(page, "builder", width, theme);

    await context.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
