import Anchor from "@/components/anchor";
import { movieGenres, tvGenres } from "@/constants/genres";
import ChevronIcon from "@/icons/chevron-icon";
import { SimilarMovie } from "@/types/movie-details";
import { SimilarShow } from "@/types/tv-details";
import Image from "next/image";

interface SimilarProps {
  similar: SimilarMovie[] | SimilarShow[];
  country?: string;
}

export default function Similar({ similar, country }: SimilarProps) {
  const resources = similar.slice(0, 10);
  const isMovie = resources.find((r) => "title" in r);
  return (
    <aside id="similar" className="flex-1 basis-1/3 relative ">
      <p className="text-4xl font-bebas font-semibold small-caps">
        Similar {isMovie ? "Movies" : "Shows"}
      </p>

      {resources.length > 0 ? (
        <>
          <label
            className="m-auto absolute -bottom-4 z-20 right-1/2 translate-x-1/2 rounded-full cursor-pointer peer animate-bounce md:hidden has-[:checked]:hidden"
            htmlFor="show-more"
          >
            <input id="show-more" type="checkbox" className="peer" hidden />

            <ChevronIcon className="h-6 w-6 peer-checked:rotate-180 transition-all" />
          </label>

          <div className="relative gap-x-8 space-y-2 my-4 max-h-96 md:max-h-[1000px] overflow-hidden peer-has-[:checked]:max-h-[1000px] transition-all bg-zinc-900 rounded-md p-2">
            {resources.map((t, i) => {
              const isMovie = "title" in t;
              return (
                <Anchor
                  aria-label={`Link to watch ${isMovie ? t.title : t.name}`}
                  href={`/browse/${t.id}?watch=${isMovie ? "Movie" : "TV"}${
                    country ? `&country=${country}` : ""
                  }`}
                  className="flex items-center relative rounded-xl bg-black/70 hover:bg-black/90 transition-colors p-2"
                  key={t.id}
                >
                  {t.poster_path ? (
                    <Image
                      draggable={false}
                      src={`https://image.tmdb.org/t/p/w45${t.poster_path}`}
                      alt={isMovie ? t.title : t.name}
                      className="select-none rounded-md shrink-0 w-[45px] h-[67px]"
                      width={45}
                      height={67.5}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-[45px] h-[67px] rounded-md border border-white/20  shrink-0" />
                  )}

                  <div className="p-2 tracking-tighter">
                    <p>{isMovie ? t.title : t.name}</p>
                    <div className="text-xs text-white/70 line-clamp-1">
                      {t.genre_ids
                        .map((id) => (isMovie ? movieGenres : tvGenres)[id])
                        .join(" • ")}
                    </div>
                  </div>
                </Anchor>
              );
            })}
          </div>
        </>
      ) : (
        <div className="w-full rounded-md border bg-zinc-900 border-white/20 px-4 py-28 mt-4 text-center">
          No similar {isMovie ? "movies" : "shows"}
        </div>
      )}
    </aside>
  );
}
