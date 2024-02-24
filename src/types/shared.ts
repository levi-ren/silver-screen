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
