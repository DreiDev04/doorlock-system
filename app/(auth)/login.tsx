import React, { useEffect } from "react";
import { View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";


WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { accessToken } = response.authentication!;
      const credential = GoogleAuthProvider.credential(null, accessToken);
      signInWithCredential(auth, credential)
        .then(() => console.log("User signed in with Google"))
        .catch((error) => console.error("Firebase Sign-In Error:", error));
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Sign in with Google"
        onPress={() => {
          promptAsync();
        }}
        disabled={!request}
      />
    </View>
  );
};

export default LoginScreen;
