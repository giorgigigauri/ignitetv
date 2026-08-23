import Link from "next/link";
import { Play } from "lucide-react";
import { formatDuration } from "@/lib/data";

interface EpisodeCardProps {
  title: string;
  image?: string;
  duration?: number;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export default function EpisodeCard({
  title,
  image,
  duration,
  subtitle,
  href,
  onClick,
  active,
}: EpisodeCardProps) {
  const inner = (
    <>
      <div
        className={`relative aspect-video overflow-hidden rounded-sm bg-muted ${
          active ? "ring-2 ring-primary" : ""
        }`}
      >
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-focus-visible:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 group-focus-visible:bg-black/40 transition-colors duration-300">
          <Play className="w-8 h-8 text-white fill-white drop-shadow-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />
        </div>
        {duration != null && duration > 0 && (
          <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded-sm">
            {formatDuration(duration)}
          </span>
        )}
      </div>
      <p
        className={`mt-1.5 text-xs line-clamp-2 leading-tight transition-colors ${
          active ? "text-primary" : "text-foreground group-hover:text-primary group-focus-visible:text-primary"
        }`}
      >
        {title}
      </p>
      {subtitle && (
        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
          {subtitle}
        </p>
      )}
    </>
  );

  const className =
    "flex-shrink-0 group rounded-sm text-left w-[180px] md:w-[210px] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}
