import Link from "next/link";

import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import PricingTeaser from "@/components/marketing/pricing-teaser";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Hero />
      <Features />
      <PricingTeaser />

      <footer className="border-t border-white/6 bg-transparent">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm text-[#8e9ab2] sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="font-heading text-lg font-bold text-[#dee2f5]">
              SiteOrbit
            </div>
            <p className="mt-4 max-w-xs leading-6">
              The premium workspace for digital builders and elite development teams.
            </p>
            <div className="mt-4 flex gap-3">
              <span className="size-8 rounded-full border border-white/8 bg-[#161b29]" />
              <span className="size-8 rounded-full border border-white/8 bg-[#161b29]" />
              <span className="size-8 rounded-full border border-white/8 bg-[#161b29]" />
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Product
            </p>
            <div className="space-y-3 flex flex-col">
              <Link href="/">Features</Link>
              <Link href="/">Integrations</Link>
              <Link href="/">Solutions</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Company
            </p>
            <div className="space-y-3 flex flex-col">
              <Link href="/">About Us</Link>
              <Link href="/">Careers</Link>
              <Link href="/">Contact</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Legal
            </p>
            <div className="space-y-3 flex flex-col">
              <Link href="/">Privacy Policy</Link>
              <Link href="/">Terms of Service</Link>
              <Link href="/">Security</Link>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/6 px-4 py-6 text-[10px] uppercase tracking-[0.18em] text-[#6f7c96] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© 2025 SiteOrbit. The Digital Curator.</span>
          <div className="flex gap-5">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Security</Link>
            <Link href="/">Status</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}