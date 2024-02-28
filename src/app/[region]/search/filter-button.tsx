"use client";

import { useFormStatus } from "react-dom";

interface FilterButtonProps {}

export default function FilterButton(props: FilterButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 self-center py-3 px-6 disabled:grayscale transition-colors"
      disabled={pending}
      aria-disabled={pending}
    >
      Filter
    </button>
  );
}
