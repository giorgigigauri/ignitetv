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

export function categoriesToShows(categories: VODCategory[]) {
  return categories.map((cat) => ({
    name: cat.title,
    href: `/shows/${encodeURIComponent(cat.title)}`,
  }));
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

