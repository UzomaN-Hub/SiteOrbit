"use client";

import { useSearchParams } from "next/navigation";
import { BarChart3 } from "lucide-react";

import AnalyticsPageClient from "@/components/analytics/analytics-page-client";
import { useAnalytics } from "@/hooks/use-analytics";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { range, setRange, analyticsQuery, data } = useAnalytics(projectId);

  if (!projectId) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-xl rounded-2xl border border-dashed border-white/10 bg-[#111522] px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-[#dee2f5]">Pick a project first</h2>
          <p className="mt-3 text-sm leading-7 text-[#9aa6c0]">
            Open analytics from a project so SiteOrbit can load the correct metrics.
          </p>
        </div>
      </div>
    );
  }

  if (analyticsQuery.isPending) {
    return (
      <div className="space-y-8">
        <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
              Analytics overview
            </p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
              Measure your orbit.
            </h1>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[154px] animate-pulse rounded-xl bg-[#1a1f2d]" />
          ))}
        </section>
      </div>
    );
  }

  if (analyticsQuery.isError) {
    return (
      <div className="rounded-xl border border-white/8 bg-[#1a1f2d] px-6 py-8">
        <p className="text-lg font-semibold text-[#dee2f5]">
          Analytics could not be loaded
        </p>
        <p className="mt-2 text-sm leading-6 text-[#bbcac6]">
          {analyticsQuery.error instanceof Error
            ? analyticsQuery.error.message
            : "Something went wrong while loading analytics."}
        </p>
        <Button
          type="button"
          onClick={() => void analyticsQuery.refetch()}
          className="mt-5 h-11 rounded-md px-5"
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4fdbc8]">
            Analytics overview
          </p>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            Measure your orbit.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#bbcac6]">
            Read the most important traffic signals first, then inspect page performance.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-[#111522] p-1">
          {(["7d", "30d", "90d"] as const).map((value) => (
            <Button
              key={value}
              type="button"
              variant={range === value ? "default" : "ghost"}
              className="h-10 rounded-md"
              onClick={() => setRange(value)}
            >
              <BarChart3 data-icon="inline-start" />
              {value}
            </Button>
          ))}
        </div>
      </section>

      <AnalyticsPageClient data={data} />
    </div>
  );
}