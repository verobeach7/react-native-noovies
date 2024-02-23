import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";

SplashScreen.preventAutoHideAsync();

export default function App() {
  // Hooks를 이용한 방법: font와 asset만 가져오고자 할 때 사용
  // API를 이용한 데이터를 가져오기는 어려움
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([require("./my-face.jpg")]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView}>
      <Text>We are done loading!</Text>
    </View>
  );
}
