import MovieRating from "@/components/movie-rating";
import { tmdbFetch } from "@/helpers/fetcher";

import { TrendingAll } from "@/types/trending-all";
import Image from "next/image";
import Link from "next/link";

async function getTrending(): Promise<TrendingAll> {
  const res = await tmdbFetch(`trending/all/day`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Trending() {
  const trending = await getTrending();

  return (
    <section id="trending" className="p-2 pb-0 md:pb-0 md:p-4 space-y-4 ">
      <p className="text-4xl font-bebas font-semibold small-caps">
        Trending Today
      </p>
      <div className="space-x-2 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar">
        {trending.results.slice(3).map((t) => (
          <Link
            href={`/browse/${t.id}?watch=${"title" in t ? "Movie" : "TV"}`}
            className="relative inline-block"
            key={t.id}
          >
            <Image
              draggable={false}
              src={`https://image.tmdb.org/t/p/w200${t.poster_path}`}
              alt={"title" in t ? t.title : t.name}
              className="h-full select-none rounded-md"
              width={175}
              height={262.5}
              loading="lazy"
            />
            <MovieRating rating={t.vote_average * 10} />
          </Link>
        ))}
      </div>
    </section>
  );
}
