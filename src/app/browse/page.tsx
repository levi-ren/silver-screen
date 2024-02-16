import SearchIcon from "@/icons/search-icon";
import Image from "next/image";
import Logo from "../components/logo";

async function getFeatured() {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?" +
      new URLSearchParams({
        api_key: process.env.TMDB_API_KEY || "",
      })
  );

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
        <div className="relative w-full aspect-video -top-[56px] md:-top-[88px]">
          <Image
            draggable={false}
            src={`https://image.tmdb.org/t/p/original${movies.results[0].backdrop_path}`}
            alt={movies.results[0].title}
            className="h-full select-none rounded object-contain "
            fill
            priority
          />
        </div>
      </main>
      <footer></footer>
    </>
  );
}
