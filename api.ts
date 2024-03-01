const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGM2ZDYxZWM2ZjA5ODJlOWJhMTllYzRlYzAxMGE4ZCIsInN1YiI6IjYzYzEyMmNkMDVhNTMzMDA3YzdlOWYzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bhwjqiO2fNlXPuNRgRKM1aji0KXhiB1MSvA_apy9Pl0",
  },
};

const BASE_URL = "https://api.themoviedb.org/3";

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week`, options).then((res) => res.json());

const upcoming = () =>
  fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, options).then(
    (res) => res.json()
  );

const nowPlaying = () =>
  fetch(`${BASE_URL}/movie/now_playing?language=en-US&page=1`, options).then(
    (res) => res.json()
  );

// 각각의 fetch를 반환하기보다는 비슷한 범주를 한 분류로 묶어 객체 생성 후 객체를 export
// 사용할 곳에서 import하여 moviesApi.trending 등으로 사용할 수 있음
export const moviesApi = { trending, upcoming, nowPlaying };
