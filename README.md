# SiteOrbit

### A multi-tenant SaaS website builder for modern teams 

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.165-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-3.11+-3776ab?style=flat-square&logo=python)](https://python.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)


## Table of Contents

- [Overview](#overview)
- [What SiteOrbit Proves](#what-siteorbit-proves)
- [Live Demo & Portfolio Story](#live-demo--portfolio-story)
- [Features](#features)
- [Full Technology Stack](#full-technology-stack)
- [Architecture Deep Dive](#architecture-deep-dive)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [API Reference](#api-reference)
- [Authentication System](#authentication-system)
- [The Visual Builder](#the-visual-builder)
- [Multi-tenant Workspace System](#multi-tenant-workspace-system)
- [State Management](#state-management)
- [Performance Strategy](#performance-strategy)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Design System & Tokens](#design-system--tokens)
- [UX Blueprint Summary](#ux-blueprint-summary)

---

## Overview

SiteOrbit is a **full-stack, multi-tenant SaaS application** where companies create isolated workspaces, invite team members with scoped roles, build landing pages visually, manage brand themes, and view workspace-specific analytics — all from one product shell.

It was built as a flagship piece designed to demonstrate:

- **Complex product-level UI** across multiple feature domains
- **Real multi-tenant architecture** with workspace isolation
- **Role-based access control** that surfaces in both the UI and the backend
- **A functional visual page builder** with block management, canvas editing, save/load cycles, and publish flow
- **A real FastAPI backend** with JWT authentication, refresh tokens, OAuth2 (Google + GitHub), and PostgreSQL/SQLite persistence
- **Production-grade frontend architecture** using Next.js App Router, Zustand, TanStack Query, CSS-only motion, and a custom three-colour design system with light and dark modes

This is not a dashboard mockup. It is a working, deployable SaaS application with a real API, real auth, real data persistence, and a polished UI across every screen.

---

## What SiteOrbit Proves

| Signal | What was built |
|---|---|
| Multi-tenant SaaS patterns | Workspace isolation, switcher, membership, per-workspace data |
| Role-based interface | Owner, Admin, Editor, Viewer — each sees a different product |
| Visual editor engineering | Block canvas, properties panel, move up/down, viewport switching, save states |
| Advanced state management | Zustand stores per domain, TanStack Query for server state, cookie/session sync |
| Animation & motion | CSS keyframes and one IntersectionObserver — word-by-word hero, scroll reveals, sliding tab underline; respects reduced motion |
| API design | RESTful FastAPI backend, typed endpoints, services layer, middleware |
| Real authentication | JWT access/refresh tokens, OAuth2 with Google and GitHub, session persistence |
| Component architecture | ~50 focused components across shared UI, domain features, layouts, and providers |
| TypeScript discipline | Full type coverage across API contracts, store types, route props, and form schemas |
| Performance thinking | Route-level code splitting, a separate full-screen builder route, TanStack Query caching, no animation library |
| Quality & testing | Playwright end-to-end and axe accessibility tests on desktop and mobile, a design lint, CI on every pull request |

---

## Live Demo & Portfolio Story

The demo tells a product story in under three minutes and makes the multi-tenant angle obvious immediately:

1. Start from the **marketing page** → sign in and show protected navigation
2. Switch between **workspaces** to prove data separation and role-aware UI
3. Open a site and **add and reorder sections in the builder**, then save changes
4. Open **analytics** and show that the same project has its own metrics view
5. End on **team/settings** to prove this is a complete SaaS shell, not just a page editor

---

## Features

### Public Marketing Surface
- Landing page with a word-by-word hero, real product screenshot, "How it works", and pricing
- Sign In, Sign Up, and Forgot Password flows
- Invitation acceptance flow (`/accept-invite`)
- Single-column auth screens with inline field errors and Google / GitHub sign-in
- Light and dark mode — follows the system setting, switchable from the footer or account menu

### Workspace Management
- Create unlimited workspaces with unique slugs
- Switch between workspaces from the persistent top bar — active workspace never leaves context
- Role-aware navigation: menus and CTAs adapt per role without page reloads
- Workspace creation modal from the switcher dropdown
- Should-prompt detection when a user has no workspaces yet

### Role-Based Access Control (RBAC)
Four roles with cascading permissions:

| Role | Can do |
|---|---|
| **Owner** | Everything — delete workspace, manage roles, all CRUD |
| **Admin** | Manage members, create/delete projects, change themes |
| **Editor** | Build pages, save/publish, update content |
| **Viewer** | Read-only builder access, marked "View only" in the toolbar |

RBAC is enforced at the backend service layer and reflected in the frontend. A viewer landing on the builder sees "View only" in the toolbar and the editing panels are disabled. Restricted buttons are disabled. Settings forms are locked. Nothing fails silently.

### Visual Page Builder
The builder is the most complex feature and lives in its own route (`/builder?projectId=...&pageId=...`).

**Toolbar:**
- Project name and current page path in the header
- Save status text: `All changes saved → Saving… → Unsaved changes → Couldn't save`
- Desktop / Tablet / Mobile viewport switcher with icon buttons
- Page selector dropdown — switch between pages without losing builder state
- New page option in the page selector
- Preview mode toggle — hides panels and shows clean canvas
- Save and Publish buttons with loading indicators

**Blocks Panel (left):**
- Block library with four block types: Hero, Text, Features, CTA
- Each block has a title and a one-line description
- Click to add a block to the canvas, disabled when role is Viewer

**Canvas (center):**
- Viewport-constrained width (390px for mobile, 720px for tablet, 960px for desktop)
- Always rendered on a light page, in both themes, so client sites preview the way visitors will see them
- Blocks render as styled cards with their live content
- Click a block to select it (thin amber outline, shows in the properties panel)
- Move up / Move down buttons per block
- Delete button per block
- Read-only mode: controls hidden when user lacks edit permission
- Empty canvas state with instruction copy

**Properties Panel (right):**
- Appears when a block is selected
- Renders inputs for every editable prop of the selected block type
- Changes immediately update the block in the canvas (reactive via Zustand)
- Changes mark save status as `unsaved`

**Save/Load cycle:**
- Page layout stored as `layout_json` (JSON string) in the database
- Builder hydrates from this JSON on load, or from the page list if the page is new
- Save triggers a PATCH to `/api/v1/pages/{pageId}` with the serialized layout
- `ensureDefaultPage` creates a "Homepage" page automatically if a project has none

### Project Management
- Sites table on the home page with Live / Draft status (a dot plus a word), All / Live / Draft filter and search
- New site dialog with name and description
- Publish / Move back to draft from each row's menu (owner/admin/editor only)
- Delete site with confirmation dialog (owner/admin only)
- Rows open the builder; the row menu also links to that site's analytics
- `/projects` redirects to the Sites home

### Analytics Dashboard
- Metric cards: Unique Visitors, Conversions, Conversion Rate, Top Page Views
- Traffic chart: line chart (visits and conversions) with date-range filtering (7d, 30d, 90d)
- Source breakdown: Organic Search, Direct, Social, Referral, Email — with share percentages
- Top pages table: visits, conversions, and conversion rate per page
- Analytics data is generated server-side with a deterministic seeded RNG — the same project always produces the same believable numbers

### Team Management
- Member table with avatar initials, name, email, role, and status
- Roles are plain words and status is a dot plus a word — no colour coding
- Invite Member modal — email input + role selector, validated with React Hook Form + Zod
- Role update endpoint wired to backend (owner-only for changing other owners)

### Settings
- Tabbed navigation: Workspace, Branding, Billing (Domains has its own tab in the top navigation)
- **Workspace tab:** name, primary domain, description — permission-locked for viewers
- **Branding tab:** full theme editor — 5 color pickers with hex inputs, heading and body font, base size, section gap, container width, card/button/input radius — live preview tokens
- Unsaved changes detection — Save and Reset buttons activate only when changes exist

### Dashboard
- The dashboard is the Sites home: a one-line summary ("4 sites · 2 live · 1 member") above the sites table
- Top bar with workspace switcher and account menu, and tabs for Sites, Analytics, Team, Domains, Settings — no sidebar
- Empty states with a clear next step when there's no workspace or no sites yet

---

## Full Technology Stack

### Frontend

| Layer | Tool | Version | Why it was chosen |
|---|---|---|---|
| Framework | **Next.js** | 16.4.6 | App Router, route groups, server/client split, deployment-ready |
| Language | **TypeScript** | 5.x | Full type safety across components, API contracts, and stores |
| Styling | **Tailwind CSS** | 4.x | Utility-first, consistent design system, no CSS files to manage |
| Component primitives | **Radix UI** | 1.4 | Accessible, unstyled base — restyled to the SiteOrbit design system |
| Animation | **CSS keyframes + IntersectionObserver** | — | No runtime library; every animation respects reduced motion |
| Fonts | **Fraunces + Hanken Grotesk** | — | Loaded with `next/font`; a serif for headings, a grotesk for UI |
| Client state | **Zustand** | 5.0 | Lightweight, slice-based stores for auth, builder, and workspace |
| Server state | **TanStack Query** | 5.95 | Fetching, caching, invalidation, background refetching |
| Forms | **React Hook Form** | 7.72 | Performant uncontrolled forms with minimal re-renders |
| Schema validation | **Zod** | 4.3 | Runtime schema validation for forms and API input |
| Charts | **Recharts** | 3.8 | Analytics charts — drawn in `currentColor` so they follow the theme |
| Notifications | **Sonner** | 2.0 | Toast system — styled with the app's own tokens |
| Icons | **Lucide React** | 1.7 | Consistent icon set, tree-shakeable |
| Theme switching | Inline script + CSS tokens | — | Dark/light/system with no flash and no dependency |
| Class composition | **clsx + tailwind-merge** | Latest | Conflict-safe Tailwind class merging |
| Variant styling | **class-variance-authority** | 0.7 | Component variant system (buttons, badges) |
| HTTP client | Native `fetch` | — | Custom typed `apiClient` wrapper with error handling |
| Testing | **Playwright + axe-core** | 1.65 / 4.14 | End-to-end, accessibility and design checks on desktop and mobile |

### Backend

| Layer | Tool | Version | Why it was chosen |
|---|---|---|---|
| Framework | **FastAPI** | 0.165.0 | Async, auto-docs, type-safe, production-ready |
| Language | **Python** | 3.11+ | Modern typing, dataclasses, match statements |
| ORM | **SQLAlchemy** | 2.1.9 | Declarative models, typed mapped columns, relationship loading |
| Migrations | **Alembic** | 1.20.1 | Schema migration management (wired for MVP stabilization) |
| Database | **SQLite** (dev) / **PostgreSQL** (prod) | — | SQLite for frictionless local development; Postgres for deployment |
| Auth tokens | **python-jose** | 3.5 | JWT encoding/decoding with HS256 |
| Password hashing | **passlib + bcrypt** | 1.9 / 5.0 | Bcrypt with automatic salting |
| Rate limiting | **slowapi** | 0.1.10 | IP-based rate limiting on auth endpoints |
| HTTP client | **httpx** | 0.28 | Async-capable HTTP client for OAuth provider calls |
| Settings | **pydantic-settings** | 2.16 | `.env`-backed typed settings with validation |
| ASGI server | **Uvicorn** | 0.54 | Production ASGI server with standard extras |
| Testing | **pytest + httpx TestClient** | 9.2 | Integration and unit tests with full DB reset per test |
| Postgres driver | **psycopg** | 3.3 | Modern async-capable Postgres driver |

---

## Architecture Deep Dive

### Frontend Architecture

The Next.js App Router is organized into four route groups:

```
app/
├── (app)/          ← Protected workspace shell (Sites, Analytics, Team, Domains, Settings)
├── (editor)/       ← Protected full-screen builder
├── (auth)/         ← Public auth screens (Sign In, Sign Up, etc.)
└── (marketing)/    ← Public marketing landing page
```

**Route group `(app)`** shares a layout (`app/(app)/layout.tsx`) that wraps everything in:
1. `AuthBootstrapProvider` — checks the session token on mount, redirects to `/sign-in` if unauthorized
2. `AppShell` — renders the top bar, workspace switcher, account menu, tab navigation, and content container (no sidebar)

`AuthActivityProvider` sits in the root layout and signs the user out after 30 minutes of inactivity.

**Route group `(auth)`** shares its own layout: a single centred 400px column, with no decorative side panel.

**Route group `(marketing)`** is fully server-rendered with no auth requirements.

**Route group `(editor)`** holds the builder (`/builder`). It's full screen with its own toolbar, so its code stays out of the other routes. The page streams in behind a skeleton:
```tsx
<Suspense fallback={<BuilderSkeleton />}>
  <BuilderShell />
</Suspense>
```

### Component Organization

Components are organized by domain, not by type:

```
components/
├── analytics/      ← AnalyticsOverview, TrafficChart
├── app-shell/      ← AppShell, WorkspaceSwitcher, AccountMenu, CreateWorkspaceDialog
├── auth/           ← SignInForm, SignUpForm, OAuthButtons, PasswordInput, AcceptInvite, OAuthCallback
├── brand/          ← Logo
├── builder/        ← BlocksPanel, Canvas, PropertiesPanel, BuilderToolbar, BuilderShell
├── marketing/      ← SiteHeader, Reveal
├── providers/      ← QueryProvider, AuthBootstrapProvider, AuthActivityProvider
├── settings/       ← WorkspaceSettingsPanel, BrandingSettingsPanel
├── shared/         ← NavTabs, PageHeader, EmptyState, ErrorState, Segmented, ThemeSwitch
├── sites/          ← SitesTable, NewSiteDialog
├── team/           ← InviteDialog
└── ui/             ← Radix-based primitives restyled for SiteOrbit (Button, Dialog, Table, etc.)
```

### Backend Architecture

The FastAPI backend follows a clean three-layer pattern:

```
Endpoint (router) → Service (business logic) → Model (SQLAlchemy ORM)
```

- **Endpoints** (`app/api/v1/endpoints/`) receive and validate HTTP requests, call service methods, return Pydantic schemas
- **Services** (`app/services/`) contain all business logic, membership checks, and DB mutations
- **Models** (`app/models/`) define SQLAlchemy ORM classes, foreign keys, and relationships
- **Schemas** (`app/schemas/`) define Pydantic request/response shapes — separate from ORM models

Every protected endpoint goes through `get_current_user` (from `app/core/dependencies.py`), which reads the `Authorization: Bearer <token>` header, decodes the JWT, and fetches the user from the database.

Role enforcement happens at the service layer:
```python
ProjectService._get_workspace_membership(
    db,
    user_id=current_user.id,
    workspace_id=project.workspace_id,
    allowed_roles={"owner", "admin", "editor"},  # EDIT_ROLES
)
```
If the user's membership role is not in the allowed set, FastAPI raises HTTP 403 before any mutation happens.

---

## Project Structure

### Frontend

```
frontend/
├── app/
│   ├── (app)/
│   │   ├── analytics/page.tsx       # Analytics route
│   │   ├── dashboard/page.tsx       # Sites home
│   │   ├── domains/page.tsx         # Domains management
│   │   ├── layout.tsx               # App shell layout — top bar and tabs
│   │   ├── settings/page.tsx        # Workspace, branding and billing tabs
│   │   └── team/page.tsx            # Team management
│   ├── (editor)/
│   │   ├── builder/page.tsx         # Full-screen builder
│   │   └── layout.tsx               # Auth check only, no app shell
│   ├── (auth)/
│   │   ├── accept-invite/page.tsx   # Invitation acceptance
│   │   ├── forgot-password/page.tsx # Password recovery
│   │   ├── layout.tsx               # Single-column auth layout
│   │   ├── sign-in/page.tsx         # Sign in page
│   │   └── sign-up/page.tsx         # Sign up page
│   ├── (marketing)/
│   │   ├── layout.tsx               # Marketing layout (no auth)
│   │   └── page.tsx                 # Landing page
│   ├── api/health/route.ts          # Frontend health check endpoint
│   ├── oauth/callback/page.tsx      # OAuth exchange callback
│   ├── globals.css                  # Design tokens (both themes), type scale, motion
│   ├── icon.svg, apple-icon.tsx     # Favicon and Apple touch icon
│   ├── opengraph-image.tsx          # Social share image
│   └── layout.tsx                   # Root layout — providers, fonts, meta, theme script
│
├── components/                      # (see Component Organization above)
│
├── hooks/
│   ├── use-analytics.ts             # Analytics data fetching hook
│   ├── use-auth.ts                  # Auth mutations and session management
│   ├── use-builder.ts               # Builder page/layout data + mutations
│   ├── use-document-title.ts        # Page titles for client-rendered routes
│   ├── use-domains.ts               # Domain management hook
│   ├── use-hydrated.ts              # True once the client has hydrated
│   ├── use-projects.ts              # Project CRUD mutations
│   ├── use-settings.ts              # Settings save/reset logic
│   ├── use-team.ts                  # Team members data
│   ├── use-theme.ts                 # Light / dark / system preference
│   ├── use-unsaved-changes-warning.ts  # Beforeunload guard
│   └── use-workspace.ts             # Workspace list + active workspace
│
├── lib/
│   ├── api/
│   │   ├── client.ts                # Typed fetch wrapper (apiClient)
│   │   └── endpoints.ts             # All API endpoint strings
│   ├── auth/
│   │   └── session.ts               # Cookie sync utilities for auth tokens
│   ├── config/
│   │   └── site.ts                  # App metadata constants
│   ├── constants/
│   │   ├── branding.ts              # Default theme for client sites
│   │   └── roles.ts                 # Role labels and permission sets
│   ├── theme.ts                     # Light/dark mode: storage, no-flash script
│   ├── utils.ts                     # cn (clsx + tailwind-merge)
│   ├── utils/format.ts              # Number, date and relative-time formatters, safe redirects
│   └── validators/
│       └── auth.ts                  # Zod schemas for sign-in/sign-up
│
├── store/
│   ├── auth-store.ts                # Zustand store — user, tokens, session
│   ├── builder-store.ts             # Zustand store — blocks, viewport, save status
│   └── workspace-store.ts           # Zustand store — workspaces, active workspace
│
├── types/
│   ├── analytics.ts                 # Analytics response types
│   ├── auth.ts                      # Auth user, response, input types
│   ├── builder.ts                   # Block types, viewport, save status
│   ├── domain.ts                    # Domain types
│   ├── invitation.ts                # Invitation types
│   ├── project.ts                   # Project types
│   ├── theme.ts                     # Theme types
│   └── workspace.ts                 # Workspace, membership, role types
│
├── docs/
│   ├── PROGRESS.md                  # What's done and what's next
│   ├── DECISIONS.md                 # Why things are the way they are
│   ├── LEARNING.md                  # Learning path
│   └── redesign/                    # Design system spec, page specs, screenshots
│
├── scripts/
│   ├── design-lint.mjs              # Fails the build on off-system styles
│   └── screenshots.mjs              # Review screenshots in both themes
├── tests/                           # Playwright end-to-end, accessibility and design tests
├── .github/                         # CI workflow, Dependabot, PR template
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies
├── postcss.config.mjs               # PostCSS + Tailwind config
├── proxy.ts                         # Route protection (Next 16's replacement for middleware)
├── tsconfig.json                    # TypeScript configuration
└── eslint.config.mjs                # ESLint configuration
```

### Backend

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── analytics.py     # GET /analytics/overview
│   │       │   ├── auth.py          # POST /auth/login, /register, /refresh, /logout, OAuth
│   │       │   ├── dashboard.py     # GET /dashboard/overview
│   │       │   ├── health.py        # GET /health/
│   │       │   ├── pages.py         # CRUD /pages/
│   │       │   ├── projects.py      # CRUD /projects/ + publish/unpublish
│   │       │   ├── users.py         # GET /users/me
│   │       │   └── workspaces.py    # CRUD /workspaces/ + members, theme, invitations, domains
│   │       └── router.py            # APIRouter assembly
│   ├── core/
│   │   ├── config.py                # pydantic-settings Settings class
│   │   ├── dependencies.py          # get_current_user FastAPI dependency
│   │   └── security.py              # JWT, bcrypt, OAuth token utils + rate limiter
│   ├── db/
│   │   ├── base.py                  # SQLAlchemy DeclarativeBase
│   │   └── session.py               # engine, SessionLocal, get_db generator
│   ├── middleware/
│   │   └── request_context.py       # x-request-id header middleware
│   ├── models/                      # SQLAlchemy ORM models
│   │   ├── analytics.py             # MetricSnapshot
│   │   ├── domain.py                # Domain
│   │   ├── invitation.py            # Invitation
│   │   ├── membership.py            # Membership
│   │   ├── page.py                  # Page
│   │   ├── project.py               # Project
│   │   ├── theme.py                 # Theme
│   │   ├── user.py                  # User
│   │   └── workspace.py             # Workspace
│   ├── schemas/                     # Pydantic request/response schemas
│   │   ├── analytics.py
│   │   ├── auth.py
│   │   ├── dashboard.py
│   │   ├── domain.py
│   │   ├── invitation.py
│   │   ├── page.py
│   │   ├── project.py
│   │   ├── theme.py
│   │   ├── user.py
│   │   └── workspace.py
│   ├── services/                    # Business logic layer
│   │   ├── analytics_service.py     # Seeded analytics generation
│   │   ├── auth_service.py          # Register, login, refresh
│   │   ├── auth_tokens.py           # Token utility re-exports
│   │   ├── dashboard_service.py     # Dashboard overview assembly
│   │   ├── domain_service.py        # Domain CRUD
│   │   ├── invitation_service.py    # Invitation create/accept
│   │   ├── oauth_service.py         # OAuth2 (Google + GitHub) flow
│   │   ├── page_service.py          # Page CRUD with membership checks
│   │   ├── project_service.py       # Project CRUD + publish/unpublish
│   │   ├── theme_service.py         # Theme read/update (get-or-create)
│   │   └── workspace_service.py     # Workspace CRUD, members, slug generation
│   ├── utils/
│   │   └── pagination.py            # Pagination metadata builder
│   └── main.py                      # FastAPI app — CORS, middleware, router, lifespan
│
├── scripts/
│   ├── dev.sh                       # Run uvicorn for local development
│   └── seed.py                      # Seed DB with owner, editor, workspace, project, page, theme
├── tests/
│   ├── conftest.py                  # pytest fixtures — test DB reset, client
│   ├── integration/
│   │   ├── test_auth_and_workspace.py
│   │   ├── test_health.py
│   │   └── test_projects_pages_and_dashboard.py
│   └── unit/
│       ├── test_frontend_origins.py
│       └── test_security.py
├── .github/                         # CI workflow, Dependabot, PR template
├── alembic.ini                      # Alembic configuration placeholder
├── Procfile                         # Deployment process file (Render/Railway)
├── pyproject.toml                   # Project metadata + pytest config
├── requirements.txt                 # Python dependencies
└── requirements-dev.txt             # Test dependencies (pytest, httpx)
```

---

## Data Model

```
User ─────────────────────────────── id, name, email, password_hash, auth_provider,
                                      provider_subject, avatar, created_at, updated_at
  │
  └─ Membership ──────────────────── id, user_id, workspace_id, role, created_at
       │
       └─ Workspace ─────────────── id, name, slug, logo, plan, description,
            │                        primary_domain, created_at, updated_at
            │
            ├─ Project ──────────── id, workspace_id, name, description, status,
            │    │                   created_at, updated_at
            │    │
            │    └─ Page ─────────── id, site_id, title, path, layout_json,
            │         │               created_at, updated_at
            │         │
            │         └─ MetricSnapshot  id, project_id, date, visits, conversions,
            │                            source, device, created_at
            │
            ├─ Theme ────────────── id, workspace_id, colors_json, typography_json,
            │                        spacing_json, radius_json, created_at, updated_at
            │
            ├─ Invitation ───────── id, workspace_id, invited_by_user_id, email,
            │                        role, status, token, created_at
            │
            └─ Domain ───────────── id, workspace_id, host, status, type,
                                     ssl_status, created_at
```

**Role values:** `owner | admin | editor | viewer`

**Project status values:** `draft | published | archived`

**Page layout_json format:**
```json
{
  "blocks": [
    {
      "id": "uuid",
      "type": "hero | text | features | cta",
      "props": {
        "title": "...",
        "subtitle": "...",
        "buttonLabel": "...",
        "buttonHref": "...",
        "body": "...",
        "items": ["..."]
      }
    }
  ]
}
```

---

## API Reference

All endpoints are prefixed with `/api/v1`.

### Auth

| Method | Path | Description |
|---|---|---|
| POST | `/auth/register` | Create account → returns tokens + user |
| POST | `/auth/login` | Sign in → returns tokens + user |
| POST | `/auth/refresh` | Exchange refresh token → new tokens |
| POST | `/auth/logout` | Invalidate session |
| GET | `/auth/oauth/{provider}/authorize` | Get OAuth redirect URL |
| GET | `/auth/oauth/{provider}/callback` | OAuth provider callback (redirects to frontend) |
| POST | `/auth/oauth/exchange` | Exchange short-lived OAuth code → session tokens |

### Users

| Method | Path | Description |
|---|---|---|
| GET | `/users/me` | Return the authenticated user |

### Workspaces

| Method | Path | Description |
|---|---|---|
| GET | `/workspaces/` | List all workspaces for current user |
| POST | `/workspaces/` | Create workspace (user becomes owner) |
| GET | `/workspaces/{id}` | Get workspace details |
| PATCH | `/workspaces/{id}` | Update workspace (owner/admin) |
| GET | `/workspaces/{id}/members` | List workspace members |
| PATCH | `/workspaces/{id}/members/{memberId}` | Update member role |
| GET | `/workspaces/{id}/theme` | Get workspace theme (creates default if none) |
| PATCH | `/workspaces/{id}/theme` | Update workspace theme |
| GET | `/workspaces/{id}/invitations` | List invitations (admin/owner) |
| POST | `/workspaces/{id}/invitations` | Create invitation |
| POST | `/workspaces/invitations/accept` | Accept invitation by token |
| GET | `/workspaces/{id}/domains` | List custom domains |
| POST | `/workspaces/{id}/domains` | Add custom domain |

### Projects

| Method | Path | Description |
|---|---|---|
| GET | `/projects/?workspace_id=...` | List projects in a workspace |
| POST | `/projects/` | Create project |
| GET | `/projects/{id}` | Get project |
| PATCH | `/projects/{id}` | Update project |
| DELETE | `/projects/{id}` | Delete project (owner/admin) |
| POST | `/projects/{id}/publish` | Set status to `published` |
| POST | `/projects/{id}/unpublish` | Set status back to `draft` |

### Pages

| Method | Path | Description |
|---|---|---|
| GET | `/pages/?site_id=...` | List pages for a project |
| POST | `/pages/` | Create page |
| GET | `/pages/{id}` | Get page |
| PATCH | `/pages/{id}` | Update page (including layout_json) |
| DELETE | `/pages/{id}` | Delete page |

### Dashboard

| Method | Path | Description |
|---|---|---|
| GET | `/dashboard/overview?workspace_id=...` | Stats, recent projects, members, activity |

### Analytics

| Method | Path | Description |
|---|---|---|
| GET | `/analytics/overview?site_id=...&range=30d` | Metrics, traffic, sources, top pages |

---

## Authentication System

SiteOrbit uses a dual-token authentication strategy:

### Access Token
- Short-lived JWT (default: 60 minutes)
- Signed with `HS256` using `SECRET_KEY`
- Payload: `{ sub: user_id, type: "access", exp: timestamp }`
- Sent as `Authorization: Bearer <token>` on every protected request

### Refresh Token
- Long-lived JWT (default: 30 days)
- Exchanged at `/auth/refresh` for a new access token + new refresh token
- If the `/users/me` query returns 401, the auth hook automatically triggers a refresh

### Session Persistence
- Tokens stored in `sessionStorage` via Zustand's `persist` middleware
- Access token is also synced to a browser cookie (`siteorbit_access_token`) for middleware access
- `syncAuthCookieFromStorage()` runs on app mount to re-sync the cookie if the token is already in storage

### OAuth2 (Google + GitHub)
A three-step flow using short-lived exchange tokens:

1. Frontend requests `GET /auth/oauth/{provider}/authorize` → gets a URL
2. User is redirected to Google/GitHub, then back to `/auth/oauth/{provider}/callback` on the backend
3. Backend exchanges the provider code for a user profile, upserts the user, creates a short-lived exchange token, and redirects to the frontend at `/oauth/callback?code=<exchange_token>&redirect=<path>`
4. Frontend exchanges the code via `POST /auth/oauth/exchange` → receives full session tokens

The exchange token has a 5-minute TTL. It carries only the `user_id`, not any provider secrets.

### Inactivity Logout
`AuthActivityProvider` listens to `mousemove`, `mousedown`, `keydown`, `scroll`, `touchstart`, `click`, and `visibilitychange`. If no activity is detected for 30 minutes, the session is cleared and the user is redirected to `/sign-in`.

---

## The Visual Builder

The builder is the most architecturally complex feature. Here is how the full data lifecycle works:

```
User opens /builder?projectId=abc&pageId=xyz
  │
  ├─ useBuilder hook fires two queries:
  │    ├─ GET /projects/abc                   → project metadata
  │    └─ GET /pages/?site_id=abc             → all pages in this project
  │
  ├─ If no pages exist → ensureDefaultPage()
  │    └─ POST /pages/ { title: "Homepage", path: "/" }
  │         └─ Router replaces URL with ?pageId=<new-page-id>
  │
  ├─ GET /pages/{pageId}                      → full page record including layout_json
  │
  ├─ parseLayoutJson(layout_json)             → { blocks: [...] }
  │
  ├─ builderStore.hydrateFromLayout(pageId, layout)
  │    └─ Sets blocks[], selectedBlockId, saveStatus: "idle"
  │
  └─ Canvas renders blocks from Zustand store
```

**Adding a block:**
```
User clicks "Hero" in BlocksPanel
  └─ onAddBlock({ id: uuid, type: "hero", props: { title: "...", ... } })
       └─ builderStore.addBlock(block)
            └─ Appends block, sets selectedBlockId, saveStatus: "unsaved"
                 └─ Canvas re-renders, PropertiesPanel shows hero inputs
```

**Saving a page:**
```
User clicks "Save"
  └─ handleSave() → saveCurrentPage()
       └─ savePageMutation.mutateAsync({ pageId, payload: { layout_json: store.getLayoutJson() } })
            └─ builderStore.setSaveStatus("saving")
                 └─ PATCH /pages/{pageId} { layout_json: '{"blocks":[...]}' }
                      └─ Success → setSaveStatus("saved")
                         Error  → setSaveStatus("error")
```

---

## Multi-tenant Workspace System

Every piece of data in SiteOrbit is scoped to a workspace. The isolation boundary is enforced at the service layer — not just the UI.

When a user creates a workspace, a `Membership` record is created with `role: "owner"`. From that point, every data query checks:

1. Does a Membership exist for this user + workspace combination?
2. Is the membership role in the allowed_roles set for this operation?

The frontend mirrors this. The `useWorkspace` hook fetches all workspaces the user belongs to and exposes:
- `activeWorkspace` — the currently selected workspace
- `currentRole` — the user's role in that workspace
- `setActiveWorkspaceId` — switches the active workspace (persisted in sessionStorage)

Workspace data in the top bar, sites list, and builder all respond to the active workspace without page reloads.

---

## State Management

### Zustand Stores

**`auth-store.ts`**
- `user`, `accessToken`, `refreshToken`, `isAuthenticated`
- `setSession()` — sets all four fields + syncs the cookie
- `clearSession()` — clears all fields + removes the cookie
- Persisted to `sessionStorage` under the key `siteorbit-auth`

**`workspace-store.ts`**
- `workspaces[]`, `activeWorkspaceId`, `activeWorkspace`
- `setActiveWorkspaceId()` — updates the active workspace by ID
- `clearWorkspaceState()` — called on sign-out
- Persisted to `sessionStorage` under the key `siteorbit-workspace` (only `activeWorkspaceId`)

**`builder-store.ts`**
- `blocks[]`, `selectedBlockId`, `viewport`, `saveStatus`, `isPreviewMode`
- `addBlock()`, `removeBlock()`, `moveBlock()`, `updateBlockProps()`
- `hydrateFromLayout()` — initializes from persisted `layout_json`
- `getLayoutJson()` — serializes the current block array for the API
- Not persisted — resets when the route changes or the component unmounts

### TanStack Query (Server State)

Every API call is wrapped in a `useQuery` or `useMutation`. Queries are keyed by the relevant IDs and access token:

```ts
queryKey: ["workspaces", "list", accessToken]
queryKey: ["project", "detail", projectId, accessToken]
queryKey: ["pages", "list", projectId, accessToken]
queryKey: ["auth", "me", accessToken]
```

When a mutation succeeds, it invalidates the relevant query keys to trigger background refetches. This means the UI always reflects server truth without manual cache management.

Global query defaults (set in `QueryProvider`):
- `retry: 1` — retries once before showing an error
- `refetchOnWindowFocus: false` — prevents noisy refetches on tab switch
- `staleTime: 30_000` — data is considered fresh for 30 seconds

---

## Performance Strategy

- **Route-level code splitting:** the builder lives in its own `(editor)` route group, so its canvas and panels never load on the other routes
- **No animation library:** all motion is CSS, so there's no animation runtime in the bundle
- **TanStack Query caching:** workspace, project, and settings data are cached with `staleTime` — rapid navigation between routes doesn't re-fetch
- **Memoization:** `useMemo` is used in `useBuilder` to parse `layout_json` only when the page record changes
- **Skeleton loading:** all data-heavy screens use skeleton placeholders during initial load
- **Image optimization:** Next.js `<Image>` used for all asset rendering
- **CSS tokens over inline styles:** design tokens in `app/globals.css` reduce class bloat and power both themes
- **Tree-shakeable icons:** Lucide React only bundles the icons that are actually imported
- **Optimistic store updates:** workspace creation updates the TanStack Query cache directly before the invalidation refetch to prevent a loading flash

---

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Python 3.11+
- Git

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/UzomaN-Hub/SiteOrbit.git
cd SiteOrbit

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Start the development server
npm run dev
```

The app runs at `http://localhost:4317`.

### Backend Setup

The backend is a separate, private repository (`SiteOrbit-Backend`).

```bash
cd SiteOrbit-Backend

# Create and activate a virtual environment
python -m venv .venv

# On Linux/macOS:
source .venv/bin/activate

# On Windows (Git Bash):
source .venv/Scripts/activate

# Install dependencies (requirements-dev.txt adds the test tools)
pip install -r requirements-dev.txt

# Copy environment file
cp .env.example .env
# Edit .env with your SECRET_KEY and any OAuth credentials

# Seed the database with test data
python scripts/seed.py

# Start the API server
uvicorn app.main:app --reload --port 8000
```

The API runs at `http://localhost:8000`. Interactive docs are at `http://localhost:8000/docs`.

**Seed credentials:**
- Owner: `owner@siteorbit.app` / `Password123`
- Editor: `editor@siteorbit.app` / `Password123`

---

## Environment Variables

### Frontend (`.env.local`)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_APP_URL` | This app's public URL (metadata, share images) | `http://localhost:4317` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional. Where "Contact sales" goes; LinkedIn if unset | `hello@example.com` |

### Backend (`.env`)

| Variable | Description | Default |
|---|---|---|
| `SECRET_KEY` | JWT signing secret | `change-me` |
| `DATABASE_URL` | Database connection string | `sqlite:///./siteorbit.db` |
| `FRONTEND_URL` | Frontend origin for CORS and OAuth redirects | `http://localhost:4317` |
| `FRONTEND_ORIGIN_REGEX` | Optional. Extra allowed origins (e.g. preview deploys) | unset |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access token TTL | `60` |
| `REFRESH_TOKEN_EXPIRE_DAYS` | Refresh token TTL | `30` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | optional |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | optional |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | optional |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | optional |

---

## Running Tests

### Backend Tests

```bash
cd backend
pytest tests/ -v
```

The test suite includes:
- `tests/unit/test_security.py` — password hashing and JWT token generation
- `tests/unit/test_frontend_origins.py` — allowed frontend origins for CORS and OAuth
- `tests/integration/test_health.py` — health endpoint
- `tests/integration/test_auth_and_workspace.py` — register, login, create workspace
- `tests/integration/test_projects_pages_and_dashboard.py` — full CRUD flow

The `conftest.py` fixture drops and recreates the SQLite test database before every test, so tests are fully isolated.

### Frontend Checks

```bash
npm run typecheck     # TypeScript
npm run lint          # ESLint
npm run lint:design   # design lint: no gradients, off-palette colours, dead links...
npm run test:e2e      # Playwright: end-to-end, accessibility (axe) and design tests
npm run check         # all of the above, plus a production build
```

Playwright builds the app and serves it on port 4318. Signed-in tests need `E2E_EMAIL` and `E2E_PASSWORD` in `.env.test.local`. The same checks run in GitHub Actions on every pull request, and `main` only accepts squash-merged pull requests with green checks.

---

## Deployment

### Frontend — Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variable in Vercel dashboard:
# NEXT_PUBLIC_API_URL = https://your-backend-url.com/api/v1
```

### Backend — Render / Railway / Fly.io

The `Procfile` contains the startup command:
```
web: uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000} --proxy-headers --forwarded-allow-ips='*'
```

Set environment variables in your hosting provider's dashboard. Use a PostgreSQL URL for `DATABASE_URL` in production — the backend handles `postgres://` → `postgresql://` normalization automatically.

---

## Design System & Tokens

The visual identity is defined in `app/globals.css` as CSS custom properties. The full spec is in `docs/redesign/DESIGN.md`. Every colour in the UI references these tokens, and a design lint fails the build on anything else:

```css
--carbon: #111214;   /* dark background, light-mode text */
--bone:   #ECEAE4;   /* dark-mode text */
--amber:  #D9A520;   /* the one accent: primary button, Live, focus */
--paper:  #FAF8F3;   /* light-mode background */

/* Everything else is a mix of these, e.g. */
--surface-1: color-mix(in srgb, var(--bone) 4%, var(--carbon));
--border:    color-mix(in srgb, var(--bone) 12%, var(--carbon));
```

- **Two themes:** dark and light, following the system setting until the visitor picks one. A tiny inline script applies the theme before the first paint, so there's no flash.
- **One accent:** amber is used for one primary action per screen, Live status, focus rings and errors. No gradients, glows or blur.
- **Radius by role:** 3px badges, 6px buttons and inputs, 10px cards, 16px dialogs.

**Fonts:**
- Headings: **Fraunces** — a characterful serif
- Body and UI: **Hanken Grotesk** — clean and readable

**Motion (CSS only):**
- Hero headline rises in word by word
- Sections reveal once as they scroll into view (one shared IntersectionObserver)
- Tab underline slides between tabs
- Menus and dialogs rise 4px and fade in
- With JavaScript off everything is visible; with reduced motion turned on, nothing moves

---



Built by **Uzoma Nwaiwu** · A flagship · Not a dashboard mockup


