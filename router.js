import "react-native-gesture-handler"; //the libraries that are required by the stack navigator
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./screens/main/PostsScreen";
import { CreatePostsScreen } from "./screens/main/CreatePostsScreen";
import { ProfileScreen } from "./screens/main/ProfileScreen";
import { RegistrationScreen } from "./screens/auth/RegistrationScreen";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { Home } from "./screens/main/Home";

import { Feather } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
//------------------------------
const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();
//-------------------------------
export function useRoute(isAuth) {
  if (!isAuth) {
    return (
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
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </AuthStack.Navigator>
  );
}
