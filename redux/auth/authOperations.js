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
// export const authRegistration = () => async (dispatch, getState) => {
//   try {
//     const user = await db
//       .auth()
//       .createUserWithEmailAndPassword("login", "emai", "password");
//     console.log("user", user);
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   }
// };

export const authRegistration =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    //dispatch, getState
    try {
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
      console.log("auth.currentUser", auth.currentUser);
      console.log("displayName", displayName);
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
      };
      console.log("userUpdateProfile", userUpdateProfile);
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
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
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
