export type AnalyticsRange = "7d" | "30d" | "90d";

export type AnalyticsMetricItem = {
  label: string;
  value: string;
  helper: string;
  trend: string;
  trend_direction: string;
};

export type AnalyticsTrafficPoint = {
  date: string;
  visits: number;
  conversions: number;
};

export type AnalyticsSourceItem = {
  source: string;
  visits: number;
  share: number;
};

export type AnalyticsTopPageItem = {
  id: string;
  title: string;
  path: string;
  visits: number;
  conversions: number;
  conversion_rate: number;
};

export type AnalyticsOverviewResponse = {
  metrics: AnalyticsMetricItem[];
  traffic: AnalyticsTrafficPoint[];
  sources: AnalyticsSourceItem[];
  top_pages: AnalyticsTopPageItem[];
};