import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import {getStorage} "firebase/storage"

import { getAnalytics } from "firebase/analytics";
//import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUMo_cuiKF5JTVdZJDwNGFL4PrtfCVFWs",
  authDomain: "react-native-hw-1b912.firebaseapp.com",
  projectId: "react-native-hw-1b912",
  storageBucket: "react-native-hw-1b912.appspot.com",
  messagingSenderId: "705902923759",
  appId: "1:705902923759:web:8a6327697c0afd22af301a",
  measurementId: "G-QC0V72MVSZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//export const storage=getStorage(app)
//export const db=getFirestore(app)
