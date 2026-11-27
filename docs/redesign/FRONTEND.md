# SiteOrbit Frontend Guide

How to implement `DESIGN.md` and `PAGES.md` in the codebase. The live site is a Next.js app on Vercel, using Tailwind and shadcn/ui (the components carry `data-slot` attributes, so it's the recent shadcn generation). **Check every assumption in this file against the repo before acting on it**, and write down what you found in `docs/redesign/INVENTORY.md` (see `BUILD_PLAN.md`, phase 0).

## 1. Ground rules

- **Restyle; don't rebuild.** Keep routes, data fetching, auth logic, API calls, multitenancy and the builder's data model as they are. This project changes how things look, read and move, plus cleanup of dead links and fake content.
- **No new runtime dependencies.** The only new dev dependencies allowed are for testing: `@playwright/test` and `@axe-core/playwright`.
- **Remove** anything that only served the old look: unused fonts, unused images, animation helpers for the loading gate, and gradient or glow utilities.
- **Ports:** never use 3000, 5173 or 8080, because they're taken on Uzoma's machine. Use **4317** for the dev server (`next dev -p 4317`) and **4318** for a production test server (`next start -p 4318`). Update `package.json` scripts and the Playwright `webServer` config to match.
- TypeScript stays strict. No `any` added. `npm run lint`, `npm run typecheck` (add the script if missing: `tsc --noEmit`) and `npm run build` must pass at the end of every phase.

## 2. Tokens

All colour, radius, motion and font tokens live in **one file**: the global stylesheet (likely `app/globals.css`). No other file may contain a hex colour, `rgb()`/`hsl()`/`oklch()` literal, or a raw radius value.

```css
:root {
  /* Base palette: the only three colours */
  --carbon: #111214;
  --bone:   #ECEAE4;
  --amber:  #D9A520;

  /* Derived */
  --bg:            var(--carbon);
  --surface-1:     color-mix(in srgb, var(--bone) 4%,  var(--carbon));
  --surface-2:     color-mix(in srgb, var(--bone) 8%,  var(--carbon));
  --border:        color-mix(in srgb, var(--bone) 12%, var(--carbon));
  --border-strong: color-mix(in srgb, var(--bone) 24%, var(--carbon));
  --text:          var(--bone);
  --text-muted:    color-mix(in srgb, var(--bone) 64%, var(--carbon));
  --text-faint:    color-mix(in srgb, var(--bone) 40%, var(--carbon));
  --accent:        var(--amber);
  --accent-hover:  color-mix(in srgb, var(--amber) 88%, var(--bone));
  --on-accent:     var(--carbon);
  --focus-ring:    color-mix(in srgb, var(--amber) 50%, transparent);

  /* Radius by role (DESIGN.md §4) */
  --r-xs: 3px;  --r-sm: 6px;  --r-md: 10px;  --r-lg: 16px;

  /* Motion (DESIGN.md §7) */
  --dur-fast: 150ms;  --dur-base: 300ms;  --ease: cubic-bezier(0.2, 0, 0, 1);

  /* The one shadow, for floating layers */
  --shadow-float: 0 8px 24px rgb(0 0 0 / 0.4);

  color-scheme: dark;
}
html, body { background: var(--bg); color: var(--text); }
```

### shadcn/ui variables

shadcn reads its own variable names (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--border`, `--input`, `--ring`, `--card`, `--popover`, `--destructive`, `--radius`, sidebar variables, chart variables…). Point **every one** of them at the tokens above:

- `--background` → `--bg`; `--foreground` → `--text`
- `--card`, `--popover` → `--surface-1` / `--surface-2`; their foregrounds → `--text`
- `--primary` → `--accent`; `--primary-foreground` → `--on-accent`
- `--secondary`, `--muted` → `--surface-2`; `--muted-foreground` → `--text-muted`
- shadcn's own `--accent` (its hover fill) → `--surface-2`. Note the name clash: shadcn's `--accent` is a hover colour, not our amber. Rename ours in code if needed (for example `--brand`) so the two don't collide, and keep this mapping explicit with a comment.
- `--border`, `--input` → `--border`; `--ring` → `--focus-ring`
- `--destructive` → `--accent` (there's no red; see DESIGN.md §2)
- `--chart-1…5` → bone at 100%, 64%, 40%, 24%, and amber for the highlight
- Delete the `.dark` block and all `--sidebar-*` variables once the sidebar is gone.
- Remove shadcn's single `--radius` and its derived `--radius-sm/md/lg/xl`. Map Tailwind's radius utilities to the role tokens instead, so a component can't silently pick a uniform radius.

### Tailwind

If the project uses Tailwind v4 (`@theme` in CSS), expose the tokens through `@theme inline`. If v3, through `tailwind.config` `theme.extend`. Either way:

- Colours: `bg`, `surface-1`, `surface-2`, `border`, `border-strong`, `text`, `text-muted`, `text-faint`, `brand` (amber), `brand-hover`, `on-brand`. Remove Tailwind's default colour palette from use (no `teal-500`, `slate-900` and so on in classnames).
- Radius: `rounded-xs` → `--r-xs`, `rounded-sm` → `--r-sm`, `rounded-md` → `--r-md`, `rounded-lg` → `--r-lg`, `rounded-full` → 50% (allowed only on avatars, dots, radios). Remove `rounded-xl`, `rounded-2xl`, `rounded-3xl` and arbitrary values like `rounded-[2rem]`.
- Fonts: `font-display` → Fraunces variable, `font-sans` → Hanken Grotesk variable.
- Durations and easing: `duration-fast`, `duration-base`, `ease-brand`.
- Shadows: only `shadow-float`.

## 3. Fonts

In the root layout (`app/layout.tsx`):

```ts
import { Fraunces, Hanken_Grotesk } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
// <html lang="en" className={`${display.variable} ${sans.variable}`}>
```

- In CSS, set `font-variation-settings: "SOFT" 0, "WONK" 0;` on every element that uses `--font-display`.
- **Delete** the Geist and Geist Mono imports and any Inter or Sora references (CSS, Tailwind config, inline styles). The audit found Inter and Sora declared but never loaded, and Geist loaded but never used.
- Confirm in the browser that `document.fonts.check('600 28px Fraunces')` and `document.fonts.check('16px "Hanken Grotesk"')` are both true. A test does this (see `TESTING.md`).

## 4. Components

Work through the shadcn components in `components/ui/` and restyle each one through tokens. Don't fork new copies.

| Component | Changes |
|---|---|
| `button` | Variants: `primary`, `outline`, `ghost`, `link` (remove `default`, `secondary`, `destructive` or alias them). Sizes `sm` 32, `md` 40, `lg` 48, and `icon-sm`/`icon-md` squares. Radius `--r-sm`. Remove every gradient class. Add `loading` prop (DESIGN.md §6). |
| `input`, `textarea`, `select` | Height 40 (auth pages pass `size="lg"` for 44). Radius `--r-sm`. Error state from `aria-invalid="true"`. |
| `badge` | 20px, radius `--r-xs`, variants `default` and `status` (dot + label). Remove pill shape. |
| `card` | Radius `--r-md`, `--surface-1`, border, no shadow. |
| `dropdown-menu`, `popover`, `tooltip`, `dialog`, `sonner`/toast | Floating layer style, radii per DESIGN.md §4, motion per §7. |
| `tabs` | Build a `NavTabs` component for route tabs (links with `aria-current`) with the sliding underline. Don't use shadcn's pill-style tabs. |
| `table` | Restyle per DESIGN.md §6. |
| `skeleton` | Per DESIGN.md §6, slow pulse, off under reduced motion. |
| `avatar` | User avatar circle, workspace avatar rounded square. |
| `sidebar` | Delete once the dashboard shell is replaced, along with its provider, hooks and variables. |

New shared components (small, in `components/`):
- `Logo` (mark and wordmark SVG; `variant="mark" | "full"`).
- `AuthLayout` (PAGES.md §2).
- `AppShell` with `TopBar`, `WorkspaceSwitcher`, `AccountMenu` and `NavTabs` (PAGES.md §3).
- `EmptyState` (DESIGN.md §6).
- `Reveal` (wraps landing sections; see §6 below).

## 5. Cleanup checklist ("AI identifiers")

Search the whole `app/`, `components/`, `lib/` and `styles/` tree and remove or replace:

- [ ] `gradient` in any form: Tailwind `bg-gradient-*`, `from-*`/`via-*`/`to-*`, `bg-[linear-gradient(...)]`, and CSS `linear-`/`radial-`/`conic-gradient`. This includes the body's radial glow and the teal button gradient.
- [ ] `bg-clip-text` / `text-transparent` gradient text.
- [ ] Glow shadows: `shadow-[...]` arbitrary values, coloured shadows, `drop-shadow` used as glow, `shadow-lg`/`shadow-xl`/`shadow-2xl` on cards.
- [ ] `backdrop-blur*` and `blur-*` used for decorative orbs.
- [ ] Decorative absolutely positioned blobs, orbs, grids or noise layers.
- [ ] Uppercase letter-spaced labels: `uppercase` together with `tracking-wide*`. Allowed nowhere.
- [ ] `rounded-full` outside avatars, dots and radios; `rounded-xl` and above.
- [ ] Teal, cyan, slate, indigo or any Tailwind palette colour classes; any hex outside `globals.css`.
- [ ] Icons inside tinted squares or circles (the feature cards).
- [ ] The "Loading SiteOrbit" gate, its spinner, and any `animate-spin` used for page loading.
- [ ] Delayed mount fades on auth pages (`opacity-0` until a timer or `useEffect` flips it).
- [ ] The split-panel auth layout and its marketing copy.
- [ ] The dashboard sidebar and "Plan usage" widget (moved to Billing).
- [ ] Stock photos in `public/images` that are no longer referenced.
- [ ] The default favicon and template metadata.
- [ ] Placeholder links (`href="/"` used for pages that don't exist, `href="#"`, `https://facebook.com`).
- [ ] Fake testimonial and fake numbers.
- [ ] Leftover `create-next-app` files (`public/next.svg`, `public/vercel.svg`, starter README text) if unused.

A script enforces most of this automatically (see `TESTING.md` → design lint).

## 6. Motion implementation

- Put the keyframes and the reduced-motion block in `globals.css`.
- **Hero reveal:** split the headline into words in the server component (`<span class="word" style="--i: n">`), then animate with CSS using `animation-delay: calc(var(--i) * 40ms)`. No JS needed. Respect reduced motion.
- **Section reveal:** a tiny inline script in the landing layout `<head>` adds `js-reveal` to `<html>`. A `Reveal` client component uses one shared IntersectionObserver (threshold 0.15, unobserve after first hit) to add `is-visible`. CSS hides `[data-reveal]` only under `html.js-reveal`, and only if the element starts below the fold (the component checks its position on mount and marks above-the-fold elements visible immediately).
- **Tab underline:** `NavTabs` measures the active link with a `ResizeObserver` and sets `left`/`width` on the underline span, which transitions over `--dur-base`.
- **Menus and dialogs:** use the `data-state="open|closed"` attributes Radix already sets, with CSS transitions.

## 7. Accessibility

- Every interactive element has a visible `:focus-visible` ring (DESIGN.md §6).
- Icon-only buttons have `aria-label`.
- Form errors use `aria-invalid` and `aria-describedby`.
- Tabs use `aria-current="page"`.
- Colour is never the only signal: status always has a word, errors always have an icon and text.
- All pages work with the keyboard alone, including the workspace switcher and account menus.
- Skip link "Skip to content" at the top of the landing and app shell.
