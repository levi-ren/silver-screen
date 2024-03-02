import Anchor from "@/components/anchor";
import MovieRating from "@/components/movie-rating";
import Summary from "@/components/summary";
import { tmdbFetch } from "@/lib/fetcher";
import { DiscoverMovies } from "@/types/discover-movie";

import Image from "next/image";

async function getNowShowing(region: string): Promise<DiscoverMovies> {
  const res = await tmdbFetch(`movie/now_playing`, { region });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface NowShowingProps {
  region: string;
}

export default async function NowShowing({ region }: NowShowingProps) {
  const resource = await getNowShowing(region);
  return (
    <section
      id="now-showing"
      className="p-2 pb-0 md:pb-0 md:p-4 space-y-4  xl:col-span-8 order-3 col-span-12  xxl:col-span-9"
    >
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <p className="text-4xl  font-semibold small-caps font-bebas">
            Only on Cinemas
          </p>
          <Image
            draggable={false}
            src={`https://flagcdn.com/24x18/${region.toLowerCase()}.webp`}
            alt={`${region} flag`}
            width={24}
            height={18}
            loading="lazy"
          />
        </div>
      </div>
      <div className="space-x-2 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar">
        {resource.results.slice(3).map((resource) => (
          <Anchor
            aria-label={`Link to watch ${resource.title}`}
            href={`/${region}/browse/${resource.id}?watch=Movie`}
            className="relative inline-block group h-[262.5px]"
            key={resource.id}
            title={resource.title}
          >
            {resource.poster_path ? (
              <Image
                draggable={false}
                src={`https://image.tmdb.org/t/p/w200${resource.poster_path}`}
                alt={resource.title}
                className="h-full select-none rounded-md object-cover"
                width={175}
                height={262.5}
                loading="lazy"
              />
            ) : (
              <div className="w-[175px] h-[262.5px] rounded-md border border-white/20 " />
            )}

            <MovieRating rating={resource.vote_average * 10} />
            <Summary
              isMovie={true}
              genres={resource.genre_ids}
              title={resource.title}
            />
          </Anchor>
        ))}
      </div>
    </section>
  );
}
