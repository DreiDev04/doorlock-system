// src/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjXDFzFX4JaipSJ3r5DS9ynwEsD-3hyzk",
  authDomain: "doorlockapp-a86ac.firebaseapp.com",
  projectId: "doorlockapp-a86ac",
  storageBucket: "doorlockapp-a86ac.firebasestorage.app",
  messagingSenderId: "12607976065",
  appId: "1:12607976065:web:62dec00127b81ad0079380"
};


// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
