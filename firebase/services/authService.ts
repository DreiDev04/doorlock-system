import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export const signInWithGoogle = async () => {
  try {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
    });

    if (response?.type === "success") {
      const { idToken } = response.authentication!;
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
    } else {
      console.error("Google Sign-In failed");
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};
