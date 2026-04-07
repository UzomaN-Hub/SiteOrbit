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