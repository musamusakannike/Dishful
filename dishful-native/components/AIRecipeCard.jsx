// RecipeCard.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { apiRequest } from "../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const AIRecipeCard = ({ recipe }) => {

  const handleSave = async () => {
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
      // Define the payload for saving
      const payload = {
        title: recipe.title,
        recipe,
      };

      // Call the backend to save the recipe
      const response = await apiRequest("/save", "POST", payload, token);

      // Notify the user of success
      Toast.show({
        type: "success",
        text1: "Recipe saved successfully!",
        text2: "You can view it in your saved recipes page.",
        visibilityTime: 1800,
      })
    } catch (error) {
      // Notify the user of failure
      // console.error("error: ", error);
      Toast.show({
        type: "error",
        text1: "Failed to save the recipe",
        text2: "Please try again.",
      });
    }
  };

  return (
    <View style={styles.recipeContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.title || "Recipe"}</Text>
        <View style={styles.locationContainer}>
          <Feather name="map-pin" size={20} color="gray" />
          <Text style={styles.locationText}>
            {recipe.foodLocation || "Location not available"}
          </Text>
        </View>
      </View>{/* Save Button */}
      <Button title="Save Recipe" onPress={handleSave} color="#4CAF50" />

      <Text style={styles.additionalInfo}>
        {recipe.additionalInfo || "No additional information"}
      </Text>

      <View style={styles.infoRow}>
        <Feather name="clock" size={20} color="gray" />
        <Text style={styles.infoText}>
          {recipe.timeEstimate || "No time estimate"}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="info" size={20} color="gray" />
        <Text style={styles.infoText}>
          Difficulty: {recipe.difficulty || "Unknown"}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={`${ingredient}-${index}`} style={styles.listItem}>
          {ingredient}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Steps</Text>
      {recipe.steps.map((step, index) => (
        <Text key={`${step}-${index}`} style={styles.listItem}>
          {step}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Nutritional Information</Text>
      <View>
        <Text style={styles.listItem}>
          Calories: {recipe.nutritionalInfo.calories || "N/A"}
        </Text>
        <Text style={styles.listItem}>
          Carbs: {recipe.nutritionalInfo.carbs || "N/A"}
        </Text>
        <Text style={styles.listItem}>
          Fat: {recipe.nutritionalInfo.fat || "N/A"}
        </Text>
        <Text style={styles.listItem}>
          Protein: {recipe.nutritionalInfo.protein || "N/A"}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Pairings</Text>
      {recipe.pairings.map((pairing, index) => (
        <Text key={index.toString()} style={styles.listItem}>
          {pairing}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Substitutions</Text>
      {recipe.substitutions.map((sub, index) => (
        <Text key={`${sub.ingredient}-${index}`} style={styles.listItem}>
          <Feather name="refresh-cw" size={20} color="gray" />{" "}
          <Text style={styles.boldText}>{sub.ingredient}</Text>:{" "}
          {sub.substitute}
        </Text>
      ))}

      <View style={styles.sourceContainer}>
        <Text style={styles.sectionTitle}>Recipe Source</Text>
        <Text style={styles.sourceText}>
          {recipe.recipeSource || "Source unavailable"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recipeContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: "#6EE7B7",
    borderWidth: 1,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    color: "#1F2937",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 5,
    color: "#4B5563",
    fontFamily: "PoppinsRegular",
  },
  additionalInfo: {
    marginTop: 5,
    color: "#6B7280",
    fontFamily: "PoppinsRegular",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    marginLeft: 5,
    color: "#374151",
    fontFamily: "PoppinsRegular",
  },
  sectionTitle: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    fontWeight: "600",
    color: "#4B5563",
  },
  listItem: {
    color: "#6B7280",
    fontFamily: "PoppinsRegular",
  },
  boldText: {
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
  },
  sourceContainer: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  sourceText: {
    color: "#6B7280",
    fontFamily: "PoppinsRegular",
  },
});

export default AIRecipeCard;
