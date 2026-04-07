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