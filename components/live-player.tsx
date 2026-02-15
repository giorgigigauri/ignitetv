"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  MonitorSmartphone,
} from "lucide-react";

export default function LivePlayer() {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(false);

  return (
    <div
      className="relative w-full aspect-video bg-card rounded-sm overflow-hidden"
      onMouseEnter={() => setControlsVisible(true)}
      onMouseLeave={() => setControlsVisible(false)}
      onFocus={() => setControlsVisible(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setControlsVisible(false);
        }
      }}
    >
      {/* Video placeholder image */}
      <Image
        src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=675&fit=crop"
        alt="Live stream broadcast"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Live Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-background/60 backdrop-blur-sm px-3 py-1 rounded-sm border border-primary/30">
          <span className="text-primary font-bold text-sm tracking-wider">IGNITE</span>
        </div>
      </div>

      {/* Controls Bar - always visible on focus-within for keyboard users */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent p-3 flex items-center gap-3 transition-opacity duration-200 ${
          controlsVisible ? "opacity-100" : "opacity-0 focus-within:opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-semibold text-red-400">LIVE</span>
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setMuted(!muted)}
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        <button
          type="button"
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
          aria-label="Picture in picture"
        >
          <MonitorSmartphone className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
          aria-label="Fullscreen"
        >
          <Maximize className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
