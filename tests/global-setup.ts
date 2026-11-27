import { mkdir, readFile, writeFile } from "node:fs/promises";

/**
 * Signs in once through the API and saves the session for signed-in tests.
 * The backend rate-limits logins (5 a minute), so tests must not each log in
 * through the form. The session lives in sessionStorage, which Playwright's
 * storageState doesn't capture, so helpers.ts injects it instead.
 */
export const SESSION_FILE = "tests/.auth/session.json";

async function apiUrl() {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  try {
    const env = await readFile(".env", "utf8");
    const match = env.match(/^NEXT_PUBLIC_API_URL=(.+)$/m);
    if (match) return match[1].trim();
  } catch {
    // no .env; fall through
  }
  return "http://localhost:8000/api/v1";
}

export default async function globalSetup() {
  const { E2E_EMAIL, E2E_PASSWORD } = process.env;
  if (!E2E_EMAIL || !E2E_PASSWORD) return;

  const response = await fetch(`${(await apiUrl()).replace(/\/$/, "")}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: E2E_EMAIL, password: E2E_PASSWORD }),
  });
  if (!response.ok) {
    throw new Error(`E2E sign-in failed with ${response.status}. Check E2E_EMAIL and E2E_PASSWORD.`);
  }

  const data = await response.json();
  await mkdir("tests/.auth", { recursive: true });
  await writeFile(
    SESSION_FILE,
    JSON.stringify({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      user: data.user,
    })
  );
}
