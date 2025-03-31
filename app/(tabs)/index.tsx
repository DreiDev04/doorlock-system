import { StyleSheet, Image, View, Modal, TouchableOpacity, ActivityIndicator, Alert, Text } from "react-native";
import React, { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const IndexScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleFingerprintPress = async () => {
    setIsModalVisible(true);
    setIsAuthenticating(true);

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Error", "Fingerprint authentication is not available on this device.");
      setIsModalVisible(false);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan your fingerprint to unlock the door",
      fallbackLabel: "Use Passcode",
    });

    setIsAuthenticating(false);

    if (result.success) {
      Alert.alert("Success", "Fingerprint recognized!");
      setIsModalVisible(false);
      //TODO: Handle door unlock logic here


    } else {
      Alert.alert("Failed", "Authentication failed. Try again.");
    }
  };

  return (
    <View style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Image source={require("@/assets/icons/locked.png")} style={styles.lockIcon} />
        <ThemedText style={styles.statusText}>Door is Locked</ThemedText>

        {/* Fingerprint Button */}
        <TouchableOpacity onPress={handleFingerprintPress} style={styles.fingerprintContainer}>
          <Image source={require("@/assets/icons/fingerprint.png")} style={styles.fingerprintIcon} />
        </TouchableOpacity>
        <ThemedText style={styles.scanText}>Tap to scan fingerprint</ThemedText>
      </ThemedView>

      {/* Fingerprint Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fingerprint Scan</Text>
            <Image source={require("@/assets/icons/fingerprint.png")} style={styles.modalFingerprintIcon} />
            {isAuthenticating ? <ActivityIndicator size="large" color="#4e64ed" /> : null}
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
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
  fingerprintContainer: {
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    marginTop: 20,
  },
  fingerprintIcon: {
    width: 40,
    height: 40,
  },
  scanText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#d6d4d4",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,

  },
  modalFingerprintIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#d93b30",
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
