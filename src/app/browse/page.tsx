import Footer from "@/components/footer";
import Logo from "@/components/logo";
import LogoLoader from "@/components/logo-loader";
import QuerySearchForm from "@/components/query-search-form";
import QuerySearchFormLoader from "@/components/query-search-form-loader";
import SearchIcon from "@/icons/search-icon";
import { PageProps } from "@/types/page-types";
import { Suspense } from "react";
import { CountryList } from "./countrylist";
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

const Input = () => (
  <div className="flex  items-center rounded-full px-3 py-2 bg-black/90">
    <label htmlFor="query">
      <SearchIcon className="text-white w-4 h-4 m-auto focus:ml-auto relative right-0 shrink-0" />
    </label>
    <input
      className="transition-all md:group-hover:w-[320px] md:[&:not(:placeholder-shown)]:w-[320px] md:focus:[&:placeholder-shown]:w-[320px] group-hover:w-[150px] placeholder:text-sm bg-transparent outline-none [&:not(:placeholder-shown)]:w-[150px] [&:placeholder-shown]:w-0 focus:[&:placeholder-shown]:w-[150px] focus:ml-2 group-hover:ml-2 [&:not(:placeholder-shown)]:ml-2 "
      placeholder="Search movies"
      name="query"
      id="query"
    />
  </div>
);

export default async function BrowsePage({
  searchParams: { country },
}: PageProps) {
  return (
    <>
      <header className="p-2 md:p-6 z-10 from-black to-black/5  bg-gradient-to-b relative flex items-center justify-between gap-x-2">
        <Suspense fallback={<LogoLoader />}>
          <Logo />
        </Suspense>

        <div className="flex gap-x-2 items-center">
          <Suspense
            fallback={
              <QuerySearchFormLoader className="inline-flex-1 group">
                <Input />
              </QuerySearchFormLoader>
            }
          >
            <QuerySearchForm className="inline-flex-1 group">
              <Input />
            </QuerySearchForm>
          </Suspense>

          <div className="group relative">
            <CountryList />
          </div>
        </div>
      </header>
      <main className="grid grid-cols-12">
        <Suspense fallback={<FeaturedLoading />}>
          <Featured country={country} />
        </Suspense>
        <Suspense
          fallback={<ListLoader header="Trending Today" className="order-2" />}
        >
          <Trending country={country} />
        </Suspense>
        <Suspense fallback={<NowAiringLoader />}>
          <NowAiring country={country} />
        </Suspense>
        <Suspense
          fallback={<ListLoader header="Only on Cinemas" className="order-3" />}
        >
          <NowShowing country={country} />
        </Suspense>
        <Suspense fallback={<TopTenLoader />}>
          <TopTen country={country} />
        </Suspense>

        <Suspense fallback={<TopRatedMoviesLoader />}>
          <TopRatedMovies country={country} />
        </Suspense>
      </main>

      <Footer country={country} />
    </>
  );
}
