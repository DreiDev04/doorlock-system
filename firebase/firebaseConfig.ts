import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_FIREBASE_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
