import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//FIRST !!!!! For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBUMo_cuiKF5JTVdZJDwNGFL4PrtfCVFWs",
//   authDomain: "react-native-hw-1b912.firebaseapp.com",
//   projectId: "react-native-hw-1b912",
//   storageBucket: "react-native-hw-1b912.appspot.com",
//   messagingSenderId: "705902923759",
//   appId: "1:705902923759:web:8a6327697c0afd22af301a",
//   measurementId: "G-QC0V72MVSZ",
// };
//Second
const firebaseConfig = {
  apiKey: "AIzaSyBuOFxdlhwjXKtq78j12Geaa9Mnp3M_CRk",
  authDomain: "test2-6f04e.firebaseapp.com",
  projectId: "test2-6f04e",
  storageBucket: "test2-6f04e.appspot.com",
  messagingSenderId: "221464408732",
  appId: "1:221464408732:web:5b0f8041ec179f4883f359",
  measurementId: "G-MMV4ZDEEZY",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//export const storage=getStorage(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });
