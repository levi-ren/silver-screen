import { tmdbFetch } from "@/helpers/fetcher";
import { PopularMovies } from "@/types/discover-movie";
import { PopularTV } from "@/types/popular-tv";
import { Resource } from "@/types/shared";
import Image from "next/image";
import Link from "next/link";

interface TopTenProps {}

async function getPopularMovie(): Promise<PopularMovies> {
  const res = await tmdbFetch(`movie/popular`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPopularTV(): Promise<PopularTV> {
  const res = await tmdbFetch(`tv/popular`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function TopTen(props: TopTenProps) {
  const topten: Resource[] = await Promise.allSettled([
    getPopularMovie(),
    getPopularTV(),
  ]).then(([m, t]) => {
    const movie = m.status === "fulfilled" ? m.value.results : [];
    const tv = t.status === "fulfilled" ? t.value.results : [];

    return [...movie, ...tv]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  });
  return (
    <section
      id="top-10"
      className="px-2 py-4 bg-zinc-950 mt-4 col-span-12 order-4"
    >
      <div className="overflow-x-auto overflow-y-hidden h-full hidden-scrollbar hover:display-scrollbar pb-4 space-x-2 whitespace-nowrap">
        {topten.map((t, i) => (
          <div key={t.id} className="inline-block whitespace-nowrap  min-w-max">
            <p className="md:text-[25rem] text-black font-extrabold leading-none [-webkit-text-stroke:12px_gray] font-sans inline-block tracking-tighter text-[20rem]">
              {i + 1}
            </p>

            <Link
              href={`/browse/${t.id}?watch=${"title" in t ? "Movie" : "TV"}`}
              className="inline-block"
            >
              <Image
                draggable={false}
                src={`https://image.tmdb.org/t/p/w342${t.poster_path}`}
                alt={"title" in t ? t.title : t.name}
                className="h-full select-none md:w-[250px] w-[175px]  rounded-xl relative md:-left-15 md:top-10 -left-10 top-5"
                width={250}
                height={375}
                loading="lazy"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
