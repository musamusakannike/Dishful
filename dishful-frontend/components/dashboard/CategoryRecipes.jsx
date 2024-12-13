import Image from "next/image";
import { useState } from "react";
import {useRouter} from "next/navigation";

const CategoryRecipes = () => {
  const categories = ["Breakfast", "Lunch", "Dinner", "Snacks", "Drinks"];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const router = useRouter()

  const recipesByCategory = {
    Breakfast: [
      {
        title: "Akara and Pap",
        time: "20 mins",
        author: "Dishful",
        image: require("@/assets/images/breakfast/akaraandpap.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Yam and Egg Sauce",
        time: "30 mins",
        author: "Dishful",
        image: require("@/assets/images/breakfast/yamandeggsauce.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Fried Rice",
        time: "40 mins",
        author: "Dishful",
        image: require("@/assets/images/breakfast/fried-rice.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Jollof Rice",
        time: "45 mins",
        author: "Dishful",
        image: require("@/assets/images/breakfast/jollof.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
    ],
    Lunch: [
      {
        title: "Noodles",
        time: "20 mins",
        author: "Dishful",
        image: require("@/assets/images/lunch/noodles.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Plantain Pancakes",
        time: "15 mins",
        author: "Dishful",
        image: require("@/assets/images/lunch/plantainpancakes.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Garri",
        time: "2 mins",
        author: "Dishful",
        image: require("@/assets/images/lunch/garri.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Chicken Shawarma",
        time: "30 mins",
        author: "Dishful",
        image: require("@/assets/images/lunch/chicken-shawarma.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
    ],
    Dinner: [
      {
        title: "Egusi Soup and Pounded Yam",
        time: "1 hour",
        author: "Dishful",
        image: require("@/assets/images/dinner/egusiandpoundedyam.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Afang Soup",
        time: "1 hour",
        author: "Dishful",
        image: require("@/assets/images/dinner/afang.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Amala and Ewedu Soup",
        time: "50 mins",
        author: "Dishful",
        image: require("@/assets/images/dinner/amalaandewedu.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Pepper Soup",
        time: "30 mins",
        author: "Dishful",
        image: require("@/assets/images/dinner/pepper-soup.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
    ],
    Snacks: [
      {
        title: "Suya",
        time: "10 mins",
        author: "Dishful",
        image: require("@/assets/images/snacks/suya.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Puff Puff",
        time: "15 mins",
        author: "Dishful",
        image: require("@/assets/images/snacks/puffpuff.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Meat Pie",
        time: "45 mins",
        author: "Dishful",
        image: require("@/assets/images/snacks/meat-pie.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Chin Chin",
        time: "30 mins",
        author: "Dishful",
        image: require("@/assets/images/snacks/chin-chin.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
    ],
    Drinks: [
      {
        title: "Zobo Drink",
        time: "20 mins",
        author: "Dishful",
        image: require("@/assets/images/drinks/zobo.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Chapman",
        time: "5 mins",
        author: "Dishful",
        image: require("@/assets/images/drinks/chapman.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Kunu",
        time: "30 mins",
        author: "Dishful",
        image: require("@/assets/images/drinks/kunu.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
      {
        title: "Smoothie",
        time: "10 mins",
        author: "Dishful",
        image: require("@/assets/images/drinks/smoothie.jpeg"),
        authorAvatar: require("@/assets/images/author.jpeg"),
      },
    ],
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-green-700">Categories</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedCategory === category
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipesByCategory[selectedCategory]?.map((recipe, idx) => (
          <div
            key={idx}
            onClick={() => {router.push(`/search/${recipe.title}`)}}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition"
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-green-800">
                {recipe.title}
              </h3>
              <p className="text-sm text-gray-600">Time: {recipe.time}</p>
              <div className="flex items-center mt-2">
                <Image
                  src={recipe.authorAvatar}
                  alt={recipe.author}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <p className="text-sm text-gray-700">{recipe.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryRecipes;
