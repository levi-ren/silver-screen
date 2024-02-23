import { movieGenres } from "@/constants/genres";
import ChevronIcon from "@/icons/chevron-icon";
import { SimilarMovies } from "@/types/movie-details";
import Image from "next/image";
import Link from "next/link";

interface SimilarProps {
  similar: SimilarMovies;
}

export default function Similar({ similar }: SimilarProps) {
  const movies = similar.results.slice(0, 10);
  return (
    <aside id="similar" className="flex-1 basis-1/3 relative ">
      <p className="text-4xl font-bebas font-semibold small-caps">
        Similar Movies
      </p>

      <label
        className="m-auto absolute -bottom-4 z-20 right-1/2 translate-x-1/2 rounded-full cursor-pointer peer animate-bounce md:hidden has-[:checked]:hidden"
        htmlFor="show-more"
      >
        <input id="show-more" type="checkbox" className="peer" hidden />

        <ChevronIcon className="h-6 w-6 peer-checked:rotate-180 transition-all" />
      </label>

      <div className="relative gap-x-8 space-y-2 my-4 max-h-96 md:max-h-[1000px] overflow-hidden peer-has-[:checked]:max-h-[1000px] transition-all bg-zinc-900 rounded-md p-2">
        {movies.map((t, i) => (
          <Link
            href={`/browse/${t.id}?watch=Movie`}
            className="flex items-center relative rounded-xl bg-black/70 hover:bg-black/90 transition-colors p-2"
            key={t.id}
          >
            <Image
              draggable={false}
              src={`https://image.tmdb.org/t/p/w45${t.poster_path}`}
              alt={t.title}
              className="select-none rounded-md shrink-0 w-[45px] h-[67px]"
              width={45}
              height={67.5}
              loading="lazy"
            />
            <div className="p-2 tracking-tighter">
              <p className="">{t.title}</p>
              <div className="text-xs text-white/70">
                {t.genre_ids.map((id) => movieGenres[id]).join(" • ")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
