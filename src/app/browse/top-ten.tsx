import Anchor from "@/components/anchor";
import { movieGenres, tvGenres } from "@/constants/genres";
import { tmdbFetch } from "@/lib/fetcher";
import { PopularMovies } from "@/types/discover-movie";
import { PopularTV } from "@/types/popular-tv";
import { Resource } from "@/types/shared";
import Image from "next/image";

async function getPopularMovie(country?: string): Promise<PopularMovies> {
  const res = await tmdbFetch(`movie/popular`, { region: country || "" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPopularTV(country?: string): Promise<PopularTV> {
  const res = await tmdbFetch(`tv/popular`, { region: country || "" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
interface TopTenProps {
  country?: string;
}

export default async function TopTen({ country }: TopTenProps) {
  const topten: Resource[] = await Promise.allSettled([
    getPopularMovie(country),
    getPopularTV(country),
  ]).then(([m, t]) => {
    const movie = m.status === "fulfilled" ? m.value.results : [];
    const tv = t.status === "fulfilled" ? t.value.results : [];

    return [...movie, ...tv]
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 10);
  });

  return (
    <section
      id="top-10"
      className="px-2 py-4 bg-zinc-950 mt-4 col-span-12 order-4"
    >
      <p className="text-4xl font-bebas font-semibold small-caps">
        Top Ten Shows
      </p>
      <div className="overflow-x-auto overflow-y-hidden h-full hidden-scrollbar hover:display-scrollbar pb-4 space-x-2 whitespace-nowrap">
        {topten.map((resource, i) => (
          <div
            key={resource.id}
            className="inline-block whitespace-nowrap  min-w-max group"
          >
            <p className="md:text-[25rem] text-black font-extrabold leading-none [-webkit-text-stroke:12px_gray] font-sans inline-block tracking-tighter text-[20rem]">
              {i + 1}
            </p>

            <Anchor
              aria-label={`Link to watch ${
                "title" in resource ? resource.title : resource.name
              }`}
              href={`/browse/${resource.id}?watch=${
                "title" in resource ? "Movie" : "TV"
              }${country ? `&country=${country}` : ""}`}
              className="inline-block md:w-[250px] w-[175px] h-[262px] md:h-[375px] relative"
              title={"title" in resource ? resource.title : resource.name}
            >
              {resource.poster_path ? (
                <Image
                  draggable={false}
                  src={`https://image.tmdb.org/t/p/w342${resource.poster_path}`}
                  alt={"title" in resource ? resource.title : resource.name}
                  className="h-full select-none w-full rounded-xl relative md:-left-15 md:top-10 -left-10 top-5 object-cover"
                  width={250}
                  height={375}
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[2/3] select-none md:w-[250px] w-[175px]  rounded-xl relative md:-left-15 md:top-10 -left-10 top-5 border border-white/20 " />
              )}

              <div className="absolute -bottom-4 md:-bottom-9 -left-9 right-11  md:opacity-0 z-50 md:group-hover:opacity-100 transition-opacity mt-1 py-1 px-2 rounded-lg border border-white/20 bg-black/90">
                <p className="text-2xl font-bebas small-caps truncate">
                  {"title" in resource ? resource.title : resource.name}
                </p>
                <div className="text-xs text-white/80 truncate">
                  <span className="rounded-full bg-blue-900 px-2 mr-1">
                    {"title" in resource ? "Movie" : "TV"}
                  </span>
                  {resource.genre_ids
                    .map(
                      (id) => ("title" in resource ? movieGenres : tvGenres)[id]
                    )
                    .join(" • ") || "~ ~"}
                </div>
              </div>
            </Anchor>
          </div>
        ))}
      </div>
    </section>
  );
}
