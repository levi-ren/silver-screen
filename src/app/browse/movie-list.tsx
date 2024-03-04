import Anchor from "@/components/anchor";
import { tmdbFetch } from "@/lib/fetcher";
import { RatedMovies } from "@/types/discover-movie";
import Image from "next/image";

async function getTopRatedMovies(): Promise<RatedMovies> {
  const res = await tmdbFetch(`movie/top_rated`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Currently unused. Use on Search page

export default async function MovieList() {
  const movies = await getTopRatedMovies();

  return (
    <section
      id="top-rated-movies"
      className="px-2 py-4 bg-zinc-950 mt-4 col-span-12 order-7"
    >
      <div className="h-full pb-4 space-y-2 md:px-6 sm:columns-2">
        {movies.results
          .sort((a, b) => b.popularity - a.popularity)
          .slice(10)
          .map((t, i) => (
            <Anchor
              aria-label={`Link to watch ${t.title}`}
              href={`/browse/${t.id}?watch=Movie`}
              className="flex items-center relative border border-white/20 rounded-xl rounded-t-none"
              key={t.id}
            >
              <p className="w-10 h-10 flex shrink-0 items-center justify-center border-2 bg-black/70 text-blue-500/90 border-blue-500/70 text-xl font-bebas rounded-full absolute top-1/2 z-10 -translate-y-1/2 -left-5">
                {i + 1}
              </p>

              <div className="w-full">
                <div className="relative flex-1 aspect-video">
                  <Image
                    draggable={false}
                    src={`https://image.tmdb.org/t/p/w300${t.backdrop_path}`}
                    alt={t.title}
                    className="h-full select-none relative"
                    fill
                    loading="lazy"
                  />
                </div>

                <div className="flex">
                  <div className="w-[75px] h-[112.5px] rounded-md border border-white/20 " />
                  {/* {t.poster_path ? (
                    <Image
                      draggable={false}
                      src={`https://image.tmdb.org/t/p/w92${t.poster_path}`}
                      alt={t.title}
                      className="h-full select-none relative -top-6 left-2 rounded-md"
                      width={75}
                      height={112.5}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-[75px] h-[112.5px] rounded-md border border-white/20 " />
                  )} */}
                  <div className="pl-4 p-1">{t.title}</div>
                </div>
              </div>
            </Anchor>
          ))}
      </div>
    </section>
  );
}
