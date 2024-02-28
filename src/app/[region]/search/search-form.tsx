import { countries } from "@/constants/countries";
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

  // router.push(`/search?${params.toString()}`);
  redirect(`/search?${params.toString()}`);
}

interface SearchFormProps extends SearchPageParams, PropsWithChildren {
  countryList: typeof countries;
}

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
        className="py-4 border-b border-white/20 my-4 flex gap-4 flex-wrap"
        action={reSearch.bind(null, type, page)}
      >
        <div className="relative">
          <label htmlFor="query" className="text-sm block">
            Search
          </label>
          <input
            id="query"
            name="query"
            className="w-[250px] border-b border-white/20 bg-transparent p-2 outline-none transition-[border] duration-300 placeholder:text-sm text-sm placeholder:italic "
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
            className="border-b border-white/20 bg-black px-2  py-2 cursor-pointer text-sm outline-none"
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
            className="max-w-[175px] truncate tracking-tighter border-b border-white/20 bg-black px-2 outline-none py-2 cursor-pointer text-sm w-full"
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
