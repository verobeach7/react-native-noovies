import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import { MovieResponse, moviesApi } from "../api";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

// TypeScript에서 styled-components의 FlatList를 이용하기 위해서는  "as unknown as typeof FlatList"를 추가해줘야함
/* const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList; */

// TypeScript에서 styled-components의 FlatList를 이용하기 위한 2번째 방법

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movie">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    // refetch: refetchNowPlaying,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: moviesApi.nowPlaying,
  });
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    // 무한스크롤 Step 2. hasNextPage와 fetchNextPage 추가
    hasNextPage,
    fetchNextPage,
    // 다음페이지를 Fetching 중인지 알려줌
    isFetchingNextPage,
    // refetch: refetchUpcoming,
    // 무한스크롤 Step 1.
  } = useInfiniteQuery<MovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.upcoming,
    initialPageParam: 1,
    // 다음페이지를 구하고 다음페이지의 유무를 리턴
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      /* if (nextPage > currentPage.total_pages) {
        return null;
      }
      return nextPage;*/
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    // refetch: refetchTrending,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "trending"],
    queryFn: moviesApi.trending,
  });
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  // console.log(upcomingData);
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  // refreshing 작동 여부 확인에 사용
  // console.log(refreshing);
  // TypeScript 작성에 사용
  // console.log(Object.values(nowPlayingData?.results[0]).map((v) => typeof v));
  // 무한스크롤 Step 4.
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderFooterLoadingComponent = (isFetchingNextPage: boolean) =>
    isFetchingNextPage ? <Loader /> : null;
  return loading ? (
    <Loader />
  ) : // trendingData가 없을 경우에 null을 이용하여 TypeScript 문제를 해결
  upcomingData ? (
    <FlatList
      // 무한스크롤 Step3. 리스트의 끝에 도달할 때 작동할 함수
      onEndReached={loadMore}
      // 언제쯤 함수를 실행할 것인지 간극을 조정하기 위한 설정(1에 가까울수록 일찍 작동, 0에 가까울수록 마지막에 도달하여 작동)
      onEndReachedThreshold={0}
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
                fullData={movie}
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
      ListFooterComponent={() =>
        renderFooterLoadingComponent(isFetchingNextPage)
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeperator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.original_title}
          releaseDate={item.release_date}
          overview={item.overview}
          fullData={item}
        />
      )}
    />
  ) : null;
};

export default Movies;

/*{
"pageParams": [undefined],
"pages": [
  {"dates": [Object], "page": 1, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 2, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 3, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 4, "results": [Array], "total_pages": 18, "total_results": 348}
  ]
}


data.pages.map(page => results)

[[Movie], [Movie], [Movie], [Movie], ...].flat()

.flat()은 Array 안의 Array들을 꺼내서 하나의 Array로 만들어줌

[Movie, Movie, Movie, Movie, ...]
*/
