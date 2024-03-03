import { QueryFunction } from "@tanstack/react-query";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGM2ZDYxZWM2ZjA5ODJlOWJhMTllYzRlYzAxMGE4ZCIsInN1YiI6IjYzYzEyMmNkMDVhNTMzMDA3YzdlOWYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bhwjqiO2fNlXPuNRgRKM1aji0KXhiB1MSvA_apy9Pl0",
  },
};

const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: object;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

export interface TVDetails {
  backdrop_path: string;
  created_by: object;
  episode_run_time: object;
  first_air_date: string;
  genres: object;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: object;
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  next_episode_to_air: object;
  networks: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: object;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  seasons: object;
  spoken_languages: object;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: {
    results: {
      name: string;
      key: string;
      site: string;
    }[];
  };
  images: object;
}

interface BaseResponse {
  page: number;
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

type MovieListResponse = QueryFunction<MovieResponse>;
type TVListResponse = QueryFunction<TVResponse>;

interface MovieFetchers {
  trending: MovieListResponse;
  upcoming: MovieListResponse;
  nowPlaying: MovieListResponse;
  search: MovieListResponse;
  detail: QueryFunction<MovieDetails>;
}

interface TVFetchers {
  trending: TVListResponse;
  airingToday: TVListResponse;
  topRated: TVListResponse;
  search: TVListResponse;
  detail: QueryFunction<TVDetails>;
}

// 각각의 fetch를 반환하기보다는 비슷한 범주를 한 분류로 묶어 객체 생성 후 객체를 export
// 사용할 곳에서 import하여 moviesApi.trending 등으로 사용할 수 있음
export const moviesApi: MovieFetchers = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week`, options).then((res) => res.json()),
  upcoming: () =>
    fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, options).then(
      (res) => res.json()
    ),
  nowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, options).then(
      (res) => res.json()
    ),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    // console.log(query);
    return fetch(
      `${BASE_URL}/search/movie?query=${query}&language=en-US&page=1`,
      options
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    // console.log(query);
    return fetch(
      `${BASE_URL}/movie/${id}?append_to_response=videos,images`,
      options
    ).then((res) => res.json());
  },
};

export const tvApi: TVFetchers = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week`, options).then((res) => res.json()),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?language=en-US&page=1`, options).then(
      (res) => res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?language=en-US&page=1`, options).then(
      (res) => res.json()
    ),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    // console.log(query);
    return fetch(
      `${BASE_URL}/search/tv?query=${query}&language=en-US&page=1`,
      options
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    // console.log(query);
    return fetch(
      `${BASE_URL}/tv/${id}?append_to_response=videos,images`,
      options
    ).then((res) => res.json());
  },
};
