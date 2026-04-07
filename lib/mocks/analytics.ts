import type {
  AnalyticsMetricItem,
  AnalyticsOverviewResponse,
  AnalyticsSourceItem,
  AnalyticsTopPageItem,
  AnalyticsTrafficPoint,
} from "@/types/analytics";

export const analyticsMetricsMock: AnalyticsMetricItem[] = [
  {
    label: "Unique Visitors",
    value: "12,480",
    helper: "30-day total traffic",
    trend: "+12.4%",
    trend_direction: "up",
  },
  {
    label: "Conversions",
    value: "864",
    helper: "Form submits and signups",
    trend: "+6.8%",
    trend_direction: "up",
  },
  {
    label: "Conversion Rate",
    value: "6.9%",
    helper: "Average across selected range",
    trend: "+1.3%",
    trend_direction: "up",
  },
  {
    label: "Top Page Views",
    value: "2,640",
    helper: "Highest single-page traffic",
    trend: "+4.1%",
    trend_direction: "up",
  },
];

export const analyticsTrafficSeriesMock: AnalyticsTrafficPoint[] = [
  { date: "2026-03-03", visits: 320, conversions: 21 },
  { date: "2026-03-08", visits: 410, conversions: 26 },
  { date: "2026-03-13", visits: 465, conversions: 33 },
  { date: "2026-03-18", visits: 520, conversions: 37 },
  { date: "2026-03-23", visits: 610, conversions: 41 },
  { date: "2026-03-28", visits: 690, conversions: 48 },
];

export const analyticsSourceBreakdownMock: AnalyticsSourceItem[] = [
  { source: "Organic Search", visits: 4240, share: 34.0 },
  { source: "Direct", visits: 2995, share: 24.0 },
  { source: "Social", visits: 2246, share: 18.0 },
  { source: "Referral", visits: 1747, share: 14.0 },
  { source: "Email", visits: 1252, share: 10.0 },
];

export const analyticsTopPagesMock: AnalyticsTopPageItem[] = [
  {
    id: "page-home",
    title: "Homepage",
    path: "/",
    visits: 2640,
    conversions: 196,
    conversion_rate: 7.4,
  },
  {
    id: "page-pricing",
    title: "Pricing",
    path: "/pricing",
    visits: 1930,
    conversions: 154,
    conversion_rate: 8.0,
  },
  {
    id: "page-demo",
    title: "Book Demo",
    path: "/book-demo",
    visits: 1480,
    conversions: 139,
    conversion_rate: 9.4,
  },
];

export const analyticsOverviewMock: AnalyticsOverviewResponse = {
  metrics: analyticsMetricsMock,
  traffic: analyticsTrafficSeriesMock,
  sources: analyticsSourceBreakdownMock,
  top_pages: analyticsTopPagesMock,
};