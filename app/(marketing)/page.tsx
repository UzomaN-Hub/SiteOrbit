import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import Logo from "@/components/brand/logo";
import { GitHubIcon } from "@/components/auth/oauth-buttons";
import Reveal from "@/components/marketing/reveal";
import SiteHeader from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} · ${siteConfig.tagline}` },
  description: siteConfig.description,
};

export const revalidate = 86_400; // keeps the footer year current

const headline = "Build and publish sites for every client from one workspace.";

const features = [
  {
    title: "Structured editing.",
    body: "Pages are built from reusable sections, so every page stays consistent and easy to change.",
  },
  {
    title: "Isolated workspaces.",
    body: "Each client's sites, team roles and domains are kept separate.",
  },
  {
    title: "Built-in analytics.",
    body: "See visits, top pages and traffic sources for every site without adding another tool.",
  },
  {
    title: "Custom domains.",
    body: "Connect a client's own domain and publish to it.",
  },
];

const steps = [
  { title: "Create a workspace", body: "for a client and invite your team." },
  { title: "Build pages", body: "from sections in the visual editor." },
  {
    title: "Publish",
    body: "to a SiteOrbit address or the client's own domain, and follow the analytics.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "per month",
    points: ["Up to 3 sites", "Visits and top pages for each site", "One workspace"],
    cta: { label: "Choose Starter", href: "/sign-up" },
    recommended: false,
  },
  {
    name: "Professional",
    price: "$129",
    period: "per month",
    points: [
      "Unlimited sites",
      "Owner, admin, editor and viewer roles",
      "A workspace for every client",
    ],
    cta: { label: "Start free", href: "/sign-up" },
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "billed yearly",
    points: ["Your own branding instead of ours", "Priority support", "Help moving existing sites"],
    cta: { label: "Contact sales", href: siteConfig.contactHref },
    recommended: false,
  },
];

const section = "mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export default function LandingPage() {
  const words = headline.split(" ");
  const followDelay = `${(words.length - 1) * 40 + 300 + 120}ms`;

  return (
    <>
      <SiteHeader />

      <main id="main">
        {/* Hero */}
        <section className={cn(section, "grid items-center gap-12 py-16 lg:grid-cols-[55fr_45fr] lg:py-24")}>
          <div className="flex flex-col items-start">
            <h1 className="type-display max-w-[16ch] text-text" aria-label={headline}>
              {words.map((word, index) => (
                <span key={`${word}-${index}`} aria-hidden="true">
                  <span className="hero-word" style={{ "--i": index } as React.CSSProperties}>
                    {word}
                  </span>{" "}
                </span>
              ))}
            </h1>
            <div
              className="hero-follow flex flex-col items-start"
              style={{ "--follow-delay": followDelay } as React.CSSProperties}
            >
              <p className="mt-6 max-w-[44ch] type-body-lg text-text-muted">
                SiteOrbit is a website builder for teams. Each client gets its own workspace,
                its own domain and its own analytics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/sign-up">Start free</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#how-it-works">See how it works</a>
                </Button>
              </div>
            </div>
          </div>

          <figure
            className="hero-follow overflow-hidden rounded-lg border border-border bg-surface-1"
            style={{ "--follow-delay": `calc(${followDelay} + 80ms)` } as React.CSSProperties}
          >
            <Image
              src="/images/hero-product.png"
              alt="The SiteOrbit Sites page: a workspace's sites listed with their status and last update."
              width={1200}
              height={600}
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-auto w-full"
            />
          </figure>
        </section>

        {/* Product */}
        <Reveal as="section" id="product" className={cn(section, "scroll-mt-16")}>
          <div className="border-t border-border py-16 md:py-24">
            <h2 className="type-h2 text-text">What you get</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  data-reveal-child
                  style={{ "--i": index } as React.CSSProperties}
                  className="flex flex-col gap-2 lg:border-l lg:border-border lg:px-6 lg:first:border-l-0 lg:first:pl-0"
                >
                  <h3 className="type-ui text-text">{feature.title}</h3>
                  <p className="type-body text-text-muted">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* How it works */}
        <Reveal as="section" id="how-it-works" className={cn(section, "scroll-mt-16")}>
          <div className="border-t border-border py-16 md:py-24">
            <h2 className="type-h2 text-text">How it works</h2>
            <div className="relative mt-12">
              <span
                aria-hidden="true"
                className="draw-line absolute top-[17px] right-0 left-0 hidden h-px bg-border-strong md:block"
              />
              <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    data-reveal-child
                    style={{ "--i": index + 1 } as React.CSSProperties}
                    className="flex flex-col gap-3"
                  >
                    <span className="w-fit bg-bg pr-4 font-display text-[28px] leading-none font-medium text-text-muted tabular">
                      {index + 1}
                    </span>
                    <h3 className="type-h3 text-text">{step.title}</h3>
                    <p className="type-body text-text-muted prose-width">
                      {step.title} {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>

        {/* Pricing */}
        <Reveal as="section" id="pricing" className={cn(section, "scroll-mt-16")}>
          <div className="border-t border-border py-16 md:py-24">
            <h2 className="type-h2 text-text">Pricing</h2>
            <p className="mt-2 type-body text-text-muted">
              Every plan includes the builder, analytics and custom domains.
            </p>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <article
                  key={plan.name}
                  data-reveal-child
                  data-slot="card"
                  style={{ "--i": index } as React.CSSProperties}
                  className={cn(
                    "flex flex-col rounded-md border bg-surface-1 p-4 sm:p-6",
                    plan.recommended ? "border-border-strong" : "border-border"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="type-h3 text-text">{plan.name}</h3>
                    {plan.recommended ? <Badge>Most teams pick this</Badge> : null}
                  </div>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="type-h1 tabular text-text">{plan.price}</span>
                    <span className="type-small text-text-muted">{plan.period}</span>
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {plan.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 type-body text-text">
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-4 shrink-0 text-text-muted"
                          strokeWidth={1.5}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.recommended ? "primary" : "outline"}
                    className="mt-8 w-full"
                  >
                    {plan.cta.href.startsWith("/") ? (
                      <Link href={plan.cta.href}>{plan.cta.label}</Link>
                    ) : (
                      <a href={plan.cta.href} target="_blank" rel="noopener noreferrer">
                        {plan.cta.label}
                      </a>
                    )}
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Closing call to action */}
        <Reveal as="section" className={section}>
          <div className="flex flex-col items-start gap-8 border-t border-border py-16 md:py-24">
            <h2 className="type-h2 text-text">Start your first client site today.</h2>
            <Button asChild size="lg">
              <Link href="/sign-up">Start free</Link>
            </Button>
          </div>
        </Reveal>
      </main>

      <footer className={section}>
        <div className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="type-small text-text-muted">
              © {siteConfig.currentYear()} SiteOrbit
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon-sm">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SiteOrbit on GitHub"
              >
                <GitHubIcon />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon-sm">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SiteOrbit on LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}
