import type { Metadata } from "next";
import { InsightCard } from "@/components/insights/InsightCard";
import { insights } from "@/lib/cms";

export const metadata: Metadata = { title: "Insights", description: "Articles on scenario-based scoring, for employees and employers." };
// FUTURE (dynamic CMS): export const revalidate = 60; // refresh static page every 60s (ISR)

export default async function InsightsPage() {
  const posts = await insights.list();
  return (
    <section className="section !pt-14 sm:!pt-20">
      <div className="container-x">
        <h1 className="h-display rise">Insights</h1>
        <p className="lead rise mt-5" style={{ "--i": 1 } as React.CSSProperties}>
          PLACEHOLDER: short intro about what readers will find here.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <InsightCard key={p.slug} post={p} />)}
        </div>
        {/* FUTURE: category filter, search, pagination */}
      </div>
    </section>
  );
}
