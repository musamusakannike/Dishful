import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Header from "../../components/Header";
import { apiRequest } from "../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import FeaturedSection from "../../components/FeaturedItems";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RecipeOptionsModal from "../../components/RecipeOptionsModal";
import CategoryRecipes from "../../components/CategoryRecipes";
import { StatusBar } from "expo-status-bar";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

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
      const userData = await apiRequest("/auth/current-user", "GET", null, token);
      setUsername(userData.data.user.username);
    } catch (error) {
      console.error("error: ", error);
      Toast.show({
        type: "error",
        text1: error.message || "An error occurred. Please be patient.",
      });
      router.push("/login");
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserDetails();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <Header username={username} />
      <ScrollView
        contentContainerStyle={{ padding: 0 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <FeaturedSection />
        <CategoryRecipes />
      </ScrollView>

      {/* Chef Hat FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="chef-hat" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Recipe Options Modal */}
      <RecipeOptionsModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Dashboard;
