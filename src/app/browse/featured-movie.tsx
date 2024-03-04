import Anchor from "@/components/anchor";
import Button from "@/components/button";
import { movieGenres, tvGenres } from "@/constants/genres";
import BookMarkIcon from "@/icons/bookmark-icon";
import PlayIcon from "@/icons/play-icon";
import RateIcon from "@/icons/rate-icon";
import SaveLaterIcon from "@/icons/save-later-icon";
import { Resource } from "@/types/shared";
import Image from "next/image";
import { forwardRef } from "react";

interface FeaturedMovieProps {
  resource: Resource;
  country?: string;
}

export const FeaturedMovie = forwardRef<HTMLDivElement, FeaturedMovieProps>(
  ({ resource, country }, ref) => {
    const isMovie = "title" in resource;
    const year = new Date(
      isMovie ? resource.release_date : resource.first_air_date
    ).getFullYear();

    return (
      <div
        ref={ref}
        className="relative -top-[56px] md:-top-[88px] aspect-[4/3] md:aspect-video max-h-[810px] w-full"
      >
        <Image
          draggable={false}
          src={`https://image.tmdb.org/t/p/original${resource.backdrop_path}`}
          alt={isMovie ? resource.title : resource.name}
          className="h-full select-none object-cover brightness-75"
          fill
          priority
        />
        <div className="absolute z-10 p-4 bottom-0 space-y-2 w-full from-black to-black/5  bg-gradient-to-t">
          <p className="text-xl sm:text-4xl text-center md:text-left md:text-5xl uppercase font-bold font-bebas">
            {isMovie ? resource.title : resource.name}
          </p>

          <div className="flex gap-2 text-xs justify-center md:justify-start items-center flex-col md:flex-row sm:text-sm">
            <div className="flex gap-x-2 justify-center md:justify-start items-center">
              {resource.genre_ids.map((id) => (
                <span
                  className="px-2 py-[0.5px] rounded-full border border-white/20"
                  key={id}
                >
                  {isMovie ? movieGenres[id] : tvGenres[id]}
                </span>
              ))}
            </div>
            <div className="flex gap-x-2 justify-center items-center text-xs sm:text-sm">
              <span className="flex justify-center items-center gap-x-1">
                <RateIcon className="text-blue-500" />
                {resource.vote_average.toFixed(2)}
              </span>
              <time dateTime={`${year}`}>{year}</time>
            </div>
          </div>
          <p className="hidden md:block max-w-sm text-sm  text-balance leading-none">
            {resource.overview}
          </p>

          <div className="flex gap-x-4 md:gap-x-8 justify-center items-center md:justify-start sm:!mt-6">
            <Anchor
              aria-label={`Link to watch ${
                "title" in resource ? resource.title : resource.name
              }`}
              href={`/${country}/browse/${resource.id}?watch=${
                "title" in resource ? "Movie" : "TV"
              }`}
              className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 py-2 px-8 sm:py-3 flex gap-x-1 items-center"
            >
              <PlayIcon className="shrink-0 h-5" />
              Play
            </Anchor>
            <Button
              aria-label="bookmark button"
              className="p-2 rounded-full border border-white/20 flex md:border-0 items-center gap-x-2 justify-center text-sm"
            >
              <BookMarkIcon className="shrink-0" />
              <span className="hidden md:inline">Bookmark</span>
            </Button>
            <Button
              aria-label="add to list button"
              className="order-first md:order-last p-2 rounded-full border border-white/20 flex md:border-0 items-center gap-x-2 justify-center text-sm"
            >
              <SaveLaterIcon className="shrink-0" />
              <span className="hidden md:inline">Add to list</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

FeaturedMovie.displayName = "FeaturedMovie";
