// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgBHVRlsQqbJx6zoMK66c4b1R6BlAJYos",
  authDomain: "react-chat-app-321a9.firebaseapp.com",
  projectId: "react-chat-app-321a9",
  storageBucket: "react-chat-app-321a9.appspot.com",
  messagingSenderId: "124625589024",
  appId: "1:124625589024:web:3b8303579d535b423dbd45",
  measurementId: "G-7EGKG6EZKY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export default app;
