import Footer from "@/components/footer";
import { tmdbFetch } from "@/lib/fetcher";
import { MovieDetails } from "@/types/movie-details";
import { PageProps } from "@/types/page-types";
import { TVDetails } from "@/types/tv-details";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Casts from "./casts";
import Details from "./details";
import BrowseHeader from "./header";
import Playback from "./playback";
import { PreloadResources } from "./preload-resources";
import Recommendations from "./recommendations";
import Reviews from "./reviews";
import Seasons from "./seasons";
import Similar from "./similar";

export async function generateMetadata({
  params: { id },
  searchParams: { watch },
}: PageProps<{ watch: WatchType }>): Promise<Metadata> {
  const res = await tmdbFetch(
    `${watch.toLowerCase()}/${id}`,
    {
      append_to_response:
        "videos,release_dates,credits,keywords,reviews,similar,recommendations,content_ratings,aggregate_credits",
    },
    { cache: "force-cache" }
  );

  if (!res.ok) {
    return {
      title: "Silver Screen | 404",
      description: "Silver Screen 404 page - resource missing",
    };
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
  const res = await tmdbFetch(
    `${type.toLowerCase()}/${id}`,
    {
      append_to_response:
        "videos,release_dates,credits,keywords,reviews,similar,recommendations,content_ratings,aggregate_credits",
    },
    { cache: "force-cache" }
  );

  if (!res.ok) {
    const error = await res.json();
    if (error.status_code === 34 && !error.success) {
      notFound();
    }
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type ResourcePageParams = { watch: WatchType; season: string; episode: string };
export default async function MoviePage({
  params: { id, country },
  searchParams: { watch, season, episode },
}: PageProps<ResourcePageParams>) {
  if (!watch || (watch !== "TV" && watch !== "Movie")) {
    notFound();
  }

  const resource = await getResource(id, watch);
  const trailerKey = resource.videos.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )?.key;

  const isMovie = "title" in resource;

  const vidSrc = `https://vidsrc.xyz/embed/${isMovie ? "movie" : "tv"}?tmdb=${
    resource.id
  }${!isMovie ? `&season=${1}&episode=1` : ""}`;

  const e = await fetch(vidSrc);
  console.log(season);

  return (
    <>
      <PreloadResources />
      <main>
        <section
          id={e.ok ? "stream" : "trailer"}
          className="w-full h-screen max-w-[100vw] relative z-30 group"
        >
          <Playback
            isMovie={isMovie}
            existing={e.ok}
            id={resource.id}
            trailerKey={trailerKey || ""}
            title={isMovie ? resource.title : resource.name}
            seasons={
              !isMovie && {
                season: resource.seasons,
                lastEpisode: resource.last_episode_to_air.episode_number,
                lastSeason: resource.last_episode_to_air.season_number,
                seasonNumber: season || "1",
                episodeNumber: episode || "1",
              }
            }
          />
        </section>

        <BrowseHeader resource={resource} country={country} />

        <Details resource={resource} country={country} />

        {!isMovie && <Seasons seasons={resource.seasons} />}

        <Casts
          casts={(isMovie ? resource.credits : resource.aggregate_credits).cast}
        />

        <section id="reviews-and-similars" className="px-2 sm:px-4">
          <div className="max-w-screen-xl m-auto flex gap-x-8 gap-y-4 flex-col-reverse md:px-4 md:flex-row">
            <Reviews reviews={resource.reviews} />
            <Similar similar={resource.similar.results} country={country} />
          </div>
        </section>

        {resource.recommendations.results.length > 0 && (
          <Recommendations
            recommendations={resource.recommendations.results}
            country={country}
          />
        )}
      </main>

      <Footer country={country} />
    </>
  );
}
