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