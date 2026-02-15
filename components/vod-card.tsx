import Image from "next/image";
import Link from "next/link";
import type { VODSeries } from "@/lib/data";
import { formatDuration } from "@/lib/data";

interface VODCardProps {
  item: VODSeries;
  orientation?: "landscape" | "portrait";
}

export default function VODCard({
  item,
  orientation = "landscape",
}: VODCardProps) {
  const isLandscape = orientation === "landscape";

  // Clean up title: the API titles have no spaces, so we add them back at capital-letter boundaries
  const cleanTitle = item.title
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

  return (
    <Link
      href={`/watch/${encodeURIComponent(item.id)}`}
      className="flex-shrink-0 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{ width: isLandscape ? "180px" : "150px" }}
    >
      <div
        className={`relative overflow-hidden rounded-sm bg-muted ${
          isLandscape ? "aspect-video" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={item.imageUrl || "/placeholder.svg"}
          alt={cleanTitle}
          fill
          className="object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
          sizes={isLandscape ? "180px" : "150px"}
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 group-focus-visible:bg-primary/10 transition-colors duration-300" />
        {item.duration > 0 && (
          <span className="absolute bottom-1 right-1 bg-background/80 text-foreground text-[10px] px-1 py-0.5 rounded-sm">
            {formatDuration(item.duration)}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs text-foreground line-clamp-2 group-hover:text-primary group-focus-visible:text-primary transition-colors leading-tight">
        {cleanTitle}
      </p>
    </Link>
  );
}
