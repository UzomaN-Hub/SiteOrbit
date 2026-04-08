This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.gitignore
app/(app)/analytics/page.tsx
app/(app)/builder/page.tsx
app/(app)/dashboard/page.tsx
app/(app)/domains/page.tsx
app/(app)/layout.tsx
app/(app)/projects/page.tsx
app/(app)/settings/page.tsx
app/(app)/team/page.tsx
app/(app)/templates/page.tsx
app/(auth)/accept-invite/page.tsx
app/(auth)/forgot-password/page.tsx
app/(auth)/layout.tsx
app/(auth)/sign-in/page.tsx
app/(auth)/sign-up/page.tsx
app/(marketing)/layout.tsx
app/(marketing)/page.tsx
app/api/health/route.ts
app/error.tsx
app/favicon.ico
app/globals.css
app/layout.tsx
app/loading.tsx
app/not-found.tsx
app/oauth/callback/page.tsx
app/page.tsx
components.json
components/analytics/analytics-page-client.tsx
components/analytics/metric-card.tsx
components/analytics/top-pages-table.tsx
components/analytics/traffic-chart.tsx
components/auth/auth-card.tsx
components/auth/auth-form-motion.tsx
components/auth/auth-form.tsx
components/auth/auth-orbit-visual.tsx
components/auth/auth-social-button.tsx
components/auth/auth-visual-primitives.tsx
components/auth/password-field-toggle.tsx
components/builder/blocks-panel.tsx
components/builder/builder-page-client.tsx
components/builder/builder-shell.tsx
components/builder/builder-toolbar.tsx
components/builder/canvas.tsx
components/builder/properties-panel.tsx
components/layout/app-shell.tsx
components/layout/page-header.tsx
components/marketing/features.tsx
components/marketing/hero.tsx
components/marketing/pricing-teaser.tsx
components/navigation/sidebar.tsx
components/navigation/topbar.tsx
components/navigation/user-menu.tsx
components/navigation/workspace-switcher.tsx
components/projects/project-card.tsx
components/projects/project-grid.tsx
components/providers/auth-activity-provider.tsx
components/providers/auth-bootstrap-provider.tsx
components/providers/query-provider.tsx
components/providers/theme-provider.tsx
components/settings/branding-settings-panel.tsx
components/settings/settings-nav.tsx
components/settings/settings-placeholder-panel.tsx
components/settings/workspace-settings-panel.tsx
components/shared/empty-state.tsx
components/shared/error-state.tsx
components/shared/loading-state.tsx
components/shared/logo.tsx
components/team/invite-member-modal.tsx
components/team/member-table.tsx
components/ui/.gitkeep
components/ui/alert-dialog.tsx
components/ui/alert.tsx
components/ui/avatar.tsx
components/ui/badge.tsx
components/ui/breadcrumb.tsx
components/ui/button.tsx
components/ui/card.tsx
components/ui/chart.tsx
components/ui/checkbox.tsx
components/ui/command.tsx
components/ui/dialog.tsx
components/ui/dropdown-menu.tsx
components/ui/empty.tsx
components/ui/field.tsx
components/ui/input-group.tsx
components/ui/input.tsx
components/ui/label.tsx
components/ui/pagination.tsx
components/ui/popover.tsx
components/ui/progress.tsx
components/ui/radio-group.tsx
components/ui/resizable.tsx
components/ui/scroll-area.tsx
components/ui/select.tsx
components/ui/separator.tsx
components/ui/sheet.tsx
components/ui/sidebar.tsx
components/ui/skeleton.tsx
components/ui/sonner.tsx
components/ui/spinner.tsx
components/ui/switch.tsx
components/ui/table.tsx
components/ui/tabs.tsx
components/ui/textarea.tsx
components/ui/tooltip.tsx
docs/ARCHITECTURE.md
docs/ROUTES.md
eslint.config.mjs
hooks/use-analytics.ts
hooks/use-auth.ts
hooks/use-builder.ts
hooks/use-dashboard.ts
hooks/use-domains.ts
hooks/use-mobile.ts
hooks/use-projects.ts
hooks/use-settings.ts
hooks/use-team.ts
hooks/use-unsaved-changes-warning.ts
hooks/use-workspace.ts
lib/api/client.ts
lib/api/endpoints.ts
lib/auth/session.ts
lib/config/site.ts
lib/constants/navigation.ts
lib/constants/theme.ts
lib/mocks/analytics.ts
lib/mocks/dashboard.ts
lib/mocks/projects.ts
lib/motion.ts
lib/utils.ts
lib/utils/cn.ts
lib/utils/format.ts
lib/validators/auth.ts
lib/validators/workspace.ts
next.config.ts
package.json
postcss.config.mjs
proxy.ts
README.md
scripts/setup.sh
store/auth-store.ts
store/builder-store.ts
store/workspace-store.ts
styles/tokens.css
tests/e2e/.gitkeep
tests/integration/.gitkeep
tests/unit/.gitkeep
tsconfig.json
types/analytics.ts
types/auth.ts
types/builder.ts
types/dashboard.ts
types/domain.ts
types/invitation.ts
types/project.ts
types/theme.ts
types/workspace.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="app/api/health/route.ts">
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "siteorbit-frontend",
  });
}
</file>

<file path="app/oauth/callback/page.tsx">
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import LoadingState from "@/components/shared/loading-state";
import { useAuth } from "@/hooks/use-auth";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasStartedRef = useRef(false);

  const { oauthExchangeMutation } = useAuth();

  useEffect(() => {
    if (hasStartedRef.current) return;

    const code = searchParams.get("code");
    const redirect = searchParams.get("redirect") || "/dashboard";

    if (!code) {
      hasStartedRef.current = true;
      toast.error("OAuth sign-in could not be completed.");
      router.replace("/sign-in");
      return;
    }

    hasStartedRef.current = true;

    void (async () => {
      try {
        await oauthExchangeMutation.mutateAsync(code);
        toast.success("Signed in successfully.");
        router.replace(redirect);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "OAuth sign-in failed.";
        toast.error(message);
        router.replace("/sign-in");
      }
    })();
  }, [oauthExchangeMutation, router, searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <LoadingState
          title="Completing sign-in"
          description="Finalizing your secure SiteOrbit session."
        />
      </div>
    </main>
  );
}
</file>

<file path="components.json">
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
</file>

<file path="components/analytics/analytics-page-client.tsx">
"use client";

import { motion } from "framer-motion";

import MetricCard from "@/components/analytics/metric-card";
import TopPagesTable from "@/components/analytics/top-pages-table";
import TrafficChart from "@/components/analytics/traffic-chart";
import { panelSlideUp, staggerContainer } from "@/lib/motion";
import type { AnalyticsOverviewResponse } from "@/types/analytics";

export default function AnalyticsPageClient({
  data,
}: {
  data: AnalyticsOverviewResponse;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.section
        variants={staggerContainer}
        className="grid gap-5 lg:grid-cols-4"
      >
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </motion.section>

      <motion.div variants={panelSlideUp}>
        <TrafficChart data={data.traffic} sources={data.sources} />
      </motion.div>

      <motion.div variants={panelSlideUp}>
        <TopPagesTable pages={data.top_pages} />
      </motion.div>
    </motion.div>
  );
}
</file>

<file path="components/auth/auth-form-motion.tsx">
import type { Easing, Transition, Variants } from "framer-motion";

export const authEase: Easing = [0.22, 1, 0.36, 1];

export const authItemTransition: Transition = {
  duration: 0.42,
  ease: authEase,
};

export const authContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const authItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: authItemTransition,
  },
};

export const authFeedbackVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.985,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.28,
      ease: authEase,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.985,
    transition: {
      duration: 0.18,
      ease: "easeIn",
    },
  },
};

export const authPageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};
</file>

<file path="components/auth/auth-orbit-visual.tsx">
"use client";

import { motion } from "framer-motion";

import { authEase } from "@/components/auth/auth-form-motion";
import {
  FloatingOrb,
  OrbitPulse,
} from "@/components/auth/auth-visual-primitives";

type AuthOrbitVisualProps = {
  mode?: "sign-in" | "sign-up" | "forgot-password";
};

export default function AuthOrbitVisual({
  mode = "sign-in",
}: AuthOrbitVisualProps) {
  const label =
    mode === "sign-up"
      ? "New workspace systems"
      : mode === "forgot-password"
        ? "Recovery pathway"
        : "Secure team access";

  const title =
    mode === "sign-up"
      ? "Launch your workspace with momentum."
      : mode === "forgot-password"
        ? "Recover access without losing flow."
        : "Step back into your digital orbit.";

  const subtitle =
    mode === "sign-up"
      ? "Create a workspace, invite your team, and move from setup to publishing with clarity."
      : mode === "forgot-password"
        ? "Keep the recovery path calm, readable, and confidence-building for first-time and returning users."
        : "A polished control layer for teams building, publishing, and managing branded landing pages.";

  return (
    <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(8,13,24,0.72),rgba(13,20,35,0.94))]">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 28% 30%, rgba(79,219,200,0.16), transparent 22%), radial-gradient(circle at 76% 62%, rgba(137,206,255,0.10), transparent 22%)",
            "radial-gradient(circle at 34% 34%, rgba(79,219,200,0.2), transparent 24%), radial-gradient(circle at 72% 58%, rgba(137,206,255,0.14), transparent 24%)",
            "radial-gradient(circle at 28% 30%, rgba(79,219,200,0.16), transparent 22%), radial-gradient(circle at 76% 62%, rgba(137,206,255,0.10), transparent 22%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%,rgba(255,255,255,0.01))]" />

      <FloatingOrb className="left-[10%] top-[14%] h-28 w-28 bg-[#4fdbc8]/12 blur-2xl" delay={0} />
      <FloatingOrb className="right-[12%] top-[18%] h-24 w-24 bg-[#89ceff]/12 blur-2xl" delay={1.4} />
      <FloatingOrb className="bottom-[12%] left-[26%] h-36 w-36 bg-[#4fdbc8]/10 blur-3xl" delay={2.2} />

      <OrbitPulse className="left-1/2 top-1/2 size-[210px] -translate-x-1/2 -translate-y-1/2" delay={0} />
      <OrbitPulse className="left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2" delay={0.6} />
      <OrbitPulse className="left-1/2 top-1/2 size-[350px] -translate-x-1/2 -translate-y-1/2" delay={1.1} />

      <motion.div
        className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4fdbc8]/20 bg-[radial-gradient(circle_at_center,rgba(79,219,200,0.18),rgba(79,219,200,0.04)_55%,transparent_72%)] shadow-[0_0_90px_rgba(79,219,200,0.18)]"
        animate={{
          scale: [1, 1.06, 0.98, 1],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-[17%] top-[24%] rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9feee2]"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {label}
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-6 right-6 rounded-[1.25rem] border border-white/8 bg-black/20 p-5 backdrop-blur-md"
        initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.2, ease: authEase }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
          SiteOrbit System
        </p>
        <h3 className="mt-3 font-heading text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#e9edf7]">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[#b8c3d9]">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
}
</file>

<file path="components/auth/auth-social-button.tsx">
"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.2-1.9 2.9l3.1 2.4c1.8-1.7 2.8-4.2 2.8-7.1 0-.7-.1-1.4-.2-2.1H12Z"
      />
      <path
        fill="#34A853"
        d="M12 21c2.7 0 5-0.9 6.7-2.5l-3.1-2.4c-.9.6-2 .9-3.6.9-2.7 0-4.9-1.8-5.7-4.2H3.1v2.6C4.8 18.8 8.1 21 12 21Z"
      />
      <path
        fill="#4A90E2"
        d="M6.3 12.8c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V6.6H3.1C2.4 8 2 9.4 2 11s.4 3 1.1 4.4l3.2-2.6Z"
      />
      <path
        fill="#FBBC05"
        d="M12 5.1c1.5 0 2.8.5 3.9 1.5l2.9-2.9C17 2.1 14.7 1 12 1 8.1 1 4.8 3.2 3.1 6.6l3.2 2.6C7.1 6.9 9.3 5.1 12 5.1Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-1.95c-3.2.69-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.76 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a10.98 10.98 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.83 1.18 3.09 0 4.42-2.71 5.39-5.29 5.68.41.35.78 1.05.78 2.11v3.12c0 .31.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

type AuthSocialButtonProps = {
  provider: "google" | "github";
  activeProvider: "google" | "github" | null;
  disabled: boolean;
  onClick: () => void;
};

export default function AuthSocialButton({
  provider,
  activeProvider,
  disabled,
  onClick,
}: AuthSocialButtonProps) {
  const isActive = activeProvider === provider;
  const label = provider === "google" ? "Google" : "GitHub";

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
    >
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        onClick={onClick}
        className="relative h-14 w-full overflow-hidden rounded-[0.85rem] border-white/8 bg-transparent text-[#dee2f5] hover:bg-white/[0.03]"
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.07),transparent)]"
          animate={isActive ? { x: ["-120%", "120%"] } : { x: "-120%" }}
          transition={
            isActive
              ? { duration: 1.05, repeat: Infinity, ease: "linear" }
              : { duration: 0.2 }
          }
        />
        {isActive ? (
          <Loader2 className="size-4 animate-spin" />
        ) : provider === "google" ? (
          <GoogleIcon />
        ) : (
          <GitHubIcon />
        )}
        {label}
      </Button>
    </motion.div>
  );
}
</file>

<file path="components/auth/auth-visual-primitives.tsx">
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn("absolute rounded-full", className)}
      animate={{
        x: [0, 12, -8, 0],
        y: [0, -16, 10, 0],
        scale: [1, 1.06, 0.97, 1],
      }}
      transition={{
        duration: 9,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function OrbitPulse({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full border border-white/8",
        className
      )}
      animate={{
        opacity: [0.15, 0.38, 0.12],
        scale: [0.96, 1.03, 1.08],
      }}
      transition={{
        duration: 5.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
</file>

<file path="components/auth/password-field-toggle.tsx">
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldToggleProps = {
  shown: boolean;
  onToggle: () => void;
};

export default function PasswordFieldToggle({
  shown,
  onToggle,
}: PasswordFieldToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#9aa6c0] hover:text-white"
      aria-label={shown ? "Hide password" : "Show password"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={shown ? "shown" : "hidden"}
          initial={{ opacity: 0, rotate: -12, scale: 0.84 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 12, scale: 0.84 }}
          transition={{ duration: 0.18 }}
          className="block"
        >
          {shown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
</file>

<file path="components/builder/builder-page-client.tsx">
"use client";

import dynamic from "next/dynamic";

import LoadingState from "@/components/shared/loading-state";

const BuilderShell = dynamic(
  () => import("@/components/builder/builder-shell"),
  {
    loading: () => (
      <LoadingState
        compact
        title="Loading builder"
        description="Preparing the visual editor."
      />
    ),
    ssr: false,
  }
);

export default function BuilderPageClient() {
  return <BuilderShell />;
}
</file>

<file path="components/providers/auth-activity-provider.tsx">
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";

const INACTIVITY_LIMIT_MS = 120_000;

export default function AuthActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const warnedRef = useRef(false);

  const { isAuthenticated } = useAuthStore();
  const { signOut } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      warnedRef.current = false;
      return;
    }

    const logoutForInactivity = async () => {
      if (!warnedRef.current) {
        warnedRef.current = true;
        toast.info("You were logged out due to inactivity.");
      }

      await signOut();
      router.replace("/sign-in");
      router.refresh();
    };

    const resetTimer = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        void logoutForInactivity();
      }, INACTIVITY_LIMIT_MS);
    };

    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer, { passive: true });
    });

    document.addEventListener("visibilitychange", resetTimer);
    resetTimer();

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      events.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer);
      });

      document.removeEventListener("visibilitychange", resetTimer);
    };
  }, [isAuthenticated, router, signOut]);

  return <>{children}</>;
}
</file>

<file path="components/providers/auth-bootstrap-provider.tsx">
"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import LoadingState from "@/components/shared/loading-state";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";

export default function AuthBootstrapProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken } = useAuthStore();
  const { meQuery, signOut, isUnauthorized } = useAuth();

  useEffect(() => {
    if (!isUnauthorized) return;

    void (async () => {
      await signOut();

      const redirect = pathname ? `?redirect=${encodeURIComponent(pathname)}` : "";
      router.replace(`/sign-in${redirect}`);
      router.refresh();
    })();
  }, [isUnauthorized, pathname, router, signOut]);

  if (accessToken && meQuery.isPending) {
    return (
      <div className="px-4 py-10 md:px-8 md:py-12">
        <LoadingState
          title="Loading your workspace"
          description="Checking your session and preparing your account."
        />
      </div>
    );
  }

  return <>{children}</>;
}
</file>

<file path="components/settings/branding-settings-panel.tsx">
"use client";

import { ImageIcon, Loader2, Palette, Type } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  cardReveal,
  pageReveal,
  pulseGlow,
  staggerContainer,
  sectionReveal,
} from "@/lib/motion";

export type BrandingFormState = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  heading_font: string;
  body_font: string;
  base_size: string;
  section_gap: string;
  container_width: string;
  card_radius: string;
  button_radius: string;
  input_radius: string;
};

type BrandingSettingsPanelProps = {
  form: BrandingFormState;
  initialForm: BrandingFormState;
  canManageSettings: boolean;
  isSaving: boolean;
  onChange: (next: BrandingFormState) => void;
  onReset: () => void;
  onSave: () => Promise<void>;
};

export default function BrandingSettingsPanel({
  form,
  initialForm,
  canManageSettings,
  isSaving,
  onChange,
  onReset,
  onSave,
}: BrandingSettingsPanelProps) {
  const hasUnsavedChanges =
    JSON.stringify(form) !== JSON.stringify(initialForm);

  const handleSave = async () => {
    try {
      await onSave();
      toast.success("Brand settings saved.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Brand settings could not be saved.";
      toast.error(message);
    }
  };

  return (
    <motion.div
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className="grid gap-8 lg:grid-cols-[1.2fr_1fr]"
    >
      <motion.section
        variants={cardReveal}
        className="relative overflow-hidden rounded-xl bg-[#1a1f2d] p-8"
      >
        <motion.div
          variants={pulseGlow}
          initial="initial"
          animate="animate"
          className="absolute -right-16 -top-16 size-32 rounded-full bg-[#4fdbc8]/5 blur-3xl"
        />

        <motion.div variants={staggerContainer} className="relative space-y-8">
          <motion.div
            variants={sectionReveal}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <h2 className="font-heading text-xl font-bold text-[#dee2f5]">
                Brand System
              </h2>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Theme colors, typography, spacing, and radius values used across
                the workspace.
              </p>
            </div>
            <motion.div whileHover={{ rotate: -10, scale: 1.08 }}>
              <Palette className="size-7 text-[#4fdbc8]/40" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2"
          >
            {[
              ["Primary", "primary"],
              ["Secondary", "secondary"],
              ["Accent", "accent"],
              ["Background", "background"],
              ["Surface", "surface"],
            ].map(([label, key]) => (
              <motion.div key={key} variants={sectionReveal}>
                <Field>
                  <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                    {label}
                  </FieldLabel>
                  <FieldContent>
                    <div className="flex gap-3">
                      <Input
                        type="color"
                        value={form[key as keyof BrandingFormState] as string}
                        disabled={!canManageSettings}
                        onChange={(event) =>
                          onChange({
                            ...form,
                            [key]: event.target.value,
                          })
                        }
                        className="h-12 w-16 rounded-lg bg-[#090e1b] p-2"
                      />
                      <Input
                        value={form[key as keyof BrandingFormState] as string}
                        disabled={!canManageSettings}
                        onChange={(event) =>
                          onChange({
                            ...form,
                            [key]: event.target.value,
                          })
                        }
                        className="h-12 rounded-lg bg-[#090e1b] text-[#dee2f5]"
                      />
                    </div>
                  </FieldContent>
                </Field>
              </motion.div>
            ))}

            {[
              ["Heading Font", "heading_font"],
              ["Body Font", "body_font"],
              ["Base Size", "base_size"],
              ["Section Gap", "section_gap"],
              ["Container Width", "container_width"],
              ["Card Radius", "card_radius"],
              ["Button Radius", "button_radius"],
              ["Input Radius", "input_radius"],
            ].map(([label, key]) => (
              <motion.div key={key} variants={sectionReveal}>
                <Field>
                  <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                    {label}
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      value={form[key as keyof BrandingFormState] as string}
                      disabled={!canManageSettings}
                      onChange={(event) =>
                        onChange({
                          ...form,
                          [key]: event.target.value,
                        })
                      }
                      className="h-12 rounded-lg bg-[#090e1b] text-[#dee2f5]"
                    />
                  </FieldContent>
                </Field>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={sectionReveal}
            className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                disabled={!canManageSettings || !hasUnsavedChanges}
                onClick={onReset}
              >
                Reset
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                className="h-11 rounded-md bg-[#4fdbc8] px-5 text-[#03241f] hover:bg-[#46cfbd]"
                disabled={!canManageSettings || !hasUnsavedChanges || isSaving}
                onClick={() => void handleSave()}
              >
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : null}
                Save Branding
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.aside variants={staggerContainer} className="space-y-8">
        <motion.section
          variants={cardReveal}
          className="rounded-xl bg-[#1a1f2d] p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-[#dee2f5]">
                Live Preview Tokens
              </h3>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Quick visual summary of the active workspace theme.
              </p>
            </div>
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }}>
              <Type className="size-6 text-[#4fdbc8]/45" />
            </motion.div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="rounded-lg bg-[#090e1b] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#9aa6c0]">
                Colors
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  form.primary,
                  form.secondary,
                  form.accent,
                  form.background,
                  form.surface,
                ].map((value) => (
                  <motion.div
                    key={value}
                    whileHover={{ y: -2, scale: 1.06 }}
                    className="size-10 rounded-full border border-white/10"
                    style={{ backgroundColor: value }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-[#090e1b] p-4 text-sm text-[#bbcac6]">
              <p className="font-semibold text-[#dee2f5]">
                {form.heading_font}
              </p>
              <p className="mt-2">
                Body font: {form.body_font} · Base size: {form.base_size}
              </p>
              <p className="mt-2">
                Container: {form.container_width} · Section gap: {form.section_gap}
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={cardReveal}
          className="rounded-xl bg-[#1a1f2d] p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-[#dee2f5]">
                Brand Assets
              </h3>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Placeholder surface for workspace logo and visual identity
                assets.
              </p>
            </div>
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }}>
              <ImageIcon className="size-6 text-[#4fdbc8]/45" />
            </motion.div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-white/10 bg-[#090e1b] p-6 text-center text-sm text-[#9aa6c0]">
            Logo upload can be added next without changing the settings structure.
          </div>
        </motion.section>
      </motion.aside>
    </motion.div>
  );
}
</file>

<file path="components/settings/settings-placeholder-panel.tsx">
"use client";

import { motion } from "framer-motion";
import { cardReveal, panelSlideUp } from "@/lib/motion";

type SettingsPlaceholderPanelProps = {
  title: string;
  description: string;
};

export default function SettingsPlaceholderPanel({
  title,
  description,
}: SettingsPlaceholderPanelProps) {
  return (
    <motion.section
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      className="rounded-xl bg-[#1a1f2d] p-8"
    >
      <motion.h2
        variants={panelSlideUp}
        initial="hidden"
        animate="visible"
        className="font-heading text-xl font-bold text-[#dee2f5]"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={panelSlideUp}
        initial="hidden"
        animate="visible"
        className="mt-3 max-w-2xl text-sm leading-6 text-[#bbcac6]"
      >
        {description}
      </motion.p>
    </motion.section>
  );
}
</file>

<file path="components/settings/workspace-settings-panel.tsx">
"use client";

import { Info, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cardReveal, pageReveal, pulseGlow, staggerContainer, sectionReveal } from "@/lib/motion";

export type WorkspaceFormState = {
  name: string;
  primary_domain: string;
  description: string;
};

type WorkspaceSettingsPanelProps = {
  form: WorkspaceFormState;
  initialForm: WorkspaceFormState;
  currentRole: string | null;
  canManageSettings: boolean;
  isSaving: boolean;
  onChange: (next: WorkspaceFormState) => void;
  onReset: () => void;
  onSave: () => Promise<void>;
};

export default function WorkspaceSettingsPanel({
  form,
  initialForm,
  currentRole,
  canManageSettings,
  isSaving,
  onChange,
  onReset,
  onSave,
}: WorkspaceSettingsPanelProps) {
  const hasUnsavedChanges =
    JSON.stringify(form) !== JSON.stringify(initialForm);

  const handleSave = async () => {
    try {
      await onSave();
      toast.success("Workspace settings saved.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Workspace settings could not be saved.";
      toast.error(message);
    }
  };

  return (
    <motion.div
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]"
    >
      <motion.section
        variants={cardReveal}
        className="relative overflow-hidden rounded-xl bg-[#1a1f2d] p-8"
      >
        <motion.div
          variants={pulseGlow}
          initial="initial"
          animate="animate"
          className="absolute -right-16 -top-16 size-32 rounded-full bg-[#4fdbc8]/5 blur-3xl"
        />

        <motion.div variants={staggerContainer} className="relative space-y-8">
          <motion.div
            variants={sectionReveal}
            className="flex items-center justify-between gap-4"
          >
            <div>
              <h2 className="font-heading text-xl font-bold text-[#dee2f5]">
                Workspace Details
              </h2>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Core information for the active SiteOrbit workspace.
              </p>
            </div>
            <motion.div whileHover={{ rotate: -10, scale: 1.08 }}>
              <Info className="size-7 text-[#4fdbc8]/40" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.div variants={sectionReveal}>
              <Field>
                <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                  Workspace Name
                </FieldLabel>
                <FieldContent>
                  <Input
                    value={form.name}
                    disabled={!canManageSettings}
                    onChange={(event) =>
                      onChange({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    className="h-12 rounded-lg bg-[#090e1b] text-[#dee2f5]"
                  />
                </FieldContent>
              </Field>
            </motion.div>

            <motion.div variants={sectionReveal}>
              <Field>
                <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                  Primary Domain
                </FieldLabel>
                <FieldContent>
                  <Input
                    value={form.primary_domain}
                    disabled={!canManageSettings}
                    onChange={(event) =>
                      onChange({
                        ...form,
                        primary_domain: event.target.value,
                      })
                    }
                    className="h-12 rounded-lg bg-[#090e1b] text-[#dee2f5]"
                  />
                </FieldContent>
              </Field>
            </motion.div>

            <motion.div variants={sectionReveal} className="md:col-span-2">
              <Field className="md:col-span-2">
                <FieldLabel className="ml-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bbcac6]">
                  Description
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    rows={4}
                    value={form.description}
                    disabled={!canManageSettings}
                    onChange={(event) =>
                      onChange({
                        ...form,
                        description: event.target.value,
                      })
                    }
                    className="rounded-lg bg-[#090e1b] text-[#dee2f5]"
                  />
                </FieldContent>
              </Field>
            </motion.div>
          </motion.div>

          <motion.div
            variants={sectionReveal}
            className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                disabled={!canManageSettings || !hasUnsavedChanges}
                onClick={onReset}
              >
                Reset
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
            >
              <Button
                type="button"
                className="h-11 rounded-md bg-[#4fdbc8] px-5 text-[#03241f] hover:bg-[#46cfbd]"
                disabled={!canManageSettings || !hasUnsavedChanges || isSaving}
                onClick={() => void handleSave()}
              >
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : null}
                Save Workspace
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.aside
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.section
          variants={cardReveal}
          className="rounded-xl bg-[#1a1f2d] p-7"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-[#dee2f5]">
                Access & Permissions
              </h3>
              <p className="mt-1 text-sm text-[#bbcac6]">
                Permission-aware controls for this workspace.
              </p>
            </div>
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }}>
              <Shield className="size-6 text-[#4fdbc8]/45" />
            </motion.div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-[#bbcac6]">
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center justify-between rounded-lg bg-[#090e1b] px-4 py-3"
            >
              <span>Your role</span>
              <Badge
                variant="outline"
                className="border-white/10 capitalize text-[#dee2f5]"
              >
                {currentRole ?? "viewer"}
              </Badge>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center justify-between rounded-lg bg-[#090e1b] px-4 py-3"
            >
              <span>Can manage settings</span>
              <Badge
                variant="outline"
                className={
                  canManageSettings
                    ? "border-[#4fdbc8]/30 text-[#4fdbc8]"
                    : "border-[#f7c97a]/30 text-[#f7c97a]"
                }
              >
                {canManageSettings ? "Yes" : "Read only"}
              </Badge>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          variants={cardReveal}
          className="rounded-xl bg-[#1a1f2d] p-7"
        >
          <h3 className="font-heading text-lg font-semibold text-[#dee2f5]">
            Workspace Guidance
          </h3>
          <FieldDescription className="mt-3 text-[#bbcac6]">
            Update core workspace details here. Branding, domains, and API
            configuration are separated into their own tabs to keep this screen
            easy to scan.
          </FieldDescription>
        </motion.section>
      </motion.aside>
    </motion.div>
  );
}
</file>

<file path="components/ui/.gitkeep">

</file>

<file path="components/ui/alert-dialog.tsx">
"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
</file>

<file path="components/ui/alert.tsx">
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-heading font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
</file>

<file path="components/ui/avatar.tsx">
"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
</file>

<file path="components/ui/badge.tsx">
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
</file>

<file path="components/ui/breadcrumb.tsx">
import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
</file>

<file path="components/ui/button.tsx">
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
</file>

<file path="components/ui/card.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
</file>

<file path="components/ui/chart.tsx">
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import type { TooltipValueType } from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

const INITIAL_DIMENSION = { width: 320, height: 200 } as const
type TooltipNameType = number | string

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
  initialDimension?: {
    width: number
    height: number
  }
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={initialDimension}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  } & Omit<
    RechartsPrimitive.DefaultTooltipContentProps<
      TooltipValueType,
      TooltipNameType
    >,
    "accessibilityLayer"
  >) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color ?? item.payload?.fill ?? item.color

            return (
              <div
                key={index}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="font-mono font-medium text-foreground tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  hideIcon?: boolean
  nameKey?: string
} & RechartsPrimitive.DefaultLegendContentProps) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item, index) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
    </div>
  )
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config ? config[configLabelKey] : config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
</file>

<file path="components/ui/checkbox.tsx">
"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
</file>

<file path="components/ui/command.tsx">
"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { SearchIcon, CheckIcon } from "lucide-react"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
</file>

<file path="components/ui/dialog.tsx">
"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
            >
              <XIcon
              />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
</file>

<file path="components/ui/dropdown-menu.tsx">
"use client"

import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn("z-50 min-w-[96px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
</file>

<file path="components/ui/empty.tsx">
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "font-heading text-sm font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
</file>

<file path="components/ui/field.tsx">
"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive:
          "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-0.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
        "last:mt-0 nth-last-2:-mt-1",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
</file>

<file path="components/ui/input-group.tsx">
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
</file>

<file path="components/ui/input.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
</file>

<file path="components/ui/label.tsx">
"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
</file>

<file path="components/ui/pagination.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
    >
      <a
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  )
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
</file>

<file path="components/ui/popover.tsx">
"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-heading font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
</file>

<file path="components/ui/progress.tsx">
"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
</file>

<file path="components/ui/radio-group.tsx">
"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
</file>

<file path="components/ui/resizable.tsx">
"use client"

import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" />
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
</file>

<file path="components/ui/scroll-area.tsx">
"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
</file>

<file path="components/ui/select.tsx">
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        className={cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", position ==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
            position === "popper" && ""
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
</file>

<file path="components/ui/separator.tsx">
"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
</file>

<file path="components/ui/sheet.tsx">
"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close data-slot="sheet-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-3 right-3"
              size="icon-sm"
            >
              <XIcon
              />
              <span className="sr-only">Close</span>
            </Button>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
</file>

<file path="components/ui/sidebar.tsx">
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PanelLeftIcon } from "lucide-react"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex ltr:-translate-x-1/2 rtl:-translate-x-1/2",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("h-8 w-full bg-background shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-0", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-active/menu-button:text-sidebar-accent-foreground aria-expanded:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden group-data-[collapsible=icon]:hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
</file>

<file path="components/ui/skeleton.tsx">
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
</file>

<file path="components/ui/sonner.tsx">
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4" />
        ),
        error: (
          <OctagonXIcon className="size-4" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
</file>

<file path="components/ui/spinner.tsx">
import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
</file>

<file path="components/ui/switch.tsx">
"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
</file>

<file path="components/ui/table.tsx">
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
</file>

<file path="components/ui/tabs.tsx">
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
</file>

<file path="components/ui/textarea.tsx">
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
</file>

<file path="components/ui/tooltip.tsx">
"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
</file>

<file path="docs/ARCHITECTURE.md">
# SiteOrbit Frontend Architecture

Frontend-first Next.js app for marketing, auth, dashboard, builder, analytics, team, domains, and settings.
</file>

<file path="docs/ROUTES.md">
# SiteOrbit Routes

/
 /sign-in
 /sign-up
 /forgot-password
 /accept-invite
 /dashboard
 /projects
 /builder
 /analytics
 /team
 /templates
 /domains
 /settings
</file>

<file path="eslint.config.mjs">
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
</file>

<file path="hooks/use-analytics.ts">
"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import type {
  AnalyticsOverviewResponse,
  AnalyticsRange,
} from "@/types/analytics";

export function useAnalytics(projectId: string | null) {
  const { accessToken, isAuthenticated } = useAuthStore();
  const [range, setRange] = useState<AnalyticsRange>("30d");

  const analyticsQuery = useQuery({
    queryKey: ["analytics", "overview", projectId, range, accessToken],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        site_id: projectId as string,
        range,
      });

      return apiClient.get<AnalyticsOverviewResponse>(
        `${apiEndpoints.analytics.overview}?${searchParams.toString()}`,
        {
          token: accessToken,
        }
      );
    },
    enabled: Boolean(projectId && accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const data = useMemo(
    () =>
      analyticsQuery.data ?? {
        metrics: [],
        traffic: [],
        sources: [],
        top_pages: [],
      },
    [analyticsQuery.data]
  );

  return {
    range,
    setRange,
    analyticsQuery,
    data,
  };
}
</file>

<file path="hooks/use-dashboard.ts">
"use client";

import { useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type { DashboardOverviewResponse } from "@/types/dashboard";

export function useDashboard() {
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId } = useWorkspace();

  const dashboardQuery = useQuery({
    queryKey: ["dashboard", "overview", activeWorkspaceId, accessToken],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        workspace_id: activeWorkspaceId as string,
      });

      return apiClient.get<DashboardOverviewResponse>(
        `${apiEndpoints.dashboard.overview}?${searchParams.toString()}`,
        {
          token: accessToken,
        }
      );
    },
    enabled: Boolean(accessToken && isAuthenticated && activeWorkspaceId),
    staleTime: 60_000,
    retry: false,
  });

  return {
    dashboardQuery,
    activeWorkspace,
    activeWorkspaceId,
  };
}
</file>

<file path="hooks/use-domains.ts">
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type { CreateDomainInput, Domain } from "@/types/domain";

export function useDomains() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId, currentRole } = useWorkspace();

  const domainsQuery = useQuery({
    queryKey: ["domains", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<Domain[]>(
        apiEndpoints.workspaces.domains(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const createDomainMutation = useMutation({
    mutationFn: (payload: CreateDomainInput) =>
      apiClient.post<Domain>(
        apiEndpoints.workspaces.domains(activeWorkspaceId as string),
        payload,
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["domains", activeWorkspaceId],
      });
    },
  });

  const canManageDomains = currentRole === "owner" || currentRole === "admin";

  return {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageDomains,
    domainsQuery,
    createDomainMutation,
  };
}
</file>

<file path="hooks/use-mobile.ts">
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
</file>

<file path="hooks/use-projects.ts">
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type {
  CreateProjectInput,
  Project,
  ProjectListResponse,
  ProjectPublishResponse,
  ProjectStatus,
  UpdateProjectInput,
} from "@/types/project";

export function useProjects() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId, currentRole } = useWorkspace();

  const projectsQuery = useQuery({
    queryKey: ["projects", "list", activeWorkspaceId, accessToken],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        workspace_id: activeWorkspaceId as string,
      });

      const response = await apiClient.get<ProjectListResponse>(
        `${apiEndpoints.projects.list}?${searchParams.toString()}`,
        {
          token: accessToken,
        }
      );

      return response.items;
    },
    enabled: Boolean(accessToken && isAuthenticated && activeWorkspaceId),
    staleTime: 60_000,
    retry: false,
  });

  const createProjectMutation = useMutation({
    mutationFn: (payload: CreateProjectInput) =>
      apiClient.post<Project>(apiEndpoints.projects.create, payload, {
        token: accessToken,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: UpdateProjectInput;
    }) =>
      apiClient.patch<Project>(apiEndpoints.projects.byId(projectId), payload, {
        token: accessToken,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const publishProjectMutation = useMutation({
    mutationFn: (projectId: string) =>
      apiClient.post<ProjectPublishResponse>(
        apiEndpoints.projects.publish(projectId),
        undefined,
        {
          token: accessToken,
        }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const unpublishProjectMutation = useMutation({
    mutationFn: (projectId: string) =>
      apiClient.post<ProjectPublishResponse>(
        apiEndpoints.projects.unpublish(projectId),
        undefined,
        {
          token: accessToken,
        }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (projectId: string) =>
      apiClient.delete<void>(apiEndpoints.projects.byId(projectId), {
        token: accessToken,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects", "list", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "overview", activeWorkspaceId],
      });
    },
  });

  const canManageProjects =
    currentRole === "owner" || currentRole === "admin" || currentRole === "editor";

  return {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageProjects,
    projectsQuery,
    createProjectMutation,
    updateProjectMutation,
    publishProjectMutation,
    unpublishProjectMutation,
    deleteProjectMutation,
  };
}

export function normalizeProjectStatus(status: string): ProjectStatus {
  const lowered = status.toLowerCase();

  if (lowered === "published") return "published";
  if (lowered === "archived") return "archived";
  return "draft";
}
</file>

<file path="hooks/use-settings.ts">
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type { Theme, ThemeUpdateInput } from "@/types/theme";
import type { Workspace, WorkspaceUpdateInput } from "@/types/workspace";

export function useSettings() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId, currentRole } = useWorkspace();

  const workspaceQuery = useQuery({
    queryKey: ["settings", "workspace", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<Workspace>(
        apiEndpoints.workspaces.byId(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const themeQuery = useQuery({
    queryKey: ["settings", "theme", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<Theme>(
        apiEndpoints.workspaces.theme(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const updateWorkspaceMutation = useMutation({
    mutationFn: (payload: WorkspaceUpdateInput) =>
      apiClient.patch<Workspace>(
        apiEndpoints.workspaces.byId(activeWorkspaceId as string),
        payload,
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["settings", "workspace", activeWorkspaceId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });

  const updateThemeMutation = useMutation({
    mutationFn: (payload: ThemeUpdateInput) =>
      apiClient.patch<Theme>(
        apiEndpoints.workspaces.theme(activeWorkspaceId as string),
        payload,
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["settings", "theme", activeWorkspaceId],
      });
    },
  });

  const canManageSettings = currentRole === "owner" || currentRole === "admin";

  return {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageSettings,
    workspaceQuery,
    themeQuery,
    updateWorkspaceMutation,
    updateThemeMutation,
  };
}
</file>

<file path="hooks/use-team.ts">
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type { WorkspaceMember, WorkspaceRole } from "@/types/workspace";
import type { CreateInvitationInput, Invitation } from "@/types/invitation";

export function useTeam() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { activeWorkspace, activeWorkspaceId, currentRole } = useWorkspace();

  const membersQuery = useQuery({
    queryKey: ["team", "members", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<WorkspaceMember[]>(
        apiEndpoints.workspaces.members(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const invitationsQuery = useQuery({
    queryKey: ["team", "invitations", activeWorkspaceId, accessToken],
    queryFn: () =>
      apiClient.get<Invitation[]>(
        apiEndpoints.workspaces.invitations(activeWorkspaceId as string),
        { token: accessToken }
      ),
    enabled: Boolean(activeWorkspaceId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const inviteMemberMutation = useMutation({
    mutationFn: (payload: CreateInvitationInput) =>
      apiClient.post<Invitation>(
        apiEndpoints.workspaces.invitations(activeWorkspaceId as string),
        payload,
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["team", "invitations", activeWorkspaceId],
      });
    },
  });

  const updateMemberRoleMutation = useMutation({
    mutationFn: ({
      memberId,
      role,
    }: {
      memberId: string;
      role: WorkspaceRole;
    }) =>
      apiClient.patch<WorkspaceMember>(
        `${apiEndpoints.workspaces.members(activeWorkspaceId as string)}/${memberId}`,
        { role },
        { token: accessToken }
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["team", "members", activeWorkspaceId],
      });
    },
  });

  const canManageTeam = currentRole === "owner" || currentRole === "admin";

  return {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageTeam,
    membersQuery,
    invitationsQuery,
    inviteMemberMutation,
    updateMemberRoleMutation,
  };
}
</file>

<file path="hooks/use-unsaved-changes-warning.ts">
"use client";

import { useEffect } from "react";

type UseUnsavedChangesWarningOptions = {
  when: boolean;
  message?: string;
};

export function useUnsavedChangesWarning({
  when,
  message = "You have unsaved changes. Are you sure you want to leave this page?",
}: UseUnsavedChangesWarningOptions) {
  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [message, when]);
}
</file>

<file path="lib/motion.ts">
import type { Easing, Transition, Variants } from "framer-motion";

export const easeBezier: Easing = [0.22, 1, 0.36, 1];

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 0.8,
};

export const easeSoft: Transition = {
  duration: 0.6,
  ease: easeBezier,
};

export const pageReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easeBezier,
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSmooth,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    rotateX: 8,
    transformPerspective: 1200,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 1200,
    transition: {
      type: "spring",
      stiffness: 170,
      damping: 20,
      mass: 0.95,
    },
  },
};

export const floatingOrb: Variants = {
  initial: {
    y: 0,
    x: 0,
    scale: 1,
  },
  animate: {
    y: [-10, 12, -8],
    x: [0, 10, -6],
    scale: [1, 1.05, 0.98],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export const pulseGlow: Variants = {
  initial: {
    opacity: 0.35,
    scale: 0.96,
  },
  animate: {
    opacity: [0.35, 0.6, 0.4],
    scale: [0.96, 1.03, 0.99],
    transition: {
      duration: 4.8,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export const panelSlideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: easeBezier,
    },
  },
};

export const panelSlideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: easeBezier,
    },
  },
};

export const panelSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: easeBezier,
    },
  },
};

export const subtlePulse: Variants = {
  initial: {
    opacity: 0.82,
    scale: 1,
  },
  animate: {
    opacity: [0.82, 1, 0.88],
    scale: [1, 1.015, 1],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
</file>

<file path="lib/utils.ts">
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
</file>

<file path="lib/utils/cn.ts">
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
</file>

<file path="next.config.ts">
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
</file>

<file path="postcss.config.mjs">
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
</file>

<file path="proxy.ts">
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/projects",
  "/builder",
  "/analytics",
  "/team",
  "/templates",
  "/domains",
  "/settings",
];

const publicAuthRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/accept-invite",
];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasToken = Boolean(
    request.cookies.get("siteorbit_access_token")?.value
  );

  if (matchesRoute(pathname, protectedRoutes) && !hasToken) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }

  if (matchesRoute(pathname, publicAuthRoutes) && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/builder/:path*",
    "/analytics/:path*",
    "/team/:path*",
    "/templates/:path*",
    "/domains/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/accept-invite",
  ],
};
</file>

<file path="scripts/setup.sh">
#!/usr/bin/env bash
echo "Install frontend dependencies, then run npm run dev"
</file>

<file path="tests/e2e/.gitkeep">

</file>

<file path="tests/integration/.gitkeep">

</file>

<file path="tests/unit/.gitkeep">

</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
</file>

<file path="types/dashboard.ts">
export type DashboardStat = {
  label: string;
  value: string;
  helper: string;
  tone: string;
};

export type DashboardProjectItem = {
  id: string;
  name: string;
  status: string;
  metric: string;
};

export type DashboardMemberItem = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export type DashboardOverviewResponse = {
  stats: DashboardStat[];
  activity: string[];
  projects: DashboardProjectItem[];
  members: DashboardMemberItem[];
};
</file>

<file path="types/domain.ts">
export type DomainType = "primary" | "campaign" | "client" | "custom";

export type Domain = {
  id: string;
  workspace_id: string;
  host: string;
  status: string;
  type: DomainType | string;
  ssl_status: string;
  created_at: string;
};

export type CreateDomainInput = {
  host: string;
  type: DomainType;
};
</file>

<file path="types/invitation.ts">
export type InvitationRole = "owner" | "admin" | "editor" | "viewer";

export type Invitation = {
  id: string;
  workspace_id: string;
  email: string;
  role: InvitationRole | string;
  status: string;
  token: string;
  created_at: string;
};

export type CreateInvitationInput = {
  email: string;
  role: InvitationRole;
};
</file>

<file path="types/theme.ts">
export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
};

export type ThemeTypography = {
  heading_font: string;
  body_font: string;
  base_size: string;
};

export type ThemeSpacing = {
  section_gap: string;
  container_width: string;
};

export type ThemeRadius = {
  card: string;
  button: string;
  input: string;
};

export type Theme = {
  id: string;
  workspace_id: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  created_at: string;
  updated_at: string;
};

export type ThemeUpdateInput = {
  colors?: ThemeColors;
  typography?: ThemeTypography;
  spacing?: ThemeSpacing;
  radius?: ThemeRadius;
};
</file>

<file path="app/(app)/analytics/page.tsx">
"use client";

import { useSearchParams } from "next/navigation";
import { BarChart3 } from "lucide-react";

import AnalyticsPageClient from "@/components/analytics/analytics-page-client";
import { useAnalytics } from "@/hooks/use-analytics";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { range, setRange, analyticsQuery, data } = useAnalytics(projectId);

  if (!projectId) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-xl rounded-2xl border border-dashed border-white/10 bg-[#111522] px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-[#dee2f5]">Pick a project first</h2>
          <p className="mt-3 text-sm leading-7 text-[#9aa6c0]">
            Open analytics from a project so SiteOrbit can load the correct metrics.
          </p>
        </div>
      </div>
    );
  }

  if (analyticsQuery.isPending) {
    return (
      <div className="space-y-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Analytics overview
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Measure your orbit.
            </h1>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[154px] animate-pulse rounded-xl bg-[#1a1f2d]" />
          ))}
        </section>
      </div>
    );
  }

  if (analyticsQuery.isError) {
    return (
      <div className="rounded-xl border border-white/8 bg-[#1a1f2d] px-6 py-8">
        <p className="text-lg font-semibold text-[#dee2f5]">
          Analytics could not be loaded
        </p>
        <p className="mt-2 text-sm leading-6 text-[#bbcac6]">
          {analyticsQuery.error instanceof Error
            ? analyticsQuery.error.message
            : "Something went wrong while loading analytics."}
        </p>
        <Button
          type="button"
          onClick={() => void analyticsQuery.refetch()}
          className="mt-5 h-11 rounded-md px-5"
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
            Analytics overview
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            Measure your orbit.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Read the most important traffic signals first, then inspect page performance.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-[#111522] p-1">
          {(["7d", "30d", "90d"] as const).map((value) => (
            <Button
              key={value}
              type="button"
              variant={range === value ? "default" : "ghost"}
              className="h-10 rounded-md"
              onClick={() => setRange(value)}
            >
              <BarChart3 data-icon="inline-start" />
              {value}
            </Button>
          ))}
        </div>
      </section>

      <AnalyticsPageClient data={data} />
    </div>
  );
}
</file>

<file path="app/(app)/builder/page.tsx">
import BuilderPageClient from "@/components/builder/builder-page-client";
import { Button } from "@/components/ui/button";

export default function BuilderPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
            Visual builder
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            Compose your digital canvas.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Arrange page sections, refine copy, preview layouts, and move from draft to publish with a focused studio workflow.
          </p>
        </div>

        <Button
          variant="outline"
          className="h-12 rounded-md border-white/8 bg-transparent px-5 text-[#dee2f5]"
        >
          Builder Guide
        </Button>
      </section>

      <BuilderPageClient />
    </div>
  );
}
</file>

<file path="app/(app)/dashboard/page.tsx">
"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  FolderKanban,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";

import { useDashboard } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function getToneClass(tone: string) {
  switch (tone) {
    case "blue":
      return "text-[#89ceff]";
    case "teal":
    default:
      return "text-[#4fdbc8]";
  }
}

function getStatusClasses(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "published" || normalized === "live") {
    return "bg-[#12251f] text-[#4fdbc8]";
  }

  if (normalized === "archived") {
    return "bg-[#2a2430] text-[#d7b4ff]";
  }

  return "bg-[#2a2418] text-[#ffcf7d]";
}

export default function DashboardPage() {
  const { dashboardQuery, activeWorkspace } = useDashboard();

  const workspaceName = activeWorkspace?.workspace.name ?? "your workspace";

  if (dashboardQuery.isPending) {
    return (
      <div className="space-y-8">
        <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Workspace overview
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Control your digital orbit.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              Syncing your workspace dashboard and recent activity.
            </p>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-[154px] animate-pulse rounded-xl bg-[#1a1f2d]"
            />
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="h-[320px] animate-pulse rounded-xl bg-[#1a1f2d]" />
          <div className="h-[320px] animate-pulse rounded-xl bg-[#1a1f2d]" />
        </section>
      </div>
    );
  }

  if (dashboardQuery.isError) {
    const message =
      dashboardQuery.error instanceof Error
        ? dashboardQuery.error.message
        : "Dashboard data could not be loaded.";

    return (
      <div className="space-y-8">
        <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Workspace overview
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Control your digital orbit.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              We could not load the latest dashboard data for {workspaceName}.
            </p>
          </div>
        </section>

        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#dee2f5]">
              Dashboard unavailable
            </CardTitle>
            <CardDescription className="text-[#bbcac6]">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              onClick={() => void dashboardQuery.refetch()}
              className="h-11 rounded-md px-5"
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const data = dashboardQuery.data;
  const isEmpty =
    data.projects.length === 0 &&
    data.members.length === 0 &&
    data.activity.length === 1 &&
    data.activity[0] === "Create your first project to start building momentum.";

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
            Workspace overview
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            Control your digital orbit.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Monitor high-value projects, track live performance, and keep your
            team aligned inside {workspaceName}.
          </p>
        </div>

        <Button asChild className="h-12 rounded-md px-5">
          <Link href="/projects">
            <Plus data-icon="inline-start" />
            New Project
          </Link>
        </Button>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {data.stats.map((card) => (
          <Card
            key={card.label}
            className="rounded-xl border-none bg-[#1a1f2d] p-2"
          >
            <CardHeader className="pb-2">
              <p className="text-xs uppercase tracking-[0.18em] text-[#859490]">
                {card.label}
              </p>
              <CardTitle className="text-4xl font-extrabold tracking-tight text-[#dee2f5]">
                {card.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`inline-flex items-center gap-2 text-sm ${getToneClass(card.tone)}`}
              >
                <TrendingUp className="size-4" />
                <span>{card.helper}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {isEmpty ? (
        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#dee2f5]">
              No projects yet
            </CardTitle>
            <CardDescription className="text-[#bbcac6]">
              Create your first site project to start tracking activity,
              collaborators, and publishing progress in this workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="h-11 rounded-md px-5">
              <Link href="/projects">
                <Plus data-icon="inline-start" />
                Create your first project
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-[#4fdbc8]" />
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Recent activity
              </CardTitle>
            </div>
            <CardDescription className="text-[#bbcac6]">
              The latest workspace signals and follow-up prompts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.activity.map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-start gap-3 rounded-xl bg-[#111522] p-4"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#4fdbc8]" />
                <p className="text-sm leading-6 text-[#dee2f5]">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FolderKanban className="size-5 text-[#89ceff]" />
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Recent projects
              </CardTitle>
            </div>
            <CardDescription className="text-[#bbcac6]">
              The newest project surfaces in this workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.projects.length ? (
              data.projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl bg-[#111522] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[#dee2f5]">
                        {project.name}
                      </p>
                      <p className="mt-1 text-sm text-[#9aa6c0]">
                        {project.metric}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(project.status)}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                No recent projects yet.
              </div>
            )}

            <Button asChild variant="outline" className="h-11 w-full rounded-md border-white/8 bg-transparent text-[#dee2f5]">
              <Link href="/projects">
                View all projects
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="size-5 text-[#4fdbc8]" />
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Team snapshot
              </CardTitle>
            </div>
            <CardDescription className="text-[#bbcac6]">
              Active members inside this workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.members.length ? (
              <div className="overflow-hidden rounded-xl border border-white/8">
                <div className="grid grid-cols-[1.25fr_1.2fr_0.7fr_0.7fr] gap-4 bg-[#111522] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#859490]">
                  <span>Member</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Status</span>
                </div>

                {data.members.map((member) => (
                  <div
                    key={member.id}
                    className="grid grid-cols-[1.25fr_1.2fr_0.7fr_0.7fr] gap-4 border-t border-white/8 bg-[#151a27] px-4 py-4 text-sm text-[#dee2f5]"
                  >
                    <span className="font-medium">{member.name}</span>
                    <span className="text-[#bbcac6]">{member.email}</span>
                    <span className="capitalize">{member.role}</span>
                    <span className="capitalize text-[#4fdbc8]">
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                No team members are visible yet in this workspace.
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
</file>

<file path="app/(app)/domains/page.tsx">
"use client";

import { useMemo, useState } from "react";
import { Globe, Plus, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import { useDomains } from "@/hooks/use-domains";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription as DialogText,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DomainType } from "@/types/domain";

const domainTypes: DomainType[] = ["primary", "campaign", "client", "custom"];

export default function DomainsPage() {
  const {
    activeWorkspace,
    currentRole,
    canManageDomains,
    domainsQuery,
    createDomainMutation,
  } = useDomains();

  const [open, setOpen] = useState(false);
  const [host, setHost] = useState("");
  const [type, setType] = useState<DomainType>("custom");
  const [error, setError] = useState<string | null>(null);

  const domains = domainsQuery.data ?? [];
  const sortedDomains = useMemo(
    () => [...domains].sort((a, b) => a.host.localeCompare(b.host)),
    [domains]
  );

  const handleCreateDomain = async () => {
    const normalizedHost = host.trim().toLowerCase();

    if (!normalizedHost || normalizedHost.length < 3) {
      setError("Enter a valid domain host.");
      return;
    }

    try {
      setError(null);
      await createDomainMutation.mutateAsync({
        host: normalizedHost,
        type,
      });
      setHost("");
      setType("custom");
      setOpen(false);
      toast.success("Domain added successfully.");
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Domain could not be created."
      );
    }
  };

  const workspaceName = activeWorkspace?.workspace.name ?? "this workspace";

  return (
    <>
      <div className="space-y-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Domain management
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Control where your pages go live.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              Review domain status, SSL readiness, and add new domain records for {workspaceName}.
            </p>
          </div>

          <Button
            type="button"
            className="h-12 rounded-md px-5"
            disabled={!canManageDomains}
            onClick={() => setOpen(true)}
          >
            <Plus data-icon="inline-start" />
            Add Domain
          </Button>
        </section>

        {!canManageDomains ? (
          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#1a1f2d] px-4 py-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[#ffcf7d]" />
            <div>
              <p className="font-medium text-[#dee2f5]">Read-only domains</p>
              <p className="mt-1 text-sm leading-6 text-[#bbcac6]">
                Your current role is <span className="capitalize">{currentRole ?? "viewer"}</span>.
                Only owners and admins can add or manage domains.
              </p>
            </div>
          </div>
        ) : null}

        <Card className="rounded-xl border-none bg-[#1a1f2d]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="size-5 text-[#4fdbc8]" />
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Workspace domains
              </CardTitle>
            </div>
            <CardDescription className="text-[#bbcac6]">
              Domains stay visible as part of workspace settings, while true DNS verification remains outside MVP. 
            </CardDescription>
          </CardHeader>
          <CardContent>
            {domainsQuery.isPending ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-16 animate-pulse rounded-xl bg-[#111522]" />
                ))}
              </div>
            ) : domainsQuery.isError ? (
              <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                {domainsQuery.error instanceof Error
                  ? domainsQuery.error.message
                  : "Domains could not be loaded."}
              </div>
            ) : sortedDomains.length ? (
              <div className="overflow-hidden rounded-xl border border-white/8">
                <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] gap-4 bg-[#111522] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#859490]">
                  <span>Host</span>
                  <span>Type</span>
                  <span>Status</span>
                  <span>SSL</span>
                </div>

                {sortedDomains.map((domain) => (
                  <div
                    key={domain.id}
                    className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr] gap-4 border-t border-white/8 bg-[#151a27] px-4 py-4 text-sm text-[#dee2f5]"
                  >
                    <span className="font-medium">{domain.host}</span>
                    <span className="capitalize">{domain.type}</span>
                    <span className="capitalize text-[#4fdbc8]">{domain.status}</span>
                    <span className="capitalize text-[#89ceff]">{domain.ssl_status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                No domains added yet. Add one to prepare publishing confidence flows.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-white/8 bg-[#121826] text-[#dee2f5] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a domain</DialogTitle>
            <DialogText className="text-[#9aa6c0]">
              Create a new domain record for this workspace.
            </DialogText>
          </DialogHeader>

          <div className="space-y-5">
            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Host
              </FieldLabel>
              <FieldContent>
                <Input
                  value={host}
                  onChange={(event) => setHost(event.target.value)}
                  placeholder="launch.example.com"
                  className="h-12 rounded-xl border-white/8 bg-[#161b29] text-[#dee2f5] placeholder:text-white/20"
                />
                <FieldError errors={error ? [{ message: error }] : []} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Domain type
              </FieldLabel>
              <FieldContent>
                <Select
                  value={type}
                  onValueChange={(value) => setType(value as DomainType)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-white/8 bg-[#161b29] text-[#dee2f5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {domainTypes.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <div className="flex justify-end">
              <Button
                type="button"
                disabled={createDomainMutation.isPending}
                onClick={() => void handleCreateDomain()}
              >
                Add domain
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
</file>

<file path="app/(app)/layout.tsx">
import type { ReactNode } from "react";

import AppShell  from "@/components/layout/app-shell";
import AuthBootstrapProvider from "@/components/providers/auth-bootstrap-provider";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthBootstrapProvider>
      <AppShell>{children}</AppShell>
    </AuthBootstrapProvider>
  );
}
</file>

<file path="app/(app)/projects/page.tsx">
"use client";

import { useMemo, useState } from "react";
import {
  FolderOpen,
  Loader2,
  Plus,
  Search,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

import ProjectGrid from "@/components/projects/project-grid";
import { useProjects, normalizeProjectStatus } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FilterValue = "all" | "draft" | "published" | "archived";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);

  const {
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    canManageProjects,
    projectsQuery,
    createProjectMutation,
    publishProjectMutation,
    unpublishProjectMutation,
    deleteProjectMutation,
  } = useProjects();

  const filteredProjects = useMemo(() => {
    const items = projectsQuery.data ?? [];

    return items.filter((project) => {
      const status = normalizeProjectStatus(project.status);
      const matchesFilter = filter === "all" ? true : status === filter;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0
          ? true
          : project.name.toLowerCase().includes(query) ||
            (project.description ?? "").toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [filter, projectsQuery.data, search]);

  const handleCreateProject = async () => {
    const name = projectName.trim();
    const description = projectDescription.trim();

    if (!activeWorkspaceId) {
      setCreateError("No active workspace is available yet.");
      return;
    }

    if (name.length < 2) {
      setCreateError("Project name must be at least 2 characters.");
      return;
    }

    try {
      setCreateError(null);

      await createProjectMutation.mutateAsync({
        workspace_id: activeWorkspaceId,
        name,
        description: description || null,
        status: "draft",
      });

      setProjectName("");
      setProjectDescription("");
      setCreateDialogOpen(false);

      toast.success("Project created successfully.");
    } catch (error) {
      setCreateError(
        error instanceof Error ? error.message : "Project could not be created."
      );
    }
  };

  const handlePublish = async (projectId: string) => {
    try {
      await publishProjectMutation.mutateAsync(projectId);
      toast.success("Project published successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Project could not be published."
      );
    }
  };

  const handleUnpublish = async (projectId: string) => {
    try {
      await unpublishProjectMutation.mutateAsync(projectId);
      toast.success("Project moved back to draft.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Project could not be unpublished."
      );
    }
  };

  const handleDelete = async (projectId: string) => {
    const confirmed = window.confirm(
      "Delete this project? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteProjectMutation.mutateAsync(projectId);
      toast.success("Project deleted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Project could not be deleted."
      );
    }
  };

  const workspaceName = activeWorkspace?.workspace.name ?? "your workspace";

  return (
    <>
      <div className="space-y-8">
        <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Project library
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Your project orbit.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              Create, organize, and revisit every campaign, landing page, or client
              deployment inside {workspaceName}.
            </p>
          </div>

          <Button
            type="button"
            className="h-12 rounded-md px-5"
            disabled={!canManageProjects}
            onClick={() => setCreateDialogOpen(true)}
          >
            <Plus data-icon="inline-start" />
            New Project
          </Button>
        </section>

        {!canManageProjects ? (
          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#1a1f2d] px-4 py-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[#ffcf7d]" />
            <div>
              <p className="font-medium text-[#dee2f5]">Read-only access</p>
              <p className="mt-1 text-sm leading-6 text-[#bbcac6]">
                Your current role is <span className="capitalize">{currentRole ?? "viewer"}</span>.
                You can view project records, but only owners, admins, and editors can create,
                publish, or delete them.
              </p>
            </div>
          </div>
        ) : null}

        <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="w-full xl:max-w-xl">
            <InputGroup className="h-12 rounded-xl border-white/8 bg-[#161b29]">
              <InputGroupAddon>
                <Search className="size-4 text-[#9aa6c0]" />
              </InputGroupAddon>
              <InputGroupInput
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by project name or description"
                className="text-[#dee2f5] placeholder:text-[#7f8aa3]"
              />
            </InputGroup>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-[#161b29] px-3 py-2 text-xs uppercase tracking-[0.14em] text-[#9aa6c0] sm:inline-flex">
              <SlidersHorizontal className="size-3.5" />
              Filters
            </div>

            <Tabs
              value={filter}
              onValueChange={(value) => setFilter(value as FilterValue)}
              className="w-full xl:w-auto"
            >
              <TabsList className="grid h-12 grid-cols-4 rounded-xl bg-[#161b29] p-1">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        {projectsQuery.isPending ? (
          <section className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[270px] animate-pulse rounded-xl bg-[#1a1f2d]"
              />
            ))}
          </section>
        ) : null}

        {projectsQuery.isError ? (
          <section className="rounded-xl border border-white/8 bg-[#1a1f2d] px-6 py-8">
            <p className="text-lg font-semibold text-[#dee2f5]">
              Projects could not be loaded
            </p>
            <p className="mt-2 text-sm leading-6 text-[#bbcac6]">
              {projectsQuery.error instanceof Error
                ? projectsQuery.error.message
                : "Something went wrong while fetching this workspace project list."}
            </p>
            <Button
              type="button"
              onClick={() => void projectsQuery.refetch()}
              className="mt-5 h-11 rounded-md px-5"
            >
              Try again
            </Button>
          </section>
        ) : null}

        {!projectsQuery.isPending &&
        !projectsQuery.isError &&
        filteredProjects.length === 0 ? (
          <section className="rounded-xl border border-dashed border-white/10 bg-[#1a1f2d] px-6 py-12 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#111522] text-[#4fdbc8]">
              <FolderOpen className="size-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-[#dee2f5]">
              {search.trim().length > 0 || filter !== "all"
                ? "No matching projects"
                : "No projects yet"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#bbcac6]">
              {search.trim().length > 0 || filter !== "all"
                ? "Adjust your search or filters to find the project you want."
                : "Create your first project to start building pages, publish experiences, and track analytics inside this workspace."}
            </p>

            {canManageProjects && search.trim().length === 0 && filter === "all" ? (
              <Button
                type="button"
                onClick={() => setCreateDialogOpen(true)}
                className="mt-6 h-11 rounded-md px-5"
              >
                <Plus data-icon="inline-start" />
                Create your first project
              </Button>
            ) : null}
          </section>
        ) : null}

        {!projectsQuery.isPending &&
        !projectsQuery.isError &&
        filteredProjects.length > 0 ? (
          <ProjectGrid
            projects={filteredProjects}
            canManage={canManageProjects}
            onPublish={(projectId) => void handlePublish(projectId)}
            onUnpublish={(projectId) => void handleUnpublish(projectId)}
            onDelete={(projectId) => void handleDelete(projectId)}
            activePublishId={publishProjectMutation.isPending ? publishProjectMutation.variables ?? null : null}
            activeUnpublishId={
              unpublishProjectMutation.isPending
                ? unpublishProjectMutation.variables ?? null
                : null
            }
            activeDeleteId={
              deleteProjectMutation.isPending ? deleteProjectMutation.variables ?? null : null
            }
          />
        ) : null}
      </div>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="border-white/8 bg-[#121826] text-[#dee2f5] sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription className="text-[#9aa6c0]">
              Start a fresh site surface inside {workspaceName}. You can wire pages,
              builder content, publishing, and analytics next.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <Field>
              <FieldLabel
                htmlFor="project-name"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Project name
              </FieldLabel>
              <FieldContent>
                <InputGroup className="min-h-12 rounded-xl border-white/8 bg-[#161b29]">
                  <InputGroupInput
                    id="project-name"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    placeholder="Spring campaign launch"
                    className="text-[#dee2f5] placeholder:text-white/20"
                  />
                </InputGroup>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel
                htmlFor="project-description"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Description
              </FieldLabel>
              <FieldContent>
                <InputGroup className="min-h-[120px] rounded-xl border-white/8 bg-[#161b29]">
                  <InputGroupTextarea
                    id="project-description"
                    value={projectDescription}
                    onChange={(event) => setProjectDescription(event.target.value)}
                    placeholder="Briefly describe what this project is for."
                    className="min-h-[120px] text-[#dee2f5] placeholder:text-white/20"
                  />
                </InputGroup>
                <FieldError errors={createError ? [{ message: createError }] : []} />
              </FieldContent>
            </Field>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="h-11 rounded-md bg-[#4fdbc8] px-5 text-[#03241f] hover:bg-[#46cfbd]"
                disabled={createProjectMutation.isPending || !activeWorkspaceId}
                onClick={() => void handleCreateProject()}
              >
                {createProjectMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Plus data-icon="inline-start" />
                )}
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
</file>

<file path="app/(app)/settings/page.tsx">
"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import BrandingSettingsPanel, {
  type BrandingFormState,
} from "@/components/settings/branding-settings-panel";
import SettingsNav, { type SettingsTab } from "@/components/settings/settings-nav";
import SettingsPlaceholderPanel from "@/components/settings/settings-placeholder-panel";
import WorkspaceSettingsPanel, {
  type WorkspaceFormState,
} from "@/components/settings/workspace-settings-panel";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/hooks/use-settings";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";

function normalizeWorkspaceForm(input?: {
  name?: string | null;
  primary_domain?: string | null;
  description?: string | null;
} | null): WorkspaceFormState {
  return {
    name: input?.name ?? "",
    primary_domain: input?.primary_domain ?? "",
    description: input?.description ?? "",
  };
}

function normalizeBrandingForm(input?: {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
  };
  typography?: {
    heading_font?: string;
    body_font?: string;
    base_size?: string;
  };
  spacing?: {
    section_gap?: string;
    container_width?: string;
  };
  radius?: {
    card?: string;
    button?: string;
    input?: string;
  };
} | null): BrandingFormState {
  return {
    primary: input?.colors?.primary ?? "#4FDBC8",
    secondary: input?.colors?.secondary ?? "#89CEFF",
    accent: input?.colors?.accent ?? "#DEE2F5",
    background: input?.colors?.background ?? "#090E1B",
    surface: input?.colors?.surface ?? "#1A1F2D",
    heading_font: input?.typography?.heading_font ?? "Inter",
    body_font: input?.typography?.body_font ?? "Inter",
    base_size: input?.typography?.base_size ?? "16px",
    section_gap: input?.spacing?.section_gap ?? "80px",
    container_width: input?.spacing?.container_width ?? "1200px",
    card_radius: input?.radius?.card ?? "16px",
    button_radius: input?.radius?.button ?? "10px",
    input_radius: input?.radius?.input ?? "10px",
  };
}

function WorkspaceTabContent({
  initialForm,
  currentRole,
  canManageSettings,
  isSaving,
  onSave,
}: {
  initialForm: WorkspaceFormState;
  currentRole: string | null;
  canManageSettings: boolean;
  isSaving: boolean;
  onSave: (form: WorkspaceFormState) => Promise<void>;
}) {
  const [form, setForm] = useState<WorkspaceFormState>(initialForm);

  const hasUnsavedChanges = JSON.stringify(form) !== JSON.stringify(initialForm);

  useUnsavedChangesWarning({
    when: hasUnsavedChanges,
  });

  return (
    <WorkspaceSettingsPanel
      form={form}
      initialForm={initialForm}
      currentRole={currentRole}
      canManageSettings={canManageSettings}
      isSaving={isSaving}
      onChange={setForm}
      onReset={() => setForm(initialForm)}
      onSave={() => onSave(form)}
    />
  );
}

function BrandingTabContent({
  initialForm,
  canManageSettings,
  isSaving,
  onSave,
}: {
  initialForm: BrandingFormState;
  canManageSettings: boolean;
  isSaving: boolean;
  onSave: (form: BrandingFormState) => Promise<void>;
}) {
  const [form, setForm] = useState<BrandingFormState>(initialForm);

  const hasUnsavedChanges = JSON.stringify(form) !== JSON.stringify(initialForm);

  useUnsavedChangesWarning({
    when: hasUnsavedChanges,
  });

  return (
    <BrandingSettingsPanel
      form={form}
      initialForm={initialForm}
      canManageSettings={canManageSettings}
      isSaving={isSaving}
      onChange={setForm}
      onReset={() => setForm(initialForm)}
      onSave={() => onSave(form)}
    />
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("workspace");

  const {
    activeWorkspace,
    currentRole,
    canManageSettings,
    workspaceQuery,
    themeQuery,
    updateWorkspaceMutation,
    updateThemeMutation,
  } = useSettings();

  const workspaceData = workspaceQuery.data ?? null;
  const themeData = themeQuery.data ?? null;

  const initialWorkspaceForm = useMemo(
    () => normalizeWorkspaceForm(workspaceData),
    [workspaceData]
  );

  const initialBrandingForm = useMemo(
    () => normalizeBrandingForm(themeData),
    [themeData]
  );

  const isLoading = workspaceQuery.isPending || themeQuery.isPending;

  const isSaving =
    updateWorkspaceMutation.isPending || updateThemeMutation.isPending;

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Workspace Settings
            </h1>
            <p className="max-w-2xl text-lg text-[#bbcac6]">
              Configure your SiteOrbit workspace, branding system, and connected
              product settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-white/10 text-[#bbcac6]">
              {activeWorkspace?.workspace.name ?? "Workspace"}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/10 capitalize text-[#9aa6c0]"
            >
              {currentRole ?? "viewer"}
            </Badge>
            <Badge
              variant="outline"
              className={
                isSaving
                  ? "border-[#89ceff]/30 text-[#89ceff]"
                  : "border-[#4fdbc8]/30 text-[#4fdbc8]"
              }
            >
              {isSaving ? "Saving…" : "Ready"}
            </Badge>
          </div>
        </div>
      </section>

      <SettingsNav value={activeTab} onValueChange={setActiveTab} />

      {isLoading ? (
        <section className="rounded-xl bg-[#1a1f2d] p-8 text-[#bbcac6]">
          <div className="flex items-center gap-3">
            <Loader2 className="size-5 animate-spin text-[#4fdbc8]" />
            Loading workspace settings…
          </div>
        </section>
      ) : null}

      {!isLoading && activeTab === "workspace" ? (
        <WorkspaceTabContent
          key={JSON.stringify(initialWorkspaceForm)}
          initialForm={initialWorkspaceForm}
          currentRole={currentRole}
          canManageSettings={canManageSettings}
          isSaving={updateWorkspaceMutation.isPending}
          onSave={async (form) => {
            await updateWorkspaceMutation.mutateAsync({
              name: form.name.trim() || undefined,
              primary_domain: form.primary_domain.trim() || null,
              description: form.description.trim() || null,
            });
          }}
        />
      ) : null}

      {!isLoading && activeTab === "branding" ? (
        <BrandingTabContent
          key={JSON.stringify(initialBrandingForm)}
          initialForm={initialBrandingForm}
          canManageSettings={canManageSettings}
          isSaving={updateThemeMutation.isPending}
          onSave={async (form) => {
            await updateThemeMutation.mutateAsync({
              colors: {
                primary: form.primary,
                secondary: form.secondary,
                accent: form.accent,
                background: form.background,
                surface: form.surface,
              },
              typography: {
                heading_font: form.heading_font,
                body_font: form.body_font,
                base_size: form.base_size,
              },
              spacing: {
                section_gap: form.section_gap,
                container_width: form.container_width,
              },
              radius: {
                card: form.card_radius,
                button: form.button_radius,
                input: form.input_radius,
              },
            });
          }}
        />
      ) : null}

      {!isLoading && activeTab === "domains" ? (
        <SettingsPlaceholderPanel
          title="Domains"
          description="Custom domains already have a dedicated product surface. This tab is reserved for a future settings-level summary and quick actions."
        />
      ) : null}

      {!isLoading && activeTab === "api" ? (
        <SettingsPlaceholderPanel
          title="API & Webhooks"
          description="This is a planned MVP placeholder for future API key and webhook controls. Keeping it here preserves the product structure without overbuilding."
        />
      ) : null}

      {!isLoading && activeTab === "billing" ? (
        <SettingsPlaceholderPanel
          title="Billing"
          description="Billing is intentionally out of real MVP scope for now, but the tab remains in the product shell so the settings architecture stays complete and realistic."
        />
      ) : null}
    </div>
  );
}
</file>

<file path="app/(app)/team/page.tsx">
"use client";

import { useMemo, useState } from "react";
import { MailPlus, ShieldAlert, Users } from "lucide-react";
import { toast } from "sonner";

import { useTeam } from "@/hooks/use-team";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription as DialogText,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkspaceRole } from "@/types/workspace";

const roleOptions: WorkspaceRole[] = ["owner", "admin", "editor", "viewer"];

export default function TeamPage() {
  const {
    activeWorkspace,
    currentRole,
    canManageTeam,
    membersQuery,
    invitationsQuery,
    inviteMemberMutation,
    updateMemberRoleMutation,
  } = useTeam();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<WorkspaceRole>("viewer");
  const [inviteError, setInviteError] = useState<string | null>(null);

  const members = membersQuery.data ?? [];
  const invitations = invitationsQuery.data ?? [];

  const pendingInvites = useMemo(
    () => invitations.filter((item) => item.status === "pending"),
    [invitations]
  );

  const handleInvite = async () => {
    const email = inviteEmail.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      setInviteError("Enter a valid email address.");
      return;
    }

    try {
      setInviteError(null);
      await inviteMemberMutation.mutateAsync({
        email,
        role: inviteRole,
      });
      setInviteEmail("");
      setInviteRole("viewer");
      setInviteOpen(false);
      toast.success("Invitation sent successfully.");
    } catch (error) {
      setInviteError(
        error instanceof Error ? error.message : "Invitation could not be sent."
      );
    }
  };

  const handleRoleChange = async (memberId: string, role: WorkspaceRole) => {
    try {
      await updateMemberRoleMutation.mutateAsync({ memberId, role });
      toast.success("Member role updated.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Role could not be updated."
      );
    }
  };

  const workspaceName = activeWorkspace?.workspace.name ?? "this workspace";

  return (
    <>
      <div className="space-y-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Team management
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Keep the right people in orbit.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
              Manage collaborators, control roles, and track pending invitations in {workspaceName}.
            </p>
          </div>

          <Button
            type="button"
            className="h-12 rounded-md px-5"
            disabled={!canManageTeam}
            onClick={() => setInviteOpen(true)}
          >
            <MailPlus data-icon="inline-start" />
            Invite Member
          </Button>
        </section>

        {!canManageTeam ? (
          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#1a1f2d] px-4 py-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[#ffcf7d]" />
            <div>
              <p className="font-medium text-[#dee2f5]">Limited access</p>
              <p className="mt-1 text-sm leading-6 text-[#bbcac6]">
                Your current role is <span className="capitalize">{currentRole ?? "viewer"}</span>.
                You can view team information, but only owners and admins can invite
                members or change roles. 
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-xl border-none bg-[#1a1f2d]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="size-5 text-[#4fdbc8]" />
                <CardTitle className="text-xl font-bold text-[#dee2f5]">
                  Members
                </CardTitle>
              </div>
              <CardDescription className="text-[#bbcac6]">
                Role-aware workspace membership with clear visibility. 
              </CardDescription>
            </CardHeader>
            <CardContent>
              {membersQuery.isPending ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-16 animate-pulse rounded-xl bg-[#111522]" />
                  ))}
                </div>
              ) : membersQuery.isError ? (
                <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                  {membersQuery.error instanceof Error
                    ? membersQuery.error.message
                    : "Members could not be loaded."}
                </div>
              ) : members.length ? (
                <div className="overflow-hidden rounded-xl border border-white/8">
                  <div className="grid grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr] gap-4 bg-[#111522] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#859490]">
                    <span>Member</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Status</span>
                  </div>

                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="grid grid-cols-[1.1fr_1.1fr_0.8fr_0.8fr] gap-4 border-t border-white/8 bg-[#151a27] px-4 py-4 text-sm text-[#dee2f5]"
                    >
                      <span className="font-medium">{member.name}</span>
                      <span className="text-[#bbcac6]">{member.email}</span>
                      <div>
                        {canManageTeam ? (
                          <Select
                            value={member.role}
                            onValueChange={(value) =>
                              void handleRoleChange(member.id, value as WorkspaceRole)
                            }
                          >
                            <SelectTrigger className="h-9 border-white/8 bg-[#111522] text-[#dee2f5]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roleOptions.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span className="capitalize">{member.role}</span>
                        )}
                      </div>
                      <span className="capitalize text-[#4fdbc8]">{member.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                  No team members are visible yet.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-xl border-none bg-[#1a1f2d]">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#dee2f5]">
                Pending invitations
              </CardTitle>
              <CardDescription className="text-[#bbcac6]">
                Invites should be visible immediately with role and status badges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {invitationsQuery.isPending ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-16 animate-pulse rounded-xl bg-[#111522]" />
                ))
              ) : invitationsQuery.isError ? (
                <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                  {invitationsQuery.error instanceof Error
                    ? invitationsQuery.error.message
                    : "Invitations could not be loaded."}
                </div>
              ) : pendingInvites.length ? (
                pendingInvites.map((invite) => (
                  <div key={invite.id} className="rounded-xl bg-[#111522] p-4">
                    <p className="font-medium text-[#dee2f5]">{invite.email}</p>
                    <p className="mt-1 text-sm text-[#9aa6c0]">
                      Role: <span className="capitalize">{invite.role}</span>
                    </p>
                    <p className="mt-1 text-sm text-[#4fdbc8] capitalize">
                      {invite.status}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl bg-[#111522] p-4 text-sm text-[#bbcac6]">
                  No pending invitations right now.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="border-white/8 bg-[#121826] text-[#dee2f5] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invite a new member</DialogTitle>
            <DialogText className="text-[#9aa6c0]">
              Add the right collaborator with the right workspace role.
            </DialogText>
          </DialogHeader>

          <div className="space-y-5">
            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Email address
              </FieldLabel>
              <FieldContent>
                <Input
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder="name@company.com"
                  className="h-12 rounded-xl border-white/8 bg-[#161b29] text-[#dee2f5] placeholder:text-white/20"
                />
                <FieldError errors={inviteError ? [{ message: inviteError }] : []} />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Role
              </FieldLabel>
              <FieldContent>
                <Select
                  value={inviteRole}
                  onValueChange={(value) => setInviteRole(value as WorkspaceRole)}
                >
                  <SelectTrigger className="h-12 rounded-xl border-white/8 bg-[#161b29] text-[#dee2f5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <div className="flex justify-end">
              <Button
                type="button"
                className="h-11 rounded-md px-5"
                disabled={inviteMemberMutation.isPending}
                onClick={() => void handleInvite()}
              >
                Invite Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
</file>

<file path="app/(app)/templates/page.tsx">
import { CopyPlus, LayoutTemplate, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "template-1",
    name: "SaaS Launch",
    category: "Marketing",
    description:
      "A premium landing page shell for launching new digital products with strong headline structure and CTA hierarchy.",
    featured: true,
  },
  {
    id: "template-2",
    name: "Waitlist Funnel",
    category: "Conversion",
    description:
      "A focused conversion path for signups, early access, and pre-launch collection.",
    featured: false,
  },
  {
    id: "template-3",
    name: "Agency Offer",
    category: "Services",
    description:
      "A polished services layout for agencies, studios, and productized service teams.",
    featured: false,
  },
  {
    id: "template-4",
    name: "Docs Intro",
    category: "Product",
    description:
      "A documentation landing structure with clear product orientation and handoff paths.",
    featured: false,
  },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
            Template library
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            Launch faster with structure.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Start from premium page foundations that reduce setup time and keep teams moving toward first publish quickly.
          </p>
        </div>

        <Button className="h-12 rounded-md px-5">
          <Plus data-icon="inline-start" />
          Create Template
        </Button>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl bg-[#1a1f2d] px-6 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#859490]">
            Available templates
          </p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            24
          </p>
        </div>

        <div className="rounded-xl bg-[#1a1f2d] px-6 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#859490]">
            Most used
          </p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            SaaS Launch
          </p>
        </div>

        <div className="rounded-xl bg-[#1a1f2d] px-6 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#859490]">
            Goal
          </p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            First success
          </p>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className="overflow-hidden rounded-xl bg-[#1a1f2d] shadow-[0_22px_70px_rgba(0,0,0,0.24)]"
          >
            <div className="border-b border-white/5 px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#161b29] text-[#4fdbc8]">
                    <LayoutTemplate className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-xl font-bold text-[#dee2f5]">
                        {template.name}
                      </h3>
                      {template.featured ? (
                        <span className="rounded-full bg-[#4fdbc8] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#03241f]">
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#bbcac6]">
                      {template.description}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#303443] px-3 py-1 text-xs font-medium text-[#dee2f5]">
                  {template.category}
                </span>
              </div>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div className="rounded-xl bg-[#0f1724] p-4">
                <div className="grid gap-3">
                  <div className="h-10 rounded-lg bg-white/5" />
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="h-24 rounded-lg bg-[linear-gradient(180deg,rgba(79,219,200,0.12),rgba(79,219,200,0.02))]" />
                    <div className="h-24 rounded-lg bg-[linear-gradient(180deg,rgba(137,206,255,0.14),rgba(137,206,255,0.02))]" />
                    <div className="h-24 rounded-lg bg-[linear-gradient(180deg,rgba(79,219,200,0.12),rgba(79,219,200,0.02))]" />
                  </div>
                  <div className="h-36 rounded-xl bg-white/5" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="rounded-md">
                  <CopyPlus data-icon="inline-start" />
                  Use Template
                </Button>
                <Button variant="outline" className="rounded-md border-white/8 bg-transparent text-[#dee2f5]">
                  Preview
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-[linear-gradient(180deg,rgba(10,20,36,0.35),rgba(10,20,36,0.75))] px-6 py-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-[#4fdbc8]">
            <Sparkles className="size-3.5" />
            Curated starting points
          </div>
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5] sm:text-5xl">
            Start from a stronger foundation.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Save time with reusable page systems built for campaigns, launches, and team collaboration.
          </p>
        </div>
      </section>
    </div>
  );
}
</file>

<file path="app/(auth)/accept-invite/page.tsx">
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { authEase, authItemVariants, authPageVariants } from "@/components/auth/auth-form-motion";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function AcceptInvitePage() {
  const [workspaceName, setWorkspaceName] = useState("");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,219,200,0.12),transparent_25%)]"
        animate={{
          opacity: [0.55, 0.9, 0.6],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-16 top-1/4 h-40 w-40 rounded-full bg-[#4fdbc8]/10 blur-3xl"
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -14, 10, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-10 bottom-20 h-36 w-36 rounded-full bg-[#89ceff]/10 blur-3xl"
        animate={{
          x: [0, -18, 10, 0],
          y: [0, 10, -12, 0],
          scale: [1, 1.07, 0.97, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={authPageVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-3xl text-center"
      >
        <motion.div variants={authItemVariants} className="mb-10 flex justify-center">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Logo href="/" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={authItemVariants}
          className="mx-auto max-w-3xl rounded-[1.25rem] border border-white/8 bg-[#1a1f2d]/92 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-10"
        >
          <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-[#4fdbc8]"
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ duration: 0.75, delay: 0.2, ease: authEase }}
            />
          </div>

          <div className="mx-auto max-w-2xl space-y-4 text-left">
            <motion.p
              variants={authItemVariants}
              className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#4fdbc8]"
            >
              Step 1 of 4
            </motion.p>

            <motion.h1
              variants={authItemVariants}
              className="font-heading text-5xl font-extrabold tracking-tight text-[#dee2f5]"
            >
              Name your workspace
            </motion.h1>

            <motion.p
              variants={authItemVariants}
              className="max-w-xl text-lg leading-8 text-[#b8c3d9]"
            >
              Every great project starts with a name. This is where your team
              will collaborate and build high-end digital experiences.
            </motion.p>

            <motion.div variants={authItemVariants} className="pt-8">
              <Field>
                <FieldLabel
                  htmlFor="workspace-name"
                  className="text-xs uppercase tracking-[0.22em] text-[#bbcac6]"
                >
                  Workspace name
                </FieldLabel>
                <FieldContent>
                  <div className="mt-3 transition-transform duration-200 focus-within:-translate-y-0.5">
                    <Input
                      id="workspace-name"
                      value={workspaceName}
                      onChange={(event) => setWorkspaceName(event.target.value)}
                      placeholder="e.g. Acme Studio"
                      className="h-16 rounded-md border-white/8 bg-[#050b16] px-5 text-2xl font-semibold text-[#dee2f5] placeholder:text-white/18 transition-[border-color,transform,box-shadow] duration-200 focus-visible:scale-[1.01] focus-visible:border-[#4fdbc8]/40"
                    />
                  </div>
                </FieldContent>
              </Field>
            </motion.div>

            <motion.div
              variants={authItemVariants}
              className="flex items-center justify-between pt-10"
            >
              <motion.button
                type="button"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className="text-2xl font-medium text-[#d4dae9] transition-colors hover:text-white"
                onClick={() =>
                  toast.message("Skipped for now.", {
                    description: "Workspace onboarding can continue later.",
                  })
                }
              >
                Skip for now
              </motion.button>

              <motion.div
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <Button
                  type="button"
                  className="relative h-16 overflow-hidden rounded-[1rem] px-10 text-2xl font-semibold"
                  onClick={() =>
                    toast.success("Workspace name captured.", {
                      description: workspaceName || "Acme Studio",
                    })
                  }
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]"
                    whileHover={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 0.9, ease: "linear" }}
                  />
                  Continue
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <ArrowRight data-icon="inline-end" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={authItemVariants}
          className="mt-10 flex items-center justify-center gap-4 text-sm uppercase tracking-[0.24em] text-white/30"
        >
          <span className="h-px w-10 bg-white/10" />
          <span>Need help?</span>
          <Link href="/" className="text-[#89ceff] underline underline-offset-4">
            Talk to a curator
          </Link>
          <span className="h-px w-10 bg-white/10" />
        </motion.div>
      </motion.div>
    </main>
  );
}
</file>

<file path="app/(auth)/forgot-password/page.tsx">
import Link from "next/link";

import AuthCard from "@/components/auth/auth-card";
import AuthForm from "@/components/auth/auth-form";
import AuthOrbitVisual from "@/components/auth/auth-orbit-visual";

export default function ForgotPasswordPage() {
  return (
    <div className="flex justify-center">
      <AuthCard
      
        title="Reset your password"
        description="Enter your email and continue the recovery flow without losing clarity about what happens next."
        heroTitle="Recovery should feel calm."
        heroDescription="Keep the reset pathway readable, guided, and confidence-building instead of abrupt or confusing."
        visual={<AuthOrbitVisual mode="forgot-password" />}
        footer={
          <p className="text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Back to sign in
            </Link>
          </p>
        }

      >
        <AuthForm variant="forgot-password" />
      </AuthCard>
    </div>
  );
}
</file>

<file path="app/(auth)/layout.tsx">
"use client";

import { motion } from "framer-motion";
import { authEase } from "@/components/auth/auth-form-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0e1320] text-[#dee2f5]">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 22% 38%, rgba(79,219,200,0.12), transparent 24%)",
            "radial-gradient(circle at 28% 34%, rgba(79,219,200,0.17), transparent 26%)",
            "radial-gradient(circle at 22% 38%, rgba(79,219,200,0.12), transparent 24%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -left-10 top-20 h-56 w-56 rounded-full bg-[#4fdbc8]/8 blur-3xl"
        animate={{
          x: [0, 24, -8, 0],
          y: [0, -12, 16, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 right-[-4rem] h-72 w-72 rounded-full bg-[#89ceff]/8 blur-3xl"
        animate={{
          x: [0, -26, 10, 0],
          y: [0, 12, -14, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-y-0 left-1/2 hidden w-px bg-white/6 lg:block"
        initial={{ opacity: 0, scaleY: 0.6 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.8, ease: authEase }}
      />

      <div className="relative z-10">{children}</div>
    </main>
  );
}
</file>

<file path="app/(auth)/sign-in/page.tsx">
import Link from "next/link";

import AuthCard from "@/components/auth/auth-card";
import AuthForm from "@/components/auth/auth-form";
import AuthOrbitVisual from "@/components/auth/auth-orbit-visual";

export default function SignInPage() {
  return (
    <div className="flex justify-center">
      <AuthCard
        title="Welcome back"
        description="Sign in to continue building, publishing, and managing your workspace without losing momentum."
        heroTitle="Return to the control layer."
        heroDescription="Secure access, clear system context, and a polished workflow for teams shaping their digital presence."
        visual={<AuthOrbitVisual mode="sign-in" />}
        footer={
          <p className="text-sm text-muted-foreground">
            New to SiteOrbit?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Create your account
            </Link>
          </p>
        }
      >
        <AuthForm variant="sign-in" />
      </AuthCard>
    </div>
  );
}
</file>

<file path="app/(auth)/sign-up/page.tsx">
import Link from "next/link";

import AuthCard from "@/components/auth/auth-card";
import AuthForm from "@/components/auth/auth-form";
import AuthOrbitVisual from "@/components/auth/auth-orbit-visual";

export default function SignUpPage() {
  return (
    <div className="flex justify-center">
      <AuthCard
        title="Create your account"
        description="Start your SiteOrbit workspace and move from setup to publishing with a smoother onboarding path."
        heroTitle="Build the workspace before the website."
        heroDescription="Set up your team context, create your first orbit, and move into the builder with confidence."
        visual={<AuthOrbitVisual mode="sign-up" />}
        footer={
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        }
      >
        <AuthForm variant="sign-up" />
      </AuthCard>
    </div>
  );
}
</file>

<file path="app/(marketing)/layout.tsx">
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_24%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
</file>

<file path="app/(marketing)/page.tsx">
import Link from "next/link";

import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import PricingTeaser from "@/components/marketing/pricing-teaser";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Hero />
      <Features />
      <PricingTeaser />

      <footer className="border-t border-white/6 bg-transparent">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm text-[#8e9ab2] sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="font-heading text-lg font-bold text-[#dee2f5]">
              SiteOrbit
            </div>
            <p className="mt-4 max-w-xs leading-6">
              The premium workspace for digital builders and elite development teams.
            </p>
            <div className="mt-4 flex gap-3">
              <span className="size-8 rounded-full border border-white/8 bg-[#161b29]" />
              <span className="size-8 rounded-full border border-white/8 bg-[#161b29]" />
              <span className="size-8 rounded-full border border-white/8 bg-[#161b29]" />
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Product
            </p>
            <div className="space-y-3 flex flex-col">
              <Link href="/">Features</Link>
              <Link href="/">Integrations</Link>
              <Link href="/">Solutions</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Company
            </p>
            <div className="space-y-3 flex flex-col">
              <Link href="/">About Us</Link>
              <Link href="/">Careers</Link>
              <Link href="/">Contact</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Legal
            </p>
            <div className="space-y-3 flex flex-col">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Service</Link>
              <Link href="/">Security</Link>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/6 px-4 py-6 text-[10px] uppercase tracking-[0.18em] text-[#6f7c96] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© 2025 SiteOrbit. The Digital Curator.</span>
          <div className="flex gap-5">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Security</Link>
            <Link href="/">Status</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
</file>

<file path="app/error.tsx">
"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

import ErrorState from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <ErrorState
          title="Something broke in this view"
          description={
            error.message ||
            "An unexpected error stopped this page from rendering correctly."
          }
          action={
            <Button
              onClick={reset}
              variant="outline"
              className="rounded-md border-white/8 bg-transparent text-[#dee2f5]"
            >
              <RefreshCcw data-icon="inline-start" />
              Try again
            </Button>
          }
        />
      </div>
    </main>
  );
}
</file>

<file path="app/layout.tsx">
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import QueryProvider from "@/components/providers/query-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import AuthActivityProvider from "@/components/providers/auth-activity-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider delayDuration={150}>
              <AuthActivityProvider>
                {children}
                <Toaster richColors position="top-right" />
              </AuthActivityProvider>
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
</file>

<file path="app/loading.tsx">
import LoadingState from "@/components/shared/loading-state";

export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <LoadingState
          title="Loading SiteOrbit"
          description="Preparing your workspace and syncing your product shell."
        />
      </div>
    </main>
  );
}
</file>

<file path="app/not-found.tsx">
import Link from "next/link";
import { Compass, Home, RotateCcw } from "lucide-react";

import EmptyState, {
  EmptyStatePrimaryAction,
  EmptyStateSecondaryAction,
} from "@/components/shared/empty-state";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <EmptyState
          icon={<Compass className="size-6" />}
          title="Page not found"
          description="The page you are looking for does not exist, may have moved, or is not available in this workspace."
          action={
            <EmptyStatePrimaryAction asChild>
              <Link href="/dashboard">
                <Home data-icon="inline-start" />
                Go to dashboard
              </Link>
            </EmptyStatePrimaryAction>
          }
          secondaryAction={
            <EmptyStateSecondaryAction asChild>
              <Link href="/">
                <RotateCcw data-icon="inline-start" />
                Return home
              </Link>
            </EmptyStateSecondaryAction>
          }
        />
      </div>
    </main>
  );
}
</file>

<file path="app/page.tsx">
import MarketingPage from "@/app/(marketing)/page";

export default function HomePage() {
  return <MarketingPage />;
}
</file>

<file path="components/analytics/metric-card.tsx">
"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardReveal, easeBezier, subtlePulse } from "@/lib/motion";
import type { AnalyticsMetricItem } from "@/types/analytics";

export default function MetricCard({ metric }: { metric: AnalyticsMetricItem }) {
  const isUp = metric.trend_direction === "up";

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
        <CardHeader className="pb-2">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: easeBezier }}
            className="text-xs uppercase tracking-[0.16em] text-[#859490]"
          >
            {metric.label}
          </motion.p>

          <CardTitle className="text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            {metric.value}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <motion.div
            variants={isUp ? subtlePulse : undefined}
            initial={isUp ? "initial" : undefined}
            animate={isUp ? "animate" : undefined}
            className="flex items-center gap-2 text-sm"
          >
            <span className={isUp ? "text-[#4fdbc8]" : "text-[#f2b8b5]"}>
              {isUp ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
            </span>
            <span className={isUp ? "text-[#4fdbc8]" : "text-[#f2b8b5]"}>
              {metric.trend}
            </span>
            <span className="text-[#9aa6c0]">{metric.helper}</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
</file>

<file path="components/analytics/top-pages-table.tsx">
"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";

import {
  cardReveal,
  easeBezier,
  panelSlideUp,
  staggerContainer,
} from "@/lib/motion";
import type { AnalyticsTopPageItem } from "@/types/analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TopPagesTableProps = {
  pages: AnalyticsTopPageItem[];
};

export default function TopPagesTable({ pages }: TopPagesTableProps) {
  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3, scale: 1.003 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#dee2f5]">
            Top pages
          </CardTitle>
          <CardDescription className="text-[#9aa6c0]">
            Strongest pages by visits and conversion performance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="hidden overflow-hidden rounded-xl border border-white/8 xl:block">
            <div className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr] bg-[#111522] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7f8aa3]">
              <span>Page</span>
              <span>Visits</span>
              <span>Conversions</span>
              <span>Conv. rate</span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="divide-y divide-white/8"
            >
              {pages.map((page, index) => (
                <motion.div
                  key={page.id}
                  variants={panelSlideUp}
                  className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr] items-center bg-[#171c2a] px-5 py-4 transition hover:bg-[#1c2232]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-[#dee2f5]">
                        {page.title}
                      </span>
                      {index === 0 ? (
                        <span className="rounded-full bg-[#172c29] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4fdbc8]">
                          Top
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-[#9aa6c0]">
                      <span className="truncate">{page.path}</span>
                      <ExternalLink className="size-3.5 shrink-0" />
                    </div>
                  </div>

                  <div className="text-sm text-[#dee2f5]">
                    {page.visits.toLocaleString()}
                  </div>

                  <div className="text-sm text-[#dee2f5]">
                    {page.conversions.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="size-4 text-[#4fdbc8]" />
                    <span className="text-[#4fdbc8]">
                      {page.conversion_rate.toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3 xl:hidden"
          >
            {pages.map((page, index) => (
              <motion.div
                key={page.id}
                variants={panelSlideUp}
                className="rounded-xl border border-white/8 bg-[#111522] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-[#dee2f5]">
                        {page.title}
                      </span>
                      {index === 0 ? (
                        <span className="rounded-full bg-[#172c29] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4fdbc8]">
                          Top
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-1 truncate text-sm text-[#9aa6c0]">
                      {page.path}
                    </div>
                  </div>

                  <div className="rounded-full bg-[#172c29] px-3 py-1 text-xs font-medium text-[#4fdbc8]">
                    {page.conversion_rate.toFixed(1)}%
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#171c2a] px-3 py-3">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#7f8aa3]">
                      Visits
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#dee2f5]">
                      {page.visits.toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#171c2a] px-3 py-3">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#7f8aa3]">
                      Conversions
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#dee2f5]">
                      {page.conversions.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {pages.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.08, ease: easeBezier }}
              className="mt-4 text-xs text-[#7f8aa3]"
            >
              Pages are ranked by traffic first, then conversion performance.
            </motion.div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}
</file>

<file path="components/analytics/traffic-chart.tsx">
"use client";

import { motion } from "framer-motion";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import {
  cardReveal,
  panelSlideUp,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type {
  AnalyticsSourceItem,
  AnalyticsTrafficPoint,
} from "@/types/analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TrafficChartProps = {
  data: AnalyticsTrafficPoint[];
  sources: AnalyticsSourceItem[];
};

const sourceColors = [
  "#4FDBC8",
  "#89CEFF",
  "#DEE2F5",
  "#7DD3A7",
  "#F7C97A",
];

function formatDateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

function formatTooltipMetricValue(value: ValueType | undefined, name: NameType | undefined) {
  const numericValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : 0;

  const safeName = typeof name === "string" ? name : "Metric";

  return [
    Number.isFinite(numericValue) ? numericValue.toLocaleString() : "0",
    safeName === "visits" ? "Visits" : safeName === "conversions" ? "Conversions" : safeName,
  ] as [string, string];
}

function formatSourceTooltipValue(value: ValueType | undefined, name: NameType | undefined) {
  const numericValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : 0;

  const safeName = typeof name === "string" ? name : "Source";

  return [
    Number.isFinite(numericValue) ? numericValue.toLocaleString() : "0",
    safeName,
  ] as [string, string];
}

export default function TrafficChart({
  data,
  sources,
}: TrafficChartProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]"
    >
      <motion.div
        variants={cardReveal}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -3, scale: 1.004 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#dee2f5]">
              Traffic overview
            </CardTitle>
            <CardDescription className="text-[#9aa6c0]">
              Visits and conversions across the selected analytics range.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <motion.div
              variants={panelSlideUp}
              initial="hidden"
              animate="visible"
              className="h-[320px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FDBC8" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#4FDBC8" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDateLabel}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#8d99b2", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#8d99b2", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111522",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                      color: "#dee2f5",
                    }}
                    labelStyle={{ color: "#9aa6c0" }}
                    formatter={formatTooltipMetricValue}
                    labelFormatter={(label) => formatDateLabel(String(label))}
                  />

                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#4FDBC8"
                    strokeWidth={2.5}
                    fill="url(#visitsFill)"
                    animationDuration={850}
                    animationEasing="ease-out"
                  />

                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="#89CEFF"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5 }}
                    animationDuration={950}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardReveal}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -3, scale: 1.004 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#dee2f5]">
              Source breakdown
            </CardTitle>
            <CardDescription className="text-[#9aa6c0]">
              Where your visitors are coming from.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              variants={panelSlideUp}
              initial="hidden"
              animate="visible"
              className="h-[220px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sources}
                    dataKey="visits"
                    nameKey="source"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={3}
                    stroke="transparent"
                    animationDuration={850}
                    animationEasing="ease-out"
                  >
                    {sources.map((source, index) => (
                      <Cell
                        key={source.source}
                        fill={sourceColors[index % sourceColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#111522",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                      color: "#dee2f5",
                    }}
                    labelStyle={{ color: "#9aa6c0" }}
                    formatter={formatSourceTooltipValue}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {sources.map((source, index) => (
                <motion.div
                  key={source.source}
                  variants={panelSlideUp}
                  className="rounded-xl bg-[#111522] px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: sourceColors[index % sourceColors.length],
                        }}
                      />
                      <span className="truncate text-sm font-medium text-[#dee2f5]">
                        {source.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-[#dee2f5]">
                        {source.visits.toLocaleString()}
                      </span>
                      <span className="text-[#9aa6c0]">
                        {source.share.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(source.share, 100)}%` }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn("h-full rounded-full")}
                      style={{
                        backgroundColor: sourceColors[index % sourceColors.length],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}
</file>

<file path="components/auth/auth-card.tsx">
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Logo from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
  heroTitle?: string;
  heroDescription?: string;
  visual?: ReactNode;
  className?: string;
};

export default function AuthCard({
  title,
  description,
  footer,
  children,
  heroTitle,
  heroDescription,
  visual,
  className,
}: AuthCardProps) {
  return (
    <div className={cn("grid min-h-screen lg:grid-cols-[1fr_1fr]", className)}>
      <motion.section
        initial={{ opacity: 0, x: -24, filter: "blur(12px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-14"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <Logo href="/" />
        </motion.div>

        <div className="max-w-xl space-y-6">
          {visual ? (
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.97, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-10 overflow-hidden rounded-[1.25rem] border border-white/6 bg-white/[0.02] p-0 shadow-[0_20px_80px_rgba(0,0,0,0.28)]"
              style={{ transformPerspective: 1400 }}
            >
              {visual}
            </motion.div>
          ) : null}

          {heroTitle ? (
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-7xl font-extrabold leading-[0.98] tracking-tight text-[#dee2f5]"
            >
              {heroTitle}
            </motion.h1>
          ) : null}

          {heroDescription ? (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              className="max-w-lg text-[1.1rem] leading-8 text-[#bbcac6]"
            >
              {heroDescription}
            </motion.p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-white/30"
        >
          <span>© 2024 SiteOrbit</span>
          <motion.span
            className="h-px flex-1 bg-white/10"
            animate={{ opacity: [0.35, 0.8, 0.45] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span>The Digital Curator</span>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="lg:hidden"
          >
            <Logo href="/" />
          </motion.div>

          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="font-heading text-5xl font-bold tracking-tight text-[#dee2f5]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="text-lg text-[#bbcac6]"
            >
              {description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>

          {footer ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="pt-2"
            >
              {footer}
            </motion.div>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42 }}
            className="flex justify-end gap-6 text-sm text-white/35"
          >
            <motion.div whileHover={{ y: -1, color: "#ffffff" }}>
              <Link href="/">Privacy</Link>
            </motion.div>
            <motion.div whileHover={{ y: -1, color: "#ffffff" }}>
              <Link href="/">Terms</Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
</file>

<file path="components/auth/auth-form.tsx">
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  Loader2,
  LogIn,
  Mail,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import AuthSocialButton from "@/components/auth/auth-social-button";
import {
  authContainerVariants,
  authFeedbackVariants,
  authItemVariants,
} from "@/components/auth/auth-form-motion";
import PasswordFieldToggle from "@/components/auth/password-field-toggle";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  signInSchema,
  signUpSchema,
  type SignInSchema,
  type SignUpSchema,
} from "@/lib/validators/auth";

type AuthFormProps =
  | { variant: "sign-in" }
  | { variant: "sign-up" }
  | { variant: "forgot-password" }
  | { variant: "accept-invite"; inviteEmail?: string };

function InlineFeedback({
  tone,
  text,
}: {
  tone: "success" | "neutral";
  text: string;
}) {
  const toneClasses =
    tone === "success"
      ? "border-[#4fdbc8]/18 bg-[#4fdbc8]/8 text-[#a6f2e9]"
      : "border-white/10 bg-white/[0.03] text-[#c3cee4]";

  return (
    <motion.div
      variants={authFeedbackVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex items-start gap-3 rounded-[0.95rem] border px-4 py-3 text-sm ${toneClasses}`}
    >
      {tone === "success" ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
      ) : (
        <Mail className="mt-0.5 size-4 shrink-0" />
      )}
      <span className="leading-6">{text}</span>
    </motion.div>
  );
}

function MotionField({ children }: { children: React.ReactNode }) {
  return <motion.div variants={authItemVariants}>{children}</motion.div>;
}

export default function AuthForm(props: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInMutation, signUpMutation, beginOAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showInvitePassword, setShowInvitePassword] = useState(false);
  const [oauthProvider, setOAuthProvider] = useState<"google" | "github" | null>(
    null
  );
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);

  const redirectTarget = searchParams.get("redirect") || "/dashboard";

  const signInForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const signUpForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onBlur",
  });

  const forgotPasswordForm = useForm<{ email: string }>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const acceptInviteForm = useForm<{ name: string; password: string }>({
    defaultValues: { name: "", password: "" },
    mode: "onBlur",
  });

  const authInputClassName =
    "h-14 rounded-[0.85rem] border-white/8 bg-[#161b29] text-[#dee2f5] placeholder:text-white/20 pr-12 transition-[border-color,transform,background-color,box-shadow] duration-200 focus-visible:scale-[1.01] focus-visible:border-[#4fdbc8]/40 focus-visible:bg-[#171f2d]";

  const authInputClassNameWithoutToggle =
    "h-14 rounded-[0.85rem] border-white/8 bg-[#161b29] text-[#dee2f5] placeholder:text-white/20 transition-[border-color,transform,background-color,box-shadow] duration-200 focus-visible:scale-[1.01] focus-visible:border-[#4fdbc8]/40 focus-visible:bg-[#171f2d]";

  const primaryButtonClassName =
    "relative h-16 w-full overflow-hidden rounded-[0.95rem] bg-[#4fdbc8] text-xl font-semibold text-[#03241f] hover:bg-[#46cfbd]";

  const forgotPasswordEmail = forgotPasswordForm.watch("email");

  const forgotPasswordMessage = useMemo(() => {
    if (!forgotPasswordSubmitted) return null;

    return forgotPasswordEmail
      ? `A recovery link would be sent to ${forgotPasswordEmail}. Backend reset delivery can be connected next.`
      : "Password reset flow confirmed. Backend delivery can be connected next.";
  }, [forgotPasswordEmail, forgotPasswordSubmitted]);

  const handleAuthError = (error: unknown, fallback: string) => {
    const message = error instanceof Error ? error.message : fallback;

    toast.error("Action could not be completed.", {
      description: message,
    });
  };

  const handleOAuthStart = async (provider: "google" | "github") => {
    try {
      setOAuthProvider(provider);
      await beginOAuth(provider, redirectTarget);
    } catch (error) {
      handleAuthError(
        error,
        `${provider === "google" ? "Google" : "GitHub"} sign-in could not be started.`
      );
      setOAuthProvider(null);
    }
  };

  const divider = (
    <motion.div variants={authItemVariants} className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-white/8" />
      <span className="text-xs uppercase tracking-[0.25em] text-white/30">
        Or continue with
      </span>
      <div className="h-px flex-1 bg-white/8" />
    </motion.div>
  );

  if (props.variant === "sign-in") {
    return (
      <motion.div
        variants={authContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={authItemVariants} className="grid gap-4 sm:grid-cols-2">
          <AuthSocialButton
            provider="google"
            activeProvider={oauthProvider}
            disabled={oauthProvider !== null}
            onClick={() => void handleOAuthStart("google")}
          />
          <AuthSocialButton
            provider="github"
            activeProvider={oauthProvider}
            disabled={oauthProvider !== null}
            onClick={() => void handleOAuthStart("github")}
          />
        </motion.div>

        {divider}

        <motion.form
          variants={authContainerVariants}
          onSubmit={signInForm.handleSubmit(async (values) => {
            try {
              await signInMutation.mutateAsync(values);
              toast.success("Signed in successfully.");
              router.push(redirectTarget);
              router.refresh();
            } catch (error) {
              handleAuthError(error, "Sign in failed.");
            }
          })}
          className="space-y-5"
        >
          <MotionField>
            <Field>
              <FieldLabel
                htmlFor="sign-in-email"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Email address
              </FieldLabel>
              <FieldContent>
                <Input
                  id="sign-in-email"
                  type="email"
                  placeholder="name@company.com"
                  className={authInputClassNameWithoutToggle}
                  {...signInForm.register("email")}
                />
                <FieldError errors={[signInForm.formState.errors.email]} />
              </FieldContent>
            </Field>
          </MotionField>

          <MotionField>
            <Field>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel
                  htmlFor="sign-in-password"
                  className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
                >
                  Password
                </FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#4fdbc8] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FieldContent>
                <div className="relative">
                  <Input
                    id="sign-in-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={authInputClassName}
                    {...signInForm.register("password")}
                  />
                  <PasswordFieldToggle
                    shown={showPassword}
                    onToggle={() => setShowPassword((prev) => !prev)}
                  />
                </div>
                <FieldError errors={[signInForm.formState.errors.password]} />
              </FieldContent>
            </Field>
          </MotionField>

          <motion.div
            variants={authItemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.995 }}
          >
            <Button
              type="submit"
              className={primaryButtonClassName}
              disabled={signInMutation.isPending || oauthProvider !== null}
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]"
                animate={
                  signInMutation.isPending
                    ? { x: ["-120%", "120%"] }
                    : { x: "-120%" }
                }
                transition={
                  signInMutation.isPending
                    ? { duration: 1.05, repeat: Infinity, ease: "linear" }
                    : { duration: 0.2 }
                }
              />
              {signInMutation.isPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <LogIn data-icon="inline-start" />
              )}
              Sign In
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    );
  }

  if (props.variant === "sign-up") {
    return (
      <motion.div
        variants={authContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={authItemVariants} className="grid gap-4 sm:grid-cols-2">
          <AuthSocialButton
            provider="google"
            activeProvider={oauthProvider}
            disabled={oauthProvider !== null}
            onClick={() => void handleOAuthStart("google")}
          />
          <AuthSocialButton
            provider="github"
            activeProvider={oauthProvider}
            disabled={oauthProvider !== null}
            onClick={() => void handleOAuthStart("github")}
          />
        </motion.div>

        {divider}

        <motion.form
          variants={authContainerVariants}
          onSubmit={signUpForm.handleSubmit(async (values) => {
            try {
              await signUpMutation.mutateAsync(values);
              toast.success("Account created successfully.");
              router.push("/dashboard");
              router.refresh();
            } catch (error) {
              handleAuthError(error, "Sign up failed.");
            }
          })}
          className="space-y-5"
        >
          <MotionField>
            <Field>
              <FieldLabel
                htmlFor="sign-up-name"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Full name
              </FieldLabel>
              <FieldContent>
                <Input
                  id="sign-up-name"
                  placeholder="Alex Morgan"
                  className={authInputClassNameWithoutToggle}
                  {...signUpForm.register("name")}
                />
                <FieldError errors={[signUpForm.formState.errors.name]} />
              </FieldContent>
            </Field>
          </MotionField>

          <MotionField>
            <Field>
              <FieldLabel
                htmlFor="sign-up-email"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Work email
              </FieldLabel>
              <FieldContent>
                <Input
                  id="sign-up-email"
                  type="email"
                  placeholder="alex@workspace.com"
                  className={authInputClassNameWithoutToggle}
                  {...signUpForm.register("email")}
                />
                <FieldError errors={[signUpForm.formState.errors.email]} />
              </FieldContent>
            </Field>
          </MotionField>

          <MotionField>
            <Field>
              <FieldLabel
                htmlFor="sign-up-password"
                className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
              >
                Password
              </FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Input
                    id="sign-up-password"
                    type={showSignUpPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={authInputClassName}
                    {...signUpForm.register("password")}
                  />
                  <PasswordFieldToggle
                    shown={showSignUpPassword}
                    onToggle={() => setShowSignUpPassword((prev) => !prev)}
                  />
                </div>
                <FieldError errors={[signUpForm.formState.errors.password]} />
              </FieldContent>
            </Field>
          </MotionField>

          <motion.div
            variants={authItemVariants}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.995 }}
          >
            <Button
              type="submit"
              className={primaryButtonClassName}
              disabled={signUpMutation.isPending || oauthProvider !== null}
            >
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]"
                animate={
                  signUpMutation.isPending
                    ? { x: ["-120%", "120%"] }
                    : { x: "-120%" }
                }
                transition={
                  signUpMutation.isPending
                    ? { duration: 1.05, repeat: Infinity, ease: "linear" }
                    : { duration: 0.2 }
                }
              />
              {signUpMutation.isPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <UserPlus data-icon="inline-start" />
              )}
              Create Account
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    );
  }

  if (props.variant === "forgot-password") {
    return (
      <motion.form
        variants={authContainerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={forgotPasswordForm.handleSubmit(async () => {
          setForgotPasswordSubmitted(true);
          toast.success("Password reset link sent.", {
            description:
              "This is a placeholder flow for the MVP. Backend recovery can be added next.",
          });
        })}
        className="space-y-5"
      >
        <AnimatePresence initial={false}>
          {forgotPasswordMessage ? (
            <InlineFeedback tone="success" text={forgotPasswordMessage} />
          ) : null}
        </AnimatePresence>

        <MotionField>
          <Field>
            <FieldLabel
              htmlFor="forgot-password-email"
              className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
            >
              Email address
            </FieldLabel>
            <FieldContent>
              <Input
                id="forgot-password-email"
                type="email"
                placeholder="name@company.com"
                className={authInputClassNameWithoutToggle}
                {...forgotPasswordForm.register("email", {
                  required: "Email is required.",
                })}
              />
              <FieldError errors={[forgotPasswordForm.formState.errors.email]} />
            </FieldContent>
          </Field>
        </MotionField>

        <motion.div
          variants={authItemVariants}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.995 }}
        >
          <Button type="submit" className={primaryButtonClassName}>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]"
              animate={
                forgotPasswordSubmitted
                  ? { opacity: [0.2, 0.5, 0.2] }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.4,
                repeat: forgotPasswordSubmitted ? Infinity : 0,
              }}
            />
            {forgotPasswordSubmitted ? (
              <CheckCircle2 data-icon="inline-start" />
            ) : (
              <Mail data-icon="inline-start" />
            )}
            {forgotPasswordSubmitted ? "Reset Link Sent" : "Send Reset Link"}
          </Button>
        </motion.div>
      </motion.form>
    );
  }

  return (
    <motion.form
      variants={authContainerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={acceptInviteForm.handleSubmit(async () => {
        toast.success("Invitation accepted.", {
          description:
            "The account acceptance flow is ready for backend invite completion.",
        });
      })}
      className="space-y-5"
    >
      <motion.div variants={authItemVariants}>
        <InlineFeedback
          tone="neutral"
          text="This acceptance flow is already connected to the intended onboarding path. Backend invite completion can be plugged in next without restructuring the UI."
        />
      </motion.div>

      <MotionField>
        <Field>
          <FieldLabel
            htmlFor="accept-invite-email"
            className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
          >
            Invite email
          </FieldLabel>
          <FieldContent>
            <Input
              id="accept-invite-email"
              value={props.inviteEmail ?? "invite@company.com"}
              disabled
              className={authInputClassNameWithoutToggle}
            />
          </FieldContent>
        </Field>
      </MotionField>

      <MotionField>
        <Field>
          <FieldLabel
            htmlFor="accept-invite-name"
            className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
          >
            Full name
          </FieldLabel>
          <FieldContent>
            <Input
              id="accept-invite-name"
              placeholder="Enter your full name"
              className={authInputClassNameWithoutToggle}
              {...acceptInviteForm.register("name", {
                required: "Name is required.",
              })}
            />
            <FieldError errors={[acceptInviteForm.formState.errors.name]} />
          </FieldContent>
        </Field>
      </MotionField>

      <MotionField>
        <Field>
          <FieldLabel
            htmlFor="accept-invite-password"
            className="text-xs uppercase tracking-[0.2em] text-[#bbcac6]"
          >
            Password
          </FieldLabel>
          <FieldContent>
            <div className="relative">
              <Input
                id="accept-invite-password"
                type={showInvitePassword ? "text" : "password"}
                placeholder="Create your password"
                className={authInputClassName}
                {...acceptInviteForm.register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                })}
              />
              <PasswordFieldToggle
                shown={showInvitePassword}
                onToggle={() => setShowInvitePassword((prev) => !prev)}
              />
            </div>
            <FieldError errors={[acceptInviteForm.formState.errors.password]} />
          </FieldContent>
        </Field>
      </MotionField>

      <motion.div
        variants={authItemVariants}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.995 }}
      >
        <Button type="submit" className={primaryButtonClassName}>
          <ShieldCheck data-icon="inline-start" />
          Accept Invite
        </Button>
      </motion.div>
    </motion.form>
  );
}
</file>

<file path="components/builder/blocks-panel.tsx">
"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, MousePointer, Rows3, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cardReveal, panelSlideLeft, staggerFast } from "@/lib/motion";
import type { BuilderBlock } from "@/types/builder";

export type BlocksPanelProps = {
  onAddBlock: (block: BuilderBlock) => void;
  disabled?: boolean;
};

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

type BlockTemplate = {
  type: BuilderBlock["type"];
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  create: () => BuilderBlock;
};

const blockTemplates: BlockTemplate[] = [
  {
    type: "hero",
    title: "Hero",
    description: "Big title, subtitle, and CTA.",
    icon: LayoutTemplate,
    create: () => ({
      id: createId(),
      type: "hero",
      props: {
        title: "Launch faster with SiteOrbit",
        subtitle: "Create focused landing pages for modern teams.",
        buttonLabel: "Get started",
        buttonHref: "#",
      },
    }),
  },
  {
    type: "text",
    title: "Text section",
    description: "Simple content block for supporting copy.",
    icon: Type,
    create: () => ({
      id: createId(),
      type: "text",
      props: {
        title: "Tell your product story",
        body: "Use this section to explain the value, flow, and offer clearly.",
      },
    }),
  },
  {
    type: "features",
    title: "Features",
    description: "Three quick value points.",
    icon: Rows3,
    create: () => ({
      id: createId(),
      type: "features",
      props: {
        title: "Why teams choose SiteOrbit",
        items: ["Fast setup", "Clear collaboration", "Confident publishing"],
      },
    }),
  },
  {
    type: "cta",
    title: "CTA",
    description: "Final conversion block with action.",
    icon: MousePointer,
    create: () => ({
      id: createId(),
      type: "cta",
      props: {
        title: "Ready to launch?",
        subtitle:
          "Create, publish, and track your next campaign from one workspace.",
        buttonLabel: "Start building",
        buttonHref: "#",
      },
    }),
  },
];

export default function BlocksPanel({
  onAddBlock,
  disabled = false,
}: BlocksPanelProps) {
  return (
    <motion.aside
      variants={panelSlideLeft}
      initial="hidden"
      animate="visible"
      className="h-full border-r border-white/8 bg-[#111522]"
    >
      <motion.div
        variants={panelSlideLeft}
        className="border-b border-white/8 px-4 py-4"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
          Block library
        </p>
        <h2 className="mt-2 text-lg font-bold text-[#dee2f5]">Build your page</h2>
        <p className="mt-1 text-sm leading-6 text-[#9aa6c0]">
          Add visible sections first. Keep the page clear and focused.
        </p>
      </motion.div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="space-y-3 p-4"
      >
        {blockTemplates.map((template) => {
          const Icon = template.icon;

          return (
            <motion.button
              key={template.type}
              variants={cardReveal}
              type="button"
              disabled={disabled}
              onClick={() => onAddBlock(template.create())}
              whileHover={disabled ? undefined : { y: -2, scale: 1.01 }}
              whileTap={disabled ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full rounded-xl border border-white/8 bg-[#1a1f2d] p-4 text-left transition hover:border-[#2cdbc2]/40 hover:bg-[#1d2434] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  whileHover={disabled ? undefined : { rotate: -6, scale: 1.06 }}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#162a27] text-[#4fdbc8]"
                >
                  <Icon className="size-4" />
                </motion.div>

                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#dee2f5]">
                    {template.title}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-[#9aa6c0]">
                    {template.description}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}

        <motion.div variants={cardReveal}>
          <Button
            type="button"
            variant="outline"
            disabled
            className="mt-2 h-10 w-full rounded-md border-white/8 bg-transparent text-[#9aa6c0]"
          >
            More starter blocks soon
          </Button>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}
</file>

<file path="components/builder/builder-shell.tsx">
"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock } from "lucide-react";

import BlocksPanel from "@/components/builder/blocks-panel";
import BuilderToolbar from "@/components/builder/builder-toolbar";
import Canvas from "@/components/builder/canvas";
import PropertiesPanel from "@/components/builder/properties-panel";
import { useBuilder } from "@/hooks/use-builder";
import { useProjects } from "@/hooks/use-projects";
import { easeBezier, pageReveal, sectionReveal } from "@/lib/motion";
import { useWorkspace } from "@/hooks/use-workspace";

export default function BuilderShell() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId");
  const pageId = searchParams.get("pageId");

  const {
    blocks,
    selectedBlockId,
    viewport,
    saveStatus,
    isPreviewMode,
    currentPage,
    pages,
    project,
    currentRole,
    canEdit,
    projectQuery,
    pagesQuery,
    createPageMutation,
    savePageMutation,
    setSelectedBlockId,
    setViewport,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlockProps,
    setPreviewMode,
    saveCurrentPage,
    ensureDefaultPage,
  } = useBuilder(projectId, pageId);

  const { publishProjectMutation } = useProjects();
  const { activeWorkspace } = useWorkspace();

  useEffect(() => {
    if (!projectId) return;
    if (pagesQuery.isPending) return;
    if (pages.length > 0 || createPageMutation.isPending) return;

    void (async () => {
      try {
        const created = await ensureDefaultPage();
        if (!created) return;

        const next = new URLSearchParams(searchParams.toString());
        next.set("projectId", projectId);
        next.set("pageId", created.id);
        router.replace(`/builder?${next.toString()}`);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Default page could not be created."
        );
      }
    })();
  }, [
    createPageMutation.isPending,
    ensureDefaultPage,
    pages.length,
    pagesQuery.isPending,
    projectId,
    router,
    searchParams,
  ]);

  const selectedBlock = useMemo(
    () => blocks.find((block) => block.id === selectedBlockId) ?? null,
    [blocks, selectedBlockId]
  );

  const handleChangePage = (nextPageId: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (projectId) next.set("projectId", projectId);
    next.set("pageId", nextPageId);
    router.push(`/builder?${next.toString()}`);
  };

  const handleCreatePage = async () => {
    if (!projectId) return;

    try {
      const page = await createPageMutation.mutateAsync({
        site_id: projectId,
        title: `Page ${pages.length + 1}`,
        path: pages.length === 0 ? "/" : `/page-${pages.length + 1}`,
        layout_json: JSON.stringify({ blocks: [] }),
      });

      toast.success("New page created.");

      const next = new URLSearchParams(searchParams.toString());
      next.set("projectId", projectId);
      next.set("pageId", page.id);
      router.push(`/builder?${next.toString()}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Page could not be created."
      );
    }
  };

  const handleSave = async () => {
    try {
      await saveCurrentPage();
      toast.success("Page saved successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Page could not be saved."
      );
    }
  };

  const handlePublish = async () => {
    if (!projectId) return;

    try {
      await publishProjectMutation.mutateAsync(projectId);
      toast.success("Project published successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Project could not be published."
      );
    }
  };

  if (!projectId) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.42, ease: easeBezier }}
          className="max-w-xl rounded-2xl border border-dashed border-white/10 bg-[#111522] px-8 py-10 text-center"
        >
          <h2 className="text-2xl font-bold text-[#dee2f5]">Pick a project first</h2>
          <p className="mt-3 text-sm leading-7 text-[#9aa6c0]">
            Open the builder from a project card so SiteOrbit knows which project
            and page should load into the visual editor.
          </p>
        </motion.div>
      </div>
    );
  }

  if (projectQuery.isPending || pagesQuery.isPending) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="h-20 animate-pulse rounded-2xl bg-[#111522]" />
        <div className="grid min-h-[70vh] grid-cols-[280px_1fr_320px] gap-0 rounded-2xl border border-white/8 bg-[#0f1420]">
          <div className="animate-pulse border-r border-white/8 bg-[#111522]" />
          <div className="animate-pulse bg-[#0b1020]" />
          <div className="animate-pulse border-l border-white/8 bg-[#111522]" />
        </div>
      </motion.div>
    );
  }

  if (projectQuery.isError || pagesQuery.isError) {
    const message =
      (projectQuery.error instanceof Error && projectQuery.error.message) ||
      (pagesQuery.error instanceof Error && pagesQuery.error.message) ||
      "Builder data could not be loaded.";

    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.42, ease: easeBezier }}
          className="max-w-xl rounded-2xl border border-white/10 bg-[#111522] px-8 py-10 text-center"
        >
          <h2 className="text-2xl font-bold text-[#dee2f5]">Builder unavailable</h2>
          <p className="mt-3 text-sm leading-7 text-[#9aa6c0]">{message}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {!canEdit ? (
        <motion.div
          variants={sectionReveal}
          className="flex items-start gap-3 rounded-2xl border border-[#ffcf7d]/18 bg-[#2a2418] px-5 py-4 text-[#ffcf7d]"
        >
          <Lock className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="text-sm font-semibold">
              Read-only builder access
            </p>
            <p className="mt-1 text-sm leading-6 text-[#f1d39a]">
              Your role in {activeWorkspace?.workspace.name ?? "this workspace"} is{" "}
              <span className="font-semibold capitalize">{currentRole ?? "viewer"}</span>.
              You can inspect the page structure and content, but editing and publishing are restricted.
            </p>
          </div>
        </motion.div>
      ) : null}

      <motion.div
        variants={sectionReveal}
        className="overflow-hidden rounded-2xl border border-white/8 bg-[#0f1420]"
      >
        <BuilderToolbar
          project={project}
          page={currentPage}
          pages={pages}
          viewport={viewport}
          saveStatus={saveStatus}
          isPreviewMode={isPreviewMode}
          canEdit={canEdit}
          isSaving={savePageMutation.isPending}
          isPublishing={publishProjectMutation.isPending}
          onSelectViewport={setViewport}
          onTogglePreview={() => setPreviewMode(!isPreviewMode)}
          onSave={handleSave}
          onPublish={handlePublish}
          onChangePage={handleChangePage}
          onCreatePage={handleCreatePage}
        />

        <div className="grid min-h-[70vh] grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          {!isPreviewMode ? (
            <BlocksPanel onAddBlock={addBlock} disabled={!canEdit} />
          ) : null}

          <Canvas
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            viewport={viewport}
            isPreviewMode={isPreviewMode}
            onSelectBlock={setSelectedBlockId}
            onRemoveBlock={removeBlock}
            onMoveBlock={moveBlock}
            canEdit={canEdit}
          />

          {!isPreviewMode ? (
            <PropertiesPanel
              block={selectedBlock}
              canEdit={canEdit}
              onChange={(updater) => {
                if (!selectedBlock) return;
                updateBlockProps(selectedBlock.id, updater);
              }}
            />
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
</file>

<file path="components/builder/builder-toolbar.tsx">
"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Eye,
  Laptop,
  Loader2,
  MonitorSmartphone,
  Save,
  Smartphone,
  Tablet,
  UploadCloud,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  easeBezier,
  panelSlideUp,
  staggerFast,
  subtlePulse,
} from "@/lib/motion";
import type {
  BuilderPageRecord,
  BuilderViewport,
  SaveStatus,
} from "@/types/builder";
import type { Project } from "@/types/project";

type BuilderToolbarProps = {
  project: Project | null;
  page: BuilderPageRecord | null;
  pages: BuilderPageRecord[];
  viewport: BuilderViewport;
  saveStatus: SaveStatus;
  isPreviewMode: boolean;
  canEdit?: boolean;
  isSaving?: boolean;
  isPublishing?: boolean;
  onSelectViewport: (viewport: BuilderViewport) => void;
  onTogglePreview: () => void;
  onSave: () => void;
  onPublish: () => void;
  onChangePage: (pageId: string) => void;
  onCreatePage: () => void;
};

function saveStatusLabel(status: SaveStatus) {
  switch (status) {
    case "saving":
      return "Saving…";
    case "saved":
      return "Saved";
    case "unsaved":
      return "Unsaved changes";
    case "error":
      return "Save failed";
    case "idle":
    default:
      return "Ready";
  }
}

function saveStatusTone(status: SaveStatus) {
  switch (status) {
    case "saving":
      return "border-[#89ceff]/25 bg-[#89ceff]/10 text-[#b9e3ff]";
    case "saved":
      return "border-[#4fdbc8]/25 bg-[#4fdbc8]/10 text-[#9feee2]";
    case "unsaved":
      return "border-[#f7c97a]/25 bg-[#f7c97a]/10 text-[#ffdca2]";
    case "error":
      return "border-[#f2b8b5]/25 bg-[#f2b8b5]/10 text-[#f7cbc9]";
    case "idle":
    default:
      return "border-white/10 bg-[#1a1f2d] text-[#9aa6c0]";
  }
}

export default function BuilderToolbar({
  project,
  page,
  pages,
  viewport,
  saveStatus,
  isPreviewMode,
  canEdit = true,
  isSaving = false,
  isPublishing = false,
  onSelectViewport,
  onTogglePreview,
  onSave,
  onPublish,
  onChangePage,
  onCreatePage,
}: BuilderToolbarProps) {
  return (
    <motion.header
      variants={panelSlideUp}
      initial="hidden"
      animate="visible"
      className="border-b border-white/8 bg-[#0f1420] px-4 py-3"
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4fdbc8]">
            Builder
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h1 className="truncate text-xl font-bold text-[#dee2f5]">
              {project?.name ?? "Untitled project"}
            </h1>

            {page ? (
              <motion.span
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full bg-[#1a1f2d] px-3 py-1 text-xs text-[#9aa6c0]"
              >
                {page.title} · {page.path}
              </motion.span>
            ) : null}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={saveStatus}
              initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: easeBezier }}
              className="mt-2"
            >
              <motion.span
                variants={saveStatus === "saving" ? subtlePulse : undefined}
                initial={saveStatus === "saving" ? "initial" : undefined}
                animate={saveStatus === "saving" ? "animate" : undefined}
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${saveStatusTone(
                  saveStatus
                )}`}
              >
                {saveStatusLabel(saveStatus)}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3 xl:flex-row xl:items-center"
        >
          <motion.div
            variants={panelSlideUp}
            className="flex items-center gap-2 rounded-xl bg-[#111522] p-1"
          >
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
              <Button
                type="button"
                size="icon-sm"
                variant={viewport === "desktop" ? "default" : "ghost"}
                onClick={() => onSelectViewport("desktop")}
              >
                <Laptop />
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
              <Button
                type="button"
                size="icon-sm"
                variant={viewport === "tablet" ? "default" : "ghost"}
                onClick={() => onSelectViewport("tablet")}
              >
                <Tablet />
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
              <Button
                type="button"
                size="icon-sm"
                variant={viewport === "mobile" ? "default" : "ghost"}
                onClick={() => onSelectViewport("mobile")}
              >
                <Smartphone />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={panelSlideUp}
            className="flex flex-wrap items-center gap-2"
          >
            <motion.select
              whileFocus={{ scale: 1.01 }}
              value={page?.id ?? ""}
              onChange={(event) => onChangePage(event.target.value)}
              className="h-10 rounded-md border border-white/8 bg-[#111522] px-3 text-sm text-[#dee2f5] outline-none transition focus:border-[#4fdbc8]/35"
            >
              {pages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} ({item.path})
                </option>
              ))}
            </motion.select>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                disabled={!canEdit}
                onClick={onCreatePage}
              >
                New page
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                onClick={onTogglePreview}
              >
                {isPreviewMode ? <MonitorSmartphone /> : <Eye />}
                {isPreviewMode ? "Exit preview" : "Preview"}
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                disabled={!canEdit || isSaving || !page}
                onClick={onSave}
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                Save
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
              <Button
                type="button"
                className="h-10 rounded-md bg-[#4fdbc8] text-[#03241f] hover:bg-[#46cfbd]"
                disabled={!canEdit || isPublishing || !project}
                onClick={onPublish}
              >
                {isPublishing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <UploadCloud />
                )}
                Publish
              </Button>
            </motion.div>

            {project ? (
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Button
                  asChild
                  type="button"
                  variant="outline"
                  className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                >
                  <Link href={`/analytics?projectId=${project.id}`}>Analytics</Link>
                </Button>
              </motion.div>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}
</file>

<file path="components/builder/canvas.tsx">
"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  MousePointer,
  Rows3,
  Trash2,
  Type,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cardReveal, easeBezier, subtlePulse } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { BuilderBlock, BuilderViewport } from "@/types/builder";

type CanvasProps = {
  blocks: BuilderBlock[];
  selectedBlockId: string | null;
  viewport: BuilderViewport;
  isPreviewMode: boolean;
  onSelectBlock: (blockId: string) => void;
  onRemoveBlock: (blockId: string) => void;
  onMoveBlock: (blockId: string, direction: "up" | "down") => void;
  canEdit?: boolean;
};

function getViewportClass(viewport: BuilderViewport) {
  switch (viewport) {
    case "mobile":
      return "max-w-sm";
    case "tablet":
      return "max-w-3xl";
    case "desktop":
    default:
      return "max-w-5xl";
  }
}

function blockIcon(type: BuilderBlock["type"]) {
  switch (type) {
    case "features":
      return Rows3;
    case "cta":
      return MousePointer;
    case "text":
      return Type;
    case "hero":
    default:
      return Rows3;
  }
}

function RenderBlock({ block }: { block: BuilderBlock }) {
  if (block.type === "hero") {
    return (
      <section className="rounded-2xl bg-[#0f1420] px-8 py-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          {block.props.title || "Hero title"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#c4cfdf]">
          {block.props.subtitle || "Hero subtitle"}
        </p>
        {block.props.buttonLabel ? (
          <div className="mt-6">
            <span className="inline-flex rounded-full bg-[#4fdbc8] px-5 py-3 text-sm font-semibold text-[#03241f]">
              {block.props.buttonLabel}
            </span>
          </div>
        ) : null}
      </section>
    );
  }

  if (block.type === "text") {
    return (
      <section className="rounded-2xl bg-[#0f1420] px-8 py-10">
        <h3 className="text-2xl font-bold text-white">
          {block.props.title || "Section title"}
        </h3>
        <p className="mt-4 text-base leading-7 text-[#c4cfdf]">
          {block.props.body || "Body text"}
        </p>
      </section>
    );
  }

  if (block.type === "features") {
    const items =
      block.props.items && block.props.items.length > 0
        ? block.props.items
        : ["Feature one", "Feature two", "Feature three"];

    return (
      <section className="rounded-2xl bg-[#0f1420] px-8 py-10">
        <h3 className="text-2xl font-bold text-white">
          {block.props.title || "Feature section"}
        </h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: index * 0.06, ease: easeBezier }}
              className="rounded-xl border border-white/8 bg-[#151b29] p-4 text-sm text-[#d7deea]"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-[#0f1420] px-8 py-10 text-center">
      <h3 className="text-2xl font-bold text-white">
        {block.props.title || "Call to action"}
      </h3>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#c4cfdf]">
        {block.props.subtitle || "CTA subtitle"}
      </p>
      {block.props.buttonLabel ? (
        <div className="mt-6">
          <span className="inline-flex rounded-full bg-[#4fdbc8] px-5 py-3 text-sm font-semibold text-[#03241f]">
            {block.props.buttonLabel}
          </span>
        </div>
      ) : null}
    </section>
  );
}

export default function Canvas({
  blocks,
  selectedBlockId,
  viewport,
  isPreviewMode,
  onSelectBlock,
  onRemoveBlock,
  onMoveBlock,
  canEdit = true,
}: CanvasProps) {
  if (blocks.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.42, ease: easeBezier }}
          className="max-w-md rounded-2xl border border-dashed border-white/12 bg-[#111522] px-6 py-10 text-center"
        >
          <h3 className="text-xl font-bold text-[#dee2f5]">No sections yet</h3>
          <p className="mt-3 text-sm leading-7 text-[#9aa6c0]">
            Start with a visible section from the left panel so the page quickly
            becomes understandable and editable.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="h-full overflow-auto bg-[#0b1020] p-6"
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
    >
      <motion.div
        layout
        className={cn("mx-auto space-y-5", getViewportClass(viewport))}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
      >
        {blocks.map((block, index) => {
          const Icon = blockIcon(block.type);
          const selected = selectedBlockId === block.id;

          return (
            <motion.div
              key={block.id}
              layout
              variants={cardReveal}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", stiffness: 170, damping: 20 }}
              className={cn(
                "rounded-[1.6rem] border border-transparent p-2 transition",
                selected && !isPreviewMode && "border-[#4fdbc8]/50 bg-[#101728]"
              )}
            >
              {!isPreviewMode ? (
                <motion.div
                  layout
                  className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-[#111522] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      variants={selected ? subtlePulse : undefined}
                      initial={selected ? "initial" : undefined}
                      animate={selected ? "animate" : undefined}
                      className="flex size-9 items-center justify-center rounded-lg bg-[#172c29] text-[#4fdbc8]"
                    >
                      <Icon className="size-4" />
                    </motion.div>

                    <div>
                      <div className="text-sm font-semibold capitalize text-[#dee2f5]">
                        {block.type} block
                      </div>
                      <div className="text-xs uppercase tracking-[0.18em] text-[#7f8aa3]">
                        Section {index + 1}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        className="text-[#9aa6c0]"
                        disabled={!canEdit}
                        onClick={() => onMoveBlock(block.id, "up")}
                      >
                        <ChevronUp />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        className="text-[#9aa6c0]"
                        disabled={!canEdit}
                        onClick={() => onMoveBlock(block.id, "down")}
                      >
                        <ChevronDown />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="border-white/8 bg-transparent text-[#dee2f5]"
                        onClick={() => onSelectBlock(block.id)}
                      >
                        Edit
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        className="text-[#f2b8b5]"
                        disabled={!canEdit}
                        onClick={() => onRemoveBlock(block.id)}
                      >
                        <Trash2 />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}

              <motion.div
                layout
                onClick={() => !isPreviewMode && onSelectBlock(block.id)}
                whileHover={!isPreviewMode ? { y: -2 } : undefined}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className={!isPreviewMode ? "cursor-pointer" : undefined}
              >
                <RenderBlock block={block} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
</file>

<file path="components/builder/properties-panel.tsx">
"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  panelSlideRight,
  sectionReveal,
  staggerFast,
} from "@/lib/motion";
import type { BuilderBlock } from "@/types/builder";

type PropertiesPanelProps = {
  block: BuilderBlock | null;
  canEdit?: boolean;
  onChange: (updater: Partial<BuilderBlock["props"]>) => void;
};

export default function PropertiesPanel({
  block,
  canEdit = true,
  onChange,
}: PropertiesPanelProps) {
  if (!block) {
    return (
      <motion.aside
        variants={panelSlideRight}
        initial="hidden"
        animate="visible"
        className="h-full border-l border-white/8 bg-[#111522] p-4"
      >
        <div className="rounded-xl border border-dashed border-white/10 bg-[#1a1f2d] p-5">
          <h3 className="text-base font-semibold text-[#dee2f5]">
            Select a block
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#9aa6c0]">
            Click a section on the canvas to edit its content and CTA details.
          </p>
        </div>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      variants={panelSlideRight}
      initial="hidden"
      animate="visible"
      className="h-full overflow-auto border-l border-white/8 bg-[#111522]"
    >
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        animate="visible"
        className="border-b border-white/8 px-4 py-4"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
          Properties
        </p>
        <h3 className="mt-2 text-lg font-bold capitalize text-[#dee2f5]">
          {block.type} block
        </h3>

        {!canEdit ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-start gap-2 rounded-lg bg-[#2a2418] px-3 py-3 text-sm text-[#ffcf7d]"
          >
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>You are in read-only mode for this builder.</span>
          </motion.div>
        ) : null}
      </motion.div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="space-y-5 p-4"
      >
        <motion.div variants={sectionReveal}>
          <Field>
            <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
              Title
            </FieldLabel>
            <FieldContent>
              <InputGroup className="min-h-11 rounded-xl border-white/8 bg-[#161b29]">
                <InputGroupInput
                  value={block.props.title ?? ""}
                  disabled={!canEdit}
                  onChange={(event) => onChange({ title: event.target.value })}
                  placeholder="Section title"
                  className="text-[#dee2f5] placeholder:text-white/20"
                />
              </InputGroup>
            </FieldContent>
          </Field>
        </motion.div>

        <motion.div variants={sectionReveal}>
          <Field>
            <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
              Subtitle
            </FieldLabel>
            <FieldContent>
              <InputGroup className="min-h-[96px] rounded-xl border-white/8 bg-[#161b29]">
                <InputGroupTextarea
                  value={block.props.subtitle ?? block.props.body ?? ""}
                  disabled={!canEdit}
                  onChange={(event) =>
                    onChange(
                      block.type === "text"
                        ? { body: event.target.value }
                        : { subtitle: event.target.value }
                    )
                  }
                  placeholder="Supporting text"
                  className="min-h-[96px] text-[#dee2f5] placeholder:text-white/20"
                />
              </InputGroup>
            </FieldContent>
          </Field>
        </motion.div>

        {block.type !== "features" ? (
          <>
            <motion.div variants={sectionReveal}>
              <Field>
                <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                  Button label
                </FieldLabel>
                <FieldContent>
                  <InputGroup className="min-h-11 rounded-xl border-white/8 bg-[#161b29]">
                    <InputGroupInput
                      value={block.props.buttonLabel ?? ""}
                      disabled={!canEdit}
                      onChange={(event) =>
                        onChange({ buttonLabel: event.target.value })
                      }
                      placeholder="Get started"
                      className="text-[#dee2f5] placeholder:text-white/20"
                    />
                  </InputGroup>
                </FieldContent>
              </Field>
            </motion.div>

            <motion.div variants={sectionReveal}>
              <Field>
                <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                  Button link
                </FieldLabel>
                <FieldContent>
                  <InputGroup className="min-h-11 rounded-xl border-white/8 bg-[#161b29]">
                    <InputGroupInput
                      value={block.props.buttonHref ?? ""}
                      disabled={!canEdit}
                      onChange={(event) =>
                        onChange({ buttonHref: event.target.value })
                      }
                      placeholder="#"
                      className="text-[#dee2f5] placeholder:text-white/20"
                    />
                  </InputGroup>
                </FieldContent>
              </Field>
            </motion.div>
          </>
        ) : (
          <motion.div variants={sectionReveal}>
            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Feature items
              </FieldLabel>
              <FieldContent>
                <InputGroup className="min-h-[140px] rounded-xl border-white/8 bg-[#161b29]">
                  <InputGroupTextarea
                    value={(block.props.items ?? []).join("\n")}
                    disabled={!canEdit}
                    onChange={(event) =>
                      onChange({
                        items: event.target.value
                          .split("\n")
                          .map((item) => item.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder={"Fast setup\nClear collaboration\nConfident publishing"}
                    className="min-h-[140px] text-[#dee2f5] placeholder:text-white/20"
                  />
                </InputGroup>
              </FieldContent>
            </Field>
          </motion.div>
        )}
      </motion.div>
    </motion.aside>
  );
}
</file>

<file path="components/layout/app-shell.tsx">
"use client";

import { motion } from "framer-motion";
import Sidebar from "@/components/navigation/sidebar";
import Topbar from "@/components/navigation/topbar";
import { pageReveal } from "@/lib/motion";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
     
      <Sidebar />

      <SidebarInset className="min-h-screen bg-[#0b1020] text-[#dee2f5]">
        <Topbar />

        <motion.main
          variants={pageReveal}
          initial="hidden"
          animate="visible"
          className="w-full px-4 py-6 md:px-6 lg:px-8"
        >
          {children}
        </motion.main>
      </SidebarInset>
    </SidebarProvider>
  );
}
</file>

<file path="components/layout/page-header.tsx">
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pageReveal, sectionReveal, pulseGlow, staggerFast } from "@/lib/motion";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  action?: ReactNode;
  className?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  badge,
  action,
  className,
}: PageHeaderProps) {
  return (
    <motion.div
      variants={pageReveal}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden pb-2 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <motion.div
        variants={pulseGlow}
        initial="initial"
        animate="animate"
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 top-0 h-24 w-24 rounded-full bg-[#4fdbc8]/10 blur-2xl"
      />

      <motion.div variants={staggerFast} className="relative max-w-4xl">
        {eyebrow ? (
          <motion.div
            variants={sectionReveal}
            className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4fdbc8]"
          >
            {eyebrow}
          </motion.div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <motion.h1
            variants={sectionReveal}
            className="font-heading text-4xl font-extrabold tracking-[-0.05em] text-[#e7ebf7] sm:text-5xl"
          >
            {title}
          </motion.h1>

          {badge ? (
            <motion.div
              variants={sectionReveal}
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Badge className="rounded-full border border-[#4fdbc8]/15 bg-[#4fdbc8]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#71f8e4] hover:bg-[#4fdbc8]/10">
                {badge}
              </Badge>
            </motion.div>
          ) : null}
        </div>

        {description ? (
          <motion.p
            variants={sectionReveal}
            className="mt-4 max-w-3xl text-base leading-8 text-[#b8c3d9] md:text-lg"
          >
            {description}
          </motion.p>
        ) : null}
      </motion.div>

      {action ? (
        <motion.div
          variants={sectionReveal}
          whileHover={{ y: -2 }}
          className="relative shrink-0 self-start md:self-auto"
        >
          {action}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
</file>

<file path="components/marketing/features.tsx">
"use client";

import { BarChart3, Boxes, PenSquare, Users2 } from "lucide-react";
import { motion } from "framer-motion";

import { cardReveal, floatingOrb, pageReveal, staggerContainer, staggerFast } from "@/lib/motion";

const features = [
  {
    title: "Visual editing that stays structured",
    description:
      "Move quickly with a builder that keeps sections clear, reusable, and easy for teams to manage.",
    icon: PenSquare,
  },
  {
    title: "Workspace-aware collaboration",
    description:
      "Invite teammates, manage roles, and keep every workspace isolated without losing speed.",
    icon: Users2,
  },
  {
    title: "Composable site systems",
    description:
      "Build branded landing pages from flexible blocks instead of fragile one-off layouts.",
    icon: Boxes,
  },
  {
    title: "Analytics with signal first",
    description:
      "Focus on the metrics that matter with readable charts, top pages, and source.",
    icon: BarChart3,
  },
];

export default function Features() {
  return (
    <motion.section
      variants={pageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className="relative mx-auto max-w-7xl overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <motion.div
        variants={floatingOrb}
        initial="initial"
        animate="animate"
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full bg-[#4fdbc8]/8 blur-3xl"
      />

      <motion.div variants={staggerFast} className="mb-10 space-y-3">
        <motion.p
          variants={cardReveal}
          className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#4fdbc8]"
        >
          Capabilities
        </motion.p>
        <motion.h2
          variants={cardReveal}
          className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5] sm:text-5xl"
        >
          Engineered for Velocity.
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid gap-4 md:grid-cols-2"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              variants={cardReveal}
              whileHover={{
                y: -10,
                rotateX: -5,
                rotateY: index % 2 === 0 ? -4 : 4,
                boxShadow: "0 28px 90px rgba(0,0,0,0.34)",
              }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className={`group rounded-2xl border border-white/6 bg-[#161b29]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)] ${
                index === 0 ? "md:col-span-1" : ""
              }`}
              style={{ transformPerspective: 1400 }}
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="mb-6 flex size-9 items-center justify-center rounded-lg bg-[#1e2433] text-[#4fdbc8]"
              >
                <Icon className="size-4" />
              </motion.div>

              <h3 className="font-heading text-lg font-bold text-[#dee2f5]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#b8c3d9]">
                {feature.description}
              </p>

              <motion.div
                className="mt-5 rounded-xl border border-white/6 bg-[#1a1f2d] p-4"
                whileHover={{ borderColor: "rgba(79,219,200,0.22)" }}
              >
                <motion.div
                  className="h-24 rounded-lg bg-[linear-gradient(180deg,rgba(79,219,200,0.1),rgba(79,219,200,0.02))]"
                  animate={{
                    opacity: [0.7, 1, 0.82],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={cardReveal}
        className="mt-12 max-w-3xl"
      >
        <div className="text-3xl leading-tight text-[#dee2f5]">
          <span className="mr-2 text-[#4fdbc8]">”</span>
          SiteOrbit has fundamentally shifted how our agency ships digital
          experiences. The separation of concerns between design and data
          management is handled with surgical precision.
          <span className="mr-2 text-[#4fdbc8]">”</span>
        </div>

        <motion.div
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="mt-6 flex items-center gap-3"
        >
          <div className="size-9 rounded-lg bg-[#74f5e3]" />
          <div>
            <p className="text-sm font-medium text-[#dee2f5]">Marcus Thorne</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[#7f8aa3]">
              CEO @ Helix Creative
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
</file>

<file path="components/marketing/hero.tsx">
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-none border-0 bg-transparent px-4 pt-4 sm:px-6 lg:px-8">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between py-3">
        <div className="font-heading text-lg font-bold tracking-tight text-[#dee2f5]">
          SiteOrbit
        </div>

        <nav className="hidden items-center gap-8 text-sm text-[#b8c3d9] md:flex">
          <Link href="/">Studios</Link>
          <Link href="/">Templates</Link>
          <Link href="/">Pricing</Link>
          <Link href="/">Resources</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-[#dee2f5] transition-colors hover:text-white"
          >
            Sign In
          </Link>
          <Button
            asChild
            className="h-9 rounded-md px-4 text-sm font-medium"
          >
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-2 pb-8 pt-10 text-center sm:pt-14 lg:pt-16">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.26em] text-[#74f5e3]">
          <span className="size-1.5 rounded-full bg-[#4fdbc8]" />
          Build your orbit
        </div>

        <h1 className="max-w-4xl font-heading text-5xl font-extrabold tracking-tight text-[#dee2f5] sm:text-6xl lg:text-7xl">
          Design Your <span className="text-[#74dfff]">Orbit.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#b8c3d9] sm:text-lg">
          A multi-tenant SaaS website builder for modern teams to create,
          collaborate, and monitor analytics in one workspace.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-11 rounded-md px-6 text-sm font-medium">
            <Link href="/sign-up">Start Building</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-md border-white/10 px-6 text-sm text-[#dee2f5]"
          >
            <Link href="/">View Demo</Link>
          </Button>
        </div>

        <div className="mt-12 w-full rounded-2xl bg-[#e6e6e6] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:p-10 lg:mt-16 lg:p-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-black/30 bg-[#111827] shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="size-2 rounded-full bg-white/20" />
              <span className="size-2 rounded-full bg-white/20" />
              <span className="size-2 rounded-full bg-white/20" />
            </div>

            <div className="grid gap-4 p-4 lg:grid-cols-[0.95fr_1.05fr] lg:p-6">
              <div className="space-y-4 rounded-xl bg-[#0f1724] p-4">
                <div className="h-3 w-24 rounded bg-white/10" />
                <div className="space-y-3">
                  <div className="h-9 rounded-md bg-white/5" />
                  <div className="h-9 rounded-md bg-white/5" />
                  <div className="h-9 rounded-md bg-white/5" />
                  <div className="h-9 rounded-md bg-white/5" />
                </div>
                <div className="h-28 rounded-xl bg-[linear-gradient(180deg,rgba(79,219,200,0.14),rgba(79,219,200,0.02))]" />
              </div>

              <div className="space-y-4 rounded-xl bg-[#0f1724] p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-28 rounded-xl bg-[linear-gradient(180deg,rgba(116,223,255,0.16),rgba(116,223,255,0.03))]" />
                  <div className="h-28 rounded-xl bg-[linear-gradient(180deg,rgba(79,219,200,0.14),rgba(79,219,200,0.03))]" />
                </div>
                <div className="h-52 rounded-xl bg-[linear-gradient(180deg,rgba(116,223,255,0.18),rgba(116,223,255,0.02))]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
</file>

<file path="components/marketing/pricing-teaser.tsx">
import Link from "next/link";

import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    suffix: "/mo",
    points: ["Up to 3 Projects", "Basic Analytics"],
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Professional",
    price: "$129",
    suffix: "/mo",
    points: ["Unlimited Projects", "Advanced Team Roles"],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "",
    points: ["White Label Solution", "Priority Support"],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function PricingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5] sm:text-5xl">
          Simple, Premium Tiers.
        </h2>
        <p className="mt-3 text-sm text-[#b8c3d9]">
          No hidden fees. Scale with your growth.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl border p-6 ${
              tier.featured
                ? "border-[#4fdbc8] bg-[#131b2a] shadow-[0_0_0_1px_rgba(79,219,200,0.25),0_30px_90px_rgba(0,0,0,0.3)]"
                : "border-white/6 bg-[#161b29]"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#9aa6c0]">
                {tier.name}
              </p>
              {tier.featured ? (
                <span className="rounded-full bg-[#4fdbc8] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00201c]">
                  Popular
                </span>
              ) : null}
            </div>

            <div className="flex items-end gap-1">
              <span className="font-heading text-5xl font-extrabold text-[#dee2f5]">
                {tier.price}
              </span>
              {tier.suffix ? (
                <span className="pb-2 text-sm text-[#9aa6c0]">{tier.suffix}</span>
              ) : null}
            </div>

            <div className="mt-8 space-y-3">
              {tier.points.map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-[#c9d1e4]">
                  <span className="size-2 rounded-full bg-[#4fdbc8]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              variant={tier.featured ? "default" : "outline"}
              className="mt-8 h-12 w-full rounded-md"
            >
              <Link href="/sign-up">{tier.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-24 rounded-[2rem] bg-[linear-gradient(180deg,rgba(10,20,36,0.4),rgba(10,20,36,0.8))] px-6 py-20 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5] sm:text-5xl">
          Ready to launch?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#b8c3d9]">
          Join over 1,500 teams building the future of the web on SiteOrbit.
        </p>
        <Button asChild className="mt-8 h-12 rounded-md px-8">
          <Link href="/sign-up">Get Started for Free</Link>
        </Button>
      </div>
    </section>
  );
}
</file>

<file path="components/navigation/sidebar.tsx">
"use client";

import Link from "next/link";
import { HelpCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useWorkspace } from "@/hooks/use-workspace";
import { appNavigation, type AppNavigationItem } from "@/lib/constants/navigation";
import { easeBezier } from "@/lib/motion";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import WorkspaceSwitcher from "@/components/navigation/workspace-switcher";

export default function Sidebar() {
  const pathname = usePathname();
  const { activeWorkspace } = useWorkspace();

  const workspaceName = activeWorkspace?.workspace.name ?? "Main Workspace";

  return (
    <UISidebar className="border-r border-white/6 bg-[#0f1420]">
      <SidebarHeader className="border-b border-white/6 px-4 py-5">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.38, ease: easeBezier }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.06, rotate: -6 }}
            className="flex size-11 items-center justify-center rounded-2xl bg-[#172c29] text-[#4fdbc8]"
          >
            <span className="font-heading text-lg font-black">S</span>
          </motion.div>

          <div className="min-w-0">
            <h1 className="truncate font-heading text-lg font-black tracking-tight text-[#4fdbc8]">
              SiteOrbit Pro
            </h1>
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              {workspaceName}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.06, ease: easeBezier }}
          className="mt-4 px-2"
        >
          <WorkspaceSwitcher />
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu className="gap-1">
          {appNavigation.map((item: AppNavigationItem, index: number) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.28,
                  delay: 0.03 * index,
                  ease: easeBezier,
                }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className={
                      isActive
                        ? "rounded-md bg-gradient-to-r from-[#4fdbc8] to-[#14b8a6] text-white shadow-[0_0_10px_rgba(79,219,200,0.2)] hover:text-white"
                        : "rounded-md text-slate-400 hover:bg-[#1a1f2d] hover:text-white"
                    }
                  >
                    <Link href={item.href}>
                      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                        <Icon className="size-4" />
                        <span className="font-body text-sm font-medium">
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </motion.div>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4 pb-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, delay: 0.12, ease: easeBezier }}
          className="mb-4 rounded-xl bg-[#161b29] px-4 py-4"
        >
          <div className="mb-2 flex justify-between text-[11px]">
            <span className="font-medium text-[#bbcac6]">Plan Usage</span>
            <span className="font-bold text-[#4fdbc8]">65%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#303443]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 0.8, delay: 0.18, ease: easeBezier }}
              className="h-full rounded-full bg-[#4fdbc8]"
            />
          </div>
          <p className="mt-2 text-[10px] text-slate-500">12 of 20 sites active</p>
        </motion.div>

        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Support"
              className="rounded-md text-slate-400 hover:bg-[#1a1f2d] hover:text-white"
            >
              <HelpCircle className="size-4" />
              <span className="font-body text-sm font-medium">Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="rounded-md text-slate-400 hover:bg-[#1a1f2d] hover:text-white"
            >
              <LogOut className="size-4" />
              <span className="font-body text-sm font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </UISidebar>
  );
}
</file>

<file path="components/navigation/topbar.tsx">
"use client";

import { Bell, Grid2x2, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import UserMenu from "@/components/navigation/user-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { sectionReveal, staggerFast } from "@/lib/motion";

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/projects")) return "Projects";
  if (pathname.startsWith("/builder")) return "Builder";
  if (pathname.startsWith("/analytics")) return "Analytics";
  if (pathname.startsWith("/team")) return "Team";
  if (pathname.startsWith("/templates")) return "Templates";
  if (pathname.startsWith("/domains")) return "Domains";
  if (pathname.startsWith("/settings")) return "Settings";
  return "SiteOrbit";
}

export default function Topbar() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <motion.header
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-30 flex h-16 items-center justify-between overflow-hidden border-b border-white/6 bg-[#0e1320]/70 px-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:px-8"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_left,rgba(79,219,200,0.12),transparent_68%)]"
        animate={{
          opacity: [0.45, 0.8, 0.5],
          x: [0, 12, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="relative flex items-center gap-4 md:gap-6"
      >
        <motion.div variants={sectionReveal}>
          <SidebarTrigger className="md:hidden" />
        </motion.div>

        <motion.h2
          variants={sectionReveal}
          key={pageTitle}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-2xl font-bold tracking-tighter text-[#dee2f5]"
        >
          {pageTitle}
        </motion.h2>

        <motion.div
          variants={sectionReveal}
          className="relative hidden w-80 lg:block"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
        >
          <InputGroup className="rounded-md border border-white/6 bg-[#090e1b]/92 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
            <InputGroupAddon>
              <motion.div
                animate={{ rotate: [0, 8, -6, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Search className="size-4 text-[#859490]" />
              </motion.div>
            </InputGroupAddon>
            <InputGroupInput
              placeholder={`Search ${pageTitle.toLowerCase()}...`}
              className="bg-transparent text-sm text-[#dee2f5] placeholder:text-[#859490]"
            />
          </InputGroup>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        className="relative flex items-center gap-4"
      >
        <motion.button
          variants={sectionReveal}
          whileHover={{ y: -2, scale: 1.04, rotate: -6 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full p-2 text-slate-400 transition-colors duration-200 hover:bg-[#303443]/50 hover:text-white"
        >
          <Bell className="size-5" />
        </motion.button>

        <motion.button
          variants={sectionReveal}
          whileHover={{ y: -2, scale: 1.04, rotate: 6 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full p-2 text-slate-400 transition-colors duration-200 hover:bg-[#303443]/50 hover:text-white"
        >
          <Grid2x2 className="size-5" />
        </motion.button>

        <motion.div
          variants={sectionReveal}
          whileHover={{ y: -2, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <UserMenu />
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
</file>

<file path="components/navigation/user-menu.tsx">
"use client";

import { CreditCard, LogOut, Settings, Shield, UserCircle2 } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(name?: string | null) {
  if (!name) return "SO";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function UserMenu() {
  const { user } = useAuthStore();
  const { signOut } = useAuth();

  const displayName = user?.name ?? "SiteOrbit User";
  const displayEmail = user?.email ?? "user@siteorbit.app";

  const handleSignOut = async () => {
    await signOut();
    window.location.replace("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#161b29] px-2 py-1.5 transition-colors hover:bg-[#1d2433]">
          <Avatar className="ring-2 ring-[#4fdbc8]/15">
            <AvatarImage src={user?.avatar ?? undefined} alt={displayName} />
            <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
          </Avatar>

          <div className="hidden text-left sm:block">
            <div className="max-w-[140px] truncate text-sm font-medium text-[#dee2f5]">
              {displayName}
            </div>
            <div className="max-w-[140px] truncate text-xs text-[#bbcac6]">
              {displayEmail}
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl border-white/8 bg-[#1a1f2d] text-[#dee2f5]"
      >
        <DropdownMenuLabel className="space-y-2">
          <div className="flex items-center gap-3">
            <Avatar className="ring-2 ring-[#4fdbc8]/15">
              <AvatarImage src={user?.avatar ?? undefined} alt={displayName} />
              <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <div className="truncate font-medium">{displayName}</div>
              <div className="truncate text-xs font-normal text-[#bbcac6]">
                {displayEmail}
              </div>
            </div>
          </div>

          <Badge className="mt-1 rounded-full bg-[#182b28] text-[#4fdbc8]">
            Signed in
          </Badge>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/8" />

        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:bg-[#252a38] focus:text-white">
            <UserCircle2 className="size-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-[#252a38] focus:text-white">
            <Settings className="size-4" />
            Preferences
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-[#252a38] focus:text-white">
            <Shield className="size-4" />
            Security
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-[#252a38] focus:text-white">
            <CreditCard className="size-4" />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/8" />

        <DropdownMenuItem
          onClick={() => void handleSignOut()}
          className="text-red-300 focus:bg-[#3a1f25] focus:text-red-200"
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
</file>

<file path="components/navigation/workspace-switcher.tsx">
"use client";

import { Check, ChevronsUpDown, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useWorkspace } from "@/hooks/use-workspace";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function getPlanLabel(plan?: string | null) {
  if (!plan) return "Free";
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

export default function WorkspaceSwitcher() {
  const {
    workspaces,
    activeWorkspace,
    setActiveWorkspaceId,
    createWorkspaceMutation,
  } = useWorkspace();

  const [isOpen, setIsOpen] = useState(false);

 
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");

  const displayWorkspace = activeWorkspace?.workspace ?? null;
  const displayName = displayWorkspace?.name ?? "Select workspace";
  const displayPlan = getPlanLabel(displayWorkspace?.plan);

 
  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) return;

    try {
      await createWorkspaceMutation.mutateAsync({
        name: workspaceName.trim(),
      });

      toast.success("Workspace created successfully.");
      setWorkspaceName("");
      setIsCreateOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Workspace could not be created."
      );
    }
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-full justify-between rounded-xl border-white/8 bg-[#111522] px-3 text-left text-[#dee2f5] hover:bg-[#171c2a]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#172c29] text-[#4fdbc8]">
                <Sparkles className="size-4" />
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">
                  {displayName}
                </div>
                <div className="truncate text-xs text-[#9aa6c0]">
                  {activeWorkspace?.role
                    ? `${activeWorkspace.role} • ${displayPlan}`
                    : displayPlan}
                </div>
              </div>
            </div>

            <ChevronsUpDown className="size-4 shrink-0 text-[#9aa6c0]" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-[280px] rounded-xl border-white/8 bg-[#1a1f2d] text-[#dee2f5]"
        >
          <div className="px-2 py-2">
            <div className="text-xs uppercase tracking-[0.18em] text-[#7f8aa3]">
              Workspaces
            </div>
          </div>

          <DropdownMenuGroup>
            {workspaces.map((entry) => {
              const isActive =
                entry.workspace.id === activeWorkspace?.workspace.id;

              return (
                <DropdownMenuItem
                  key={entry.workspace.id}
                  onClick={() => setActiveWorkspaceId(entry.workspace.id)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 focus:bg-[#252a38] focus:text-white",
                    isActive && "bg-[#202634]"
                  )}
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">
                      {entry.workspace.name}
                    </div>
                    <div className="truncate text-xs text-[#9aa6c0]">
                      {entry.role} • {getPlanLabel(entry.workspace.plan)}
                    </div>
                  </div>

                  <div className="ml-3 flex items-center gap-2">
                    {entry.workspace.plan?.toLowerCase() !== "free" ? (
                      <Badge className="rounded-full bg-[#182b28] text-[#4fdbc8]">
                        {getPlanLabel(entry.workspace.plan)}
                      </Badge>
                    ) : null}
                    {isActive ? (
                      <Check className="size-4 text-[#4fdbc8]" />
                    ) : null}
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-white/8" />

          <DropdownMenuItem
            onClick={() => setIsCreateOpen(true)} // ✅ OPEN MODAL
            disabled={createWorkspaceMutation.isPending}
            className="rounded-lg px-3 py-2 focus:bg-[#252a38] focus:text-white"
          >
            <Plus className="mr-2 size-4" />
            {createWorkspaceMutation.isPending
              ? "Creating workspace..."
              : "Create workspace"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-[#1a1f2d] text-[#dee2f5] border-white/10">
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="bg-[#090e1b]"
            autoFocus
          />

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
            >
              Cancel
            </Button>

            <Button
              onClick={() => void handleCreateWorkspace()}
              disabled={createWorkspaceMutation.isPending}
            >
              {createWorkspaceMutation.isPending
                ? "Creating..."
                : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
</file>

<file path="components/projects/project-card.tsx">
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  Globe,
  Loader2,
  PencilLine,
  Trash2,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cardReveal, easeBezier, subtlePulse } from "@/lib/motion";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  canManage: boolean;
  onPublish: (projectId: string) => void;
  onUnpublish: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  isPublishing?: boolean;
  isUnpublishing?: boolean;
  isDeleting?: boolean;
};

function getStatusClasses(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "published") {
    return "bg-[#12251f] text-[#4fdbc8]";
  }

  if (normalized === "archived") {
    return "bg-[#2a2430] text-[#d7b4ff]";
  }

  return "bg-[#2a2418] text-[#ffcf7d]";
}

function formatUpdatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";

  return `Updated ${date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}`;
}

export default function ProjectCard({
  project,
  canManage,
  onPublish,
  onUnpublish,
  onDelete,
  isPublishing = false,
  isUnpublishing = false,
  isDeleting = false,
}: ProjectCardProps) {
  const isPublished = project.status === "published";
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <CardTitle className="truncate text-xl font-bold text-[#dee2f5]">
                {project.name}
              </CardTitle>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: easeBezier }}
                className="mt-2 line-clamp-2 text-sm leading-6 text-[#bbcac6]"
              >
                {project.description?.trim() || "No project description added yet."}
              </motion.p>
            </div>

            <motion.span
              layout
              variants={isPublishing || isUnpublishing ? subtlePulse : undefined}
              initial={isPublishing || isUnpublishing ? "initial" : undefined}
              animate={isPublishing || isUnpublishing ? "animate" : undefined}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClasses(
                project.status
              )}`}
            >
              {project.status}
            </motion.span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.04, ease: easeBezier }}
            className="flex items-center gap-2 text-sm text-[#9aa6c0]"
          >
            <Globe className="size-4 text-[#4fdbc8]" />
            <span>{formatUpdatedAt(project.updated_at)}</span>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                asChild
                type="button"
                variant="outline"
                className="h-10 w-full rounded-md border-white/8 bg-transparent text-[#dee2f5]"
              >
                <Link href={`/builder?projectId=${project.id}`}>
                  <PencilLine data-icon="inline-start" />
                  Open Builder
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button
                asChild
                type="button"
                variant="outline"
                className="h-10 w-full rounded-md border-white/8 bg-transparent text-[#dee2f5]"
              >
                <Link href={`/analytics?projectId=${project.id}`}>
                  <BarChart3 data-icon="inline-start" />
                  Analytics
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-white/8 bg-[#151a27]">
          {canManage ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                  {isPublished ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                      disabled={isUnpublishing}
                      onClick={() => onUnpublish(project.id)}
                    >
                      {isUnpublishing ? (
                        <Loader2 className="animate-spin" />
                      ) : null}
                      Unpublish
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="h-10 rounded-md bg-[#4fdbc8] text-[#03241f] hover:bg-[#46cfbd]"
                      disabled={isPublishing}
                      onClick={() => onPublish(project.id)}
                    >
                      {isPublishing ? <Loader2 className="animate-spin" /> : null}
                      Publish
                    </Button>
                  )}
                </motion.div>
              </div>

              <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 rounded-md text-[#f2b8b5] hover:bg-[#2b1d1d] hover:text-[#ffd3d1]"
                    >
                      <Trash2 data-icon="inline-start" />
                      Delete
                    </Button>
                  </motion.div>
                </AlertDialogTrigger>

                <AlertDialogContent className="border-white/8 bg-[#1a1f2d] text-[#dee2f5]">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-[#2a1d1d] text-[#f2b8b5]">
                      <AlertTriangle />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete project?</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#9aa6c0]">
                      This will remove <span className="font-semibold text-[#dee2f5]">{project.name}</span> and its related pages from the current workspace.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="border-white/10 bg-transparent text-[#dee2f5] hover:bg-white/[0.03]"
                      disabled={isDeleting}
                    >
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      variant="destructive"
                      className="bg-[#c45a4f] text-white hover:bg-[#b64f44]"
                      disabled={isDeleting}
                      onClick={() => {
                        onDelete(project.id);
                        setDeleteDialogOpen(false);
                      }}
                    >
                      {isDeleting ? "Deleting..." : "Delete project"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <span className="text-sm text-[#9aa6c0]">
              View-only access
            </span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
</file>

<file path="components/projects/project-grid.tsx">
"use client";

import { motion } from "framer-motion";

import ProjectCard from "@/components/projects/project-card";
import { staggerContainer } from "@/lib/motion";
import type { Project } from "@/types/project";

type ProjectGridProps = {
  projects: Project[];
  canManage: boolean;
  onPublish: (projectId: string) => void;
  onUnpublish: (projectId: string) => void;
  onDelete: (projectId: string) => void;
  activePublishId?: string | null;
  activeUnpublishId?: string | null;
  activeDeleteId?: string | null;
};

export default function ProjectGrid({
  projects,
  canManage,
  onPublish,
  onUnpublish,
  onDelete,
  activePublishId = null,
  activeUnpublishId = null,
  activeDeleteId = null,
}: ProjectGridProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          canManage={canManage}
          onPublish={onPublish}
          onUnpublish={onUnpublish}
          onDelete={onDelete}
          isPublishing={activePublishId === project.id}
          isUnpublishing={activeUnpublishId === project.id}
          isDeleting={activeDeleteId === project.id}
        />
      ))}
    </motion.div>
  );
}
</file>

<file path="components/providers/query-provider.tsx">
"use client";

import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { syncAuthCookieFromStorage } from "@/lib/auth/session";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 30_000,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  useEffect(() => {
    syncAuthCookieFromStorage();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
</file>

<file path="components/providers/theme-provider.tsx">
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { defaultTheme } from "@/lib/constants/theme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
</file>

<file path="components/settings/settings-nav.tsx">
"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type SettingsTab =
  | "workspace"
  | "branding"
  | "domains"
  | "api"
  | "billing";

type SettingsNavProps = {
  value: SettingsTab;
  onValueChange: (value: SettingsTab) => void;
};

export default function SettingsNav({
  value,
  onValueChange,
}: SettingsNavProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as SettingsTab)}
      className="w-full"
    >
      <TabsList className="h-auto w-fit rounded-xl bg-[#161b29] p-1">
        <TabsTrigger value="workspace" className="rounded-lg px-6 py-2.5">
          Workspace
        </TabsTrigger>
        <TabsTrigger value="branding" className="rounded-lg px-6 py-2.5">
          Branding
        </TabsTrigger>
        <TabsTrigger value="domains" className="rounded-lg px-6 py-2.5">
          Domains
        </TabsTrigger>
        <TabsTrigger value="api" className="rounded-lg px-6 py-2.5">
          API
        </TabsTrigger>
        <TabsTrigger value="billing" className="rounded-lg px-6 py-2.5">
          Billing
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
</file>

<file path="components/shared/empty-state.tsx">
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cardReveal, panelSlideUp, staggerContainer } from "@/lib/motion";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
};

export function EmptyStatePrimaryAction({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
      <Button {...props}>{children}</Button>
    </motion.div>
  );
}

export function EmptyStateSecondaryAction({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
      <Button variant="outline" {...props}>
        {children}
      </Button>
    </motion.div>
  );
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const resolvedPrimaryAction = primaryAction ?? action;

  return (
    <motion.section
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      className={`relative overflow-hidden rounded-2xl border border-dashed border-white/10 bg-[#1a1f2d] p-8 md:p-10 ${className ?? ""}`}
    >
      <motion.div
        className="absolute -right-12 bottom-0 size-28 rounded-full bg-[#4fdbc8]/8 blur-3xl"
        animate={{
          x: [0, -8, 4, 0],
          y: [0, 6, -4, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center text-center"
      >
        <motion.div
          variants={panelSlideUp}
          whileHover={{ y: -2, scale: 1.04, rotate: -6 }}
          className="flex size-14 items-center justify-center rounded-2xl bg-[#172c29] text-[#4fdbc8]"
        >
          {icon ?? <Sparkles className="size-6" />}
        </motion.div>

        <motion.h2
          variants={panelSlideUp}
          className="mt-5 font-heading text-2xl font-bold text-[#dee2f5]"
        >
          {title}
        </motion.h2>

        {description ? (
          <motion.p
            variants={panelSlideUp}
            className="mt-3 max-w-2xl text-sm leading-7 text-[#9aa6c0]"
          >
            {description}
          </motion.p>
        ) : null}

        {(resolvedPrimaryAction || secondaryAction) ? (
          <motion.div
            variants={panelSlideUp}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            {resolvedPrimaryAction}
            {secondaryAction}
          </motion.div>
        ) : null}
      </motion.div>
    </motion.section>
  );
}
</file>

<file path="components/shared/error-state.tsx">
"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

import { panelSlideUp, staggerContainer } from "@/lib/motion";

type ErrorStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function ErrorState({
  title,
  description,
  action,
}: ErrorStateProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-2xl border border-[#f2b8b5]/14 bg-[#1a1f2d] p-8 md:p-10"
    >
      <motion.div
        className="absolute -left-10 top-10 size-24 rounded-full bg-[#f2b8b5]/8 blur-3xl"
        animate={{
          x: [0, 8, -4, 0],
          y: [0, -6, 5, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={panelSlideUp}
        className="relative flex flex-col items-center text-center"
      >
        <motion.div
          whileHover={{ y: -2, scale: 1.03 }}
          className="flex size-14 items-center justify-center rounded-2xl bg-[#2b1d1d] text-[#f2b8b5]"
        >
          <AlertTriangle className="size-6" />
        </motion.div>

        <motion.h2
          variants={panelSlideUp}
          className="mt-5 font-heading text-2xl font-bold text-[#dee2f5]"
        >
          {title}
        </motion.h2>

        {description ? (
          <motion.p
            variants={panelSlideUp}
            className="mt-3 max-w-xl text-sm leading-7 text-[#9aa6c0]"
          >
            {description}
          </motion.p>
        ) : null}

        {action ? (
          <motion.div variants={panelSlideUp} className="mt-6">
            {action}
          </motion.div>
        ) : null}
      </motion.div>
    </motion.section>
  );
}
</file>

<file path="components/shared/loading-state.tsx">
"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { easeBezier, staggerContainer, panelSlideUp, subtlePulse } from "@/lib/motion";

type LoadingStateProps = {
  title: string;
  description?: string;
  compact?: boolean;
};

export default function LoadingState({
  title,
  description,
  compact = false,
}: LoadingStateProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`relative overflow-hidden rounded-2xl border border-white/8 bg-[#1a1f2d] ${
        compact ? "p-6" : "p-8 md:p-10"
      }`}
    >
      <motion.div
        className="absolute -right-12 -top-12 size-28 rounded-full bg-[#4fdbc8]/8 blur-3xl"
        animate={{
          x: [0, 10, -4, 0],
          y: [0, -8, 6, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={panelSlideUp}
        className="relative flex flex-col items-center text-center"
      >
        <motion.div
          variants={subtlePulse}
          initial="initial"
          animate="animate"
          className="flex size-14 items-center justify-center rounded-2xl bg-[#172c29] text-[#4fdbc8]"
        >
          <Loader2 className="size-6 animate-spin" />
        </motion.div>

        <motion.h2
          variants={panelSlideUp}
          className="mt-5 font-heading text-2xl font-bold text-[#dee2f5]"
        >
          {title}
        </motion.h2>

        {description ? (
          <motion.p
            variants={panelSlideUp}
            className="mt-3 max-w-xl text-sm leading-7 text-[#9aa6c0]"
          >
            {description}
          </motion.p>
        ) : null}

        <motion.div
          variants={panelSlideUp}
          className="mt-6 flex w-full max-w-sm flex-col gap-3"
        >
          <div className="h-3 overflow-hidden rounded-full bg-white/6">
            <motion.div
              className="h-full rounded-full bg-[#4fdbc8]"
              initial={{ width: "18%" }}
              animate={{ width: ["18%", "72%", "46%", "86%"] }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: easeBezier,
              }}
            />
          </div>

          {!compact ? (
            <>
              <div className="h-3 rounded-full bg-white/6" />
              <div className="h-3 w-4/5 self-center rounded-full bg-white/6" />
            </>
          ) : null}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
</file>

<file path="components/shared/logo.tsx">
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  collapsed?: boolean;
  className?: string;
};

export default function Logo({
  href = "/",
  collapsed = false,
  className,
}: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex size-11 items-center justify-center rounded-xl bg-[#71f8e4] text-[#00201c] shadow-[0_12px_30px_rgba(79,219,200,0.18)]">
        <Sparkles className="size-4" />
      </div>

      {!collapsed && (
        <div className="min-w-0">
          <div className="truncate font-heading text-[1.75rem] font-bold tracking-tight text-[#dee2f5]">
            SiteOrbit
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Link href={href} className="outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {content}
    </Link>
  );
}
</file>

<file path="components/team/invite-member-modal.tsx">
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailPlus, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  inviteMemberSchema,
  type InviteMemberSchema,
} from "@/lib/validators/workspace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  authContainerVariants,
  authItemVariants,
} from "@/components/auth/auth-form-motion";

type InviteMemberModalProps = {
  trigger?: React.ReactNode;
};

export default function InviteMemberModal({
  trigger,
}: InviteMemberModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<InviteMemberSchema>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      role: "editor",
    },
  });

  const onSubmit = async (values: InviteMemberSchema) => {
    toast.success("Invitation prepared.", {
      description: `${values.email} will be invited as ${values.role}.`,
    });

    form.reset({
      email: "",
      role: "editor",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
            <Button className="rounded-md">
              <MailPlus data-icon="inline-start" />
              Invite member
            </Button>
          </motion.div>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl border-white/8 bg-[#1a1f2d] text-[#dee2f5]">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-[#172c29] text-[#4fdbc8]"
          >
            <ShieldCheck className="size-5" />
          </motion.div>

          <DialogTitle className="font-heading text-2xl font-bold">
            Invite workspace member
          </DialogTitle>
          <DialogDescription className="text-[#bbcac6]">
            Add a teammate with a clear role so permissions stay visible from the start.
          </DialogDescription>
        </DialogHeader>

        <motion.form
          variants={authContainerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <motion.div variants={authItemVariants}>
            <Field>
              <FieldLabel
                htmlFor="invite-email"
                className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]"
              >
                Email address
              </FieldLabel>
              <FieldContent>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="name@company.com"
                  className="h-12 rounded-md bg-[#090e1b] text-[#dee2f5]"
                  {...form.register("email")}
                />
                <FieldError errors={[form.formState.errors.email]} />
              </FieldContent>
            </Field>
          </motion.div>

          <motion.div variants={authItemVariants}>
            <Field>
              <FieldLabel className="text-xs uppercase tracking-[0.18em] text-[#bbcac6]">
                Role
              </FieldLabel>
              <FieldContent>
                <Select
                  value={form.watch("role")}
                  onValueChange={(value) =>
                    form.setValue("role", value as InviteMemberSchema["role"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="h-12 rounded-md bg-[#090e1b] text-[#dee2f5]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="border-white/8 bg-[#1a1f2d] text-[#dee2f5]">
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError errors={[form.formState.errors.role]} />
              </FieldContent>
            </Field>
          </motion.div>

          <motion.div variants={authItemVariants}>
            <DialogFooter className="pt-2">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-md border-white/8 bg-transparent text-[#dee2f5]"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Button
                  type="submit"
                  className="rounded-md"
                  disabled={form.formState.isSubmitting}
                >
                  Send invite
                </Button>
              </motion.div>
            </DialogFooter>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}
</file>

<file path="components/team/member-table.tsx">
"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cardReveal, panelSlideUp, staggerContainer } from "@/lib/motion";

export type TeamMemberRow = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "editor" | "viewer";
  status: "active" | "pending";
  avatar?: string | null;
};

type MemberTableProps = {
  members: TeamMemberRow[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getRolePill(role: TeamMemberRow["role"]) {
  switch (role) {
    case "owner":
      return "bg-[#4fdbc8] text-[#03241f]";
    case "admin":
      return "bg-[#89ceff] text-[#072335]";
    case "editor":
      return "bg-[#303443] text-[#dee2f5]";
    default:
      return "bg-[#252a38] text-[#dee2f5]";
  }
}

export default function MemberTable({ members }: MemberTableProps) {
  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      className="overflow-hidden rounded-xl bg-[#1a1f2d] shadow-[0_22px_70px_rgba(0,0,0,0.24)]"
    >
      <motion.div
        variants={panelSlideUp}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between border-b border-white/5 px-6 py-5"
      >
        <div>
          <h2 className="font-heading text-xl font-bold text-[#dee2f5]">
            Team Members
          </h2>
          <p className="mt-1 text-sm text-[#bbcac6]">
            Keep permissions and invite state visible.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="divide-y divide-white/5"
      >
        {members.map((member) => (
          <motion.div
            key={member.id}
            variants={panelSlideUp}
            whileHover={{ backgroundColor: "rgba(22,27,41,1)" }}
            className="flex flex-col gap-4 px-6 py-4 transition-colors md:flex-row md:items-center md:justify-between"
          >
            <div className="flex min-w-0 items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }}>
                <Avatar className="size-11 ring-2 ring-[#4fdbc8]/15">
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
              </motion.div>

              <div className="min-w-0">
                <p className="truncate font-medium text-[#dee2f5]">{member.name}</p>
                <p className="truncate text-sm text-[#bbcac6]">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ y: -1 }}>
                <Badge className={`rounded-full border-0 capitalize ${getRolePill(member.role)}`}>
                  {member.role}
                </Badge>
              </motion.div>

              <motion.div whileHover={{ y: -1 }}>
                <Badge
                  className={`rounded-full border-0 capitalize ${
                    member.status === "active"
                      ? "bg-[#182b28] text-[#4fdbc8]"
                      : "bg-[#303443] text-[#dee2f5]"
                  }`}
                >
                  {member.status}
                </Badge>
              </motion.div>

              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-md text-slate-400 hover:bg-[#252a38] hover:text-white"
                >
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">More</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
</file>

<file path="hooks/use-auth.ts">
"use client";

import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiError, apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import type {
  AuthResponse,
  AuthUser,
  LoginInput,
  OAuthAuthorizeResponse,
  OAuthProvider,
  RegisterInput,
} from "@/types/auth";
import { useWorkspaceStore } from "@/store/workspace-store";

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    setSession,
    clearSession,
  } = useAuthStore();

  const { clearWorkspaceState } = useWorkspaceStore();

  const refreshMutation = useMutation({
    mutationFn: async (token: string) =>
      apiClient.post<AuthResponse>(apiEndpoints.auth.refresh, {
        refresh_token: token,
      }),
    onSuccess: (data) => {
      setSession({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
    },
    onError: () => {
      clearSession();
      clearWorkspaceState();
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["workspaces"] });
    },
  });

  const meQuery = useQuery({
    queryKey: ["auth", "me", accessToken],
    queryFn: () =>
      apiClient.get<AuthUser>(apiEndpoints.users.me, {
        token: accessToken,
      }),
    enabled: Boolean(accessToken),
    staleTime: 60_000,
    retry: false,
  });

  useEffect(() => {
    if (!accessToken || !meQuery.isError) return;

    const error = meQuery.error;
    if (!(error instanceof ApiError) || error.status !== 401) return;
    if (!refreshToken || refreshMutation.isPending) return;

    void refreshMutation.mutateAsync(refreshToken);
  }, [
    accessToken,
    meQuery.error,
    meQuery.isError,
    refreshMutation,
    refreshToken,
  ]);

  useEffect(() => {
    if (!meQuery.data || !accessToken || !refreshToken) return;

    const currentUser = meQuery.data;
    const hasChanged =
      !user ||
      user.id !== currentUser.id ||
      user.name !== currentUser.name ||
      user.email !== currentUser.email ||
      user.avatar !== currentUser.avatar ||
      user.created_at !== currentUser.created_at;

    if (hasChanged) {
      setSession({
        user: currentUser,
        accessToken,
        refreshToken,
      });
    }
  }, [accessToken, meQuery.data, refreshToken, setSession, user]);

  const signInMutation = useMutation({
    mutationFn: (payload: LoginInput) =>
      apiClient.post<AuthResponse>(apiEndpoints.auth.login, payload),
    onSuccess: (data) => {
      setSession({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (payload: RegisterInput) =>
      apiClient.post<AuthResponse>(apiEndpoints.auth.register, payload),
    onSuccess: (data) => {
      setSession({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  const oauthExchangeMutation = useMutation({
    mutationFn: (code: string) =>
      apiClient.post<AuthResponse>(apiEndpoints.auth.oauthExchange, { code }),
    onSuccess: (data) => {
      setSession({
        user: data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });

  const signOut = async () => {
    try {
      if (accessToken) {
        await apiClient.post<{ message: string }>(
          apiEndpoints.auth.logout,
          undefined,
          {
            token: accessToken,
          }
        );
      }
    } catch {
      // Even if logout fails remotely, clear the local session.
    } finally {
      clearSession();
      clearWorkspaceState();
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["workspaces"] });
    }
  };

  const beginOAuth = async (
    provider: OAuthProvider,
    redirectTo = "/dashboard"
  ) => {
    const response = await apiClient.get<OAuthAuthorizeResponse>(
      apiEndpoints.auth.oauthAuthorize(provider, redirectTo)
    );

    window.location.href = response.authorization_url;
  };

  const isUnauthorized = useMemo(() => {
    if (!meQuery.isError) return false;
    return meQuery.error instanceof ApiError && meQuery.error.status === 401;
  }, [meQuery.error, meQuery.isError]);

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    meQuery,
    signInMutation,
    signUpMutation,
    oauthExchangeMutation,
    beginOAuth,
    signOut,
    isUnauthorized,
  };
}
</file>

<file path="hooks/use-builder.ts">
"use client";

import { useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useBuilderStore } from "@/store/builder-store";
import { useWorkspace } from "@/hooks/use-workspace";
import type {
  BuilderPageCreateInput,
  BuilderPageLayout,
  BuilderPageListResponse,
  BuilderPageRecord,
  BuilderPageUpdateInput,
} from "@/types/builder";
import type { Project } from "@/types/project";

function parseLayoutJson(layoutJson: string | null): BuilderPageLayout {
  if (!layoutJson) {
    return { blocks: [] };
  }

  try {
    const parsed = JSON.parse(layoutJson) as BuilderPageLayout;
    return {
      blocks: Array.isArray(parsed.blocks) ? parsed.blocks : [],
    };
  } catch {
    return { blocks: [] };
  }
}

export function useBuilder(projectId?: string | null, pageId?: string | null) {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const { currentRole } = useWorkspace();
  const builderStore = useBuilderStore();

  const projectQuery = useQuery({
    queryKey: ["project", "detail", projectId, accessToken],
    queryFn: () =>
      apiClient.get<Project>(apiEndpoints.projects.byId(projectId as string), {
        token: accessToken,
      }),
    enabled: Boolean(projectId && accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const pagesQuery = useQuery({
    queryKey: ["pages", "list", projectId, accessToken],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        site_id: projectId as string,
      });

      const response = await apiClient.get<BuilderPageListResponse>(
        `${apiEndpoints.pages.list}?${searchParams.toString()}`,
        {
          token: accessToken,
        }
      );

      return response.items;
    },
    enabled: Boolean(projectId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const createPageMutation = useMutation({
    mutationFn: (payload: BuilderPageCreateInput) =>
      apiClient.post<BuilderPageRecord>(apiEndpoints.pages.create, payload, {
        token: accessToken,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["pages", "list", projectId],
      });
    },
  });

  const savePageMutation = useMutation({
    mutationFn: ({
      pageId,
      payload,
    }: {
      pageId: string;
      payload: BuilderPageUpdateInput;
    }) =>
      apiClient.patch<BuilderPageRecord>(apiEndpoints.pages.byId(pageId), payload, {
        token: accessToken,
      }),
    onMutate: () => {
      builderStore.setSaveStatus("saving");
    },
    onSuccess: async (_, variables) => {
      builderStore.setSaveStatus("saved");
      await queryClient.invalidateQueries({
        queryKey: ["pages", "list", projectId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["page", "detail", variables.pageId],
      });
    },
    onError: () => {
      builderStore.setSaveStatus("error");
    },
  });

  const pageDetailQuery = useQuery({
    queryKey: ["page", "detail", pageId, accessToken],
    queryFn: () =>
      apiClient.get<BuilderPageRecord>(apiEndpoints.pages.byId(pageId as string), {
        token: accessToken,
      }),
    enabled: Boolean(pageId && accessToken && isAuthenticated),
    staleTime: 30_000,
    retry: false,
  });

  const pages = pagesQuery.data ?? [];
  const resolvedPage =
    pageDetailQuery.data ??
    (pageId ? pages.find((page) => page.id === pageId) : null) ??
    pages[0] ??
    null;

  const parsedLayout = useMemo(
    () => parseLayoutJson(resolvedPage?.layout_json ?? null),
    [resolvedPage?.layout_json]
  );

  useEffect(() => {
    if (!resolvedPage) return;
    if (builderStore.hydratedFromPageId === resolvedPage.id) return;

    builderStore.hydrateFromLayout(resolvedPage.id, parsedLayout);
  }, [builderStore, parsedLayout, resolvedPage]);

  const canEdit =
    currentRole === "owner" || currentRole === "admin" || currentRole === "editor";

  const hasUnsavedChanges = builderStore.saveStatus === "unsaved";

  const ensureDefaultPage = async () => {
    if (!projectId) return null;
    if (pagesQuery.isPending) return null;
    if (pages.length > 0) return pages[0];

    return createPageMutation.mutateAsync({
      site_id: projectId,
      title: "Homepage",
      path: "/",
      layout_json: JSON.stringify({ blocks: [] }),
    });
  };

  const saveCurrentPage = async () => {
    if (!resolvedPage) return;

    await savePageMutation.mutateAsync({
      pageId: resolvedPage.id,
      payload: {
        layout_json: builderStore.getLayoutJson(),
      },
    });
  };

  return {
    ...builderStore,
    currentRole,
    canEdit,
    hasUnsavedChanges,
    projectQuery,
    pagesQuery,
    pageDetailQuery,
    createPageMutation,
    savePageMutation,
    project: projectQuery.data ?? null,
    pages,
    currentPage: resolvedPage,
    parsedLayout,
    ensureDefaultPage,
    saveCurrentPage,
  };
}
</file>

<file path="hooks/use-workspace.ts">
"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspaceStore } from "@/store/workspace-store";
import type { Workspace, WorkspaceCreateInput, WorkspaceWithRole } from "@/types/workspace";

export function useWorkspace() {
  const queryClient = useQueryClient();
  const { accessToken, isAuthenticated } = useAuthStore();
  const workspaceStore = useWorkspaceStore();

  const workspacesQuery = useQuery({
    queryKey: ["workspaces", "list", accessToken],
    queryFn: () =>
      apiClient.get<WorkspaceWithRole[]>(apiEndpoints.workspaces.list, {
        token: accessToken,
      }),
    enabled: Boolean(accessToken && isAuthenticated),
    staleTime: 60_000,
    retry: false,
  });

  const workspaces = workspacesQuery.data ?? workspaceStore.workspaces;

  const activeWorkspace = useMemo(() => {
    if (!workspaces.length) return null;

    if (workspaceStore.activeWorkspaceId) {
      return (
        workspaces.find(
          (entry) => entry.workspace.id === workspaceStore.activeWorkspaceId
        ) ?? workspaces[0]
      );
    }

    return workspaces[0];
  }, [workspaces, workspaceStore.activeWorkspaceId]);

  const activeWorkspaceId = activeWorkspace?.workspace.id ?? null;
  const currentRole = activeWorkspace?.role ?? null;

  const createWorkspaceMutation = useMutation({
    mutationFn: (payload: WorkspaceCreateInput) =>
      apiClient.post<Workspace>(apiEndpoints.workspaces.create, payload, {
        token: accessToken,
      }),
    onSuccess: async (workspace) => {
      const appended: WorkspaceWithRole = {
        workspace,
        role: "owner",
      };

      const existing = queryClient.getQueryData<WorkspaceWithRole[]>([
        "workspaces",
        "list",
        accessToken,
      ]);

      queryClient.setQueryData<WorkspaceWithRole[]>(
        ["workspaces", "list", accessToken],
        existing ? [...existing, appended] : [appended]
      );

      workspaceStore.setActiveWorkspace(appended);

      await queryClient.invalidateQueries({
        queryKey: ["workspaces", "list", accessToken],
      });
    },
  });

  const shouldPromptWorkspaceCreation =
    workspacesQuery.isSuccess && workspaces.length === 0;

  return {
    workspaces,
    activeWorkspace,
    activeWorkspaceId,
    currentRole,
    hasWorkspaces: workspaces.length > 0,
    shouldPromptWorkspaceCreation,
    workspacesQuery,
    createWorkspaceMutation,
    setActiveWorkspaceId: workspaceStore.setActiveWorkspaceId,
  };
}
</file>

<file path="lib/api/client.ts">
type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type RequestOptions = {
  method?: RequestMethod;
  body?: unknown;
  headers?: HeadersInit;
  token?: string | null;
  query?: Record<string, string | number | boolean | null | undefined>;
  cache?: RequestCache;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:8000/api/v1";

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "detail" in data &&
      typeof (data as { detail?: unknown }).detail === "string"
        ? (data as { detail: string }).detail
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers,
    token,
    query,
    cache = "no-store",
  } = options;

  const requestHeaders = new Headers(headers);

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache,
  });

  return parseResponse<T>(response);
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "GET" }),

  post: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) => apiRequest<T>(path, { ...options, method: "POST", body }),

  patch: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) => apiRequest<T>(path, { ...options, method: "PATCH", body }),

  put: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">
  ) => apiRequest<T>(path, { ...options, method: "PUT", body }),

  delete: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};
</file>

<file path="lib/auth/session.ts">
"use client";

export const AUTH_STORAGE_KEY = "siteorbit-auth";
const ACCESS_COOKIE_NAME = "siteorbit_access_token";

function isBrowser() {
  return typeof window !== "undefined";
}

export function setAuthCookie(accessToken: string) {
  if (!isBrowser()) return;

  document.cookie = `${ACCESS_COOKIE_NAME}=${encodeURIComponent(
    accessToken
  )}; path=/; SameSite=Lax`;
}

export function clearAuthCookie() {
  if (!isBrowser()) return;

  document.cookie = `${ACCESS_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function syncAuthCookieFromStorage() {
  if (!isBrowser()) return;

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      clearAuthCookie();
      return;
    }

    const parsed = JSON.parse(raw) as {
      state?: {
        accessToken?: string | null;
      };
    };

    const accessToken = parsed?.state?.accessToken;
    if (accessToken) {
      setAuthCookie(accessToken);
      return;
    }

    clearAuthCookie();
  } catch {
    clearAuthCookie();
  }
}
</file>

<file path="lib/config/site.ts">
export const siteConfig = {
  name: "SiteOrbit",
  description: "A multi-tenant SaaS website builder for modern teams.",
  tagline: "Build branded landing pages with confidence.",
  appBasePath: "/app",
} as const;
</file>

<file path="lib/constants/navigation.ts">
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  Wand2,
  Globe,
} from "lucide-react";

export type AppNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const appNavigation: AppNavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Builder", href: "/builder", icon: Wand2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Team", href: "/team", icon: Users },
  { label: "Domains", href: "/domains", icon: Globe },
  { label: "Settings", href: "/settings", icon: Settings },
];
</file>

<file path="lib/constants/theme.ts">
export const themeModes = ["light", "dark", "system"] as const;

export type ThemeMode = (typeof themeModes)[number];

export const defaultTheme: ThemeMode = "system";
</file>

<file path="lib/mocks/analytics.ts">
import type {
  AnalyticsMetricItem,
  AnalyticsOverviewResponse,
  AnalyticsSourceItem,
  AnalyticsTopPageItem,
  AnalyticsTrafficPoint,
} from "@/types/analytics";

export const analyticsMetricsMock: AnalyticsMetricItem[] = [
  {
    label: "Unique Visitors",
    value: "12,480",
    helper: "30-day total traffic",
    trend: "+12.4%",
    trend_direction: "up",
  },
  {
    label: "Conversions",
    value: "864",
    helper: "Form submits and signups",
    trend: "+6.8%",
    trend_direction: "up",
  },
  {
    label: "Conversion Rate",
    value: "6.9%",
    helper: "Average across selected range",
    trend: "+1.3%",
    trend_direction: "up",
  },
  {
    label: "Top Page Views",
    value: "2,640",
    helper: "Highest single-page traffic",
    trend: "+4.1%",
    trend_direction: "up",
  },
];

export const analyticsTrafficSeriesMock: AnalyticsTrafficPoint[] = [
  { date: "2026-03-03", visits: 320, conversions: 21 },
  { date: "2026-03-08", visits: 410, conversions: 26 },
  { date: "2026-03-13", visits: 465, conversions: 33 },
  { date: "2026-03-18", visits: 520, conversions: 37 },
  { date: "2026-03-23", visits: 610, conversions: 41 },
  { date: "2026-03-28", visits: 690, conversions: 48 },
];

export const analyticsSourceBreakdownMock: AnalyticsSourceItem[] = [
  { source: "Organic Search", visits: 4240, share: 34.0 },
  { source: "Direct", visits: 2995, share: 24.0 },
  { source: "Social", visits: 2246, share: 18.0 },
  { source: "Referral", visits: 1747, share: 14.0 },
  { source: "Email", visits: 1252, share: 10.0 },
];

export const analyticsTopPagesMock: AnalyticsTopPageItem[] = [
  {
    id: "page-home",
    title: "Homepage",
    path: "/",
    visits: 2640,
    conversions: 196,
    conversion_rate: 7.4,
  },
  {
    id: "page-pricing",
    title: "Pricing",
    path: "/pricing",
    visits: 1930,
    conversions: 154,
    conversion_rate: 8.0,
  },
  {
    id: "page-demo",
    title: "Book Demo",
    path: "/book-demo",
    visits: 1480,
    conversions: 139,
    conversion_rate: 9.4,
  },
];

export const analyticsOverviewMock: AnalyticsOverviewResponse = {
  metrics: analyticsMetricsMock,
  traffic: analyticsTrafficSeriesMock,
  sources: analyticsSourceBreakdownMock,
  top_pages: analyticsTopPagesMock,
};
</file>

<file path="lib/mocks/dashboard.ts">
import type {
  DashboardMemberItem,
  DashboardOverviewResponse,
  DashboardProjectItem,
  DashboardStat,
} from "@/types/dashboard";
import type { WorkspaceRole } from "@/types/workspace";

export const dashboardStatCardsMock: DashboardStat[] = [
  {
    label: "Projects Active",
    value: "12",
    helper: "3 in draft",
    tone: "teal",
  },
  {
    label: "Workspace Members",
    value: "8",
    helper: "Current active collaborators",
    tone: "blue",
  },
  {
    label: "Published Projects",
    value: "9",
    helper: "Live project surfaces",
    tone: "teal",
  },
];

export const dashboardActivityMock: string[] = [
  "Spring Launch was updated recently.",
  "Maya is active in this workspace.",
  "3 project(s) still need publishing.",
];

export const dashboardProjectsMock: DashboardProjectItem[] = [
  {
    id: "project-spring-launch",
    name: "Spring Launch",
    status: "Published",
    metric: "Updated 2026-03-30",
  },
  {
    id: "project-black-friday",
    name: "Black Friday Waitlist",
    status: "Draft",
    metric: "Updated 2026-03-28",
  },
  {
    id: "project-partner-program",
    name: "Partner Program",
    status: "Draft",
    metric: "Updated 2026-03-25",
  },
];

export const dashboardMembersMock: DashboardMemberItem[] = [
  {
    id: "member-owner",
    name: "Alex Rivera",
    email: "alex@siteorbit.app",
    role: "owner" satisfies WorkspaceRole,
    status: "active",
  },
  {
    id: "member-editor",
    name: "Maya Chen",
    email: "maya@siteorbit.app",
    role: "editor" satisfies WorkspaceRole,
    status: "active",
  },
];

export const dashboardOverviewMock: DashboardOverviewResponse = {
  stats: dashboardStatCardsMock,
  activity: dashboardActivityMock,
  projects: dashboardProjectsMock,
  members: dashboardMembersMock,
};
</file>

<file path="lib/mocks/projects.ts">
import type { Project, ProjectStatus } from "@/types/project";

export const projectListMock: Project[] = [
  {
    id: "project-1",
    workspace_id: "local-workspace",
    name: "Spring Launch",
    description: "Main campaign landing page for Q2 acquisition.",
    status: "published" satisfies ProjectStatus,
    created_at: "2026-03-12T09:00:00.000Z",
    updated_at: "2026-03-29T10:30:00.000Z",
  },
  {
    id: "project-2",
    workspace_id: "local-workspace",
    name: "Partner Program",
    description: "Lead capture page for affiliate and partner signups.",
    status: "draft" satisfies ProjectStatus,
    created_at: "2026-03-20T11:00:00.000Z",
    updated_at: "2026-03-28T15:45:00.000Z",
  },
  {
    id: "project-3",
    workspace_id: "local-workspace",
    name: "Changelog Microsite",
    description: "Product updates and release notes experience.",
    status: "archived" satisfies ProjectStatus,
    created_at: "2026-02-18T08:15:00.000Z",
    updated_at: "2026-03-22T09:10:00.000Z",
  },
  {
    id: "project-4",
    workspace_id: "local-workspace",
    name: "Black Friday Waitlist",
    description: "Pre-launch waitlist funnel with segmented signup steps.",
    status: "draft" satisfies ProjectStatus,
    created_at: "2026-03-25T12:00:00.000Z",
    updated_at: "2026-03-29T08:20:00.000Z",
  },
  {
    id: "project-5",
    workspace_id: "local-workspace",
    name: "Docs Refresh",
    description: "Documentation landing pages and onboarding hub.",
    status: "published" satisfies ProjectStatus,
    created_at: "2026-01-30T07:30:00.000Z",
    updated_at: "2026-03-27T16:40:00.000Z",
  },
];
</file>

<file path="lib/utils/format.ts">
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number, maximumFractionDigits = 2): string {
  return `${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value)}%`;
}

export function formatDate(
  value: string | Date,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatRelativeTimeFromNow(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  const diffInMs = date.getTime() - Date.now();
  const diffInMinutes = Math.round(diffInMs / (1000 * 60));

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, "minute");
  }

  const diffInHours = Math.round(diffInMinutes / 60);
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, "hour");
  }

  const diffInDays = Math.round(diffInHours / 24);
  return rtf.format(diffInDays, "day");
}
</file>

<file path="lib/validators/auth.ts">
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
</file>

<file path="lib/validators/workspace.ts">
import { z } from "zod";

export const workspaceNameSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace name must be at least 2 characters.")
    .max(60, "Workspace name must be 60 characters or fewer."),
});

export const inviteMemberSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  role: z.enum(["owner", "admin", "editor", "viewer"], {
    message: "Select a valid role.",
  }),
});

export type WorkspaceNameSchema = z.infer<typeof workspaceNameSchema>;
export type InviteMemberSchema = z.infer<typeof inviteMemberSchema>;
</file>

<file path="README.md">
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
#   S i t e O r b i t  
 
</file>

<file path="store/auth-store.ts">
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  AUTH_STORAGE_KEY,
  clearAuthCookie,
  setAuthCookie,
  syncAuthCookieFromStorage,
} from "@/lib/auth/session";
import type { AuthUser } from "@/types/auth";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setSession: (payload: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }) => void;
  updateTokens: (payload: { accessToken: string; refreshToken: string }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setSession: ({ user, accessToken, refreshToken }) => {
        setAuthCookie(accessToken);

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      },

      updateTokens: ({ accessToken, refreshToken }) => {
        setAuthCookie(accessToken);

        set((state) => ({
          ...state,
          accessToken,
          refreshToken,
          isAuthenticated: Boolean(state.user),
        }));
      },

      clearSession: () => {
        clearAuthCookie();

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      
      storage: createJSONStorage(() => sessionStorage), 
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => () => {
        syncAuthCookieFromStorage();
      },
    }
  )
);
</file>

<file path="store/builder-store.ts">
"use client";

import { create } from "zustand";

import type {
  BuilderBlock,
  BuilderPageLayout,
  BuilderViewport,
  SaveStatus,
} from "@/types/builder";

type BuilderState = {
  pageId: string | null;
  selectedBlockId: string | null;
  viewport: BuilderViewport;
  saveStatus: SaveStatus;
  blocks: BuilderBlock[];
  isPreviewMode: boolean;
  hydratedFromPageId: string | null;
  setPageId: (pageId: string | null) => void;
  setSelectedBlockId: (blockId: string | null) => void;
  setViewport: (viewport: BuilderViewport) => void;
  setSaveStatus: (status: SaveStatus) => void;
  setBlocks: (blocks: BuilderBlock[]) => void;
  hydrateFromLayout: (pageId: string, layout: BuilderPageLayout) => void;
  addBlock: (block: BuilderBlock) => void;
  updateBlock: (blockId: string, updater: Partial<BuilderBlock>) => void;
  updateBlockProps: (
    blockId: string,
    updater: Partial<BuilderBlock["props"]>
  ) => void;
  removeBlock: (blockId: string) => void;
  moveBlock: (blockId: string, direction: "up" | "down") => void;
  setPreviewMode: (value: boolean) => void;
  resetBuilder: () => void;
  getLayoutJson: () => string;
};

const initialState = {
  pageId: null,
  selectedBlockId: null,
  viewport: "desktop" as BuilderViewport,
  saveStatus: "idle" as SaveStatus,
  blocks: [] as BuilderBlock[],
  isPreviewMode: false,
  hydratedFromPageId: null as string | null,
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  ...initialState,

  setPageId: (pageId) => set({ pageId }),
  setSelectedBlockId: (selectedBlockId) => set({ selectedBlockId }),
  setViewport: (viewport) => set({ viewport }),
  setSaveStatus: (saveStatus) => set({ saveStatus }),
  setBlocks: (blocks) => set({ blocks }),

  hydrateFromLayout: (pageId, layout) =>
    set({
      pageId,
      blocks: Array.isArray(layout.blocks) ? layout.blocks : [],
      selectedBlockId: layout.blocks[0]?.id ?? null,
      saveStatus: "idle",
      hydratedFromPageId: pageId,
    }),

  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, block],
      selectedBlockId: block.id,
      saveStatus: "unsaved",
    })),

  updateBlock: (blockId, updater) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId ? { ...block, ...updater } : block
      ),
      saveStatus: "unsaved",
    })),

  updateBlockProps: (blockId, updater) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              props: {
                ...block.props,
                ...updater,
              },
            }
          : block
      ),
      saveStatus: "unsaved",
    })),

  removeBlock: (blockId) =>
    set((state) => {
      const nextBlocks = state.blocks.filter((block) => block.id !== blockId);

      return {
        blocks: nextBlocks,
        selectedBlockId:
          state.selectedBlockId === blockId
            ? (nextBlocks[0]?.id ?? null)
            : state.selectedBlockId,
        saveStatus: "unsaved",
      };
    }),

  moveBlock: (blockId, direction) =>
    set((state) => {
      const index = state.blocks.findIndex((block) => block.id === blockId);
      if (index === -1) return state;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.blocks.length) {
        return state;
      }

      const nextBlocks = [...state.blocks];
      const [item] = nextBlocks.splice(index, 1);
      nextBlocks.splice(targetIndex, 0, item);

      return {
        blocks: nextBlocks,
        saveStatus: "unsaved",
      };
    }),

  setPreviewMode: (isPreviewMode) => set({ isPreviewMode }),

  resetBuilder: () => set(initialState),

  getLayoutJson: () => {
    const layout: BuilderPageLayout = {
      blocks: get().blocks,
    };

    return JSON.stringify(layout);
  },
}));
</file>

<file path="store/workspace-store.ts">
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { WorkspaceWithRole } from "@/types/workspace";

type WorkspaceState = {
  workspaces: WorkspaceWithRole[];
  activeWorkspaceId: string | null;
  activeWorkspace: WorkspaceWithRole | null;
  setWorkspaces: (workspaces: WorkspaceWithRole[]) => void;
  setActiveWorkspaceId: (workspaceId: string | null) => void;
  setActiveWorkspace: (workspace: WorkspaceWithRole | null) => void;
  clearWorkspaceState: () => void;
};

function resolveActiveWorkspace(
  workspaces: WorkspaceWithRole[],
  activeWorkspaceId: string | null
) {
  if (!workspaces.length) {
    return {
      activeWorkspaceId: null,
      activeWorkspace: null,
    };
  }

  const matched =
    (activeWorkspaceId
      ? workspaces.find((entry) => entry.workspace.id === activeWorkspaceId)
      : null) ?? workspaces[0];

  return {
    activeWorkspaceId: matched.workspace.id,
    activeWorkspace: matched,
  };
}

function areWorkspaceListsEqual(
  a: WorkspaceWithRole[],
  b: WorkspaceWithRole[]
): boolean {
  if (a.length !== b.length) return false;

  return a.every((item, index) => {
    const other = b[index];
    return (
      item.workspace.id === other.workspace.id &&
      item.workspace.name === other.workspace.name &&
      item.workspace.slug === other.workspace.slug &&
      item.workspace.logo === other.workspace.logo &&
      item.workspace.plan === other.workspace.plan &&
      item.workspace.description === other.workspace.description &&
      item.workspace.primary_domain === other.workspace.primary_domain &&
      item.workspace.created_at === other.workspace.created_at &&
      item.workspace.updated_at === other.workspace.updated_at &&
      item.role === other.role
    );
  });
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaces: [],
      activeWorkspaceId: null,
      activeWorkspace: null,

      setWorkspaces: (workspaces) => {
        set((state) => {
          if (areWorkspaceListsEqual(state.workspaces, workspaces)) {
            return state;
          }

          const resolved = resolveActiveWorkspace(
            workspaces,
            state.activeWorkspaceId
          );

          return {
            workspaces,
            activeWorkspaceId: resolved.activeWorkspaceId,
            activeWorkspace: resolved.activeWorkspace,
          };
        });
      },

      setActiveWorkspaceId: (workspaceId) => {
        set((state) => {
          const nextActive =
            workspaceId == null
              ? null
              : state.workspaces.find(
                  (entry) => entry.workspace.id === workspaceId
                ) ?? null;

          if (
            state.activeWorkspaceId === (nextActive?.workspace.id ?? null) &&
            state.activeWorkspace?.workspace.id ===
              (nextActive?.workspace.id ?? null)
          ) {
            return state;
          }

          return {
            activeWorkspaceId: nextActive?.workspace.id ?? null,
            activeWorkspace: nextActive,
          };
        });
      },

      setActiveWorkspace: (workspace) => {
        set((state) => {
          const alreadyExists = workspace
            ? state.workspaces.some(
                (entry) => entry.workspace.id === workspace.workspace.id
              )
            : true;

          return {
            activeWorkspaceId: workspace?.workspace.id ?? null,
            activeWorkspace: workspace,
            workspaces:
              workspace && !alreadyExists
                ? [workspace, ...state.workspaces]
                : state.workspaces,
          };
        });
      },

      clearWorkspaceState: () => {
        set({
          workspaces: [],
          activeWorkspaceId: null,
          activeWorkspace: null,
        });
      },
    }),
    {
      name: "siteorbit-workspace",
      partialize: (state) => ({
        activeWorkspaceId: state.activeWorkspaceId,
      }),
    }
  )
);
</file>

<file path="styles/tokens.css">
:root {
  --background: 220 39% 9%;
  --foreground: 225 61% 92%;

  --card: 225 27% 13%;
  --card-foreground: 225 61% 92%;

  --popover: 225 27% 13%;
  --popover-foreground: 225 61% 92%;

  --primary: 171 66% 58%;
  --primary-foreground: 167 100% 6%;

  --secondary: 205 100% 77%;
  --secondary-foreground: 203 100% 9%;

  --muted: 225 24% 16%;
  --muted-foreground: 190 11% 76%;

  --accent: 171 66% 58%;
  --accent-foreground: 167 100% 6%;

  --destructive: 4 100% 84%;
  --destructive-foreground: 0 100% 21%;

  --border: 224 12% 28%;
  --input: 227 31% 11%;
  --ring: 171 66% 58%;

  --chart-1: 171 66% 58%;
  --chart-2: 205 100% 77%;
  --chart-3: 199 100% 45%;
  --chart-4: 39 100% 68%;
  --chart-5: 4 100% 84%;

  --sidebar: 220 39% 9%;
  --sidebar-foreground: 225 61% 92%;
  --sidebar-primary: 171 66% 58%;
  --sidebar-primary-foreground: 167 100% 6%;
  --sidebar-accent: 225 24% 16%;
  --sidebar-accent-foreground: 225 61% 92%;
  --sidebar-border: 224 12% 20%;
  --sidebar-ring: 171 66% 58%;

  --radius: 0.75rem;
}
</file>

<file path="types/analytics.ts">
export type AnalyticsRange = "7d" | "30d" | "90d";

export type AnalyticsMetricItem = {
  label: string;
  value: string;
  helper: string;
  trend: string;
  trend_direction: string;
};

export type AnalyticsTrafficPoint = {
  date: string;
  visits: number;
  conversions: number;
};

export type AnalyticsSourceItem = {
  source: string;
  visits: number;
  share: number;
};

export type AnalyticsTopPageItem = {
  id: string;
  title: string;
  path: string;
  visits: number;
  conversions: number;
  conversion_rate: number;
};

export type AnalyticsOverviewResponse = {
  metrics: AnalyticsMetricItem[];
  traffic: AnalyticsTrafficPoint[];
  sources: AnalyticsSourceItem[];
  top_pages: AnalyticsTopPageItem[];
};
</file>

<file path="types/auth.ts">
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  created_at: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: AuthUser;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RefreshTokenInput = {
  refresh_token: string;
};

export type OAuthAuthorizeResponse = {
  authorization_url: string;
};

export type OAuthExchangeInput = {
  code: string;
};

export type OAuthProvider = "google" | "github";
</file>

<file path="types/builder.ts">
export type BuilderViewport = "desktop" | "tablet" | "mobile";
export type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "error";

export type BuilderBlockType = "hero" | "text" | "features" | "cta";

export type BuilderBlockProps = {
  title?: string;
  subtitle?: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
  items?: string[];
};

export type BuilderBlock = {
  id: string;
  type: BuilderBlockType;
  props: BuilderBlockProps;
};

export type BuilderPageLayout = {
  blocks: BuilderBlock[];
};

export type BuilderPageRecord = {
  id: string;
  site_id: string;
  title: string;
  path: string;
  layout_json: string | null;
  created_at: string;
  updated_at: string;
};

export type BuilderPageListResponse = {
  items: BuilderPageRecord[];
};

export type BuilderPageCreateInput = {
  site_id: string;
  title: string;
  path: string;
  layout_json?: string | null;
};

export type BuilderPageUpdateInput = {
  title?: string;
  path?: string;
  layout_json?: string | null;
};
</file>

<file path="types/project.ts">
export type ProjectStatus = "draft" | "published" | "archived";

export type Project = {
  id: string;
  workspace_id: string;
  name: string;
  description: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
};

export type ProjectListResponse = {
  items: Project[];
};

export type CreateProjectInput = {
  workspace_id: string;
  name: string;
  description?: string | null;
  status?: ProjectStatus;
};

export type UpdateProjectInput = {
  name?: string;
  description?: string | null;
  status?: ProjectStatus;
};

export type ProjectPublishResponse = {
  id: string;
  status: ProjectStatus;
  message: string;
};
</file>

<file path="types/workspace.ts">
export type WorkspaceRole = "owner" | "admin" | "editor" | "viewer";

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  plan: string;
  description?: string | null;
  primary_domain?: string | null;
  created_at: string;
  updated_at: string;
};

export type WorkspaceWithRole = {
  workspace: Workspace;
  role: WorkspaceRole | string;
};

export type WorkspaceCreateInput = {
  name: string;
};

export type WorkspaceUpdateInput = {
  name?: string;
  description?: string | null;
  primary_domain?: string | null;
  logo?: string | null;
};

export type WorkspaceMember = {
  id: string;
  user_id: string;
  workspace_id: string;
  name: string;
  email: string;
  role: WorkspaceRole | string;
  status: string;
  avatar: string | null;
};
</file>

<file path="app/globals.css">
@import "tailwindcss";
@import "../styles/tokens.css";



@custom-variant dark (&:is(.dark *));

*,
*::before,
*::after {
  border-color: hsl(var(--border));
}

html {
  min-height: 100%;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 10%, hsl(171 66% 58% / 0.08), transparent 28%),
    linear-gradient(180deg, #090e1b 0%, #0e1320 100%);
  color: hsl(var(--foreground));
  font-family: "Inter", sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::selection {
  background: hsl(var(--primary) / 0.28);
  color: hsl(var(--foreground));
}

a {
  color: inherit;
  text-decoration: none;
}

.font-heading {
  font-family: "Sora", sans-serif;
}

.font-body {
  font-family: "Inter", sans-serif;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.cn-toast {
  border-radius: 0.75rem !important;
  backdrop-filter: blur(14px);
}

[data-slot="card"] {
  background: rgba(26, 31, 45, 0.7);
  border-color: hsl(var(--border) / 0.65);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(14px);
}

[data-slot="sidebar-inner"] {
  background: linear-gradient(180deg, rgba(14, 19, 32, 0.92), rgba(9, 14, 27, 0.98));
  backdrop-filter: blur(18px);
}

[data-slot="button"][data-variant="default"] {
  background: linear-gradient(135deg, #4fdbc8 0%, #14b8a6 100%);
  color: #00201c;
  box-shadow: 0 16px 36px rgba(79, 219, 200, 0.18);
}

[data-slot="button"][data-variant="default"]:hover {
  filter: brightness(1.04);
}

[data-slot="button"][data-variant="outline"] {
  background: rgba(22, 27, 41, 0.55);
  border-color: rgba(72, 86, 100, 0.45);
}

[data-slot="button"][data-variant="ghost"] {
  background: transparent;
}

[data-slot="input"],
[data-slot="textarea"],
[data-slot="select-trigger"] {
  background: rgba(9, 14, 27, 0.94);
  border-color: rgba(72, 86, 100, 0.45);
  color: #dee2f5;
}

[data-slot="input"]::placeholder,
[data-slot="textarea"]::placeholder {
  color: rgba(222, 226, 245, 0.3);
}

[data-slot="badge"][data-variant="secondary"] {
  background: rgba(48, 52, 67, 0.85);
  color: #dee2f5;
}

[data-slot="dialog-content"],
[data-slot="popover-content"],
[data-slot="dropdown-menu-content"],
[data-slot="sheet-content"] {
  background: rgba(26, 31, 45, 0.92);
  border-color: rgba(72, 86, 100, 0.45);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(18px);
}

[data-slot="tabs-list"] {
  background: rgba(37, 42, 56, 0.9);
}

[data-slot="tabs-trigger"][data-active="true"] {
  background: rgba(48, 52, 67, 0.95);
}

[data-slot="table-row"]:hover {
  background: rgba(37, 42, 56, 0.55);
}
</file>

<file path="lib/api/endpoints.ts">
export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    oauthAuthorize: (provider: "google" | "github", redirectTo: string) =>
      `/auth/oauth/${provider}/authorize?redirect_to=${encodeURIComponent(redirectTo)}`,
    oauthExchange: "/auth/oauth/exchange",
  },
  users: {
    me: "/users/me",
  },
  workspaces: {
    list: "/workspaces/",
    create: "/workspaces/",
    byId: (workspaceId: string) => `/workspaces/${workspaceId}`,
    members: (workspaceId: string) => `/workspaces/${workspaceId}/members`,
    memberById: (workspaceId: string, memberId: string) =>
      `/workspaces/${workspaceId}/members/${memberId}`,
    theme: (workspaceId: string) => `/workspaces/${workspaceId}/theme`,
    invitations: (workspaceId: string) => `/workspaces/${workspaceId}/invitations`,
    acceptInvitation: "/workspaces/invitations/accept",
    domains: (workspaceId: string) => `/workspaces/${workspaceId}/domains`,
  },
  projects: {
    list: "/projects/",
    create: "/projects/",
    byId: (projectId: string) => `/projects/${projectId}`,
    publish: (projectId: string) => `/projects/${projectId}/publish`,
    unpublish: (projectId: string) => `/projects/${projectId}/unpublish`,
  },
  pages: {
    list: "/pages/",
    create: "/pages/",
    byId: (pageId: string) => `/pages/${pageId}`,
  },
  dashboard: {
    overview: "/dashboard/overview",
  },
  analytics: {
    overview: "/analytics/overview",
  },
};
</file>

<file path="package.json">
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/modifiers": "^9.0.0",
    "@dnd-kit/sortable": "^10.0.0",
    "@hookform/resolvers": "^5.2.2",
    "@tanstack/react-query": "^5.95.2",
    "@tanstack/react-query-devtools": "^5.95.2",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.7.0",
    "next": "16.2.1",
    "next-themes": "^0.4.6",
    "radix-ui": "^1.4.3",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.72.0",
    "react-resizable-panels": "^4.8.0",
    "recharts": "^3.8.0",
    "shadcn": "^4.1.1",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.3.6",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
</file>

<file path=".gitignore">
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# repomix
repomix-output.md

# Agents

AGENTS.md
CLAUDE.md

# repomix output
frontend-repomix-output.md
</file>

</files>
