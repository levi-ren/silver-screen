import { tmdbFetch } from "@/lib/fetcher";
import { TrendingAll } from "@/types/trending-all";
import Carousel from "./carousel";

async function getTrending(country?: string): Promise<TrendingAll> {
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
  const featured = await getTrending(country);
  return (
    <section
      id="featured"
      className="relative aspect-[4/2.7] md:aspect-[16/7.4] lg:aspect-[16/8] max-h-[722px] w-full col-span-12 order-1"
    >
      <Carousel featured={featured.results.slice(0, 3)} country={country} />
    </section>
  );
}
