import { tmdbFetch } from "@/helpers/fetcher";
import { PageProps } from "@/types/page-types";
import { MovieDetails } from "@/types/tmdb-types";
import { notFound } from "next/navigation";

type WatchType = "TV" | "Movie";

async function getMovie(id: string, type: WatchType): Promise<MovieDetails> {
  const res = await tmdbFetch(`${type.toLowerCase()}/${id}`, {
    append_to_response: "videos",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MoviePage({
  params: { id },
  searchParams: { watch },
}: PageProps<WatchType>) {
  if (!watch || (watch !== "TV" && watch !== "Movie")) {
    notFound();
  }
  const movie = await getMovie(id, watch);
  const movieKey = movie.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )?.key;
  return (
    <iframe
      src={`https://www.youtube.com/embed/${movieKey}?autoplay=1`}
      className="w-screen h-screen"
    />
  );
}
