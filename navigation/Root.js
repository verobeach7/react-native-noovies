import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";

const Nav = createNativeStackNavigator();

const Root = () => (
  // react-navigation은 Navigation 안에 있는 Screen 중 최상단에 있는 Screen이 초기화면으로 설정됨
  // 만약 초기화면을 바꾸시고 싶으시다면 initialRouteName 속성을 설정하면 됨
  <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);

export default Root;
