import { movieGenres } from "@/constants/genres";
import { MovieRecommendations } from "@/types/movie-details";
import Image from "next/image";
import Link from "next/link";

interface ReccomendationProps {
  recommendations: MovieRecommendations;
}

export default function Recommendations({
  recommendations,
}: ReccomendationProps) {
  const movies = recommendations.results.slice(0, 10);
  return (
    <section id="recommendations" className=" pt-6 md:pt-6 md:p-4">
      <div className="max-w-screen-xl m-auto px-2 sm:px-4">
        <p className="text-4xl font-bebas font-semibold small-caps">
          You Might Like
        </p>
        <ul className="space-x-4 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar text-sm">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/browse/${movie.id}?watch=Movie`}
              className="relative inline-block w-[300px] h-[168.75px] rounded-md group overflow-hidden"
              title={movie.title}
            >
              <Image
                draggable={false}
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                alt={movie.title}
                className="select-none rounded-md object-cover"
                fill
                loading="lazy"
              />
              <div className="absolute bottom-0 z-10 p-2 opacity-0 group-hover:opacity-100 transition-all w-full bg-gradient-to-t from-black/90 to-black/50 ">
                <p className="text-3xl font-bebas small-caps  truncate">
                  {movie.title}
                </p>
                <div className="text-xs text-white/80 truncate">
                  {movie.genre_ids.map((id) => movieGenres[id]).join(" • ")}
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
}
