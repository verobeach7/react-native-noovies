import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

// 내가 생성하는 type
type RootStackParamList = {
  // 스크린 이름과 스크린에서 사용하는 prop의 타입을 넣어주면 됨
  Detail: { originalTitle: string };
};

// 어떤 Props를 이용하는지 골라줘야 함: NativeStackScreen인지 TabNavigationScreen인지 등
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

// ES6 구조분해할당: 객체의 navigation에 해당하는 것과 나머지 것드로 나누어 받아옴
// const Detail = ({ navigation, ...rest }) => {
const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}) => {
  useEffect(() => {
    // setOptions method를 이용해 컴포넌트의 props, state, context를 사용하거나 바꿔줄 수 있음
    setOptions({
      title: originalTitle,
    });
  }, []);
  console.log(originalTitle);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;
