function RecipeSuggestions() {
  const recipes = [
    { title: "Spaghetti Bolognese", time: "45 mins" },
    { title: "Avocado Toast", time: "10 mins" },
    { title: "Green Smoothie", time: "5 mins" },
  ];

  return (
    <section>
      <h3 className="text-xl font-semibold text-green-800 mb-4">
        Top Picks for You
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.title}
            className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
          >
            <h4 className="text-lg font-medium text-green-900">
              {recipe.title}
            </h4>
            <p className="text-sm text-gray-600">Time: {recipe.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecipeSuggestions;
