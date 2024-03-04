import Anchor from "@/components/anchor";
import { movieGenres, tvGenres } from "@/constants/genres";
import { MovieRecommendation } from "@/types/movie-details";
import { TVRecommendation } from "@/types/tv-details";
import Image from "next/image";

interface ReccomendationProps {
  recommendations: MovieRecommendation[] | TVRecommendation[];
  country?: string;
}

export default function Recommendations({
  recommendations,
  country,
}: ReccomendationProps) {
  const resources = recommendations.slice(0, 10);
  return (
    <section id="recommendations" className=" pt-6 md:pt-6 md:p-4">
      <div className="max-w-screen-xl m-auto px-2 sm:px-4">
        <p className="text-4xl font-bebas font-semibold small-caps">
          You Might Like
        </p>
        <div className="space-x-4 whitespace-nowrap overflow-auto py-4 hidden-scrollbar hover:display-scrollbar text-sm">
          {resources.map((resource) => {
            const isMovie = "title" in resource;
            return (
              <Anchor
                aria-label={`Link to watch ${
                  isMovie ? resource.title : resource.name
                }`}
                key={resource.id}
                href={`/browse/${resource.id}?watch=${
                  isMovie ? "Movie" : "TV"
                }`}
                className="relative inline-block w-[300px] h-[168.75px] rounded-md group overflow-hidden"
                title={isMovie ? resource.title : resource.name}
              >
                <Image
                  draggable={false}
                  src={`https://image.tmdb.org/t/p/w300${resource.backdrop_path}`}
                  alt={isMovie ? resource.title : resource.name}
                  className="select-none rounded-md object-cover"
                  fill
                  loading="lazy"
                />
                <div className="absolute bottom-0 z-10 p-2 lg:opacity-0 lg:group-hover:opacity-100 transition-all w-full bg-gradient-to-t from-black/90 to-black/50 ">
                  <p className="text-3xl font-bebas small-caps  truncate">
                    {isMovie ? resource.title : resource.name}
                  </p>
                  <div className="text-xs text-white/80 truncate">
                    {resource.genre_ids
                      .map((id) => (isMovie ? movieGenres : tvGenres)[id])
                      .join(" • ")}
                  </div>
                </div>
              </Anchor>
            );
          })}
        </div>
      </div>
    </section>
  );
}
