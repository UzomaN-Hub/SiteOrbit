"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";

import { formatNumber } from "@/lib/utils/format";
import type { AnalyticsTrafficPoint } from "@/types/analytics";

function formatDay(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function ChartTooltip({ active, payload, label }: Partial<TooltipContentProps<number, string>>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-md border border-border bg-surface-2 p-3 shadow-float">
      <p className="type-small text-text-muted">{formatDay(String(label))}</p>
      {payload.map((entry) => (
        <p key={String(entry.dataKey)} className="mt-1 flex items-center gap-4 type-ui">
          <span className="text-text-muted capitalize">{String(entry.dataKey)}</span>
          <span className="ml-auto tabular text-text">{formatNumber(Number(entry.value))}</span>
        </p>
      ))}
    </div>
  );
}

/**
 * Bone line and 8% bone area on hairline gridlines. Amber only marks the
 * point under the cursor (PAGES.md §3.3). Colours come from currentColor so
 * no raw values leave globals.css.
 */
export default function TrafficChart({ data }: { data: AnalyticsTrafficPoint[] }) {
  if (!data.length) {
    return (
      <p className="flex h-72 items-center type-body text-text-muted">
        No visits recorded in this period yet.
      </p>
    );
  }

  return (
    <div className="h-72 w-full text-text" role="img" aria-label="Visits and conversions per day">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 0, bottom: 0, left: -16 }}>
          <CartesianGrid stroke="currentColor" strokeOpacity={0.12} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDay}
            tickLine={false}
            axisLine={false}
            minTickGap={24}
            tick={{ fill: "currentColor", fillOpacity: 0.64, fontSize: 13 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={48}
            tick={{ fill: "currentColor", fillOpacity: 0.64, fontSize: 13 }}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: "currentColor", strokeOpacity: 0.24 }}
          />
          <Area
            type="monotone"
            dataKey="visits"
            stroke="currentColor"
            strokeWidth={1.5}
            fill="currentColor"
            fillOpacity={0.08}
            activeDot={{ r: 4, strokeWidth: 0, className: "fill-brand" }}
            animationDuration={300}
          />
          <Line
            type="monotone"
            dataKey="conversions"
            stroke="currentColor"
            strokeOpacity={0.4}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{ r: 3, strokeWidth: 0, className: "fill-brand" }}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
