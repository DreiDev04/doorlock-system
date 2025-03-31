import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

import { db } from "@/firebase/firebaseConfg";
import { useEffect } from "react";
import { Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";


const history = () => {
  const { user } = useAuth();

  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>
          <Link href="/login">
            <ThemedText>Login</ThemedText>
          </Link>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>
          <Link href="/register">
            <ThemedText>Register</ThemedText>
          </Link>
        </ThemedText>
        {user ? <ThemedText >Welcome, {user.email}!</ThemedText> : <ThemedText>Please sign in.</ThemedText>}
      </ThemedView>
    </View>
  );
};

export default history;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
