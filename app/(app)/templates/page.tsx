import { CopyPlus, LayoutTemplate, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "template-1",
    name: "SaaS Launch",
    category: "Marketing",
    description:
      "A premium landing page shell for launching new digital products with strong headline structure and CTA hierarchy.",
    featured: true,
  },
  {
    id: "template-2",
    name: "Waitlist Funnel",
    category: "Conversion",
    description:
      "A focused conversion path for signups, early access, and pre-launch collection.",
    featured: false,
  },
  {
    id: "template-3",
    name: "Agency Offer",
    category: "Services",
    description:
      "A polished services layout for agencies, studios, and productized service teams.",
    featured: false,
  },
  {
    id: "template-4",
    name: "Docs Intro",
    category: "Product",
    description:
      "A documentation landing structure with clear product orientation and handoff paths.",
    featured: false,
  },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
            Template library
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            Launch faster with structure.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Start from premium page foundations that reduce setup time and keep teams moving toward first publish quickly.
          </p>
        </div>

        <Button className="h-12 rounded-md px-5">
          <Plus data-icon="inline-start" />
          Create Template
        </Button>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl bg-[#1a1f2d] px-6 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#859490]">
            Available templates
          </p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            24
          </p>
        </div>

        <div className="rounded-xl bg-[#1a1f2d] px-6 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#859490]">
            Most used
          </p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            SaaS Launch
          </p>
        </div>

        <div className="rounded-xl bg-[#1a1f2d] px-6 py-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#859490]">
            Goal
          </p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            First success
          </p>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className="overflow-hidden rounded-xl bg-[#1a1f2d] shadow-[0_22px_70px_rgba(0,0,0,0.24)]"
          >
            <div className="border-b border-white/5 px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#161b29] text-[#4fdbc8]">
                    <LayoutTemplate className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-xl font-bold text-[#dee2f5]">
                        {template.name}
                      </h3>
                      {template.featured ? (
                        <span className="rounded-full bg-[#4fdbc8] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#03241f]">
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#bbcac6]">
                      {template.description}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#303443] px-3 py-1 text-xs font-medium text-[#dee2f5]">
                  {template.category}
                </span>
              </div>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div className="rounded-xl bg-[#0f1724] p-4">
                <div className="grid gap-3">
                  <div className="h-10 rounded-lg bg-white/5" />
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="h-24 rounded-lg bg-[linear-gradient(180deg,rgba(79,219,200,0.12),rgba(79,219,200,0.02))]" />
                    <div className="h-24 rounded-lg bg-[linear-gradient(180deg,rgba(137,206,255,0.14),rgba(137,206,255,0.02))]" />
                    <div className="h-24 rounded-lg bg-[linear-gradient(180deg,rgba(79,219,200,0.12),rgba(79,219,200,0.02))]" />
                  </div>
                  <div className="h-36 rounded-xl bg-white/5" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="rounded-md">
                  <CopyPlus data-icon="inline-start" />
                  Use Template
                </Button>
                <Button variant="outline" className="rounded-md border-white/8 bg-transparent text-[#dee2f5]">
                  Preview
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-[linear-gradient(180deg,rgba(10,20,36,0.35),rgba(10,20,36,0.75))] px-6 py-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-[#4fdbc8]">
            <Sparkles className="size-3.5" />
            Curated starting points
          </div>
          <h2 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5] sm:text-5xl">
            Start from a stronger foundation.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Save time with reusable page systems built for campaigns, launches, and team collaboration.
          </p>
        </div>
      </section>
    </div>
  );
}