import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const AboutPage = () => {
  const handleEmailPress = () => {
    Linking.openURL("mailto:musamusakannike@gmail.com");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            name="information-circle"
            size={32}
            color="#4CAF50"
            style={styles.headerIcon}
          />
          <Text style={styles.headerText}>About Dishful</Text>
        </View>

        {/* Introduction */}
        <Text style={styles.introText}>
          Welcome to <Text style={{ fontWeight: "bold" }}>Dishful</Text>, your
          personal recipe generator powered by AI! Whether you're a beginner in
          the kitchen or a seasoned cook looking for inspiration, Dishful can
          help you whip up any meal with ease. Just input what you’re craving,
          and Dishful will create a custom recipe tailored to you.
        </Text>

        {/* Creator Info */}
        <Text style={styles.sectionHeader}>Who Created Dishful?</Text>
        <Text style={styles.bodyText}>
          Dishful was crafted by Musa Musa Kannike, a passionate developer who
          believes that everyone deserves the chance to make great food—whether
          you’re new to cooking or simply pressed for time. This project was
          born out of a love for technology and the joy of creating something
          that makes life simpler and more delicious for people.
        </Text>

        {/* Server Information */}
        <Text style={styles.sectionHeader}>A Note About Load Times</Text>
        <Text style={styles.bodyText}>
          To make Dishful available to everyone, the server is hosted on a free
          platform. This means that initial load times might be slower as the
          servers occasionally restart. We appreciate your patience while
          Dishful works to serve up recipes for you!
        </Text>

        {/* Contact Information */}
        <Text style={styles.sectionHeader}>Get in Touch</Text>
        <Text style={styles.bodyText}>
          Have feedback or questions? Feel free to reach out!
        </Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleEmailPress}
        >
          <Ionicons name="mail" size={20} color="#fff" />
          <Text style={styles.contactButtonText}>
            musamusakannike@gmail.com
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    color: "#0A2533",
  },
  introText: {
    fontSize: 16,
    color: "#0A2533",
    fontFamily: "PoppinsRegular",
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "PoppinsSemiBold",
    color: "#0A2533",
    marginVertical: 10,
  },
  bodyText: {
    fontSize: 16,
    color: "#4A4A4A",
    fontFamily: "PoppinsRegular",
    lineHeight: 24,
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  contactButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontFamily: "PoppinsSemiBold",
    marginLeft: 10,
  },
});

export default AboutPage;
