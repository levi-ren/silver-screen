import { Movie } from "./discover-movie";
import { TV } from "./discover-tv";

export type TrendingMovie = Movie & {
  media_type: "movie";
};

export type TrendingTV = TV & {
  media_type: "tv";
};

export type TrendingPerson = {
  media_type: "person";
};

export interface TrendingAll {
  page: number;
  results: (TrendingMovie | TrendingTV | TrendingPerson)[];
  total_pages: number;
  total_results: number;
}
