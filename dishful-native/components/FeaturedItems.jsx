import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Imported meal images
import SaladImage from "../assets/images/salad.jpeg";
import NoodlesImage from "../assets/images/noodles.jpeg";
import AmalaImage from "../assets/images/dinner/amalaandewedu.jpeg";
import EgusiPoundedYamImage from "../assets/images/dinner/egusiandpoundedyam.jpeg";
import PepperSoupImage from "../assets/images/dinner/pepper-soup.jpeg";
import AfangImage from "../assets/images/dinner/afang.jpeg";
import AkaraAndPapImage from "../assets/images/breakfast/akaraandpap.jpeg";
import FriedRiceImage from "../assets/images/breakfast/fried-rice.jpeg";
import JollofRiceImage from "../assets/images/breakfast/jollof.jpeg";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const meals = [
  {
    id: "1",
    title: "Asian white noodle with extra seafood",
    author: "Dishful",
    time: "20 Min",
    image: NoodlesImage,
  },
  {
    id: "2",
    title: "Healthy salad with fresh veggies",
    author: "Dishful",
    time: "15 Min",
    image: SaladImage,
  },
  {
    id: "3",
    title: "Amala with Ewedu",
    author: "Dishful",
    time: "25 Min",
    image: AmalaImage,
  },
  {
    id: "4",
    title: "Egusi with Pounded Yam",
    author: "Dishful",
    time: "30 Min",
    image: EgusiPoundedYamImage,
  },
  {
    id: "5",
    title: "Pepper Soup",
    author: "Dishful",
    time: "40 Min",
    image: PepperSoupImage,
  },
  {
    id: "6",
    title: "Afang Soup",
    author: "Dishful",
    time: "35 Min",
    image: AfangImage,
  },
  {
    id: "7",
    title: "Akara and Pap",
    author: "Dishful",
    time: "15 Min",
    image: AkaraAndPapImage,
  },
  {
    id: "8",
    title: "Fried Rice",
    author: "Dishful",
    time: "20 Min",
    image: FriedRiceImage,
  },
  {
    id: "9",
    title: "Jollof Rice",
    author: "Dishful",
    time: "20 Min",
    image: JollofRiceImage,
  },
];

const FeaturedSection = () => {
  const [featuredItems, setFeaturedItems] = useState([]);

  // Function to pick three random meals
  const pickRandomMeals = () => {
    const shuffled = meals.sort(() => 0.5 - Math.random());
    setFeaturedItems(shuffled.slice(0, 3));
  };

  useEffect(() => {
    pickRandomMeals();
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Featured</Text>
      <FlatList
        data={featuredItems}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/searched-recipe/${item.title}`)}>
            <LinearGradient
              colors={["#10b981", "#22c55e", "#14b8a6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.card}
            >
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.authorContainer}>
                  <Ionicons
                    name="person-circle-outline"
                    size={16}
                    color="#fff"
                  />
                  <Text style={styles.authorText}>{item.author}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Ionicons name="time-outline" size={16} color="#fff" />
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 3,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "PoppinsSemiBold",
    color: "#333",
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    width: 300,
    padding: 10,
    marginRight: 16,
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    color: "#fff",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorText: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#fff",
    marginLeft: 5,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#fff",
    marginLeft: 5,
  },
});

export default FeaturedSection;
