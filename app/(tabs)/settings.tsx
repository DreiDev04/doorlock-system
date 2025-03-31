import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/firebase/firebaseConfg";
import { onAuthStateChanged, User } from "firebase/auth";

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <View>
      <ThemedView style={styles.userInfo}>
        {user ? (
          <>
            <ThemedText>User Email: {user.email}</ThemedText>
            <ThemedText>UID: {user.uid}</ThemedText>
            <ThemedText>Display Name: {user.displayName}</ThemedText>
            <ThemedText>Phone Number: {user.phoneNumber}</ThemedText>
            <ThemedText>Photo URL: {user.photoURL}</ThemedText>
            <ThemedText>Provider ID: {user.providerData[0]?.providerId}</ThemedText>
            <ThemedText>Provider Data: {JSON.stringify(user.providerData)}</ThemedText>
            <ThemedText>Metadata: {JSON.stringify(user.metadata)}</ThemedText>
          </>
        ) : (
          <ThemedText>No user signed in</ThemedText>
        )}
      </ThemedView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
