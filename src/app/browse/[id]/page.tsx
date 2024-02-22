import Button from "@/components/button";
import MovieRating from "@/components/movie-rating";
import { movieGenres } from "@/constants/genres";
import { languages } from "@/constants/languages";
import { tmdbFetch } from "@/helpers/fetcher";
import BookMarkIcon from "@/icons/bookmark-icon";
import SaveLaterIcon from "@/icons/save-later-icon";
import { MovieDetails } from "@/types/movie-details";
import { PageProps } from "@/types/page-types";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Casts from "./casts";
import Certification from "./certification";

type WatchType = "TV" | "Movie";

async function getMovie(id: string, type: WatchType): Promise<MovieDetails> {
  const res = await tmdbFetch(`${type.toLowerCase()}/${id}`, {
    append_to_response: "videos,release_dates,credits,keywords",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const moneyFormat = (n: number) =>
  Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(n);

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

      <section className="p-4 sticky top-0 z-30 bg-gradient-to-b from-black/90 to-black/50 backdrop-blur-xl backdrop-opacity-85">
        <div className="max-w-screen-xl m-auto px-4 ">
          <div className="flex items-center justify-between flex-col xs:flex-row gap-2 ">
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
        </div>
      </section>

      <section id="details" className="relative p-2 md:p-4 ">
        <div className="absolute inset-0 -top-[209px] xs:-top-[137px] w-full xs:h-[calc(100%_+_137px)] h-[calc(100%_+_209px)]">
          <Image
            draggable={false}
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            // alt={"title" in t ? t.title : t.name}
            alt={movie.title}
            className="select-none blur-[2px] grayscale brightness-50 object-cover"
            fill
            priority
          />
        </div>
        <div className="max-w-screen-xl m-auto relative z-10">
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
              <p className="italic my-4 tracking-tighter text-blue-400 text-center xs:text-left">
                ~ {movie.tagline} ~
              </p>

              <div className="tracking-tighter leading-tight max-w-xl mt-4">
                <p className="font-semibold">Overview:</p>
                <p className="text-sm text-justify pl-2">{movie.overview}</p>
              </div>

              <div className="tracking-tighter leading-tight max-w-xl mt-4 pt-4 flex text-center sm:text-left border-t border-white/20 gap-2">
                <div className="flex-1">
                  <p className="font-semibold">Director:</p>
                  <p className="text-sm sm:text-justify sm:pl-2 hover:text-blue-500 transition-colors cursor-pointer">
                    {
                      movie.credits.crew.find(
                        (c) => c.job.toLowerCase() === "director"
                      )?.name
                    }
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Status:</p>
                  <p className="text-sm sm:text-justify sm:pl-2">
                    {movie.status}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Language:</p>
                  <p className="text-sm sm:text-justify sm:pl-2">
                    {languages[movie.original_language].english_name}
                  </p>
                </div>
              </div>

              <div className="tracking-tighter leading-tight max-w-xl mt-8 flex text-center sm:text-left gap-2">
                <div className="flex-1 space-y-2 basis-1/3">
                  <p className="font-semibold">Buget:</p>
                  <p className="text-sm sm:text-justify sm:pl-2">
                    {moneyFormat(movie.budget)}
                  </p>
                  <p className="font-semibold">Revenue:</p>
                  <p className="text-sm sm:text-justify sm:pl-2">
                    {moneyFormat(movie.revenue)}
                  </p>
                </div>
                <div className="flex-1 basis-2/3">
                  <p className="font-semibold">Key words:</p>
                  <ul className="text-sm sm:text-justify space-x-2 space-y-1">
                    {movie.keywords.keywords.map((word) => (
                      <li
                        key={word.id}
                        className="px-2 inline-block border border-white/20 bg-black/50 rounded first-of-type:ml-2 hover:text-blue-500 transition-colors cursor-pointer hover:border-blue-500/50"
                      >
                        {word.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Casts casts={movie.credits.cast} />
    </main>
  );
}
