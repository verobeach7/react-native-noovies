import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, Image, useColorScheme } from "react-native";
import * as Font from "expo-font";
// import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
// import { useAssets } from "expo-asset";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

SplashScreen.preventAutoHideAsync();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // pre-load fonts, call APIs, etc
        const fonts = loadFonts([Ionicons.font]);
        const images = loadImages([
          require("./my-face.jpg"),
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOYbnNNpwBcC3oc6WGAkCv-Dsfriuv3Dd4Q&usqp=CAU",
        ]);
        await Promise.all([...fonts, ...images]);
        // console.log(fonts);
        // console.log(images);
      } catch (e) {
        console.log(e);
      } finally {
        // 강의의 onFinish와 동일하게 동작
        setReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);
  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return null;
  }
  return (
    <NavigationContainer
      onReady={onLayoutRootView}
      theme={isDark ? DarkTheme : DefaultTheme}
    >
      <Tabs />
    </NavigationContainer>
  );
}
