import Footer from "@/components/footer";
import Logo from "@/components/logo";
import { PageProps } from "@/types/page-types";
import { Suspense } from "react";
import FilterResults from "./filter-results";
import FilterResultsLoader from "./filter-results-loader";
import PopularNow from "./popular-now";
import SearchForm from "./search-form";

export default async function SearchPage({
  searchParams: { query, type, year, page },
}: PageProps) {
  return (
    <>
      <header className="p-2 md:p-6 z-10 from-black to-black/5  bg-gradient-to-b flex items-center justify-between gap-x-2">
        <Logo />
      </header>
      <main className="">
        <section id="filters" className="p-2 sm:p-4">
          <div className=" max-w-screen-2xl m-auto">
            <p className="text-4xl font-bebas">Filters</p>
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="flex-1 basis-2/3">
                <SearchForm query={query} type={type} year={year} page={page}>
                  <Suspense
                    key={query + page}
                    fallback={<FilterResultsLoader />}
                  >
                    <FilterResults
                      query={query}
                      type={type}
                      year={year}
                      page={page}
                    />
                  </Suspense>
                </SearchForm>
              </div>
              <PopularNow />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
