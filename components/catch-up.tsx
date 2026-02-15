import Image from "next/image";
import Link from "next/link";
import { catchUpItems } from "@/lib/data";
import type { VODCategory } from "@/lib/data";
import HorizontalScroller from "./horizontal-scroller";

interface CatchUpProps {
  categories: VODCategory[];
}

export default function CatchUp({ categories }: CatchUpProps) {
  // Use thumbnails from the first series items of each category for visual variety
  const seriesPool = categories.flatMap((c) => c.series);

  return (
    <section className="px-4 md:px-8 py-8">
      <h2 className="text-xl font-bold text-primary uppercase tracking-wider mb-4 font-serif italic">
        Catch-Up
      </h2>
      <HorizontalScroller>
        {catchUpItems.map((item, idx) => {
          const thumb = seriesPool[idx]?.imageUrl;
          return (
            <Link
              key={item.slug}
              href="/news"
              className="flex-shrink-0 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ width: "160px" }}
            >
              <div className="relative aspect-video overflow-hidden rounded-sm bg-muted">
                {thumb && (
                  <Image
                    src={thumb}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
                    sizes="160px"
                  />
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 group-focus-visible:bg-primary/10 transition-colors duration-300" />
              </div>
              <p className="mt-1.5 text-xs text-center text-foreground truncate group-hover:text-primary group-focus-visible:text-primary transition-colors">
                {item.title}
              </p>
              <p className="text-[10px] text-center text-primary">
                {item.time}
              </p>
            </Link>
          );
        })}
      </HorizontalScroller>
    </section>
  );
}
