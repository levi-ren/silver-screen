import Footer from "@/components/footer";
import { tmdbFetch } from "@/lib/fetcher";
import { MovieDetails } from "@/types/movie-details";
import { PageProps } from "@/types/page-types";
import { TVDetails } from "@/types/tv-details";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Casts from "./casts";
import Details from "./details";
import BrowseHeader from "./header";
import { PreloadResources } from "./preload-resources";
import Recommendations from "./recommendations";
import Reviews from "./reviews";
import Seasons from "./seasons";
import Similar from "./similar";

export async function generateMetadata({
  params: { id },
  searchParams: { watch },
}: PageProps<WatchType>): Promise<Metadata> {
  // fetch data
  const res = await tmdbFetch(`${watch.toLowerCase()}/${id}`, {
    append_to_response:
      "videos,release_dates,credits,keywords,reviews,similar,recommendations,content_ratings,aggregate_credits",
  });

  if (!res.ok) {
    console.log(await res.json());
    new Error("Generate Metadata - Failed to fetch data");
  }

  const resource: MovieDetails | TVDetails = await res.json();

  return {
    title: "title" in resource ? resource.title : resource.name,
    description: resource.overview,
  };
}

type WatchType = "TV" | "Movie";

async function getResource(
  id: string,
  type: WatchType
): Promise<MovieDetails | TVDetails> {
  const res = await tmdbFetch(`${type.toLowerCase()}/${id}`, {
    append_to_response:
      "videos,release_dates,credits,keywords,reviews,similar,recommendations,content_ratings,aggregate_credits",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function MoviePage({
  params: { id, region },
  searchParams: { watch },
}: PageProps<WatchType>) {
  if (!watch || (watch !== "TV" && watch !== "Movie")) {
    notFound();
  }

  const resource = await getResource(id, watch);
  const trailerKey = resource.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )?.key;

  const isMovie = "title" in resource;

  return (
    <>
      <PreloadResources />
      <main>
        <section
          id="trailer"
          className="w-full h-screen max-w-[100vw] relative z-30"
        >
          <YouTubeEmbed
            videoid={trailerKey || ""}
            style="width:100%; max-width:100vw; height:100vh"
            params="autoplay=1&controls=1"
          />
        </section>

        <BrowseHeader resource={resource} country={region} />

        <Details resource={resource} country={region} />

        {!isMovie && <Seasons seasons={resource.seasons} />}

        <Casts
          casts={(isMovie ? resource.credits : resource.aggregate_credits).cast}
        />

        <section id="reviews-and-similars" className="px-2 sm:px-4">
          <div className="max-w-screen-xl m-auto flex gap-x-8 gap-y-4 flex-col-reverse md:px-4 md:flex-row">
            <Reviews reviews={resource.reviews} />
            <Similar similar={resource.similar.results} />
          </div>
        </section>

        {resource.recommendations.results.length > 0 && (
          <Recommendations recommendations={resource.recommendations.results} />
        )}
      </main>

      <Footer />
    </>
  );
}
