# SiteOrbit Redesign Build Plan

Work through the phases in order. Each phase is one branch and one pull request, and must pass the checks in `TESTING.md` §1 before moving on. Read `DESIGN.md`, `PAGES.md`, `FRONTEND.md` and `TESTING.md` before starting phase 0.

## Scope

**In scope:** visual design, layout, copy, motion, metadata, cleanup of template leftovers, dead links and fake content, and tests for all of that.

**Out of scope (don't do these, even if tempting):** new features or pages beyond forgot/reset password if they're missing, changes to the database, API, auth provider or multitenancy logic, a light theme or theme toggle, a CMS or blog, internationalisation, new analytics, a command palette, onboarding flows, marketing pages beyond the landing page, and any new runtime dependency.

If something in the repo makes a phase impossible without going out of scope, stop and write the question in the pull request description instead of expanding the work.

## Phase 0: Inventory (no UI changes)

1. Create branch `redesign/0-inventory`.
2. Write `docs/redesign/INVENTORY.md` with:
   - Framework and versions (Next.js, React, Tailwind v3 or v4, shadcn generation, auth library).
   - Every route, marked public or signed-in, and whether it exists in `PAGES.md`.
   - Where colours, fonts, radii and animations are defined today.
   - The current sidebar items and their routes, with the proposed tab mapping from `PAGES.md` §3.1 confirmed or corrected.
   - Every file that matches the cleanup checklist in `FRONTEND.md` §5.
   - Whether forgot/reset password pages exist.
3. Copy the four spec files into `docs/redesign/` and add the `CLAUDE.md` rules from this folder to the repo root (merge if one exists).
4. Set the dev port to 4317 and add the scripts from `TESTING.md` §1 (tests can be empty stubs for now).
5. Open the PR. **Done when** the inventory is complete and `npm run dev` starts on 4317.

## Phase 1: Foundations

1. Tokens in `globals.css` exactly as `FRONTEND.md` §2, shadcn variables remapped, Tailwind theme updated, radius utilities mapped to role tokens.
2. Fonts: Fraunces and Hanken Grotesk via `next/font`; delete Geist, Inter and Sora.
3. Logo component, `app/icon.svg`, `apple-icon.png`, `opengraph-image.tsx`, per-page titles and descriptions, `theme-color`.
4. Remove the global body gradient and glow.
5. Write `scripts/design-lint.mjs`. It's expected to fail on pages not yet redone. In this phase, run it only on `app/globals.css`, `app/layout.tsx` and `components/ui/`.
6. **Done when** the whole site renders in the new fonts and colours (layouts still old), and `tests/design.spec.ts` font checks pass.

## Phase 2: Components

1. Restyle the shadcn components listed in `FRONTEND.md` §4: buttons (4 variants, 3 sizes, loading), inputs, badge, card, menus, popover, tooltip, dialog, toast, table, skeleton, avatar.
2. Add `EmptyState` and `NavTabs`.
3. Replace every `animate-spin` page loader with skeletons.
4. **Done when** design lint passes for `components/`, and a temporary `/dev/components` page (removed before merge, or guarded to development only) shows every variant for review.

## Phase 3: Auth pages

1. Build `AuthLayout` and rebuild sign-in, sign-up and (if present) forgot/reset password per `PAGES.md` §2.
2. Delete the split-panel layout, the marketing copy and the delayed fade-in.
3. Implement field and server error states, focus handling and autocomplete attributes. Keep the redirect parameter working.
4. **Done when** `tests/auth.spec.ts` and the auth part of `tests/a11y.spec.ts` pass.

## Phase 4: Dashboard shell

1. Build `AppShell` (top bar, workspace switcher, account menu, `NavTabs`) per `PAGES.md` §3.1, and wire the tabs to the existing routes using the mapping confirmed in phase 0.
2. Rebuild the Sites home per §3.2 (summary line, table, empty state, skeletons). Move "Plan usage" to Billing.
3. Restyle the other tabs per §3.3 and the builder toolbar per §3.4, without changing their behaviour.
4. Delete the sidebar component, provider and variables.
5. **Done when** `tests/dashboard.spec.ts` passes (with `E2E_*` credentials from Uzoma) and nothing references the sidebar.

## Phase 5: Landing page and copy

1. Rebuild `/` per `PAGES.md` §1 with the new copy.
2. Remove the fake testimonial, the "1,500 teams" line, dead nav and footer links, the Facebook link and the stock photos.
3. Capture a new screenshot of the redesigned dashboard or builder for the hero image (1600px wide, saved as `public/images/hero-product.png`, optimised).
4. **Done when** `tests/landing.spec.ts` passes and design lint passes across the whole repo.

## Phase 6: Motion

1. Implement the motion system in `DESIGN.md` §7 / `FRONTEND.md` §6: hero reveal, section reveal, tab underline, button press, menus, dialogs, toasts.
2. Remove the "Loading SiteOrbit" gate if anything is left of it, and any remaining animation library usage.
3. **Done when** the reduced-motion check in `tests/design.spec.ts` passes and content is visible with JavaScript disabled.

## Phase 7: Final pass

1. Run the full suite from `TESTING.md` §1.
2. Tick every item in `FRONTEND.md` §5.
3. Take the screenshots in `TESTING.md` §4.
4. Remove `/dev/components` if it's still there, plus unused files, images and dependencies.
5. **Done when** the Definition of done in `TESTING.md` §5 is met.

## Open questions for Uzoma

Claude Code should ask Uzoma (or leave a note in the PR) rather than guess:
1. Are the prices ($49, $129, Custom) and the plan features real?
2. Is there a real testimonial or customer number to show? If not, the section is removed.
3. Which email or page should "Contact sales" go to?
4. Do Privacy and Terms pages exist or should their links be removed?
5. Test account credentials for the dashboard tests (`E2E_EMAIL`, `E2E_PASSWORD`).
6. Does a docs page exist for the "Docs" link?
