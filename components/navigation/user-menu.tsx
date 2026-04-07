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