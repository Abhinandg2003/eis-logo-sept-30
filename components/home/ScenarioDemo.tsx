"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/reactbits/CountUp";

// PLACEHOLDER CONTENT: sample scenario and scores. Later, load from your scoring engine / CMS.
const DIMENSIONS = ["Ownership", "Collaboration", "Judgment"];
const SCENARIO = "A teammate presents your work as theirs in front of the director. Launch is on Friday. What do you do?";
const OPTIONS = [
  { label: "Talk to them privately after the meeting", scores: [72, 84, 78],
    employee: "You protect the relationship while still naming the issue.",
    employer: "Signal: direct but low-friction. Likely to resolve conflict early." },
  { label: "Correct it politely, right there", scores: [88, 58, 64],
    employee: "You value credit and clarity, and you act in the moment.",
    employer: "Signal: high ownership and confidence. May need support on timing." },
  { label: "Let it go and focus on the launch", scores: [46, 70, 60],
    employee: "You put the shared goal first, at some personal cost.",
    employer: "Signal: team-first. Worth checking that contributions stay visible." },
  { label: "Raise it with my manager", scores: [66, 52, 80],
    employee: "You use the structure around you to settle it fairly.",
    employer: "Signal: process-minded. Trusts escalation paths." },
];

export function ScenarioDemo() {
  const [sel, setSel] = useState<number | null>(null);
  const [view, setView] = useState<"employee" | "employer">("employee");
  const o = sel === null ? null : OPTIONS[sel];
  const scores = o?.scores ?? [0, 0, 0];
  const total = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  return (
    <div className="surface p-5  sm:p-7">
      {/* Point-of-view switch */}
      {/* <div role="tablist" aria-label="Point of view" className="inline-flex rounded-full bg-neutral-100 p-1 text-sm">
        {(["employee", "employer"] as const).map((v) => (
          <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)}
            className={cn("rounded-full px-4 py-1.5 capitalize transition-colors focus-visible:outline-2 focus-visible:outline-brand",
              view === v ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-900")}>
            {v}
          </button>
        ))}
      </div> */}

      <p className=" font-display text-lg font-medium leading-snug sm:text-xl">{SCENARIO}</p>

      <div role="radiogroup" aria-label="Your response" className="mt-4 grid gap-2">
        {OPTIONS.map((opt, i) => (
          <button key={opt.label} role="radio" aria-checked={sel === i} onClick={() => setSel(i)}
            className={cn("rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-brand",
              sel === i ? "border-brand bg-brand-soft text-neutral-900" : "border-neutral-200 text-neutral-700 hover:border-neutral-400")}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Live score */}
      <div className="mt-6 grid items-center gap-5 border-t border-neutral-200 pt-5 sm:grid-cols-[auto_1fr]">
        <div>
          <div className="font-display text-5xl font-semibold tabular-nums"><CountUp value={total} /></div>
          <p className="text-xs text-neutral-500">Sample EIS</p>
        </div>
        <div className="space-y-2.5">
          {DIMENSIONS.map((d, i) => (
            <div key={d}>
              <div className="mb-1 flex justify-between text-xs text-neutral-600"><span>{d}</span><span className="tabular-nums">{scores[i] || "-"}</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out" style={{ width: `${scores[i]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-5 min-h-10 text-sm leading-relaxed text-neutral-600">
        {o ? o[view] : "There's no wrong answer. Pick a response and watch the score move."}
      </p>
    </div>
  );
}
