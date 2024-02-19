export interface DiscoverTV {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
}
export interface TV {
  adult: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[] | null;
  id: number;
  origin_country?: string[] | null;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}
