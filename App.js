import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, Image } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // pre-load fonts, call APIs, etc
        // 강의의 startLoading과 동일하게 동작
        await Font.loadAsync(Ionicons.font);
        // 로고를 preload하기 위해 주로 사용하는 방법
        const [{ localUri }] = await Asset.loadAsync(require("./my-face.jpg"));
        // 서버에 있는 이미지를 가져오는 방법
        await Image.prefetch("https://reactnative.dev/img/oss_logo.svg");
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

  if (!ready) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView}>
      <Text>We are done loading!</Text>
    </View>
  );
}
