import { Resource } from "./shared";

export interface TrendingAll {
  page: number;
  results: Resource[];
  total_pages: number;
  total_results: number;
}
