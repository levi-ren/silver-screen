import Carousel from "@/app/browse/carousel";
import Logo from "@/components/logo";
import { tmdbFetch } from "@/helpers/fetcher";
import SearchIcon from "@/icons/search-icon";
import { DiscoverMovies } from "@/types/tmdb-types";
import Trending from "./trending";

async function getFeatured(): Promise<DiscoverMovies> {
  const res = await tmdbFetch(`discover/movie`, {
    api_key: `${process.env.TMDB_API_KEY}`,
    append_to_response: "videos",
    include_video: "true",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BrowsePage() {
  const movies = await getFeatured();
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
      <main className="min-h-screen">
        <Carousel movies={movies.results.slice(0, 3)} />
        <Trending />
      </main>
      <footer></footer>
    </>
  );
}
