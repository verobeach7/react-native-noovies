import React, { useState } from "react";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import HList from "../components/HList";
import { Modal } from "react-native";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  // useQuery를 사용하면 키가 바뀌는 즉시 queryFn으로 보내짐, queryFn에서 이 키를 가지고 원하는대로 코딩할 수 있음
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery({
    // fetch에게 queryKey를 이용하여 원하는 데이터를 넘겨줄 수 있음
    queryKey: ["searchMovies", query],
    queryFn: moviesApi.search,
    // 바로 쿼리가 실행되면 TextInput이 비어있기 때문에 query 내용이 없어 에러 발생
    // Search화면에 오자마자 useQuery가 실행되는 것을 막기 위해 enabled: false를 사용
    // refretch를 사용하여 내가 원하는 때에 쿼리가 작동되게 할 수 있음
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery({
    queryKey: ["searchTv", query],
    queryFn: tvApi.search,
    // 바로 쿼리가 실행되면 TextInput이 비어있기 때문에 query 내용이 없어 에러 발생
    // Search화면에 오자마자 useQuery가 실행되는 것을 막기 위해 enabled: false를 사용
    // refretch를 사용하여 내가 원하는 때에 쿼리가 작동되게 할 수 있음
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    {
      searchMovies();
      searchTv();
    }
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
