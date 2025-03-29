import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";


import { useEffect } from "react";
import { Link } from "expo-router";

const index = () => {

  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>asd</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>
          <Link href="/login">
            <ThemedText>Login</ThemedText>
          </Link>
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
