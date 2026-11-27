"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import TrafficChart from "@/components/analytics/traffic-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/utils/format";
import type { AnalyticsOverviewResponse } from "@/types/analytics";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="type-h3 text-text">{children}</h2>;
}

export default function AnalyticsOverview({ data }: { data: AnalyticsOverviewResponse }) {
  return (
    <div className="flex flex-col gap-12">
      {data.metrics.length ? (
        <dl className="grid grid-cols-2 border-y border-border lg:grid-cols-4">
          {data.metrics.map((metric, index) => {
            const up = metric.trend_direction === "up";
            const Arrow = up ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={metric.label}
                className={`flex flex-col gap-2 py-6 pr-4 ${index % 2 ? "pl-4 border-l border-border" : ""} lg:border-l lg:border-border lg:pl-6 lg:first:border-l-0 lg:first:pl-0 ${index > 1 ? "border-t border-border lg:border-t-0" : ""}`}
              >
                <dt className="type-label text-text-muted">{metric.label}</dt>
                <dd className="font-display text-[36px] leading-none font-semibold text-text tabular">
                  {metric.value}
                </dd>
                <dd className="flex items-center gap-1 type-small text-text-muted">
                  <Arrow className="size-3.5 text-text" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-text tabular">{metric.trend}</span>
                  <span className="sr-only">{up ? "up" : "down"}</span>
                  <span className="truncate">{metric.helper}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      ) : null}

      <section className="flex flex-col gap-4" aria-labelledby="traffic-title">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <SectionTitle>
            <span id="traffic-title">Traffic</span>
          </SectionTitle>
          <p className="flex items-center gap-4 type-small text-text-muted">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-px w-4 bg-text" /> Visits
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-px w-4 border-t border-dashed border-text-muted" />{" "}
              Conversions
            </span>
          </p>
        </div>
        <TrafficChart data={data.traffic} />
      </section>

      <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
        <section className="flex flex-col gap-4" aria-labelledby="sources-title">
          <SectionTitle>
            <span id="sources-title">Sources</span>
          </SectionTitle>
          {data.sources.length ? (
            <ul className="border-t border-border">
              {data.sources.map((source) => (
                <li key={source.source} className="flex flex-col gap-2 border-b border-border py-3">
                  <div className="flex items-baseline justify-between gap-4 type-ui">
                    <span className="truncate font-normal text-text">{source.source}</span>
                    <span className="flex gap-3 tabular">
                      <span className="text-text">{formatNumber(source.visits)}</span>
                      <span className="w-12 text-right text-text-muted">
                        {source.share.toFixed(1)}%
                      </span>
                    </span>
                  </div>
                  <div className="h-1 bg-surface-2" aria-hidden="true">
                    <div
                      className="h-full bg-text-faint"
                      style={{ width: `${Math.min(source.share, 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="type-body text-text-muted">No traffic sources yet.</p>
          )}
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="pages-title">
          <SectionTitle>
            <span id="pages-title">Top pages</span>
          </SectionTitle>
          {data.top_pages.length ? (
            <Table>
              <TableHeader>
                <tr>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Visits</TableHead>
                  <TableHead className="hidden text-right sm:table-cell">Conversions</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                </tr>
              </TableHeader>
              <TableBody>
                {data.top_pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="max-w-0">
                      <p className="truncate">{page.title}</p>
                      <p className="truncate type-small text-text-muted">{page.path}</p>
                    </TableCell>
                    <TableCell className="text-right tabular">{formatNumber(page.visits)}</TableCell>
                    <TableCell className="hidden text-right tabular sm:table-cell">
                      {formatNumber(page.conversions)}
                    </TableCell>
                    <TableCell className="text-right tabular">
                      {page.conversion_rate.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="type-body text-text-muted">No page views yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
