import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RecipeCard from "./RecipeCard";

const RecipeSuggestions = () => {
  const recipes = [
    { title: "Jollof Rice", time: "45 mins", author: "Dishful",  },
    { title: "Suya", time: "10 mins", author: "Dishful",  },
    { title: "Egusi Soup", time: "5 mins", author: "Dishful",  },
    {title: "Moi Moi", time: "1 hour", author: "Dishful",  }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Top Picks for You</Text>
      <View style={styles.recipeContainer}>
        {recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    marginVertical: 12,
  },
  recipeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%"
  },
});

export default RecipeSuggestions;
