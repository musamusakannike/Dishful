import axios from "axios";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

const WelcomeScreen = () => {
  const wakeServer = async () => {
    await axios
      .get("https://dishful-server.onrender.com/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "Failed to start the server. Please try again later.",
        })
      });
  };
  useEffect(() => {
    wakeServer();
  }, []);
  return (
    <ImageBackground
      source={require("../assets/images/onboarding.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.subtitle}>Your AI-Powered Recipe Generator</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/signup");
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text style={styles.secondaryButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 1,
    paddingBottom: 50,
  },
  subtitle: {
    fontSize: 30,
    fontFamily: "PoppinsSemiBold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: "PoppinsMedium",
  },
  secondaryButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  secondaryButtonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: "PoppinsMedium",
  },
});

export default WelcomeScreen;
