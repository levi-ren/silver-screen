import MovieRating from "@/components/movie-rating";
import { tmdbFetch } from "@/helpers/fetcher";

import { DiscoverMovies } from "@/types/tmdb-types";
import Image from "next/image";
import Link from "next/link";

async function getTrending(): Promise<DiscoverMovies> {
  const res = await tmdbFetch(`trending/all/day`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Trending() {
  const trending = await getTrending();
  return (
    <section id="trending" className="p-2 md:p-4 space-y-4 bg-zinc-950">
      <p className="text-2xl  font-semibold">TRENDING TODAY</p>
      <div className="space-x-2 whitespace-nowrap overflow-auto py-4 no-scrollbar">
        {trending.results.map((t) => (
          <Link
            href={`/browse/${t.id}`}
            className="relative inline-block"
            key={t.id}
          >
            <Image
              draggable={false}
              src={`https://image.tmdb.org/t/p/original${t.poster_path}`}
              alt={t.title}
              className="h-full select-none w-[128px] aspect-[11/17]  rounded-md"
              width={150}
              height={250}
            />
            <MovieRating rating={t.vote_average / 10} />
          </Link>
        ))}
      </div>
    </section>
  );
}
