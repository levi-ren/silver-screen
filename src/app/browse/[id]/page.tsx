import Button from "@/components/button";
import MovieRating from "@/components/movie-rating";
import { movieGenres } from "@/constants/genres";
import { tmdbFetch } from "@/helpers/fetcher";
import BookMarkIcon from "@/icons/bookmark-icon";
import SaveLaterIcon from "@/icons/save-later-icon";
import { MovieDetails } from "@/types/movie-details";
import { PageProps } from "@/types/page-types";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Certification from "./certification";

type WatchType = "TV" | "Movie";

async function getMovie(id: string, type: WatchType): Promise<MovieDetails> {
  const res = await tmdbFetch(`${type.toLowerCase()}/${id}`, {
    append_to_response: "videos,release_dates,credits",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MoviePage({
  params: { id },
  searchParams: { watch },
}: PageProps<WatchType>) {
  if (!watch || (watch !== "TV" && watch !== "Movie")) {
    notFound();
  }

  const country = headers().get("x-country") || "US";
  const movie = await getMovie(id, watch);
  const movieKey = movie.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )?.key;
  return (
    <main>
      <section id="trailer">
        <iframe
          id="youtube-trailer"
          src={`https://www.youtube.com/embed/${movieKey}?autoplay=1`}
          className="w-full h-screen max-w-[100vw]"
          style={{
            background: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path}) center center no-repeat`,
            backgroundSize: "cover",
          }}
        />
      </section>

      <section id="details" className="relative p-2 md:p-4">
        <Image
          draggable={false}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          // alt={"title" in t ? t.title : t.name}
          alt={movie.title}
          className="select-none blur-[2px] grayscale brightness-50 object-cover"
          fill
          priority
        />
        <div className="max-w-screen-2xl m-auto relative z-10">
          <div className="p-2 md:p-4 flex h-full gap-x-4 flex-col sm:flex-row">
            <Image
              draggable={false}
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              className="select-none rounded-md self-center  min-w-0 sm:w-[230px] sm:h-[345px] md:w-[342px] md:h-[513px]"
              width={342}
              height={513}
              priority
            />
            <div className="flex-1 py-2">
              <div className="flex items-center justify-between flex-col xs:flex-row gap-2">
                <div className="flex items-center gap-2 flex-col xs:items-start">
                  <div className="leading-none">
                    <p className="small-caps font-bebas text-5xl text-center xs:text-left">
                      {movie.title}
                    </p>
                    <div className="text-sm">
                      {movie.genres.map(({ id }) => (
                        <span
                          className="py-[0.5px] inline-flex items-center not-last:after:content-['\2022'] not-last:after:mx-1.5 after:align-text-top "
                          key={id}
                        >
                          {movieGenres[id]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Certification
                    certificates={movie.release_dates}
                    release_date={movie.release_date}
                    country={country}
                    runtime={movie.runtime}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`#youtube-trailer`}
                    className="p-2 rounded-full border border-white/20 flex  items-center justify-center text-sm"
                  >
                    <SaveLaterIcon />
                  </Link>
                  <MovieRating
                    absolute={false}
                    font="large"
                    rating={movie.vote_average * 10}
                    className="w-16 h-16"
                    votes={movie.vote_count}
                  />
                  <Button
                    aria-label="bookmark button"
                    className="p-2 rounded-full border border-white/20 flex items-center justify-center text-sm"
                  >
                    <BookMarkIcon />
                  </Button>
                </div>
              </div>
              <p className="italic my-4 tracking-tighter text-blue-400 text-center xs:text-left">
                ~ {movie.tagline} ~
              </p>

              <div className="tracking-tighter leading-tight max-w-xl mt-4">
                <p className="font-semibold">Overview:</p>
                <p className="text-sm text-justify pl-2">{movie.overview}</p>
              </div>
              <div className="tracking-tighter leading-tight max-w-xl mt-4">
                <p className="font-semibold">Director:</p>
                <p className="text-sm text-justify pl-2 hover:text-blue-500 transition-colors cursor-pointer">
                  {
                    movie.credits.crew.find(
                      (c) => c.job.toLowerCase() === "director"
                    )?.name
                  }
                </p>
              </div>
              <div className="tracking-tighter leading-tight max-w-xl mt-4">
                <p className="font-semibold">Cast:</p>
                <div className="text-sm text-justify pl-2">
                  {movie.credits.cast.slice(0, 20).map((c) => (
                    <span
                      className="not-last:after:content-[',_'] hover:text-blue-500 transition-colors cursor-pointer"
                      key={c.id}
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
