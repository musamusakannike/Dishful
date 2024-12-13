import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const RecipeCard = ({ recipe }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/searched-recipe/${recipe.title}`)}
    >
      <Image source={recipe.image} style={styles.image} />
      {/* <TouchableOpacity style={styles.favoriteIcon}>
        <Ionicons name="heart-outline" size={24} color="#2e7d32" />
      </TouchableOpacity> */}
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.authorRow}>
          <Image source={recipe.authorAvatar} style={styles.avatar} />
          <Text style={styles.authorName}>{recipe.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    width: "43%",
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    color: "#777",
  },
});
