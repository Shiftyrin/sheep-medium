import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUlz_9CSzDGNuGCOqMpfzO9a5MF4VPuy0",
  authDomain: "sheep-s-medium.firebaseapp.com",
  projectId: "sheep-s-medium",
  storageBucket: "sheep-s-medium.firebasestorage.app",
  messagingSenderId: "128159280249",
  appId: "1:128159280249:web:5b0b23f465905bab5eb8a8",
  measurementId: "G-RM6SWN1336"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);