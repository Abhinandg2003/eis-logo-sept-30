import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insights } from "@/lib/cms";
import { fmtDate } from "@/components/insights/InsightCard";

type Props = { params: Promise<{ slug: string }> };

// Pre-renders every article at build time (fast, static). FUTURE: keep as is, add revalidate for ISR.
export async function generateStaticParams() {
  return (await insights.list()).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await insights.getBySlug((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function InsightPage({ params }: Props) {
  const post = await insights.getBySlug((await params).slug);
  if (!post) notFound();
  return (
    <article className="section !pt-14 sm:!pt-20">
      <div className="container-x max-w-3xl">
        <Link href="/insights" className="text-sm text-neutral-500 hover:text-neutral-900">Back to insights</Link>
        <h1 className="h-display mt-6 !text-3xl sm:!text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-neutral-500">{post.author}, {fmtDate(post.publishedAt)}, {post.readingMinutes} min read</p>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-neutral-700">
          {post.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </div>
    </article>
  );
}
