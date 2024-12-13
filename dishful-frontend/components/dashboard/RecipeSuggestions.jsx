function RecipeSuggestions() {
  const recipes = [
    { title: "Spaghetti Bolognese", time: "45 mins" },
    { title: "Avocado Toast", time: "10 mins" },
    { title: "Green Smoothie", time: "5 mins" },
  ];

  return (
    <section>
      <h3 className="text-2xl font-semibold text-green-800 mb-6 text-center">
        Top Picks for You
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.title}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-center"
          >
            <h4 className="text-xl font-medium text-green-900 mb-2">
              {recipe.title}
            </h4>
            <p className="text-gray-600">Time: {recipe.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecipeSuggestions;
