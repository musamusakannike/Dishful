import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Toast from "react-native-toast-message";
import { apiRequest } from "../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import AIRecipeCard from "../../components/AIRecipeCard";
import { StatusBar } from "expo-status-bar";

const RandomRecipeScreen = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRandomRecipe = async (showToast = true) => {
    setLoading(true);
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

      const randomRecipe = await apiRequest(
        "/recipe/random-recipe",
        "POST",
        { additionalText: "" },
        token
      );
      setRecipe(randomRecipe);
      if (showToast) {
        Toast.show({
          type: "success",
          text1: "Random recipe fetched successfully!",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error fetching recipe",
        text2: "Please try again.",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipe(false);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRandomRecipe(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#10B981" />
            <Text style={styles.loadingText}>Generating recipe...</Text>
          </View>
        ) : recipe ? (
          <AIRecipeCard recipe={recipe} />
        ) : (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>
              No recipe available. Try refreshing!
            </Text>
          </View>
        )}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default RandomRecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    fontFamily: "PoppinsExtraBold",
    color: "#6B7280",
    textAlign: "center",
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  emptyMessageText: {
    fontSize: 20,
    fontFamily: "PoppinsExtraBold",
    color: "#6B7280",
    textAlign: "center",
  },
});
