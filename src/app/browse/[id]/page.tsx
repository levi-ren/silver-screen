import Footer from "@/components/footer";
import { languages } from "@/constants/languages";
import { tmdbFetch } from "@/helpers/fetcher";
import { MovieDetails } from "@/types/movie-details";
import { PageProps } from "@/types/page-types";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import Casts from "./casts";
import Certification from "./certification";
import BrowseHeader from "./header";
import { PreloadResources } from "./preload-resources";
import Recommendations from "./recommendations";
import Reviews from "./reviews";
import Similar from "./similar";

export async function generateMetadata({
  params: { id },
  searchParams: { watch },
}: PageProps<WatchType>): Promise<Metadata> {
  // fetch data
  const res = await tmdbFetch(`${watch.toLowerCase()}/${id}`, {
    append_to_response:
      "videos,release_dates,credits,keywords,reviews,similar,recommendations",
  });

  if (!res.ok) {
    throw new Error("Generate Metadata - Failed to fetch data");
  }
  const movie: MovieDetails = await res.json();

  return {
    title: movie.title,
    description: movie.overview,
  };
}

type WatchType = "TV" | "Movie";

async function getMovie(id: string, type: WatchType): Promise<MovieDetails> {
  const res = await tmdbFetch(`${type.toLowerCase()}/${id}`, {
    append_to_response:
      "videos,release_dates,credits,keywords,reviews,similar,recommendations",
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

  const country = headers().get("x-country") || "PH";
  const movie = await getMovie(id, watch);
  const movieKey = movie.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )?.key;
  return (
    <>
      <PreloadResources />
      <main>
        <section
          id="trailer"
          className="w-full h-screen max-w-[100vw] relative z-30"
        >
          <YouTubeEmbed
            videoid={movieKey || ""}
            style="width:100%; max-width:100vw; height:100vh"
            params="autoplay=1&controls=1"
          />
        </section>

        <BrowseHeader movie={movie} country={country} />

        <section id="details" className="relative p-2 md:p-4">
          <div className="absolute inset-0 -top-[103px] sm:-top-[152px] w-full sm:h-[calc(100%_+_152px)] h-[calc(100%_+_103px)]">
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
                <p className="italic my-4 tracking-tighter text-blue-400 text-center sm:text-left">
                  ~ {movie.tagline} ~
                </p>

                <Certification
                  certificates={movie.release_dates}
                  release_date={movie.release_date}
                  country={country}
                  runtime={movie.runtime}
                  className="sm:hidden block text-center !text-white"
                />

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
        <section id="reviews-and-similars" className="px-2 sm:px-4">
          <div className="max-w-screen-xl m-auto flex gap-x-8 gap-y-4 flex-col-reverse md:px-4 md:flex-row">
            <Reviews reviews={movie.reviews} />
            <Similar similar={movie.similar} />
          </div>
        </section>
        <Recommendations recommendations={movie.recommendations} />
      </main>

      <Footer />
    </>
  );
}
