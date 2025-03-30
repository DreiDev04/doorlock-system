import { StyleSheet, Image } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

import { db } from "@/firebase/firebaseConfg";
import { useEffect } from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Door Lock App</ThemedText>
      </ThemedView>
      <ThemedView style={styles.content}>
        <Image
          source={require("@/assets/icons/locked.png")}
          style={styles.lockIcon}
        />
        <ThemedText style={styles.statusText}>Door is Locked</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2563EB",
    paddingVertical: 20,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  lockIcon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
  },
});
