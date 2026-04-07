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