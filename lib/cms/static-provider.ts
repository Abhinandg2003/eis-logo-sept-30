import { insightsData } from "@/content/insights";
import type { InsightsProvider } from "./types";

// Static provider: reads from /content/insights.ts. Newest first.
export const staticProvider: InsightsProvider = {
  async list() {
    return [...insightsData].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  },
  async getBySlug(slug) {
    return insightsData.find((i) => i.slug === slug) ?? null;
  },
};
