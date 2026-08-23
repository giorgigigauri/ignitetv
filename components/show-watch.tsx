"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import VideoPlayer from "./video-player";
import EpisodeCard from "./episode-card";
import HorizontalScroller from "./horizontal-scroller";
import type { VODCategory, VODSeries } from "@/lib/data";
import { cleanTitle, episodeDisplayDate, sortByDateDesc } from "@/lib/data";
import type { ShowConfig } from "@/lib/show-config";
import type { ShowPost } from "@/lib/posts";

interface ShowWatchProps {
  category: VODCategory;
  initialEpisodeId?: string;
  autoPlay?: boolean;
  config?: ShowConfig;
  posts?: ShowPost[];
}

type Tab = "episodes" | "about" | "from-the-show";

export default function ShowWatch({
  category,
  initialEpisodeId,
  autoPlay = false,
  config,
  posts = [],
}: ShowWatchProps) {
  const episodes = sortByDateDesc(category.series);
  const initial =
    episodes.find((e) => e.id === initialEpisodeId) ?? episodes[0];
  const [current, setCurrent] = useState<VODSeries | undefined>(initial);
  const [started, setStarted] = useState(autoPlay);
  const [tab, setTab] = useState<Tab>("episodes");
  const playerRef = useRef<HTMLDivElement>(null);

  const hasAbout = Boolean(config?.description);
  const hasPosts = posts.length > 0;
  const tabs: { key: Tab; label: string }[] = [
    { key: "episodes", label: "Episodes" },
    ...(hasAbout ? [{ key: "about" as Tab, label: "About" }] : []),
    ...(hasPosts ? [{ key: "from-the-show" as Tab, label: "From the Show" }] : []),
  ];

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

      {/* Poster + identity block — poster rides over the player fade */}
      <div className="px-4 md:px-8 relative z-10 flex items-end gap-4 md:gap-6">
        {category.poster && (
          <div className="flex-shrink-0 -mt-10 md:-mt-16 w-24 md:w-36 relative aspect-[3/4] overflow-hidden rounded-sm ring-1 ring-primary/40 shadow-xl bg-muted">
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
            {config?.schedule && (
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-primary border border-primary/50 rounded-full px-2.5 py-0.5">
                {config.schedule}
              </span>
            )}
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-foreground border border-white/25 rounded-full px-2.5 py-0.5">
              {episodes.length} episode{episodes.length === 1 ? "" : "s"}
            </span>
            {episodes[0] && episodeDisplayDate(episodes[0]) && (
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-foreground border border-white/25 rounded-full px-2.5 py-0.5">
                Latest · {episodeDisplayDate(episodes[0])}
              </span>
            )}
            {config?.host && (
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-foreground border border-white/25 rounded-full px-2.5 py-0.5">
                With {config.host}
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

      {/* Tabs */}
      {tabs.length > 1 && (
        <div className="px-4 md:px-8 pt-6 border-b border-white/10">
          <div className="flex gap-6">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`pb-2 text-sm font-semibold transition-colors border-b-2 -mb-px focus-visible:outline-none focus-visible:text-primary ${
                  tab === t.key
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Episodes tab */}
      {tab === "episodes" && episodes.length > 0 && (
        <section className="px-4 md:px-8 py-8">
          {tabs.length === 1 && (
            <h3 className="text-base font-bold text-primary uppercase tracking-wider mb-4">
              Episodes
            </h3>
          )}
          <HorizontalScroller>
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                title={cleanTitle(episode.title)}
                image={episode.imageUrl}
                duration={episode.duration}
                subtitle={episodeDisplayDate(episode)}
                active={episode.id === current?.id}
                onClick={() => handleSelect(episode)}
              />
            ))}
          </HorizontalScroller>
        </section>
      )}

      {/* About tab */}
      {tab === "about" && hasAbout && (
        <section className="px-4 md:px-8 py-8 max-w-3xl">
          <p className="text-sm text-foreground/90 leading-relaxed">
            {config?.description}
          </p>
          {config?.host && (
            <p className="text-sm text-muted-foreground mt-3">
              Hosted by {config.host}
              {config?.schedule ? ` · ${config.schedule}` : ""}
            </p>
          )}
        </section>
      )}

      {/* From the Show tab */}
      {tab === "from-the-show" && hasPosts && (
        <section className="px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-card border border-white/10 rounded-sm overflow-hidden"
              >
                {post.image && (
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={post.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.25em]">
                    {post.type}
                  </p>
                  <h3 className="text-base font-bold text-foreground mt-1.5 leading-snug">
                    {post.title}
                  </h3>
                  {post.date && (
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {post.date}
                    </p>
                  )}
                  <div className="mt-3 space-y-2">
                    {post.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-sm text-foreground/85 leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
