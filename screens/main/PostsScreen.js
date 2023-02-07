import "react-native-gesture-handler"; //the libraries that are required by the stack navigator
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "./nestedScreens/DefaultScreenPosts";
import { CommentsScreen } from "./nestedScreens/CommentsScreen";
import { MapScreen } from "./nestedScreens/MapScreen";

//----------------------------------
const NestedStack = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        options={{ headerShown: false }}
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
      />
      <NestedStack.Screen name="Comments" component={CommentsScreen} />
      <NestedStack.Screen name="Map" component={MapScreen} />
    </NestedStack.Navigator>
  );
};
