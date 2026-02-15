"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Hls from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  Loader2,
} from "lucide-react";

interface LivePlayerProps {
  streamUrl?: string;
  title?: string;
  isLive?: boolean;
  poster?: string;
  downloadUrl?: string;
}

export default function LivePlayer({ streamUrl, title, isLive = true, poster, downloadUrl }: LivePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(false);

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    setLoading(true);

    const onPlaying = () => setLoading(false);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);

    if (Hls.isSupported()) {
      const hls = new Hls({
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 6,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hlsRef.current = hls;

      return () => {
        hls.destroy();
        hlsRef.current = null;
        video.removeEventListener("playing", onPlaying);
        video.removeEventListener("waiting", onWaiting);
        video.removeEventListener("canplay", onCanPlay);
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS
      video.src = streamUrl;
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [streamUrl]);

  // Sync play/pause state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [playing]);

  // Sync muted state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);
  const toggleMute = useCallback(() => setMuted((m) => !m), []);

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
      {/* Live stream video */}
      {streamUrl ? (
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=675&fit=crop"
          alt="Live stream broadcast"
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

      {/* Center Play Button */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-colors"
          aria-label="Play"
        >
          <Play className="w-16 h-16 text-white fill-white drop-shadow-lg" />
        </button>
      )}

      {/* Title Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-background/60 backdrop-blur-sm px-3 py-1 rounded-sm border border-primary/30 flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 font-bold text-sm tracking-wider">LIVE</span>
            </span>
          )}
          <span className="text-primary font-bold text-sm tracking-wider">{title || "IGNITE"}</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent p-3 flex items-center gap-3 transition-opacity duration-200 ${
          controlsVisible ? "opacity-100" : "opacity-0 focus-within:opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={togglePlay}
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
          onClick={toggleMute}
          className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        {downloadUrl && (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary focus-visible:text-primary focus-visible:outline-none transition-colors p-1 rounded-sm"
            aria-label="Download"
          >
            <Download className="w-5 h-5" />
          </a>
        )}
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
