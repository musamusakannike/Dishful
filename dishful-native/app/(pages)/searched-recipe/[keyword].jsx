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
import { apiRequest } from "../../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import AIRecipeCard from "../../../components/AIRecipeCard";
import { useLocalSearchParams, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const SearchedRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { keyword } = useLocalSearchParams();

  const fetchKeywordRecipe = async (showToast = true) => {
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

      const recipeData = await apiRequest(
        "/recipe/text-recipe",
        "POST",
        { food: keyword, additionalText: "" },
        token
      );
      setRecipe(recipeData);
      if (showToast) {
        Toast.show({
          type: "success",
          text1: `Recipe for "${keyword}" generated successfully!`,
          text2: "Scroll down to see the details.",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error generating recipe",
        text2: "Please try again.",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchKeywordRecipe(false);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchKeywordRecipe(false);
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
              No recipe found for "{keyword}". Try refreshing or search again!
            </Text>
          </View>
        )}
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default SearchedRecipe;

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
