////import db from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
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

export const authRegistration = async ({ email, password }) => {
  console.log("in acync", email, password);
  //dispatch, getState
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("user", user); // const user = userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("err", error.message);
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
export const authLogIn = () => async (dispatch, getState) => {};
export const authLogOut = () => async (dispatch, getState) => {};
