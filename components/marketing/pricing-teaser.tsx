import Link from "next/link";

import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    suffix: "/mo",
    points: ["Up to 3 Projects", "Basic Analytics"],
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Professional",
    price: "$129",
    suffix: "/mo",
    points: ["Unlimited Projects", "Advanced Team Roles"],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "",
    points: ["White Label Solution", "Priority Support"],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function PricingTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5] sm:text-5xl">
          Simple, Premium Tiers.
        </h2>
        <p className="mt-3 text-sm text-[#b8c3d9]">
          No hidden fees. Scale with your growth.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl border p-6 ${
              tier.featured
                ? "border-[#4fdbc8] bg-[#131b2a] shadow-[0_0_0_1px_rgba(79,219,200,0.25),0_30px_90px_rgba(0,0,0,0.3)]"
                : "border-white/6 bg-[#161b29]"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#9aa6c0]">
                {tier.name}
              </p>
              {tier.featured ? (
                <span className="rounded-full bg-[#4fdbc8] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#00201c]">
                  Popular
                </span>
              ) : null}
            </div>

            <div className="flex items-end gap-1">
              <span className="font-heading text-5xl font-extrabold text-[#dee2f5]">
                {tier.price}
              </span>
              {tier.suffix ? (
                <span className="pb-2 text-sm text-[#9aa6c0]">{tier.suffix}</span>
              ) : null}
            </div>

            <div className="mt-8 space-y-3">
              {tier.points.map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-[#c9d1e4]">
                  <span className="size-2 rounded-full bg-[#4fdbc8]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              variant={tier.featured ? "default" : "outline"}
              className="mt-8 h-12 w-full rounded-md"
            >
              <Link href="/sign-up">{tier.cta}</Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-24 rounded-[2rem] bg-[linear-gradient(180deg,rgba(10,20,36,0.4),rgba(10,20,36,0.8))] px-6 py-20 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5] sm:text-5xl">
          Ready to launch?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#b8c3d9]">
          Join over 1,500 teams building the future of the web on SiteOrbit.
        </p>
        <Button asChild className="mt-8 h-12 rounded-md px-8">
          <Link href="/sign-up">Get Started for Free</Link>
        </Button>
      </div>
    </section>
  );
}