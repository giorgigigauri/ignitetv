"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import VideoPlayer from "./video-player";
import EpisodeCard from "./episode-card";
import HorizontalScroller from "./horizontal-scroller";
import type { VODCategory, VODSeries } from "@/lib/data";
import { cleanTitle, sortByDateDesc } from "@/lib/data";

interface ShowWatchProps {
  category: VODCategory;
  initialEpisodeId?: string;
  autoPlay?: boolean;
}

export default function ShowWatch({
  category,
  initialEpisodeId,
  autoPlay = false,
}: ShowWatchProps) {
  const episodes = sortByDateDesc(category.series);
  const initial =
    episodes.find((e) => e.id === initialEpisodeId) ?? episodes[0];
  const [current, setCurrent] = useState<VODSeries | undefined>(initial);
  const [started, setStarted] = useState(autoPlay);
  const playerRef = useRef<HTMLDivElement>(null);

  function handleSelect(episode: VODSeries) {
    if (episode.id === current?.id) return;
    setCurrent(episode);
    setStarted(true);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Wide player on top */}
      <div ref={playerRef} className="px-4 md:px-8 scroll-mt-24">
        <VideoPlayer
          src={current?.video}
          poster={current?.imageUrl}
          autoPlay={started}
          storageKey={current ? `ignite-resume:${current.id}` : undefined}
        />
      </div>

      {/* Poster + identity block */}
      <div className="px-4 md:px-8 -mt-10 md:-mt-16 relative z-10 flex items-end gap-4 md:gap-6">
        {category.poster && (
          <div className="flex-shrink-0 w-24 md:w-36 relative aspect-[3/4] overflow-hidden rounded-sm ring-1 ring-primary/40 shadow-xl bg-muted">
            <Image
              src={category.poster}
              alt={category.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 144px"
            />
          </div>
        )}
        <div className="pb-1 min-w-0">
          <p className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-1">
            Ignite Original
          </p>
          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground truncate">
            {category.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-foreground border border-white/25 rounded-full px-2.5 py-0.5">
              {episodes.length} episode{episodes.length === 1 ? "" : "s"}
            </span>
            {episodes[0]?.rdate && (
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-foreground border border-white/25 rounded-full px-2.5 py-0.5">
                Latest · {episodes[0].rdate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Now playing details */}
      {current && (
        <div className="px-4 md:px-8 pt-5">
          <h2 className="text-lg md:text-xl font-bold text-primary leading-tight">
            {cleanTitle(current.title)}
          </h2>
          {current.description && (
            <p className="text-sm text-foreground/90 leading-relaxed mt-2 max-w-3xl">
              {current.description}
            </p>
          )}
        </div>
      )}

      {/* Episode library */}
      {episodes.length > 0 && (
        <section className="px-4 md:px-8 py-8">
          <h3 className="text-base font-bold text-primary uppercase tracking-wider mb-4">
            Episodes
          </h3>
          <HorizontalScroller>
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                title={cleanTitle(episode.title)}
                image={episode.imageUrl}
                duration={episode.duration}
                subtitle={episode.rdate}
                active={episode.id === current?.id}
                onClick={() => handleSelect(episode)}
              />
            ))}
          </HorizontalScroller>
        </section>
      )}
    </>
  );
}
