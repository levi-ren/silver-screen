import { TrendingResults } from "./shared";

export interface TrendingAll {
  page: number;
  results: TrendingResults[];
  total_pages: number;
  total_results: number;
}
