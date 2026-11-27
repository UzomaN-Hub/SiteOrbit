"use client";

import Link from "next/link";
import { CreditCard, LogOut, Settings } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useHydrated } from "@/hooks/use-hydrated";

export default function AccountMenu() {
  const hydrated = useHydrated();
  const { user, signOut } = useAuth();

  if (!hydrated) {
    return <Skeleton className="size-7 rounded-full" data-allow-round />;
  }

  const handleSignOut = async () => {
    await signOut();
    window.location.replace("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex size-8 items-center justify-center rounded-full"
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
        <DropdownMenuItem onSelect={() => void handleSignOut()}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
