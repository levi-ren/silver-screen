import {
  Keyword,
  ResourceRecommendations,
  ResourceReviews,
  SimilarResources,
  TVCredits,
} from "./shared";

export interface TVDetails {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedByEntity[];
  episode_run_time: number[];
  first_air_date: string;
  genres: GenresEntity[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: NextEpisodeToAir;
  networks: NetworksEntityOrProductionCompaniesEntity[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: NetworksEntityOrProductionCompaniesEntity[];
  production_countries: ProductionCountriesEntity[];
  seasons: TVSeasons[];
  spoken_languages: SpokenLanguagesEntity[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: TVVideos;
  content_ratings: ContentRatings;
  aggregate_credits: TVCredits;
  keywords: { results: Keyword[] };
  recommendations: ResourceRecommendations<TVRecommendation>;
  reviews: ResourceReviews;
  similar: SimilarResources<SimilarShow>;
}

export interface SimilarShow {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
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

export interface CreatedByEntity {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
export interface GenresEntity {
  id: number;
  name: string;
}
export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime?: number;
  season_number: number;
  show_id: number;
  still_path?: number;
}
export interface NextEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime?: number;
  season_number: number;
  show_id: number;
  still_path?: number;
}
export interface NetworksEntityOrProductionCompaniesEntity {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface ProductionCountriesEntity {
  iso_3166_1: string;
  name: string;
}
export interface TVSeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}
export interface SpokenLanguagesEntity {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TVVideos {
  results: TVVideo[];
}

export interface TVVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface ContentRatings {
  results: ContentRating[];
}
export interface ContentRating {
  iso_3166_1: string;
  rating: string;
}
export interface TVRecommendation {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}
