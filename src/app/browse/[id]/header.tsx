import Anchor from "@/components/anchor";
import Button from "@/components/button";
import MovieRating from "@/components/movie-rating";
import { movieGenres } from "@/constants/genres";
import BookMarkIcon from "@/icons/bookmark-icon";
import SaveLaterIcon from "@/icons/save-later-icon";
import { MovieDetails } from "@/types/movie-details";
import Certification from "./certification";

interface BrowseHeaderProps {
  movie: MovieDetails;
  country: string;
}

export default function BrowseHeader({ movie, country }: BrowseHeaderProps) {
  return (
    <section
      id="header"
      className="py-4 xs:p-4 sticky top-0 z-50 bg-gradient-to-b from-black/90 to-black/50 backdrop-blur-xl backdrop-opacity-90 border-b border-white/20"
    >
      <div className="max-w-screen-xl m-auto px-2 xs:px-2 ">
        <div className="flex items-center justify-between gap-2 ">
          <div className="min-w-0">
            <p className="small-caps font-bebas text-5xl truncate  ">
              {movie.title}
            </p>
            <p className="text-sm truncate mb-1">
              {movie.genres.map(({ id }) => movieGenres[id]).join(" • ")}
            </p>
            <Certification
              certificates={movie.release_dates}
              release_date={movie.release_date}
              country={country}
              runtime={movie.runtime}
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
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
              rating={movie.vote_average * 10}
              className="w-16 h-16"
              votes={movie.vote_count}
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
