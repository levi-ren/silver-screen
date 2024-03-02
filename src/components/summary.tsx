import { movieGenres, tvGenres } from "@/constants/genres";

interface SummaryProps {
  title: string;
  genres: number[];
  isMovie: boolean;
}

export default function Summary({ title, genres, isMovie }: SummaryProps) {
  return (
    <div className="absolute bottom-0 z-10 p-2 md:opacity-0 md:group-hover:opacity-100 transition-all w-full bg-gradient-to-t from-black/90 to-black/50 text-right">
      <p className="text-3xl font-bebas small-caps  truncate">{title}</p>
      <div className="text-xs text-white/80 truncate">
        {genres
          .map((id) => (isMovie ? movieGenres : tvGenres)[id])
          .join(" • ") || "~ ~"}
      </div>
    </div>
  );
}
