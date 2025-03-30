import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { signUp } from "@/services/authService";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { auth } from "@/firebase/firebaseConfg";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";

const SignUpScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.navigate("/(tabs)");
      }
    });

    return unsubscribe;
  }, [router]);

  const updateFormField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    // Email validation
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must contain lowercase, uppercase, number, and special character"
      );
      return false;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    try {
      if (!validateForm()) return;

      setIsSubmitting(true);
      await signUp(formData.email, formData.password, formData.username);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToLogin = () => {
    router.navigate("/(auth)/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Create Account</ThemedText>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Username</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.username}
            onChangeText={(value) => updateFormField("username", value)}
            autoCapitalize="none"
            testID="username-input"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Email</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => updateFormField("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            testID="email-input"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Password</ThemedText>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!passwordVisible}
              value={formData.password}
              onChangeText={(value) => updateFormField("password", value)}
              autoCapitalize="none"
              autoComplete="password-new"
              testID="password-input"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
              testID="toggle-password-visibility"
            >
              <Text>{passwordVisible ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Confirm Password</ThemedText>
          <TextInput
            style={styles.input}
            secureTextEntry={!passwordVisible}
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormField("confirmPassword", value)}
            autoCapitalize="none"
            testID="confirm-password-input"
          />
        </View>

        {error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : null}

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={isSubmitting}
          testID="sign-up-button"
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>Create Account</ThemedText>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <ThemedText style={styles.loginText}>
            Already have an account?
          </ThemedText>
          <TouchableOpacity onPress={navigateToLogin} testID="login-link">
            <ThemedText style={styles.loginLink}>Log In</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
  },
  passwordContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
  },
  eyeIcon: {
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
  signUpButton: {
    backgroundColor: "#4e64ed",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    color: "#4e64ed",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
