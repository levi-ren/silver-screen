"use client";

import FilterIcon from "@/icons/filter-icon";
import { useFormStatus } from "react-dom";

interface FilterButtonProps {}

export default function FilterButton(props: FilterButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 self-center py-3 px-6 disabled:grayscale transition-colors col-span-2 sm:col-start-2 md:col-span-1 xs:max-w-sm xs:place-self-center xs:w-full flex items-center justify-center"
      disabled={pending}
      aria-disabled={pending}
    >
      <FilterIcon className="w-5 h-5" /> Filter
    </button>
  );
}
