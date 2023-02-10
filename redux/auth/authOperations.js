import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { Alert } from "react-native";
import { authSlice } from "./authSlice";
//---------------------------
const { authSignOut, authUserStateChange, updateUserProfile } =
  authSlice.actions;
export const authRegistration =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      console.log("auth", auth);
      await createUserWithEmailAndPassword(
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

      dispatch(updateUserProfile(userUpdateProfile));
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
      dispatch(authUserStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};

//-------------------------------------------
export const authLogIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("err", error.message);
      Alert.alert(errorMessage);
    }
  };
//---------------------------------------------------

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth)
    .then(() => {
      dispatch(authSignOut());
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("err", error.message);
      Alert.alert(errorMessage);
    });
};
