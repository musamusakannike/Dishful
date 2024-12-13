import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
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

const GenerateFromIngredients = () => {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [additionalText, setAdditionalText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    if (ingredient.trim()) {
      setIngredients((prev) => [...prev, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleSend = async () => {
    if (ingredients.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "At least one ingredient is required!",
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

      // console.log("ingredients: ", ingredients);
      // console.log("additionalText: ", additionalText);

      const recipe = await apiRequest(
        "/recipe/ingredients-recipe",
        "POST",
        {
          ingredients,      // send the ingredients array directly
          additionalText,
        },
        token
      );

      setMessages((prev) => [...prev, recipe]);
      setIngredients([]);
      setAdditionalText("");
      Toast.show({
        type: "success",
        text1: "Recipe generated successfully!",
        text2: "Scroll down for the recipe details.",
        visibilityTime: 1500,
      });
    } catch (error) {
      // console.log("error: ", error);
      if (error.message === "No recipe available") {
        Toast.show({
          type: "error",
          text1: "No recipe available",
          text2: "Please try again with different ingredients.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "Could not generate the recipe. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {messages && messages.length === 0 ? (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>
                Enter ingredients and tap "Send{" "}
                <Feather name="send" size={20} />" to generate a recipe.
              </Text>
            </View>
          ) : (
            messages && messages.map((message, index) => (
              <View key={index}>
                <AIRecipeCard recipe={message} />
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add an ingredient..."
            value={ingredient}
            onChangeText={setIngredient}
          />
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={ingredients}
          renderItem={({ item }) => (
            <Text style={styles.ingredientItem}>{item}</Text>
          )}
          keyExtractor={(item, index) => `${item}-${index}`}
          horizontal
          style={styles.ingredientList}
        />

        <TextInput
          style={styles.additionalInput}
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

        <Toast />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GenerateFromIngredients;

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
  addButton: {
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientList: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ingredientItem: {
    backgroundColor: "#D1D5DB",
    padding: 5,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  additionalInput: {
    height: 40,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    fontFamily: "PoppinsRegular",
    marginVertical: 5,
  },
  sendButton: {
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
