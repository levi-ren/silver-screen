import Footer from "@/components/footer";
import Logo from "@/components/logo";
import SearchIcon from "@/icons/search-icon";
import { PageProps } from "@/types/page-types";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Featured from "./featured";
import FeaturedLoading from "./featured-loading";
import ListLoader from "./list-loader";
import NowAiring from "./now-airing";
import NowAiringLoader from "./now-airing-loader";
import NowShowing from "./now-showing";
import TopRatedMovies from "./top-rated-movies";
import TopRatedMoviesLoader from "./top-rated-movies-loader";
import TopTen from "./top-ten";
import TopTenLoader from "./top-ten-loader";
import Trending from "./trending";

async function search(formData: FormData) {
  "use server";
  const query = formData.get("query");
  if (!query) return;
  redirect(`/search?query=${query}`);
}

export default async function BrowsePage({ params: { region } }: PageProps) {
  return (
    <>
      <header className="p-2 md:p-6 z-10 from-black to-black/5  bg-gradient-to-b relative flex items-center justify-between gap-x-2">
        <Logo />

        <form className="inline-flex-1 group" action={search}>
          <div className="flex  items-center rounded-full px-3 py-2 bg-black/90">
            <SearchIcon className="text-white w-4 h-4 m-auto focus:ml-auto relative right-0 shrink-0" />
            <input
              className="transition-all md:group-hover:w-[320px] md:[&:not(:placeholder-shown)]:w-[320px] md:focus:[&:placeholder-shown]:w-[320px] group-hover:w-[150px] placeholder:text-sm bg-transparent outline-none [&:not(:placeholder-shown)]:w-[150px] [&:placeholder-shown]:w-0 focus:[&:placeholder-shown]:w-[150px] focus:ml-2 group-hover:ml-2 [&:not(:placeholder-shown)]:ml-2"
              placeholder="Search movies"
              name="query"
            />
          </div>
        </form>
      </header>
      <main className="grid grid-cols-12">
        <Suspense fallback={<FeaturedLoading />}>
          <Featured region={region} />
        </Suspense>
        <Suspense
          fallback={<ListLoader header="Trending Today" className="order-2" />}
        >
          <Trending region={region} />
        </Suspense>
        <Suspense fallback={<NowAiringLoader />}>
          <NowAiring />
        </Suspense>
        <Suspense
          fallback={<ListLoader header="Only on Cinemas" className="order-3" />}
        >
          <NowShowing region={region} />
        </Suspense>
        <Suspense fallback={<TopTenLoader />}>
          <TopTen region={region} />
        </Suspense>

        <Suspense fallback={<TopRatedMoviesLoader />}>
          <TopRatedMovies />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
