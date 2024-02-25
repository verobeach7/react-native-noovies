import React from "react";
import styled from "styled-components/native";
// styled에 모두 포함되어 있어 아래 import가 불필요함
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => (props.selected ? "blue" : "red")};
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title selected={false}>Movies</Title>
    <Title selected={true}>Movies</Title>
  </Btn>
);

/* // 1. javascript object notation을 이용하면 코드가 더러워짐
// 2. 이를 해결하기 위해 StyleSheet을 이용하여 코드를 분리해주었으나 여전히 css가 아닌 javascript로 코딩을 해야함
const styles = StyleSheet.create({
  btn: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {
    color: "blue",
  },
}); */

export default Movies;
