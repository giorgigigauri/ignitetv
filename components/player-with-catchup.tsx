"use client";

import { useState } from "react";
import LivePlayer from "./live-player";
import CatchUp from "./catch-up";
import type { DVRItem } from "@/lib/data";

interface PlayerWithCatchUpProps {
  liveStream: string;
  liveTitle: string;
  dvrItems: DVRItem[];
}

export default function PlayerWithCatchUp({
  liveStream,
  liveTitle,
  dvrItems,
}: PlayerWithCatchUpProps) {
  const [streamUrl, setStreamUrl] = useState(liveStream);
  const [title, setTitle] = useState(liveTitle);
  const [isLive, setIsLive] = useState(true);

  function handleSelectDVR(item: DVRItem) {
      console.log("handleSelectDVR", item);
    setStreamUrl(item.stream.replace('.ts.m3u8', '.m3u8'));
    setTitle(liveTitle + ' - ' + item.title);
    setIsLive(false);
  }

  return (
    <>
      {/* Page Title */}
      <div className="px-4 md:px-8 pt-2 pb-2">
        <h1 className="text-lg font-bold text-primary font-serif italic">
          {liveTitle}
        </h1>
      </div>

      {/* Live Video Player */}
      <div className="px-4 md:px-8">
        <LivePlayer streamUrl={streamUrl} title={title} isLive={isLive} />
      </div>

      {/* Catch-Up Section */}
      <CatchUp items={dvrItems} onSelect={handleSelectDVR} />
    </>
  );
}
