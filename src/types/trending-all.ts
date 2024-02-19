import { TV } from "./discover-tv";
import { Movie } from "./tmdb-types";

export interface TrendingAll {
  page: number;
  results: (Movie | TV)[];
  total_pages: number;
  total_results: number;
}
