import Anchor from "@/components/anchor";
import MovieRating from "@/components/movie-rating";
import { tmdbFetch } from "@/helpers/fetcher";
import { DiscoverMovies } from "@/types/discover-movie";

import Image from "next/image";

async function getNowShowing(): Promise<DiscoverMovies> {
  const res = await tmdbFetch(`movie/now_playing`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function NowShowing() {
  const resource = await getNowShowing();
  return (
    <section
      id="now-showing"
      className="p-2 pb-0 md:pb-0 md:p-4 space-y-4  xl:col-span-8 order-3 col-span-12  xxl:col-span-9"
    >
      <p className="text-4xl  font-semibold small-caps font-bebas">
        Only on Cinemas
      </p>
      <div className="space-x-2 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar">
        {resource.results.slice(3).map((t) => (
          <Anchor
            aria-label={`Link to watch ${t.title}`}
            href={`/browse/${t.id}?watch=Movie`}
            className="relative inline-block"
            key={t.id}
          >
            <Image
              draggable={false}
              src={`https://image.tmdb.org/t/p/w200${t.poster_path}`}
              alt={t.title}
              className="h-full select-none rounded-md"
              width={175}
              height={262.5}
              loading="lazy"
            />
            <MovieRating rating={t.vote_average * 10} />
          </Anchor>
        ))}
      </div>
    </section>
  );
}
