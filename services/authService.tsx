import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfg";
import { User } from "@/types/userTypes";

export const signUp = async (
  email: string,
  password: string,
  userName: string
): Promise<FirebaseUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await updateProfile(user, {
      displayName: userName,
    });

    // Save user data in Firestore
    const userData: User = {
      uid: user.uid,
      email: user.email || "",
      userName: user.displayName || "",
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return user;
  } catch (error) {
    throw error;
  }
};

// Function to sign in a user
export const signIn = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
