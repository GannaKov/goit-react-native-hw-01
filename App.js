import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { PostsScreen } from "./screens/main/PostsScreen";
import { CreatePostsScreen } from "./screens/main/CreatePostsScreen";
import { ProfileScreen } from "./screens/main/ProfileScreen";
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

//-----------------------------------------------------------------------
SplashScreen.preventAutoHideAsync();

//----------------------------------------
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

//--------------------------------
export default function App() {
  const [user, setUser] = useState(null);
  // console.log("isAuth", isAuth);
  let uid;
  onAuthStateChanged(auth, (user) => {
    // setUser(user);
    if (user) {
      console.log("hi is login", user);

      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      uid = user.uid;
      // ...
    } else {
      console.log("hi is not login");
      // User is signed out
      // ...
    }
  });

  const routing = useRoute(user);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <NavigationContainer>{routing}</NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
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
