import { staticProvider } from "./static-provider";
import type { InsightsProvider } from "./types";

// FUTURE: when content becomes dynamic, write a new provider (headless CMS, database, API...)
// that implements InsightsProvider and select it here, e.g. via process.env.CMS_PROVIDER.
// Pages need no changes. Add `export const revalidate = 60` on pages for ISR.
export const insights: InsightsProvider = staticProvider;
