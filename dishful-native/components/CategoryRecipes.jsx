import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import RecipeCard from "./RecipeCard";

const CategoryRecipes = () => {
  const categories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks"];
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");

  const recipesByCategory = {
    Breakfast: [
      {
        title: "Akara and Pap",
        time: "20 mins",
        author: "Dishful",
        image: require("../assets/images/breakfast/akaraandpap.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Yam and Egg Sauce",
        time: "30 mins",
        author: "Dishful",
        image: require("../assets/images/breakfast/yamandeggsauce.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Fried Rice",
        time: "40 mins",
        author: "Dishful",
        image: require("../assets/images/breakfast/fried-rice.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Jollof Rice",
        time: "45 mins",
        author: "Dishful",
        image: require("../assets/images/breakfast/jollof.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
    ],
    Lunch: [
      {
        title: "Noodles",
        time: "20 mins",
        author: "Dishful",
        image: require("../assets/images/lunch/noodles.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Plantain Pancakes",
        time: "15 mins",
        author: "Dishful",
        image: require("../assets/images/lunch/plantainpancakes.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Garri",
        time: "2 mins",
        author: "Dishful",
        image: require("../assets/images/lunch/garri.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Chicken Shawarma",
        time: "30 mins",
        author: "Dishful",
        image: require("../assets/images/lunch/chicken-shawarma.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
    ],
    Dinner: [
      {
        title: "Egusi Soup and Pounded Yam",
        time: "1 hour",
        author: "Dishful",
        image: require("../assets/images/dinner/egusiandpoundedyam.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Afang Soup",
        time: "1 hour",
        author: "Dishful",
        image: require("../assets/images/dinner/afang.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Amala and Ewedu Soup",
        time: "50 mins",
        author: "Dishful",
        image: require("../assets/images/dinner/amalaandewedu.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Pepper Soup",
        time: "30 mins",
        author: "Dishful",
        image: require("../assets/images/dinner/pepper-soup.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
    ],
    Snacks: [
      {
        title: "Suya",
        time: "10 mins",
        author: "Dishful",
        image: require("../assets/images/snacks/suya.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Puff Puff",
        time: "15 mins",
        author: "Dishful",
        image: require("../assets/images/snacks/puffpuff.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Meat Pie",
        time: "45 mins",
        author: "Dishful",
        image: require("../assets/images/snacks/meat-pie.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Chin Chin",
        time: "30 mins",
        author: "Dishful",
        image: require("../assets/images/snacks/chin-chin.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
    ],
    Drinks: [
      {
        title: "Zobo Drink",
        time: "20 mins",
        author: "Dishful",
        image: require("../assets/images/drinks/zobo.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Chapman",
        time: "5 mins",
        author: "Dishful",
        image: require("../assets/images/drinks/chapman.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Kunu",
        time: "30 mins",
        author: "Dishful",
        image: require("../assets/images/drinks/kunu.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
      {
        title: "Smoothie",
        time: "10 mins",
        author: "Dishful",
        image: require("../assets/images/drinks/smoothie.jpeg"),
        authorAvatar: require("../assets/images/author.jpeg"),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Category Links */}
      <View style={styles.header}>
        <Text style={styles.title}>Category</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recipe Suggestions */}
      <View style={styles.recipeContainer}>
        <Text style={styles.headerText}>Top Picks for {selectedCategory}</Text>
        <View style={styles.recipeList}>
          {recipesByCategory[selectedCategory].map((recipe, index) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CategoryRecipes;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "PoppinsSemiBold",
    color: "#333",
  },
  seeAll: {
    fontSize: 14,
    color: "#5DA9A9",
    fontWeight: "600",
    fontFamily: "PoppinsRegular",
    marginRight: 8,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F2F4F7",
    borderRadius: 20,
    marginHorizontal: 8,
  },
  selectedCategory: {
    backgroundColor: "#4CAF50",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  recipeContainer: {
    marginTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    marginVertical: 12,
  },
  recipeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
