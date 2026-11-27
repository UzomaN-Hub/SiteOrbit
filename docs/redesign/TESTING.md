# SiteOrbit Testing Plan

"Tested fully" means the following all pass on every phase's pull request, plus a manual visual check at the end. Keep the suite small and focused on what this redesign changes.

## 1. Commands

Add these scripts to `package.json` (adapt names if equivalents already exist):

| Script | Command | What it checks |
|---|---|---|
| `dev` | `next dev -p 4317` | Local dev server. Never use 3000, 5173 or 8080. |
| `typecheck` | `tsc --noEmit` | Types |
| `lint` | existing ESLint config | Code style |
| `lint:design` | `node scripts/design-lint.mjs` | Banned styles (see §2) |
| `build` | `next build` | Production build |
| `test:e2e` | `playwright test --trace off` | End-to-end, accessibility and visual checks |

Run order before every push: `typecheck`, `lint`, `lint:design`, `build`, `test:e2e`. If a test fails, re-run only that test file while fixing it.

## 2. Design lint (`scripts/design-lint.mjs`)

A plain Node script with no dependencies. It scans `app/`, `components/`, `lib/` and `styles/` (`.ts`, `.tsx`, `.css`) and exits with an error listing file and line for any match:

| Rule | Pattern (case-insensitive) | Allowed in |
|---|---|---|
| No gradients | `gradient`, `from-[a-z]`, `via-[a-z]`, `to-[a-z]-\d` in classNames | nowhere |
| No gradient text | `bg-clip-text`, `text-transparent` | nowhere |
| No blur effects | `backdrop-blur`, `blur-` | nowhere |
| No glow shadows | `shadow-\[`, `shadow-(lg\|xl\|2xl)`, `drop-shadow` | nowhere |
| No raw colours | `#[0-9a-f]{3,8}\b`, `rgb\(`, `rgba\(`, `hsl\(`, `oklch\(` | `app/globals.css`, `app/opengraph-image.tsx`, `app/icon.svg` |
| No palette classes | `(text\|bg\|border\|ring\|from\|to)-(slate\|gray\|zinc\|neutral\|teal\|cyan\|emerald\|indigo\|violet\|purple\|blue\|sky)-\d` | nowhere |
| No big or arbitrary radius | `rounded-(xl\|2xl\|3xl)`, `rounded-\[` | nowhere |
| Pills only where allowed | `rounded-full` | files under `components/ui/avatar*`, `components/ui/radio*`, and any element with a `data-allow-round` attribute on the same line |
| No eyebrow labels | `uppercase` on the same line as `tracking-` | nowhere |
| No banned fonts | `Inter`, `Geist`, `Sora`, `Space Grotesk` | nowhere |
| No banned copy | `(?<!site)orbit` (catches "your orbit" but not the brand name), `velocity`, `curator`, `control layer`, `surgical`, `premium`, `elite`, `seamless` | nowhere (user-generated content excluded) |
| No placeholder links | `href="#"`, `href="/"` on anything except the logo, `facebook.com` | nowhere |
| No spinners for page loads | `animate-spin` | `components/ui/button*` only if used inside the loading state |

Keep the rule list in one array at the top of the script so it's easy to adjust.

## 3. End-to-end tests (Playwright)

Config: `playwright.config.ts` with `webServer: { command: "npm run build && npm run start -- -p 4318", port: 4318, reuseExistingServer: true }`, Chromium only, two projects: **desktop** (1440×900) and **mobile** (iPhone 13 device preset). Traces off by default.

Test credentials come from environment variables `E2E_EMAIL` and `E2E_PASSWORD` (Uzoma provides them, stored in `.env.test.local`, which is git-ignored). Tests that need sign-in are skipped with a clear message when these are missing. Never commit credentials.

### `tests/landing.spec.ts`
- Page loads with status 200 and the title "SiteOrbit · Website builder for teams".
- The hero headline, "Start free" and "See how it works" are visible **immediately** on load (no loading gate; assert within 1s of `domcontentloaded`).
- "Start free" goes to `/sign-up`. "See how it works" scrolls to `#how-it-works`.
- **Every link on the page resolves:** collect all `a[href]`, request internal ones and expect 2xx/3xx, and check anchors exist on the page. External links must be in an allowlist (GitHub, LinkedIn).
- No text matches the banned copy list (testimonial name, "1,500 teams", "Digital Curator").
- Footer year equals the current year.

### `tests/auth.spec.ts`
- `/sign-in` and `/sign-up` render a single column: the form's bounding box is centred and at most 400px wide, and no second column exists at 1440px.
- The form is visible immediately (no blank delay).
- Submitting empty shows field errors, sets `aria-invalid`, and moves focus to the first invalid field.
- A wrong password shows the server error box with readable text (use an obviously fake email at a reserved domain like `nobody@example.com`; don't create accounts).
- Visiting `/dashboard` signed out redirects to `/sign-in?redirect=%2Fdashboard`. After signing in (only when `E2E_*` is set) it lands on `/dashboard`.
- Links between sign-in and sign-up work.

### `tests/dashboard.spec.ts` (needs `E2E_*`)
- There's no sidebar: no element with `data-slot="sidebar"`, and no navigation element pinned to the left edge at full page height.
- The top bar shows the workspace switcher and account menu, and both open with keyboard (Enter) and close with Escape.
- Each tab navigates to its route and sets `aria-current="page"`.
- On mobile, the tab row scrolls horizontally and the page body doesn't (`document.documentElement.scrollWidth <= innerWidth`).
- The Sites table or the empty state renders. Skeleton rows appear while loading instead of a spinner.

### `tests/design.spec.ts` (runs on landing, sign-in, sign-up and, when signed in, dashboard)
- Fonts: `document.fonts.check('600 28px Fraunces')` and `document.fonts.check('16px "Hanken Grotesk"')` are true, and no computed `font-family` on the page starts with Inter, Geist, Sora, Arial or a system font.
- Colours: walk all visible elements and collect computed `color`, `background-color` and `border-color`. Every value must be one of carbon, bone or amber, or one of those at reduced opacity / mixed over carbon (allow a small tolerance). Fail with the element and value otherwise.
- No computed `background-image` contains `gradient`, and no `backdrop-filter` is set.
- Radius by role: buttons are 6px, inputs 6px, badges 3px, cards 10px, dialogs 16px. Fail if more than one radius appears on elements of the same role, or if cards and buttons share a radius.
- Reduced motion: with `reducedMotion: "reduce"`, `document.getAnimations()` returns no running transform or keyframe animations after load.

### `tests/a11y.spec.ts`
- Run `@axe-core/playwright` on landing, sign-in, sign-up and (signed in) dashboard home. Zero serious or critical violations.
- Keyboard: Tab from the top of each page reaches the main action, and the focus ring is visible (the computed outline isn't `none`).

## 4. Visual check (manual, final phase)

Take full-page screenshots of landing, sign-in, sign-up, dashboard home and one other tab, at 390px and 1440px, and save them to `docs/redesign/screenshots/` for Uzoma to review. Don't add screenshot-comparison assertions until Uzoma approves the look; after that, `toHaveScreenshot` baselines can be added if wanted.

## 5. Definition of done

- All scripts in §1 pass on the final pull request.
- The cleanup checklist in `FRONTEND.md` §5 is fully ticked.
- Screenshots are in `docs/redesign/screenshots/`.
- Uzoma has reviewed the deployed Vercel preview.
