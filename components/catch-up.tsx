import Image from "next/image";
import Link from "next/link";
import type { DVRItem } from "@/lib/data";
import { formatDuration } from "@/lib/data";
import HorizontalScroller from "./horizontal-scroller";

interface CatchUpProps {
  items: DVRItem[];
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/New_York",
  });
}

export default function CatchUp({ items }: CatchUpProps) {
  if (items.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-8">
      <h2 className="text-xl font-bold text-primary uppercase tracking-wider mb-4 font-serif italic">
        Catch-Up
      </h2>
      <HorizontalScroller>
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/watch/${item.id}`}
            className="flex-shrink-0 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ width: "160px" }}
          >
            <div className="relative aspect-video overflow-hidden rounded-sm bg-muted">
              {item.thumb && (
                <Image
                  src={item.thumb}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
                  sizes="160px"
                />
              )}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 group-focus-visible:bg-primary/10 transition-colors duration-300" />
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                {formatDuration(item.duration)}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-center text-foreground truncate group-hover:text-primary group-focus-visible:text-primary transition-colors">
              {item.title}
            </p>
            <p className="text-[10px] text-center text-primary">
              {formatTime(item.starttime)}-{formatTime(item.endtime)} (EST)
            </p>
          </Link>
        ))}
      </HorizontalScroller>
    </section>
  );
}
