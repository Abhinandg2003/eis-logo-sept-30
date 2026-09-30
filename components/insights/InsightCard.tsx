import Link from "next/link";
import type { Insight } from "@/lib/cms/types";

export const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export function InsightCard({ post }: { post: Insight }) {
  return (
    <Link href={`/insights/${post.slug}`} className="surface group flex h-full flex-col p-6 transition-colors hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-brand">
      <span className="w-fit rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600 group-hover:bg-brand-soft group-hover:text-brand-ink">
        {post.category}
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight">{post.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{post.excerpt}</p>
      <p className="mt-5 text-xs text-neutral-500">{fmtDate(post.publishedAt)}, {post.readingMinutes} min read</p>
    </Link>
  );
}
