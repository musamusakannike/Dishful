import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { apiRequest } from "../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({ type: "error", text1: "Email and password are required" });
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest("/auth/login", "POST", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      Toast.show({ type: "success", text1: "Login successful" });
      router.push("/home");
    } catch (error) {
      Toast.show({ type: "error", text1: error.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Toast />
      <Text style={styles.title}>Dishful Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.showHideButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.showHideText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.infoText}>
          Don't have an account?{" "}
          <Link href="/signup" style={styles.linkText}>
            Sign up
          </Link>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "PoppinsBold",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    fontFamily: "PoppinsRegular",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  showHideButton: {
    paddingHorizontal: 10,
  },
  showHideText: {
    color: "#4CAF50",
    fontFamily: "PoppinsBold",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  infoText: {
    textAlign: "center",
    marginTop: 10,
    fontFamily: "PoppinsRegular",
  },
  linkText: {
    color: "#4CAF50",
    fontFamily: "PoppinsBold",
  },
});

export default Login;
