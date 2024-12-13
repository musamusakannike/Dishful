import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const CategoryLinks = () => {
  const categories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks"];
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Category</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
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
    backgroundColor: "#5DA9A9",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
  },
});

export default CategoryLinks;
