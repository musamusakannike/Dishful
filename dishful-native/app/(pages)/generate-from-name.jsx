import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { apiRequest } from "../../api/request";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import AIRecipeCard from "../../components/AIRecipeCard";
import { StatusBar } from "expo-status-bar";

const GenerateFromName = () => {
  const [food, setFood] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!food) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Food name is required!",
      });
      return;
    }

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
      const recipe = await apiRequest(
        "/recipe/text-recipe",
        "POST",
        {
          food,
          additionalText,
        },
        token
      );
      setMessages((prev) => [recipe, ...prev]);
      setFood("");
      setAdditionalText("");
      Toast.show({
        type: "success",
        text1: "Recipe generated successfully!",
        text2: "Scroll down for the recipe details.",
        visibilityTime: 1500,
      })
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "Could not generate the recipe. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.chatContainer} contentContainerStyle={{ flexGrow: 1 }}>
          {messages.length === 0 ? (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>
                Enter a food name and tap "Send <Feather name="send" size={20} />" to generate a recipe.
              </Text>
            </View>
          ) : (
            messages.map((message, index) => (
              <View key={index}>
                <AIRecipeCard recipe={message} />
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter food name..."
            value={food}
            onChangeText={setFood}
          />
          <TextInput
            style={styles.input}
            placeholder="Additional instructions (optional)..."
            value={additionalText}
            onChangeText={setAdditionalText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Feather name="send" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>

        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GenerateFromName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    fontFamily: "PoppinsRegular",
  },
  sendButton: {
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
