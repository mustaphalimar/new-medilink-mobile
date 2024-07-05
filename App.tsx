import { StyleSheet } from "react-native";

import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigators";

function App() {
  const [fontsLoaded, fontError] = useFonts({
    rubik: require("./assets/fonts/Rubik-Regular.ttf"),
  });

  const theme: Theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, primary: "#3b79ff" },
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView} style={styles.container}>
      <NavigationContainer theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
