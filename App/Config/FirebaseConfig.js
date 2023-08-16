// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqGiXtNUFlY_ruj-v4FrGQPHrZBpMqY9Q",
  authDomain: "bloodapp-754c1.firebaseapp.com",
  projectId: "bloodapp-754c1",
  storageBucket: "bloodapp-754c1.appspot.com",
  messagingSenderId: "151393958523",
  appId: "1:151393958523:web:cb4b88cc2e3138326280de",
  measurementId: "G-M1HMGNNFTC"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
export const storage = getStorage(FIREBASE_APP)