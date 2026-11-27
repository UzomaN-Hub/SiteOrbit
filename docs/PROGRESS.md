# Progress

Status of the SiteOrbit redesign and what comes next. Update this at the end of every working session.

**Last updated:** 2026-11-27

## Done (redesign v2, branch `redesign/v2`)

| Phase | Status | Notes |
|---|---|---|
| 0 · Inventory | Done | Findings are in `DECISIONS.md` D-004 to D-009 |
| 1 · Foundations | Done | Three-colour tokens, Fraunces and Hanken Grotesk, logo, favicon, Apple icon, Open Graph image, page titles |
| 2 · Components | Done | Button (4 variants, 3 sizes, loading), input, select, badge and status dot, card, dialog, menu, tooltip, toast, table, skeleton, avatar, nav tabs, empty state |
| 3 · Auth | Done | Single 400px column; field and server errors; autocomplete; redirect kept; real invite acceptance |
| 4 · Dashboard shell | Done | Top bar and tabs, no sidebar; Sites home; restyled Analytics, Team, Domains, Settings; full-screen builder |
| 5 · Landing and copy | Done | New copy, real product screenshot, no fake proof or dead links |
| 6 · Motion | Done | CSS only; respects reduced motion; visible without JavaScript |
| 7 · Final pass | Done | 64/64 Playwright tests (desktop and mobile), design lint clean, screenshots in `docs/redesign/screenshots/` |
| Repo hygiene | Done | CI (two jobs), Dependabot, PR template, CONTRIBUTING, README, `.env.example` |
| Backend (minimal) | Done | CI, Dependabot, README rewritten, dev requirements split out, client theme defaults updated |

## Waiting on Uzoma

- [ ] Are the prices ($49, $129, Custom) and plan features real? They're kept, reworded in plain language.
- [ ] A contact email for "Contact sales". Set `NEXT_PUBLIC_CONTACT_EMAIL` on Vercel; until then the button opens LinkedIn.
- [ ] A test account for CI: add `E2E_EMAIL` and `E2E_PASSWORD` as repository secrets, and `E2E_API_URL` as a repository variable.
- [ ] Review the Vercel preview of the pull request.
- [ ] Turn on branch protection for `main` (see `CONTRIBUTING.md`).
- [ ] Choose a license, or remove the old README's MIT claim for good (there was never a LICENSE file).

## Next up (suggested order)

1. **Password reset.** Add `POST /auth/forgot-password` and `/auth/reset-password` to the API (needs an email provider, e.g. Resend), then wire the existing page.
2. **Account settings.** A page to change name, avatar and password. The account menu is ready for the link.
3. **Real public sites.** Render published pages at `{slug}.siteorbit.app` or a custom domain. Today "publish" only flips a status.
4. **Analytics collection.** A small tracking script on published sites, so the analytics are real visits.
5. **Builder drag-and-drop** to reorder sections (today it's up and down buttons). That's the point to reconsider a motion library (D-013).
6. **API hardening.** Replace `python-jose` (unmaintained, known CVEs) with `pyjwt`, and `passlib` with `bcrypt` directly; add Alembic migrations to CI.
7. **Light theme** for the builder canvas only, so clients see their site on white.

## Log

- **2026-11-27.** Full UI/UX redesign to the spec in `docs/redesign/`. Fixed 11 bugs (D-005). Added the test suite, CI and docs.
- **2026-04.** First version: Next.js app, FastAPI backend, deployed to Vercel and Render.
