import { TVSeasons } from "@/types/tv-details";
import Image from "next/image";

interface SeasonsProps {
  seasons: TVSeasons[];
}

export default function Seasons({ seasons }: SeasonsProps) {
  return (
    <section id="seasons" className="px-2 pt-6 md:pt-6 sm:px-4">
      <div className="max-w-screen-xl m-auto md:px-4">
        <p className="text-4xl font-bebas font-semibold small-caps">Seasons</p>

        <div className="space-x-4 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar">
          {seasons.map((season) => (
            <div
              className="relative inline-flex flex-col align-top border border-white/20 rounded-xl overflow-hidden max-w-[185px] shadow-md shadow-white/20 h-[277.5px]"
              key={season.id}
              title={season.name}
            >
              {season.poster_path ? (
                <Image
                  draggable={false}
                  src={`https://image.tmdb.org/t/p/w185${season.poster_path}`}
                  alt={season.name}
                  className="h-full select-none "
                  width={185}
                  height={277.5}
                  loading="lazy"
                />
              ) : (
                <div className="w-[185px] h-[277.5px] bg-white/20" />
              )}
              <div className="absolute bottom-0 p-1 w-full ">
                <div className="bg-black/80 rounded-md px-2 py-1 truncate">
                  <p className="font-bebas text-xl truncate">{season.name}</p>
                  <p className="text-xs">{season.episode_count} Episodes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
