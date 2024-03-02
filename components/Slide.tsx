import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import { BlurView } from "expo-blur";
// import { BlurView } from "@react-native-community/blur";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../api";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wraper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    // @ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
        <BlurView
          // blurType={isDark ? "dark" : "xlight"}
          // blurAmount={5}
          intensity={70}
          tint={isDark ? "dark" : "light"}
          style={StyleSheet.absoluteFill}
        >
          <Wraper>
            <Poster path={posterPath} />
            <Column>
              <Title>{originalTitle}</Title>
              {voteAverage > 0 ? <Votes>⭐️ {voteAverage}/10</Votes> : null}
              <Overview numberOfLines={5}>{overview}</Overview>
              {/* <Overview>{overview.slice(0, 90)}...</Overview> */}
            </Column>
          </Wraper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
