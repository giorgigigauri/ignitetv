import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface LiveStripProps {
  title?: string;
}

export default function LiveStrip({ title }: LiveStripProps) {
  return (
    <div className="mx-4 md:mx-8 mt-3">
      <Link
        href="/live"
        className="group flex items-center gap-3 bg-card/80 border border-primary/30 rounded-sm px-4 py-3 hover:border-primary/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="flex-shrink-0 flex items-center gap-1.5 bg-red-500/15 border border-red-500/40 rounded-full px-2.5 py-0.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 font-bold text-xs tracking-wider">
            LIVE · CH 6
          </span>
        </span>
        <span className="flex-1 text-sm text-foreground font-medium truncate">
          {title || "Ignite Television"}
        </span>
        <span className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wider">
          Watch
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Link>
    </div>
  );
}
