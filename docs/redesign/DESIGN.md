# SiteOrbit Design System

This file is the source of truth for how SiteOrbit looks and moves. If code and this file disagree, this file wins. If something isn't covered here, choose the plainest option that uses these tokens, and don't invent new colours, radii, fonts or effects.

## 1. Principles

1. **Quiet by default, one loud thing per screen.** Each screen has at most one filled amber button, and everything else is calm.
2. **Structure over decoration.** Hierarchy comes from type size, weight, spacing and hairline borders. It never comes from gradients, glows, blur or shadows.
3. **Say what it does.** Copy is plain and specific. No slogans (see `PAGES.md` → Copy rules).
4. **Fast feels better than fancy.** Nothing waits on an animation. Content is visible the moment it loads.
5. **Size follows role.** Radius, height and padding change with what an element is and how important it is (§4). The same kind of element always looks the same, but different kinds look different.

## 2. Colour

SiteOrbit uses exactly **three colours**. Every other shade is one of them at reduced opacity, mixed over Carbon. No other hex values are allowed in the codebase outside the token file.

| Token | Hex | Role |
|---|---|---|
| `carbon` | `#111214` | Page background. The only background colour. |
| `bone` | `#ECEAE4` | Text, icons, borders and surfaces (at opacity). |
| `amber` | `#D9A520` | Accent: primary action, live status, focus ring, attention. |

The theme is dark only. A light theme is out of scope.

### Derived tokens (all from the three above)

Define these as CSS variables with `color-mix(in srgb, …)`. Don't hard-code the results.

| Token | Value | Use |
|---|---|---|
| `--bg` | carbon | Page background |
| `--surface-1` | bone 4% over carbon | Raised areas: cards, table header row, inputs |
| `--surface-2` | bone 8% over carbon | Hover on rows, ghost and outline buttons, menus |
| `--border` | bone 12% over carbon | Default hairline borders, dividers |
| `--border-strong` | bone 24% over carbon | Outline button border, input border on hover |
| `--text` | bone | Primary text |
| `--text-muted` | bone 64% over carbon | Secondary text, labels, table headers |
| `--text-faint` | bone 40% over carbon | Placeholders, disabled text |
| `--accent` | amber | Primary button fill, live dot, focus ring, selected block in builder |
| `--accent-hover` | amber 88% mixed with bone | Primary button hover |
| `--on-accent` | carbon | Text and icons on amber |
| `--focus-ring` | amber 50% opacity | 3px focus ring outside the border |

### Rules

- **Amber is rare.** It's allowed only for the one primary action per view, "Live" status, focus rings, the selected item in the builder canvas, and attention states such as form errors. Never use it for decoration, headings, icons in lists or large areas.
- **No status palette.** There's no red, green or blue. States are shown with an icon plus words:
  - Error: amber border on the field, amber warning icon, message in `--text`.
  - Success: check icon plus message in `--text` (toast).
  - Draft or inactive: hollow dot (1.5px `--text-muted` ring) plus label in `--text-muted`.
  - Live: solid amber dot plus label in `--text`.
- **Contrast.** `--text` and `--text-muted` on `--bg` and `--surface-*` must pass WCAG AA (4.5:1). `--text-faint` is only for placeholders and disabled states.
- **Banned:** gradients of any kind (`linear-`, `radial-`, `conic-gradient`), gradient text, glows, coloured shadows, `backdrop-filter` blur, noise textures, background images used as decoration.

## 3. Typography

Two families, both from Google Fonts, both loaded through `next/font/google` (self-hosted, with `display: swap`). No other families may be loaded. Remove Geist, Geist Mono, Inter and Sora completely.

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display / headings | **Fraunces** | 500, 600 | Set the variable axes `"SOFT" 0, "WONK" 0` for a cleaner, professional cut. Use the `opsz` axis automatically. |
| Body / UI | **Hanken Grotesk** | 400, 500, 600 | Everything that isn't a heading: nav, buttons, labels, inputs, tables, body copy. |

Fallback stacks: `Fraunces, Georgia, "Times New Roman", serif` and `"Hanken Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif`.

### Type scale

Use only these sizes. Tailwind names in brackets.

| Token | Size / line height | Family, weight | Use |
|---|---|---|---|
| `display` | clamp(44px, 7vw, 76px) / 1.0, tracking -0.02em | Fraunces 600 | Landing hero headline only |
| `h1` | 44px / 1.08, tracking -0.015em | Fraunces 600 | Page titles on marketing pages |
| `h2` | 34px / 1.12, tracking -0.01em | Fraunces 600 | Section titles, auth page title, dashboard page title |
| `h3` | 22px / 1.3 | Fraunces 500 | Card and panel titles |
| `body-lg` | 20px / 1.6 | Hanken 400 | Hero sub-copy, intro paragraphs |
| `body` | 17px / 1.6 | Hanken 400 | Default |
| `ui` | 15px / 1.4 | Hanken 500 | Buttons, tabs, nav, table cells |
| `label` | 14px / 1.4 | Hanken 500 | Form labels, table headers |
| `small` | 13px / 1.4 | Hanken 400 | Helper text, timestamps, footnotes |

Rules:
- Headings use `text-wrap: balance`. Running text maxes out at 65ch.
- **No all-caps letter-spaced "eyebrow" labels** (like "CAPABILITIES" or "BUILD YOUR ORBIT"). Sentence case everywhere, including buttons and table headers.
- Numbers in tables, stats and prices use `font-variant-numeric: tabular-nums`.
- Never use Fraunces below 20px or for UI controls.

## 4. Shape and size: varied by role

Elements must **not** all share one radius, one height or one padding. A uniform look (everything `rounded-lg`, every box the same height) is what makes a UI read as a template. Each element gets its radius and size from its **role**, and every value below has a reason.

### Radius scale

| Token | Value | Applies to | Why |
|---|---|---|---|
| `--r-none` | 0 | Top bar, full-bleed page sections, tab row, table rows, dividers | These are structure, not objects. Corners would make them look like floating cards. |
| `--r-xs` | 3px | Badges, tags, checkboxes, tooltips, keyboard hints, the selected-block label in the builder | Small elements need a small radius to stay crisp. A large radius on a 20px badge turns it into a pill. |
| `--r-sm` | 6px | Buttons, inputs, selects, textareas, menu items, segmented controls | Controls you click or type into. A firm, modest corner reads as precise and "tool-like". |
| `--r-md` | 10px | Cards, panels, menus, popovers, toasts, table wrappers | Containers hold controls, so their corner is visibly softer than the controls inside them. |
| `--r-lg` | 16px | Dialogs, the hero product screenshot frame | The largest, most important surfaces. The bigger radius sets them apart as a layer above the page. |
| `--r-round` | 50% | User avatars, status dots, radio buttons | Circles mean "a person", "a state" or "pick one". Keep that meaning; don't use circles for anything else. |

Rules:
- **Nesting:** an inner element's radius is always smaller than its container's (card 10px → button 6px → badge 3px). Never put a 10px element inside a 6px one.
- Person = circle avatar, workspace/organisation = rounded square (`--r-xs` at 20px, `--r-sm` at 32px and up). That difference tells people what they're looking at.
- **Banned:** pill shapes on buttons and badges (`rounded-full` outside avatars, dots and radios), and any radius above 16px.

### Size and height scale

Heights also follow role and importance, so the page has rhythm instead of a grid of identical boxes.

| Element | Size | Why |
|---|---|---|
| Button `sm` | 36px tall, 16px side padding | Dense areas: top bar, table rows, toolbars |
| Button `md` | 44px tall, 20px side padding | Default for forms and page actions |
| Button `lg` | 56px tall, 28px side padding | Only the landing hero and closing call to action, where the action is the point of the screen |
| Input | 44px tall in the dashboard, 48px on auth pages | Auth forms are used on phones more often, so they get a bigger touch target |
| Badge | 24px tall, 8px side padding | Labels sit inside rows and must not compete with buttons |
| Checkbox | 16px | Smaller than text height so it doesn't dominate a list |
| Menu item | 40px | Between a badge and a button: easy to hit, still compact |
| Table row | 64px | Room for a two-line cell (site name plus domain) |
| Top bar | 64px dashboard, 72px landing | The marketing bar gets more air; the app bar stays compact |
| Avatar | 28px user (top bar), 20px workspace (switcher), 32px in member lists | Size follows how much attention the context needs |

Rules:
- **Cards take the height of their content.** Don't force equal-height cards or set fixed heights, except where items are compared side by side (pricing plans), where aligning them helps comparison.
- **Padding follows size:** cards 24px (16px on mobile), dialogs 32px, popovers 8px, badges 6px. Don't give every container the same padding.
- **Don't repeat the same box.** If a section would be a row of identical cards, prefer a list, a table or columns divided by hairlines instead.

## 5. Borders, elevation, spacing

- **Borders:** 1px, `--border` by default, `--border-strong` for outline buttons and hovered inputs. No 2px borders except the active tab underline and the focus ring.
- **Elevation:** there are no shadows on cards or buttons. Floating layers (menus, popovers, dialogs, toasts) get `--surface-2`, a `--border` border, and one shadow: `0 8px 24px rgb(0 0 0 / 0.4)`. That's the only shadow in the system.
- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96. Use only these values.
- **Layout widths:** marketing content max 1120px; dashboard content max 1200px; auth column 400px; prose max 65ch. Side gutter is 16px on mobile, 24px on tablet and 32px on desktop.
- **Breakpoints:** Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Design mobile first.

## 6. Components

All interactive components have these states: default, hover, active (pressed), focus-visible, disabled. Some also have loading.

### Buttons

Three sizes from §4: `sm` 36px, `md` 44px, and `lg` 56px (landing CTAs and pricing). Text uses `ui` (15px, 500), or 17px for `lg`. Icons are 16px with an 8px gap. Radius `--r-sm` (6px).

| Variant | Background | Border | Text | Hover | When to use |
|---|---|---|---|---|---|
| **Primary** | `--accent` | none | `--on-accent` | `--accent-hover` | The single main action on a screen: "Start free", "Sign in", "New site", "Publish". Max one per view. |
| **Outline** | transparent (the page shows through) | 1px `--border-strong` | `--text` | bg `--surface-2`, border `--text-muted` | Standalone or peer actions with no primary beside them: OAuth buttons, "Try again", "Delete site", the non-recommended pricing plans. |
| **Ghost** | transparent | none | `--text` | bg `--surface-2` | Low-emphasis or repeated actions: toolbar icons, row actions, "Show password", menu triggers. |
| **Link** | transparent | none | `--text`, `--text-faint` underline, offset 6px | underline turns `--text` and thickens to 2px; a trailing arrow nudges right | **The secondary action beside a primary** ("Sign in" in the nav, "See how it works", "Cancel", "Discard changes") and inline text actions. Two boxes side by side read as equal choices; a filled button plus an underlined link makes the main action obvious. |

Notes:
- Outline and ghost buttons have no fill, so they take the page background, but they stay clearly visible: outline through its `--border-strong` border, and ghost through full-strength `--text` and an icon or a hover fill.
- **Destructive actions** (delete site, remove member) use the Outline variant with an explicit label ("Delete site"). They always open a confirm dialog that repeats the name of the thing being deleted. There's no red button.
- **Pressed:** `transform: scale(0.98)` for 150ms.
- **Loading:** keep the button width, swap the label for a 16px three-dot or line indicator in the same text colour, and set `aria-busy="true"`. Don't use a spinning circle.
- **Disabled:** 40% opacity, `cursor: not-allowed`, and no hover.
- **Focus-visible (all variants):** 3px `--focus-ring` outline, offset 2px.

### Inputs (text, email, password, select, textarea)

- 40px tall (44px on auth pages), `--surface-1` background, 1px `--border`, `--r-sm` radius, 12px horizontal padding, `body` text, placeholder in `--text-faint`.
- Hover: border `--border-strong`. Focus: border `--text-muted` plus the focus ring.
- Error: border `--accent`, then below the field a 14px amber warning icon and the message in `--text` (`small` size). Link the message with `aria-describedby`.
- Labels always sit above the field (`label` style). Never use a placeholder as a label.
- Password fields have a ghost icon button inside the right edge for show and hide, with an `aria-label`.

### Badge

- 20px tall, 6px horizontal padding, `--r-xs` radius, `small` text weight 500, sentence case.
- Default: `--surface-2` background, `--text-muted` text, no border.
- Status badges use the dot plus word pattern from §2 instead of a coloured fill.
- Don't use pill-shaped badges and don't put dots before marketing labels.

### Card / panel

`--surface-1` background, 1px `--border`, `--r-md` radius, 24px padding (16px on mobile). No shadow, no hover lift. Use cards only when content is a separate object, such as a site, a plan or a settings group. Don't wrap every section in a card. Prefer hairline dividers between sections.

### Tabs

Text tabs in `ui` style: `--text-muted` by default, `--text` when selected. The selected tab has a 2px `--text` underline that slides between tabs (see Motion). A 1px `--border` line runs under the whole tab row. Tabs are links (routes), use `aria-current="page"`, and scroll horizontally on mobile with no visible scrollbar.

### Table

Full width, no outer card. Header row uses `label` style in `--text-muted` with a `--border` bottom. Rows are 56px tall with a `--border` bottom and a `--surface-2` hover. Numbers are right-aligned and tabular. Row actions are ghost `sm` icon buttons that are always visible, not only on hover, so they work on touch.

### Menus, popovers, dialogs, toasts

These use the floating layer style from §5. Menus, popovers and toasts use `--r-md`; dialogs use `--r-lg`. Menu items are 36px tall with `--r-sm`, and `--surface-2` on hover. Dialogs are max 480px wide with 32px padding. The title is `h3`, and the actions are right-aligned in the order Outline (cancel), then Primary. Toasts appear bottom right, last 4 seconds, and contain an icon plus one sentence.

### Skeletons

Use them instead of spinners for anything that loads in place. The blocks are `--surface-2`, use the radius of the element they stand in for, and match the real layout's sizes. They have a slow opacity pulse between 0.6 and 1 over 1.6s, which is off under reduced motion.

### Empty states

One `h3` line that says what's missing, one sentence of explanation, and one Primary button to fix it. For example: "No sites yet". "Create your first site to start building pages for a client." [New site]. No illustrations.

### Icons

Use **Lucide** only (it's already installed with shadcn), at 16px in UI and 20px in empty states, with a stroke width of 1.5. Don't put icons inside tinted squares or circles. Don't use emoji in the UI.

### Logo

The wordmark is "SiteOrbit" in Fraunces 600, with a mark to its left: a 1.5px bone ring with a small solid amber dot on its upper right edge. Export it as an SVG favicon (`app/icon.svg`) plus `apple-icon.png`. This replaces the default Next.js favicon.

## 7. Motion

One small system. Everything is CSS (or tiny JS for observers). **Don't add an animation library.** If `framer-motion` or `motion` is already a dependency, remove its usage where CSS can do the job, and remove the dependency if nothing else uses it.

### Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 150ms | Buttons, inputs, hovers, menus opening |
| `--dur-base` | 300ms | Tabs underline, section reveal, dialogs, toasts |
| `--ease` | `cubic-bezier(0.2, 0, 0, 1)` | Everything. No other curves, and no bounce or spring. |

### What moves

1. **Hero headline reveal (landing, once per load).** Each word rises 8px and fades in with a 40ms stagger, 300ms per word, finishing in under 800ms total. The sub-copy and buttons follow with a single 300ms fade, starting 120ms after the last word.
2. **Section reveal (landing only).** Each section's content rises 8px and fades in the first time it enters the viewport (an IntersectionObserver with 15% threshold that runs once). Progressive enhancement: content is visible by default. A tiny inline script adds `html.js-reveal` before paint, and only then are below-the-fold `[data-reveal]` elements set to their start state. Anything already in view on load doesn't animate.
3. **Tab underline.** It slides its `left` and `width` to the selected tab over `--dur-base`.
4. **Buttons.** Background and border colours ease over `--dur-fast`, and pressing scales to 0.98.
5. **Menus and popovers.** Fade in and rise 4px over `--dur-fast`. They close instantly.
6. **Dialogs.** The overlay fades in over `--dur-base`, and the panel fades in and scales from 0.98 to 1.
7. **Toasts.** Rise 8px and fade in, then fade out.

### What's removed

- The full-screen "Loading SiteOrbit" gate and its spinner.
- The delayed fade-in on auth pages (they currently stay blank for about 2s).
- Glows, pulsing orbs, floating or parallax effects, hover lifts on cards, and any infinite animation except the skeleton pulse.
- Page transition animations between routes.

### Reduced motion

Under `@media (prefers-reduced-motion: reduce)`, all transforms and keyframe animations are off, and colour transitions stay at 150ms max. Content is never hidden waiting for an animation.
