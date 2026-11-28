"use client";

import Segmented from "@/components/shared/segmented";
import { useTheme } from "@/hooks/use-theme";
import type { ThemePreference } from "@/lib/theme";

export const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/** System / Light / Dark, for places without an account menu. */
export default function ThemeSwitch({ className }: { className?: string }) {
  const { preference, setPreference } = useTheme();
  return (
    <Segmented
      label="Theme"
      options={themeOptions}
      value={preference}
      onChange={setPreference}
      className={className}
    />
  );
}
