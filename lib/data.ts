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

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Catch-up schedule items (static since the API doesn't provide schedule data)
export const catchUpItems = [
  {
    title: "Ignite News",
    time: "11:00am-12:00pm (EST)",
    slug: "catchup-ignite-news",
  },
  {
    title: "Program Name",
    time: "10:00am-11:00am (EST)",
    slug: "catchup-program",
  },
  {
    title: "Learning Time",
    time: "9:00am-10:00am (EST)",
    slug: "catchup-learning",
  },
  {
    title: "Best of Ignite",
    time: "8:00am-9:00am (EST)",
    slug: "catchup-best",
  },
  {
    title: "Ignite News",
    time: "11:00am-12:00pm (EST)",
    slug: "catchup-ignite-news-2",
  },
  {
    title: "Community Hour",
    time: "10:00am-11:00am (EST)",
    slug: "catchup-community",
  },
];
