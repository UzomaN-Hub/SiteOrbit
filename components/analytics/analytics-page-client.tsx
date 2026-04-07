"use client";

import { motion } from "framer-motion";

import MetricCard from "@/components/analytics/metric-card";
import TopPagesTable from "@/components/analytics/top-pages-table";
import TrafficChart from "@/components/analytics/traffic-chart";
import { panelSlideUp, staggerContainer } from "@/lib/motion";
import type { AnalyticsOverviewResponse } from "@/types/analytics";

export default function AnalyticsPageClient({
  data,
}: {
  data: AnalyticsOverviewResponse;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.section
        variants={staggerContainer}
        className="grid gap-5 lg:grid-cols-4"
      >
        {data.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </motion.section>

      <motion.div variants={panelSlideUp}>
        <TrafficChart data={data.traffic} sources={data.sources} />
      </motion.div>

      <motion.div variants={panelSlideUp}>
        <TopPagesTable pages={data.top_pages} />
      </motion.div>
    </motion.div>
  );
}