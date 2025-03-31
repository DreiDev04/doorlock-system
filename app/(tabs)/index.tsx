import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <View style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Image
          source={require("@/assets/icons/locked.png")}
          style={styles.lockIcon}
        />
        <ThemedText style={styles.statusText}>Door is Locked</ThemedText>
        <View style={{ alignItems: "center" }}>
          <View style={styles.fingerprintContainer}>
            <Image
              source={require("@/assets/icons/fingerprint.png")}
              style={styles.fingerprintIcon}
            />
          </View>
          <ThemedText style={{ fontSize: 12, color: "#6B7280" }}>
            Tap to scan fingerprint
          </ThemedText>
        </View>
      </ThemedView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  outline: {
    outline: "solid red 1px",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
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
  fingerprintIcon: {
    width: 40,
    height: 40,
  },
  fingerprintContainer: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    marginTop: 20,
  },
});
