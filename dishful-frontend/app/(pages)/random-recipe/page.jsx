"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AIRecipeCard from "@/components/AIRecipeCard";
import { apiRequest } from "@/lib/utils";

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchRandomRecipe = async (showToast = true) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You're not logged in");
        router.push("/login");
        return;
      }

      const response = await apiRequest(
        "recipe/random-recipe",
        "POST",
        null,
        token
      );

      setRecipe(response);
      if (showToast) {
        toast.success("Random recipe fetched successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching recipe. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRandomRecipe(false);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRandomRecipe(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
            <p className="text-gray-600 mt-4">Generating recipe...</p>
          </div>
        ) : recipe ? (
          <AIRecipeCard recipe={recipe} />
        ) : (
          <div className="text-center text-gray-600 py-10 h-screen flex justify-center items-center">
            <div>
              <p>No recipe available. Try refreshing!</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomRecipe;
