import Anchor from "@/components/anchor";
import MovieRating from "@/components/movie-rating";
import Summary from "@/components/summary";
import { tmdbFetch } from "@/lib/fetcher";

import { TrendingAll, TrendingMovie, TrendingTV } from "@/types/trending-all";
import Image from "next/image";

async function getTrending(): Promise<TrendingAll> {
  const res = await tmdbFetch(`trending/all/day`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface TrendingProps {
  country?: string;
}

export default async function Trending({ country }: TrendingProps) {
  const trending = await getTrending();
  const filtered = trending.results.filter(
    (e): e is TrendingMovie | TrendingTV => e.media_type !== "person"
  );
  return (
    <section
      id="trending"
      className="p-2 pb-0 md:pb-0 md:p-4 space-y-4 xl:col-span-8 order-2 col-span-12 xxl:col-span-9"
    >
      <p className="text-4xl font-bebas font-semibold small-caps">
        Trending Today
      </p>
      <div className="space-x-2 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar">
        {filtered.slice(3).map((resource) => (
          <Anchor
            aria-label={`Link to watch ${
              "title" in resource ? resource.title : resource.name
            }`}
            href={`/browse/${resource.id}?watch=${
              "title" in resource ? "Movie" : "TV"
            }${country ? `&country=${country}` : ""}`}
            className="relative inline-block group"
            key={resource.id}
            title={"title" in resource ? resource.title : resource.name}
          >
            {resource.poster_path ? (
              <Image
                draggable={false}
                src={`https://image.tmdb.org/t/p/w200${resource.poster_path}`}
                alt={"title" in resource ? resource.title : resource.name}
                className="h-full select-none rounded-md "
                width={175}
                height={262.5}
                loading="lazy"
              />
            ) : (
              <div className="w-[175px] h-[262.5px] rounded-md border border-white/20 " />
            )}
            <MovieRating rating={resource.vote_average * 10} />

            <Summary
              isMovie={"title" in resource}
              genres={resource.genre_ids}
              title={"title" in resource ? resource.title : resource.name}
            />
          </Anchor>
        ))}
      </div>
    </section>
  );
}
