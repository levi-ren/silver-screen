import { ContentRating } from "@/types/tv-details";
import { twMerge } from "tailwind-merge";

interface ContentRatingProps {
  ratings: ContentRating[];
  episodes: string;
  country?: string;
  seasons: string;
  className?: string;
}

export default function TVContentRating({
  ratings,
  country,
  episodes,
  seasons,
  className,
}: ContentRatingProps) {
  const rating = (
    ratings.find((r) => r.iso_3166_1 === country) ||
    ratings.find((r) => r.iso_3166_1 === "US")
  )?.rating;
  const countryRelease = ratings.find((r) => r.iso_3166_1 === country)
    ? country
    : "US";

  return rating ? (
    <div className={twMerge("text-gray-400 space-y-1", className)}>
      <div className=" text-xl tracking-tighter font-bebas  divide-x divide-white/40">
        <div className="inline">
          <span
            className={twMerge(
              "px-1 border border-white/20 ",
              !rating && "text-red-500 border-none"
            )}
          >
            {rating || "Unrated"}
          </span>
        </div>
        <span className="mx-1 pl-1 small-caps">{episodes}</span>

        <span className="small-caps pl-1">{seasons}</span>
      </div>
      <p className="tracking-tighter text-xs ">{countryRelease} Release</p>
    </div>
  ) : null;
}
