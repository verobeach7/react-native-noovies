import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  // const colorScheme = useColorScheme();
  // 조건문을 이용하여 다크모드 여부를 Boolean으로 받을 수 있음
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: isDark ? BLACK_COLOR : "white" }}
      screenOptions={{
        // unmountOnBlur를 사용하면 마운트가 해제되었을 때 스크린의 state를 리셋함
        // 다른 탭으로 갔다가 다시 돌아왔을 때 처음 화면을 다시 로딩하여 보여줌
        // 즉, React Query를 사용하지 않으면 다시 데이터를 fetch해와야 함
        // 반면에 React Query를 사용하면 데이터를 캐싱해놓았기 때문에 캐싱된 데이터를 재사용함
        // React Query와 함께 사용할 때 unmountOnBlur 설정에 따라 화면을 로딩이 끝났을 때 첫화면을 보여줄 것인지 이전의 화면을 이어서 보여줄 것인지의 차이가 존재함
        unmountOnBlur: true,
        tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? LIGHT_GREY : DARK_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: "600",
        },
        // for Android
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search-outline" : "search-circle"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
