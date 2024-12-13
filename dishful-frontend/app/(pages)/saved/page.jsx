"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/utils";
import toast from "react-hot-toast";
import { IonIcon } from "react-ion-icon";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You're not logged in");
          router.push("/login");
          return;
        }
        const userData = await apiRequest(
          "auth/current-user",
          "GET",
          null,
          token
        );
        setUsername(userData.data.user.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error(error.message || "Error fetching your username.");
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You're not logged in");
          router.push("/login");
          return;
        }
        const data = await apiRequest("save", "GET", null, token);
        setSavedRecipes(data.reverse());
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
        toast.error("Failed to load saved recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
    fetchSavedRecipes();
  }, [router]);

  const handleDelete = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      await apiRequest(`save/${recipeId}`, "DELETE", null, token);
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
      toast.success("Recipe deleted successfully.");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Failed to delete the recipe.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading saved recipes...</p>
      </div>
    );
  }

  if (savedRecipes.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">No saved recipes yet!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.push("/profile")}>
            <IonIcon
              name="person-circle"
              size="large"
              className="text-green-500"
            />
          </button>
          <div>
            <p className="text-sm text-gray-700">Welcome back,</p>
            <p className="text-lg font-bold text-green-600">{username}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {recipe.recipe.additionalInfo ||
                "No additional information available."}
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                ⏱ {recipe.recipe.timeEstimate || "N/A"}
              </span>
              <span className="text-sm text-gray-500">
                💪 {recipe.recipe.difficulty || "N/A"}
              </span>
            </div>
            <button
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              onClick={() => handleDelete(recipe._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
