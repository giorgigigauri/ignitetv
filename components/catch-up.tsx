"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import type { DVRItem } from "@/lib/data";
import { formatDuration } from "@/lib/data";
import HorizontalScroller from "./horizontal-scroller";

interface CatchUpProps {
  items: DVRItem[];
  onSelect?: (item: DVRItem) => void;
}

function formatTime(iso: string): string {
  // Parse the ISO string directly to avoid hydration mismatch from locale differences
  const d = new Date(iso);
  // Convert to EST (UTC-5)
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const est = new Date(utc - 5 * 3600000);
  let h = est.getHours();
  const m = est.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function CatchUp({ items, onSelect }: CatchUpProps) {
  if (items.length === 0) return null;

  return (
    <section className="px-4 md:px-8 py-16">
      <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 font-serif italic">
          Hourly Program
      </h2>
      <HorizontalScroller>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect?.(item)}
            className="flex-shrink-0 group rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ width: "160px" }}
          >
            <div className="relative aspect-video overflow-hidden rounded-sm bg-muted">
              {item.thumb && (
                <Image
                  src={item.thumb}
                  alt={item.title}
                  fill
                  className="object-contain group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
                  sizes="160px"
                />
              )}
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
                <Play className="w-8 h-8 text-white fill-white drop-shadow-md" />
              </div>
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
          </button>
        ))}
      </HorizontalScroller>
    </section>
  );
}
