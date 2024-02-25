import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { YELLOW_COLOR } from "../colors";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { setOptions } }) => (
  <TouchableOpacity onPress={() => setOptions({ title: "Hello" })}>
    <Text>Change Title</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerTintColor: YELLOW_COLOR,
      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen
      options={{ title: "1" }}
      name="One"
      component={ScreenOne}
    />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen
      options={{ presentation: "modal" }}
      name="Three"
      component={ScreenThree}
    />
  </NativeStack.Navigator>
);

export default Stack;
