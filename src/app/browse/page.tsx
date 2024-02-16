import BookMarkIcon from "@/icons/bookmark-icon";
import PlayIcon from "@/icons/play-icon";
import RateIcon from "@/icons/rate-icon";
import SaveLaterIcon from "@/icons/save-later-icon";
import SearchIcon from "@/icons/search-icon";
import Image from "next/image";
import Logo from "../components/logo";
import { movieGenres } from "../constants/genres";
import { DiscoverMovies } from "../types/tmdb-types";

async function getFeatured(): Promise<DiscoverMovies> {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?" +
      new URLSearchParams({
        api_key: process.env.TMDB_API_KEY || "",
        include_video: "true",
      })
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BrowsePage() {
  const movies = await getFeatured();
  console.log(movies.results[0]);
  return (
    <>
      <header className="p-2 md:p-6 z-10 from-black to-black/5  bg-gradient-to-b relative flex items-center justify-between gap-x-2">
        <Logo />

        <form className="inline-flex-1 group ">
          <div className="flex  items-center rounded-full px-3 py-2  bg-gray-900">
            <SearchIcon className="text-white w-4 h-4 m-auto focus:ml-auto relative right-0 shrink-0" />
            <input
              className="transition-all md:group-hover:w-[320px] md:[&:not(:placeholder-shown)]:w-[320px] md:focus:[&:placeholder-shown]:w-[320px] group-hover:w-[150px] placeholder:text-sm bg-transparent outline-none [&:not(:placeholder-shown)]:w-[150px] [&:placeholder-shown]:w-0 focus:[&:placeholder-shown]:w-[150px] focus:ml-2 group-hover:ml-2 [&:not(:placeholder-shown)]:ml-2"
              placeholder="Search movies"
            />
          </div>
        </form>
      </header>
      <main className="min-h-screen">
        <div className="relative -top-[56px] md:-top-[88px] aspect-[4/3] md:aspect-video max-h-[810px] w-full">
          <Image
            draggable={false}
            src={`https://image.tmdb.org/t/p/original${movies.results[0].backdrop_path}`}
            alt={movies.results[0].title}
            className="h-full select-none object-cover brightness-75"
            fill
            priority
          />
          <div className="absolute z-10 p-4 bottom-0 space-y-2 w-full from-black to-black/5  bg-gradient-to-t">
            <p className="text-xl sm:text-2xl text-center md:text-left md:text-3xl uppercase font-bold">
              {movies.results[0].title}
            </p>

            <div className="flex gap-2 text-sm justify-center md:justify-start items-center flex-col md:flex-row">
              <div className="flex gap-x-2 text-sm justify-center md:justify-start items-center">
                {movies.results[0].genre_ids.map((id) => (
                  <span
                    className="px-2 py-[0.5px] rounded-full border border-white/20"
                    key={id}
                  >
                    {movieGenres[id]}
                  </span>
                ))}
              </div>
              <div className="flex gap-x-2 justify-center items-center">
                <span className="flex justify-center items-center gap-x-1">
                  <RateIcon className="text-blue-500" />
                  {movies.results[0].vote_average}
                </span>
                <time
                  dateTime={`${new Date(
                    movies.results[0].release_date
                  ).getFullYear()}`}
                  className="text-sm"
                >
                  {new Date(movies.results[0].release_date).getFullYear()}
                </time>
              </div>
            </div>
            <p className="hidden md:block max-w-sm text-sm  text-balance leading-none">
              {movies.results[0].overview}
            </p>

            <div className="flex gap-x-4 md:gap-x-8 justify-center items-center md:justify-start !mt-6">
              <button className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-8 py-3 flex gap-x-1 items-center">
                <PlayIcon className="shrink-0 h-5" />
                Play
              </button>
              <button className="p-2 rounded-full border border-white/20 flex md:border-0 items-center gap-x-2 justify-center text-sm">
                <BookMarkIcon className="shrink-0" />
                <span className="hidden md:inline">Bookmark</span>
              </button>
              <button className="order-first md:order-last p-2 rounded-full border border-white/20 flex md:border-0 items-center gap-x-2 justify-center text-sm">
                <SaveLaterIcon className="shrink-0" />
                <span className="hidden md:inline">Add to list</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
