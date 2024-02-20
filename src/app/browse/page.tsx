import Logo from "@/components/logo";
import SearchIcon from "@/icons/search-icon";
import { Suspense } from "react";
import Featured from "./featured";
import FeaturedLoading from "./featured-loading";
import ListLoader from "./list-loader";
import NowShowing from "./now-showing";
import TopTen from "./top-ten";
import TopTenLoader from "./top-ten-loader";
import Trending from "./trending";

export default async function BrowsePage() {
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
        <Suspense fallback={<FeaturedLoading />}>
          <Featured />
        </Suspense>
        <Suspense fallback={<ListLoader header="Trending Today" />}>
          <Trending />
        </Suspense>
        <Suspense fallback={<ListLoader header="Only on Cinemas" />}>
          <NowShowing />
        </Suspense>
        <Suspense fallback={<TopTenLoader />}>
          <TopTen />
        </Suspense>
      </main>
      <footer></footer>
    </>
  );
}
