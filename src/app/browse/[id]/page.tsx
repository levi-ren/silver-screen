import { tmdbFetch } from "@/helpers/fetcher";
import { PageProps } from "@/types/page-types";
import { MovieDetails } from "@/types/tmdb-types";

async function getMovie(id: string): Promise<MovieDetails> {
  const res = await tmdbFetch(`movie/${id}`, {
    append_to_response: "videos",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MoviePage({ params: { id } }: PageProps) {
  const movie = await getMovie(id);
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
