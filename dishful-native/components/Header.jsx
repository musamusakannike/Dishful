import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import { Link } from "expo-router";

const Header = ({ username }) => {

  return (
    <View style={styles.container}>

      <Link href="/profile">
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="person-circle"
            size={28}
            color="#4CAF50"
            style={styles.profileIcon}
          />
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>{username}</Text>
          </View>
        </View>
      </Link>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingIcon: {
    marginRight: 5,
  },
  greetingText: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    color: "#0A2533",
    marginRight: 5,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    color: "#000",
  },
  profileIcon: {
    marginRight: 8,
  },
});

export default Header;
