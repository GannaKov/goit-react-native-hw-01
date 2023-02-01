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
import { View } from "react-native";
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
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
          headerTitle: "Публикации",
          headerTitleAlign: "center",
          headerRight: (focused, size, color) => (
            <View style={{ marginRight: 10 }}>
              <Feather
                name="log-out"
                size={24}
                color="rgba(189, 189, 189, 1)"
              />
            </View>

            // <Button
            //   onPress={() => alert("This is a button!")}
            //   title="Press me"
            //   color="#fff"
            // />marginRight: 10,
          ),
          headerRightContainerStyle: { marginRight: 100 },
          headerStyle: {
            backgroundColor: "#FFFFFF",
            height: 88,
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 13.5914,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 17,

            fontFamily: "Roboto-Medium",
            fontStyle: "normal",
            lineHeight: 22,
          },
          headerTintColor: "#212121",
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Create Post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
