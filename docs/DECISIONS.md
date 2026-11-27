# Decisions

Why things are the way they are. Newest first. Each entry: the context, what was decided, and what it costs.

---

## 2026-11-27 · Redesign v2

### D-014 · Delivered the redesign as one branch, not one PR per phase
**Context.** `docs/redesign/BUILD_PLAN.md` asks for eight phase branches. The goal was to finish quickly, and the phases depend on each other (every page uses the new tokens and primitives).
**Decision.** One branch, `redesign/v2`, with one commit per phase so the history still reads phase by phase. Merge it with **Rebase and merge** to keep those commits, or **Squash** if you prefer one commit on `main`.
**Cost.** A larger PR to review. The screenshots in `docs/redesign/screenshots/` are there to make that faster.

### D-013 · CSS motion instead of framer-motion
**Context.** framer-motion drove the delayed blank auth pages, infinite orb and glow loops, blur-in reveals and spring hover lifts. These were most of what made the app look generated.
**Decision.** Removed the library. Motion is CSS keyframes and transitions on two duration tokens and one easing curve, plus one shared `IntersectionObserver` (`components/marketing/reveal.tsx`) for section reveals. Content is visible without JavaScript, and everything turns off under `prefers-reduced-motion`.
**Cost.** No physics-based springs or layout animations. If drag-to-reorder lands in the builder, revisit this then.

### D-012 · Tokens wipe Tailwind's defaults
**Decision.** `@theme inline` resets `--color-*`, `--radius-*`, `--shadow-*`, `--blur-*` and `--font-*` before defining the product tokens. `bg-slate-900`, `rounded-2xl` and `shadow-xl` no longer exist, so they can't come back by accident. `scripts/design-lint.mjs` catches anything that slips through as an arbitrary value.
**Cost.** Copy-pasted Tailwind snippets need translating to the tokens.

### D-011 · Typography utilities are `type-*`, not `text-*`
**Context.** `tailwind-merge` treats any unknown `text-foo` class as a text colour, so `cn("text-h2", "text-text-muted")` would silently drop the size.
**Decision.** Type scale classes are `type-display`, `type-h1` … `type-small`.

### D-010 · Status is a dot and a word, never a colour fill
**Decision.** No red, green or blue. Live is a solid amber dot; everything else is a hollow muted ring. Errors use an amber border and a warning icon. Destructive actions are outline buttons that open a confirm dialog naming the thing being deleted.

### D-009 · Dashboard and Projects merged into Sites
**Context.** Both pages listed the same projects; the dashboard added stat cards, an "activity" list and a fake "Plan usage 65%" widget.
**Decision.** `/dashboard` is the Sites home: a one-line summary, a filterable table and an empty state. `/projects` and `/templates` redirect there (`next.config.ts`). Plan details moved to Settings → Billing, using real data only.
**Cost.** The activity feed is gone. If it's useful, it belongs under Analytics later.

### D-008 · The builder is its own route group
**Decision.** `app/(editor)/builder` gets the auth guard but not the app shell, so the builder is full screen with its own 56px toolbar. The URL is unchanged.

### D-007 · No loading gates
**Decision.** Removed the "Loading SiteOrbit" screen and the auth bootstrap spinner. Pages render immediately with skeletons sized like the real content. The auth guard (`components/providers/auth-bootstrap-provider.tsx`) renders nothing and redirects in the background.

### D-006 · Honest pages over placeholder pages
**Decision.**
- *Forgot password* says that email reset isn't available yet, instead of faking a "link sent" toast.
- *Accept invite* now calls the real `/workspaces/invitations/accept` endpoint. It used to be a fake four-step wizard.
- *Templates* (hard-coded "24 templates") is removed.
- Removed the fake testimonial, the "1,500 teams" claim, footer links that all pointed to `/`, the Facebook link and the four stock photos.

### D-005 · Bug fixes found during the audit
| Bug | Effect | Fix |
|---|---|---|
| `syncAuthCookieFromStorage` read `localStorage` while the store persists to `sessionStorage` | The auth cookie was cleared on every page load, so client-side navigation bounced signed-in users to sign-in | Read `sessionStorage` (`lib/auth/session.ts`) |
| Inactivity timeout was 2 minutes | People were signed out mid-edit | 30 minutes |
| No session at all (new tab) left signed-in pages empty forever | Blank dashboard | Guard redirects to `/sign-in?redirect=…` |
| `?redirect=` was used unchecked after sign-in | Open redirect | `safeRedirect()` only allows same-origin paths |
| Deleting a project asked twice (`window.confirm` plus dialog) | Annoying, and the native dialog was unstyled | One dialog that names the site |
| Builder kept the previous page's unsaved blocks after navigating away | Edits leaked between sites | Reset the builder store on unmount |
| Publishing from the builder skipped unsaved edits | The live site lacked recent changes | Save first, then publish |
| A new site could get two homepages (React dev double effect) | Duplicate pages | Ref guard on default-page creation |
| `/accept-invite` redirected signed-in users to the dashboard | Invites couldn't be accepted | Removed it from the guest-only routes |
| `app/page.tsx` and `app/(marketing)/page.tsx` both claimed `/` | Ambiguous route | Removed the duplicate |
| Dashboard empty state compared against a hard-coded backend sentence | Broke if the copy changed | Uses the project count |

### D-004 · Dependencies
Removed: `framer-motion`, `next-themes` (the theme is dark only), `react-icons` (one icon), `@tanstack/react-table`, `cmdk`, `react-resizable-panels`, `@dnd-kit/*`, `tw-animate-css` (all unused) and `shadcn` (a CLI, not a runtime dependency). Upgraded Next to 16.4 and React to 19.3. Added `@playwright/test` and `@axe-core/playwright` as dev dependencies. TypeScript 7, ESLint 10 and `@hookform/resolvers` 7 are major upgrades left for a separate PR.

### D-003 · Ports 4317 and 4318
3000, 5173 and 8080 are taken on the dev machine. `npm run dev` uses 4317; the test server uses 4318. The API's `FRONTEND_URL` must match for CORS.

### D-002 · E2E tests sign in once
The API rate-limits logins to 5 a minute. `tests/global-setup.ts` signs in once through the API and `tests/helpers.ts` injects that session; only one test uses the real form.

### D-001 · Client theme defaults are customer content
The defaults for a client's own site theme (`lib/constants/branding.ts`, mirrored in the API's `app/schemas/theme.py`) are the one place outside `globals.css` allowed to hold hex values. They used to be SiteOrbit's old teal UI colours, which leaked our branding into client sites.
