import { movieGenres } from "@/constants/genres";
import BookMarkIcon from "@/icons/bookmark-icon";
import PlayIcon from "@/icons/play-icon";
import RateIcon from "@/icons/rate-icon";
import SaveLaterIcon from "@/icons/save-later-icon";
import { Movie } from "@/types/tmdb-types";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

interface FeaturedMovieProps {
  movie: Movie;
}

export const FeaturedMovie = forwardRef<HTMLDivElement, FeaturedMovieProps>(
  ({ movie }, ref) => {
    const year = new Date(movie.release_date).getFullYear();
    return (
      <div
        ref={ref}
        className="relative -top-[56px] md:-top-[88px] aspect-[4/3] md:aspect-video max-h-[810px] w-full"
      >
        <Image
          draggable={false}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full select-none object-cover brightness-75"
          fill
          priority
        />
        <div className="absolute z-10 p-4 bottom-0 space-y-2 w-full from-black to-black/5  bg-gradient-to-t">
          <p className="text-xl sm:text-2xl text-center md:text-left md:text-3xl uppercase font-bold">
            {movie.title}
          </p>

          <div className="flex gap-2 text-xs justify-center md:justify-start items-center flex-col md:flex-row sm:text-sm">
            <div className="flex gap-x-2 justify-center md:justify-start items-center">
              {movie.genre_ids.map((id) => (
                <span
                  className="px-2 py-[0.5px] rounded-full border border-white/20"
                  key={id}
                >
                  {movieGenres[id]}
                </span>
              ))}
            </div>
            <div className="flex gap-x-2 justify-center items-center text-xs sm:text-sm">
              <span className="flex justify-center items-center gap-x-1">
                <RateIcon className="text-blue-500" />
                {movie.vote_average}
              </span>
              <time dateTime={`${year}`}>{year}</time>
            </div>
          </div>
          <p className="hidden md:block max-w-sm text-sm  text-balance leading-none">
            {movie.overview}
          </p>

          <div className="flex gap-x-4 md:gap-x-8 justify-center items-center md:justify-start sm:!mt-6">
            <Link
              href={`/browse/${movie.id}`}
              className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 py-2 px-8 sm:py-3 flex gap-x-1 items-center"
            >
              <PlayIcon className="shrink-0 h-5" />
              Play
            </Link>
            <button className="p-2 rounded-full border border-white/20 flex md:border-0 items-center gap-x-2 justify-center text-sm">
              <BookMarkIcon className="shrink-0" />
              <span className="hidden md:inline">Bookmark</span>
            </button>
            <button className="order-first md:order-last p-2 rounded-full border border-white/20 flex md:border-0 items-center gap-x-2 justify-center text-sm">
              <SaveLaterIcon className="shrink-0" />
              <span className="hidden md:inline">Add to list</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

FeaturedMovie.displayName = "FeaturedMovie";
