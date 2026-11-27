# Learning path

What this codebase uses, why it matters, and where to look in the repo. Work top to bottom: each stage builds on the last. Tick items off as you go.

## Stage 1 · Design systems (the biggest jump in how the app looks)

- [ ] **Design tokens.** One file (`app/globals.css`) defines every colour, radius, duration and shadow. Components only reference names. Changing amber means changing one line.
  *Read:* `app/globals.css`, then `docs/redesign/DESIGN.md` §2–5.
- [ ] **`color-mix()`.** Every grey here is bone mixed into carbon at a percentage. Three base colours produce the whole palette.
- [ ] **Radius and size by role.** Badge 3px, button 6px, card 10px, dialog 16px. Inner elements always have a smaller radius than their container. This is most of what separates "designed" from "template".
- [ ] **Type scale.** Nine sizes, each with a job. Find every `type-*` class and see which role it plays.
- [ ] **Why "AI look" happens.** Gradients, glows, pill badges, uppercase eyebrows and identical cards are what you get when nothing is decided. `scripts/design-lint.mjs` lists them as rules.
  *Exercise:* add `bg-gradient-to-r` somewhere and run `npm run lint:design`.

## Stage 2 · Tailwind CSS 4

- [ ] `@theme inline` and resetting namespaces (`--color-*: initial`).
- [ ] `@utility` for custom utilities (`type-h2`, `tabular`, `no-scrollbar`).
- [ ] Variants: `aria-invalid:`, `data-[state=open]:`, `[a&]:hover:`, container queries `@container` and `@[560px]:` (builder canvas).
- [ ] Why `tailwind-merge` needs care (DECISIONS D-011).

## Stage 3 · Accessible components

- [ ] **Radix primitives.** Dialog, DropdownMenu, Select and Tooltip handle focus trapping, Escape and arrow keys for you. Styling hooks are the `data-state` attributes. See `components/ui/`.
- [ ] **Forms.** Labels above fields, `aria-invalid`, `aria-describedby` pointing at the error, focus moving to the first invalid field. See `components/auth/auth-forms.tsx`.
- [ ] **Accessible names.** Why the avatar is `aria-hidden` and its initials are drawn with CSS (axe's `label-content-name-mismatch` rule caught it).
- [ ] **Stretched links.** A whole table row is clickable through one real `<a>` (`after:absolute after:inset-0`) without nesting interactive elements. See `components/sites/sites-table.tsx`.
- [ ] **Skip links and `aria-current`.** See `components/app-shell/app-shell.tsx` and `components/shared/nav-tabs.tsx`.

## Stage 4 · Motion without a library

- [ ] CSS `@keyframes` with `animation-delay: calc(var(--i) * 40ms)` for staggered word reveals (the landing hero).
- [ ] Progressive enhancement: content is visible by default and only hidden once JavaScript has run (`html.js-reveal`). Test it with JavaScript disabled.
- [ ] One shared `IntersectionObserver` for every section (`components/marketing/reveal.tsx`).
- [ ] Measuring with `ResizeObserver` to slide the tab underline (`nav-tabs.tsx`).
- [ ] `prefers-reduced-motion`.

## Stage 5 · Next.js 16 App Router

- [ ] Route groups `(marketing)`, `(auth)`, `(app)` and `(editor)` share URLs but not layouts.
- [ ] Server components read `searchParams` (a Promise) so the sign-in form is in the HTML before JavaScript loads (`app/(auth)/sign-in/page.tsx`).
- [ ] `useSearchParams` in client components needs a `<Suspense>` boundary.
- [ ] Metadata: title templates, `viewport.themeColor`, `opengraph-image.tsx` with `ImageResponse`, `icon.svg`.
- [ ] `proxy.ts` (it was `middleware.ts` before Next 16) for auth redirects at the edge.
- [ ] `next.config.ts` redirects for retired routes.

## Stage 6 · Data and state

- [ ] **TanStack Query.** Query keys, `enabled`, invalidation after mutations. See `hooks/use-projects.ts`.
- [ ] **Zustand with `persist`.** Session in `sessionStorage`, builder state in memory. Find the bug in `DECISIONS.md` D-005 row 1 and see why storage keys must match.
- [ ] **Hydration.** Why `useHydrated()` (`useSyncExternalStore`) exists: server HTML can't know what's in `sessionStorage`.

## Stage 7 · Testing

- [ ] Playwright projects (desktop and mobile), `webServer`, `globalSetup` (`playwright.config.ts`).
- [ ] Testing what users see: `getByRole`, `getByLabel`.
- [ ] Accessibility scans with axe (`tests/a11y.spec.ts`).
- [ ] Testing a design system with computed styles: fonts, colours, radii (`tests/design.spec.ts`).
- [ ] Rate limits and test design (DECISIONS D-002).

## Stage 8 · Shipping like a team

- [ ] Conventional Commits, feature branches, rebase versus merge, squash merging, `--force-with-lease`. See `CONTRIBUTING.md`.
- [ ] GitHub Actions: jobs, `needs`, caching, secrets versus variables, artifacts on failure (`.github/workflows/ci.yml`).
- [ ] Dependabot grouping and ignoring majors.
- [ ] Branch protection and required checks.

## Stage 9 · Backend concepts worth knowing (FastAPI repo)

- [ ] JWT access and refresh tokens, and why refresh tokens exist.
- [ ] OAuth authorization-code flow (Google and GitHub), with the backend issuing a one-time code the frontend exchanges.
- [ ] Multi-tenancy by workspace ID and role checks in services.
- [ ] Rate limiting with `slowapi`.

## Suggested reading

- Refactoring UI (Wathan and Schoger): hierarchy, spacing, colour
- Inclusive Components (Heydon Pickering): accessible patterns
- web.dev: "Prefers-reduced-motion" and "Cumulative Layout Shift"
- Next.js docs bundled in `node_modules/next/dist/docs/`; they match the installed version exactly
