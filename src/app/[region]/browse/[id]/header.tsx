import Anchor from "@/components/anchor";
import Button from "@/components/button";
import MovieRating from "@/components/movie-rating";
import { movieGenres, tvGenres } from "@/constants/genres";
import BookMarkIcon from "@/icons/bookmark-icon";
import ChevronIcon from "@/icons/chevron-icon";
import SaveLaterIcon from "@/icons/save-later-icon";
import { MovieDetails } from "@/types/movie-details";
import { TVDetails } from "@/types/tv-details";
import Certification from "./certification";
import TVContentRating from "./content-rating";

interface BrowseHeaderProps {
  resource: MovieDetails | TVDetails;
  country: string;
}

export default function BrowseHeader({ resource, country }: BrowseHeaderProps) {
  const isMovie = "title" in resource;
  return (
    <section
      id="header"
      className="py-4 xs:p-4 sticky top-0 z-50 bg-gradient-to-b from-black/90 to-black/50 backdrop-blur-xl backdrop-opacity-90 border-b border-white/20"
    >
      <div className="max-w-screen-xl m-auto px-2 xs:px-2 ">
        <div className="flex items-center gap-2 ">
          <Anchor href={`/${country}/browse`} aria-label="Back button">
            <ChevronIcon className="rotate-90" />
          </Anchor>
          <div className="min-w-0">
            <p className="small-caps font-bebas text-5xl truncate  ">
              {isMovie ? resource.title : resource.name}
            </p>
            <p className="text-sm truncate mb-1">
              {resource.genres
                .map(({ id }) => (isMovie ? movieGenres : tvGenres)[id])
                .join(" • ")}
            </p>
            {isMovie ? (
              <Certification
                certificates={resource.release_dates}
                release_date={resource.release_date}
                country={country}
                runtime={resource.runtime}
              />
            ) : (
              <TVContentRating
                country={country}
                seasons={`${resource.number_of_seasons} season${
                  resource.number_of_seasons > 1 ? "s" : ""
                }`}
                ratings={resource.content_ratings.results}
                episodes={`${resource.number_of_episodes} episodes`}
              />
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <Anchor
              aria-label="View trailer"
              href={`#youtube-trailer`}
              className="p-2 rounded-full border border-white/20 sm:flex  items-center justify-center text-sm hidden"
            >
              <SaveLaterIcon />
            </Anchor>
            <MovieRating
              absolute={false}
              font="large"
              rating={resource.vote_average * 10}
              className="w-16 h-16"
              votes={resource.vote_count}
            />
            <Button
              aria-label="bookmark button"
              className="p-2 rounded-full border border-white/20 sm:flex items-center justify-center text-sm hidden"
            >
              <BookMarkIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
