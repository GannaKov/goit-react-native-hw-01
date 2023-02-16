import "react-native-gesture-handler"; //the libraries that are required by the stack navigator
import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";
//-------------------------------------------------------
const MainTab = createBottomTabNavigator();
//--------------------------------------------------
export const Home = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  //{ navigation }
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
          headerTitle: "Posts",
          headerTitleAlign: "center",
          headerRight: (focused, size, color) => (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={signOut}>
              <Feather
                name="log-out"
                size={24}
                color="rgba(189, 189, 189, 1)"
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#FFFFFF",
            height: 88,
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 1.35914,
          },
          headerTitleStyle: {
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
            <View style={styles.btnAddPost}>
              <Feather name="plus" size={24} color="#FFFFFF" />
            </View>
          ),
          headerTitle: "Create Post",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#FFFFFF",
            height: 88,
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowOffset: { width: 0, height: 0.5 },
            shadowRadius: 1.35914,
          },
          headerTitleStyle: {
            fontSize: 17,

            fontFamily: "Roboto-Medium",
            fontStyle: "normal",
            lineHeight: 22,
          },
          headerTintColor: "#212121",
          // headerBackVisible: true, //why dont work???
          headerLeft: (focused, size, color) => (
            <TouchableOpacity
              style={{ marginLeft: 16, width: 20, height: 20 }}
              /// onPress={() => navigation.navigate("Posts")} //!!!!!!!!!!!!!
            >
              <Feather
                name="arrow-left"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableOpacity>
          ),
        }}
        name="Create Post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  btnAddPost: {
    height: 40,
    width: 70,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
