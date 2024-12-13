import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { apiRequest } from "../../api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router";

const SavedRecipes = ({ token }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
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
                const userData = await apiRequest(
                    "/auth/current-user",
                    "GET",
                    null,
                    token
                );
                setUsername(userData.data.user.username);
            } catch (error) {
                console.error("error: ", error);
                Toast.show({
                    type: "error",
                    text1: error.message || "Error fetching your username.",
                });
            }
        };

        const fetchSavedRecipes = async () => {
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
                if (!token) {
                    Toast.show({
                        type: "error",
                        text1: "You're not logged in",
                    });
                    router.push("/login");
                    return;
                }
                const data = await apiRequest("/save", "GET", null, token);
                setSavedRecipes(data.reverse()); // Start from the latest saved recipe
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: "Failed to load saved recipes.",
                    visibilityTime: 1800,
                })
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
        fetchSavedRecipes();
    }, [token]);

    const handleDelete = async (recipeId) => {
        try {
            const token = await AsyncStorage.getItem("token");
            await apiRequest(`/save/${recipeId}`, "DELETE", null, token);
            setSavedRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe._id !== recipeId)
            );
            Toast.show({
                type: "success",
                text1: "Recipe deleted successfully.",
                visibilityTime: 1800,
            })
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Failed to delete the recipe.",
                visibilityTime: 1800,
            })
        }
    };

    const renderRecipeCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.description} numberOfLines={3}>
                    {item.recipe.additionalInfo || "No additional information available"}
                </Text>
                <View style={styles.meta}>
                    <Text style={styles.metaText}>
                        ⏱ {item.recipe.timeEstimate || "N/A"}
                    </Text>
                    <Text style={styles.metaText}>
                        💪 {item.recipe.difficulty || "N/A"}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item._id)}
                >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );



    if (loading) {
        return (
            <View style={styles.loader}>
                <Text>Loading saved recipes...</Text>
            </View>
        );
    }

    if (savedRecipes.length === 0) {
        return (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No saved recipes yet!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => router.push("/profile")}>
                        <Ionicons
                            name="person-circle"
                            size={28}
                            color="#4CAF50"
                            style={styles.profileIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greetingText}>{username}</Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={savedRecipes}
                keyExtractor={(item) => item._id}
                renderItem={renderRecipeCard}
                numColumns={2}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
};

export default SavedRecipes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 16,
        paddingHorizontal: 8,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 10,
    },
    greetingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    greetingIcon: {
        marginRight: 5,
    },
    greetingText: {
        fontSize: 14,
        fontFamily: "PoppinsRegular",
        color: "#0A2533",
    },
    usernameText: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "PoppinsBold",
        color: "#4CAF50",
    },
    profileIcon: {
        marginRight: 8,
    },
    profilePicContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    grid: {
        paddingBottom: 16,
    },
    card: {
        backgroundColor: "#fff",
        marginVertical: 8,
        padding: 12,
        borderRadius: 8,
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#eee",
        width: "100%",
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    meta: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    metaText: {
        fontSize: 14,
        color: "#555",
        fontStyle: "italic",
    },
    deleteButton: {
        backgroundColor: "#FF5252",
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: "center",
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
    },
});

