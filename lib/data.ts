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

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

