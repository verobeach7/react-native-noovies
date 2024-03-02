import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

// ES6 구조분해할당: 객체의 navigation에 해당하는 것과 나머지 것드로 나누어 받아옴
// const Detail = ({ navigation, ...rest }) => {
const Detail = ({
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
