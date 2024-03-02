"use client";

import Button from "@/components/button";
import PlayIcon from "@/icons/play-icon";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useState } from "react";

interface PlaybackProps {
  isMovie: boolean;
  existing: boolean;
  id: number;
  trailerKey: string;
  title: string;
}

export default function Playback({
  isMovie,
  id,
  existing,
  trailerKey,
  title,
}: PlaybackProps) {
  const [playVid, setPlayVid] = useState(false);

  const vidSrc = `https://vidsrc.xyz/embed/${
    isMovie ? "movie" : "tv"
  }?tmdb=${id}${!isMovie ? `&season=${1}&episode=1` : ""}`;

  return playVid ? (
    <iframe
      src={vidSrc}
      className="w-full h-full"
      referrerPolicy="origin"
      allowFullScreen
    />
  ) : (
    <>
      {existing ? (
        <div className="w-full h-full flex  flex-col gap-y-2 items-center justify-center">
          <Button
            aria-label="Play movie/tv"
            onClick={() => setPlayVid(true)}
            className="border border-white/20 rounded-full p-6 grid"
          >
            <PlayIcon />
          </Button>

          <p className="text-center">Watch {title}</p>
        </div>
      ) : (
        <>
          <YouTubeEmbed
            videoid={trailerKey}
            style="width:100%; max-width:100vw; height:100vh"
            params="autoplay=1&controls=1"
          />
          <p className="absolute top-[52%]  translate-x-1/2 right-1/2">
            Watch {title} Trailer
          </p>
        </>
      )}
    </>
  );
}
