export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: GenresEntity[];
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
  reviews: MovieReviews;
}

export interface MovieReviews {
  page: number;
  results: ResultsEntity[];
  total_pages: number;
  total_results: number;
}
export interface ResultsEntity {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
export interface AuthorDetails {
  name?: string;
  username: string;
  avatar_path?: string | null;
  rating?: number;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}
export interface GenresEntity {
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
