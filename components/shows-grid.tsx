import Image from "next/image";
import Link from "next/link";
import type { VODCategory } from "@/lib/data";

interface ShowsGridProps {
  categories: VODCategory[];
}

export default function ShowsGrid({ categories }: ShowsGridProps) {
  return (
    <section className="px-4 md:px-8 py-8">
      {/* Divider with label */}
      <div className="flex items-center justify-center mb-4">
        <div className="border-t border-primary/50 flex-1" />
        <span className="px-4 text-sm font-semibold text-foreground bg-card border border-primary/50 rounded-sm py-1">
          Ignite on Demand Videos
        </span>
        <div className="border-t border-primary/50 flex-1" />
      </div>

      <h2 className="text-2xl font-bold text-primary uppercase tracking-wider mb-6 font-serif italic">
        SHOWS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shows/${encodeURIComponent(cat.title)}`}
            className="group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
              <Image
                src={cat.poster || "/placeholder.svg"}
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 group-focus-visible:bg-primary/10 transition-colors duration-300" />
            </div>
            <p className="mt-2 text-xs text-center text-foreground group-hover:text-primary group-focus-visible:text-primary transition-colors">
              {cat.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
