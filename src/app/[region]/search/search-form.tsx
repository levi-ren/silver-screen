import { SearchPageParams } from "@/types/page-types";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import FilterButton from "./filter-button";

async function reSearch(oldType: string, page: string, formData: FormData) {
  "use server";
  const query = formData.get("query")?.toString().trim();
  const type = formData.get("type")?.toString().trim();
  const year = formData.get("year")?.toString().trim();

  if (!query) return;
  const params = new URLSearchParams({
    query,
    page: type !== oldType ? "1" : page,
    ...(type ? { type } : {}),
    ...(year ? { year } : {}),
  });

  redirect(`/search?${params.toString()}`);
}

interface SearchFormProps extends SearchPageParams, PropsWithChildren {}

const thisYear = new Date().getFullYear();

export default function SearchForm({
  query,
  type,
  year,
  page,
  children,
}: SearchFormProps) {
  return (
    <>
      <form
        className="pb-4 border-b border-white/20 my-4 grid gap-4 grid-rows-3 grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 md:grid-rows-1  md:grid-cols-5 xl:grid-cols-7"
        action={reSearch.bind(null, type, page)}
      >
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
            placeholder="What's your favorite movie?"
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
            <option value="both" className="text-gray-400">
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

        <FilterButton />
      </form>

      {children}
    </>
  );
}
