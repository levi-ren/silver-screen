import Anchor from "@/components/anchor";
import { CastEntity } from "@/types/movie-details";
import Image from "next/image";

interface CastsProps {
  casts: CastEntity[];
}

export default function Casts({ casts }: CastsProps) {
  return (
    <section id="casts" className=" pt-6 md:pt-6 md:p-4">
      <div className="max-w-screen-xl m-auto px-2 sm:px-4">
        <p className="text-4xl font-bebas font-semibold small-caps">Cast</p>
        <div className="space-x-4 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar text-sm">
          {casts.slice(0, 10).map((cast) => (
            <div
              className="inline-flex flex-col align-top border border-white/20 rounded-xl overflow-hidden h-full max-w-[160px] shadow-md shadow-white/20"
              key={cast.id}
            >
              {cast.profile_path ? (
                <Image
                  draggable={false}
                  src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                  alt={cast.name}
                  className="h-full select-none "
                  width={160}
                  height={240}
                  loading="lazy"
                />
              ) : (
                <div className="w-[160px] h-[240px] bg-white/20" />
              )}
              <div className="px-1 py-2 text-center h-[88px] overflow-y-auto no-scrollbar">
                <p className="tracking-tighter whitespace-break-spaces leading-none">
                  {cast.name}
                </p>
                <p className="text-xs italic text-gray-400">~ as ~</p>
                <p className="tracking-tighter whitespace-break-spaces leading-none ">
                  {cast.character}
                </p>
              </div>
            </div>
          ))}
          <Anchor
            aria-label="Link to view full cast and crew"
            href="/crew"
            className=" tracking-tighter leading-none whitespace-break-spaces inline-flex items-center justify-center w-[160px] h-[327.42px] border rounded-xl border-white/20 p-2 shadow-white/20 shadow-md"
          >
            View full cast & crew
          </Anchor>
        </div>
      </div>
    </section>
  );
}
