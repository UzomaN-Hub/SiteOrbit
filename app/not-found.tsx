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