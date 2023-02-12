import "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";

import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { Main } from "./components/Main";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { Home } from "./screens/main/Home";
import { useRoute } from "./router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
//-----------------------------------------------------------------------
SplashScreen.preventAutoHideAsync();

//----------------------------------------

//--------------------------------
export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Main />
      </View>
      {/* </TouchableWithoutFeedback> */}
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
/* <Text>Open up App.js to start working KuKuKu!</Text>
      <StatusBar style="auto" /> */
//// "orientation": "default", from App.json "expo"
// i was able to solve mine by setting the backgroundColor on the "splash" at app.json to #3F51B5.then restart dev client
