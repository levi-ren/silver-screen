import { Movie } from "./discover-movie";
import { TV } from "./discover-tv";

export type Resource = Movie | TV;

export interface Credits {
  id: number;
  cast: CastEntity[];
  crew: CrewEntity[];
}
export interface CastEntity {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  roles?: CastRole[];
}

export interface CastRole {
  credit_id: string;
  character: string;
  episode_count: number;
}
export interface CrewEntity {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export type TVCredits = Omit<Credits, "id">;

export interface Keyword {
  id: number;
  name: string;
}

export interface ResourceRecommendations<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface AuthorDetails {
  name?: string;
  username: string;
  avatar_path?: string | null;
  rating?: number;
}
export interface ResourceReviews {
  page: number;
  results: ResourceReview[];
  total_pages: number;
  total_results: number;
}

export interface ResourceReview {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface SimilarResources<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SeachResources {
  page: number;
  results: (PersonSearch | MovieSearch | TVSearch)[];
  total_pages: number;
  total_results: number;
}

export interface PersonSearch {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: "person";
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path?: null;
}

export interface MovieSearch {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: "movie";
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVSearch {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: "tv";
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country?: string[] | null;
}
