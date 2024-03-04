"use client";

import Button from "@/components/button";
import PlayIcon from "@/icons/play-icon";
import { TVSeasons } from "@/types/tv-details";
import { YouTubeEmbed } from "@next/third-parties/google";
import { useState } from "react";
import SeasonPicker from "./season-picker";

interface PlaybackProps {
  isMovie: boolean;
  existing: boolean;
  id: number;
  trailerKey: string;
  title: string;
  seasons:
    | {
        season: TVSeasons[];
        lastEpisode: number;
        lastSeason: number;
        seasonNumber: string;
        episodeNumber: string;
      }
    | false;
}

export default function Playback({
  isMovie,
  id,
  existing,
  trailerKey,
  title,
  seasons,
}: PlaybackProps) {
  const [playVid, setPlayVid] = useState(false);
  const seasonNumber = (seasons && seasons.seasonNumber) || 1;
  const episodeNumber = (seasons && seasons.episodeNumber) || 1;

  const vidSrc = `https://vidsrc.to/embed/${isMovie ? "movie" : "tv"}/${id}${
    !isMovie ? `/${seasonNumber}/${episodeNumber}` : ""
  }`;

  return !existing ? (
    <YouTubeEmbed
      videoid={trailerKey}
      style="width:100%; max-width:100vw; height:100vh"
      params="autoplay=1&controls=1"
      playlabel={`Watch ${title} Trailer`}
    />
  ) : (
    <>
      {playVid ? (
        <iframe
          src={vidSrc}
          className="w-full h-full peer"
          referrerPolicy="origin"
          allowFullScreen
        />
      ) : (
        <div
          className="w-full h-full flex relative flex-col gap-y-2 items-center justify-center cursor-pointer"
          onClickCapture={() => setPlayVid(true)}
        >
          <Button
            aria-label="Play movie/tv"
            className="border border-white/20 rounded-full p-6 grid"
          >
            <PlayIcon />
          </Button>

          <p className="text-center">
            Watch:{" "}
            <span className="block">
              {title}
              {`${
                !isMovie && ` Season ${seasonNumber} Episode ${episodeNumber}`
              }`}
            </span>{" "}
          </p>
        </div>
      )}
      {seasons && (
        <SeasonPicker
          season={seasons.season}
          lastEpisode={seasons.lastEpisode}
          lastSeason={seasons.lastSeason}
          seasonNumber={seasons.seasonNumber}
          episodeNumber={seasons.episodeNumber}
        />
      )}
    </>
  );
}
