"use client";
import ChevronIcon from "@/icons/chevron-icon";
import { useRouter } from "next/navigation";

interface BackProps {}

export function BackIcon() {
  const router = useRouter();

  return (
    <button aria-label="Back button" onClick={() => router.back()}>
      <ChevronIcon className="rotate-90" />
    </button>
  );
}

export function Back(props: BackProps) {
  const router = useRouter();

  return (
    <span
      className="underline text-rose-700 cursor-pointer"
      onClick={() => router.back()}
    >
      here
    </span>
  );
}
