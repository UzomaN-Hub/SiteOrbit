"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";

import {
  cardReveal,
  easeBezier,
  panelSlideUp,
  staggerContainer,
} from "@/lib/motion";
import type { AnalyticsTopPageItem } from "@/types/analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TopPagesTableProps = {
  pages: AnalyticsTopPageItem[];
};

export default function TopPagesTable({ pages }: TopPagesTableProps) {
  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3, scale: 1.003 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
    >
      <Card className="rounded-xl border-none bg-[#1a1f2d] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#dee2f5]">
            Top pages
          </CardTitle>
          <CardDescription className="text-[#9aa6c0]">
            Strongest pages by visits and conversion performance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="hidden overflow-hidden rounded-xl border border-white/8 xl:block">
            <div className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr] bg-[#111522] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7f8aa3]">
              <span>Page</span>
              <span>Visits</span>
              <span>Conversions</span>
              <span>Conv. rate</span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="divide-y divide-white/8"
            >
              {pages.map((page, index) => (
                <motion.div
                  key={page.id}
                  variants={panelSlideUp}
                  className="grid grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr] items-center bg-[#171c2a] px-5 py-4 transition hover:bg-[#1c2232]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-[#dee2f5]">
                        {page.title}
                      </span>
                      {index === 0 ? (
                        <span className="rounded-full bg-[#172c29] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4fdbc8]">
                          Top
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-[#9aa6c0]">
                      <span className="truncate">{page.path}</span>
                      <ExternalLink className="size-3.5 shrink-0" />
                    </div>
                  </div>

                  <div className="text-sm text-[#dee2f5]">
                    {page.visits.toLocaleString()}
                  </div>

                  <div className="text-sm text-[#dee2f5]">
                    {page.conversions.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="size-4 text-[#4fdbc8]" />
                    <span className="text-[#4fdbc8]">
                      {page.conversion_rate.toFixed(1)}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-3 xl:hidden"
          >
            {pages.map((page, index) => (
              <motion.div
                key={page.id}
                variants={panelSlideUp}
                className="rounded-xl border border-white/8 bg-[#111522] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-[#dee2f5]">
                        {page.title}
                      </span>
                      {index === 0 ? (
                        <span className="rounded-full bg-[#172c29] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4fdbc8]">
                          Top
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-1 truncate text-sm text-[#9aa6c0]">
                      {page.path}
                    </div>
                  </div>

                  <div className="rounded-full bg-[#172c29] px-3 py-1 text-xs font-medium text-[#4fdbc8]">
                    {page.conversion_rate.toFixed(1)}%
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[#171c2a] px-3 py-3">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#7f8aa3]">
                      Visits
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#dee2f5]">
                      {page.visits.toLocaleString()}
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#171c2a] px-3 py-3">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#7f8aa3]">
                      Conversions
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#dee2f5]">
                      {page.conversions.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {pages.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.08, ease: easeBezier }}
              className="mt-4 text-xs text-[#7f8aa3]"
            >
              Pages are ranked by traffic first, then conversion performance.
            </motion.div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
}