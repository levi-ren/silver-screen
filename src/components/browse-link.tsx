"use client";

import { useSearchParams } from "next/navigation";
import Anchor from "./anchor";

interface BrowseLinkProps {}

export default function BrowseLink(props: BrowseLinkProps) {
  const country = useSearchParams().get("country");
  return (
    <Anchor
      aria-label="Link to browse"
      href={`/browse${country ? `?country=${country}` : ""}`}
      className="inline-block rounded-full bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 mb-6"
    >
      Browse Cataloge
    </Anchor>
  );
}
