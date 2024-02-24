import {
  Credits,
  Keyword,
  ResourceRecommendations,
  ResourceReviews,
  SimilarResources,
} from "./shared";

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: MovieGenresEntity[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesEntity;
  production_countries: ProductionCountriesEntity;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesEntity[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: { results: MovieTrailers[] };
  vote_average: number;
  vote_count: number;
  release_dates: MovieReleaseDates;
  credits: Credits;
  keywords: { keywords: Keyword[] };
  reviews: ResourceReviews;
  similar: SimilarResources<SimilarMovie>;
  recommendations: ResourceRecommendations<MovieRecommendation>;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface MovieGenresEntity {
  id: number;
  name: string;
}
export interface ProductionCompaniesEntity {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}
export interface ProductionCountriesEntity {
  iso_3166_1: string;
  name: string;
}
export interface SpokenLanguagesEntity {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieTrailers {
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

export interface MovieReleaseDates {
  results: ReleaseDates[];
}
export interface ReleaseDates {
  iso_3166_1: string;
  release_dates: ReleaseDatesEntity[];
}
export interface ReleaseDatesEntity {
  certification: string;
  descriptors: null[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface SimilarMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieRecommendation {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
