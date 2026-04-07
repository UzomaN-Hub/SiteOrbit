"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardReveal, easeBezier, subtlePulse } from "@/lib/motion";
import type { AnalyticsMetricItem } from "@/types/analytics";

export default function MetricCard({ metric }: { metric: AnalyticsMetricItem }) {
  const isUp = metric.trend_direction === "up";

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
        <CardHeader className="pb-2">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: easeBezier }}
            className="text-xs uppercase tracking-[0.16em] text-[#859490]"
          >
            {metric.label}
          </motion.p>

          <CardTitle className="text-4xl font-extrabold tracking-tight text-[#dee2f5]">
            {metric.value}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <motion.div
            variants={isUp ? subtlePulse : undefined}
            initial={isUp ? "initial" : undefined}
            animate={isUp ? "animate" : undefined}
            className="flex items-center gap-2 text-sm"
          >
            <span className={isUp ? "text-[#4fdbc8]" : "text-[#f2b8b5]"}>
              {isUp ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
            </span>
            <span className={isUp ? "text-[#4fdbc8]" : "text-[#f2b8b5]"}>
              {metric.trend}
            </span>
            <span className="text-[#9aa6c0]">{metric.helper}</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}