import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { authStateCahnge } from "../redux/auth/authOperations";
//----------------------
export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateCahnge());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
