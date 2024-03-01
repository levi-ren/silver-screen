import Footer from "@/components/footer";
import Logo from "@/components/logo";
import QuerySearchForm from "@/components/query-search-form";
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

export default async function BrowsePage({ params: { region } }: PageProps) {
  return (
    <>
      <header className="p-2 md:p-6 z-10 from-black to-black/5  bg-gradient-to-b relative flex items-center justify-between gap-x-2">
        <Logo />

        <div className="flex gap-x-2 items-center">
          <QuerySearchForm className="inline-flex-1 group">
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
          </QuerySearchForm>

          <div className="group relative">
            <CountryList />

            {/* <div className="absolute  group-hover:hidden hover:hidden p-4 z-50 -right-2 top-10  bg-black rounded-md space-y-1 max-h-80 overflow-auto w-max pt-10">
              {countries.map((country) => (
                <>
                  <Link
                    key={country.iso_3166_1}
                    href={`${
                      process.env.VERCEL_URL
                        ? `https://${process.env.VERCEL_URL}`
                        : `${process.env.localserver}`
                    }/PH/browse`}
                    className="flex gap-x-4 items-center w-full py-1 hover:bg-zinc-800 transition-colors px-2 rounded"
                  >
                    <Image
                      draggable={false}
                      src={`https://flagcdn.com/16x12/${country.iso_3166_1.toLowerCase()}.webp`}
                      alt={`${region} flag`}
                      width={16}
                      height={12}
                      loading="lazy"
                      className="shrink-0"
                    />
                    <p className="shrink-0">{country.english_name}</p>
                  </Link>

                  <div className="border-b border-white/20" />
                </>
              ))}
            </div> */}
          </div>
        </div>
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
