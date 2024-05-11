import Anchor from "@/components/anchor";
import MovieRating from "@/components/movie-rating";
import { languages } from "@/constants/languages";
import { tmdbFetch } from "@/lib/fetcher";
import { SearchPageParams } from "@/types/page-types";
import { MovieSearch, SimilarResources, TVSearch } from "@/types/shared";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

async function searchResources({ query, type, year, page }: SearchPageParams) {
  const fetchMovies = async (): Promise<SimilarResources<MovieSearch>> => {
    const movies = await tmdbFetch(
      query ? `search/movie` : "discover/movie",
      {
        ...(query ? { query } : {}),
        ...(page ? { page } : {}),
        ...(year ? { year } : {}),
      },
      { cache: "force-cache" }
    );
    // console.log(`FETCH MOVIES URL: ${movies.url}`);
    if (!movies.ok) {
      throw new Error("Failed to fetch data");
    }

    return await movies.json();
  };

  const fetchTV = async (): Promise<SimilarResources<TVSearch>> => {
    const tv = await tmdbFetch(
      query ? `search/tv` : "discover/tv",
      {
        ...(query ? { query } : {}),
        ...(page ? { page } : {}),
        ...(year ? { year } : {}),
      },
      { cache: "force-cache" }
    );
    // console.log(`FETCH TV URL: ${tv.url}`);

    if (!tv.ok) {
      throw new Error("Failed to fetch data");
    }

    return await tv.json();
  };

  async function getResource() {
    switch (type) {
      case "movie":
        return await fetchMovies();
      case "tv":
        return await fetchTV();
      default:
        return await Promise.allSettled([fetchMovies(), fetchTV()]).then(
          ([m, t]) => {
            const movie: SimilarResources<MovieSearch> =
              m.status === "fulfilled"
                ? m.value
                : ({} as SimilarResources<MovieSearch>);
            const tv =
              t.status === "fulfilled"
                ? t.value
                : ({} as SimilarResources<TVSearch>);

            return {
              page: movie.page > tv.page ? movie.page : tv.page,
              results: [...movie.results, ...tv.results].sort(
                (a, b) => b.popularity - a.popularity
              ),
              total_pages:
                movie.total_pages > tv.total_pages
                  ? movie.total_pages
                  : tv.total_pages,
              total_results:
                movie.total_results > tv.total_results
                  ? movie.total_results
                  : tv.total_results,
            };
          }
        );
    }
  }

  return await getResource();
}

interface FilterResultsProps extends SearchPageParams {
  country?: string;
}

export default async function FilterResults({
  query,
  type,
  year,
  page = "1",
  country,
}: FilterResultsProps) {
  const resources = await searchResources({ query, type, year, page });

  const newParams = (i: number) =>
    new URLSearchParams({
      ...(query ? { query } : {}),
      page: (i + 1).toString(),
      ...(type ? { type } : {}),
      ...(country ? { country } : {}),
    });

  return (
    <>
      {resources.total_results > 1 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-4 place-items-start">
          {resources.results.map((resource) => {
            const isMovie = "title" in resource;
            return (
              <Anchor
                aria-label={`Link to watch ${
                  isMovie ? resource.title : resource.name
                }`}
                href={`/browse/${resource.id}?watch=${
                  isMovie ? "Movie" : "TV"
                }${country ? `&country=${country}` : ""}`}
                className="relative max-w-[200px] w-full aspect-[2/3] bg-zinc-950 rounded-md h-full"
                key={resource.id}
              >
                <MovieRating
                  rating={resource.vote_average * 10}
                  className="top-1 left-1"
                />
                {resource.poster_path ? (
                  <Image
                    draggable={false}
                    src={`https://image.tmdb.org/t/p/w200${resource.poster_path}`}
                    alt={isMovie ? resource.title : resource.name}
                    className="select-none rounded-t-md aspect-[2/3] "
                    sizes="100vw"
                    width={200}
                    height={300}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] rounded-md border border-white/20 p-2 ">
                    <div className="h-full bg-white/70 rounded italic text-sm flex items-center justify-center text-gray-700">
                      No poster available
                    </div>
                  </div>
                )}
                <div className="my-2 space-y-2 px-1 ">
                  <div className="text-xs flex justify-between items-center">
                    <div className="flex flex-1 justify-center">
                      <span className="mr-auto">
                        {new Date(
                          isMovie
                            ? resource.release_date
                            : resource.first_air_date
                        ).getFullYear() || "XXXX"}
                      </span>
                    </div>

                    <div className="flex flex-1 justify-center">
                      <span className="px-2 border border-white/20 rounded-full bg-blue-400/90">
                        {isMovie ? "Movie" : "TV"}
                      </span>
                    </div>

                    <div className="flex flex-1 justify-center">
                      <span className="ml-auto hidden sm:inline">
                        {languages[resource.original_language].english_name}
                      </span>
                      <span className="ml-auto sm:hidden uppercase">
                        {resource.original_language}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm  text-center">
                    {isMovie ? resource.title : resource.name}
                  </p>
                </div>
              </Anchor>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 rounded-md border-dashed border border-white/20 italic text-gray-400 bg-zinc-900">
          No results found for:{" "}
          <em className="font-bold">&ldquo; {query} &rdquo;</em>
        </div>
      )}

      {resources.total_results > 1 && (
        <div className="gap-2 my-2 m-auto flex justify-center flex-wrap">
          {Array.from({
            length: resources.total_pages > 18 ? 18 : resources.total_pages,
          }).map((_, i) => (
            <Link
              className={twMerge(
                "w-12 h-12  items-center justify-center text-center rounded border border-white/20 hover:bg-zinc-900 transition-colors cursor-pointer inline-flex",
                ((i + 1).toString() === page || (!page && i === 0)) &&
                  "bg-zinc-700"
              )}
              key={i}
              href={`/search?${newParams(i)}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
