import Anchor from "@/components/anchor";
import { tvGenres } from "@/constants/genres";
import { languages } from "@/constants/languages";
import RateIcon from "@/icons/rate-icon";
import { tmdbFetch } from "@/lib/fetcher";
import { DiscoverTV } from "@/types/discover-tv";

import Image from "next/image";

async function getNowAiring(): Promise<DiscoverTV> {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const res = await tmdbFetch(`tv/airing_today`, { timezone });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function NowAiring({ country }: { country?: string }) {
  const resources = await getNowAiring();
  return (
    <aside
      id="now-airing"
      className="p-2 pb-0 md:pb-0 md:p-4 space-y-4 xl:col-span-4 col-span-12  xl:order-2 xl:row-span-2 xxl:col-span-3 order-5"
    >
      <div className="border rounded-xl border-white/20 p-4">
        <p className="text-4xl  font-semibold small-caps font-bebas xl:pb-4">
          Airing Today
        </p>
        <div className="space-y-4 xl:overflow-y-auto xl:overflow-x-hidden overflow-x-auto overflow-y-hidden xl:py-4 hidden-scrollbar hover:display-scrollbar xl:pr-4 max-h-[655px] whitespace-nowrap xl:whitespace-normal space-x-4 xl:space-x-0">
          {resources.results.map((resource) => (
            <Anchor
              aria-label={`Link to watch ${resource.name}`}
              href={`/browse/${resource.id}?watch=TV${
                country ? `&country=${country}` : ""
              }`}
              className="inline-block xl:block hover:bg-zinc-900 transition-colors rounded-md p-2 "
              key={resource.id}
              title={resource.name}
            >
              <div className="flex gap-x-2 items-center">
                {resource.poster_path ? (
                  <Image
                    draggable={false}
                    src={`https://image.tmdb.org/t/p/w92${resource.poster_path}`}
                    alt={resource.name}
                    className=" select-none rounded-md shrink-0 h-[138px] object-cover"
                    width={92}
                    height={138}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-[92px] h-[138px] rounded-md border border-white/20 " />
                )}
                <div className="flex-1 tracking-tighter  truncate">
                  <p className=" truncate">{resource.name}</p>
                  <div className="text-sm text-blue-500 ">
                    {new Date(resource.first_air_date).getUTCFullYear()} /{" "}
                    {languages[resource.original_language].english_name} /{" "}
                    {resource.vote_average ? (
                      <span className="inline-flex justify-center items-center gap-x-1 ">
                        {resource.vote_average.toFixed(1)}
                        <RateIcon className="w-3 text-white" />
                      </span>
                    ) : (
                      <span className="text-red-500">Unrated</span>
                    )}
                  </div>
                  <div className="text-xs space-x-1 space-y-1 mt-2  truncate">
                    {resource.genre_ids.map((id) => tvGenres[id]).join(" • ") ||
                      "~ ~"}
                  </div>
                </div>
              </div>
            </Anchor>
          ))}
        </div>
      </div>
    </aside>
  );
}
