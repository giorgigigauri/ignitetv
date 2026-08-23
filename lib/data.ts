export interface DVRItem {
  id: number;
  starttime: string;
  endtime: string;
  duration: number;
  title: string;
  descr: string;
  thumb: string;
  stream: string;
  downloadurl: string;
  downloadsize: string;
}

export interface DVRResponse {
  title: string;
  stream: string;
  thumb: string;
  dvr: DVRItem[];
}

export async function fetchDVR(): Promise<DVRResponse> {
  const res = await fetch("https://tulixdvr2.tulix.tv/api/ignitetv/getdvr.php", {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch DVR");
  }
  return res.json();
}

export interface VODSeries {
  id: string;
  duration: number;
  title: string;
  description: string;
  rdate: string;
  directors: string;
  starring: string;
  imageUrl: string;
  video: string;
}

export interface VODCategory {
  id: number;
  title: string;
  poster: string;
  movies: unknown[];
  series: VODSeries[];
}

export async function fetchVODs(): Promise<VODCategory[]> {
  const res = await fetch("https://ignitetv.tulix.tv/api/getvods.php", {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch VODs");
  }
  return res.json();
}

export interface BannerAd {
  image: string;
  link: string;
}

export interface BannerResponse {
  top: BannerAd;
  bottom: BannerAd;
}

export async function fetchBanners(): Promise<BannerResponse | null> {
  try {
    const res = await fetch("https://ignitetv.tulix.tv/api/getbanner.php", {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch {
    return null;
  }
}

export function categoriesToShows(categories: VODCategory[]) {
  return categories.map((cat) => ({
    name: cat.title,
    href: `/shows/${slugify(cat.title)}`,
  }));
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findCategoryBySlug(
  categories: VODCategory[],
  slug: string,
): VODCategory | undefined {
  return categories.find((c) => slugify(c.title) === slug);
}

/** API titles have no spaces; add them back at capital-letter boundaries. */
export function cleanTitle(title: string): string {
  return title
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
}

/** News lives on ignitenews.com now; keep its VOD category out of listings. */
export function visibleCategories(categories: VODCategory[]): VODCategory[] {
  return categories.filter(
    (c) => !c.title.toLowerCase().includes("ignite news"),
  );
}

export interface LatestEpisode {
  episode: VODSeries;
  category: VODCategory;
}

export function getLatestEpisodes(
  categories: VODCategory[],
  limit: number,
): LatestEpisode[] {
  return categories
    .flatMap((category) =>
      category.series.map((episode) => ({ episode, category })),
    )
    .sort(
      (a, b) =>
        parseDateFromTitle(b.episode.title).getTime() -
        parseDateFromTitle(a.episode.title).getTime(),
    )
    .slice(0, limit);
}

/** The show whose newest episode is most recent — powers the home hero. */
export function getFeaturedCategory(
  categories: VODCategory[],
): VODCategory | undefined {
  const withEpisodes = categories.filter((c) => c.series.length > 0);
  if (!withEpisodes.length) return categories[0];
  return withEpisodes.reduce((best, cat) => {
    const newest = (c: VODCategory) =>
      Math.max(...c.series.map((s) => parseDateFromTitle(s.title).getTime()));
    return newest(cat) > newest(best) ? cat : best;
  });
}

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

export function parseDateFromTitle(title: string): Date {
  const match = title.match(
    /([A-Z][a-z]+?)(\d{1,2}),?\s*(\d{4})/,
  );
  if (match) {
    const monthNum = MONTHS[match[1]];
    if (monthNum !== undefined) {
      return new Date(Number(match[3]), monthNum, Number(match[2]));
    }
  }
  return new Date(0);
}

export function sortByDateDesc(series: VODSeries[]): VODSeries[] {
  return [...series].sort(
    (a, b) =>
      parseDateFromTitle(b.title).getTime() -
      parseDateFromTitle(a.title).getTime(),
  );
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

