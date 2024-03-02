import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { BLACK_COLOR } from "../colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0 20px;
`;

// 내가 생성하는 type
type RootStackParamList = {
  // 스크린 이름과 스크린에서 사용하는 prop의 타입을 넣어주면 됨
  Detail: Movie | TV;
};

// 어떤 Props를 이용하는지 골라줘야 함: NativeStackScreen인지 TabNavigationScreen인지 등
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

// ES6 구조분해할당: 객체의 navigation에 해당하는 것과 나머지 것드로 나누어 받아옴
// const Detail = ({ navigation, ...rest }) => {
const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  useEffect(() => {
    // setOptions method를 이용해 컴포넌트의 props, state, context를 사용하거나 바꿔줄 수 있음
    setOptions({
      title: "original_title" in params ? "Movie" : "TV Show",
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
};

export default Detail;
