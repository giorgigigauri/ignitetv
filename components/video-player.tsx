"use client";

import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Loader2,
} from "lucide-react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    setLoading(true);

    const onPlaying = () => setLoading(false);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const onDurationChange = () => setDuration(video.duration || 0);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("durationchange", onDurationChange);

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;

      return () => {
        hls.destroy();
        hlsRef.current = null;
        video.removeEventListener("playing", onPlaying);
        video.removeEventListener("waiting", onWaiting);
        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("durationchange", onDurationChange);
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
    };
  }, [src]);

  // Sync play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  // Sync muted
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressRef.current;
      const video = videoRef.current;
      if (!bar || !video || !video.duration) return;
      const rect = bar.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = pct * video.duration;
    },
    [],
  );

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);
  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  return (
    <div className="relative w-full aspect-video bg-card rounded-sm overflow-hidden group">
      {src ? (
        <video
          ref={videoRef}
          poster={poster}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=675&fit=crop"
          alt="Video thumbnail"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}

      {/* Loading Spinner */}
      {loading && playing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
      )}

      {/* Play button overlay */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-10 focus-visible:outline-none bg-black/30"
          aria-label="Play video"
        >
          <Play className="w-16 h-16 text-white fill-white drop-shadow-lg" />
        </button>
      )}

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-2 pt-6 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={togglePlay}
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>

          {/* Current time */}
          <span className="text-xs text-foreground tabular-nums min-w-[2.5rem]">
            {formatTime(currentTime)}
          </span>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="flex-1 h-1 bg-muted rounded-full cursor-pointer relative group/bar"
            onClick={handleProgressClick}
            onKeyDown={(e) => {
              const video = videoRef.current;
              if (!video) return;
              if (e.key === "ArrowRight") video.currentTime = Math.min(video.duration, video.currentTime + 5);
              if (e.key === "ArrowLeft") video.currentTime = Math.max(0, video.currentTime - 5);
            }}
            role="slider"
            aria-label="Video progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
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
            {formatTime(duration)}
          </span>

          {/* Volume */}
          <button
            type="button"
            onClick={toggleMute}
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
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
