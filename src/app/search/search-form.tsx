"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, PropsWithChildren } from "react";
import FilterButton from "./filter-button";
interface SearchFormProps extends PropsWithChildren {}

export default function SearchForm({ children }: SearchFormProps) {
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString();
    const type = formData.get("type")?.toString().trim();
    const year = formData.get("year")?.toString().trim();
    if (!query) return;

    const params = new URLSearchParams({
      query,
      page: "1",
      ...(type ? { type } : {}),
      ...(year ? { year } : {}),
    });
    router.push(`/search?${params.toString()}`);
  };
  return (
    <>
      <form
        className="pb-4 border-b border-white/20 my-4 grid gap-4 grid-rows-3 grid-cols-2 sm:grid-cols-4 sm:grid-rows-2 md:grid-rows-1  md:grid-cols-5 xl:grid-cols-7"
        onSubmit={handleSubmit}
      >
        {children}

        <FilterButton />
      </form>
    </>
  );
}
