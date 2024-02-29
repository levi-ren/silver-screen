import Anchor from "@/components/anchor";
import { movieGenres } from "@/constants/genres";
import { tmdbFetch } from "@/helpers/fetcher";
import { PopularMovies } from "@/types/discover-movie";

import Image from "next/image";

async function getPopularMovie(): Promise<PopularMovies> {
  const res = await tmdbFetch(`movie/popular`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PopularNow() {
  const resource = await getPopularMovie();
  return (
    <aside id="now-airing" className="basis-1/3">
      <div className="border rounded-xl border-white/20 p-4">
        <p className="text-4xl font-semibold small-caps font-bebas xl:pb-4">
          Popular Right now
        </p>
        <div className="space-y-4 mt-4 columns-1 sm:columns-2 lg:columns-1">
          {resource.results.slice(0, 10).map((t, i) => (
            <Anchor
              aria-label={`Link to watch ${t.title}`}
              href={`/browse/${t.id}?watch=Movie`}
              className="flex items-center rounded-xl bg-zinc-900 hover:bg-zinc-900/70 transition-colors p-2"
              key={t.id}
            >
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
                <p className="text-xs text-white/50 ">
                  {t.genre_ids.map((id) => movieGenres[id]).join(" • ")}
                </p>
              </div>
            </Anchor>
          ))}
        </div>
      </div>
    </aside>
  );
}
