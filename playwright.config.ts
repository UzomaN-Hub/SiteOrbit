import { defineConfig, devices } from "@playwright/test";

/**
 * E2E, accessibility and design checks (docs/redesign/TESTING.md §3).
 * Tests run against a production build on port 4318. Signed-in tests need
 * E2E_EMAIL and E2E_PASSWORD (keep them in .env.test.local, never commit them).
 */
const PORT = 4318;

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./tests/global-setup.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "off",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
  ],
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
