// Hand-maintained show facts the API doesn't provide yet.
// When Tulix populates getchannelinfo.php, this file goes away.
// Keys are show slugs (see slugify in lib/data.ts).

export interface ShowConfig {
  /** e.g. "Fridays · 20:00" — shown as a pill on the show page */
  schedule?: string;
  /** e.g. "Joel Bhagwandin" — shown as "With <host>" */
  host?: string;
  /** Short show description for the hero and show page */
  description?: string;
}

export const SHOW_CONFIG: Record<string, ShowConfig> = {
  "ignite-finance": {
    host: "Joel Bhagwandin",
  },
  // "the-president-s-diary": { schedule: "", host: "", description: "" },
  // "grow-guyana": { schedule: "", host: "", description: "" },
};

/**
 * Pin a show to the home hero by its slug (e.g. "ignite-finance").
 * null = automatic: the show with the newest episode is featured.
 */
export const FEATURED_SHOW_SLUG: string | null = null;
