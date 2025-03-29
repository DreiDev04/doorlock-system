import { View, Text } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";

const history = () => {
  return (
    <SafeAreaView>
      <ThemedView>
        <ThemedText>history</ThemedText>
        <Link href="/login">
          <ThemedText>Login</ThemedText>
        </Link>
      </ThemedView>
    </SafeAreaView>
  );
};

export default history;
