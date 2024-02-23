import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // pre-load fonts, call APIs, etc
        // 강의의 startLoading과 동일하게 동작
        await new Promise((resolve) => setTimeout(resolve, 3000));
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
