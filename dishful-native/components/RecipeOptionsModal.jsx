// components/RecipeOptionsModal.js
import React from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const RecipeOptionsModal = ({ isVisible, onClose }) => {
  const router = useRouter();

  const handleOptionPress = (route) => {
    onClose();
    router.push(route);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient
            colors={["#5db075", "#2f855a"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.modalTitle}>Generate Recipe</Text>

            <Pressable
              style={styles.optionButton}
              onPress={() => handleOptionPress("/generate-from-name")}
            >
              <Text style={styles.optionText}>Generate from Meal Name</Text>
            </Pressable>

            <Pressable
              style={styles.optionButton}
              onPress={() => handleOptionPress("/generate-random")}
            >
              <Text style={styles.optionText}>Generate Random Recipe</Text>
            </Pressable>
            <Pressable style={[styles.optionButton, styles.closeButton]} onPress={onClose}>
              <Text style={styles.closeText}>Cancel</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 20,
  },
  gradient: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "PoppinsBold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#fff",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#fff",
    marginTop: 15,
  },
  closeText: {
    color: "#2f855a",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    paddingVertical: 12,
    fontFamily: "PoppinsRegular",
  },
});

export default RecipeOptionsModal;
