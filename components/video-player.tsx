"use client";

import React from "react"

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Repeat,
  Cast,
  MonitorSmartphone,
  Settings,
} from "lucide-react";

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(70);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      setProgress(Math.round(pct));
    },
    [],
  );

  const currentTime = `${Math.floor((progress / 100) * 147 / 60)}:${String(Math.floor((progress / 100) * 147) % 60).padStart(2, "0")}`;

  return (
    <div className="relative w-full aspect-video bg-card rounded-sm overflow-hidden group">
      {/* Video thumbnail */}
      <Image
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=675&fit=crop"
        alt="Video thumbnail - Private sector wants long-term viability"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Play button overlay */}
      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center z-10 focus-visible:outline-none"
          aria-label="Play video"
        >
          <div className="w-16 h-16 rounded-full bg-background/60 flex items-center justify-center hover:bg-background/80 focus-visible:ring-2 focus-visible:ring-primary transition-colors">
            <Play className="w-7 h-7 text-foreground ml-1" />
          </div>
        </button>
      )}

      {/* Caption overlay */}
      <div className="absolute bottom-14 left-0 right-0 flex justify-center pointer-events-none">
        <span className="bg-background/70 text-foreground text-sm px-3 py-1 rounded-sm">
          We had fun
        </span>
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-2 pt-6">
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>

          {/* Repeat */}
          <button
            type="button"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label="Repeat"
          >
            <Repeat className="w-4 h-4" />
          </button>

          {/* Current time */}
          <span className="text-xs text-foreground tabular-nums min-w-[2.5rem]">
            {currentTime}
          </span>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="flex-1 h-1 bg-muted rounded-full cursor-pointer relative group/bar"
            onClick={handleProgressClick}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setProgress((p) => Math.min(100, p + 2));
              if (e.key === "ArrowLeft") setProgress((p) => Math.max(0, p - 2));
            }}
            role="slider"
            aria-label="Video progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            tabIndex={0}
          >
            <div
              className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 focus-within:opacity-100 transition-opacity"
              style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>

          {/* Total time */}
          <span className="text-xs text-foreground tabular-nums min-w-[2.5rem] text-right">
            2:27
          </span>

          {/* Subtitles */}
          <button
            type="button"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label="Subtitles"
          >
            <MonitorSmartphone className="w-4 h-4" />
          </button>

          {/* Volume */}
          <button
            type="button"
            onClick={() => setMuted(!muted)}
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Settings */}
          <button
            type="button"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Cast */}
          <button
            type="button"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label="Cast"
          >
            <Cast className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label="Fullscreen"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
