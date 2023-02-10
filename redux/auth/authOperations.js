////import db from "../../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { Alert } from "react-native";
import { authSlice } from "./authSlice";
//---------------------------

export const authRegistration =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    //dispatch, getState
    try {
      console.log("auth", auth);
      await createUserWithEmailAndPassword(
        //const userCredential =
        auth,

        email,
        password
      );
      //photoURL: "https://example.com/jane-q-user/profile.jpg",

      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { displayName, uid } = auth.currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));

      // const user = userCredential.user;
      //console.log("user", user); // const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("err", error.message);
      Alert.alert(errorMessage);
    }
  };
//-------------------------
export const authStateCahnge = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
      };
      dispatch(authSlice.actions.authUserStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

//-------------------------------------------
export const authLogIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    //dispatch, getState
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log("userLog", user); // const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("err", error.message);
      Alert.alert(errorMessage);
    }
  };
//---------------------------------------------------
// export const authLogOut = () => async (dispatch, getState) => {
//   //dispatch, getState
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;
//     console.log("userLog", user); // const user = userCredential.user;
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log("err", error.message);
//   }
// };
