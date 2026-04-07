"use client";

import { motion } from "framer-motion";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import {
  cardReveal,
  panelSlideUp,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type {
  AnalyticsSourceItem,
  AnalyticsTrafficPoint,
} from "@/types/analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TrafficChartProps = {
  data: AnalyticsTrafficPoint[];
  sources: AnalyticsSourceItem[];
};

const sourceColors = [
  "#4FDBC8",
  "#89CEFF",
  "#DEE2F5",
  "#7DD3A7",
  "#F7C97A",
];

function formatDateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

function formatTooltipMetricValue(value: ValueType | undefined, name: NameType | undefined) {
  const numericValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : 0;

  const safeName = typeof name === "string" ? name : "Metric";

  return [
    Number.isFinite(numericValue) ? numericValue.toLocaleString() : "0",
    safeName === "visits" ? "Visits" : safeName === "conversions" ? "Conversions" : safeName,
  ] as [string, string];
}

function formatSourceTooltipValue(value: ValueType | undefined, name: NameType | undefined) {
  const numericValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : 0;

  const safeName = typeof name === "string" ? name : "Source";

  return [
    Number.isFinite(numericValue) ? numericValue.toLocaleString() : "0",
    safeName,
  ] as [string, string];
}

export default function TrafficChart({
  data,
  sources,
}: TrafficChartProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]"
    >
      <motion.div
        variants={cardReveal}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -3, scale: 1.004 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#dee2f5]">
              Traffic overview
            </CardTitle>
            <CardDescription className="text-[#9aa6c0]">
              Visits and conversions across the selected analytics range.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <motion.div
              variants={panelSlideUp}
              initial="hidden"
              animate="visible"
              className="h-[320px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4FDBC8" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#4FDBC8" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDateLabel}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#8d99b2", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#8d99b2", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#111522",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                      color: "#dee2f5",
                    }}
                    labelStyle={{ color: "#9aa6c0" }}
                    formatter={formatTooltipMetricValue}
                    labelFormatter={(label) => formatDateLabel(String(label))}
                  />

                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#4FDBC8"
                    strokeWidth={2.5}
                    fill="url(#visitsFill)"
                    animationDuration={850}
                    animationEasing="ease-out"
                  />

                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="#89CEFF"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5 }}
                    animationDuration={950}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={cardReveal}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -3, scale: 1.004 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#dee2f5]">
              Source breakdown
            </CardTitle>
            <CardDescription className="text-[#9aa6c0]">
              Where your visitors are coming from.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              variants={panelSlideUp}
              initial="hidden"
              animate="visible"
              className="h-[220px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sources}
                    dataKey="visits"
                    nameKey="source"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={3}
                    stroke="transparent"
                    animationDuration={850}
                    animationEasing="ease-out"
                  >
                    {sources.map((source, index) => (
                      <Cell
                        key={source.source}
                        fill={sourceColors[index % sourceColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#111522",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 14,
                      color: "#dee2f5",
                    }}
                    labelStyle={{ color: "#9aa6c0" }}
                    formatter={formatSourceTooltipValue}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {sources.map((source, index) => (
                <motion.div
                  key={source.source}
                  variants={panelSlideUp}
                  className="rounded-xl bg-[#111522] px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor: sourceColors[index % sourceColors.length],
                        }}
                      />
                      <span className="truncate text-sm font-medium text-[#dee2f5]">
                        {source.source}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-[#dee2f5]">
                        {source.visits.toLocaleString()}
                      </span>
                      <span className="text-[#9aa6c0]">
                        {source.share.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(source.share, 100)}%` }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn("h-full rounded-full")}
                      style={{
                        backgroundColor: sourceColors[index % sourceColors.length],
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
}