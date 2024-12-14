"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Toast from "react-hot-toast";
import AIRecipeCard from "@/components/AIRecipeCard";
import { apiRequest } from "@/lib/utils";

const SearchedRecipeClient = ({ keyword }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchKeywordRecipe = async (showToast = true) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Toast.error("You're not logged in");
        router.push("/login");
        return;
      }

      const recipeData = await apiRequest(
        "recipe/text-recipe",
        "POST",
        { food: keyword, additionalText: "" },
        token
      );

      setRecipe(recipeData);

      if (showToast) {
        Toast.success(`Recipe for "${keyword}" generated successfully!`);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      Toast.error("Error generating recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeywordRecipe(false);
  }, [keyword]);

  const handleRefresh = useCallback(() => {
    fetchKeywordRecipe(true);
  }, [keyword]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 h-screen">
            <div className="loader border-t-4 border-green-500 rounded-full w-16 h-16 mb-4 animate__animated animate__infinite animate-spin"></div>
            <p className="text-lg font-semibold text-gray-600">
              Generating recipe...
            </p>
          </div>
        ) : recipe ? (
          <AIRecipeCard recipe={recipe} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 h-screen">
            <p className="text-lg font-semibold text-gray-600">
              No recipe found for &quot;{keyword}&quot;. Try refreshing or search again!
            </p>
            {!loading && (
              <button
                onClick={handleRefresh}
                className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
              >
                Refresh
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchedRecipeClient;
