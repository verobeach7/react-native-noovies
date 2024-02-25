import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Image, useColorScheme } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
// ThemeProvider가 "react-navigation/native"에도 있기 때문에 주의가 필요함!!!
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./\bstyled";

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

  // ThemeProvider를 이용하면 아래 Hook을 한번만 이용해도 됨
  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return null;
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
