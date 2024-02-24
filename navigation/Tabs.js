import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => (
  // 모든 Tab.Screen에 screenOptions를 사용하여 공통으로 스타일 적용 가능
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: "tomato" },
      tabBarLabelPosition: "beside-icon",
      tabBarActiveTintColor: "yellow",
      tabBarInactiveTintColor: "black",
    }}
  >
    {/* 탭 단위로 다른 스타일을 적용할 때는 options를 이용 */}
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{ headerTitleStyle: { color: "tomato" } }}
    />
    <Tab.Screen name="Tv" component={Tv} options={{ tabBarBadge: 5 }} />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
