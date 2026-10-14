"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PermissionsDemo } from "@/components/home/PermissionsDemo";
import { ScenarioDemo } from "@/components/home/ScenarioDemo";
import { ResultsDemo } from "@/components/home/ResultsDemo";

const TABS = [
  { id: "device", label: "Device check" },
  { id: "scenario", label: "Scenario" },
  { id: "results", label: "Results" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const AUTOPLAY_MS = 9000; // time on each tab before it switches by itself

type Ctx = {
  tab: TabId;
  pick: (t: TabId) => void;
  setPaused: (p: boolean) => void;
};
const HeroDemoContext = createContext<Ctx | null>(null);
const useHeroDemo = () => {
  const ctx = useContext(HeroDemoContext);
  if (!ctx) throw new Error("Wrap the hero in <HeroDemoProvider>");
  return ctx;
};

export function HeroDemoProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<TabId>("device");
  const [paused, setPaused] = useState(false);       // true while the pointer is over the panel
  const [userPicked, setUserPicked] = useState(false); // true once someone clicks a pill

  // Auto-advance: device -> scenario -> results -> device ...
  useEffect(() => {
    if (paused || userPicked) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => {
      setTab((cur) => TABS[(TABS.findIndex((x) => x.id === cur) + 1) % TABS.length].id);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [tab, paused, userPicked]);

  const pick = (t: TabId) => {
    setUserPicked(true); // a manual choice stops the auto-switching for good
    setTab(t);
  };

  return (
    <HeroDemoContext.Provider value={{ tab, pick, setPaused }}>
      {children}
    </HeroDemoContext.Provider>
  );
}

export function HeroPills({ className }: { className?: string }) {
  const { tab, pick } = useHeroDemo();
  return (
    <div
      role="tablist"
      aria-label="Product demo"
      className={cn("inline-flex rounded-full bg-neutral-100 p-1 text-sm", className)}
    >
      {TABS.map((t) => (
        <button
          key={t.id}
          role="tab"
          id={`hero-tab-${t.id}`}
          aria-selected={tab === t.id}
          aria-controls="hero-panel"
          onClick={() => pick(t.id)}
          className={cn(
            "rounded-full px-4 py-1.5 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand",
            tab === t.id
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-900"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function HeroPanel() {
  const { tab, setPaused } = useHeroDemo();
  return (
    <div
      role="tabpanel"
      id="hero-panel"
      aria-labelledby={`hero-tab-${tab}`}
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* key remounts the demo on every switch, so each one replays its own animation */}
      <div key={tab} className="rise">
        {tab === "device" && <PermissionsDemo />}
        {tab === "scenario" && <ScenarioDemo />}
        {tab === "results" && <ResultsDemo />}
      </div>
    </div>
  );
}