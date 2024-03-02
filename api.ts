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

interface Fetchers<T> {
  [key: string]: QueryFunction<T>;
}

// 각각의 fetch를 반환하기보다는 비슷한 범주를 한 분류로 묶어 객체 생성 후 객체를 export
// 사용할 곳에서 import하여 moviesApi.trending 등으로 사용할 수 있음
export const moviesApi: Fetchers<MovieResponse> = {
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

export const tvApi: Fetchers<TVResponse> = {
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
