# SiteOrbit Pages

Layouts, content and copy for every page touched by the redesign. Styling comes from `DESIGN.md`. If a page or route exists in the repo but isn't listed here, restyle it with the tokens and components only, and don't change its layout or behaviour.

## Copy rules (all pages)

- Write what the product does, in plain words, for a person who runs a small agency or a team that builds client sites.
- Use sentence case everywhere: headings, buttons, labels, tabs and table headers.
- Buttons say exactly what happens: "Start free", "Sign in", "Create account", "New site", "Publish", "Save changes".
- Error messages say what went wrong and how to fix it. For example: "That password doesn't match this email. Try again or reset it."
- **Don't use these words or phrases:** orbit as a metaphor ("your digital orbit", "Design your orbit", "Build your orbit"), velocity, engineered for, seamless, elevate, unleash, supercharge, next-generation, cutting-edge, premium, elite, curator ("The Digital Curator"), control layer, "surgical precision", "without losing momentum", "Ready to launch?".
- **No invented social proof.** Remove the "Marcus Thorne, CEO @ Helix Creative" testimonial and the "Join over 1,500 teams" line. Only add a quote or a number if Uzoma supplies a real one.
- **No dead links.** Every link goes to a real page or a real anchor on the page. If the page doesn't exist, remove the link. Don't point placeholders at `/`.
- The copyright year is generated from the current date, and it's the same on every page.

## 1. Landing page (`/`)

Width max 1120px. Left-aligned. Sections are separated by 1px `--border` hairlines and 96px vertical spacing on desktop (64px on mobile). Don't wrap sections in big rounded containers.

### 1.1 Top bar

- 64px tall, sticky, `--bg` background with a 1px `--border` bottom border that appears once the page has scrolled. No blur.
- Left: logo (mark plus wordmark) linking to `/`.
- Centre (hidden below `md`): "Product" (`#product`), "Pricing" (`#pricing`), and "Docs" only if a docs page exists.
- Right: "Sign in" (Link, sm) and "Start free" (Primary, sm). Both stay visible on mobile.
- Remove "Studios", "Templates" and "Resources" unless those pages exist.

### 1.2 Hero

- Two columns on `lg` and up (text 55%, image 45%), stacked on mobile with the text first.
- Headline (`display`): **"Build and publish sites for every client from one workspace."**
- Sub-copy (`body-lg`, `--text-muted`, max 44ch): "SiteOrbit is a website builder for teams. Each client gets its own workspace, its own domain and its own analytics."
- Buttons: "Start free" (Primary, lg) → `/sign-up`, and "See how it works →" (Link, lg) → `#how-it-works`.
- Small note under the buttons (`small`, `--text-muted`): "Free for one workspace. No card needed." Confirm with Uzoma that this matches the real plan, and remove it if not.
- Right column: a real screenshot of the **new** builder or dashboard, in a frame with a 1px `--border` border and `--r-lg` radius. No tilt, glow or floating effect. Capture it after the dashboard phase is done (see `BUILD_PLAN.md`). Until then, keep the current image in the new frame.
- Remove the "• BUILD YOUR ORBIT" pill and the coloured word in the headline.

### 1.3 Product (`#product`)

- Section title (`h2`): "What you get"
- Three columns on `md` and up (stacked on mobile), divided by vertical 1px `--border` lines. No cards, no icon boxes and no stock photos.
  1. **Structured editing.** Pages are built from reusable sections, so every page stays consistent and easy to change.
  2. **Isolated workspaces.** Each client's sites, team roles and domains are kept separate.
  3. **Built-in analytics.** See visits, top pages and traffic sources for every site without adding another tool.
- Optional fourth item if the feature exists: **Custom domains.** Connect a client's own domain and publish to it.
- Remove the four stock photos (`Visual-Editing.jpg`, `Workspace.jpg`, `Composable-Sites.jpg`, `Analytics.jpg`) from the page and from `public/images` if nothing else uses them.

### 1.4 How it works (`#how-it-works`)

A real sequence, so numbering is appropriate. Three steps in a row (stacked on mobile). Each has a number in Fraunces 500 at 28px in `--text-muted`, a title in `h3` and one sentence.
1. **Create a workspace** for a client and invite your team.
2. **Build pages** from sections in the visual editor.
3. **Publish** to a SiteOrbit address or the client's own domain, and follow the analytics.

### 1.5 Pricing (`#pricing`)

- Section title (`h2`): "Pricing"
- Three plans side by side (stacked on mobile) as cards. Only the recommended plan gets a Primary button, and the others get Outline buttons. The recommended plan has a `--border-strong` border, a plain badge reading "Most teams pick this" (no pill shape, no glow), and stands 32px taller than its neighbours at the top.
- Each higher plan builds on the one before: Professional opens its list with "Everything in Starter, plus:" and Enterprise with "Everything in Professional, plus:".
- Plan names in sentence case ("Starter", "Professional", "Enterprise"), and prices in Fraunces 600 at 36px, tabular.
- **Open question for Uzoma:** are the $49 and $129 prices and the features listed real? Until confirmed, keep the current numbers and features, but rewrite the bullets in plain language.
- "Contact sales" on Enterprise must go to a real contact route (a `mailto:` link to Uzoma's chosen address, or a `/contact` page if one exists). Ask Uzoma for the address; don't guess one.

### 1.6 Closing call to action

One line in `h2`: "Start your first client site today.", with "Start free" (Primary, lg) below it. No background panel and no gradient box.

### 1.7 Footer

- One row on desktop: logo and © year on the left; GitHub and LinkedIn icon links (ghost buttons with `aria-label`) on the right. Add "Privacy" and "Terms" only if those pages exist.
- Remove the generic `facebook.com` link and the Product, Company and Legal link columns, since they all point to `/`.

## 2. Auth pages

Applies to `/sign-in`, `/sign-up` and, if they exist, forgot password and reset password. They all use one layout component (`AuthLayout`).

### Layout

- Single centred column, max 400px wide, top-aligned with 96px top padding on desktop (48px on mobile). `--bg` background. **No split panel, no marketing text, no background glows and no loading delay.**
- In order: logo (links to `/`), page title (`h2`), one-line sub-copy (`body`, `--text-muted`), OAuth buttons, divider, form, primary button, switch link, then legal links in `small` text if those pages exist.
- OAuth: "Google" and "GitHub" as Outline md buttons in a 2-column row (stacked below 360px), each with its brand icon in monochrome bone. They're 44px tall to match the auth inputs.
- Divider: a hairline with "or with email" centred in `small` `--text-muted`. Not uppercase.
- The form submit is a full-width Primary button, 44px tall to match the inputs.

### Sign in

- Title: "Sign in". Sub-copy: "Welcome back. Pick up where you left off."
- Fields: Email (`autocomplete="email"`), Password (`autocomplete="current-password"`), with "Forgot password?" as a Link button aligned right on the password label row.
- Button: "Sign in". Switch link: "New to SiteOrbit? Create an account".
- When the user lands here from a redirect (for example `?redirect=/dashboard`), keep that redirect after sign-in.

### Sign up

- Title: "Create your account". Sub-copy: "Set up a workspace for your first client in a few minutes."
- Fields: Full name (`autocomplete="name"`), Work email (`autocomplete="email"`), Password (`autocomplete="new-password"`, with helper text giving the actual rule the backend enforces, for example "At least 8 characters").
- Button: "Create account". Switch link: "Already have an account? Sign in".

### Errors and states

- Field errors appear under each field on blur and on submit (see `DESIGN.md` → Inputs).
- Server or network errors appear in a bordered box at the top of the form: `--surface-1` background, 1px `--accent` border, warning icon and one sentence. For example: "We couldn't reach the server. Check your connection and try again."
- While submitting, the button shows its loading state and the fields are disabled.
- Focus moves to the first invalid field on submit.

## 3. Dashboard (signed in)

The sidebar is removed. The new shell is a top bar plus tabs, used by every signed-in page except the full-screen builder.

### 3.1 Shell

```
┌────────────────────────────────────────────────────────────────┐
│ ◯• / [A] Acme Studio ▾                        Docs   [UN] ▾    │  top bar, 56px
├────────────────────────────────────────────────────────────────┤
│ Sites   Analytics   Team   Domains   Settings                  │  tabs, 44px
│ ‾‾‾‾‾                                                           │
├────────────────────────────────────────────────────────────────┤
│  page content, max 1200px, 32px padding                        │
└────────────────────────────────────────────────────────────────┘
```

- **Top bar** (56px, `--bg`, 1px `--border` bottom): logo mark linking to the dashboard home, a `/` separator in `--text-faint`, and the **workspace switcher** (Ghost button with a 20px workspace avatar, the workspace name and a chevron). It opens a menu listing the workspaces, then "New workspace". On the right: "Docs" (only if it exists), then the **account menu** (a 28px circular user avatar) containing the name and email, "Account settings", "Billing" and "Sign out".
- **Tabs:** map every item from the current sidebar to a tab or a menu. Proposed mapping, which Claude Code must check against the real sidebar:
  - Dashboard and Projects → **Sites** (the new home)
  - Analytics → **Analytics**
  - Team → **Team**
  - Domains → **Domains**
  - Settings → **Settings**
  - Builder → not a tab. It opens from a site row.
  - "Plan usage" widget → **Settings → Billing**, and "Billing" in the account menu.
  - Support and Logout → account menu ("Help", "Sign out").
- Keep the existing routes and URLs where possible. Tabs are links to those routes.
- **Mobile (below `md`):** the top bar shows the logo mark, the workspace switcher (name truncated) and the account avatar. Tabs scroll horizontally. There's no hamburger menu and no drawer.

### 3.2 Sites (home)

- Header row: title "Sites" (`h2`) on the left and "New site" (Primary) on the right.
- Summary line under the title, in `body` `--text-muted` with the numbers in `--text` 600 and tabular: "**3** sites · **2** live · **12,480** visits in the last 30 days · **4** members". This replaces the four stat cards.
- Sites table with columns Site (name, plus domain in `small` `--text-muted`), Status (Live or Draft dot pattern), Last published (relative time), Visits, 30 days (right-aligned), and a row actions menu (ghost icon: Open builder, View live site, Settings, Delete). Clicking a row opens the builder.
- Empty state: "No sites yet". "Create your first site to start building pages for a client." [New site]
- Loading: 3 skeleton rows.
- Remove "Recent activity" and "Recent projects" panels from the home page. If an activity feed is useful, it can live under Analytics later. That's out of scope now.

### 3.3 Other tabs

Analytics, Team, Domains and Settings keep their current content and behaviour. Restyle them with the tokens and components only:
- Page title `h2` plus a one-line description in `--text-muted`.
- Lists become tables. Forms use the input spec and are grouped into cards with an `h3` title ("Workspace name", "Danger zone", and so on).
- Charts in Analytics use bone lines and fills (bone at 100% for the line, 8% for the area) on `--border` gridlines. Amber is used only to highlight the current or selected data point.

### 3.4 Builder

- Full screen, no tabs. It has a 56px toolbar: a ghost back button ("← Sites") and the site name on the left; device preview toggles in the middle (Ghost buttons); "Preview" (Outline) and "Publish" (Primary) on the right.
- The selected block on the canvas gets a 1.5px amber outline and a small label. Everything else uses the tokens.
- Don't change the builder's features or data model.

## 4. Metadata and SEO (all public pages)

- Unique `<title>` per page: "SiteOrbit · Website builder for teams" (home), "Sign in · SiteOrbit", "Create your account · SiteOrbit", "Sites · Acme Studio · SiteOrbit" and so on.
- A meta description per public page, written in the same plain voice.
- Open Graph and Twitter card image: a 1200×630 PNG with the logo and the hero headline on carbon. Generate it with `app/opengraph-image.tsx` (Next's `ImageResponse`), using the brand fonts and colours.
- Favicon from the new logo (see `DESIGN.md` → Logo).
- `<html lang="en">` and `theme-color` set to `#111214`.
