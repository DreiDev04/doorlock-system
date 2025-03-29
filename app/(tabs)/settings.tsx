import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

const settings = () => {
  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText>index</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
