import Footer from "@/components/footer";
import Logo from "@/components/logo";
import { PageProps, SearchPageParams } from "@/types/page-types";
import { Metadata } from "next";
import { Suspense } from "react";
import FilterResults from "./filter-results";
import FilterResultsLoader from "./filter-results-loader";
import PopularNow from "./popular-now";
import SearchForm from "./search-form";

const thisYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: "Silver Screen | Search",
  description: "Silver Screen search page",
};

export default async function SearchPage({
  searchParams: { query, type, year, page, country },
}: PageProps<SearchPageParams & { country?: string }>) {
  return (
    <>
      <header className="p-2 md:p-6 z-10 from-black to-black/5  bg-gradient-to-b flex items-center justify-between gap-x-2">
        <Logo country={country} />
      </header>
      <main className="">
        <section id="filters" className="p-2 sm:p-4">
          <div className=" max-w-screen-2xl m-auto">
            <p className="text-4xl font-bebas">Filters</p>
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="flex-1 basis-2/3">
                <SearchForm>
                  <div className="relative col-span-2">
                    <label htmlFor="query" className="text-sm block">
                      Search
                    </label>
                    <input
                      id="query"
                      name="query"
                      className="w-full border-b border-white/20 bg-transparent p-2 outline-none transition-[border] duration-300 placeholder:text-sm text-sm placeholder:italic "
                      required
                      pattern=".*\S+.*"
                      defaultValue={query}
                      placeholder={`What's your favorite ${
                        type === "movie" ? "movie" : "show"
                      }?`}
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="type" className="text-sm block">
                      Type
                    </label>
                    <select
                      name="type"
                      className="border-b border-white/20 bg-black px-2  py-2 cursor-pointer text-sm outline-none w-full"
                      defaultValue={type}
                      id="type"
                    >
                      <option value="" className="text-gray-400">
                        ~ All ~
                      </option>
                      <option value="tv">TV</option>
                      <option value="movie">Movie</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label htmlFor="year" className="text-sm block">
                      Year Released
                    </label>
                    <select
                      name="year"
                      className=" truncate tracking-tighter border-b border-white/20 bg-black px-2 outline-none py-2 cursor-pointer text-sm w-full"
                      defaultValue={year}
                    >
                      <option value="" className="text-gray-400">
                        ~ All ~
                      </option>
                      {Array.from({ length: 50 }).map((_, i) => (
                        <option value={thisYear - i} key={thisYear - i}>
                          {thisYear - i}
                        </option>
                      ))}
                    </select>
                  </div>
                </SearchForm>
                <Suspense
                  key={`${query}${page}`}
                  fallback={<FilterResultsLoader />}
                >
                  <FilterResults
                    query={query}
                    type={type}
                    year={year}
                    page={page}
                    country={country}
                  />
                </Suspense>
              </div>
              <PopularNow country={country} />
            </div>
          </div>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}
