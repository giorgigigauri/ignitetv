import Link from "next/link";
import { Play } from "lucide-react";
import type { VODCategory } from "@/lib/data";
import { cleanTitle, episodeDisplayDate, slugify, sortByDateDesc } from "@/lib/data";
import { SHOW_CONFIG } from "@/lib/show-config";

interface HomeHeroProps {
  category: VODCategory;
}

export default function HomeHero({ category }: HomeHeroProps) {
  const newest = sortByDateDesc(category.series)[0];
  const slug = slugify(category.title);
  const background = newest?.imageUrl || category.poster;
  const description = SHOW_CONFIG[slug]?.description;

  return (
    <section className="relative overflow-hidden rounded-sm mx-4 md:mx-8">
      {/* Background art with fade */}
      <div className="absolute inset-0">
        {background && (
          <img
            src={background}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0808] via-[#0a0808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0808]/80 via-transparent to-transparent" />
      </div>

      <div className="relative px-6 md:px-10 pt-28 md:pt-44 pb-8 md:pb-10 max-w-3xl">
        <p className="text-primary text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] mb-2">
          Featured Original
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">
          {category.title}
        </h1>
        {description && (
          <p className="text-sm text-foreground/85 mb-3 line-clamp-2 max-w-xl">
            {description}
          </p>
        )}
        {newest && (
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
            Latest episode: {cleanTitle(newest.title)}
            {episodeDisplayDate(newest) ? ` · ${episodeDisplayDate(newest)}` : ""}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/shows/${slug}?play=1`}
            className="inline-flex items-center gap-2 bg-primary text-black font-semibold text-sm px-5 py-2.5 rounded-sm hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Latest Episode
          </Link>
          <Link
            href={`/shows/${slug}`}
            className="inline-flex items-center border border-white/50 text-foreground font-semibold text-sm px-5 py-2.5 rounded-sm hover:border-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Show Page
          </Link>
        </div>
      </div>
    </section>
  );
}
