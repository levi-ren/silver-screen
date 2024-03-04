import Anchor from "@/components/anchor";
import { movieGenres } from "@/constants/genres";
import { tmdbFetch } from "@/lib/fetcher";
import { RatedMovies } from "@/types/discover-movie";
import Image from "next/image";

interface TopTenProps {
  country?: string;
}

async function getTopRatedMovies(): Promise<RatedMovies> {
  const res = await tmdbFetch(`movie/top_rated`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function TopRatedMovies({ country }: TopTenProps) {
  const movies = await getTopRatedMovies();
  return (
    <section
      id="top-rated-movies"
      className="p-2 md:p-4 space-y-4 bg-zinc-950 mt-4 col-span-12 order-7"
    >
      <p className="text-4xl font-bebas font-semibold small-caps">
        Top Rated Movies
      </p>
      <div className="gap-x-8 space-y-4 px-4 md:columns-2">
        {movies.results
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 10)
          .map((t, i) => (
            <Anchor
              aria-label={`Link to watch ${t.title}`}
              href={`/browse/${t.id}?watch=Movie${
                country ? `&country=${country}` : ""
              }`}
              className="flex items-center relative rounded-xl bg-zinc-900 hover:bg-zinc-900/70 transition-colors p-2"
              key={t.id}
            >
              <p className="md:w-10 md:h-10 w-8 h-8 flex shrink-0 items-center justify-center border-2 bg-black/90 text-blue-500/90 border-blue-500/70 text-xl font-bebas rounded-full absolute top-1/2 z-10 -translate-y-1/2 -left-4 md:-left-5">
                {i + 1}
              </p>

              {t.poster_path ? (
                <Image
                  draggable={false}
                  src={`https://image.tmdb.org/t/p/w45${t.poster_path}`}
                  alt={t.title}
                  className="select-none rounded-md shrink-0 w-[45px] h-[67px]"
                  width={45}
                  height={67}
                  loading="lazy"
                />
              ) : (
                <div className="w-[45px] h-[67px] rounded-md border border-white/20 " />
              )}
              <div className="p-2 tracking-tighter">
                <p className="">{t.title}</p>
                <p className="text-sm text-blue-500 ">
                  {t.genre_ids.map((id) => movieGenres[id]).join(" • ")}
                </p>
              </div>
            </Anchor>
          ))}
      </div>
    </section>
  );
}
