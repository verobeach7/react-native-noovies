import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { Movie, MovieResponse, moviesApi } from "../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

// TypeScript에서 styled-components의 FlatList를 이용하기 위해서는  "as unknown as typeof FlatList"를 추가해줘야함
/* const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList; */

// TypeScript에서 styled-components의 FlatList를 이용하기 위한 2번째 방법
const TrendingScroll = styled(FlatList<Movie>)`
  margin-top: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const VSeperator = styled.View`
  width: 20px;
`;
const HSeperator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movie">> = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    // refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: moviesApi.nowPlaying,
  });
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    // refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.upcoming,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    // refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "trending"],
    queryFn: moviesApi.trending,
  });
  const onRefresh = async () => {
    // useQueryClient를 이용해 한번에 refetch할 수 있음(키로 범주를 만들어줘야 함)
    queryClient.refetchQueries(["movies"]);
    /* refetchNowPlaying();
    refetchUpcoming();
    refetchTrending(); */
  };
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  // refreshing 작동 여부 확인에 사용
  // console.log(refreshing);
  // TypeScript 작성에 사용
  // console.log(Object.values(nowPlayingData?.results[0]).map((v) => typeof v));
  return loading ? (
    <Loader />
  ) : // trendingData가 없을 경우에 null을 이용하여 TypeScript 문제를 해결
  upcomingData ? (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        // Fragment를 이용하여 여러개의 components를 넣어줄 수 있음
        <>
          {/* Movies Slider */}
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {/* Trending VMovies */}
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          {/* Upcoming HMovies */}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeperator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          releaseDate={item.release_date}
          overview={item.overview}
        />
      )}
    />
  ) : null;
};

export default Movies;
