import { tmdbFetch } from "@/lib/fetcher";
import { TrendingAll, TrendingMovie, TrendingTV } from "@/types/trending-all";
import Carousel from "./carousel";

async function getTrending(): Promise<TrendingAll> {
  const res = await tmdbFetch(`trending/all/day`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface FeaturedProps {
  country?: string;
}

export default async function Featured({ country }: FeaturedProps) {
  const featured = await getTrending();
  const filtered = featured.results.filter(
    (e): e is TrendingMovie | TrendingTV => e.media_type !== "person"
  );
  return (
    <section
      id="featured"
      className="relative aspect-[4/2.7] md:aspect-[16/7.4] lg:aspect-[16/8] max-h-[722px] w-full col-span-12 order-1"
    >
      <Carousel featured={filtered.slice(0, 3)} country={country} />
    </section>
  );
}
