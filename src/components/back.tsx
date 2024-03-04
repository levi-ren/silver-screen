"use client";
import { useRouter } from "next/navigation";

interface BackProps {}

export default function Back(props: BackProps) {
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
