// CMS CONTRACT. Pages only talk to this interface, never to the data source directly.
export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string; // ISO date
  readingMinutes: number;
  body: string[]; // paragraphs for now. FUTURE: swap for MDX / rich text from your CMS
};

export interface InsightsProvider {
  list(): Promise<Insight[]>;
  getBySlug(slug: string): Promise<Insight | null>;
}
