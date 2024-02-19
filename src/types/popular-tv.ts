import { TV } from "./discover-tv";

export interface PopularTV {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
}
