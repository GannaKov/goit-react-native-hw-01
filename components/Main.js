import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
//----------------------
export const Main = () => {
  const [user, setUser] = useState(null);

  const state = useSelector((state) => state);
  onAuthStateChanged(auth, (user) => {
    console.log("user", user);
    setUser(user);
  });
  console.log("state", state);
  const routing = useRoute(user);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
