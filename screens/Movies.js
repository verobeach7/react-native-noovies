import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Stack으로 이동하기 위해 props를 이용
const Movies = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    // 다른 navigator의 스크린으로 이동하려는 경우 아래와 같이 작업해야함
    onPress={() => navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>Movies</Text>
  </TouchableOpacity>
);

export default Movies;
