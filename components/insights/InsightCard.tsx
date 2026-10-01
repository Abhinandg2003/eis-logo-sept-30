import Link from "next/link";
import type { Insight } from "@/lib/cms/types";
import { IoIosArrowForward } from "react-icons/io";

export const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export function InsightCard({ post }: { post: Insight }) {
  return (
    <Link href={`/insights/${post.slug}`} className="surface  group flex h-full flex-col  transition-colors !rounded-[0.6rem] border-none !overflow-hidden">
      <div className=" justify-center flex items-center   rounded-[0.6rem] w-full h-[22vh] mb-3 overflow-hidden"> 
      <img src={post.image} alt={post.image} className="object-cover transition-all duration-300  h-full object-cover group-hover:scale-[102%]   w-full "/>
      {/* <h1 className="absolute text-2xl text-white font-normal">{post.word}</h1> */}
      </div>
      <div className="flex gap-2">
      <span className="w-fit  py-1 text-[0.76rem] text-black !font-normal">
        {post.category}

        <span className="ml-3 opacity-20 text-[0.7rem]">•</span>
<span className="ml-3 text-[0.77rem]">{fmtDate(post.publishedAt)}</span></span>

      </div>

      <h3 className="mt-4 font-display text-lg font-normal leading-snug tracking-tight">{post.title}</h3>
    </Link>
  );
}
