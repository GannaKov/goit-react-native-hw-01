import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { Home } from "./screens/Home";
// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     // "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
//   });
// };

SplashScreen.preventAutoHideAsync();

const AuthStack = createStackNavigator();
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

  // console.log(isReady);
  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
  if (!fontsLoaded) {
    return null;
  }
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <View style={styles.container} onLayout={onLayoutRootView}>
          <ImageBackground
            style={styles.image}
            source={require("./assets/photo-BG.jpg")}
          > */}
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Registr"
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
      {/* <LoginScreen />
      <StatusBar style="auto" /> */}
      {/* </ImageBackground>
        </View> */}
    </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    //justifyContent: "center",
    // justifyContent: "flex-end",!!!!
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    //justifyContent: "flex-end",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

/* <Text>Open up App.js to start working KuKuKu!</Text>
      <StatusBar style="auto" /> */
//// "orientation": "default", from App.json "expo"
