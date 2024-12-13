"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/lib/utils";

const AIRecipeCard = ({ recipe }) => {
  const router = useRouter();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You're not logged in");
        router.push("/login");
        return;
      }

      const payload = {
        title: recipe.title,
        recipe,
      };

      const response = await apiRequest("save", "POST", payload, token)

      if (response) {
        toast.success("Recipe saved successfully!");
      } else {
        throw new Error("Failed to save the recipe");
      }
    } catch (error) {
      toast.error("Failed to save the recipe. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-green-300 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {recipe.title || "Recipe"}
        </h2>
        <div className="flex items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5c0 3.315-2.685 6-6 6s-6-2.685-6-6 2.685-6 6-6 6 2.685 6 6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 19.5l-3-3"
            />
          </svg>
          <span className="ml-2">
            {recipe.foodLocation || "Unknown Location"}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mt-2">
        {recipe.additionalInfo || "No additional information provided"}
      </p>

      <div className="flex items-center mt-4 space-x-4 text-gray-600">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h6" />
          </svg>
          <span className="ml-2">
            {recipe.timeEstimate || "No time estimate"}
          </span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
          </svg>
          <span className="ml-2">
            Difficulty: {recipe.difficulty || "Unknown"}
          </span>
        </div>
      </div>

      <button
        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg mt-4 w-full"
        onClick={handleSave}
      >
        Save Recipe
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Ingredients</h3>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Steps</h3>
        <ol className="list-decimal list-inside mt-2 text-gray-600">
          {recipe.steps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Nutritional Information
        </h3>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          <li>Calories: {recipe.nutritionalInfo?.calories || "N/A"}</li>
          <li>Carbs: {recipe.nutritionalInfo?.carbs || "N/A"}</li>
          <li>Fat: {recipe.nutritionalInfo?.fat || "N/A"}</li>
          <li>Protein: {recipe.nutritionalInfo?.protein || "N/A"}</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Pairings</h3>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          {recipe.pairings?.map((pairing, index) => (
            <li key={index}>{pairing}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Substitutions</h3>
        <ul className="list-disc list-inside mt-2 text-gray-600">
          {recipe.substitutions?.map((sub, index) => (
            <li key={index}>
              <span className="font-semibold">{sub.ingredient}</span>:{" "}
              {sub.substitute}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-gray-800">Recipe Source</h3>
        <p className="text-gray-600">
          {recipe.recipeSource || "Source unavailable"}
        </p>
      </div>
    </div>
  );
};

export default AIRecipeCard;
