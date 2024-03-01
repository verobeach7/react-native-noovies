import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Dimensions, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { moviesApi } from "../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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

const TrendingScroll = styled.FlatList`
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
  } = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: moviesApi.nowPlaying,
  });
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    // refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.upcoming,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    // refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery({
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
  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );
  const movieKeyExtractor = (item) => item.id;
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  // console.log(refreshing);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
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
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {/* Trending VMovies */}
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trendingData.results}
              keyExtractor={movieKeyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
              // VSeperator를 컴포넌트로 삽입하지 않아도 적용됨!
              ItemSeparatorComponent={VSeperator}
              renderItem={renderVMedia}
            />
          </ListContainer>
          {/* Upcoming HMovies */}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
