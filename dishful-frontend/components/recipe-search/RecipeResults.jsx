import React from "react";
import { Info, Clock, MapPin, Replace } from "lucide-react";

const RecipeResults = ({ recipes }) => {

  // Ensure recipes array is not empty and contains a valid object before destructuring
  if (!recipes || recipes.length === 0) return null;

  const {
    title,
    ingredients = [],
    steps = [],
    additionalInfo,
    difficulty,
    foodLocation,
    nutritionalInfo = {},
    pairings = [],
    recipeSource,
    substitutions = [],
    timeEstimate,
  } = recipes[0]; // Destructure the first item in the recipes array

  return (
    <div className="mx-auto bg-white max-w-lg rounded-lg overflow-hidden border border-green-300 w-full overflow-y-auto ">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{title || "Recipe"}</h2>
          <div className="flex items-center text-gray-500 space-x-2">
            <MapPin className="w-5 h-5" />
            <span>{foodLocation || "Location not available"}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm my-2">{additionalInfo || "No additional information"}</p>

        <div className="mt-4">
          <div className="flex items-center text-gray-700 space-x-2">
            <Clock className="w-5 h-5" />
            <span>{timeEstimate || "No time estimate"}</span>
          </div>
          <div className="flex items-center text-gray-700 space-x-2 mt-2">
            <Info className="w-5 h-5" />
            <span>Difficulty: {difficulty || "Unknown"}</span>
          </div>
        </div>

        <h3 className="mt-6 text-lg font-semibold text-gray-700">Ingredients</h3>
        <ul className="list-disc list-inside text-gray-600">
          {ingredients.map((item, index) => (
            <li key={index}>{item || "Ingredient unavailable"}</li>
          ))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-gray-700">Steps</h3>
        <ol className="list-decimal list-inside text-gray-600 space-y-1">
          {steps.map((step, index) => (
            <li key={index}>{step || "Step unavailable"}</li>
          ))}
        </ol>

        <h3 className="mt-6 text-lg font-semibold text-gray-700">Nutritional Information</h3>
        <ul className="text-gray-600 space-y-1">
          <li>Calories: {nutritionalInfo.calories || "N/A"}</li>
          <li>Carbs: {nutritionalInfo.carbs || "N/A"}</li>
          <li>Fat: {nutritionalInfo.fat || "N/A"}</li>
          <li>Protein: {nutritionalInfo.protein || "N/A"}</li>
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-gray-700">Pairings</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {pairings.map((pair, index) => (
            <li key={index}>{pair || "Pairing unavailable"}</li>
          ))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold text-gray-700">Substitutions</h3>
        <ul className="text-gray-600 space-y-1">
          {substitutions.map((sub, index) => (
            <li key={index}>
              <Replace className="inline w-4 h-4 text-gray-500 mr-1" />
              <strong>{sub.ingredient || "Ingredient unavailable"}</strong>:{" "}
              {sub.substitute || "Substitute unavailable"}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-100 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-700">Recipe Source</h3>
        <p className="text-gray-600">{recipeSource || "Source unavailable"}</p>
      </div>
    </div>
  );
};

export default RecipeResults;
