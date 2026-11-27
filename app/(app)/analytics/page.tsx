"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import AnalyticsOverview from "@/components/analytics/analytics-overview";
import EmptyState from "@/components/shared/empty-state";
import ErrorState from "@/components/shared/error-state";
import PageHeader from "@/components/shared/page-header";
import Segmented from "@/components/shared/segmented";
import { SitesTableSkeleton, siteTone } from "@/components/sites/sites-table";
import { StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalytics } from "@/hooks/use-analytics";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { useProjects } from "@/hooks/use-projects";
import type { AnalyticsRange } from "@/types/analytics";

function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-12" role="status" aria-busy="true" aria-label="Loading analytics">
      <div className="grid grid-cols-2 gap-6 border-y border-border py-6 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </div>
      <Skeleton className="h-72 w-full rounded-md" />
    </div>
  );
}

function AnalyticsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { projectsQuery } = useProjects();
  const { range, setRange, analyticsQuery, data } = useAnalytics(projectId);

  useDocumentTitle("Analytics");

  const sites = projectsQuery.data ?? [];
  const current = sites.find((site) => site.id === projectId);

  if (!projectId) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Analytics"
          description="Visits, top pages and traffic sources for each site. Choose a site to see its numbers."
        />
        {projectsQuery.isPending ? (
          <SitesTableSkeleton />
        ) : projectsQuery.isError ? (
          <ErrorState
            title="Sites didn't load"
            error={projectsQuery.error}
            onRetry={() => void projectsQuery.refetch()}
          />
        ) : sites.length ? (
          <ul className="border-t border-border">
            {sites.map((site) => (
              <li key={site.id}>
                <Link
                  href={`/analytics?projectId=${site.id}`}
                  className="flex h-14 items-center justify-between gap-4 border-b border-border transition-colors duration-(--dur-fast) hover:bg-surface-2"
                >
                  <span className="truncate type-ui text-text">{site.name}</span>
                  <StatusDot tone={siteTone(site.status)} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No sites to measure yet"
            description="Analytics start once a site exists. Create one from the Sites tab."
            action={
              <Button asChild>
                <Link href="/dashboard">Go to sites</Link>
              </Button>
            }
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Analytics"
        description={
          current ? (
            <>
              Traffic for <span className="text-text">{current.name}</span>.
            </>
          ) : (
            "Traffic for this site."
          )
        }
        action={
          <div className="flex flex-wrap items-center gap-2">
            {sites.length > 1 ? (
              <Select
                value={projectId}
                onValueChange={(value) => router.push(`/analytics?projectId=${value}`)}
              >
                <SelectTrigger size="sm" className="w-48" aria-label="Site">
                  <SelectValue placeholder="Choose a site" />
                </SelectTrigger>
                <SelectContent align="end">
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
            <Segmented<AnalyticsRange>
              label="Date range"
              value={range}
              onChange={setRange}
              options={[
                { value: "7d", label: "7 days" },
                { value: "30d", label: "30 days" },
                { value: "90d", label: "90 days" },
              ]}
            />
          </div>
        }
      />

      {analyticsQuery.isPending ? <AnalyticsSkeleton /> : null}
      {analyticsQuery.isError ? (
        <ErrorState
          title="Analytics didn't load"
          error={analyticsQuery.error}
          onRetry={() => void analyticsQuery.refetch()}
        />
      ) : null}
      {analyticsQuery.isSuccess ? <AnalyticsOverview data={data} /> : null}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsContent />
    </Suspense>
  );
}
