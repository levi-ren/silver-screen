import Carousel from "@/app/browse/carousel";
import Logo from "@/components/logo";
import { tmdbFetch } from "@/helpers/fetcher";
import SearchIcon from "@/icons/search-icon";
import { PopularMovie } from "@/types/popular-movie";
import { PopularTV } from "@/types/popular-tv";
import { TrendingAll } from "@/types/trending-all";
import TopTen from "./top-ten";
import Trending from "./trending";

async function getTrending(): Promise<TrendingAll> {
  const res = await tmdbFetch(`trending/all/day`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPopularMovie(): Promise<PopularMovie> {
  const res = await tmdbFetch(`trending/all/day`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getPopularTV(): Promise<PopularTV> {
  const res = await tmdbFetch(`trending/all/day`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BrowsePage() {
  const featured = await getTrending();
  await getPopularMovie();
  await getPopularTV();
  return (
    <>
      <header className="p-2 md:p-6 z-10 from-black to-black/5  bg-gradient-to-b relative flex items-center justify-between gap-x-2">
        <Logo />

        <form className="inline-flex-1 group ">
          <div className="flex  items-center rounded-full px-3 py-2 bg-black/90">
            <SearchIcon className="text-white w-4 h-4 m-auto focus:ml-auto relative right-0 shrink-0" />
            <input
              className="transition-all md:group-hover:w-[320px] md:[&:not(:placeholder-shown)]:w-[320px] md:focus:[&:placeholder-shown]:w-[320px] group-hover:w-[150px] placeholder:text-sm bg-transparent outline-none [&:not(:placeholder-shown)]:w-[150px] [&:placeholder-shown]:w-0 focus:[&:placeholder-shown]:w-[150px] focus:ml-2 group-hover:ml-2 [&:not(:placeholder-shown)]:ml-2"
              placeholder="Search movies"
            />
          </div>
        </form>
      </header>
      <main>
        <Carousel featured={featured.results.slice(0, 3)} />
        <Trending />
        <TopTen />
      </main>
      <footer></footer>
    </>
  );
}
