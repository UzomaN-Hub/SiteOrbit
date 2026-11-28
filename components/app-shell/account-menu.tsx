"use client";

import Link from "next/link";
import { CreditCard, LogOut, Monitor, Moon, Settings, Sun } from "lucide-react";

import { themeOptions } from "@/components/shared/theme-switch";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useHydrated } from "@/hooks/use-hydrated";
import { useTheme } from "@/hooks/use-theme";

const themeIcons = { system: Monitor, light: Sun, dark: Moon };

export default function AccountMenu() {
  const hydrated = useHydrated();
  const { user, signOut } = useAuth();
  const { preference, setPreference } = useTheme();

  if (!hydrated) {
    return <Skeleton className="size-8 rounded-full" data-allow-round />;
  }

  const handleSignOut = async () => {
    await signOut();
    window.location.replace("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex size-10 items-center justify-center rounded-full"
        data-allow-round
      >
        <Avatar name={user?.name} src={user?.avatar} size={28} />
        <span className="sr-only">Account menu</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center gap-3 px-2 pt-1 pb-2">
          <Avatar name={user?.name} src={user?.avatar} size={32} />
          <div className="min-w-0">
            <p className="truncate type-ui text-text">{user?.name ?? "Signed in"}</p>
            <p className="truncate type-small text-text-muted">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings />
            Workspace settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings?tab=billing">
            <CreditCard />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        {themeOptions.map((option) => {
          const Icon = themeIcons[option.value];
          return (
            <DropdownMenuCheckItem
              key={option.value}
              checked={preference === option.value}
              onSelect={(event) => {
                event.preventDefault();
                setPreference(option.value);
              }}
            >
              <Icon />
              {option.label}
            </DropdownMenuCheckItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void handleSignOut()}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
