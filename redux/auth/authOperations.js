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
  ({ email, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(
        auth,

        email,
        password
      );
      //photoURL: "https://example.com/jane-q-user/profile.jpg",

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });
      const { displayName, uid, photoURL } = auth.currentUser;
      console.log("auth.currentUser", auth.currentUser);
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email,
        avatar: photoURL,
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
        email: user.email,
        avatar: user.photoURL,
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
      Alert.alert("Wrong name or password. Please, try again");
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
//---------------------------------------
export const authChangeUserAvatar =
  ({ name, email, avatar }) =>
  async (dispatch, getState) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });
      const { uid, displayName, photoURL } = auth.currentUser;
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email,
        avatar: photoURL,
      };
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error.message);
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    }
  };
