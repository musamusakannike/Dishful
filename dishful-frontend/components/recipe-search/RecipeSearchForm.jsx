// RecipeSearchForm.jsx
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

const RecipeSearchForm = ({ onSearch, loading }) => {
  const [mealName, setMealName] = useState("");
  const [additionalText, setAdditionalText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mealName) {
      onSearch(mealName, additionalText);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full bg-white p-4 rounded border border-green-300 lg:max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Find Your Recipe
      </h1>
      <label className="text-green-700 mb-2">Meal Name</label>
      <input
        type="text"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        placeholder="e.g., Pasta"
        className="p-2 border border-green-300 rounded mb-4"
        required
      />
      <label className="text-green-700 mb-2">Additional Information (Optional)</label>
      <input
        type="text"
        value={additionalText}
        onChange={(e) => setAdditionalText(e.target.value)}
        placeholder="e.g., vegan, high protein"
        className="p-2 border border-green-300 rounded mb-4"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} Search
      </button>
    </form>
  );
};

export default RecipeSearchForm;
