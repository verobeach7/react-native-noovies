import React, { useState } from "react";
import { ScrollView, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TVResponse, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: todayLoading, data: todayData } = useQuery<TVResponse>({
    queryKey: ["tv", "today"],
    queryFn: tvApi.airingToday,
  });
  const { isLoading: topLoading, data: topData } = useQuery<TVResponse>({
    queryKey: ["tv", "top"],
    queryFn: tvApi.topRated,
  });
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<TVResponse>({
      queryKey: ["tv", "trending"],
      queryFn: tvApi.trending,
    });
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };
  const loading = todayLoading || topLoading || trendingLoading;
  // console.log(refreshing);
  if (loading) {
    return <Loader />;
  }
  return (
    // ScrollView에서 Refresh하는 법, RefreshControl 이용
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      {trendingData ? (
        <HList title="Trending Tv" data={trendingData.results} />
      ) : null}
      {todayData ? (
        <HList title="Airing Today" data={todayData.results} />
      ) : null}
      {topData ? <HList title="Top Rated TV" data={topData.results} /> : null}
    </ScrollView>
  );
};

export default Tv;
