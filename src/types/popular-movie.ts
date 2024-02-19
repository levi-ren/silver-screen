import { Movie } from "./discover-movie";

export interface PopularMovie {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
