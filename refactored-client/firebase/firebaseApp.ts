// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuAvIRUuRmiwxmyF3oIOsVnDm8uSPKoBo",
  authDomain: "i-pill-u.firebaseapp.com",
  projectId: "i-pill-u",
  storageBucket: "i-pill-u.appspot.com",
  messagingSenderId: "406517368106",
  appId: "1:406517368106:web:bc12892e4d3a4164148a53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();
const firestore = getFirestore(app);

export { app, googleAuthProvider, auth, firestore };
