import Link from "next/link";

import Logo from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="min-h-dvh px-4 pt-12 sm:pt-24">
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-12">
        <Logo className="self-start" />
        <div className="flex flex-col items-start gap-4">
          <p className="font-display text-[28px] leading-none text-text-muted tabular">404</p>
          <h1 className="type-h2 text-text">This page doesn&apos;t exist</h1>
          <p className="type-body text-text-muted">
            The link may be old, or the page may have moved. Check the address, or go back
            to a page you know.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">Go to your sites</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Home page</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
