import { tmdbFetch } from "@/helpers/fetcher";
import { PopularMovie } from "@/types/popular-movie";
import { PopularTV } from "@/types/popular-tv";
import { Resource } from "@/types/shared";
import Image from "next/image";
import Link from "next/link";

interface TopTenProps {}

async function getPopularMovie(): Promise<PopularMovie> {
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
  const movies = await getPopularMovie();
  const tv = await getPopularTV();
  const topten: Resource[] = [
    ...movies.results.sort((a, b) => b.popularity - a.popularity),
    ...tv.results.sort((a, b) => b.popularity - a.popularity),
  ];
  topten.sort((a, b) => b.popularity - a.popularity);
  topten.splice(10);

  return (
    <section id="top-10" className="px-2 py-4 bg-zinc-950 mt-4">
      <div className="overflow-x-auto overflow-y-hidden h-full hidden-scrollbar hover:display-scrollbar pb-4  space-x-2 whitespace-nowrap">
        {topten.map((t, i) => (
          <div key={t.id} className="inline-block whitespace-nowrap">
            <p className="text-[25rem] text-black font-extrabold leading-none [-webkit-text-stroke:12px_gray] font-sans inline-block">
              {i + 1}
            </p>

            <Link
              href={`/browse/${t.id}?watch=${"title" in t ? "Movie" : "TV"}`}
              className="inline-block"
              key={t.id}
            >
              <Image
                draggable={false}
                src={`https://image.tmdb.org/t/p/original${t.poster_path}`}
                alt={"title" in t ? t.title : t.name}
                className="h-full select-none w-[250px] aspect-[11/17]  rounded-xl relative -left-20 top-10"
                width={250}
                height={386.36}
                loading="lazy"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
