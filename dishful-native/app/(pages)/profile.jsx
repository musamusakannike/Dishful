import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "../../api/request";
import { StatusBar } from "expo-status-bar";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "You're not logged in",
        });
        router.push("/login");
        return;
      }
      const userData = await apiRequest(
        "/auth/current-user",
        "GET",
        null,
        token
      );
      setUsername(userData.data.user.username);
    } catch (error) {
      console.error("error: ", error);
      Toast.show({
        type: "error",
        text1: error.message || "Error fetching your username.",
      });
    }
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("token");
      Toast.show({
        type: "info",
        text1: "You've been logged out",
      });
      router.push("/login");
    } catch (error) {
      console.error("error: ", error);
      Toast.show({
        type: "error",
        text1: error.message || "An error occurred. Please be patient.",
      });
    }
  };

  const confirmLogout = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    setIsModalVisible(false);
    logoutUser();
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Ionicons
              name="person-circle"
              size={28}
              color="#4CAF50"
              style={styles.profileIcon}
            />
          </TouchableOpacity>
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>{username}</Text>
            </View>
          </View>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePicContainer}>
          <Ionicons name="person-circle" size={120} color="#4CAF50" />
        </View>

        {/* List of Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem} onPress={() => {router.push("/saved-recipes")}}>
            <Ionicons
              name="bookmark"
              size={24}
              color="#4CAF50"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Saved Recipes</Text>
            {/* <Text style={styles.comingSoonText}>Coming Soon</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem} onPress={confirmLogout}>
            <Ionicons
              name="log-out"
              size={24}
              color="#4CAF50"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => router.push("/about")}
          >
            <Ionicons
              name="information-circle"
              size={24}
              color="#4CAF50"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>About</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Confirmation Modal */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Are you sure you want to log out?
              </Text>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handleLogout}
                >
                  <Text style={styles.confirmText}>Yes, Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
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
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    color: "#4CAF50",
  },
  profileIcon: {
    marginRight: 8,
  },
  profilePicContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#0A2533",
    fontFamily: "PoppinsRegular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#0A2533",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelText: {
    color: "#0A2533",
    fontFamily: "PoppinsRegular",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginLeft: 10,
  },
  confirmText: {
    color: "#fff",
    fontFamily: "PoppinsRegular",
    fontWeight: "bold",
  },
  comingSoonText: {
    fontSize: 14,
    color: "#FF5733",
    marginLeft: 20,
    fontStyle: "italic",
    fontFamily: "PoppinsRegular",
  },  
});

export default ProfilePage;
