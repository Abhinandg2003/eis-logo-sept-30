"use client";
import { useEffect, useState } from "react";
import { FiCamera, FiMic, FiMove, FiShield, FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";

// PLACEHOLDER CONTENT: simulated checks. Swap in real getUserMedia calls later.
const CHECKS = [
  { label: "Camera", hint: "We confirm you are present. Nothing is recorded.", icon: FiCamera },
  { label: "Microphone", hint: "Say a few words so we can test the input level.", icon: FiMic },
  { label: "Position", hint: "Face centred, well lit, device steady.", icon: FiMove },
  { label: "Permissions", hint: "Full screen, notifications and clipboard allowed.", icon: FiShield },
];
const STEP_MS = 1000; // time spent on each check

export function PermissionsDemo() {
  const [step, setStep] = useState(0); // how many checks are finished

  useEffect(() => {
    if (step >= CHECKS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step]);

  const ready = step >= CHECKS.length;

  return (
    <div className="surface p-5 sm:p-7">
      <p className="font-display text-lg font-medium leading-snug sm:text-xl">
        Before you begin, we check your device.
      </p>
      <p className="mt-1 text-sm text-neutral-600">
        Your camera, microphone, position and permissions must all be ready before the test starts.
      </p>

      <ul className="mt-5 grid gap-2">
        {CHECKS.map((c, i) => {
          const done = i < step;
          const active = i === step;
          const Icon = c.icon;
          return (
            <li
              key={c.label}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors duration-500",
                done ? "border-emerald-200 bg-emerald-50/60" : active ? "border-brand bg-brand-soft" : "border-neutral-200"
              )}
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-base transition-colors duration-500",
                  done ? "bg-emerald-100 text-emerald-700" : active ? "bg-white text-brand" : "bg-neutral-100 text-neutral-400"
                )}
              >
                <Icon aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-neutral-900">{c.label}</span>
                <span className="block text-xs text-neutral-500">{c.hint}</span>
              </span>
              <span className="flex size-6 shrink-0 items-center justify-center" aria-live="polite">
                {done && <FiCheck aria-label="Ready" className="text-emerald-600" />}
                {active && (
                  <span
                    aria-label="Checking"
                    className="size-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand"
                  />
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-neutral-200 pt-4">
        <p className="text-sm text-neutral-600">
          {ready ? "All set. You can start the test." : "Checking your device…"}
        </p>
        <button
          type="button"
          onClick={() => setStep(0)}
          className="text-sm text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline"
        >
          Run again
        </button>
      </div>
    </div>
  );
}